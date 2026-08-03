// ProductsPage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import {
  Plus, Edit, Trash2, Search, Package, Eye,
  AlertCircle, X, RefreshCw, Filter, ChevronLeft, ChevronRight,
  Image as ImageIcon, BarChart2, Clock, Activity
} from 'lucide-react';
import { FaFlask } from 'react-icons/fa';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { message } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ProductsPage = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);

  // State variables
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedForm, setSelectedForm] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasPrev: false,
    hasNext: false
  });
  const [availableFilters, setAvailableFilters] = useState({
    categories: ['All'],
    brands: ['All']
  });
  const outletContext = useOutletContext();
  const [pharmacyId, setPharmacyId] = useState(outletContext?.pharmacyId || localStorage.getItem('pharmacyId'));
  const [dataLoaded, setDataLoaded] = useState(false);

  // Chart states
  const [inventoryChartData, setInventoryChartData] = useState([
    { name: 'In Stock', value: 0 },
    { name: 'Low Stock', value: 0 },
    { name: 'Out of Stock', value: 0 }
  ]);
  const [recentStockActivity, setRecentStockActivity] = useState([]);

  const COLORS = ['#2c6774', '#f59e0b', '#ef4444'];

  // Medicine forms list
  const medicineForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray'];

  // Sync pharmacyId from outlet context if available
  useEffect(() => {
    if (outletContext?.pharmacyId) {
      setPharmacyId(outletContext.pharmacyId);
      localStorage.setItem('pharmacyId', outletContext.pharmacyId);
    } else {
      const stored = localStorage.getItem('pharmacyId');
      if (stored) setPharmacyId(stored);
    }
  }, [outletContext?.pharmacyId]);

  // Calculate status based on stock
  const calculateStatus = (stock, reorderLevel = 10) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  // Fetch medicines from API
  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);

      if (!pharmacyId) {
        console.log('No pharmacy ID found');
        setLoading(false);
        return;
      }

      const response = await pharmacyAPI.getInventory(pharmacyId);

      if (response.data?.success) {
        const medicinesData = response.data.data || [];

        // Transform data for display
        const transformedMedicines = medicinesData.map(med => ({
          id: med._id,
          _id: med._id,
          name: med.name,
          genericName: med.genericName || '',
          category: med.category || 'Other',
          brand: med.manufacturer || 'Generic',
          form: med.form || 'Tablet',
          stock: med.stockQuantity || 0,
          price: med.price || 0,
          discountedPrice: med.discountedPrice || null,
          value: (med.price || 0) * (med.stockQuantity || 0),
          status: calculateStatus(med.stockQuantity || 0, med.reorderLevel || 10),
          reorderLevel: med.reorderLevel || 10,
          image: med.image,
          description: med.description || '',
          manufacturer: med.manufacturer || '',
          sideEffects: med.sideEffects || [],
          uses: med.uses || [],
          precautions: med.precautions || [],
          instructions: med.instructions || [],
          tabletsPerUnit: med.tabletsPerUnit || 10,
          dosage: med.dosage || 'As prescribed',
          strength: med.strength || '',
          volume: med.volume || '',
          weight: med.weight || ''
        }));

        setMedicines(transformedMedicines);

        // Update pagination
        const totalPages = Math.ceil(transformedMedicines.length / itemsPerPage);
        setPagination({
          currentPage: 1,
          totalPages: totalPages,
          totalItems: transformedMedicines.length,
          itemsPerPage: itemsPerPage,
          hasPrev: false,
          hasNext: transformedMedicines.length > itemsPerPage
        });

        // Update chart data
        updateChartData(transformedMedicines);

        // Update filters
        updateFilters(transformedMedicines);
        
        setDataLoaded(true);
      } else {
        setMedicines([]);
        setDataLoaded(true);
      }

    } catch (error) {
      console.error('Error fetching medicines:', error);
      if (error.response?.status === 404) {
        setMedicines([]);
      } else {
        message.error('Failed to load medicines');
      }
      setDataLoaded(true);
    } finally {
      setLoading(false);
    }
  }, [pharmacyId, itemsPerPage]);

  // Update chart data
  const updateChartData = (medicinesData) => {
    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;

    medicinesData.forEach(med => {
      if (med.stock === 0) {
        outOfStock++;
      } else if (med.status === 'Low Stock') {
        lowStock++;
      } else {
        inStock++;
      }
    });

    setInventoryChartData([
      { name: 'In Stock', value: inStock },
      { name: 'Low Stock', value: lowStock },
      { name: 'Out of Stock', value: outOfStock }
    ]);

    // Recent stock activity - show items that need attention (low stock and out of stock first)
    const lowAndOutOfStock = medicinesData
      .filter(med => med.status === 'Low Stock' || med.status === 'Out of Stock')
      .sort((a, b) => a.stock - b.stock);
    
    const inStockItems = medicinesData
      .filter(med => med.status === 'In Stock')
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 3);
    
    const recent = [...lowAndOutOfStock, ...inStockItems].slice(0, 5);
    setRecentStockActivity(recent);
  };

  // Update filters
  const updateFilters = (medicinesData) => {
    const categories = ['All', ...new Set(medicinesData.map(m => m.category).filter(Boolean))];
    const brands = ['All', ...new Set(medicinesData.map(m => m.brand).filter(Boolean))];
    setAvailableFilters({ categories, brands });
  };

  useEffect(() => {
    if (pharmacyId) {
      fetchMedicines();
    }
  }, [pharmacyId, fetchMedicines]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to table
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Get filtered medicines
  const getFilteredMedicines = () => {
    return medicines.filter(med => {
      const matchesSearch = searchTerm === '' ||
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.brand?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || med.brand === selectedBrand;
      const matchesForm = selectedForm === 'All' || med.form === selectedForm;
      const matchesStatus = selectedStatus === 'All' || med.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesBrand && matchesForm && matchesStatus;
    });
  };

  // Get current page items
  const getCurrentPageItems = () => {
    const filtered = getFilteredMedicines();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  };

  // Calculate statistics
  const stats = {
    total: medicines.length,
    categories: availableFilters.categories.length - 1,
    lowStock: medicines.filter(m => m.status === 'Low Stock').length,
    outOfStock: medicines.filter(m => m.status === 'Out of Stock').length,
    totalValue: medicines.reduce((sum, m) => sum + m.value, 0)
  };

  // Open View Modal
  const openViewModal = (medicine) => {
    navigate(`view/${medicine.id}`, { state: { medicine } });
  };

  // Open Delete Modal
  const openDeleteModal = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDeleteModal(true);
  };

  // Delete medicine
  const handleDeleteMedicine = async () => {
    if (!selectedMedicine || !pharmacyId) return;

    try {
      await pharmacyAPI.deleteMedicine(pharmacyId, selectedMedicine._id || selectedMedicine.id);
      message.success('Medicine deleted successfully');
      setShowDeleteModal(false);
      setSelectedMedicine(null);
      fetchMedicines();
    } catch (error) {
      console.error('Error deleting medicine:', error);
      message.error(error.response?.data?.message || 'Failed to delete medicine');
    }
  };

  // Stock status colors
  const stockColors = {
    'In Stock': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
    'Low Stock': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    'Out of Stock': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' }
  };

  // Category colors
  const categoryColors = {
    'Antacid': 'bg-emerald-100 text-emerald-800',
    'Analgesics': 'bg-purple-100 text-purple-800',
    'Antibiotics': 'bg-blue-100 text-blue-800',
    'Allergy': 'bg-amber-100 text-amber-800',
    'Digestive': 'bg-emerald-100 text-emerald-800',
    'Vitamins': 'bg-cyan-100 text-cyan-800',
    'Diabetes': 'bg-pink-100 text-pink-800',
    'Cardiac': 'bg-red-100 text-red-800',
    'Cardiovascular': 'bg-rose-100 text-rose-800',
    'Dermatology': 'bg-indigo-100 text-indigo-800',
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `Rs ${amount?.toLocaleString() || '0'}`;
  };

  const currentItems = getCurrentPageItems();
  const filteredTotal = getFilteredMedicines().length;

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your medicine inventory</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => fetchMedicines()}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button 
              onClick={() => navigate('add')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1a3a3a] transition-colors font-medium shadow-sm text-sm"
            >
              <Plus size={18} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Total Products</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            <p className="text-xs text-green-600 mt-2">Active inventory</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Categories</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.categories}</p>
            <p className="text-xs text-blue-600 mt-2">Active categories</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Low Stock</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.lowStock}</p>
            <p className="text-xs text-amber-600 mt-2">Need reorder</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Out of Stock</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.outOfStock}</p>
            <p className="text-xs text-red-600 mt-2">Critical items</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Inventory Distribution Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Inventory Distribution</h3>
              <p className="text-sm text-gray-500">Stock status breakdown</p>
            </div>
            <BarChart2 className="text-gray-400" size={20} />
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2c6774" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {inventoryChartData.map((item, index) => (
              <div key={index} className="text-xs">
                <div className="font-medium text-gray-900">{item.value}</div>
                <div className="text-gray-500">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Stock Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Stock Alerts</h3>
              <p className="text-sm text-gray-500">Items needing attention</p>
            </div>
            <AlertCircle className="text-gray-400" size={20} />
          </div>

          <div className="space-y-3">
            {recentStockActivity.length > 0 ? (
              recentStockActivity.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    item.status === 'Out of Stock' ? 'bg-red-500' :
                    item.status === 'Low Stock' ? 'bg-amber-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${
                      item.stock === 0 ? 'text-red-600' :
                      item.status === 'Low Stock' ? 'text-amber-600' : 'text-gray-900'
                    }`}>
                      {item.stock} units
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.status === 'Out of Stock' ? 'bg-red-100 text-red-700' :
                      item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500 text-sm">No stock alerts</p>
                <p className="text-xs text-gray-400 mt-1">All items are well stocked</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, generic, brand..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${showFilterPanel ? 'bg-[#2c6774] text-white border-[#2c6774]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 bg-white text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
                >
                  {availableFilters.categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
                >
                  {availableFilters.brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Form</label>
                <select
                  value={selectedForm}
                  onChange={(e) => {
                    setSelectedForm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
                >
                  <option value="All">All Forms</option>
                  {medicineForms.map(form => (
                    <option key={form} value={form}>{form}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Display */}
      {loading && !dataLoaded ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-10 h-10 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicines...</p>
        </div>
      ) : (
        <div ref={tableRef}>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Brand</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Form</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="text-right py-4 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems.length > 0 ? (
                      currentItems.map((medicine) => (
                        <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                                {medicine.image ? (
                                  <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
                                ) : (
                                  <Package size={16} className="text-gray-400" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{medicine.name}</p>
                                <p className="text-xs text-gray-500">{medicine.genericName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[medicine.category] || 'bg-gray-100 text-gray-700'}`}>
                              {medicine.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">{medicine.brand}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{medicine.form}</td>
                          <td className="py-4 px-4">
                            <span className={`font-medium ${medicine.stock <= medicine.reorderLevel ? 'text-amber-600' :
                                medicine.stock === 0 ? 'text-red-600' : 'text-gray-900'
                              }`}>
                              {medicine.stock}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {medicine.discountedPrice ? (
                              <div>
                                <span className="text-xs text-gray-500 line-through">{formatCurrency(medicine.price)}</span>
                                <p className="font-semibold text-green-600 text-sm">{formatCurrency(medicine.discountedPrice)}</p>
                              </div>
                            ) : (
                              <p className="font-semibold text-gray-900">{formatCurrency(medicine.price)}</p>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full border ${stockColors[medicine.status]?.bg || 'bg-gray-100'
                              } ${stockColors[medicine.status]?.border || 'border-gray-200'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${stockColors[medicine.status]?.dot || 'bg-gray-500'}`}></span>
                              {medicine.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => openViewModal(medicine)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => navigate(`edit/${medicine.id}`, { state: { medicine } })}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => openDeleteModal(medicine)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="py-12 text-center text-gray-500">
                          No products found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile Card View - Enhanced with MedicineCard styling */}
          <div className="md:hidden space-y-3">
            {currentItems.length > 0 ? (
              currentItems.map((medicine) => {
                const isTablet = ['tablet', 'capsule', 'caplet', 'pill'].some(t =>
                  medicine.form?.toLowerCase().includes(t)
                );
                const isSyrup = ['syrup', 'suspension', 'drops', 'liquid', 'solution'].some(s =>
                  medicine.form?.toLowerCase().includes(s)
                );
                const isOutOfStock = medicine.stock <= 0;
                const isDiscounted = medicine.discountedPrice && medicine.price > medicine.discountedPrice;
                const discountPercentage = isDiscounted
                  ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100)
                  : 0;

                return (
                  <div key={medicine.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow transition-all duration-150">
                    {/* Image Section */}
                    <div className="relative h-32 bg-gray-50 flex items-center justify-center">
                      {medicine.image ? (
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
                          }}
                        />
                      ) : (
                        <Package size={32} className="text-gray-400" />
                      )}

                      {/* Badges */}
                      {isDiscounted && discountPercentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-medium shadow-sm">
                          {discountPercentage}% OFF
                        </div>
                      )}

                      {isOutOfStock && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-medium shadow-sm">
                          Out of Stock
                        </div>
                      )}

                      {/* Form Badge */}
                      {medicine.form && (
                        <div className={`absolute bottom-2 right-2 text-white text-xs px-2 py-1 rounded-lg font-medium flex items-center gap-1 ${isTablet ? 'bg-purple-500' : 'bg-green-500'
                          }`}>
                          {isTablet ? <Package size={12} /> : <FaFlask size={12} />}
                          {medicine.form}
                        </div>
                      )}
                    </div>

                    {/* Info Section */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                        {medicine.name}
                      </h3>

                      {medicine.genericName && (
                        <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                          {medicine.genericName}
                        </p>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base font-bold text-green-600">
                          Rs. {(medicine.discountedPrice || medicine.price || 0).toFixed(2)}
                        </span>
                        {isDiscounted && (
                          <span className="text-xs text-gray-500 line-through">
                            Rs. {medicine.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Form-specific info */}
                      {isTablet && (
                        <div className="text-xs text-gray-600 mb-2 flex items-center gap-1 bg-purple-50 p-2 rounded-lg">
                          <Package size={12} className="text-purple-600" />
                          <span className="font-medium">{medicine.tabletsPerUnit || 10} tabs/strip</span>
                        </div>
                      )}

                      {isSyrup && (
                        <div className="text-xs text-gray-600 mb-2 flex items-center gap-1 bg-blue-50 p-2 rounded-lg">
                          <FaFlask size={12} className="text-blue-600" />
                          <span className="font-medium">{medicine.volume || '60ml'}</span>
                        </div>
                      )}

                      {/* Stock Status */}
                      <div className="mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full border ${stockColors[medicine.status]?.bg || 'bg-gray-100'
                          } ${stockColors[medicine.status]?.border || 'border-gray-200'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${stockColors[medicine.status]?.dot || 'bg-gray-500'}`}></span>
                          {medicine.status}
                        </span>
                        {!isOutOfStock && (
                          <p className="text-xs text-gray-500 mt-1">
                            {medicine.stock <= 5 ? `Only ${medicine.stock} left` : `${medicine.stock} in stock`}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => openViewModal(medicine)}
                          className="flex-1 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 text-sm font-medium transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`edit/${medicine.id}`, { state: { medicine } })}
                          className="flex-1 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(medicine)}
                          className="flex-1 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredTotal > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTotal)} of {filteredTotal}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm">
                  {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(filteredTotal / itemsPerPage)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">{selectedMedicine.name}</h2>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Generic Name</p>
                  <p className="font-medium">{selectedMedicine.genericName || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-medium">{selectedMedicine.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Manufacturer</p>
                  <p className="font-medium">{selectedMedicine.manufacturer || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Form</p>
                  <p className="font-medium">{selectedMedicine.form}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-medium">{formatCurrency(selectedMedicine.price)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Stock</p>
                  <p className="font-medium">{selectedMedicine.stock} units</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Dosage</p>
                  <p className="font-medium">{selectedMedicine.dosage || 'As prescribed'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Strength</p>
                  <p className="font-medium">{selectedMedicine.strength || '-'}</p>
                </div>
              </div>

              {selectedMedicine.description && (
                <div>
                  <p className="text-xs text-gray-500">Description</p>
                  <p className="text-sm mt-1">{selectedMedicine.description}</p>
                </div>
              )}

              {selectedMedicine.sideEffects?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500">Side Effects</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedMedicine.sideEffects.map((effect, i) => (
                      <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedMedicine.precautions?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500">Precautions</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedMedicine.precautions.map((precaution, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
                        {precaution}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-red-100">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h2 className="text-xl font-bold">Delete Medicine</h2>
            </div>

            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <span className="font-semibold">{selectedMedicine.name}</span>? This action cannot be undone.
            </p>

            {selectedMedicine.stock > 0 && (
              <div className="p-3 bg-amber-50 rounded-lg mb-4">
                <p className="text-sm text-amber-700">
                  ⚠️ This medicine has {selectedMedicine.stock} units in stock.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDeleteMedicine} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;