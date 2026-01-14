// components/Dashboard/CategoriesPage.jsx
// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Search, Filter, TrendingUp } from 'lucide-react';

// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([
//     { id: 1, name: 'Pain Relief', description: 'Medicines for pain management', productCount: 24, status: 'Active' },
//     { id: 2, name: 'Antibiotics', description: 'Anti-bacterial medications', productCount: 18, status: 'Active' },
//     { id: 3, name: 'Allergy', description: 'Allergy relief medicines', productCount: 12, status: 'Active' },
//     { id: 4, name: 'Digestive', description: 'Gastrointestinal medicines', productCount: 15, status: 'Active' },
//     { id: 5, name: 'Vitamins', description: 'Nutritional supplements', productCount: 32, status: 'Active' },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');

//   const handleAddCategory = () => {
//     const name = prompt('Enter category name:');
//     const description = prompt('Enter category description:');
    
//     if (name) {
//       const newCategory = {
//         id: categories.length + 1,
//         name,
//         description: description || '',
//         productCount: 0,
//         status: 'Active'
//       };
//       setCategories([...categories, newCategory]);
//     }
//   };

//   const handleEditCategory = (id) => {
//     const category = categories.find(c => c.id === id);
//     const name = prompt('Enter new category name:', category.name);
//     const description = prompt('Enter new description:', category.description);
    
//     if (name) {
//       setCategories(categories.map(c => 
//         c.id === id ? { ...c, name, description: description || '' } : c
//       ));
//     }
//   };

//   const handleDeleteCategory = (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       setCategories(categories.filter(c => c.id !== id));
//     }
//   };

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     category.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       {/* Page Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
//           <p className="text-gray-600">Manage your product categories</p>
//         </div>
//         <div className="flex space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200">
//             <Filter size={18} />
//             <span>Filter</span>
//           </button>
//           <button
//             onClick={handleAddCategory}
//             className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//           >
//             <Plus size={20} />
//             <span>Add Category</span>
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//           />
//         </div>
//       </div>

//       {/* Categories Table */}
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Category Name</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Description</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Products</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCategories.map((category) => (
//                 <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                   <td className="py-4 px-6 font-medium text-gray-800">{category.name}</td>
//                   <td className="py-4 px-6">
//                     <p className="text-gray-600 text-sm">{category.description}</p>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
//                       {category.productCount} items
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       category.status === 'Active' 
//                         ? 'bg-green-100 text-green-700' 
//                         : 'bg-red-100 text-red-700'
//                     }`}>
//                       {category.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEditCategory(category.id)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteCategory(category.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoriesPage;






















//----------With Modal Implementation----------//
// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Search, Filter, TrendingUp, X, Save } from 'lucide-react';

// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([
//     { id: 1, name: 'Pain Relief', description: 'Medicines for pain management', productCount: 24, status: 'Active' },
//     { id: 2, name: 'Antibiotics', description: 'Anti-bacterial medications', productCount: 18, status: 'Active' },
//     { id: 3, name: 'Allergy', description: 'Allergy relief medicines', productCount: 12, status: 'Active' },
//     { id: 4, name: 'Digestive', description: 'Gastrointestinal medicines', productCount: 15, status: 'Active' },
//     { id: 5, name: 'Vitamins', description: 'Nutritional supplements', productCount: 32, status: 'Active' },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     status: 'Active'
//   });

//   const handleAddCategory = () => {
//     setEditingCategory(null);
//     setFormData({
//       name: '',
//       description: '',
//       status: 'Active'
//     });
//     setShowModal(true);
//   };

//   const handleEditCategory = (id) => {
//     const category = categories.find(c => c.id === id);
//     setEditingCategory(category);
//     setFormData({
//       name: category.name,
//       description: category.description,
//       status: category.status
//     });
//     setShowModal(true);
//   };

//   const handleDeleteCategory = (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       setCategories(categories.filter(c => c.id !== id));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!formData.name.trim()) {
//       alert('Category name is required');
//       return;
//     }

//     if (editingCategory) {
//       // Update existing category
//       setCategories(categories.map(c => 
//         c.id === editingCategory.id 
//           ? { 
//               ...c, 
//               name: formData.name, 
//               description: formData.description,
//               status: formData.status
//             } 
//           : c
//       ));
//     } else {
//       // Add new category
//       const newCategory = {
//         id: categories.length + 1,
//         name: formData.name,
//         description: formData.description,
//         productCount: 0,
//         status: formData.status
//       };
//       setCategories([...categories, newCategory]);
//     }
    
//     setShowModal(false);
//     setFormData({ name: '', description: '', status: 'Active' });
//     setEditingCategory(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const toggleStatus = (id) => {
//     setCategories(categories.map(c => 
//       c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
//     ));
//   };

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     category.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       {/* Page Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
//           <p className="text-gray-600">Manage your product categories</p>
//         </div>
//         <div className="flex space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200">
//             <Filter size={18} />
//             <span>Filter</span>
//           </button>
//           <button
//             onClick={handleAddCategory}
//             className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//           >
//             <Plus size={20} />
//             <span>Add Category</span>
//           </button>
//         </div>
//       </div>


//       {/* Stats Cards */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Categories</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{categories.length}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-emerald-100">
//               <TrendingUp className="text-emerald-600" size={24} />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Active</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {categories.filter(c => c.status === 'Active').length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-green-100">
//               <div className="w-3 h-3 rounded-full bg-green-500"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Products</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {categories.reduce((sum, c) => sum + c.productCount, 0)}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <div className="w-8 h-8 flex items-center justify-center">
//                 <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Inactive</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {categories.filter(c => c.status === 'Inactive').length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-red-100">
//               <div className="w-3 h-3 rounded-full bg-red-500"></div>
//             </div>
//           </div>
//         </div>
//       </div> */}

//         {/* Stats Cards */}
// <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//   {/* Keep the first two cards as they are */}
//   <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-gray-600 text-sm">Total Categories</p>
//         <p className="text-2xl font-bold text-gray-800 mt-1">{categories.length}</p>
//       </div>
//       <div className="p-3 rounded-lg bg-emerald-100">
//         <TrendingUp className="text-emerald-600" size={24} />
//       </div>
//     </div>
//   </div>
  
//   <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-gray-600 text-sm">Active</p>
//         <p className="text-2xl font-bold text-gray-800 mt-1">
//           {categories.filter(c => c.status === 'Active').length}
//         </p>
//       </div>
//       <div className="p-3 rounded-lg bg-green-100">
//         <div className="w-3 h-3 rounded-full bg-green-500"></div>
//       </div>
//     </div>
//   </div>
  
//   {/* Updated Total Products Card */}
//   <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-gray-600 text-sm">Total Products</p>
//         <p className="text-2xl font-bold text-gray-800 mt-1">
//           {categories.reduce((sum, c) => sum + c.productCount, 0)}
//         </p>
//       </div>
//       <div className="p-3 rounded-lg bg-blue-100">
//         <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
//           <span className="text-xs font-bold text-white">P</span>
//         </div>
//       </div>
//     </div>
//   </div>
  
//   {/* Updated Inactive Card */}
//   <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-gray-600 text-sm">Inactive</p>
//         <p className="text-2xl font-bold text-gray-800 mt-1">
//           {categories.filter(c => c.status === 'Inactive').length}
//         </p>
//       </div>
//       <div className="p-3 rounded-lg bg-red-100">
//         <div className="relative w-6 h-6">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-4 h-0.5 bg-red-500 transform rotate-45"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//           />
//         </div>
//       </div>

//       {/* Categories Table */}
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Category Name</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Description</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Products</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCategories.map((category) => (
//                 <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                   <td className="py-4 px-6 font-medium text-gray-800">{category.name}</td>
//                   <td className="py-4 px-6">
//                     <p className="text-gray-600 text-sm">{category.description}</p>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
//                       {category.productCount} items
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <button
//                       onClick={() => toggleStatus(category.id)}
//                       className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//                         category.status === 'Active'
//                           ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                           : 'bg-red-100 text-red-700 hover:bg-red-200'
//                       }`}
//                     >
//                       {category.status}
//                     </button>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEditCategory(category.id)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                         title="Edit"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteCategory(category.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                         title="Delete"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal for Add/Edit Category */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl w-full max-w-md animate-fadeIn">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {editingCategory ? 'Edit Category' : 'Add New Category'}
//               </h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} className="text-gray-500" />
//               </button>
//             </div>

//             {/* Modal Form */}
//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
//                     placeholder="Enter category name"
//                     required
//                     autoFocus
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
//                     placeholder="Enter category description"
//                     rows="3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status
//                   </label>
//                   <div className="flex space-x-4">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="status"
//                         value="Active"
//                         checked={formData.status === 'Active'}
//                         onChange={handleInputChange}
//                         className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
//                       />
//                       <span className="ml-2 text-gray-700">Active</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="status"
//                         value="Inactive"
//                         checked={formData.status === 'Inactive'}
//                         onChange={handleInputChange}
//                         className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
//                       />
//                       <span className="ml-2 text-gray-700">Inactive</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:opacity-90 transition-all"
//                 >
//                   <Save size={18} />
//                   <span>{editingCategory ? 'Update' : 'Create'} Category</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {filteredCategories.length === 0 && (
//         <div className="text-center py-12">
//           <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//             <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
//           <p className="text-gray-600 mb-6">Try adding a new category or adjusting your search</p>
//           <button
//             onClick={handleAddCategory}
//             className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//           >
//             Add Your First Category
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoriesPage;












// with delete confirmation modal
// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Search, Filter, TrendingUp, X, Save, AlertTriangle } from 'lucide-react';

// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([
//     { id: 1, name: 'Pain Relief', description: 'Medicines for pain management', productCount: 24, status: 'Active' },
//     { id: 2, name: 'Antibiotics', description: 'Anti-bacterial medications', productCount: 18, status: 'Active' },
//     { id: 3, name: 'Allergy', description: 'Allergy relief medicines', productCount: 12, status: 'Active' },
//     { id: 4, name: 'Digestive', description: 'Gastrointestinal medicines', productCount: 15, status: 'Active' },
//     { id: 5, name: 'Vitamins', description: 'Nutritional supplements', productCount: 32, status: 'Active' },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     status: 'Active'
//   });

//   const handleAddCategory = () => {
//     setEditingCategory(null);
//     setFormData({
//       name: '',
//       description: '',
//       status: 'Active'
//     });
//     setShowModal(true);
//   };

//   const handleEditCategory = (id) => {
//     const category = categories.find(c => c.id === id);
//     setEditingCategory(category);
//     setFormData({
//       name: category.name,
//       description: category.description,
//       status: category.status
//     });
//     setShowModal(true);
//   };

//   const handleDeleteClick = (id) => {
//     const category = categories.find(c => c.id === id);
//     setCategoryToDelete(category);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     if (categoryToDelete) {
//       setCategories(categories.filter(c => c.id !== categoryToDelete.id));
//       setShowDeleteModal(false);
//       setCategoryToDelete(null);
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteModal(false);
//     setCategoryToDelete(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!formData.name.trim()) {
//       alert('Category name is required');
//       return;
//     }

//     if (editingCategory) {
//       // Update existing category
//       setCategories(categories.map(c => 
//         c.id === editingCategory.id 
//           ? { 
//               ...c, 
//               name: formData.name, 
//               description: formData.description,
//               status: formData.status
//             } 
//           : c
//       ));
//     } else {
//       // Add new category
//       const newCategory = {
//         id: categories.length + 1,
//         name: formData.name,
//         description: formData.description,
//         productCount: 0,
//         status: formData.status
//       };
//       setCategories([...categories, newCategory]);
//     }
    
//     setShowModal(false);
//     setFormData({ name: '', description: '', status: 'Active' });
//     setEditingCategory(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const toggleStatus = (id) => {
//     setCategories(categories.map(c => 
//       c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
//     ));
//   };

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     category.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Add these at the top of your imports if you want to use them
//   // import { Package, EyeOff } from 'lucide-react';

//   return (
//     <div>
//       {/* Page Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
//           <p className="text-gray-600">Manage your product categories</p>
//         </div>
//         <div className="flex space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200">
//             <Filter size={18} />
//             <span>Filter</span>
//           </button>
//           <button
//             onClick={handleAddCategory}
//             className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#5c878f] hover:to-[#1e4e56] transition-all duration-300 shadow-md hover:shadow-lg"
//             // className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#5c878f] to-[#174047] text-white rounded-xl font-medium hover:from-[#4a767d] hover:to-[#0f2c33] transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             <Plus size={20} />
//             <span>Add Category</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Categories</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{categories.length}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-emerald-100">
//               <TrendingUp className="text-emerald-600" size={24} />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Active</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {categories.filter(c => c.status === 'Active').length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-green-100">
//               <div className="w-3 h-3 rounded-full bg-green-500"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Products</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {categories.reduce((sum, c) => sum + c.productCount, 0)}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <div className="w-8 h-8 flex items-center justify-center">
//                 <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Inactive</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {categories.filter(c => c.status === 'Inactive').length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-red-100">
//               <div className="w-3 h-3 rounded-full bg-red-500"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//           />
//         </div>
//       </div>

//       {/* Categories Table */}
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Category Name</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Description</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Products</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCategories.map((category) => (
//                 <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                   <td className="py-4 px-6 font-medium text-gray-800">{category.name}</td>
//                   <td className="py-4 px-6">
//                     <p className="text-gray-600 text-sm">{category.description}</p>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
//                       {category.productCount} items
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <button
//                       onClick={() => toggleStatus(category.id)}
//                       className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//                         category.status === 'Active'
//                           ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                           : 'bg-red-100 text-red-700 hover:bg-red-200'
//                       }`}
//                     >
//                       {category.status}
//                     </button>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEditCategory(category.id)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                         title="Edit"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(category.id)}
//                         className="p-2 text-[red-600] hover:bg-red-50 rounded-lg"
//                         title="Delete"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal for Add/Edit Category */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl w-full max-w-md animate-fadeIn">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {editingCategory ? 'Edit Category' : 'Add New Category'}
//               </h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} className="text-gray-500" />
//               </button>
//             </div>

//             {/* Modal Form */}
//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
//                     placeholder="Enter category name"
//                     required
//                     autoFocus
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
//                     placeholder="Enter category description"
//                     rows="3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status
//                   </label>
//                   <div className="flex space-x-4">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="status"
//                         value="Active"
//                         checked={formData.status === 'Active'}
//                         onChange={handleInputChange}
//                         className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
//                       />
//                       <span className="ml-2 text-gray-700">Active</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="status"
//                         value="Inactive"
//                         checked={formData.status === 'Inactive'}
//                         onChange={handleInputChange}
//                         className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
//                       />
//                       <span className="ml-2 text-gray-700">Inactive</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-medium rounded-xl hover:opacity-90 transition-all"
//                 >
//                   <Save size={18} />
//                   <span>{editingCategory ? 'Update' : 'Create'} Category</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && categoryToDelete && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl w-full max-w-md animate-fadeIn">
//             {/* Modal Header */}
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="p-2 rounded-lg bg-red-100">
//                   <AlertTriangle className="text-red-600" size={24} />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">Delete Category</h2>
//               </div>
//               <p className="text-gray-600">
//                 Are you sure you want to delete "<span className="font-semibold">{categoryToDelete.name}</span>"? 
//                 This action cannot be undone.
//               </p>
              
//               {categoryToDelete.productCount > 0 && (
//                 <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
//                   <p className="text-amber-800 text-sm">
//                     ⚠️ This category contains <span className="font-semibold">{categoryToDelete.productCount} products</span>. 
//                     Deleting it will remove all associated products.
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Modal Footer */}
//             <div className="flex justify-end space-x-3 p-6">
//               <button
//                 type="button"
//                 onClick={cancelDelete}
//                 className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={confirmDelete}
//                 className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-medium rounded-xl hover:opacity-90 transition-all"
//               >
//                 <Trash2 size={18} />
//                 <span>Delete Category</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {filteredCategories.length === 0 && (
//         <div className="text-center py-12">
//           <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//             <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
//           <p className="text-gray-600 mb-6">Try adding a new category or adjusting your search</p>
//           <button
//             onClick={handleAddCategory}
//             // className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//             // className="px-6 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#1e4e56] hover:to-[#0f2c33] transition-all duration-300"
//           >
//             Add Your First Category
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoriesPage;
























// with filter update
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, TrendingUp, X, Save, AlertTriangle } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Pain Relief', description: 'Medicines for pain management', productCount: 24, status: 'Active' },
    { id: 2, name: 'Antibiotics', description: 'Anti-bacterial medications', productCount: 18, status: 'Active' },
    { id: 3, name: 'Allergy', description: 'Allergy relief medicines', productCount: 12, status: 'Active' },
    { id: 4, name: 'Digestive', description: 'Gastrointestinal medicines', productCount: 15, status: 'Active' },
    { id: 5, name: 'Vitamins', description: 'Nutritional supplements', productCount: 32, status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active'
  });

  // Add these state variables for filter functionality
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Active', 'Inactive'

  // Add this validation function
  const validateDescription = (description) => {
    return description.length <= 200; // or any limit you want
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEditCategory = (id) => {
    const category = categories.find(c => c.id === id);
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status
    });
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    const category = categories.find(c => c.id === id);
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(c => c.id !== categoryToDelete.id));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    // Add description validation
    if (formData.description.length > 200) { // 200 character limit
      alert('Description cannot exceed 200 characters');
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(c => 
        c.id === editingCategory.id 
          ? { 
              ...c, 
              name: formData.name, 
              description: formData.description,
              status: formData.status
            } 
          : c
      ));
    } else {
      // Add new category
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        description: formData.description,
        productCount: 0,
        status: formData.status
      };
      setCategories([...categories, newCategory]);
    }
    
    setShowModal(false);
    setFormData({ name: '', description: '', status: 'Active' });
    setEditingCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleStatus = (id) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
  };

  // Update your filteredCategories logic:
  const filteredCategories = categories.filter(category => {
    // Search filter
    const matchesSearch = 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      filterStatus === 'All' || 
      category.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600">Manage your product categories</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button
            onClick={handleAddCategory}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#5c878f] hover:to-[#1e4e56] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Categories</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{categories.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-100">
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {categories.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {categories.reduce((sum, c) => sum + c.productCount, 0)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inactive</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {categories.filter(c => c.status === 'Inactive').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700">Filter Categories</h3>
            <button 
              onClick={() => setShowFilter(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Status:</span>
            <div className="flex space-x-3">
              {['All', 'Active', 'Inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Category Name</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Description</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Products</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium text-gray-800">{category.name}</td>
                  <td className="py-4 px-6">
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      {category.productCount} items
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleStatus(category.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        category.status === 'Active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {category.status}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCategory(category.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category.id)}
                        className="p-2 text-[red-600] hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit Category */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                    placeholder="Enter category name"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  {/* Add character counter in the modal form */}
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <span className={`text-xs ${formData.description.length > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                      {formData.description.length}/200
                    </span>
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                    placeholder="Enter category description"
                    rows="3"
                    maxLength="200" // HTML attribute for visual limit
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === 'Active'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === 'Inactive'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-medium rounded-xl hover:opacity-90 transition-all"
                >
                  <Save size={18} />
                  <span>{editingCategory ? 'Update' : 'Create'} Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md animate-fadeIn">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Delete Category</h2>
              </div>
              <p className="text-gray-600">
                Are you sure you want to delete "<span className="font-semibold">{categoryToDelete.name}</span>"? 
                This action cannot be undone.
              </p>
              
              {categoryToDelete.productCount > 0 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    ⚠️ This category contains <span className="font-semibold">{categoryToDelete.productCount} products</span>. 
                    Deleting it will remove all associated products.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6">
              <button
                type="button"
                onClick={cancelDelete}
                className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-medium rounded-xl hover:opacity-90 transition-all"
              >
                <Trash2 size={18} />
                <span>Delete Category</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
          <p className="text-gray-600 mb-6">Try adding a new category or adjusting your search</p>
          <button
            onClick={handleAddCategory}
            className="flex items-center space-x-2 mx-auto px-6 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#5c878f] hover:to-[#1e4e56] transition-all duration-300"
          >
            <Plus size={20} />
            <span>Add Your First Category</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;