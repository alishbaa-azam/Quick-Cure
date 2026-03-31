
// new backend logic
// pages/PharmacyDashboard/ProductsPage.jsx

// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, Edit, Trash2, Search, Package, Eye, 
//   AlertCircle, X, Save, Pill, Filter, ChevronLeft, ChevronRight,
//   RefreshCw, Download, Grid, List, Menu, Upload,
//   ChevronDown, ChevronUp, Image as ImageIcon,
//   BarChart2, TrendingUp, Clock, Activity
// } from 'lucide-react';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';

// const ProductsPage = () => {
//   // State variables
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [selectedForm, setSelectedForm] = useState('All');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const [viewMode, setViewMode] = useState('table');
//   const [activeTab, setActiveTab] = useState('details');
//   const [expandedSections, setExpandedSections] = useState({
//     description: true,
//     inventory: true,
//     precautions: true,
//     sideEffects: true
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10
//   });
//   const [availableFilters, setAvailableFilters] = useState({
//     categories: ['All'],
//     brands: ['All']
//   });

//   // Chart states
//   const [inventoryChartData, setInventoryChartData] = useState([
//     { name: 'In Stock', value: 0 },
//     { name: 'Low Stock', value: 0 },
//     { name: 'Out of Stock', value: 0 },
//     { name: 'Expired', value: 0 }
//   ]);

//   const [recentStockActivity, setRecentStockActivity] = useState([]);

//   const COLORS = ['#2c6774', '#f59e0b', '#ef4444', '#6b7280'];

//   // Form state for Add/Edit
//   const [medicineForm, setMedicineForm] = useState({
//     name: '',
//     genericName: '',
//     category: '',
//     brand: '',
//     manufacturer: '',
//     productId: `MED-${Date.now()}`,
//     basePrice: '',
//     salePrice: '',
//     description: '',
//     usage: '',
//     stockLevel: '',
//     packSizes: [],
//     reorderLevel: 10,
//     precautions: '',
//     sideEffects: [],
//     prescriptionRequired: false,
//     sku: '',
//     barcode: '',
//     form: 'Tablet',
//     expiryDate: '',
//     image: null,
//     discount: 0
//   });

//   // Categories from API
//   const [categories, setCategories] = useState(['All']);
//   const [brands, setBrands] = useState(['All']);
//   const [medicineForms] = useState(['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray', 'Bottle']);
//   const [packSizeOptions] = useState(['50ml Bottle', '100ml Bottle', '150ml Bottle', '200ml Bottle', '10 Tablets', '20 Tablets', '30 Tablets']);

//   // Fetch medicines from API
//   const fetchMedicines = async (page = currentPage) => {
//     try {
//       setLoading(true);

//       const params = {
//         page,
//         limit: itemsPerPage,
//         search: searchTerm || undefined,
//         category: selectedCategory !== 'All' ? selectedCategory : undefined,
//         brand: selectedBrand !== 'All' ? selectedBrand : undefined,
//         status: selectedStatus !== 'All' ? selectedStatus : undefined
//       };

//       const response = await pharmacyAPI.getInventory(params);

//       if (response.data?.success) {
//         const { items, pagination: paginationData, filters } = response.data.data;

//         setMedicines(items);
//         setPagination(paginationData);

//         // Update available filters
//         if (filters) {
//           setAvailableFilters({
//             categories: ['All', ...(filters.categories || [])],
//             brands: ['All', ...(filters.brands || [])]
//           });
//         }

//         // Fetch inventory stats for charts
//         fetchInventoryStats();
//       }

//     } catch (error) {
//       console.error('Error fetching medicines:', error);
//       message.error('Failed to load medicines');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch inventory statistics for charts
//   const fetchInventoryStats = async () => {
//     try {
//       const response = await pharmacyAPI.getInventoryAlerts();
//       if (response.data?.success) {
//         setInventoryChartData(response.data.data.chartData);
//         setRecentStockActivity(response.data.data.recentActivity);
//       }
//     } catch (error) {
//       console.error('Error fetching inventory stats:', error);
//     }
//   };

//   // Fetch categories for filter dropdown
//   const fetchCategories = async () => {
//     try {
//       const response = await dashboardAPI.getCategories();
//       if (response.data?.success) {
//         const cats = response.data.data.categories.map(c => c.name);
//         setCategories(['All', ...cats]);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMedicines(1);
//     fetchCategories();
//   }, []);

//   // Refetch when filters change
//   useEffect(() => {
//     fetchMedicines(1);
//     setCurrentPage(1);
//   }, [searchTerm, selectedCategory, selectedBrand, selectedStatus, itemsPerPage]);

//   // Calculate status
//   const calculateStatus = (stock, reorderLevel = 10) => {
//     if (stock === 0) return 'Out of Stock';
//     if (stock <= 5) return 'Critical';
//     if (stock <= reorderLevel) return 'Low Stock';
//     return 'In Stock';
//   };

//   // Handle form changes
//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === 'packSizes') {
//       const options = e.target.options;
//       const selected = [];
//       for (let i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//           selected.push(options[i].value);
//         }
//       }
//       setMedicineForm(prev => ({ ...prev, packSizes: selected }));
//     } else if (name === 'sideEffects') {
//       const effects = value.split(',').map(effect => effect.trim());
//       setMedicineForm(prev => ({ ...prev, sideEffects: effects }));
//     } else {
//       setMedicineForm(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }

//     // Auto-calculate sale price if discount changes
//     if (name === 'discount' || name === 'basePrice') {
//       const basePrice = parseFloat(name === 'basePrice' ? value : medicineForm.basePrice) || 0;
//       const discount = parseFloat(name === 'discount' ? value : medicineForm.discount) || 0;
//       if (basePrice > 0 && discount > 0) {
//         const salePrice = basePrice - (basePrice * discount / 100);
//         setMedicineForm(prev => ({ ...prev, salePrice: salePrice.toFixed(2) }));
//       }
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setMedicineForm(prev => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setMedicineForm({
//       name: '',
//       genericName: '',
//       category: '',
//       brand: '',
//       manufacturer: '',
//       productId: `MED-${Date.now()}`,
//       basePrice: '',
//       salePrice: '',
//       description: '',
//       usage: '',
//       stockLevel: '',
//       packSizes: [],
//       reorderLevel: 10,
//       precautions: '',
//       sideEffects: [],
//       prescriptionRequired: false,
//       sku: '',
//       barcode: '',
//       form: 'Tablet',
//       expiryDate: '',
//       image: null,
//       discount: 0
//     });
//     setImagePreview(null);
//     setActiveTab('details');
//   };

//   // Open Add Modal
//   const openAddModal = () => {
//     resetForm();
//     setSelectedMedicine(null);
//     setShowAddModal(true);
//   };

//   // Open View Modal
//   const openViewModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowViewModal(true);
//   };

//   // Open Edit Modal
//   const openEditModal = (medicine) => {
//     setMedicineForm({
//       name: medicine.name,
//       genericName: medicine.genericName || '',
//       category: medicine.category,
//       brand: medicine.brand || 'Generic',
//       manufacturer: medicine.manufacturer || '',
//       productId: medicine.productId || `MED-${medicine.id}`,
//       basePrice: medicine.price,
//       salePrice: medicine.discountedPrice || medicine.price,
//       description: medicine.description || '',
//       usage: medicine.usage || '',
//       stockLevel: medicine.stock,
//       packSizes: medicine.packSizes || [],
//       reorderLevel: medicine.reorderLevel || 10,
//       precautions: medicine.precautions || '',
//       sideEffects: medicine.sideEffects || [],
//       prescriptionRequired: medicine.prescriptionRequired || false,
//       sku: medicine.sku || '',
//       barcode: medicine.barcode || '',
//       form: medicine.form || 'Tablet',
//       expiryDate: medicine.expiry || '',
//       image: medicine.image || null,
//       discount: medicine.discountPercentage || 0
//     });
//     if (medicine.image) {
//       setImagePreview(medicine.image);
//     }
//     setSelectedMedicine(medicine);
//     setShowViewModal(false);
//     setShowAddModal(true);
//   };

//   // Open Delete Modal
//   const openDeleteModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowDeleteModal(true);
//   };

//   // Add/Edit medicine
//   const handleAddMedicine = async (e) => {
//     e.preventDefault();
//     setFormLoading(true);

//     try {
//       const medicineData = {
//         ...medicineForm,
//         basePrice: parseFloat(medicineForm.basePrice) || 0,
//         salePrice: parseFloat(medicineForm.salePrice) || parseFloat(medicineForm.basePrice) || 0,
//         stockLevel: parseInt(medicineForm.stockLevel) || 0,
//         discount: parseFloat(medicineForm.discount) || 0,
//         reorderLevel: parseInt(medicineForm.reorderLevel) || 10
//       };

//       if (selectedMedicine) {
//         await medicinesAPI.update(selectedMedicine.id, medicineData);
//         message.success('Medicine updated successfully');
//       } else {
//         await medicinesAPI.create(medicineData);
//         message.success('Medicine added successfully');
//       }

//       setShowAddModal(false);
//       resetForm();
//       fetchMedicines(currentPage);
//     } catch (error) {
//       console.error('Error saving medicine:', error);
//       message.error(error.response?.data?.message || (selectedMedicine ? 'Failed to update' : 'Failed to add'));
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // Delete medicine
//   const handleDeleteMedicine = async () => {
//     if (!selectedMedicine) return;

//     try {
//       await medicinesAPI.delete(selectedMedicine.id);
//       message.success('Medicine deleted successfully');
//       setShowDeleteModal(false);
//       setSelectedMedicine(null);
//       fetchMedicines(currentPage);
//     } catch (error) {
//       console.error('Error deleting medicine:', error);
//       message.error(error.response?.data?.message || 'Failed to delete medicine');
//     }
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     fetchMedicines(newPage);
//   };

//   // Calculate statistics
//   const stats = {
//     total: pagination.totalItems,
//     categories: categories.length - 1,
//     lowStock: inventoryChartData.find(d => d.name === 'Low Stock')?.value || 0,
//     expiringSoon: recentStockActivity.length,
//     outOfStock: inventoryChartData.find(d => d.name === 'Out of Stock')?.value || 0,
//     totalValue: inventoryChartData.reduce((sum, d) => sum + d.value, 0)
//   };

//   // Stock status colors
//   const stockColors = {
//     'In Stock': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
//     'Low Stock': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
//     'Out of Stock': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
//     'Critical': { bg: 'bg-red-200', text: 'text-red-800', border: 'border-red-300', dot: 'bg-red-600' }
//   };

//   // Category colors
//   const categoryColors = {
//     'Antacid': 'bg-emerald-100 text-emerald-800',
//     'Analgesics': 'bg-purple-100 text-purple-800',
//     'Antibiotics': 'bg-blue-100 text-blue-800',
//     'Allergy': 'bg-amber-100 text-amber-800',
//     'Digestive': 'bg-emerald-100 text-emerald-800',
//     'Vitamins': 'bg-cyan-100 text-cyan-800',
//     'Diabetes': 'bg-pink-100 text-pink-800',
//     'Cardiac': 'bg-red-100 text-red-800',
//     'Cardiovascular': 'bg-rose-100 text-rose-800',
//     'Dermatology': 'bg-indigo-100 text-indigo-800',
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return `Rs ${amount.toLocaleString()}`;
//   };

//   // Toggle section
//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
//       {/* Page Header */}
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//           <div>
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Inventory Management</h1>
//             <p className="text-sm text-gray-600 mt-1">Manage your medicine inventory</p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => fetchMedicines(currentPage)}
//               className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
//             >
//               <RefreshCw size={16} />
//               <span className="hidden sm:inline">Refresh</span>
//             </button>

//             <button
//               onClick={openAddModal}
//               className="flex items-center gap-2 px-4 py-2.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1a3a3a] transition-colors font-medium shadow-sm text-sm"
//             >
//               <Plus size={18} />
//               <span>Add New Product</span>
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Total Products</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
//             <p className="text-xs text-green-600 mt-2">Active inventory</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Categories</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.categories}</p>
//             <p className="text-xs text-blue-600 mt-2">Active categories</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Low Stock</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.lowStock}</p>
//             <p className="text-xs text-amber-600 mt-2">Need reorder</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Recent Updates</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.expiringSoon}</p>
//             <p className="text-xs text-amber-600 mt-2">Last 5 items</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Out of Stock</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.outOfStock}</p>
//             <p className="text-xs text-red-600 mt-2">Critical items</p>
//           </div>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search by name, generic, brand, SKU..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button 
//                 onClick={() => setShowFilterPanel(!showFilterPanel)}
//                 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
//                   showFilterPanel ? 'bg-[#2c6774] text-white border-[#2c6774]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <Filter size={16} />
//                 <span>Filter</span>
//               </button>

//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => {
//                   setItemsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 bg-white text-sm"
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={15}>15</option>
//                 <option value={20}>20</option>
//                 <option value={25}>25</option>
//               </select>
//             </div>
//           </div>

//           {/* Filter Panel */}
//           {showFilterPanel && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => {
//                       setSelectedCategory(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
//                   >
//                     {availableFilters.categories.map(category => (
//                       <option key={category} value={category}>{category}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Brand</label>
//                   <select
//                     value={selectedBrand}
//                     onChange={(e) => {
//                       setSelectedBrand(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
//                   >
//                     {availableFilters.brands.map(brand => (
//                       <option key={brand} value={brand}>{brand}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Form</label>
//                   <select
//                     value={selectedForm}
//                     onChange={(e) => {
//                       setSelectedForm(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
//                   >
//                     <option value="All">All Forms</option>
//                     {medicineForms.map(form => (
//                       <option key={form} value={form}>{form}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
//                   <select
//                     value={selectedStatus}
//                     onChange={(e) => {
//                       setSelectedStatus(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
//                   >
//                     <option value="All">All Status</option>
//                     <option value="In Stock">In Stock</option>
//                     <option value="Low Stock">Low Stock</option>
//                     <option value="Out of Stock">Out of Stock</option>
//                     <option value="Critical">Critical</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Inventory Distribution Chart */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="font-bold text-gray-800">Inventory Distribution</h3>
//               <p className="text-sm text-gray-500">Stock status breakdown</p>
//             </div>
//             <BarChart2 className="text-gray-400" size={20} />
//           </div>

//           <div className="h-48">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={inventoryChartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="name" tick={{ fontSize: 11 }} />
//                 <YAxis tick={{ fontSize: 11 }} />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#2c6774" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="mt-4 grid grid-cols-4 gap-2 text-center">
//             {inventoryChartData.map((item, index) => (
//               <div key={index} className="text-xs">
//                 <div className="font-medium text-gray-900">{item.value}</div>
//                 <div className="text-gray-500">{item.name}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Stock Activity */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="font-bold text-gray-800">Recent Stock Activity</h3>
//               <p className="text-sm text-gray-500">Latest updates</p>
//             </div>
//             <Activity className="text-gray-400" size={20} />
//           </div>

//           <div className="space-y-3">
//             {recentStockActivity.length > 0 ? (
//               recentStockActivity.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-2 h-2 rounded-full ${
//                       item.category === 'Antibiotics' ? 'bg-blue-500' : 
//                       item.category === 'Analgesics' ? 'bg-purple-500' : 'bg-green-500'
//                     }`}></div>
//                     <div>
//                       <p className="font-medium text-gray-900">{item.name}</p>
//                       <p className="text-xs text-gray-500">{item.category}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock size={12} className="text-gray-400" />
//                     <span className="text-xs text-gray-600">{item.days} days ago</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500 py-4">No recent activity</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Products Display */}
//       {loading ? (
//         <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//           <div className="w-10 h-10 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading medicines...</p>
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table View */}
//           <div className="hidden md:block">
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Product</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Category</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Brand</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">SKU</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Form</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Stock</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Unit Price</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Value</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
//                       <th className="text-right py-4 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {medicines.length > 0 ? (
//                       medicines.map((medicine) => (
//                         <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
//                           <td className="py-4 px-4">
//                             <div className="flex items-center gap-2">
//                               {medicine.image && (
//                                 <img src={medicine.image} alt={medicine.name} className="w-8 h-8 rounded object-cover" />
//                               )}
//                               <div>
//                                 <p className="font-semibold text-gray-900">{medicine.name}</p>
//                                 <p className="text-xs text-gray-500">{medicine.genericName}</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[medicine.category] || 'bg-gray-100 text-gray-700'}`}>
//                               {medicine.category}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4 text-sm text-gray-600">{medicine.brand}</td>
//                           <td className="py-4 px-4 text-sm text-gray-600">{medicine.sku}</td>
//                           <td className="py-4 px-4 text-sm text-gray-600">{medicine.form}</td>
//                           <td className="py-4 px-4">
//                             <span className={`font-medium ${
//                               medicine.stock <= medicine.reorderLevel ? 'text-amber-600' : 
//                               medicine.stock === 0 ? 'text-red-600' : 'text-gray-900'
//                             }`}>
//                               {medicine.stock}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             {medicine.discountedPrice ? (
//                               <div>
//                                 <span className="text-xs text-gray-500 line-through">{formatCurrency(medicine.price)}</span>
//                                 <p className="font-semibold text-green-600 text-sm">{formatCurrency(medicine.discountedPrice)}</p>
//                               </div>
//                             ) : (
//                               <p className="font-semibold text-gray-900">{formatCurrency(medicine.price)}</p>
//                             )}
//                           </td>
//                           <td className="py-4 px-4 font-medium text-gray-900">
//                             {formatCurrency(medicine.value)}
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full border ${
//                               stockColors[medicine.status]?.bg || 'bg-gray-100'
//                             } ${stockColors[medicine.status]?.border || 'border-gray-200'}`}>
//                               <span className={`w-1.5 h-1.5 rounded-full ${stockColors[medicine.status]?.dot || 'bg-gray-500'}`}></span>
//                               {medicine.status}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <div className="flex justify-end gap-1">
//                               <button
//                                 onClick={() => openViewModal(medicine)}
//                                 className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                 title="View"
//                               >
//                                 <Eye size={16} />
//                               </button>
//                               <button
//                                 onClick={() => openEditModal(medicine)}
//                                 className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                 title="Edit"
//                               >
//                                 <Edit size={16} />
//                               </button>
//                               <button
//                                 onClick={() => openDeleteModal(medicine)}
//                                 className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                 title="Delete"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="10" className="py-12 text-center text-gray-500">
//                           No products found matching your criteria
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Mobile View - Simplified for brevity */}
//           <div className="md:hidden">
//             {/* Mobile view code - similar structure but with cards */}
//           </div>

//           {/* Pagination */}
//           {pagination.totalItems > 0 && (
//             <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <p className="text-sm text-gray-600">
//                 Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems}
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={!pagination.hasPrev}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>
//                 <span className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm">
//                   {pagination.currentPage}
//                 </span>
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={!pagination.hasNext}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Add/Edit Modal - Keep the same UI as before */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-xl w-full max-w-4xl my-8">
//             {/* Modal content - same as before */}
//             {/* ... */}
//           </div>
//         </div>
//       )}

//       {/* View Modal - Keep the same UI as before */}
//       {showViewModal && selectedMedicine && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             {/* Modal content - same as before */}
//             {/* ... */}
//           </div>
//         </div>
//       )}

//       {/* Delete Modal */}
//       {showDeleteModal && selectedMedicine && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl w-full max-w-md p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 rounded-full bg-red-100">
//                 <AlertCircle className="text-red-600" size={24} />
//               </div>
//               <h2 className="text-xl font-bold">Delete Medicine</h2>
//             </div>

//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete <span className="font-semibold">{selectedMedicine.name}</span>? This action cannot be undone.
//             </p>

//             {selectedMedicine.stock > 0 && (
//               <div className="p-3 bg-amber-50 rounded-lg mb-4">
//                 <p className="text-sm text-amber-700">
//                   ⚠️ This medicine has {selectedMedicine.stock} units in stock.
//                 </p>
//               </div>
//             )}

//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
//                 Cancel
//               </button>
//               <button onClick={handleDeleteMedicine} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;






















// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, Edit, Trash2, Search, Package, Eye, 
//   AlertCircle, X, Save, Pill, Filter, ChevronLeft, ChevronRight,
//   RefreshCw, Download, Grid, List, Menu, Upload,
//   ChevronDown, ChevronUp, Image as ImageIcon,
//   BarChart2, TrendingUp, Clock, Activity
// } from 'lucide-react';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';

// const ProductsPage = () => {
//   // State variables
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [selectedForm, setSelectedForm] = useState('All');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10,
//     hasPrev: false,
//     hasNext: false
//   });
//   const [availableFilters, setAvailableFilters] = useState({
//     categories: ['All'],
//     brands: ['All']
//   });
//   const [pharmacyId, setPharmacyId] = useState(null);
//   const [activeTab, setActiveTab] = useState('basic');

//   // Chart states
//   const [inventoryChartData, setInventoryChartData] = useState([
//     { name: 'In Stock', value: 0 },
//     { name: 'Low Stock', value: 0 },
//     { name: 'Out of Stock', value: 0 },
//     { name: 'Expired', value: 0 }
//   ]);

//   const [recentStockActivity, setRecentStockActivity] = useState([]);

//   const COLORS = ['#2c6774', '#f59e0b', '#ef4444', '#6b7280'];

//   // Form state for Add/Edit - COMPLETE as per your model
//   const [medicineForm, setMedicineForm] = useState({
//     name: '',
//     genericName: '',
//     description: '',
//     detailedDescription: '',
//     price: '',
//     discountedPrice: '',
//     discountPercentage: 0,
//     inStock: true,
//     stockQuantity: '',
//     reorderLevel: 10,
//     category: '',
//     dosage: 'As prescribed',
//     strength: '',
//     form: 'Tablet',
//     manufacturer: '',
//     image: null,
//     sideEffects: [],
//     uses: [],
//     precautions: [],
//     instructions: [],
//     storageInstructions: 'Store in a cool, dry place away from direct sunlight',
//     tags: [],
//     isFeatured: false,
//     sku: '',
//     barcode: '',
//     packSizes: [],
//     expiryDate: '',
//     tabletsPerUnit: 10 // ✅ NEW FIELD: kitni tablets per unit
//   });

//   // Medicine forms
//   const [medicineForms] = useState(['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray']);

//   // Pack size options
//   const [packSizeOptions] = useState(['50ml Bottle', '100ml Bottle', '150ml Bottle', '200ml Bottle', '10 Tablets', '20 Tablets', '30 Tablets', '50 Tablets', '100 Tablets']);

//   // Get pharmacy ID from localStorage
//   useEffect(() => {
//     const storedPharmacyId = localStorage.getItem('pharmacyId');
//     if (storedPharmacyId) {
//       setPharmacyId(storedPharmacyId);
//     }
//   }, []);

//   // Fetch medicines from API
//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);

//       if (!pharmacyId) {
//         console.log('No pharmacy ID found');
//         setLoading(false);
//         return;
//       }

//       const response = await pharmacyAPI.getInventory(pharmacyId);

//       if (response.data?.success) {
//         const medicinesData = response.data.data || [];

//         // Transform data for display
//         const transformedMedicines = medicinesData.map(med => ({
//           id: med._id,
//           name: med.name,
//           genericName: med.genericName || '',
//           category: med.category || 'Other',
//           brand: med.manufacturer || 'Generic',
//           sku: med.sku || `SKU-${med._id.slice(-6)}`,
//           form: med.form || 'Tablet',
//           stock: med.stockQuantity || 0,
//           price: med.price || 0,
//           discountedPrice: med.discountedPrice || null,
//           value: (med.price || 0) * (med.stockQuantity || 0),
//           status: calculateStatus(med.stockQuantity || 0, med.reorderLevel || 10),
//           reorderLevel: med.reorderLevel || 10,
//           image: med.image,
//           description: med.description || '',
//           manufacturer: med.manufacturer || '',
//           expiryDate: med.expiryDate || '',
//           sideEffects: med.sideEffects || [],
//           precautions: med.precautions || [],
//           tabletsPerUnit: med.tabletsPerUnit || 10
//         }));

//         setMedicines(transformedMedicines);

//         // Update pagination
//         setPagination({
//           currentPage: 1,
//           totalPages: Math.ceil(transformedMedicines.length / itemsPerPage),
//           totalItems: transformedMedicines.length,
//           itemsPerPage: itemsPerPage,
//           hasPrev: false,
//           hasNext: transformedMedicines.length > itemsPerPage
//         });

//         // Update chart data
//         updateChartData(transformedMedicines);

//         // Update filters
//         updateFilters(transformedMedicines);
//       }

//     } catch (error) {
//       console.error('Error fetching medicines:', error);
//       message.error('Failed to load medicines');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update chart data
//   const updateChartData = (medicinesData) => {
//     let inStock = 0;
//     let lowStock = 0;
//     let outOfStock = 0;
//     let expired = 0;

//     medicinesData.forEach(med => {
//       if (med.stock === 0) {
//         outOfStock++;
//       } else if (med.stock <= 5) {
//         lowStock++;
//       } else {
//         inStock++;
//       }

//       if (med.expiryDate) {
//         const expiry = new Date(med.expiryDate);
//         if (expiry < new Date()) {
//           expired++;
//         }
//       }
//     });

//     setInventoryChartData([
//       { name: 'In Stock', value: inStock },
//       { name: 'Low Stock', value: lowStock },
//       { name: 'Out of Stock', value: outOfStock },
//       { name: 'Expired', value: expired }
//     ]);

//     const recent = medicinesData.slice(0, 5).map(med => ({
//       name: med.name,
//       category: med.category,
//       days: Math.floor(Math.random() * 10) + 1
//     }));
//     setRecentStockActivity(recent);
//   };

//   // Update filters
//   const updateFilters = (medicinesData) => {
//     const categories = ['All', ...new Set(medicinesData.map(m => m.category).filter(Boolean))];
//     const brands = ['All', ...new Set(medicinesData.map(m => m.brand).filter(Boolean))];
//     setAvailableFilters({ categories, brands });
//   };

//   useEffect(() => {
//     if (pharmacyId) {
//       fetchMedicines();
//     }
//   }, [pharmacyId]);

//   // Calculate status
//   const calculateStatus = (stock, reorderLevel = 10) => {
//     if (stock === 0) return 'Out of Stock';
//     if (stock <= 5) return 'Critical';
//     if (stock <= reorderLevel) return 'Low Stock';
//     return 'In Stock';
//   };

//   // Handle form changes
//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === 'packSizes' && e.target.options) {
//       const options = e.target.options;
//       const selected = [];
//       for (let i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//           selected.push(options[i].value);
//         }
//       }
//       setMedicineForm(prev => ({ ...prev, packSizes: selected }));
//     } else if (name === 'sideEffects' || name === 'uses' || name === 'precautions' || name === 'instructions' || name === 'tags') {
//       const items = value.split(',').map(item => item.trim());
//       setMedicineForm(prev => ({ ...prev, [name]: items }));
//     } else {
//       setMedicineForm(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }

//     // Auto-calculate discount percentage
//     if (name === 'price' || name === 'discountedPrice') {
//       const price = parseFloat(name === 'price' ? value : medicineForm.price) || 0;
//       const discountedPrice = parseFloat(name === 'discountedPrice' ? value : medicineForm.discountedPrice) || 0;
//       if (price > 0 && discountedPrice > 0) {
//         const discountPercentage = Math.round(((price - discountedPrice) / price) * 100);
//         setMedicineForm(prev => ({ ...prev, discountPercentage }));
//       }
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setMedicineForm(prev => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setMedicineForm({
//       name: '',
//       genericName: '',
//       description: '',
//       detailedDescription: '',
//       price: '',
//       discountedPrice: '',
//       discountPercentage: 0,
//       inStock: true,
//       stockQuantity: '',
//       reorderLevel: 10,
//       category: '',
//       dosage: 'As prescribed',
//       strength: '',
//       form: 'Tablet',
//       manufacturer: '',
//       image: null,
//       sideEffects: [],
//       uses: [],
//       precautions: [],
//       instructions: [],
//       storageInstructions: 'Store in a cool, dry place away from direct sunlight',
//       tags: [],
//       isFeatured: false,
//       sku: '',
//       barcode: '',
//       packSizes: [],
//       expiryDate: '',
//       tabletsPerUnit: 10
//     });
//     setImagePreview(null);
//     setActiveTab('basic');
//   };

//   // Open Add Modal
//   const openAddModal = () => {
//     resetForm();
//     setSelectedMedicine(null);
//     setShowAddModal(true);
//   };

//   // Open View Modal
//   const openViewModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowViewModal(true);
//   };

//   // Open Edit Modal
//   const openEditModal = (medicine) => {
//     setMedicineForm({
//       name: medicine.name,
//       genericName: medicine.genericName || '',
//       description: medicine.description || '',
//       detailedDescription: medicine.detailedDescription || '',
//       price: medicine.price || '',
//       discountedPrice: medicine.discountedPrice || '',
//       discountPercentage: medicine.discountPercentage || 0,
//       inStock: medicine.inStock !== false,
//       stockQuantity: medicine.stock || '',
//       reorderLevel: medicine.reorderLevel || 10,
//       category: medicine.category || '',
//       dosage: medicine.dosage || 'As prescribed',
//       strength: medicine.strength || '',
//       form: medicine.form || 'Tablet',
//       manufacturer: medicine.manufacturer || '',
//       image: medicine.image || null,
//       sideEffects: medicine.sideEffects || [],
//       uses: medicine.uses || [],
//       precautions: medicine.precautions || [],
//       instructions: medicine.instructions || [],
//       storageInstructions: medicine.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//       tags: medicine.tags || [],
//       isFeatured: medicine.isFeatured || false,
//       sku: medicine.sku || '',
//       barcode: medicine.barcode || '',
//       packSizes: medicine.packSizes || [],
//       expiryDate: medicine.expiryDate || '',
//       tabletsPerUnit: medicine.tabletsPerUnit || 10
//     });
//     if (medicine.image) {
//       setImagePreview(medicine.image);
//     }
//     setSelectedMedicine(medicine);
//     setShowViewModal(false);
//     setShowAddModal(true);
//   };

//   // Open Delete Modal
//   const openDeleteModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowDeleteModal(true);
//   };

//   // Add/Edit medicine
//   const handleAddMedicine = async (e) => {
//     e.preventDefault();
//     setFormLoading(true);

//     try {
//       if (!pharmacyId) {
//         message.error('Pharmacy ID not found');
//         return;
//       }

//       const medicineData = {
//         name: medicineForm.name,
//         genericName: medicineForm.genericName,
//         description: medicineForm.description,
//         detailedDescription: medicineForm.detailedDescription,
//         price: parseFloat(medicineForm.price) || 0,
//         discountedPrice: parseFloat(medicineForm.discountedPrice) || null,
//         discountPercentage: medicineForm.discountPercentage,
//         inStock: medicineForm.inStock,
//         stockQuantity: parseInt(medicineForm.stockQuantity) || 0,
//         reorderLevel: parseInt(medicineForm.reorderLevel) || 10,
//         category: medicineForm.category,
//         dosage: medicineForm.dosage,
//         strength: medicineForm.strength,
//         form: medicineForm.form,
//         manufacturer: medicineForm.manufacturer,
//         image: medicineForm.image,
//         sideEffects: medicineForm.sideEffects,
//         uses: medicineForm.uses,
//         precautions: medicineForm.precautions,
//         instructions: medicineForm.instructions,
//         storageInstructions: medicineForm.storageInstructions,
//         tags: medicineForm.tags,
//         isFeatured: medicineForm.isFeatured,
//         sku: medicineForm.sku,
//         barcode: medicineForm.barcode,
//         packSizes: medicineForm.packSizes,
//         expiryDate: medicineForm.expiryDate,
//         tabletsPerUnit: parseInt(medicineForm.tabletsPerUnit) || 10
//       };

//       if (selectedMedicine) {
//         await pharmacyAPI.updateMedicine(pharmacyId, selectedMedicine.id, medicineData);
//         message.success('Medicine updated successfully');
//       } else {
//         await pharmacyAPI.addMedicine(pharmacyId, medicineData);
//         message.success('Medicine added successfully');
//       }

//       setShowAddModal(false);
//       resetForm();
//       fetchMedicines();
//     } catch (error) {
//       console.error('Error saving medicine:', error);
//       message.error(error.response?.data?.message || (selectedMedicine ? 'Failed to update' : 'Failed to add'));
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // Delete medicine
//   const handleDeleteMedicine = async () => {
//     if (!selectedMedicine || !pharmacyId) return;

//     try {
//       await pharmacyAPI.deleteMedicine(pharmacyId, selectedMedicine.id);
//       message.success('Medicine deleted successfully');
//       setShowDeleteModal(false);
//       setSelectedMedicine(null);
//       fetchMedicines();
//     } catch (error) {
//       console.error('Error deleting medicine:', error);
//       message.error(error.response?.data?.message || 'Failed to delete medicine');
//     }
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   // Get filtered medicines
//   const getFilteredMedicines = () => {
//     return medicines.filter(med => {
//       const matchesSearch = searchTerm === '' || 
//         med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         med.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         med.brand?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
//       const matchesBrand = selectedBrand === 'All' || med.brand === selectedBrand;
//       const matchesForm = selectedForm === 'All' || med.form === selectedForm;
//       const matchesStatus = selectedStatus === 'All' || med.status === selectedStatus;

//       return matchesSearch && matchesCategory && matchesBrand && matchesForm && matchesStatus;
//     });
//   };

//   // Get current page items
//   const getCurrentPageItems = () => {
//     const filtered = getFilteredMedicines();
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     return filtered.slice(start, end);
//   };

//   // Calculate statistics
//   const stats = {
//     total: medicines.length,
//     categories: availableFilters.categories.length - 1,
//     lowStock: medicines.filter(m => m.status === 'Low Stock' || m.status === 'Critical').length,
//     expiringSoon: medicines.filter(m => {
//       if (!m.expiryDate) return false;
//       const expiry = new Date(m.expiryDate);
//       const now = new Date();
//       const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
//       return diffDays <= 30 && diffDays > 0;
//     }).length,
//     outOfStock: medicines.filter(m => m.status === 'Out of Stock').length,
//     totalValue: medicines.reduce((sum, m) => sum + m.value, 0)
//   };

//   // Stock status colors
//   const stockColors = {
//     'In Stock': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
//     'Low Stock': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
//     'Out of Stock': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
//     'Critical': { bg: 'bg-red-200', text: 'text-red-800', border: 'border-red-300', dot: 'bg-red-600' }
//   };

//   // Category colors
//   const categoryColors = {
//     'Antacid': 'bg-emerald-100 text-emerald-800',
//     'Analgesics': 'bg-purple-100 text-purple-800',
//     'Antibiotics': 'bg-blue-100 text-blue-800',
//     'Allergy': 'bg-amber-100 text-amber-800',
//     'Digestive': 'bg-emerald-100 text-emerald-800',
//     'Vitamins': 'bg-cyan-100 text-cyan-800',
//     'Diabetes': 'bg-pink-100 text-pink-800',
//     'Cardiac': 'bg-red-100 text-red-800',
//     'Cardiovascular': 'bg-rose-100 text-rose-800',
//     'Dermatology': 'bg-indigo-100 text-indigo-800',
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return `Rs ${amount.toLocaleString()}`;
//   };

//   const currentItems = getCurrentPageItems();
//   const filteredTotal = getFilteredMedicines().length;

//   return (
//     <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
//       {/* Page Header */}
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//           <div>
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Inventory Management</h1>
//             <p className="text-sm text-gray-600 mt-1">Manage your medicine inventory</p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => fetchMedicines()}
//               className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
//             >
//               <RefreshCw size={16} />
//               <span className="hidden sm:inline">Refresh</span>
//             </button>

//             <button
//               onClick={openAddModal}
//               className="flex items-center gap-2 px-4 py-2.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1a3a3a] transition-colors font-medium shadow-sm text-sm"
//             >
//               <Plus size={18} />
//               <span>Add New Product</span>
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Total Products</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
//             <p className="text-xs text-green-600 mt-2">Active inventory</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Categories</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.categories}</p>
//             <p className="text-xs text-blue-600 mt-2">Active categories</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Low Stock</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.lowStock}</p>
//             <p className="text-xs text-amber-600 mt-2">Need reorder</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Expiring Soon</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.expiringSoon}</p>
//             <p className="text-xs text-amber-600 mt-2">Within 30 days</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <p className="text-xs text-gray-500">Out of Stock</p>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.outOfStock}</p>
//             <p className="text-xs text-red-600 mt-2">Critical items</p>
//           </div>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search by name, generic, brand, SKU..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button 
//                 onClick={() => setShowFilterPanel(!showFilterPanel)}
//                 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
//                   showFilterPanel ? 'bg-[#2c6774] text-white border-[#2c6774]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <Filter size={16} />
//                 <span>Filter</span>
//               </button>

//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => {
//                   setItemsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 bg-white text-sm"
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={15}>15</option>
//                 <option value={20}>20</option>
//                 <option value={25}>25</option>
//               </select>
//             </div>
//           </div>

//           {/* Filter Panel */}
//           {showFilterPanel && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => {
//                       setSelectedCategory(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
//                   >
//                     {availableFilters.categories.map(category => (
//                       <option key={category} value={category}>{category}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Brand</label>
//                   <select
//                     value={selectedBrand}
//                     onChange={(e) => {
//                       setSelectedBrand(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
//                   >
//                     {availableFilters.brands.map(brand => (
//                       <option key={brand} value={brand}>{brand}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Form</label>
//                   <select
//                     value={selectedForm}
//                     onChange={(e) => {
//                       setSelectedForm(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
//                   >
//                     <option value="All">All Forms</option>
//                     {medicineForms.map(form => (
//                       <option key={form} value={form}>{form}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
//                   <select
//                     value={selectedStatus}
//                     onChange={(e) => {
//                       setSelectedStatus(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm bg-white"
//                   >
//                     <option value="All">All Status</option>
//                     <option value="In Stock">In Stock</option>
//                     <option value="Low Stock">Low Stock</option>
//                     <option value="Out of Stock">Out of Stock</option>
//                     <option value="Critical">Critical</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Inventory Distribution Chart */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="font-bold text-gray-800">Inventory Distribution</h3>
//               <p className="text-sm text-gray-500">Stock status breakdown</p>
//             </div>
//             <BarChart2 className="text-gray-400" size={20} />
//           </div>

//           <div className="h-48">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={inventoryChartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="name" tick={{ fontSize: 11 }} />
//                 <YAxis tick={{ fontSize: 11 }} />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#2c6774" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="mt-4 grid grid-cols-4 gap-2 text-center">
//             {inventoryChartData.map((item, index) => (
//               <div key={index} className="text-xs">
//                 <div className="font-medium text-gray-900">{item.value}</div>
//                 <div className="text-gray-500">{item.name}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Stock Activity */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="font-bold text-gray-800">Recent Stock Activity</h3>
//               <p className="text-sm text-gray-500">Latest updates</p>
//             </div>
//             <Activity className="text-gray-400" size={20} />
//           </div>

//           <div className="space-y-3">
//             {recentStockActivity.length > 0 ? (
//               recentStockActivity.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-2 h-2 rounded-full ${
//                       item.category === 'Antibiotics' ? 'bg-blue-500' : 
//                       item.category === 'Analgesics' ? 'bg-purple-500' : 'bg-green-500'
//                     }`}></div>
//                     <div>
//                       <p className="font-medium text-gray-900">{item.name}</p>
//                       <p className="text-xs text-gray-500">{item.category}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock size={12} className="text-gray-400" />
//                     <span className="text-xs text-gray-600">{item.days} days ago</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500 py-4">No recent activity</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Products Display */}
//       {loading ? (
//         <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//           <div className="w-10 h-10 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading medicines...</p>
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table View */}
//           <div className="hidden md:block">
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Product</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Category</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Brand</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">SKU</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Form</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Stock</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Unit Price</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Value</th>
//                       <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
//                       <th className="text-right py-4 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {currentItems.length > 0 ? (
//                       currentItems.map((medicine) => (
//                         <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
//                           <td className="py-4 px-4">
//                             <div className="flex items-center gap-2">
//                               {medicine.image && (
//                                 <img src={medicine.image} alt={medicine.name} className="w-8 h-8 rounded object-cover" />
//                               )}
//                               <div>
//                                 <p className="font-semibold text-gray-900">{medicine.name}</p>
//                                 <p className="text-xs text-gray-500">{medicine.genericName}</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[medicine.category] || 'bg-gray-100 text-gray-700'}`}>
//                               {medicine.category}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4 text-sm text-gray-600">{medicine.brand}</td>
//                           <td className="py-4 px-4 text-sm text-gray-600">{medicine.sku}</td>
//                           <td className="py-4 px-4 text-sm text-gray-600">{medicine.form}</td>
//                           <td className="py-4 px-4">
//                             <span className={`font-medium ${
//                               medicine.stock <= medicine.reorderLevel ? 'text-amber-600' : 
//                               medicine.stock === 0 ? 'text-red-600' : 'text-gray-900'
//                             }`}>
//                               {medicine.stock}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             {medicine.discountedPrice ? (
//                               <div>
//                                 <span className="text-xs text-gray-500 line-through">{formatCurrency(medicine.price)}</span>
//                                 <p className="font-semibold text-green-600 text-sm">{formatCurrency(medicine.discountedPrice)}</p>
//                               </div>
//                             ) : (
//                               <p className="font-semibold text-gray-900">{formatCurrency(medicine.price)}</p>
//                             )}
//                           </td>
//                           <td className="py-4 px-4 font-medium text-gray-900">
//                             {formatCurrency(medicine.value)}
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full border ${
//                               stockColors[medicine.status]?.bg || 'bg-gray-100'
//                             } ${stockColors[medicine.status]?.border || 'border-gray-200'}`}>
//                               <span className={`w-1.5 h-1.5 rounded-full ${stockColors[medicine.status]?.dot || 'bg-gray-500'}`}></span>
//                               {medicine.status}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <div className="flex justify-end gap-1">
//                               <button
//                                 onClick={() => openViewModal(medicine)}
//                                 className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                 title="View"
//                               >
//                                 <Eye size={16} />
//                               </button>
//                               <button
//                                 onClick={() => openEditModal(medicine)}
//                                 className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                 title="Edit"
//                               >
//                                 <Edit size={16} />
//                               </button>
//                               <button
//                                 onClick={() => openDeleteModal(medicine)}
//                                 className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                 title="Delete"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="10" className="py-12 text-center text-gray-500">
//                           No products found matching your criteria
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Pagination */}
//           {filteredTotal > 0 && (
//             <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <p className="text-sm text-gray-600">
//                 Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTotal)} of {filteredTotal}
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>
//                 <span className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm">
//                   {currentPage}
//                 </span>
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage >= Math.ceil(filteredTotal / itemsPerPage)}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Add/Edit Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-xl w-full max-w-4xl my-8">
//             {/* Modal Header */}
//             <div className="p-6 border-b border-gray-200 flex justify-between items-center  top-0 bg-white rounded-t-xl z-10">
//               <h2 className="text-xl font-bold">{selectedMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>
//               <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Tab Navigation */}
//             <div className="px-6 pt-4 border-b border-gray-200 flex gap-4">
//               <button
//                 onClick={() => setActiveTab('basic')}
//                 className={`pb-2 px-1 font-medium text-sm border-b-2 transition-colors ${
//                   activeTab === 'basic' ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Basic Info
//               </button>
//               <button
//                 onClick={() => setActiveTab('pricing')}
//                 className={`pb-2 px-1 font-medium text-sm border-b-2 transition-colors ${
//                   activeTab === 'pricing' ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Pricing & Stock
//               </button>
//               <button
//                 onClick={() => setActiveTab('details')}
//                 className={`pb-2 px-1 font-medium text-sm border-b-2 transition-colors ${
//                   activeTab === 'details' ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Details
//               </button>
//               <button
//                 onClick={() => setActiveTab('additional')}
//                 className={`pb-2 px-1 font-medium text-sm border-b-2 transition-colors ${
//                   activeTab === 'additional' ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Additional
//               </button>
//             </div>

//             <form onSubmit={handleAddMedicine} className="p-6">
//               {/* Basic Info Tab */}
//               {activeTab === 'basic' && (
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Product Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={medicineForm.name}
//                         onChange={handleFormChange}
//                         required
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                         placeholder="e.g., Gaviscon Suspension"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Generic Name
//                       </label>
//                       <input
//                         type="text"
//                         name="genericName"
//                         value={medicineForm.genericName}
//                         onChange={handleFormChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                         placeholder="e.g., Aluminium Hydroxide"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Manufacturer
//                       </label>
//                       <input
//                         type="text"
//                         name="manufacturer"
//                         value={medicineForm.manufacturer}
//                         onChange={handleFormChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                         placeholder="e.g., Reckitt Benckiser"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Category <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="category"
//                         value={medicineForm.category}
//                         onChange={handleFormChange}
//                         required
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                         placeholder="e.g., Antacid"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Form
//                       </label>
//                       <select
//                         name="form"
//                         value={medicineForm.form}
//                         onChange={handleFormChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       >
//                         {medicineForms.map(form => (
//                           <option key={form} value={form}>{form}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Strength
//                       </label>
//                       <input
//                         type="text"
//                         name="strength"
//                         value={medicineForm.strength}
//                         onChange={handleFormChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                         placeholder="e.g., 500mg"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         SKU
//                       </label>
//                       <input
//                         type="text"
//                         name="sku"
//                         value={medicineForm.sku}
//                         onChange={handleFormChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Barcode
//                       </label>
//                       <input
//                         type="text"
//                         name="barcode"
//                         value={medicineForm.barcode}
//                         onChange={handleFormChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Product Image
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
//                         {imagePreview ? (
//                           <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                         ) : (
//                           <ImageIcon className="text-gray-400" size={24} />
//                         )}
//                       </div>
//                       <label className="cursor-pointer">
//                         <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//                           <Upload size={16} />
//                           <span>Upload Image</span>
//                         </div>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleImageUpload}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="description"
//                       value={medicineForm.description}
//                       onChange={handleFormChange}
//                       required
//                       rows="3"
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="For relief of heartburn and acid indigestion..."
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Pricing & Stock Tab */}
//               {activeTab === 'pricing' && (
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Price (Rs) <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={medicineForm.price}
//                         onChange={handleFormChange}
//                         required
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Discounted Price (Rs)
//                       </label>
//                       <input
//                         type="number"
//                         name="discountedPrice"
//                         value={medicineForm.discountedPrice}
//                         onChange={handleFormChange}
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Discount %
//                       </label>
//                       <input
//                         type="number"
//                         name="discountPercentage"
//                         value={medicineForm.discountPercentage}
//                         readOnly
//                         className="w-full px-3 py-2 bg-gray-100 border rounded-lg text-gray-600"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Stock Quantity
//                       </label>
//                       <input
//                         type="number"
//                         name="stockQuantity"
//                         value={medicineForm.stockQuantity}
//                         onChange={handleFormChange}
//                         min="0"
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Reorder Level
//                       </label>
//                       <input
//                         type="number"
//                         name="reorderLevel"
//                         value={medicineForm.reorderLevel}
//                         onChange={handleFormChange}
//                         min="0"
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Tablets Per Unit
//                       </label>
//                       <input
//                         type="number"
//                         name="tabletsPerUnit"
//                         value={medicineForm.tabletsPerUnit}
//                         onChange={handleFormChange}
//                         min="1"
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                         placeholder="e.g., 10"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Expiry Date
//                       </label>
//                       <input
//                         type="date"
//                         name="expiryDate"
//                         value={medicineForm.expiryDate}
//                         onChange={handleFormChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           name="inStock"
//                           checked={medicineForm.inStock}
//                           onChange={handleFormChange}
//                           className="w-4 h-4 text-[#2c6774]"
//                         />
//                         <span className="text-sm text-gray-700">In Stock</span>
//                       </label>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Pack Sizes
//                     </label>
//                     <select
//                       name="packSizes"
//                       multiple
//                       value={medicineForm.packSizes}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] h-32"
//                     >
//                       {packSizeOptions.map(size => (
//                         <option key={size} value={size}>{size}</option>
//                       ))}
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
//                   </div>
//                 </div>
//               )}

//               {/* Details Tab */}
//               {activeTab === 'details' && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Dosage
//                     </label>
//                     <input
//                       type="text"
//                       name="dosage"
//                       value={medicineForm.dosage}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="e.g., As prescribed"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Detailed Description
//                     </label>
//                     <textarea
//                       name="detailedDescription"
//                       value={medicineForm.detailedDescription}
//                       onChange={handleFormChange}
//                       rows="3"
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="Additional details about the medicine..."
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Uses (comma separated)
//                     </label>
//                     <input
//                       type="text"
//                       name="uses"
//                       value={medicineForm.uses.join(', ')}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="e.g., Heartburn, Acid Indigestion"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Side Effects (comma separated)
//                     </label>
//                     <input
//                       type="text"
//                       name="sideEffects"
//                       value={medicineForm.sideEffects.join(', ')}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="e.g., Constipation, Diarrhea, Nausea"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Precautions (comma separated)
//                     </label>
//                     <input
//                       type="text"
//                       name="precautions"
//                       value={medicineForm.precautions.join(', ')}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="e.g., Consult doctor if symptoms persist"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Instructions (comma separated)
//                     </label>
//                     <input
//                       type="text"
//                       name="instructions"
//                       value={medicineForm.instructions.join(', ')}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="e.g., Take after meals, Shake well before use"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Storage Instructions
//                     </label>
//                     <input
//                       type="text"
//                       name="storageInstructions"
//                       value={medicineForm.storageInstructions}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Additional Tab */}
//               {activeTab === 'additional' && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Tags (comma separated)
//                     </label>
//                     <input
//                       type="text"
//                       name="tags"
//                       value={medicineForm.tags.join(', ')}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="e.g., prescription, over-the-counter, pediatric"
//                     />
//                   </div>

//                   <div className="flex items-center">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         name="isFeatured"
//                         checked={medicineForm.isFeatured}
//                         onChange={handleFormChange}
//                         className="w-4 h-4 text-[#2c6774]"
//                       />
//                       <span className="text-sm text-gray-700">Featured Product</span>
//                     </label>
//                   </div>
//                 </div>
//               )}

//               {/* Modal Footer */}
//               <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-6 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={formLoading}
//                   className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] disabled:opacity-50"
//                 >
//                   {formLoading ? 'Saving...' : (selectedMedicine ? 'Update Medicine' : 'Save Medicine')}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* View Modal */}
//       {showViewModal && selectedMedicine && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
//               <h2 className="text-xl font-bold">{selectedMedicine.name}</h2>
//               <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-500">Generic Name</p>
//                   <p className="font-medium">{selectedMedicine.genericName || '-'}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Category</p>
//                   <p className="font-medium">{selectedMedicine.category}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Manufacturer</p>
//                   <p className="font-medium">{selectedMedicine.manufacturer || '-'}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Form</p>
//                   <p className="font-medium">{selectedMedicine.form}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Price</p>
//                   <p className="font-medium">{formatCurrency(selectedMedicine.price)}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Stock</p>
//                   <p className="font-medium">{selectedMedicine.stock} units</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">SKU</p>
//                   <p className="font-medium">{selectedMedicine.sku || '-'}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Tablets/Unit</p>
//                   <p className="font-medium">{selectedMedicine.tabletsPerUnit || 10}</p>
//                 </div>
//               </div>

//               <div>
//                 <p className="text-xs text-gray-500">Description</p>
//                 <p className="text-sm">{selectedMedicine.description || '-'}</p>
//               </div>

//               {selectedMedicine.sideEffects?.length > 0 && (
//                 <div>
//                   <p className="text-xs text-gray-500">Side Effects</p>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {selectedMedicine.sideEffects.map((effect, i) => (
//                       <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs">
//                         {effect}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {selectedMedicine.precautions?.length > 0 && (
//                 <div>
//                   <p className="text-xs text-gray-500">Precautions</p>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {selectedMedicine.precautions.map((precaution, i) => (
//                       <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
//                         {precaution}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Modal */}
//       {showDeleteModal && selectedMedicine && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl w-full max-w-md p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 rounded-full bg-red-100">
//                 <AlertCircle className="text-red-600" size={24} />
//               </div>
//               <h2 className="text-xl font-bold">Delete Medicine</h2>
//             </div>

//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete <span className="font-semibold">{selectedMedicine.name}</span>? This action cannot be undone.
//             </p>

//             {selectedMedicine.stock > 0 && (
//               <div className="p-3 bg-amber-50 rounded-lg mb-4">
//                 <p className="text-sm text-amber-700">
//                   ⚠️ This medicine has {selectedMedicine.stock} units in stock.
//                 </p>
//               </div>
//             )}

//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
//                 Cancel
//               </button>
//               <button onClick={handleDeleteMedicine} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;













































// Removing add modal
// ProductsPage.jsx - Complete Updated Version
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus, Edit, Trash2, Search, Package, Eye,
  AlertCircle, X, RefreshCw, Filter, ChevronLeft, ChevronRight,
  Image as ImageIcon, BarChart2, Clock, Activity
} from 'lucide-react';
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
  const [pharmacyId, setPharmacyId] = useState(null);

  // Chart states
  const [inventoryChartData, setInventoryChartData] = useState([
    { name: 'In Stock', value: 0 },
    { name: 'Low Stock', value: 0 },
    { name: 'Out of Stock', value: 0 },
    { name: 'Expired', value: 0 }
  ]);
  const [recentStockActivity, setRecentStockActivity] = useState([]);

  const COLORS = ['#2c6774', '#f59e0b', '#ef4444', '#6b7280'];

  // Medicine forms list
  const medicineForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray'];

  // Get pharmacy ID from localStorage
  useEffect(() => {
    const storedPharmacyId = localStorage.getItem('pharmacyId');
    if (storedPharmacyId) {
      setPharmacyId(storedPharmacyId);
    }
  }, []);

  // Calculate status based on stock
  const calculateStatus = (stock, reorderLevel = 10) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Critical';
    if (stock <= reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  // Fetch medicines from API
  const fetchMedicines = async () => {
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
          name: med.name,
          genericName: med.genericName || '',
          category: med.category || 'Other',
          brand: med.manufacturer || 'Generic',
          sku: med.sku || `SKU-${med._id?.slice(-6) || '000'}`,
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
          expiryDate: med.expiryDate || '',
          sideEffects: med.sideEffects || [],
          precautions: med.precautions || [],
          tabletsPerUnit: med.tabletsPerUnit || 10,
          dosage: med.dosage || 'As prescribed',
          strength: med.strength || ''
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
      } else {
        setMedicines([]);
      }

    } catch (error) {
      console.error('Error fetching medicines:', error);
      if (error.response?.status === 404) {
        // If endpoint doesn't exist, just show empty state
        setMedicines([]);
      } else {
        message.error('Failed to load medicines');
      }
    } finally {
      setLoading(false);
    }
  };

  // Update chart data
  const updateChartData = (medicinesData) => {
    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;
    let expired = 0;

    medicinesData.forEach(med => {
      if (med.stock === 0) {
        outOfStock++;
      } else if (med.stock <= 5) {
        lowStock++;
      } else {
        inStock++;
      }

      if (med.expiryDate) {
        const expiry = new Date(med.expiryDate);
        if (expiry < new Date()) {
          expired++;
        }
      }
    });

    setInventoryChartData([
      { name: 'In Stock', value: inStock },
      { name: 'Low Stock', value: lowStock },
      { name: 'Out of Stock', value: outOfStock },
      { name: 'Expired', value: expired }
    ]);

    // Recent stock activity (last 5 modified)
    const recent = medicinesData.slice(0, 5).map(med => ({
      name: med.name,
      category: med.category,
      days: Math.floor(Math.random() * 10) + 1
    }));
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
  }, [pharmacyId]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
    lowStock: medicines.filter(m => m.status === 'Low Stock' || m.status === 'Critical').length,
    expiringSoon: medicines.filter(m => {
      if (!m.expiryDate) return false;
      const expiry = new Date(m.expiryDate);
      const now = new Date();
      const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    }).length,
    outOfStock: medicines.filter(m => m.status === 'Out of Stock').length,
    totalValue: medicines.reduce((sum, m) => sum + m.value, 0)
  };

  // Open View Modal
  const openViewModal = (medicine) => {
    setSelectedMedicine(medicine);
    setShowViewModal(true);
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
      await pharmacyAPI.deleteMedicine(pharmacyId, selectedMedicine.id);
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
    'Out of Stock': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    'Critical': { bg: 'bg-red-200', text: 'text-red-800', border: 'border-red-300', dot: 'bg-red-600' }
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
              onClick={() => navigate('/PharmacyDashboard/products/add')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1a3a3a] transition-colors font-medium shadow-sm text-sm"
            >
              <Plus size={18} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
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
            <p className="text-xs text-gray-500">Expiring Soon</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.expiringSoon}</p>
            <p className="text-xs text-amber-600 mt-2">Within 30 days</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Out of Stock</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.outOfStock}</p>
            <p className="text-xs text-red-600 mt-2">Critical items</p>
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
                  placeholder="Search by name, generic, brand, SKU..."
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
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
          )}
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
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#2c6774" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
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
              <h3 className="font-bold text-gray-800">Recent Stock Activity</h3>
              <p className="text-sm text-gray-500">Latest updates</p>
            </div>
            <Activity className="text-gray-400" size={20} />
          </div>

          <div className="space-y-3">
            {recentStockActivity.length > 0 ? (
              recentStockActivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.category === 'Antibiotics' ? 'bg-blue-500' :
                        item.category === 'Analgesics' ? 'bg-purple-500' : 'bg-green-500'
                      }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-600">{item.days} days ago</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Products Display */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-10 h-10 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicines...</p>
        </div>
      ) : (
        <>
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
                            <div className="flex items-center gap-2">
                              {medicine.image && (
                                <img src={medicine.image} alt={medicine.name} className="w-8 h-8 rounded object-cover" />
                              )}
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
                              {/* <button
                                onClick={() => navigate(`/PharmacyDashboard/products/edit/${medicine.id}`, { state: { medicine } })}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Edit"
                              > */}

                              <button
                                onClick={() => navigate(`/PharmacyDashboard/products/edit/${medicine.id}`, { state: { medicine } })}
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

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {currentItems.length > 0 ? (
              currentItems.map((medicine) => (
                <div key={medicine.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      {medicine.image && (
                        <img src={medicine.image} alt={medicine.name} className="w-10 h-10 rounded object-cover" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{medicine.name}</p>
                        <p className="text-xs text-gray-500">{medicine.genericName}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full border ${stockColors[medicine.status]?.bg || 'bg-gray-100'
                      }`}>
                      {medicine.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="font-medium">{medicine.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stock</p>
                      <p className="font-medium">{medicine.stock} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-medium">{formatCurrency(medicine.price)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Brand</p>
                      <p className="font-medium">{medicine.brand}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => openViewModal(medicine)}
                      className="flex-1 py-2 text-blue-600 border rounded-lg hover:bg-blue-50 text-sm"
                    >
                      View
                    </button>
                    {/* <button
                      onClick={() => navigate(`/PharmacyDashboard/products/edit/${medicine.id}`, { state: { medicine } })}
                      className="flex-1 py-2 text-green-600 border rounded-lg hover:bg-green-50 text-sm"
                    >
                      Edit
                    </button> */}

                    <button
                      onClick={() => navigate(`/PharmacyDashboard/products/edit/${medicine.id}`, { state: { medicine } })}
                      className="flex-1 py-2 text-green-600 border rounded-lg hover:bg-green-50 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(medicine)}
                      className="flex-1 py-2 text-red-600 border rounded-lg hover:bg-red-50 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
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
        </>
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