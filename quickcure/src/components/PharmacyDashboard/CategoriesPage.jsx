import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Search, Filter, 
  TrendingUp, X, AlertTriangle, 
  FolderOpen, CheckCircle, XCircle, 
  Package, Grid, List, Eye,
  ChevronLeft, ChevronRight,
  Pill, Activity, Leaf, Coffee, Apple, 
  Heart, Droplet, Droplets, Syringe, 
  Stethoscope, Box, FlaskConical,
  Bone, Thermometer, Wind, Sparkles,
  Shield, Zap, Cloud, Moon, Sun, RefreshCw
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { message } from 'antd';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { id: pharmacyId } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    icon: 'Package'
  });

  // Professional icons for selection
  const iconOptions = [
    { name: 'Pill', component: Pill },
    { name: 'FlaskConical', component: FlaskConical },
    { name: 'Wind', component: Wind },
    { name: 'Coffee', component: Coffee },
    { name: 'Apple', component: Apple },
    { name: 'Heart', component: Heart },
    { name: 'Sparkles', component: Sparkles },
    { name: 'Droplets', component: Droplets },
    { name: 'Syringe', component: Syringe },
    { name: 'Stethoscope', component: Stethoscope },
    { name: 'Box', component: Box },
    { name: 'Bone', component: Bone },
    { name: 'Thermometer', component: Thermometer },
    { name: 'Shield', component: Shield },
    { name: 'Zap', component: Zap },
    { name: 'Moon', component: Moon }
  ];

  const getCategoryIcon = (name) => {
    const iconMap = {
      'Pain Relief': 'Pill',
      'Antibiotics': 'FlaskConical',
      'Allergy': 'Wind',
      'Digestive': 'Coffee',
      'Vitamins': 'Apple',
      'Cardiac': 'Heart',
      'Dermatology': 'Sparkles',
      'Skin Care': 'Sparkles',
      'Diabetes': 'Droplets',
      'Cardiovascular': 'Heart'
    };
    return iconMap[name] || 'Package';
  };

  // Helper function to render icon based on name
  const renderIcon = (iconName, className = "w-5 h-5") => {
    const iconMap = {
      Pill, FlaskConical, Wind, Coffee, Apple,
      Heart, Sparkles, Droplets, Syringe,
      Stethoscope, Box, Bone, Thermometer,
      Shield, Zap, Moon, Sun,
      Package, Activity, Leaf, Droplet, Cloud
    };
    
    const IconComponent = iconMap[iconName] || Package;
    return <IconComponent className={className} />;
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const pid = pharmacyId || localStorage.getItem('pharmacyId');
      if (!pid) {
        setError('Pharmacy ID not found');
        setLoading(false);
        return;
      }

      const response = await pharmacyAPI.getCategoryDistribution(pid);
      
      if (response.data?.success) {
        const catData = response.data.data || [];
        
        // Transform API data into categories format
        const transformedCategories = catData.map((cat, index) => ({
          id: cat.name?.toLowerCase().replace(/\s+/g, '-') || index,
          name: cat.name,
          description: `${cat.name} category`,
          productCount: cat.count || cat.value || 0,
          status: 'Active',
          icon: getCategoryIcon(cat.name)
        }));

        setCategories(transformedCategories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pid = pharmacyId || localStorage.getItem('pharmacyId');
    if (pid) {
      fetchCategories();
    }
  }, [pharmacyId]);

  // Calculate statistics
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.status === 'Active').length;
  const inactiveCategories = categories.filter(c => c.status === 'Inactive').length;
  const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      status: 'Active',
      icon: 'Package'
    });
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      icon: category.icon || 'Package'
    });
    setShowModal(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      if (categoryToDelete.productCount > 0) {
        message.warning('Cannot delete category with products. Please reassign or delete products first.');
        setShowDeleteModal(false);
        setCategoryToDelete(null);
        return;
      }
      
      // Delete category via API
      const pid = pharmacyId || localStorage.getItem('pharmacyId');
      if (pid) {
        pharmacyAPI.deleteCategory(categoryToDelete.id)
          .then(() => {
            message.success('Category deleted successfully');
            fetchCategories();
          })
          .catch(err => {
            message.error('Failed to delete category');
            console.error(err);
          });
      }
      
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      message.error('Category name is required');
      return;
    }

    const pid = pharmacyId || localStorage.getItem('pharmacyId');
    if (!pid) {
      message.error('Pharmacy ID not found');
      return;
    }

    try {
      if (editingCategory) {
        // Update category via API
        await pharmacyAPI.updateCategory(editingCategory.id, {
          name: formData.name,
          description: formData.description,
        });
        message.success('Category updated successfully');
      } else {
        // Create category via API
        await pharmacyAPI.createCategory(pid, {
          name: formData.name,
          description: formData.description
        });
        message.success('Category created successfully');
      }
      
      setShowModal(false);
      setFormData({ name: '', description: '', status: 'Active', icon: 'Package' });
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error('Error saving category:', err);
      message.error('Failed to save category');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleStatus = (category) => {
    setCategories(categories.map(c => 
      c.id === category.id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
  };

  const viewProductsInCategory = (categoryName) => {
    navigate(`/pharmacy/dashboard/${pharmacyId}/products`, { 
      state: { filterCategory: categoryName }
    });
  };

  // Filter categories
  const filteredCategories = categories.filter(category => {
    const matchesSearch = searchTerm === '' || 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || category.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  // Status badge component
  const StatusBadge = ({ status, onClick }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
        status === 'Active'
          ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
          : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
      }`}
    >
      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
        status === 'Active' ? 'bg-green-500' : 'bg-red-500'
      }`}></div>
      {status}
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Categories</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={fetchCategories} className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Medicine Categories</h1>
          <p className="text-sm text-gray-600 mt-1">Organize your products by categories</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchCategories}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:from-[#174047] hover:to-[#2c6774] transition-all duration-300 font-medium shadow-sm text-sm"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Category</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Categories</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{totalCategories}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <FolderOpen className="text-blue-600" size={22} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">From pharmacy inventory</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Active</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{activeCategories}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <CheckCircle className="text-green-600" size={22} />
            </div>
          </div>
          {totalCategories > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${(activeCategories / totalCategories) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Products</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{totalProducts}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50">
              <Package className="text-purple-600" size={22} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Across all categories</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Inactive</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{inactiveCategories}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50">
              <XCircle className="text-red-600" size={22} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-amber-600">Need attention</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {/* View Toggle - Mobile Only */}
            <div className="flex md:hidden bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
                title="Grid View"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>

            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
                showFilter ? 'bg-[#2c6774] text-white border-[#2c6774]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 bg-white text-sm"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-slideDown">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700">Filter Categories</h3>
              <button onClick={() => setShowFilter(false)} className="p-1 hover:bg-gray-200 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Active', 'Inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-[#2c6774] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Categories Display */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FolderOpen className="text-gray-400" size={30} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
            {searchTerm ? 'Try different keywords' : 'Add medicines with categories to see them here'}
          </p>
          <button
            onClick={handleAddCategory}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:from-[#174047] hover:to-[#2c6774] transition-all duration-300 font-medium shadow-sm"
          >
            <Plus size={18} />
            <span>Add First Category</span>
          </button>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
          <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No matching categories</h3>
          <p className="text-sm text-gray-600">Try adjusting your search or filter</p>
        </div>
      ) : (
        <>
          {/* Desktop List View */}
          <div className="hidden md:block">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Description</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Products</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50">
                              {renderIcon(category.icon, "w-5 h-5 text-blue-600")}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{category.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">CAT-{String(category.id).slice(0, 8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 hidden lg:table-cell max-w-xs truncate">
                          {category.description}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{category.productCount}</span>
                            <button 
                              onClick={() => viewProductsInCategory(category.name)}
                              className="text-xs text-blue-600 hover:text-blue-700 hover:underline text-left"
                            >
                              View products
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge status={category.status} onClick={() => toggleStatus(category)} />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(category)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                              disabled={category.productCount > 0}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile Views */}
          <div className="md:hidden">
            {viewMode === 'grid' ? (
              /* Mobile Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paginatedCategories.map((category) => (
                  <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50">
                          {renderIcon(category.icon, "w-6 h-6 text-blue-600")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">ID: {String(category.id).slice(0, 8)}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Products</p>
                        <p className="text-lg font-bold text-gray-900">{category.productCount}</p>
                      </div>
                      <StatusBadge status={category.status} onClick={() => toggleStatus(category)} />
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => viewProductsInCategory(category.name)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium"
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg text-xs font-medium"
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium"
                        disabled={category.productCount > 0}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Mobile List View */
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {paginatedCategories.map((category) => (
                    <div key={category.id} className="p-4 hover:bg-gray-50/80">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-50">
                            {renderIcon(category.icon, "w-5 h-5 text-blue-600")}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{category.name}</p>
                            <p className="text-xs text-gray-500">ID: {String(category.id).slice(0, 8)}</p>
                          </div>
                        </div>
                        <StatusBadge status={category.status} onClick={() => toggleStatus(category)} />
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{category.description}</p>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-500">Products:</span>
                          <span className="ml-1 font-semibold">{category.productCount}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => viewProductsInCategory(category.name)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="View Products"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(category)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                            disabled={category.productCount > 0}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredCategories.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600 order-2 sm:order-1">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length}
              </p>
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#2c6774] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 sm:p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                  {iconOptions.map((icon) => {
                    const IconComponent = icon.component;
                    return (
                      <button
                        key={icon.name}
                        type="button"
                        onClick={() => setFormData({...formData, icon: icon.name})}
                        className={`p-2 rounded-lg transition-all flex flex-col items-center ${
                          formData.icon === icon.name 
                            ? 'bg-[#2c6774] text-white scale-105 shadow-md' 
                            : 'hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <IconComponent size={20} />
                        <span className="text-[10px] mt-1">{icon.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-[#2c6774]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-[#2c6774]/30"
                  maxLength="200"
                />
                <p className="text-xs text-gray-500 mt-1 text-right">{formData.description.length}/200</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Status</label>
                <div className="flex gap-3">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.status === 'Active' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <CheckCircle size={18} className={formData.status === 'Active' ? 'text-green-600' : 'text-gray-400'} />
                    <span className="font-medium">Active</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.status === 'Inactive' ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <XCircle size={18} className={formData.status === 'Inactive' ? 'text-red-600' : 'text-gray-400'} />
                    <span className="font-medium">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-lg hover:from-[#174047] hover:to-[#2c6774] font-medium"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h2 className="text-xl font-bold">Delete Category</h2>
            </div>

            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <span className="font-semibold">"{categoryToDelete.name}"</span>?
            </p>

            {categoryToDelete.productCount > 0 ? (
              <div className="p-3 bg-red-50 rounded-lg mb-4">
                <p className="text-red-700 text-sm">
                  ⚠️ Cannot delete! This category has {categoryToDelete.productCount} products.
                </p>
                <button
                  onClick={() => viewProductsInCategory(categoryToDelete.name)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  View products →
                </button>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 rounded-lg mb-4">
                <p className="text-amber-700 text-sm">This action cannot be undone.</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              {categoryToDelete.productCount === 0 && (
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;