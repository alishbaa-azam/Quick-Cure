//Unique order id above not work
// OrdersPage.jsx - Pharmacy Dashboard Orders
// import React, { useState, useEffect } from 'react';
// import {
//   Package, Truck, Clock, CheckCircle,
//   XCircle, AlertCircle, Filter, Search,
//   Download, Eye, Printer, MoreVertical,
//   Plus, RefreshCw, ChevronDown, User,
//   MapPin, Phone, DollarSign, Calendar,
//   FileText, ShoppingBag, Tag, Percent,
//   ArrowRight, Edit, Trash2, Shield,
//   Grid, List, ChevronLeft, ChevronRight,
//   Menu
// } from 'lucide-react';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [selectedOrders, setSelectedOrders] = useState([]);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [viewMode, setViewMode] = useState('cards');
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [error, setError] = useState(null);
//   const [pharmacyId, setPharmacyId] = useState(null);

//   // Get pharmacy ID from localStorage
//   useEffect(() => {
//     const storedPharmacyId = localStorage.getItem('pharmacyId');
//     if (storedPharmacyId) {
//       setPharmacyId(storedPharmacyId);
//     } else {
//       message.error('Pharmacy ID not found. Please login again.');
//     }
//   }, []);

//   // Fetch orders from API using pharmacyAPI
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       if (!pharmacyId) {
//         setError('Pharmacy ID not found');
//         setLoading(false);
//         return;
//       }
      
//       // ✅ Using pharmacyAPI.getOrders which calls /pharmacies/dashboard/:pharmacyId/orders
//       const response = await pharmacyAPI.getOrders(pharmacyId);
      
//       if (response.data?.success) {
//         const ordersData = response.data.data || [];
        
//         // Transform API data to match component structure
//         const transformedOrders = ordersData.map(order => ({
//           id: order._id || order.id,
//           orderNumber: order.orderNumber || order.orderId || `ORD-${(order._id || '').slice(-6) || '000001'}`,
//           customer: {
//             name: order.patientInfo?.name || order.patient?.name || order.customerName || order.customer?.name || 'Customer',
//             email: order.patientInfo?.email || order.patient?.email || order.customerEmail || order.customer?.email || '',
//             phone: order.patientInfo?.phone || order.patient?.phone || order.customerPhone || order.customer?.phone || '',
//             address: order.patientInfo?.address || order.patient?.address || order.shippingAddress || order.deliveryAddress || order.customer?.address || ''
//           },
//           products: (order.cart || order.items || order.medicines || []).map(item => ({
//             id: item._id || item.id,
//             name: item.name,
//             quantity: item.quantity || 1,
//             price: item.price || item.discountedPrice || 0,
//             total: (item.quantity || 1) * (item.price || item.discountedPrice || 0),
//             form: item.form,
//             tabletQuantity: item.tabletQuantity,
//             tabletsPerUnit: item.tabletsPerUnit
//           })),
//           total: order.total || order.totalAmount || 0,
//           subtotal: order.subtotal || order.total || order.totalAmount || 0,
//           tax: order.tax || 0,
//           discount: order.discount || 0,
//           date: order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()),
//           deliveryDate: order.deliveryDate || '',
//           status: order.status?.toLowerCase() || 'pending',
//           paymentMethod: order.paymentMethod || 'cash',
//           paymentStatus: order.paymentStatus || 'pending',
//           notes: order.notes || order.patientInfo?.notes || '',
//           prescriptionRequired: order.prescriptionRequired || false,
//           prescriptionVerified: order.prescriptionVerified || false,
//           deliveryAddress: order.patientInfo?.address || order.deliveryAddress || order.shippingAddress || '',
//           deliveryInstructions: order.deliveryInstructions || '',
//           createdAt: order.createdAt || order.timestamp || new Date().toISOString(),
//           pharmacyId: order.pharmacyId
//         }));
        
//         setOrders(transformedOrders);
//       } else {
//         setOrders([]);
//         if (response.data?.message !== 'No orders found') {
//           message.info(response.data?.message || 'No orders found');
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError(error.message || 'Failed to load orders');
//       message.error('Failed to load orders from server');
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (pharmacyId) {
//       fetchOrders();
//     }
//   }, [pharmacyId]);

//   // Update order status
//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       if (!pharmacyId) {
//         message.error('Pharmacy ID not found');
//         return;
//       }
      
//       // ✅ Using pharmacyAPI.updateOrderStatus
//       const response = await pharmacyAPI.updateOrderStatus(pharmacyId, orderId, newStatus);
      
//       if (response.data?.success) {
//         message.success(`Order status updated to ${newStatus}`);
//         fetchOrders(); // Refresh orders from server
//       } else {
//         message.error(response.data?.message || 'Failed to update order status');
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       message.error('Failed to update order status');
//     }
//   };

//   // Filter definitions
//   const filters = [
//     { id: 'all', label: 'All Orders', count: orders.length, icon: ShoppingBag },
//     { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length, icon: Clock },
//     { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length, icon: Package },
//     { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length, icon: Truck },
//     { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle },
//     { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length, icon: XCircle }
//   ];

//   // Filter and search orders
//   const filteredOrders = orders.filter(order => {
//     const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
//     const matchesSearch = searchTerm === '' || 
//       order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     return matchesFilter && matchesSearch;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

//   // View order details
//   const handleViewOrder = (order) => {
//     setSelectedOrder(order);
//     setShowOrderDetails(true);
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
//       case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
//       case 'shipped': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
//       case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
//       case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
//       case 'returned': return 'bg-purple-50 text-purple-700 border-purple-200';
//       default: return 'bg-gray-50 text-gray-600 border-gray-200';
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'pending': return Clock;
//       case 'processing': return Package;
//       case 'shipped': return Truck;
//       case 'delivered': return CheckCircle;
//       case 'cancelled': return XCircle;
//       case 'returned': return AlertCircle;
//       default: return Clock;
//     }
//   };

//   // Calculate statistics
//   const calculateStats = () => {
//     const totalOrders = orders.length;
//     const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
//     const pendingOrders = orders.filter(o => o.status === 'pending').length;
//     const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    
//     return { totalOrders, totalRevenue, pendingOrders, deliveredOrders };
//   };

//   const stats = calculateStats();

//   // Format currency
//   const formatCurrency = (amount) => {
//     return `Rs ${amount?.toFixed(2) || '0.00'}`;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-PK', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (e) {
//       return dateString;
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 flex items-center justify-center">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Orders</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={fetchOrders}
//             className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <div>
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Order Management</h1>
//           <p className="text-sm text-gray-600 mt-1">Manage and track customer orders</p>
//         </div>
//         <div className="flex gap-2 mt-4 md:mt-0">
//           <button 
//             onClick={fetchOrders}
//             className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
//           >
//             <RefreshCw size={16} />
//             <span className="hidden sm:inline">Refresh</span>
//           </button>
          
//           {/* Mobile View Toggle */}
//           <div className="flex bg-gray-100 p-1 rounded-lg">
//             <button
//               onClick={() => setViewMode('cards')}
//               className={`p-2 rounded-md transition-colors ${viewMode === 'cards' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
//               title="Card View"
//             >
//               <Grid size={18} />
//             </button>
//             <button
//               onClick={() => setViewMode('table')}
//               className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
//               title="Table View"
//             >
//               <List size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
//         <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500 uppercase">Total Orders</p>
//               <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
//             </div>
//             <div className="p-3 rounded-xl bg-blue-50">
//               <ShoppingBag className="text-blue-600" size={22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500 uppercase">Total Revenue</p>
//               <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalRevenue)}</p>
//             </div>
//             <div className="p-3 rounded-xl bg-green-50">
//               <DollarSign className="text-green-600" size={22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500 uppercase">Pending</p>
//               <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.pendingOrders}</p>
//             </div>
//             <div className="p-3 rounded-xl bg-amber-50">
//               <Clock className="text-amber-600" size={22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500 uppercase">Delivered</p>
//               <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.deliveredOrders}</p>
//             </div>
//             <div className="p-3 rounded-xl bg-green-50">
//               <CheckCircle className="text-green-600" size={22} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Toggle */}
//       <div className="md:hidden mb-4">
//         <button
//           onClick={() => setShowMobileFilters(!showMobileFilters)}
//           className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200"
//         >
//           <div className="flex items-center gap-2">
//             <Filter size={18} className="text-gray-500" />
//             <span className="font-medium">Filter Orders</span>
//           </div>
//           <span className="text-sm text-gray-500 capitalize">{activeFilter !== 'all' ? activeFilter : 'All Orders'}</span>
//         </button>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
//         <div className="flex flex-col lg:flex-row lg:items-center gap-4">
//           {/* Filter Tabs - Desktop */}
//           <div className="hidden md:flex flex-wrap gap-2">
//             {filters.map((filter) => {
//               const Icon = filter.icon;
//               return (
//                 <button
//                   key={filter.id}
//                   onClick={() => {
//                     setActiveFilter(filter.id);
//                     setCurrentPage(1);
//                   }}
//                   className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
//                     activeFilter === filter.id
//                       ? 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white shadow-sm'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Icon size={16} />
//                   <span>{filter.label}</span>
//                   <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
//                     {filter.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Mobile Filter Dropdown */}
//           <div className="md:hidden w-full">
//             {showMobileFilters && (
//               <div className="grid grid-cols-2 gap-2 mb-4">
//                 {filters.map((filter) => {
//                   const Icon = filter.icon;
//                   return (
//                     <button
//                       key={filter.id}
//                       onClick={() => {
//                         setActiveFilter(filter.id);
//                         setCurrentPage(1);
//                         setShowMobileFilters(false);
//                       }}
//                       className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-between ${
//                         activeFilter === filter.id
//                           ? 'bg-[#2c6774] text-white'
//                           : 'bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <Icon size={14} />
//                         <span>{filter.label}</span>
//                       </div>
//                       <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
//                         {filter.count}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 flex gap-2">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search by order ID, customer, medicine..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm"
//               />
//             </div>
//             <select
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//               className="px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 bg-white text-sm"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Orders Display */}
//       {orders.length === 0 ? (
//         <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//           <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">No Orders Found</h3>
//           <p className="text-gray-600">There are no orders to display at the moment.</p>
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table View */}
//           <div className={`hidden md:block ${viewMode === 'table' ? '' : 'md:hidden'}`}>
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="text-left py-4 px-4 md:px-6 text-xs font-medium text-gray-500 uppercase">Order ID</th>
//                       <th className="text-left py-4 px-4 md:px-6 text-xs font-medium text-gray-500 uppercase">Customer</th>
//                       <th className="text-left py-4 px-4 md:px-6 text-xs font-medium text-gray-500 uppercase">Products</th>
//                       <th className="text-left py-4 px-4 md:px-6 text-xs font-medium text-gray-500 uppercase">Total</th>
//                       <th className="text-left py-4 px-4 md:px-6 text-xs font-medium text-gray-500 uppercase">Date</th>
//                       <th className="text-left py-4 px-4 md:px-6 text-xs font-medium text-gray-500 uppercase">Status</th>
//                       <th className="text-left py-4 px-4 md:px-6 text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {currentOrders.map((order) => {
//                       const StatusIcon = getStatusIcon(order.status);
//                       return (
//                         <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
//                           <td className="py-4 px-4 md:px-6">
//                             <span className="font-medium text-[#2c6774]">{order.orderNumber}</span>
//                           </td>
//                           <td className="py-4 px-4 md:px-6">
//                             <div>
//                               <p className="font-medium text-gray-900">{order.customer.name}</p>
//                               <p className="text-xs text-gray-500 mt-0.5">{order.customer.phone}</p>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4 md:px-6">
//                             <div className="space-y-1">
//                               {order.products.slice(0, 2).map((product, idx) => (
//                                 <p key={idx} className="text-sm text-gray-600">
//                                   {product.quantity} × {product.name}
//                                 </p>
//                               ))}
//                               {order.products.length > 2 && (
//                                 <p className="text-xs text-gray-500">
//                                   +{order.products.length - 2} more items
//                                 </p>
//                               )}
//                             </div>
//                           </td>
//                           <td className="py-4 px-4 md:px-6 font-semibold text-gray-900">
//                             {formatCurrency(order.total)}
//                           </td>
//                           <td className="py-4 px-4 md:px-6 text-sm text-gray-600">
//                             {formatDate(order.createdAt || order.date)}
//                           </td>
//                           <td className="py-4 px-4 md:px-6">
//                             <div className="flex items-center gap-2">
//                               <StatusIcon size={14} className="text-gray-500" />
//                               <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
//                                 {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4 md:px-6">
//                             <div className="flex gap-1">
//                               <button
//                                 onClick={() => handleViewOrder(order)}
//                                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                 title="View Details"
//                               >
//                                 <Eye size={18} />
//                               </button>
//                               {order.status === 'pending' && (
//                                 <button
//                                   onClick={() => updateOrderStatus(order.id, 'processing')}
//                                   className="p-2 text-[#2c6774] hover:bg-[#2c6774]/10 rounded-lg transition-colors"
//                                   title="Process Order"
//                                 >
//                                   <Package size={18} />
//                                 </button>
//                               )}
//                               {order.status === 'processing' && (
//                                 <button
//                                   onClick={() => updateOrderStatus(order.id, 'shipped')}
//                                   className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                                   title="Mark as Shipped"
//                                 >
//                                   <Truck size={18} />
//                                 </button>
//                               )}
//                               {order.status === 'shipped' && (
//                                 <button
//                                   onClick={() => updateOrderStatus(order.id, 'delivered')}
//                                   className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                   title="Mark as Delivered"
//                                 >
//                                   <CheckCircle size={18} />
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Desktop Card View */}
//           <div className={`hidden md:block ${viewMode === 'cards' ? '' : 'md:hidden'}`}>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {currentOrders.map((order) => {
//                 const StatusIcon = getStatusIcon(order.status);
//                 return (
//                   <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
//                     <div className="flex justify-between items-start mb-3">
//                       <div>
//                         <p className="font-semibold text-[#2c6774]">{order.orderNumber}</p>
//                         <p className="text-sm text-gray-600 mt-1">{order.customer.name}</p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <StatusIcon size={14} className="text-gray-500" />
//                         <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2 mb-3">
//                       <p className="text-sm text-gray-600">
//                         {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
//                       </p>
//                       <p className="text-sm">
//                         {order.products.slice(0, 2).map(p => `${p.quantity}×${p.name}`).join(', ')}
//                         {order.products.length > 2 && ` +${order.products.length - 2} more`}
//                       </p>
//                     </div>
                    
//                     <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//                       <div>
//                         <p className="text-xs text-gray-500">Total</p>
//                         <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
//                       </div>
//                       <button
//                         onClick={() => handleViewOrder(order)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                       >
//                         <Eye size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Mobile Card View */}
//           <div className="md:hidden">
//             <div className="grid grid-cols-1 gap-4">
//               {currentOrders.map((order) => {
//                 const StatusIcon = getStatusIcon(order.status);
//                 return (
//                   <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
//                     <div className="flex justify-between items-start mb-3">
//                       <div>
//                         <p className="font-semibold text-[#2c6774]">{order.orderNumber}</p>
//                         <p className="text-sm text-gray-600 mt-1">{order.customer.name}</p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <StatusIcon size={14} className="text-gray-500" />
//                         <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2 mb-3">
//                       <p className="text-sm text-gray-600">
//                         {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
//                       </p>
//                       <p className="text-sm">
//                         {order.products.slice(0, 2).map(p => `${p.quantity}×${p.name}`).join(', ')}
//                         {order.products.length > 2 && ` +${order.products.length - 2} more`}
//                       </p>
//                     </div>
                    
//                     <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//                       <div>
//                         <p className="text-xs text-gray-500">Total</p>
//                         <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
//                       </div>
//                       <button
//                         onClick={() => handleViewOrder(order)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                       >
//                         <Eye size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Pagination */}
//           {filteredOrders.length > 0 && (
//             <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <p className="text-sm text-gray-600 order-2 sm:order-1">
//                 Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}
//               </p>
//               <div className="flex items-center gap-2 order-1 sm:order-2">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>
//                 <span className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm">
//                   {currentPage}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Order Details Modal */}
//       {showOrderDetails && selectedOrder && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-xl w-full max-w-4xl my-8">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
//               <div className="flex items-center justify-between p-4 sm:p-6">
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-bold text-gray-900">Order #{selectedOrder.orderNumber}</h2>
//                   <p className="text-sm text-gray-600 mt-1">Placed on {formatDate(selectedOrder.createdAt || selectedOrder.date)}</p>
//                 </div>
//                 <button
//                   onClick={() => setShowOrderDetails(false)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <XCircle size={20} className="text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             {/* Modal Content */}
//             <div className="p-4 sm:p-6">
//               {/* Status Bar */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className={`p-2 rounded-lg ${getStatusColor(selectedOrder.status)}`}>
//                     {React.createElement(getStatusIcon(selectedOrder.status), { size: 20 })}
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Current Status</p>
//                     <p className="font-semibold text-gray-900 capitalize">{selectedOrder.status}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Customer Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-base font-semibold text-gray-800">Customer Information</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg space-y-3">
//                     <div className="flex items-center gap-2">
//                       <User size={16} className="text-gray-500" />
//                       <span className="text-sm">{selectedOrder.customer.name}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Phone size={16} className="text-gray-500" />
//                       <span className="text-sm">{selectedOrder.customer.phone || 'N/A'}</span>
//                     </div>
//                     <div className="flex items-start gap-2">
//                       <MapPin size={16} className="text-gray-500 mt-0.5" />
//                       <span className="text-sm">{selectedOrder.deliveryAddress}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="space-y-4">
//                   <h3 className="text-base font-semibold text-gray-800">Order Summary</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <div className="space-y-2">
//                       {selectedOrder.products.map((product, idx) => (
//                         <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
//                           <div>
//                             <p className="font-medium text-sm">{product.name}</p>
//                             <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
//                           </div>
//                           <p className="font-medium text-sm">{formatCurrency(product.total)}</p>
//                         </div>
//                       ))}
//                     </div>
                    
//                     <div className="mt-4 pt-4 border-t border-gray-200">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Subtotal</span>
//                         <span className="font-medium">{formatCurrency(selectedOrder.subtotal)}</span>
//                       </div>
//                       {selectedOrder.discount > 0 && (
//                         <div className="flex justify-between text-sm mt-2">
//                           <span className="text-gray-600">Discount</span>
//                           <span className="font-medium text-green-600">-{formatCurrency(selectedOrder.discount)}</span>
//                         </div>
//                       )}
//                       <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-gray-200">
//                         <span>Total</span>
//                         <span className="text-[#2c6774]">{formatCurrency(selectedOrder.total)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Notes */}
//               {(selectedOrder.notes || selectedOrder.deliveryInstructions) && (
//                 <div className="mt-6 bg-gray-50 p-4 rounded-lg">
//                   <p className="text-sm font-medium text-gray-700 mb-2">Additional Notes</p>
//                   <p className="text-sm text-gray-600">{selectedOrder.notes || selectedOrder.deliveryInstructions || 'No notes'}</p>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="mt-6 flex flex-wrap gap-2 justify-end">
//                 <button
//                   onClick={() => setShowOrderDetails(false)}
//                   className="px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   Close
//                 </button>
//                 {selectedOrder.status === 'pending' && (
//                   <>
//                     <button
//                       onClick={() => {
//                         updateOrderStatus(selectedOrder.id, 'processing');
//                         setShowOrderDetails(false);
//                       }}
//                       className="px-4 py-2.5 bg-[#2c6774] text-white font-medium rounded-lg hover:bg-[#174047] transition-colors"
//                     >
//                       Process Order
//                     </button>
//                     <button
//                       onClick={() => {
//                         updateOrderStatus(selectedOrder.id, 'cancelled');
//                         setShowOrderDetails(false);
//                       }}
//                       className="px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 )}
//                 {selectedOrder.status === 'processing' && (
//                   <button
//                     onClick={() => {
//                       updateOrderStatus(selectedOrder.id, 'shipped');
//                       setShowOrderDetails(false);
//                     }}
//                     className="px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
//                   >
//                     Mark as Shipped
//                   </button>
//                 )}
//                 {selectedOrder.status === 'shipped' && (
//                   <button
//                     onClick={() => {
//                       updateOrderStatus(selectedOrder.id, 'delivered');
//                       setShowOrderDetails(false);
//                     }}
//                     className="px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                     Mark as Delivered
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;





































// OrdersPage.jsx - Updated with Status Update Only
import React, { useState, useEffect } from 'react';
import {
  Package, Truck, Clock, CheckCircle,
  XCircle, AlertCircle, Filter, Search,
  Download, Eye, Printer, MoreVertical,
  Plus, RefreshCw, ChevronDown, User,
  MapPin, Phone, DollarSign, Calendar,
  FileText, ShoppingBag, Tag, Percent,
  ArrowRight, Edit, Trash2, Shield,
  Grid, List, ChevronLeft, ChevronRight,
  Menu
} from 'lucide-react';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { message } from 'antd';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('cards');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [error, setError] = useState(null);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Get pharmacy ID from localStorage
  useEffect(() => {
    const storedPharmacyId = localStorage.getItem('pharmacyId');
    if (storedPharmacyId) {
      setPharmacyId(storedPharmacyId);
    } else {
      message.error('Pharmacy ID not found. Please login again.');
    }
  }, []);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!pharmacyId) {
        setError('Pharmacy ID not found');
        setLoading(false);
        return;
      }
      
      const response = await pharmacyAPI.getOrders(pharmacyId);
      
      if (response.data?.success) {
        const ordersData = response.data.data || [];
        
        const transformedOrders = ordersData.map(order => ({
          id: order._id,
          orderNumber: order.orderNumber || order.orderId || `ORD-${(order._id || '').slice(-6)}`,
          customer: {
            name: order.patientInfo?.name || order.patient?.name || 'Customer',
            email: order.patientInfo?.email || order.patient?.email || '',
            phone: order.patientInfo?.phone || order.patient?.phone || '',
            address: order.patientInfo?.address || order.patient?.address || ''
          },
          products: (order.cart || order.medicines || order.items || []).map(item => ({
            id: item._id,
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price || 0,
            total: (item.quantity || 1) * (item.price || 0)
          })),
          total: order.total || order.finalAmount || 0,
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
          status: order.status?.toLowerCase() || 'pending',
          paymentMethod: order.payment?.method || 'cash',
          paymentStatus: order.payment?.status || 'pending',
          notes: order.notes || '',
          prescriptionRequired: order.prescriptionRequired || false,
          prescriptionVerified: order.prescriptionVerified || false,
          deliveryAddress: order.deliveryInfo?.address || order.patientInfo?.address || '',
          createdAt: order.createdAt
        }));
        
        setOrders(transformedOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message || 'Failed to load orders');
      message.error('Failed to load orders from server');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pharmacyId) {
      fetchOrders();
    }
  }, [pharmacyId]);

  // ✅ Only update order status - no editing of order details
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(true);
      
      if (!pharmacyId) {
        message.error('Pharmacy ID not found');
        return;
      }
      
      const response = await pharmacyAPI.updateOrderStatus(pharmacyId, orderId, newStatus);
      
      if (response.data?.success) {
        message.success(`Order status updated to ${newStatus}`);
        fetchOrders(); // Refresh orders
      } else {
        message.error(response.data?.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error('Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ✅ Get available status actions based on current status
  const getAvailableActions = (currentStatus) => {
    switch(currentStatus) {
      case 'pending':
        return [
          { label: 'Process Order', value: 'processing', icon: Package, color: 'blue' },
          { label: 'Cancel Order', value: 'cancelled', icon: XCircle, color: 'red' }
        ];
      case 'processing':
        return [
          { label: 'Mark as Shipped', value: 'shipped', icon: Truck, color: 'indigo' },
          { label: 'Cancel Order', value: 'cancelled', icon: XCircle, color: 'red' }
        ];
      case 'shipped':
        return [
          { label: 'Mark as Delivered', value: 'delivered', icon: CheckCircle, color: 'green' }
        ];
      case 'delivered':
        return [];
      case 'cancelled':
        return [];
      default:
        return [];
    }
  };

  // Filter definitions
  const filters = [
    { id: 'all', label: 'All Orders', count: orders.length, icon: ShoppingBag },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length, icon: Clock },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length, icon: Package },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length, icon: Truck },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length, icon: XCircle }
  ];

  // Filter and search orders
  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = searchTerm === '' || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shipped': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length
  };

  const formatCurrency = (amount) => `Rs ${amount?.toFixed(2) || '0.00'}`;
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Orders</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={fetchOrders} className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-600 mt-1">Update order status and track deliveries</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button onClick={fetchOrders} className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 text-sm font-medium">
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setViewMode('cards')} className={`p-2 rounded-md ${viewMode === 'cards' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
              <Grid size={18} />
            </button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Total Orders</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50"><ShoppingBag className="text-blue-600" size={22} /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50"><DollarSign className="text-green-600" size={22} /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Pending</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.pendingOrders}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50"><Clock className="text-amber-600" size={22} /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Delivered</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.deliveredOrders}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50"><CheckCircle className="text-green-600" size={22} /></div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="hidden md:flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button key={filter.id} onClick={() => { setActiveFilter(filter.id); setCurrentPage(1); }}
                  className={`px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 ${activeFilter === filter.id ? 'bg-[#2c6774] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <Icon size={16} />
                  <span>{filter.label}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{filter.count}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search by order ID, customer..." value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm" />
            </div>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Display */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Orders Found</h3>
          <p className="text-gray-600">No orders have been placed yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className={`hidden md:block ${viewMode === 'table' ? '' : 'md:hidden'}`}>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">Order ID</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">Customer</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">Items</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">Total</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">Date</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">Status</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {currentOrders.map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      const actions = getAvailableActions(order.status);
                      return (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4"><span className="font-medium text-[#2c6774]">{order.orderNumber}</span></td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{order.customer.name}</p>
                              <p className="text-xs text-gray-500">{order.customer.phone}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              {order.products.slice(0, 2).map((p, idx) => (
                                <p key={idx} className="text-sm text-gray-600">{p.quantity} × {p.name}</p>
                              ))}
                              {order.products.length > 2 && <p className="text-xs text-gray-500">+{order.products.length - 2} more</p>}
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold">{formatCurrency(order.total)}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{formatDate(order.createdAt)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <StatusIcon size={14} className="text-gray-500" />
                              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-1">
                              <button onClick={() => handleViewOrder(order)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                                <Eye size={18} />
                              </button>
                              {actions.map(action => (
                                <button key={action.value} onClick={() => updateOrderStatus(order.id, action.value)} disabled={updatingStatus}
                                  className={`p-2 rounded-lg transition-colors ${action.color === 'red' ? 'text-red-600 hover:bg-red-50' : 
                                    action.color === 'green' ? 'text-green-600 hover:bg-green-50' : 
                                    action.color === 'indigo' ? 'text-indigo-600 hover:bg-indigo-50' : 
                                    'text-blue-600 hover:bg-blue-50'}`} title={action.label}>
                                  <action.icon size={18} />
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className={`${viewMode === 'cards' ? '' : 'hidden'} space-y-4`}>
            {currentOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              const actions = getAvailableActions(order.status);
              return (
                <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-[#2c6774]">{order.orderNumber}</p>
                      <p className="text-sm text-gray-600 mt-1">{order.customer.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon size={14} className="text-gray-500" />
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-gray-600">{order.products.length} items</p>
                    <p className="text-sm">{order.products.slice(0, 2).map(p => `${p.quantity}×${p.name}`).join(', ')}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="font-bold">{formatCurrency(order.total)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleViewOrder(order)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye size={18} />
                      </button>
                      {actions.map(action => (
                        <button key={action.value} onClick={() => updateOrderStatus(order.id, action.value)} disabled={updatingStatus}
                          className={`p-2 rounded-lg ${action.color === 'red' ? 'text-red-600 hover:bg-red-50' : 
                            action.color === 'green' ? 'text-green-600 hover:bg-green-50' : 
                            'text-blue-600 hover:bg-blue-50'}`}>
                          <action.icon size={18} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                  <ChevronLeft size={18} />
                </button>
                <span className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm">{currentPage}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Order Details Modal - View Only */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-4xl my-8">
            <div className="sticky top-0 bg-white border-b p-4 sm:p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Order #{selectedOrder.orderNumber}</h2>
                <p className="text-sm text-gray-600 mt-1">Placed on {formatDate(selectedOrder.createdAt)}</p>
              </div>
              <button onClick={() => setShowOrderDetails(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {/* Status Bar */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(selectedOrder.status)}`}>
                    {React.createElement(getStatusIcon(selectedOrder.status), { size: 20 })}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <p className="font-semibold text-gray-900 capitalize">{selectedOrder.status}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-2"><User size={16} /><span className="text-sm">{selectedOrder.customer.name}</span></div>
                    <div className="flex items-center gap-2"><Phone size={16} /><span className="text-sm">{selectedOrder.customer.phone || 'N/A'}</span></div>
                    <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5" /><span className="text-sm">{selectedOrder.deliveryAddress}</span></div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Order Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      {selectedOrder.products.map((product, idx) => (
                        <div key={idx} className="flex justify-between py-2 border-b last:border-0">
                          <div><p className="font-medium text-sm">{product.name}</p><p className="text-xs text-gray-500">Qty: {product.quantity}</p></div>
                          <p className="font-medium text-sm">{formatCurrency(product.total)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-[#2c6774]">{formatCurrency(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Additional Notes</p>
                  <p className="text-sm text-gray-600">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Action Buttons - Only Status Update */}
              <div className="mt-6 flex flex-wrap gap-2 justify-end">
                <button onClick={() => setShowOrderDetails(false)} className="px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100">
                  Close
                </button>
                {getAvailableActions(selectedOrder.status).map(action => (
                  <button key={action.value} onClick={() => {
                    updateOrderStatus(selectedOrder.id, action.value);
                    setShowOrderDetails(false);
                  }} disabled={updatingStatus}
                    className={`px-4 py-2.5 text-white font-medium rounded-lg transition-colors ${
                      action.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                      action.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                      action.color === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700' :
                      'bg-[#2c6774] hover:bg-[#174047]'
                    }`}>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;