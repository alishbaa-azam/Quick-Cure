// components/Dashboard/ProductsPage.jsx
// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Search, Filter, Package, Eye, TrendingUp, AlertCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const ProductsPage = () => {
//   const [medicines, setMedicines] = useState([
//     { id: 1, name: 'Paracetamol', category: 'Pain Relief', stock: 150, price: 5.99, status: 'In Stock', expiry: '2025-12-31', supplier: 'MediCorp' },
//     { id: 2, name: 'Amoxicillin', category: 'Antibiotic', stock: 45, price: 12.50, status: 'In Stock', expiry: '2025-10-15', supplier: 'PharmaPlus' },
//     { id: 3, name: 'Aspirin', category: 'Pain Relief', stock: 0, price: 8.75, status: 'Out of Stock', expiry: '2024-11-30', supplier: 'HealthFirst' },
//     { id: 4, name: 'Cetirizine', category: 'Allergy', stock: 89, price: 6.25, status: 'In Stock', expiry: '2026-03-20', supplier: 'AllerMed' },
//     { id: 5, name: 'Omeprazole', category: 'Digestive', stock: 32, price: 15.99, status: 'Low Stock', expiry: '2025-08-14', supplier: 'GastroCare' },
//     { id: 6, name: 'Vitamin C', category: 'Vitamins', stock: 200, price: 3.99, status: 'In Stock', expiry: '2026-05-30', supplier: 'NutriHealth' },
//     { id: 7, name: 'Ibuprofen', category: 'Pain Relief', stock: 12, price: 7.50, status: 'Low Stock', expiry: '2024-12-25', supplier: 'MediCorp' },
//     { id: 8, name: 'Metformin', category: 'Diabetes', stock: 67, price: 9.99, status: 'In Stock', expiry: '2025-09-10', supplier: 'DiabetoMed' },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');

//   const handleAddMedicine = () => {
//     const name = prompt('Enter medicine name:');
//     const category = prompt('Enter category:');
//     const stock = parseInt(prompt('Enter stock quantity:'));
//     const price = parseFloat(prompt('Enter price:'));
//     const supplier = prompt('Enter supplier name:');
    
//     if (name && category && stock && price) {
//       const newMedicine = {
//         id: medicines.length + 1,
//         name,
//         category,
//         stock,
//         price,
//         supplier: supplier || 'Unknown',
//         expiry: '2025-12-31',
//         status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
//       };
//       setMedicines([...medicines, newMedicine]);
//     }
//   };

//   const handleEditMedicine = (id) => {
//     const medicine = medicines.find(m => m.id === id);
//     const name = prompt('Enter medicine name:', medicine.name);
//     const category = prompt('Enter category:', medicine.category);
//     const stock = parseInt(prompt('Enter stock quantity:', medicine.stock));
//     const price = parseFloat(prompt('Enter price:', medicine.price));
    
//     if (name && category && stock !== null && price !== null) {
//       setMedicines(medicines.map(m => 
//         m.id === id ? {
//           ...m,
//           name,
//           category,
//           stock,
//           price,
//           status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
//         } : m
//       ));
//     }
//   };

//   const handleDeleteMedicine = (id) => {
//     if (window.confirm('Are you sure you want to delete this medicine?')) {
//       setMedicines(medicines.filter(medicine => medicine.id !== id));
//     }
//   };

//   const handleStockUpdate = (id, change) => {
//     setMedicines(medicines.map(m => {
//       if (m.id === id) {
//         const newStock = Math.max(0, m.stock + change);
//         return {
//           ...m,
//           stock: newStock,
//           status: newStock > 50 ? 'In Stock' : newStock > 0 ? 'Low Stock' : 'Out of Stock'
//         };
//       }
//       return m;
//     }));
//   };

//   const stockColors = {
//     'In Stock': 'bg-green-100 text-green-800',
//     'Low Stock': 'bg-amber-100 text-amber-800',
//     'Out of Stock': 'bg-red-100 text-red-800',
//   };

//   const categories = ['all', ...new Set(medicines.map(m => m.category))];
//   const statuses = ['all', 'In Stock', 'Low Stock', 'Out of Stock'];

//   const filteredMedicines = medicines.filter(medicine => {
//     const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.supplier.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
//     const matchesStatus = selectedStatus === 'all' || medicine.status === selectedStatus;
    
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const stats = {
//     total: medicines.length,
//     inStock: medicines.filter(m => m.status === 'In Stock').length,
//     lowStock: medicines.filter(m => m.status === 'Low Stock').length,
//     outOfStock: medicines.filter(m => m.status === 'Out of Stock').length,
//     totalValue: medicines.reduce((sum, m) => sum + (m.price * m.stock), 0)
//   };

//   return (
//     <div>
//       {/* Page Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Products</h1>
//           <p className="text-gray-600">Manage your pharmacy inventory</p>
//         </div>
//         <div className="flex space-x-3">
//           <button
//             onClick={() => {
//               const report = medicines.map(m => `${m.name}: ${m.stock} units`).join('\n');
//               alert('Low Stock Report:\n' + medicines.filter(m => m.status === 'Low Stock').map(m => `${m.name} - ${m.stock} units left`).join('\n'));
//             }}
//             className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200"
//           >
//             <AlertCircle size={18} />
//             <span>Stock Report</span>
//           </button>
//           <button
//             onClick={handleAddMedicine}
//             className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//           >
//             <Plus size={20} />
//             <span>Add Product</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Products</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <Package className="text-blue-600" size={24} />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">In Stock</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stats.inStock}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-green-100">
//               <div className="w-3 h-3 rounded-full bg-green-500"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Low Stock</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stats.lowStock}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-amber-100">
//               <AlertCircle className="text-amber-600" size={24} />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Out of Stock</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stats.outOfStock}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-red-100">
//               <div className="w-3 h-3 rounded-full bg-red-500"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Inventory Value</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">${stats.totalValue.toFixed(2)}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-purple-100">
//               <TrendingUp className="text-purple-600" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Search */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by name, category, supplier..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//               />
//             </div>
//           </div>

//           {/* Category Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category === 'all' ? 'All Categories' : category}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//             >
//               {statuses.map(status => (
//                 <option key={status} value={status}>
//                   {status === 'all' ? 'All Status' : status}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Product Name</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Category</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Supplier</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Stock</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Expiry</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMedicines.map((medicine) => (
//                 <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                   <td className="py-4 px-6">
//                     <div className="font-medium text-gray-800">{medicine.name}</div>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
//                       {medicine.category}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="text-gray-600">{medicine.supplier}</span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex items-center space-x-3">
//                       <span className="font-medium">{medicine.stock}</span>
//                       <div className="flex space-x-1">
//                         <button
//                           onClick={() => handleStockUpdate(medicine.id, 1)}
//                           className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-700 rounded hover:bg-green-200"
//                         >
//                           +
//                         </button>
//                         <button
//                           onClick={() => handleStockUpdate(medicine.id, -1)}
//                           className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-700 rounded hover:bg-red-200"
//                         >
//                           -
//                         </button>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="font-semibold">${medicine.price.toFixed(2)}</span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className={`px-2 py-1 rounded text-sm ${
//                       new Date(medicine.expiry) < new Date(Date.now() + 90*24*60*60*1000) 
//                         ? 'bg-red-100 text-red-700' 
//                         : 'bg-gray-100 text-gray-700'
//                     }`}>
//                       {medicine.expiry}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockColors[medicine.status]}`}>
//                       {medicine.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEditMedicine(medicine.id)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                         title="Edit"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (window.confirm(`View details for ${medicine.name}?`)) {
//                             alert(`Name: ${medicine.name}\nCategory: ${medicine.category}\nStock: ${medicine.stock}\nPrice: $${medicine.price}\nSupplier: ${medicine.supplier}\nExpiry: ${medicine.expiry}`);
//                           }
//                         }}
//                         className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
//                         title="View Details"
//                       >
//                         <Eye size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteMedicine(medicine.id)}
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

//         {/* Empty State */}
//         {filteredMedicines.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//               <Package className="text-gray-400" size={48} />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
//             <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
//             <button
//               onClick={handleAddMedicine}
//               className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//             >
//               Add Your First Product
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Bulk Actions */}
//       <div className="mt-6 flex justify-between items-center">
//         <div className="text-sm text-gray-600">
//           Showing {filteredMedicines.length} of {medicines.length} products
//         </div>
//         <div className="flex space-x-3">
//           <button
//             onClick={() => {
//               const csv = filteredMedicines.map(m => 
//                 `${m.name},${m.category},${m.stock},${m.price},${m.status}`
//               ).join('\n');
//               const blob = new Blob([`Name,Category,Stock,Price,Status\n${csv}`], { type: 'text/csv' });
//               const url = window.URL.createObjectURL(blob);
//               const a = document.createElement('a');
//               a.href = url;
//               a.download = 'products_export.csv';
//               a.click();
//             }}
//             className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//           >
//             Export as CSV
//           </button>
//           <button
//             onClick={() => {
//               const lowStock = medicines.filter(m => m.status === 'Low Stock');
//               if (lowStock.length > 0) {
//                 const message = lowStock.map(m => `${m.name}: ${m.stock} units left`).join('\n');
//                 alert('Low Stock Products:\n' + message);
//               } else {
//                 alert('No low stock products!');
//               }
//             }}
//             className="px-4 py-2 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200"
//           >
//             Check Low Stock
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;




























//------------Updated by Modal
// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Search, Filter, Package, Eye, TrendingUp, AlertCircle, X, Save, Info, Pill, Calendar, Building, DollarSign, Percent, AlertTriangle, Shield, Thermometer, Box, CheckCircle } from 'lucide-react';

// const ProductsPage = () => {
//   // Initial medicines data
//   const [medicines, setMedicines] = useState([
//     { 
//       id: 1, 
//       name: 'Paracetamol', 
//       genericName: 'Acetaminophen',
//       description: 'Pain reliever and fever reducer',
//       detailedDescription: 'Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature.',
//       category: 'Pain Relief', 
//       stockQuantity: 150, 
//       price: 5.99, 
//       discountedPrice: 4.99,
//       discountPercentage: 17,
//       inStock: true,
//       status: 'In Stock', 
//       expiry: '2025-12-31', 
//       supplier: 'MediCorp',
//       dosage: '500mg',
//       strength: '500mg per tablet',
//       form: 'Tablet',
//       manufacturer: 'Johnson & Johnson',
//       image: 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400',
//       prescriptionRequired: false,
//       sideEffects: ['Nausea', 'Stomach pain', 'Loss of appetite'],
//       uses: ['Headache', 'Fever', 'Muscle pain', 'Arthritis'],
//       precautions: ['Do not exceed recommended dose', 'Consult doctor if pregnant'],
//       instructions: ['Take with food', 'Do not take for more than 10 days'],
//       storageInstructions: 'Store at room temperature away from moisture'
//     },
//     { 
//       id: 2, 
//       name: 'Amoxicillin', 
//       genericName: 'Amoxicillin Trihydrate',
//       description: 'Antibiotic for bacterial infections',
//       detailedDescription: 'Amoxicillin is an antibiotic used to treat a number of bacterial infections such as middle ear infection, strep throat, pneumonia, skin infections, and urinary tract infections.',
//       category: 'Antibiotic', 
//       stockQuantity: 45, 
//       price: 12.50, 
//       discountedPrice: 10.00,
//       discountPercentage: 20,
//       inStock: true,
//       status: 'In Stock', 
//       expiry: '2025-10-15', 
//       supplier: 'PharmaPlus',
//       dosage: '250mg',
//       strength: '250mg per capsule',
//       form: 'Capsule',
//       manufacturer: 'Pfizer',
//       image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
//       prescriptionRequired: true,
//       sideEffects: ['Diarrhea', 'Nausea', 'Skin rash'],
//       uses: ['Bacterial infections', 'Respiratory infections', 'Urinary infections'],
//       precautions: ['Complete full course', 'Avoid if allergic to penicillin'],
//       instructions: ['Take every 8 hours', 'Finish all medication'],
//       storageInstructions: 'Store below 25°C in dry place'
//     },
//     // Add other medicines with similar structure...
//   ]);

//   // State variables
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
  
//   // Form state for Add/Edit
//   const [medicineForm, setMedicineForm] = useState({
//     name: '',
//     genericName: '',
//     description: '',
//     detailedDescription: '',
//     price: '',
//     discountedPrice: '',
//     discountPercentage: 0,
//     stockQuantity: '',
//     category: '',
//     dosage: '',
//     strength: '',
//     form: 'Tablet',
//     manufacturer: '',
//     expiry: '',
//     supplier: '',
//     prescriptionRequired: false,
//     sideEffects: [''],
//     uses: [''],
//     precautions: [''],
//     instructions: [''],
//     storageInstructions: 'Store in a cool, dry place away from direct sunlight'
//   });

//   // Medicine forms for dropdowns
//   const medicineForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray'];
//   const categories = ['all', 'Pain Relief', 'Antibiotic', 'Allergy', 'Digestive', 'Vitamins', 'Diabetes', 'Cardiac', 'Dermatology'];

//   // Filter medicines
//   const filteredMedicines = medicines.filter(medicine => {
//     const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
//     const matchesStatus = selectedStatus === 'all' || medicine.status === selectedStatus;
    
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   // Stats calculation
//   const stats = {
//     total: medicines.length,
//     inStock: medicines.filter(m => m.status === 'In Stock').length,
//     lowStock: medicines.filter(m => m.status === 'Low Stock').length,
//     outOfStock: medicines.filter(m => m.status === 'Out of Stock').length,
//     totalValue: medicines.reduce((sum, m) => sum + (m.price * m.stockQuantity), 0)
//   };

//   // Handle form input changes
//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setMedicineForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Handle array field changes (sideEffects, uses, etc.)
//   const handleArrayFieldChange = (field, index, value) => {
//     const newArray = [...medicineForm[field]];
//     newArray[index] = value;
//     setMedicineForm(prev => ({
//       ...prev,
//       [field]: newArray
//     }));
//   };

//   // Add new item to array field
//   const addArrayFieldItem = (field) => {
//     setMedicineForm(prev => ({
//       ...prev,
//       [field]: [...prev[field], '']
//     }));
//   };

//   // Remove item from array field
//   const removeArrayFieldItem = (field, index) => {
//     const newArray = medicineForm[field].filter((_, i) => i !== index);
//     setMedicineForm(prev => ({
//       ...prev,
//       [field]: newArray
//     }));
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
//       stockQuantity: '',
//       category: '',
//       dosage: '',
//       strength: '',
//       form: 'Tablet',
//       manufacturer: '',
//       expiry: '',
//       supplier: '',
//       prescriptionRequired: false,
//       sideEffects: [''],
//       uses: [''],
//       precautions: [''],
//       instructions: [''],
//       storageInstructions: 'Store in a cool, dry place away from direct sunlight'
//     });
//   };

//   // Open Add Modal
//   const openAddModal = () => {
//     resetForm();
//     setShowAddModal(true);
//   };

//   // Open Edit Modal
//   const openEditModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setMedicineForm({
//       name: medicine.name,
//       genericName: medicine.genericName || '',
//       description: medicine.description,
//       detailedDescription: medicine.detailedDescription || '',
//       price: medicine.price,
//       discountedPrice: medicine.discountedPrice || '',
//       discountPercentage: medicine.discountPercentage || 0,
//       stockQuantity: medicine.stockQuantity,
//       category: medicine.category,
//       dosage: medicine.dosage || '',
//       strength: medicine.strength || '',
//       form: medicine.form || 'Tablet',
//       manufacturer: medicine.manufacturer || '',
//       expiry: medicine.expiry,
//       supplier: medicine.supplier || '',
//       prescriptionRequired: medicine.prescriptionRequired || false,
//       sideEffects: medicine.sideEffects?.length ? medicine.sideEffects : [''],
//       uses: medicine.uses?.length ? medicine.uses : [''],
//       precautions: medicine.precautions?.length ? medicine.precautions : [''],
//       instructions: medicine.instructions?.length ? medicine.instructions : [''],
//       storageInstructions: medicine.storageInstructions || 'Store in a cool, dry place away from direct sunlight'
//     });
//     setShowEditModal(true);
//   };

//   // Open View Modal
//   const openViewModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowViewModal(true);
//   };

//   // Open Delete Modal
//   const openDeleteModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowDeleteModal(true);
//   };

//   // Calculate status based on stock
//   const calculateStatus = (stock) => {
//     if (stock > 50) return 'In Stock';
//     if (stock > 0) return 'Low Stock';
//     return 'Out of Stock';
//   };

//   // Add new medicine
//   const handleAddMedicine = (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!medicineForm.name || !medicineForm.price || !medicineForm.stockQuantity || !medicineForm.category) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const newMedicine = {
//       id: medicines.length + 1,
//       name: medicineForm.name,
//       genericName: medicineForm.genericName,
//       description: medicineForm.description,
//       detailedDescription: medicineForm.detailedDescription,
//       price: parseFloat(medicineForm.price),
//       discountedPrice: medicineForm.discountedPrice ? parseFloat(medicineForm.discountedPrice) : undefined,
//       discountPercentage: parseFloat(medicineForm.discountPercentage) || 0,
//       stockQuantity: parseInt(medicineForm.stockQuantity),
//       category: medicineForm.category,
//       dosage: medicineForm.dosage,
//       strength: medicineForm.strength,
//       form: medicineForm.form,
//       manufacturer: medicineForm.manufacturer,
//       expiry: medicineForm.expiry,
//       supplier: medicineForm.supplier,
//       prescriptionRequired: medicineForm.prescriptionRequired,
//       sideEffects: medicineForm.sideEffects.filter(effect => effect.trim() !== ''),
//       uses: medicineForm.uses.filter(use => use.trim() !== ''),
//       precautions: medicineForm.precautions.filter(precaution => precaution.trim() !== ''),
//       instructions: medicineForm.instructions.filter(instruction => instruction.trim() !== ''),
//       storageInstructions: medicineForm.storageInstructions,
//       status: calculateStatus(parseInt(medicineForm.stockQuantity)),
//       inStock: parseInt(medicineForm.stockQuantity) > 0,
//       image: 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400' // Default image
//     };

//     setMedicines([...medicines, newMedicine]);
//     setShowAddModal(false);
//     resetForm();
//   };

//   // Update medicine
//   const handleUpdateMedicine = (e) => {
//     e.preventDefault();
    
//     if (!selectedMedicine) return;

//     const updatedMedicine = {
//       ...selectedMedicine,
//       name: medicineForm.name,
//       genericName: medicineForm.genericName,
//       description: medicineForm.description,
//       detailedDescription: medicineForm.detailedDescription,
//       price: parseFloat(medicineForm.price),
//       discountedPrice: medicineForm.discountedPrice ? parseFloat(medicineForm.discountedPrice) : undefined,
//       discountPercentage: parseFloat(medicineForm.discountPercentage) || 0,
//       stockQuantity: parseInt(medicineForm.stockQuantity),
//       category: medicineForm.category,
//       dosage: medicineForm.dosage,
//       strength: medicineForm.strength,
//       form: medicineForm.form,
//       manufacturer: medicineForm.manufacturer,
//       expiry: medicineForm.expiry,
//       supplier: medicineForm.supplier,
//       prescriptionRequired: medicineForm.prescriptionRequired,
//       sideEffects: medicineForm.sideEffects.filter(effect => effect.trim() !== ''),
//       uses: medicineForm.uses.filter(use => use.trim() !== ''),
//       precautions: medicineForm.precautions.filter(precaution => precaution.trim() !== ''),
//       instructions: medicineForm.instructions.filter(instruction => instruction.trim() !== ''),
//       storageInstructions: medicineForm.storageInstructions,
//       status: calculateStatus(parseInt(medicineForm.stockQuantity)),
//       inStock: parseInt(medicineForm.stockQuantity) > 0
//     };

//     setMedicines(medicines.map(m => m.id === selectedMedicine.id ? updatedMedicine : m));
//     setShowEditModal(false);
//     resetForm();
//     setSelectedMedicine(null);
//   };

//   // Delete medicine
//   const handleDeleteMedicine = () => {
//     if (selectedMedicine) {
//       setMedicines(medicines.filter(m => m.id !== selectedMedicine.id));
//       setShowDeleteModal(false);
//       setSelectedMedicine(null);
//     }
//   };

//   // Update stock quantity
//   const handleStockUpdate = (id, change) => {
//     setMedicines(medicines.map(m => {
//       if (m.id === id) {
//         const newStock = Math.max(0, m.stockQuantity + change);
//         return {
//           ...m,
//           stockQuantity: newStock,
//           status: calculateStatus(newStock),
//           inStock: newStock > 0
//         };
//       }
//       return m;
//     }));
//   };

//   // Stock status colors
//   const stockColors = {
//     'In Stock': 'bg-green-100 text-green-800',
//     'Low Stock': 'bg-amber-100 text-amber-800',
//     'Out of Stock': 'bg-red-100 text-red-800',
//   };

//   return (
//     <div>
//       {/* Page Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Products</h1>
//           <p className="text-gray-600">Manage your pharmacy inventory</p>
//         </div>
//         <div className="flex space-x-3">
//           <button
//             onClick={() => {
//               const lowStock = medicines.filter(m => m.status === 'Low Stock');
//               if (lowStock.length > 0) {
//                 const message = lowStock.map(m => `${m.name}: ${m.stockQuantity} units left`).join('\n');
//                 alert('Low Stock Products:\n' + message);
//               } else {
//                 alert('No low stock products!');
//               }
//             }}
//             className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200"
//           >
//             <AlertCircle size={18} />
//             <span>Stock Report</span>
//           </button>
//           <button
//             onClick={openAddModal}
//             className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//           >
//             <Plus size={20} />
//             <span>Add Product</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Products</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <Package className="text-blue-600" size={24} />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">In Stock</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stats.inStock}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-green-100">
//               <div className="w-3 h-3 rounded-full bg-green-500"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Low Stock</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stats.lowStock}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-amber-100">
//               <AlertCircle className="text-amber-600" size={24} />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Out of Stock</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stats.outOfStock}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-red-100">
//               <div className="w-3 h-3 rounded-full bg-red-500"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Inventory Value</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">${stats.totalValue.toFixed(2)}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-purple-100">
//               <TrendingUp className="text-purple-600" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Search */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by name, category, description..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//               />
//             </div>
//           </div>

//           {/* Category Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category === 'all' ? 'All Categories' : category}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//             >
//               {['all', 'In Stock', 'Low Stock', 'Out of Stock'].map(status => (
//                 <option key={status} value={status}>
//                   {status === 'all' ? 'All Status' : status}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Product Name</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Category</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Supplier</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Stock</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Expiry</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
//                 <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMedicines.map((medicine) => (
//                 <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                   <td className="py-4 px-6">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
//                         <Pill size={20} className="text-gray-500" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-800">{medicine.name}</div>
//                         {medicine.genericName && (
//                           <div className="text-sm text-gray-500">({medicine.genericName})</div>
//                         )}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
//                       {medicine.category}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="text-gray-600">{medicine.supplier}</span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex items-center space-x-3">
//                       <span className="font-medium">{medicine.stockQuantity}</span>
//                       <div className="flex space-x-1">
//                         <button
//                           onClick={() => handleStockUpdate(medicine.id, 1)}
//                           className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-700 rounded hover:bg-green-200"
//                         >
//                           +
//                         </button>
//                         <button
//                           onClick={() => handleStockUpdate(medicine.id, -1)}
//                           className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-700 rounded hover:bg-red-200"
//                         >
//                           -
//                         </button>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex flex-col">
//                       <span className="font-semibold">${medicine.price.toFixed(2)}</span>
//                       {medicine.discountedPrice && (
//                         <span className="text-sm text-green-600 line-through">${medicine.discountedPrice.toFixed(2)}</span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className={`px-2 py-1 rounded text-sm ${
//                       new Date(medicine.expiry) < new Date(Date.now() + 90*24*60*60*1000) 
//                         ? 'bg-red-100 text-red-700' 
//                         : 'bg-gray-100 text-gray-700'
//                     }`}>
//                       {medicine.expiry}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockColors[medicine.status]}`}>
//                       {medicine.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => openEditModal(medicine)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                         title="Edit"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => openViewModal(medicine)}
//                         className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
//                         title="View Details"
//                       >
//                         <Eye size={18} />
//                       </button>
//                       <button
//                         onClick={() => openDeleteModal(medicine)}
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

//         {/* Empty State */}
//         {filteredMedicines.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//               <Package className="text-gray-400" size={48} />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
//             <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
//             <button
//               onClick={openAddModal}
//               className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//             >
//               Add Your First Product
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Bulk Actions */}
//       <div className="mt-6 flex justify-between items-center">
//         <div className="text-sm text-gray-600">
//           Showing {filteredMedicines.length} of {medicines.length} products
//         </div>
//         <div className="flex space-x-3">
//           <button
//             onClick={() => {
//               const csv = filteredMedicines.map(m => 
//                 `${m.name},${m.category},${m.stockQuantity},${m.price},${m.status}`
//               ).join('\n');
//               const blob = new Blob([`Name,Category,Stock,Price,Status\n${csv}`], { type: 'text/csv' });
//               const url = window.URL.createObjectURL(blob);
//               const a = document.createElement('a');
//               a.href = url;
//               a.download = 'products_export.csv';
//               a.click();
//             }}
//             className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//           >
//             Export as CSV
//           </button>
//         </div>
//       </div>

//       {/* ========== MODALS ========== */}

//       {/* Add Medicine Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn my-8">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
//               <h2 className="text-xl font-bold text-gray-800">Add New Medicine</h2>
//               <button
//                 onClick={() => {
//                   setShowAddModal(false);
//                   resetForm();
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} className="text-gray-500" />
//               </button>
//             </div>

//             <form onSubmit={handleAddMedicine} className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Basic Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Pill size={20} />
//                     <span>Basic Information</span>
//                   </h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Medicine Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={medicineForm.name}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Generic Name
//                     </label>
//                     <input
//                       type="text"
//                       name="genericName"
//                       value={medicineForm.genericName}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Short Description *
//                     </label>
//                     <textarea
//                       name="description"
//                       value={medicineForm.description}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       rows="2"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Detailed Description
//                     </label>
//                     <textarea
//                       name="detailedDescription"
//                       value={medicineForm.detailedDescription}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       rows="3"
//                     />
//                   </div>
//                 </div>

//                 {/* Category & Details */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Box size={20} />
//                     <span>Category & Details</span>
//                   </h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Category *
//                     </label>
//                     <select
//                       name="category"
//                       value={medicineForm.category}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories.filter(c => c !== 'all').map(category => (
//                         <option key={category} value={category}>{category}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Dosage
//                       </label>
//                       <input
//                         type="text"
//                         name="dosage"
//                         value={medicineForm.dosage}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="e.g., 500mg"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Strength
//                       </label>
//                       <input
//                         type="text"
//                         name="strength"
//                         value={medicineForm.strength}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="e.g., 500mg per tablet"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Form
//                     </label>
//                     <select
//                       name="form"
//                       value={medicineForm.form}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     >
//                       {medicineForms.map(form => (
//                         <option key={form} value={form}>{form}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Manufacturer
//                     </label>
//                     <input
//                       type="text"
//                       name="manufacturer"
//                       value={medicineForm.manufacturer}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     />
//                   </div>
//                 </div>

//                 {/* Pricing & Stock */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <DollarSign size={20} />
//                     <span>Pricing & Stock</span>
//                   </h3>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Price *
//                       </label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={medicineForm.price}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         min="0"
//                         step="0.01"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Discounted Price
//                       </label>
//                       <input
//                         type="number"
//                         name="discountedPrice"
//                         value={medicineForm.discountedPrice}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         min="0"
//                         step="0.01"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Discount Percentage
//                     </label>
//                     <input
//                       type="number"
//                       name="discountPercentage"
//                       value={medicineForm.discountPercentage}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       min="0"
//                       max="100"
//                       step="1"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Stock Quantity *
//                     </label>
//                     <input
//                       type="number"
//                       name="stockQuantity"
//                       value={medicineForm.stockQuantity}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       min="0"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Expiry Date
//                     </label>
//                     <input
//                       type="date"
//                       name="expiry"
//                       value={medicineForm.expiry}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     />
//                   </div>
//                 </div>

//                 {/* Supplier & Requirements */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Building size={20} />
//                     <span>Supplier & Requirements</span>
//                   </h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Supplier
//                     </label>
//                     <input
//                       type="text"
//                       name="supplier"
//                       value={medicineForm.supplier}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Storage Instructions
//                     </label>
//                     <textarea
//                       name="storageInstructions"
//                       value={medicineForm.storageInstructions}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       rows="2"
//                     />
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       id="prescriptionRequired"
//                       name="prescriptionRequired"
//                       checked={medicineForm.prescriptionRequired}
//                       onChange={handleFormChange}
//                       className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
//                     />
//                     <label htmlFor="prescriptionRequired" className="text-sm font-medium text-gray-700">
//                       Prescription Required
//                     </label>
//                   </div>
//                 </div>

//                 {/* Side Effects */}
//                 <div className="space-y-4 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <AlertTriangle size={20} />
//                     <span>Side Effects</span>
//                   </h3>
//                   {medicineForm.sideEffects.map((effect, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={effect}
//                         onChange={(e) => handleArrayFieldChange('sideEffects', index, e.target.value)}
//                         className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="Enter a side effect"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayFieldItem('sideEffects', index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayFieldItem('sideEffects')}
//                     className="text-sm text-teal-600 hover:text-teal-700"
//                   >
//                     + Add Another Side Effect
//                   </button>
//                 </div>

//                 {/* Uses */}
//                 <div className="space-y-4 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <CheckCircle size={20} />
//                     <span>Uses</span>
//                   </h3>
//                   {medicineForm.uses.map((use, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={use}
//                         onChange={(e) => handleArrayFieldChange('uses', index, e.target.value)}
//                         className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="Enter a use"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayFieldItem('uses', index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayFieldItem('uses')}
//                     className="text-sm text-teal-600 hover:text-teal-700"
//                   >
//                     + Add Another Use
//                   </button>
//                 </div>

//                 {/* Precautions */}
//                 <div className="space-y-4 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Shield size={20} />
//                     <span>Precautions</span>
//                   </h3>
//                   {medicineForm.precautions.map((precaution, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={precaution}
//                         onChange={(e) => handleArrayFieldChange('precautions', index, e.target.value)}
//                         className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="Enter a precaution"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayFieldItem('precautions', index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayFieldItem('precautions')}
//                     className="text-sm text-teal-600 hover:text-teal-700"
//                   >
//                     + Add Another Precaution
//                   </button>
//                 </div>

//                 {/* Instructions */}
//                 <div className="space-y-4 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Info size={20} />
//                     <span>Instructions</span>
//                   </h3>
//                   {medicineForm.instructions.map((instruction, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={instruction}
//                         onChange={(e) => handleArrayFieldChange('instructions', index, e.target.value)}
//                         className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="Enter an instruction"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayFieldItem('instructions', index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayFieldItem('instructions')}
//                     className="text-sm text-teal-600 hover:text-teal-700"
//                   >
//                     + Add Another Instruction
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowAddModal(false);
//                     resetForm();
//                   }}
//                   className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:opacity-90 transition-all"
//                 >
//                   <Save size={18} />
//                   <span>Add Medicine</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Medicine Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn my-8">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
//               <h2 className="text-xl font-bold text-gray-800">Edit Medicine</h2>
//               <button
//                 onClick={() => {
//                   setShowEditModal(false);
//                   resetForm();
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} className="text-gray-500" />
//               </button>
//             </div>

//             <form onSubmit={handleUpdateMedicine} className="p-6">
//               {/* Same form structure as Add Modal, but with edit values */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Basic Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Pill size={20} />
//                     <span>Basic Information</span>
//                   </h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Medicine Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={medicineForm.name}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Generic Name
//                     </label>
//                     <input
//                       type="text"
//                       name="genericName"
//                       value={medicineForm.genericName}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Short Description *
//                     </label>
//                     <textarea
//                       name="description"
//                       value={medicineForm.description}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       rows="2"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Detailed Description
//                     </label>
//                     <textarea
//                       name="detailedDescription"
//                       value={medicineForm.detailedDescription}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       rows="3"
//                     />
//                   </div>
//                 </div>

//                 {/* Category & Details */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Box size={20} />
//                     <span>Category & Details</span>
//                   </h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Category *
//                     </label>
//                     <select
//                       name="category"
//                       value={medicineForm.category}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories.filter(c => c !== 'all').map(category => (
//                         <option key={category} value={category}>{category}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Dosage
//                       </label>
//                       <input
//                         type="text"
//                         name="dosage"
//                         value={medicineForm.dosage}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="e.g., 500mg"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Strength
//                       </label>
//                       <input
//                         type="text"
//                         name="strength"
//                         value={medicineForm.strength}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="e.g., 500mg per tablet"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Form
//                     </label>
//                     <select
//                       name="form"
//                       value={medicineForm.form}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     >
//                       {medicineForms.map(form => (
//                         <option key={form} value={form}>{form}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Manufacturer
//                     </label>
//                     <input
//                       type="text"
//                       name="manufacturer"
//                       value={medicineForm.manufacturer}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     />
//                   </div>
//                 </div>

//                 {/* Pricing & Stock */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <DollarSign size={20} />
//                     <span>Pricing & Stock</span>
//                   </h3>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Price *
//                       </label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={medicineForm.price}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         min="0"
//                         step="0.01"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Discounted Price
//                       </label>
//                       <input
//                         type="number"
//                         name="discountedPrice"
//                         value={medicineForm.discountedPrice}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         min="0"
//                         step="0.01"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Discount Percentage
//                     </label>
//                     <input
//                       type="number"
//                       name="discountPercentage"
//                       value={medicineForm.discountPercentage}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       min="0"
//                       max="100"
//                       step="1"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Stock Quantity *
//                     </label>
//                     <input
//                       type="number"
//                       name="stockQuantity"
//                       value={medicineForm.stockQuantity}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       min="0"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Expiry Date
//                     </label>
//                     <input
//                       type="date"
//                       name="expiry"
//                       value={medicineForm.expiry}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     />
//                   </div>
//                 </div>

//                 {/* Supplier & Requirements */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Building size={20} />
//                     <span>Supplier & Requirements</span>
//                   </h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Supplier
//                     </label>
//                     <input
//                       type="text"
//                       name="supplier"
//                       value={medicineForm.supplier}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Storage Instructions
//                     </label>
//                     <textarea
//                       name="storageInstructions"
//                       value={medicineForm.storageInstructions}
//                       onChange={handleFormChange}
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                       rows="2"
//                     />
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       id="prescriptionRequiredEdit"
//                       name="prescriptionRequired"
//                       checked={medicineForm.prescriptionRequired}
//                       onChange={handleFormChange}
//                       className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
//                     />
//                     <label htmlFor="prescriptionRequiredEdit" className="text-sm font-medium text-gray-700">
//                       Prescription Required
//                     </label>
//                   </div>
//                 </div>

//                 {/* Side Effects */}
//                 <div className="space-y-4 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <AlertTriangle size={20} />
//                     <span>Side Effects</span>
//                   </h3>
//                   {medicineForm.sideEffects.map((effect, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={effect}
//                         onChange={(e) => handleArrayFieldChange('sideEffects', index, e.target.value)}
//                         className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="Enter a side effect"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayFieldItem('sideEffects', index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayFieldItem('sideEffects')}
//                     className="text-sm text-teal-600 hover:text-teal-700"
//                   >
//                     + Add Another Side Effect
//                   </button>
//                 </div>

//                 {/* Uses */}
//                 <div className="space-y-4 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <CheckCircle size={20} />
//                     <span>Uses</span>
//                   </h3>
//                   {medicineForm.uses.map((use, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={use}
//                         onChange={(e) => handleArrayFieldChange('uses', index, e.target.value)}
//                         className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="Enter a use"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayFieldItem('uses', index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayFieldItem('uses')}
//                     className="text-sm text-teal-600 hover:text-teal-700"
//                   >
//                     + Add Another Use
//                   </button>
//                 </div>

//                 {/* Precautions */}
//                 <div className="space-y-4 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Shield size={20} />
//                     <span>Precautions</span>
//                   </h3>
//                   {medicineForm.precautions.map((precaution, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={precaution}
//                         onChange={(e) => handleArrayFieldChange('precautions', index, e.target.value)}
//                         className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="Enter a precaution"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayFieldItem('precautions', index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayFieldItem('precautions')}
//                     className="text-sm text-teal-600 hover:text-teal-700"
//                   >
//                     + Add Another Precaution
//                   </button>
//                 </div>

//                 {/* Instructions */}
//                 <div className="space-y-4 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
//                     <Info size={20} />
//                     <span>Instructions</span>
//                   </h3>
//                   {medicineForm.instructions.map((instruction, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={instruction}
//                         onChange={(e) => handleArrayFieldChange('instructions', index, e.target.value)}
//                         className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
//                         placeholder="Enter an instruction"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayFieldItem('instructions', index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayFieldItem('instructions')}
//                     className="text-sm text-teal-600 hover:text-teal-700"
//                   >
//                     + Add Another Instruction
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowEditModal(false);
//                     resetForm();
//                   }}
//                   className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:opacity-90 transition-all"
//                 >
//                   <Save size={18} />
//                   <span>Update Medicine</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* View Medicine Details Modal */}
//       {showViewModal && selectedMedicine && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn my-8">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
//                   <Pill size={24} className="text-gray-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800">{selectedMedicine.name}</h2>
//                   {selectedMedicine.genericName && (
//                     <p className="text-gray-600">({selectedMedicine.genericName})</p>
//                   )}
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} className="text-gray-500" />
//               </button>
//             </div>

//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Left Column - Basic Info */}
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
//                     <div className="space-y-3">
//                       <div>
//                         <label className="text-sm font-medium text-gray-600">Description</label>
//                         <p className="text-gray-800 mt-1">{selectedMedicine.description}</p>
//                       </div>
//                       {selectedMedicine.detailedDescription && (
//                         <div>
//                           <label className="text-sm font-medium text-gray-600">Detailed Description</label>
//                           <p className="text-gray-800 mt-1">{selectedMedicine.detailedDescription}</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Medicine Details</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="text-sm font-medium text-gray-600">Category</label>
//                         <p className="text-gray-800 mt-1">{selectedMedicine.category}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-gray-600">Form</label>
//                         <p className="text-gray-800 mt-1">{selectedMedicine.form}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-gray-600">Dosage</label>
//                         <p className="text-gray-800 mt-1">{selectedMedicine.dosage || 'Not specified'}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-gray-600">Strength</label>
//                         <p className="text-gray-800 mt-1">{selectedMedicine.strength || 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Supplier Information</h3>
//                     <div className="space-y-3">
//                       <div>
//                         <label className="text-sm font-medium text-gray-600">Manufacturer</label>
//                         <p className="text-gray-800 mt-1">{selectedMedicine.manufacturer || 'Not specified'}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-gray-600">Supplier</label>
//                         <p className="text-gray-800 mt-1">{selectedMedicine.supplier}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Column - Pricing & Stock */}
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Pricing & Stock</h3>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <div>
//                           <label className="text-sm font-medium text-gray-600">Price</label>
//                           <p className="text-xl font-bold text-gray-800 mt-1">${selectedMedicine.price.toFixed(2)}</p>
//                         </div>
//                         {selectedMedicine.discountedPrice && (
//                           <div className="text-right">
//                             <label className="text-sm font-medium text-gray-600">Discounted Price</label>
//                             <div className="flex items-center space-x-2">
//                               <p className="text-xl font-bold text-green-600 mt-1">${selectedMedicine.discountedPrice.toFixed(2)}</p>
//                               {selectedMedicine.discountPercentage > 0 && (
//                                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
//                                   {selectedMedicine.discountPercentage}% OFF
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         )}
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="p-3 bg-gray-50 rounded-lg">
//                           <label className="text-sm font-medium text-gray-600">Stock Quantity</label>
//                           <p className="text-xl font-bold text-gray-800 mt-1">{selectedMedicine.stockQuantity}</p>
//                         </div>
//                         <div className="p-3 bg-gray-50 rounded-lg">
//                           <label className="text-sm font-medium text-gray-600">Status</label>
//                           <p className={`px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block ${stockColors[selectedMedicine.status]}`}>
//                             {selectedMedicine.status}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="p-3 bg-gray-50 rounded-lg">
//                         <label className="text-sm font-medium text-gray-600">Expiry Date</label>
//                         <p className={`text-gray-800 mt-1 ${new Date(selectedMedicine.expiry) < new Date(Date.now() + 90*24*60*60*1000) ? 'text-red-600' : ''}`}>
//                           {selectedMedicine.expiry}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements & Storage</h3>
//                     <div className="space-y-3">
//                       <div className="flex items-center space-x-2">
//                         {selectedMedicine.prescriptionRequired ? (
//                           <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
//                             Prescription Required
//                           </span>
//                         ) : (
//                           <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
//                             No Prescription Required
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-gray-600">Storage Instructions</label>
//                         <p className="text-gray-800 mt-1">{selectedMedicine.storageInstructions}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Side Effects */}
//                   {selectedMedicine.sideEffects && selectedMedicine.sideEffects.length > 0 && (
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Side Effects</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {selectedMedicine.sideEffects.map((effect, index) => (
//                           <span key={index} className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
//                             {effect}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Uses */}
//                   {selectedMedicine.uses && selectedMedicine.uses.length > 0 && (
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Uses</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {selectedMedicine.uses.map((use, index) => (
//                           <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
//                             {use}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Precautions */}
//                   {selectedMedicine.precautions && selectedMedicine.precautions.length > 0 && (
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Precautions</h3>
//                       <ul className="space-y-2">
//                         {selectedMedicine.precautions.map((precaution, index) => (
//                           <li key={index} className="flex items-start space-x-2">
//                             <Shield size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
//                             <span className="text-gray-700">{precaution}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}

//                   {/* Instructions */}
//                   {selectedMedicine.instructions && selectedMedicine.instructions.length > 0 && (
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
//                       <ul className="space-y-2">
//                         {selectedMedicine.instructions.map((instruction, index) => (
//                           <li key={index} className="flex items-start space-x-2">
//                             <Info size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
//                             <span className="text-gray-700">{instruction}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowViewModal(false);
//                     openEditModal(selectedMedicine);
//                   }}
//                   className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:opacity-90 transition-all"
//                 >
//                   <Edit size={18} />
//                   <span>Edit Medicine</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && selectedMedicine && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl w-full max-w-md animate-fadeIn">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="p-2 rounded-lg bg-red-100">
//                   <AlertCircle className="text-red-600" size={24} />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">Delete Medicine</h2>
//               </div>
//               <p className="text-gray-600">
//                 Are you sure you want to delete "<span className="font-semibold">{selectedMedicine.name}</span>"? 
//                 This action cannot be undone.
//               </p>
              
//               {selectedMedicine.stockQuantity > 0 && (
//                 <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
//                   <p className="text-amber-800 text-sm">
//                     ⚠️ This medicine has <span className="font-semibold">{selectedMedicine.stockQuantity} units</span> in stock.
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end space-x-3 p-6">
//               <button
//                 onClick={() => {
//                   setShowDeleteModal(false);
//                   setSelectedMedicine(null);
//                 }}
//                 className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteMedicine}
//                 className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:opacity-90 transition-all"
//               >
//                 <Trash2 size={18} />
//                 <span>Delete Medicine</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;




































// Updated version with theme colors
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Package, Eye, TrendingUp, AlertCircle, X, Save, Info, Pill, Calendar, Building, Percent, AlertTriangle, Shield, Thermometer, Box, CheckCircle, FileDown, IndianRupee } from 'lucide-react';

const ProductsPage = () => {
  // Initial medicines data
  const [medicines, setMedicines] = useState([
    { 
      id: 1, 
      name: 'Paracetamol', 
      genericName: 'Acetaminophen',
      description: 'Pain reliever and fever reducer',
      detailedDescription: 'Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature.',
      category: 'Pain Relief', 
      stockQuantity: 150, 
      price: 5.99, 
      discountedPrice: 4.99,
      discountPercentage: 17,
      inStock: true,
      status: 'In Stock', 
      expiry: '2025-12-31', 
      supplier: 'MediCorp',
      dosage: '500mg',
      strength: '500mg per tablet',
      form: 'Tablet',
      manufacturer: 'Johnson & Johnson',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400',
      prescriptionRequired: false,
      sideEffects: ['Nausea', 'Stomach pain', 'Loss of appetite'],
      uses: ['Headache', 'Fever', 'Muscle pain', 'Arthritis'],
      precautions: ['Do not exceed recommended dose', 'Consult doctor if pregnant'],
      instructions: ['Take with food', 'Do not take for more than 10 days'],
      storageInstructions: 'Store at room temperature away from moisture'
    },
    { 
      id: 2, 
      name: 'Amoxicillin', 
      genericName: 'Amoxicillin Trihydrate',
      description: 'Antibiotic for bacterial infections',
      detailedDescription: 'Amoxicillin is an antibiotic used to treat a number of bacterial infections such as middle ear infection, strep throat, pneumonia, skin infections, and urinary tract infections.',
      category: 'Antibiotic', 
      stockQuantity: 45, 
      price: 12.50, 
      discountedPrice: 10.00,
      discountPercentage: 20,
      inStock: true,
      status: 'In Stock', 
      expiry: '2025-10-15', 
      supplier: 'PharmaPlus',
      dosage: '250mg',
      strength: '250mg per capsule',
      form: 'Capsule',
      manufacturer: 'Pfizer',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      prescriptionRequired: true,
      sideEffects: ['Diarrhea', 'Nausea', 'Skin rash'],
      uses: ['Bacterial infections', 'Respiratory infections', 'Urinary infections'],
      precautions: ['Complete full course', 'Avoid if allergic to penicillin'],
      instructions: ['Take every 8 hours', 'Finish all medication'],
      storageInstructions: 'Store below 25°C in dry place'
    },
    { 
      id: 3, 
      name: 'Aspirin', 
      genericName: 'Acetylsalicylic Acid',
      description: 'Pain reliever and anti-inflammatory',
      detailedDescription: 'Aspirin is used to reduce pain, fever, or inflammation. Specific inflammatory conditions which aspirin is used to treat include Kawasaki disease, pericarditis, and rheumatic fever.',
      category: 'Pain Relief', 
      stockQuantity: 0, 
      price: 8.75, 
      discountedPrice: null,
      discountPercentage: 0,
      inStock: false,
      status: 'Out of Stock', 
      expiry: '2024-11-30', 
      supplier: 'HealthFirst',
      dosage: '325mg',
      strength: '325mg per tablet',
      form: 'Tablet',
      manufacturer: 'Bayer',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400',
      prescriptionRequired: false,
      sideEffects: ['Stomach pain', 'Heartburn', 'Nausea'],
      uses: ['Pain relief', 'Fever reduction', 'Anti-inflammatory'],
      precautions: ['Avoid if allergic to NSAIDs', 'Do not give to children'],
      instructions: ['Take with food or milk', 'Do not crush or chew'],
      storageInstructions: 'Store at room temperature'
    },
    { 
      id: 4, 
      name: 'Cetirizine', 
      genericName: 'Cetirizine Hydrochloride',
      description: 'Allergy relief antihistamine',
      detailedDescription: 'Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching.',
      category: 'Allergy', 
      stockQuantity: 89, 
      price: 6.25, 
      discountedPrice: 5.50,
      discountPercentage: 12,
      inStock: true,
      status: 'In Stock', 
      expiry: '2026-03-20', 
      supplier: 'AllerMed',
      dosage: '10mg',
      strength: '10mg per tablet',
      form: 'Tablet',
      manufacturer: 'GSK',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      prescriptionRequired: false,
      sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
      uses: ['Allergy relief', 'Hay fever', 'Urticaria'],
      precautions: ['Avoid alcohol', 'May cause drowsiness'],
      instructions: ['Take once daily', 'Can be taken with or without food'],
      storageInstructions: 'Store below 30°C'
    },
    { 
      id: 5, 
      name: 'Omeprazole', 
      genericName: 'Omeprazole Magnesium',
      description: 'Acid reducer for heartburn',
      detailedDescription: 'Omeprazole is used to treat certain stomach and esophagus problems such as acid reflux, ulcers. It works by decreasing the amount of acid your stomach makes.',
      category: 'Digestive', 
      stockQuantity: 32, 
      price: 15.99, 
      discountedPrice: 12.99,
      discountPercentage: 19,
      inStock: true,
      status: 'Low Stock', 
      expiry: '2025-08-14', 
      supplier: 'GastroCare',
      dosage: '20mg',
      strength: '20mg per capsule',
      form: 'Capsule',
      manufacturer: 'AstraZeneca',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400',
      prescriptionRequired: true,
      sideEffects: ['Headache', 'Diarrhea', 'Stomach pain'],
      uses: ['GERD', 'Ulcers', 'Acid reflux'],
      precautions: ['Take before meals', 'Do not crush capsules'],
      instructions: ['Take 30 minutes before food', 'Swallow capsule whole'],
      storageInstructions: 'Store in original container'
    },
    { 
      id: 6, 
      name: 'Vitamin C', 
      genericName: 'Ascorbic Acid',
      description: 'Immune system support supplement',
      detailedDescription: 'Vitamin C is an essential nutrient involved in the repair of tissue and the enzymatic production of certain neurotransmitters. It is required for the functioning of several enzymes and is important for immune system function.',
      category: 'Vitamins', 
      stockQuantity: 200, 
      price: 3.99, 
      discountedPrice: 3.49,
      discountPercentage: 13,
      inStock: true,
      status: 'In Stock', 
      expiry: '2026-05-30', 
      supplier: 'NutriHealth',
      dosage: '500mg',
      strength: '500mg per tablet',
      form: 'Tablet',
      manufacturer: 'Nature Made',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400',
      prescriptionRequired: false,
      sideEffects: ['Diarrhea', 'Nausea', 'Stomach cramps'],
      uses: ['Immune support', 'Antioxidant', 'Collagen production'],
      precautions: ['Do not exceed recommended dose', 'Store in cool place'],
      instructions: ['Take with water', 'Can be taken with meals'],
      storageInstructions: 'Store in cool, dry place'
    },
    { 
      id: 7, 
      name: 'Ibuprofen', 
      genericName: 'Ibuprofen',
      description: 'Anti-inflammatory pain reliever',
      detailedDescription: 'Ibuprofen is a nonsteroidal anti-inflammatory drug used to treat pain, fever, and inflammation. This includes painful menstrual periods, migraines, and rheumatoid arthritis.',
      category: 'Pain Relief', 
      stockQuantity: 12, 
      price: 7.50, 
      discountedPrice: 6.25,
      discountPercentage: 17,
      inStock: true,
      status: 'Low Stock', 
      expiry: '2024-12-25', 
      supplier: 'MediCorp',
      dosage: '200mg',
      strength: '200mg per tablet',
      form: 'Tablet',
      manufacturer: 'Advil',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      prescriptionRequired: false,
      sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness'],
      uses: ['Pain relief', 'Fever reduction', 'Inflammation'],
      precautions: ['Take with food', 'Avoid alcohol', 'Do not exceed dose'],
      instructions: ['Take every 4-6 hours', 'With food or milk'],
      storageInstructions: 'Room temperature storage'
    },
    { 
      id: 8, 
      name: 'Metformin', 
      genericName: 'Metformin Hydrochloride',
      description: 'Diabetes medication',
      detailedDescription: 'Metformin is used together with diet and exercise to improve blood sugar control in adults with type 2 diabetes mellitus. It belongs to a class of drugs called biguanides.',
      category: 'Diabetes', 
      stockQuantity: 67, 
      price: 9.99, 
      discountedPrice: 8.49,
      discountPercentage: 15,
      inStock: true,
      status: 'In Stock', 
      expiry: '2025-09-10', 
      supplier: 'DiabetoMed',
      dosage: '500mg',
      strength: '500mg per tablet',
      form: 'Tablet',
      manufacturer: 'Merck',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400',
      prescriptionRequired: true,
      sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
      uses: ['Type 2 diabetes', 'Blood sugar control'],
      precautions: ['Take with meals', 'Monitor blood sugar'],
      instructions: ['Take with meals', 'Start with low dose'],
      storageInstructions: 'Store at 25°C'
    },
  ]);

  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [expiryFilter, setExpiryFilter] = useState('all'); // 'all', 'expired', 'not-expired'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  
  // Form state for Add/Edit
  const [medicineForm, setMedicineForm] = useState({
    name: '',
    genericName: '',
    description: '',
    detailedDescription: '',
    price: '',
    discountedPrice: '',
    discountPercentage: 0,
    stockQuantity: '',
    category: '',
    dosage: '',
    strength: '',
    form: 'Tablet',
    manufacturer: '',
    expiry: '',
    supplier: '',
    prescriptionRequired: false,
    sideEffects: [''],
    uses: [''],
    precautions: [''],
    instructions: [''],
    storageInstructions: 'Store in a cool, dry place away from direct sunlight'
  });

  // Medicine forms for dropdowns
  const medicineForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray'];
  const categories = ['all', 'Pain Relief', 'Antibiotic', 'Allergy', 'Digestive', 'Vitamins', 'Diabetes', 'Cardiac', 'Dermatology'];

  // Calculate discount percentage automatically
  useEffect(() => {
    if (medicineForm.price && medicineForm.discountedPrice) {
      const price = parseFloat(medicineForm.price);
      const discountedPrice = parseFloat(medicineForm.discountedPrice);
      if (price > 0 && discountedPrice > 0 && discountedPrice < price) {
        const discountPercentage = ((price - discountedPrice) / price * 100).toFixed(0);
        setMedicineForm(prev => ({
          ...prev,
          discountPercentage: parseInt(discountPercentage)
        }));
      } else if (discountedPrice >= price) {
        setMedicineForm(prev => ({
          ...prev,
          discountPercentage: 0
        }));
      }
    }
  }, [medicineForm.price, medicineForm.discountedPrice]);

  // Filter medicines - FIXED SEARCH
  const filteredMedicines = medicines.filter(medicine => {

    // Check if medicine is expired
  const isExpired = new Date(medicine.expiry) < new Date();

  // Apply expiry filter
  const matchesExpiry = 
    expiryFilter === 'all' || 
    (expiryFilter === 'expired' && isExpired) ||
    (expiryFilter === 'not-expired' && !isExpired);

    if (!searchTerm) {
      // If no search term, only apply category and status filters
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || medicine.status === selectedStatus;
      return matchesCategory && matchesStatus && matchesExpiry;
    }
    
    // If there's a search term, check all searchable fields
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchLower) ||
      (medicine.genericName && medicine.genericName.toLowerCase().includes(searchLower)) ||
      medicine.category.toLowerCase().includes(searchLower) ||
      medicine.description.toLowerCase().includes(searchLower) ||
      (medicine.supplier && medicine.supplier.toLowerCase().includes(searchLower));
    
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || medicine.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesExpiry;
  });

  // Stats calculation
  const stats = {
    total: medicines.length,
    inStock: medicines.filter(m => m.status === 'In Stock').length,
    lowStock: medicines.filter(m => m.status === 'Low Stock').length,
    outOfStock: medicines.filter(m => m.status === 'Out of Stock').length,
    totalValue: medicines.reduce((sum, m) => sum + (m.price * m.stockQuantity), 0)
  };

  // Get low stock medicines
  const lowStockMedicines = medicines.filter(m => m.status === 'Low Stock');

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicineForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle array field changes (sideEffects, uses, etc.)
  const handleArrayFieldChange = (field, index, value) => {
    const newArray = [...medicineForm[field]];
    newArray[index] = value;
    setMedicineForm(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  // Add new item to array field with restrictions
  const addArrayFieldItem = (field) => {
    if (medicineForm[field].length < 10) { // Restrict to 10 items maximum
      setMedicineForm(prev => ({
        ...prev,
        [field]: [...prev[field], '']
      }));
    } else {
      alert(`Maximum 10 ${field} allowed`);
    }
  };

  // Remove item from array field
  const removeArrayFieldItem = (field, index) => {
    const newArray = medicineForm[field].filter((_, i) => i !== index);
    setMedicineForm(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  // Reset form
  const resetForm = () => {
    setMedicineForm({
      name: '',
      genericName: '',
      description: '',
      detailedDescription: '',
      price: '',
      discountedPrice: '',
      discountPercentage: 0,
      stockQuantity: '',
      category: '',
      dosage: '',
      strength: '',
      form: 'Tablet',
      manufacturer: '',
      expiry: '',
      supplier: '',
      prescriptionRequired: false,
      sideEffects: [''],
      uses: [''],
      precautions: [''],
      instructions: [''],
      storageInstructions: 'Store in a cool, dry place away from direct sunlight'
    });
  };

  // Open Add Modal
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Open Edit Modal
  const openEditModal = (medicine) => {
    setSelectedMedicine(medicine);
    setMedicineForm({
      name: medicine.name,
      genericName: medicine.genericName || '',
      description: medicine.description,
      detailedDescription: medicine.detailedDescription || '',
      price: medicine.price,
      discountedPrice: medicine.discountedPrice || '',
      discountPercentage: medicine.discountPercentage || 0,
      stockQuantity: medicine.stockQuantity,
      category: medicine.category,
      dosage: medicine.dosage || '',
      strength: medicine.strength || '',
      form: medicine.form || 'Tablet',
      manufacturer: medicine.manufacturer || '',
      expiry: medicine.expiry,
      supplier: medicine.supplier || '',
      prescriptionRequired: medicine.prescriptionRequired || false,
      sideEffects: medicine.sideEffects?.length ? medicine.sideEffects : [''],
      uses: medicine.uses?.length ? medicine.uses : [''],
      precautions: medicine.precautions?.length ? medicine.precautions : [''],
      instructions: medicine.instructions?.length ? medicine.instructions : [''],
      storageInstructions: medicine.storageInstructions || 'Store in a cool, dry place away from direct sunlight'
    });
    setShowEditModal(true);
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

  // Open Low Stock Modal
  const openLowStockModal = () => {
    setShowLowStockModal(true);
  };

  // Calculate status based on stock
  const calculateStatus = (stock) => {
    if (stock > 50) return 'In Stock';
    if (stock > 0) return 'Low Stock';
    return 'Out of Stock';
  };

  // Validate medicine form
  const validateMedicineForm = () => {
    // Required fields
    if (!medicineForm.name.trim()) {
      alert('Medicine name is required');
      return false;
    }
    if (!medicineForm.price || parseFloat(medicineForm.price) <= 0) {
      alert('Valid price is required');
      return false;
    }
    if (!medicineForm.stockQuantity || parseInt(medicineForm.stockQuantity) < 0) {
      alert('Valid stock quantity is required');
      return false;
    }
    if (!medicineForm.category) {
      alert('Category is required');
      return false;
    }
    if (!medicineForm.description.trim()) {
      alert('Description is required');
      return false;
    }

    // Field length restrictions
    if (medicineForm.dosage.length > 50) {
      alert('Dosage cannot exceed 50 characters');
      return false;
    }
    if (medicineForm.manufacturer.length > 100) {
      alert('Manufacturer cannot exceed 100 characters');
      return false;
    }
    if (medicineForm.description.length > 200) {
      alert('Description cannot exceed 200 characters');
      return false;
    }
    if (medicineForm.detailedDescription.length > 500) {
      alert('Detailed description cannot exceed 500 characters');
      return false;
    }

    // Array field restrictions
    const checkArrayField = (field, name, maxLength) => {
      for (let i = 0; i < medicineForm[field].length; i++) {
        if (medicineForm[field][i].length > maxLength) {
          alert(`${name} item cannot exceed ${maxLength} characters`);
          return false;
        }
      }
      return true;
    };

    if (!checkArrayField('sideEffects', 'Side effect', 100)) return false;
    if (!checkArrayField('uses', 'Use', 100)) return false;
    if (!checkArrayField('precautions', 'Precaution', 150)) return false;
    if (!checkArrayField('instructions', 'Instruction', 150)) return false;

    return true;
  };

  // Add new medicine
  const handleAddMedicine = (e) => {
    e.preventDefault();
    
    if (!validateMedicineForm()) return;

    const newMedicine = {
      id: medicines.length + 1,
      name: medicineForm.name,
      genericName: medicineForm.genericName,
      description: medicineForm.description,
      detailedDescription: medicineForm.detailedDescription,
      price: parseFloat(medicineForm.price),
      discountedPrice: medicineForm.discountedPrice ? parseFloat(medicineForm.discountedPrice) : null,
      discountPercentage: parseFloat(medicineForm.discountPercentage) || 0,
      stockQuantity: parseInt(medicineForm.stockQuantity),
      category: medicineForm.category,
      dosage: medicineForm.dosage,
      strength: medicineForm.strength,
      form: medicineForm.form,
      manufacturer: medicineForm.manufacturer,
      expiry: medicineForm.expiry,
      supplier: medicineForm.supplier,
      prescriptionRequired: medicineForm.prescriptionRequired,
      sideEffects: medicineForm.sideEffects.filter(effect => effect.trim() !== ''),
      uses: medicineForm.uses.filter(use => use.trim() !== ''),
      precautions: medicineForm.precautions.filter(precaution => precaution.trim() !== ''),
      instructions: medicineForm.instructions.filter(instruction => instruction.trim() !== ''),
      storageInstructions: medicineForm.storageInstructions,
      status: calculateStatus(parseInt(medicineForm.stockQuantity)),
      inStock: parseInt(medicineForm.stockQuantity) > 0,
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'
    };

    setMedicines([...medicines, newMedicine]);
    setShowAddModal(false);
    resetForm();
  };

  // Update medicine
  const handleUpdateMedicine = (e) => {
    e.preventDefault();
    
    if (!selectedMedicine) return;
    if (!validateMedicineForm()) return;

    const updatedMedicine = {
      ...selectedMedicine,
      name: medicineForm.name,
      genericName: medicineForm.genericName,
      description: medicineForm.description,
      detailedDescription: medicineForm.detailedDescription,
      price: parseFloat(medicineForm.price),
      discountedPrice: medicineForm.discountedPrice ? parseFloat(medicineForm.discountedPrice) : null,
      discountPercentage: parseFloat(medicineForm.discountPercentage) || 0,
      stockQuantity: parseInt(medicineForm.stockQuantity),
      category: medicineForm.category,
      dosage: medicineForm.dosage,
      strength: medicineForm.strength,
      form: medicineForm.form,
      manufacturer: medicineForm.manufacturer,
      expiry: medicineForm.expiry,
      supplier: medicineForm.supplier,
      prescriptionRequired: medicineForm.prescriptionRequired,
      sideEffects: medicineForm.sideEffects.filter(effect => effect.trim() !== ''),
      uses: medicineForm.uses.filter(use => use.trim() !== ''),
      precautions: medicineForm.precautions.filter(precaution => precaution.trim() !== ''),
      instructions: medicineForm.instructions.filter(instruction => instruction.trim() !== ''),
      storageInstructions: medicineForm.storageInstructions,
      status: calculateStatus(parseInt(medicineForm.stockQuantity)),
      inStock: parseInt(medicineForm.stockQuantity) > 0
    };

    setMedicines(medicines.map(m => m.id === selectedMedicine.id ? updatedMedicine : m));
    setShowEditModal(false);
    resetForm();
    setSelectedMedicine(null);
  };

  // Delete medicine
  const handleDeleteMedicine = () => {
    if (selectedMedicine) {
      setMedicines(medicines.filter(m => m.id !== selectedMedicine.id));
      setShowDeleteModal(false);
      setSelectedMedicine(null);
    }
  };

  // Update stock quantity
  const handleStockUpdate = (id, change) => {
    setMedicines(medicines.map(m => {
      if (m.id === id) {
        const newStock = Math.max(0, m.stockQuantity + change);
        return {
          ...m,
          stockQuantity: newStock,
          status: calculateStatus(newStock),
          inStock: newStock > 0
        };
      }
      return m;
    }));
  };

  // Stock status colors
  const stockColors = {
    'In Stock': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-amber-100 text-amber-800',
    'Out of Stock': 'bg-red-100 text-red-800',
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600">Manage your pharmacy inventory</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={openLowStockModal}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
          >
            <AlertCircle size={18} />
            <span>Stock Report</span>
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">In Stock</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.inStock}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Low Stock</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.lowStock}</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <AlertCircle className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.outOfStock}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">Rs. {stats.totalValue.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search - FIXED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, generic name, category, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
            >
              {['all', 'In Stock', 'Low Stock', 'Out of Stock'].map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
           {/* NEW: Expiry Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Expiry</label>
      <select
        value={expiryFilter}
        onChange={(e) => setExpiryFilter(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
      >
        <option value="all">All Expiry Status</option>
        <option value="expired">Expired</option>
        <option value="not-expired">Not Expired</option>
      </select>
    </div>
        </div>
      </div>

      

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Product Name</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Category</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Supplier</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Stock</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Price</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Expiry</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Pill size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{medicine.name}</div>
                        {medicine.genericName && (
                          <div className="text-sm text-gray-500">({medicine.genericName})</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {medicine.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{medicine.supplier}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium min-w-[40px] text-center">{medicine.stockQuantity}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleStockUpdate(medicine.id, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleStockUpdate(medicine.id, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </td>
                  {/* <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className=" text-sm line-through">Rs. {medicine.price.toFixed(2)}</span>
                      {medicine.discountedPrice && medicine.discountedPrice < medicine.price && (
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-green-600 ">Rs. {medicine.discountedPrice.toFixed(2)}</span>
                          {medicine.discountPercentage > 0 && (
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                              {medicine.discountPercentage}% off
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td> */}

                    <td className="py-4 px-6">
  <div className="flex flex-col">
    {medicine.discountedPrice !== null && 
     medicine.discountedPrice !== undefined && 
     medicine.discountedPrice < medicine.price ? (
      <>
        <span className="text-sm text-gray-500 line-through">Rs. {medicine.price.toFixed(2)}</span>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-green-600">Rs. {medicine.discountedPrice.toFixed(2)}</span>
          {medicine.discountPercentage > 0 && (
            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
              {medicine.discountPercentage}% off
            </span>
          )}
        </div>
      </>
    ) : (
      <span className="font-semibold">Rs. {medicine.price.toFixed(2)}</span>
    )}
  </div>
</td>

                  <td className="py-4 px-6">
  <span className={`px-2 py-1 rounded text-sm ${
    new Date(medicine.expiry) < new Date() 
      ? 'bg-red-100 text-red-700 font-medium' 
      : new Date(medicine.expiry) < new Date(Date.now() + 90*24*60*60*1000)
        ? 'bg-amber-100 text-amber-700' 
        : 'bg-gray-100 text-gray-700'
  }`}>
    {medicine.expiry}
    {new Date(medicine.expiry) < new Date() && ' (Expired)'}
  </span>
</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockColors[medicine.status]}`}>
                      {medicine.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(medicine)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => openViewModal(medicine)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(medicine)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

        {/* Empty State */}
        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Package className="text-gray-400" size={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 mx-auto px-6 py-3 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              <span>Add Your First Product</span>
            </button>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {filteredMedicines.length} of {medicines.length} products
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              const csv = filteredMedicines.map(m => 
                `${m.name},${m.category},${m.stockQuantity},${m.price},${m.status}`
              ).join('\n');
              const blob = new Blob([`Name,Category,Stock,Price,Status\n${csv}`], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'products_export.csv';
              a.click();
            }}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <FileDown size={18} />
            <span>Export as CSV</span>
          </button>
        </div>
      </div>

      {/* ========== MODALS ========== */}

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-800">Add New Medicine</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddMedicine} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Pill size={20} />
                    <span>Basic Information</span>
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medicine Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={medicineForm.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      required
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Generic Name
                    </label>
                    <input
                      type="text"
                      name="genericName"
                      value={medicineForm.genericName}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Short Description *
                      </label>
                      <span className={`text-xs ${medicineForm.description.length > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                        {medicineForm.description.length}/200
                      </span>
                    </div>
                    <textarea
                      name="description"
                      value={medicineForm.description}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      rows="2"
                      required
                      maxLength={200}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Detailed Description
                      </label>
                      <span className={`text-xs ${medicineForm.detailedDescription.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                        {medicineForm.detailedDescription.length}/500
                      </span>
                    </div>
                    <textarea
                      name="detailedDescription"
                      value={medicineForm.detailedDescription}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      rows="3"
                      maxLength={500}
                    />
                  </div>
                </div>

                {/* Category & Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Box size={20} />
                    <span>Category & Details</span>
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={medicineForm.category}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.filter(c => c !== 'all').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dosage
                      </label>
                      <input
                        type="text"
                        name="dosage"
                        value={medicineForm.dosage}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="e.g., 500mg"
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Strength
                      </label>
                      <input
                        type="text"
                        name="strength"
                        value={medicineForm.strength}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="e.g., 500mg per tablet"
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Form
                    </label>
                    <select
                      name="form"
                      value={medicineForm.form}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                    >
                      {medicineForms.map(form => (
                        <option key={form} value={form}>{form}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={medicineForm.manufacturer}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <IndianRupee size={20} />
                    <span>Pricing & Stock</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (Rs.) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={medicineForm.price}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discounted Price (Rs.)
                      </label>
                      <input
                        type="number"
                        name="discountedPrice"
                        value={medicineForm.discountedPrice}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Percentage (Auto-calculated)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        name="discountPercentage"
                        value={medicineForm.discountPercentage}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        min="0"
                        max="100"
                        step="1"
                        readOnly
                      />
                      <Percent size={20} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Automatically calculated from price and discounted price
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stockQuantity"
                      value={medicineForm.stockQuantity}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="expiry"
                      value={medicineForm.expiry}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Supplier & Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Building size={20} />
                    <span>Supplier & Requirements</span>
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      value={medicineForm.supplier}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Instructions
                    </label>
                    <textarea
                      name="storageInstructions"
                      value={medicineForm.storageInstructions}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      rows="2"
                      maxLength={200}
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="prescriptionRequired"
                      name="prescriptionRequired"
                      checked={medicineForm.prescriptionRequired}
                      onChange={handleFormChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label htmlFor="prescriptionRequired" className="text-sm font-medium text-gray-700">
                      Prescription Required
                    </label>
                  </div>
                </div>

                {/* Side Effects */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <AlertTriangle size={20} />
                      <span>Side Effects (Max 10)</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {medicineForm.sideEffects.filter(e => e.trim() !== '').length}/10
                    </span>
                  </div>
                  {medicineForm.sideEffects.map((effect, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={effect}
                        onChange={(e) => handleArrayFieldChange('sideEffects', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="Enter a side effect (max 100 characters)"
                        maxLength={100}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem('sideEffects', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {medicineForm.sideEffects.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem('sideEffects')}
                      className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      + Add Another Side Effect
                    </button>
                  )}
                </div>

                {/* Uses */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <CheckCircle size={20} />
                      <span>Uses (Max 10)</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {medicineForm.uses.filter(u => u.trim() !== '').length}/10
                    </span>
                  </div>
                  {medicineForm.uses.map((use, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={use}
                        onChange={(e) => handleArrayFieldChange('uses', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="Enter a use (max 100 characters)"
                        maxLength={100}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem('uses', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {medicineForm.uses.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem('uses')}
                      className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      + Add Another Use
                    </button>
                  )}
                </div>

                {/* Precautions */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <Shield size={20} />
                      <span>Precautions (Max 10)</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {medicineForm.precautions.filter(p => p.trim() !== '').length}/10
                    </span>
                  </div>
                  {medicineForm.precautions.map((precaution, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={precaution}
                        onChange={(e) => handleArrayFieldChange('precautions', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="Enter a precaution (max 150 characters)"
                        maxLength={150}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem('precautions', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {medicineForm.precautions.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem('precautions')}
                      className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      + Add Another Precaution
                    </button>
                  )}
                </div>

                {/* Instructions */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <Info size={20} />
                      <span>Instructions (Max 10)</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {medicineForm.instructions.filter(i => i.trim() !== '').length}/10
                    </span>
                  </div>
                  {medicineForm.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={instruction}
                        onChange={(e) => handleArrayFieldChange('instructions', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="Enter an instruction (max 150 characters)"
                        maxLength={150}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem('instructions', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {medicineForm.instructions.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem('instructions')}
                      className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      + Add Another Instruction
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-medium rounded-xl hover:opacity-90 transition-all"
                >
                  <Save size={18} />
                  <span>Add Medicine</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Medicine Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-800">Edit Medicine</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleUpdateMedicine} className="p-6">
              {/* Same form structure as Add Modal but with edit values */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Pill size={20} />
                    <span>Basic Information</span>
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medicine Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={medicineForm.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      required
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Generic Name
                    </label>
                    <input
                      type="text"
                      name="genericName"
                      value={medicineForm.genericName}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Short Description *
                      </label>
                      <span className={`text-xs ${medicineForm.description.length > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                        {medicineForm.description.length}/200
                      </span>
                    </div>
                    <textarea
                      name="description"
                      value={medicineForm.description}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      rows="2"
                      required
                      maxLength={200}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Detailed Description
                      </label>
                      <span className={`text-xs ${medicineForm.detailedDescription.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                        {medicineForm.detailedDescription.length}/500
                      </span>
                    </div>
                    <textarea
                      name="detailedDescription"
                      value={medicineForm.detailedDescription}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      rows="3"
                      maxLength={500}
                    />
                  </div>
                </div>

                {/* Category & Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Box size={20} />
                    <span>Category & Details</span>
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={medicineForm.category}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.filter(c => c !== 'all').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dosage
                      </label>
                      <input
                        type="text"
                        name="dosage"
                        value={medicineForm.dosage}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="e.g., 500mg"
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Strength
                      </label>
                      <input
                        type="text"
                        name="strength"
                        value={medicineForm.strength}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="e.g., 500mg per tablet"
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Form
                    </label>
                    <select
                      name="form"
                      value={medicineForm.form}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                    >
                      {medicineForms.map(form => (
                        <option key={form} value={form}>{form}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={medicineForm.manufacturer}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <IndianRupee size={20} />
                    <span>Pricing & Stock</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (Rs.) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={medicineForm.price}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discounted Price (Rs.)
                      </label>
                      <input
                        type="number"
                        name="discountedPrice"
                        value={medicineForm.discountedPrice}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Percentage (Auto-calculated)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        name="discountPercentage"
                        value={medicineForm.discountPercentage}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        min="0"
                        max="100"
                        step="1"
                        readOnly
                      />
                      <Percent size={20} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Automatically calculated from price and discounted price
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stockQuantity"
                      value={medicineForm.stockQuantity}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="expiry"
                      value={medicineForm.expiry}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Supplier & Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Building size={20} />
                    <span>Supplier & Requirements</span>
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      value={medicineForm.supplier}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Instructions
                    </label>
                    <textarea
                      name="storageInstructions"
                      value={medicineForm.storageInstructions}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      rows="2"
                      maxLength={200}
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="prescriptionRequiredEdit"
                      name="prescriptionRequired"
                      checked={medicineForm.prescriptionRequired}
                      onChange={handleFormChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label htmlFor="prescriptionRequiredEdit" className="text-sm font-medium text-gray-700">
                      Prescription Required
                    </label>
                  </div>
                </div>

                {/* Side Effects */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <AlertTriangle size={20} />
                      <span>Side Effects (Max 10)</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {medicineForm.sideEffects.filter(e => e.trim() !== '').length}/10
                    </span>
                  </div>
                  {medicineForm.sideEffects.map((effect, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={effect}
                        onChange={(e) => handleArrayFieldChange('sideEffects', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="Enter a side effect (max 100 characters)"
                        maxLength={100}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem('sideEffects', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {medicineForm.sideEffects.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem('sideEffects')}
                      className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      + Add Another Side Effect
                    </button>
                  )}
                </div>

                {/* Uses */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <CheckCircle size={20} />
                      <span>Uses (Max 10)</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {medicineForm.uses.filter(u => u.trim() !== '').length}/10
                    </span>
                  </div>
                  {medicineForm.uses.map((use, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={use}
                        onChange={(e) => handleArrayFieldChange('uses', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="Enter a use (max 100 characters)"
                        maxLength={100}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem('uses', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {medicineForm.uses.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem('uses')}
                      className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      + Add Another Use
                    </button>
                  )}
                </div>

                {/* Precautions */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <Shield size={20} />
                      <span>Precautions (Max 10)</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {medicineForm.precautions.filter(p => p.trim() !== '').length}/10
                    </span>
                  </div>
                  {medicineForm.precautions.map((precaution, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={precaution}
                        onChange={(e) => handleArrayFieldChange('precautions', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="Enter a precaution (max 150 characters)"
                        maxLength={150}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem('precautions', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {medicineForm.precautions.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem('precautions')}
                      className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      + Add Another Precaution
                    </button>
                  )}
                </div>

                {/* Instructions */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <Info size={20} />
                      <span>Instructions (Max 10)</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {medicineForm.instructions.filter(i => i.trim() !== '').length}/10
                    </span>
                  </div>
                  {medicineForm.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={instruction}
                        onChange={(e) => handleArrayFieldChange('instructions', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                        placeholder="Enter an instruction (max 150 characters)"
                        maxLength={150}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem('instructions', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {medicineForm.instructions.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem('instructions')}
                      className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      + Add Another Instruction
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-medium rounded-xl hover:opacity-90 transition-all"
                >
                  <Save size={18} />
                  <span>Update Medicine</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Medicine Details Modal */}
      {showViewModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Pill size={24} className="text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedMedicine.name}</h2>
                  {selectedMedicine.genericName && (
                    <p className="text-gray-600">({selectedMedicine.genericName})</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Description</label>
                        <p className="text-gray-800 mt-1">{selectedMedicine.description}</p>
                      </div>
                      {selectedMedicine.detailedDescription && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Detailed Description</label>
                          <p className="text-gray-800 mt-1">{selectedMedicine.detailedDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Medicine Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Category</label>
                        <p className="text-gray-800 mt-1">{selectedMedicine.category}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Form</label>
                        <p className="text-gray-800 mt-1">{selectedMedicine.form}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Dosage</label>
                        <p className="text-gray-800 mt-1">{selectedMedicine.dosage || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Strength</label>
                        <p className="text-gray-800 mt-1">{selectedMedicine.strength || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Supplier Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Manufacturer</label>
                        <p className="text-gray-800 mt-1">{selectedMedicine.manufacturer || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Supplier</label>
                        <p className="text-gray-800 mt-1">{selectedMedicine.supplier}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Pricing & Stock */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Pricing & Stock</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Price</label>
                          <p className="text-xl font-bold text-gray-800 mt-1">Rs. {selectedMedicine.price.toFixed(2)}</p>
                        </div>
                        {selectedMedicine.discountedPrice && selectedMedicine.discountedPrice < selectedMedicine.price && (
                          <div className="text-right">
                            <label className="text-sm font-medium text-gray-600">Discounted Price</label>
                            <div className="flex items-center space-x-2">
                              <p className="text-xl font-bold text-green-600 mt-1">Rs. {selectedMedicine.discountedPrice.toFixed(2)}</p>
                              {selectedMedicine.discountPercentage > 0 && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                                  {selectedMedicine.discountPercentage}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <label className="text-sm font-medium text-gray-600">Stock Quantity</label>
                          <p className="text-xl font-bold text-gray-800 mt-1">{selectedMedicine.stockQuantity}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <label className="text-sm font-medium text-gray-600">Status</label>
                          <p className={`px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block ${stockColors[selectedMedicine.status]}`}>
                            {selectedMedicine.status}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <label className="text-sm font-medium text-gray-600">Expiry Date</label>
                        <p className={`text-gray-800 mt-1 ${new Date(selectedMedicine.expiry) < new Date(Date.now() + 90*24*60*60*1000) ? 'text-red-600' : ''}`}>
                          {selectedMedicine.expiry}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements & Storage</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        {selectedMedicine.prescriptionRequired ? (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                            Prescription Required
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                            No Prescription Required
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Storage Instructions</label>
                        <p className="text-gray-800 mt-1">{selectedMedicine.storageInstructions}</p>
                      </div>
                    </div>
                  </div>

                  {/* Side Effects */}
                  {selectedMedicine.sideEffects && selectedMedicine.sideEffects.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Side Effects</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedicine.sideEffects.map((effect, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Uses */}
                  {selectedMedicine.uses && selectedMedicine.uses.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Uses</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedicine.uses.map((use, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Precautions */}
                  {selectedMedicine.precautions && selectedMedicine.precautions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Precautions</h3>
                      <ul className="space-y-2">
                        {selectedMedicine.precautions.map((precaution, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Shield size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{precaution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Instructions */}
                  {selectedMedicine.instructions && selectedMedicine.instructions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
                      <ul className="space-y-2">
                        {selectedMedicine.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Info size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedMedicine);
                  }}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-medium rounded-xl hover:opacity-90 transition-all"
                >
                  <Edit size={18} />
                  <span>Edit Medicine</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Low Stock Modal */}
      {showLowStockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-100">
                  <AlertCircle className="text-amber-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Low Stock Report</h2>
                  <p className="text-gray-600 text-sm">Medicines with low inventory levels</p>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {lowStockMedicines.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 mb-4">
                    Found {lowStockMedicines.length} medicine(s) with low stock
                  </div>
                  <div className="space-y-3">
                    {lowStockMedicines.map((medicine) => (
                      <div key={medicine.id} className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <Pill size={18} className="text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{medicine.name}</h4>
                            <p className="text-sm text-gray-600">{medicine.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-amber-700">{medicine.stockQuantity} units</div>
                          <div className="text-sm text-gray-600">in stock</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">All Stock Levels are Good!</h3>
                  <p className="text-gray-600">No medicines are currently low in stock.</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowLowStockModal(false)}
                className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              {lowStockMedicines.length > 0 && (
                <button
                  onClick={() => {
                    const csv = lowStockMedicines.map(m => 
                      `${m.name},${m.category},${m.stockQuantity},${m.price}`
                    ).join('\n');
                    const blob = new Blob([`Name,Category,Stock,Price\n${csv}`], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'low_stock_report.csv';
                    a.click();
                  }}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-medium rounded-xl hover:opacity-90 transition-all"
                >
                  <FileDown size={18} />
                  <span>Export Report</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Delete Medicine</h2>
              </div>
              <p className="text-gray-600">
                Are you sure you want to delete "<span className="font-semibold">{selectedMedicine.name}</span>"? 
                This action cannot be undone.
              </p>
              
              {selectedMedicine.stockQuantity > 0 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    ⚠️ This medicine has <span className="font-semibold">{selectedMedicine.stockQuantity} units</span> in stock.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 p-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedMedicine(null);
                }}
                className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMedicine}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:opacity-90 transition-all"
              >
                <Trash2 size={18} />
                <span>Delete Medicine</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
