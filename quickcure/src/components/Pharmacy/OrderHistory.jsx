// import React, { useState, useEffect } from 'react';
// import { 
//   FaArrowLeft, 
//   FaCheckCircle, 
//   FaClock, 
//   FaBoxOpen, 
//   FaFilePdf, 
//   FaPrint, 
//   FaDownload, 
//   FaTimes, 
//   FaExclamationCircle,
//   FaTimesCircle,
//   FaSpinner
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// // import './OrderHistory.css';

// const API_URL = 'http://localhost:5000/api';

// const OrderHistory = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [cancellingOrder, setCancellingOrder] = useState(null);
//   const [updatingStatus, setUpdatingStatus] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//     fetchOrderStats();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/medicine-orders/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setOrders(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       setError('Failed to load orders. Please try again.');
//       toast.error('Failed to load orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrderStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/medicine-orders/stats`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setStats(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching stats:', err);
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return <FaClock className="w-4 h-4 text-yellow-600" />;
//       case 'processing':
//         return <FaSpinner className="w-4 h-4 text-blue-600 animate-spin" />;
//       case 'delivered':
//         return <FaCheckCircle className="w-4 h-4 text-green-600" />;
//       case 'cancelled':
//         return <FaTimesCircle className="w-4 h-4 text-red-600" />;
//       case 'failed':
//         return <FaExclamationCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return <FaClock className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
//       case 'processing':
//         return 'bg-blue-100 text-blue-800 border border-blue-200';
//       case 'delivered':
//         return 'bg-green-100 text-green-800 border border-green-200';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800 border border-red-200';
//       case 'failed':
//         return 'bg-red-100 text-red-800 border border-red-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border border-gray-200';
//     }
//   };

//   const viewOrderDetails = (order) => {
//     setSelectedOrder(order);
//     setShowOrderDetails(true);
//   };

//   const handleCancelOrder = async (orderId) => {
//     if (!window.confirm('Are you sure you want to cancel this order?')) {
//       return;
//     }

//     try {
//       setCancellingOrder(orderId);
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `${API_URL}/medicine-orders/${orderId}/cancel`, 
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (response.data.success) {
//         toast.success('Order cancelled successfully');
//         fetchOrders();
//         fetchOrderStats();
//         if (selectedOrder && selectedOrder._id === orderId) {
//           setSelectedOrder(response.data.data);
//         }
//       }
//     } catch (err) {
//       console.error('Error cancelling order:', err);
//       toast.error(err.response?.data?.message || 'Failed to cancel order');
//     } finally {
//       setCancellingOrder(null);
//     }
//   };

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     try {
//       setUpdatingStatus(orderId);
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `${API_URL}/medicine-orders/${orderId}/status`,
//         { status: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (response.data.success) {
//         toast.success('Order status updated successfully');
//         fetchOrders();
//         fetchOrderStats();
//         if (selectedOrder && selectedOrder._id === orderId) {
//           setSelectedOrder(response.data.data);
//         }
//       }
//     } catch (err) {
//       console.error('Error updating order status:', err);
//       toast.error(err.response?.data?.message || 'Failed to update order status');
//     } finally {
//       setUpdatingStatus(null);
//     }
//   };

//   const printOrder = () => {
//     window.print();
//   };

//   const downloadOrder = () => {
//     if (!selectedOrder) return;
    
//     const data = JSON.stringify(selectedOrder, null, 2);
//     const blob = new Blob([data], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `order-${selectedOrder.orderNumber}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getUserRole = () => {
//     const userData = localStorage.getItem('user');
//     return userData ? JSON.parse(userData).role : 'user';
//   };

//   const isAdminOrPharmacy = () => {
//     const role = getUserRole();
//     return role === 'admin' || role === 'pharmacy';
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800 mb-6 transition-colors"
//       >
//         <FaArrowLeft className="w-5 h-5 mr-2" />
//         Go Back
//       </button>

//       <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-2">Order History</h1>
//       <p className="text-gray-600 mb-8">View and manage all your medicine orders</p>

//       {/* Order Statistics */}
//       {stats && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="flex items-center gap-2 mb-1">
//               <FaClock className="text-yellow-600" />
//               <h3 className="text-sm text-gray-500">Pending</h3>
//             </div>
//             <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="flex items-center gap-2 mb-1">
//               <FaSpinner className="text-blue-600" />
//               <h3 className="text-sm text-gray-500">Processing</h3>
//             </div>
//             <p className="text-2xl font-bold text-blue-600">{stats.processingOrders}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="flex items-center gap-2 mb-1">
//               <FaCheckCircle className="text-green-600" />
//               <h3 className="text-sm text-gray-500">Delivered</h3>
//             </div>
//             <p className="text-2xl font-bold text-green-600">{stats.deliveredOrders}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="flex items-center gap-2 mb-1">
//               <div className="flex">
//                 <FaTimesCircle className="text-red-600" />
//                 <FaExclamationCircle className="text-red-600 -ml-2" />
//               </div>
//               <h3 className="text-sm text-gray-500">Cancelled/Failed</h3>
//             </div>
//             <p className="text-2xl font-bold text-red-600">{stats.cancelledOrders + stats.failedOrders}</p>
//           </div>
//         </div>
//       )}

//       {error ? (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//           {error}
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="text-center py-12 bg-white rounded-lg shadow">
//           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FaBoxOpen className="w-10 h-10 text-gray-400" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
//           <p className="text-gray-500 mb-6">You haven't placed any medicine orders yet.</p>
//           <button
//             onClick={() => navigate('/pharmacies')}
//             className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
//           >
//             Browse Pharmacies
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//               <div className="p-6">
//                 <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex flex-wrap items-center gap-2 mb-2">
//                       <h3 className="text-lg font-semibold text-gray-800">{order.orderNumber}</h3>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} flex items-center gap-1`}>
//                         {getStatusIcon(order.status)}
//                         {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mb-1">
//                       <span className="font-medium">{order.patientInfo.name}</span> • {formatDate(order.orderDate)}
//                     </p>
//                     <p className="text-gray-600 mb-2">
//                       {order.cart.length} item{order.cart.length !== 1 ? 's' : ''} • 
//                       Total: <span className="font-bold text-[var(--primary-color)]">Rs. {order.total.toFixed(2)}</span>
//                     </p>
//                     {order.notes && (
//                       <p className="text-sm text-gray-500 italic mt-2">
//                         Note: {order.notes}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     <button
//                       onClick={() => viewOrderDetails(order)}
//                       className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary-color)] transition-colors text-sm font-medium flex-1 lg:flex-none"
//                     >
//                       View Details
//                     </button>
//                     {order.status === 'pending' && !isAdminOrPharmacy() && (
//                       <button
//                         onClick={() => handleCancelOrder(order._id)}
//                         disabled={cancellingOrder === order._id}
//                         className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1 lg:flex-none"
//                       >
//                         {cancellingOrder === order._id ? 'Cancelling...' : 'Cancel Order'}
//                       </button>
//                     )}
//                     {isAdminOrPharmacy() && order.status !== 'delivered' && order.status !== 'cancelled' && order.status !== 'failed' && (
//                       <select
//                         value={order.status}
//                         onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
//                         disabled={updatingStatus === order._id}
//                         className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="processing">Processing</option>
//                         <option value="delivered">Delivered</option>
//                         <option value="failed">Failed</option>
//                       </select>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Order Details Modal */}
//       {showOrderDetails && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
//                   <p className="text-gray-600">{selectedOrder.orderNumber}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={printOrder}
//                     className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
//                     title="Print Order"
//                   >
//                     <FaPrint className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={downloadOrder}
//                     className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
//                     title="Download Order"
//                   >
//                     <FaDownload className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => setShowOrderDetails(false)}
//                     className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
//                   >
//                     <FaTimes className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {/* Order Status & Actions */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                     <div>
//                       <h3 className="font-semibold text-gray-700 mb-1">Order Status</h3>
//                       <div className="flex items-center gap-2">
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)} flex items-center gap-1`}>
//                           {getStatusIcon(selectedOrder.status)}
//                           {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
//                         </span>
//                         {selectedOrder.deliveryDate && (
//                           <span className="text-sm text-gray-600">
//                             Delivered on: {formatDate(selectedOrder.deliveryDate)}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex gap-2">
//                       {selectedOrder.status === 'pending' && !isAdminOrPharmacy() && (
//                         <button
//                           onClick={() => handleCancelOrder(selectedOrder._id)}
//                           disabled={cancellingOrder === selectedOrder._id}
//                           className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           {cancellingOrder === selectedOrder._id ? 'Cancelling...' : 'Cancel Order'}
//                         </button>
//                       )}
//                       {isAdminOrPharmacy() && selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'failed' && (
//                         <select
//                           value={selectedOrder.status}
//                           onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)}
//                           disabled={updatingStatus === selectedOrder._id}
//                           className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium"
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="processing">Processing</option>
//                           <option value="delivered">Delivered</option>
//                           <option value="failed">Failed</option>
//                         </select>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order & Patient Info */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h3 className="font-semibold text-gray-700 mb-3">Order Information</h3>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Order Number:</span>
//                         <span className="font-medium">{selectedOrder.orderNumber}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Order Date:</span>
//                         <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Payment Method:</span>
//                         <span className="font-medium capitalize">
//                           {selectedOrder.paymentMethod.replace('_', ' ')}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Total Amount:</span>
//                         <span className="font-bold text-[var(--primary-color)]">Rs. {selectedOrder.total.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h3 className="font-semibold text-gray-700 mb-3">Patient Information</h3>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Name:</span>
//                         <span className="font-medium">{selectedOrder.patientInfo.name}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Email:</span>
//                         <span className="font-medium">{selectedOrder.patientInfo.email}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Phone:</span>
//                         <span className="font-medium">{selectedOrder.patientInfo.phone}</span>
//                       </div>
//                       <div className="flex justify-between items-start">
//                         <span className="text-gray-600">Address:</span>
//                         <span className="font-medium text-right max-w-[200px]">{selectedOrder.patientInfo.address}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div>
//                   <h3 className="font-semibold text-gray-700 mb-4">Order Items ({selectedOrder.cart.length})</h3>
//                   <div className="space-y-4">
//                     {selectedOrder.cart.map((item, index) => (
//                       <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex-1 mb-3 sm:mb-0">
//                           <div className="flex items-start">
//                             <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
//                               <img
//                                 src={item.image || 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'}
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   e.target.onerror = null;
//                                   e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                                 }}
//                               />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
//                               {item.medicineId?.description && (
//                                 <p className="text-sm text-gray-600 mb-2 line-clamp-2">
//                                   {item.medicineId.description}
//                                 </p>
//                               )}
//                               <div className="flex flex-wrap gap-4">
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Qty:</span> {item.quantity}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Pharmacy:</span> {item.pharmacyName}
//                                 </p>
//                                 {item.pharmacyId?.address && (
//                                   <p className="text-sm text-gray-600">
//                                     <span className="font-medium">Location:</span> {item.pharmacyId.address}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-right ml-4">
//                           <p className="font-medium">Rs. {item.price.toFixed(2)} each</p>
//                           <p className="font-semibold text-[var(--primary-color)]">
//                             Rs. {(item.price * item.quantity).toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="bg-gray-50 p-6 rounded-lg">
//                   <h3 className="font-semibold text-gray-700 mb-4">Order Summary</h3>
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Subtotal:</span>
//                       <span>Rs. {selectedOrder.total.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Delivery Charge:</span>
//                       <span className="text-green-600">Free</span>
//                     </div>
//                     <div className="border-t pt-3 mt-3">
//                       <div className="flex justify-between text-lg font-bold">
//                         <span>Total:</span>
//                         <span className="text-[var(--primary-color)]">Rs. {selectedOrder.total.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Prescription */}
//                 {selectedOrder.patientInfo.prescriptionFile && (
//                   <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                     <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                       <FaFilePdf className="text-red-500" />
//                       Prescription File
//                     </h3>
//                     <p className="text-gray-600">
//                       {selectedOrder.patientInfo.prescriptionFile.name} • 
//                       {(selectedOrder.patientInfo.prescriptionFile.size / 1024).toFixed(1)} KB
//                     </p>
//                     {selectedOrder.patientInfo.prescriptionFile.url && (
//                       <a
//                         href={selectedOrder.patientInfo.prescriptionFile.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-block mt-2 text-[var(--primary-color)] hover:underline"
//                       >
//                         View/Download Prescription
//                       </a>
//                     )}
//                   </div>
//                 )}

//                 {/* Notes */}
//                 {selectedOrder.notes && (
//                   <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//                     <h3 className="font-semibold text-gray-700 mb-2">Order Notes</h3>
//                     <p className="text-gray-600">{selectedOrder.notes}</p>
//                   </div>
//                 )}

//                 {/* Close Button */}
//                 <div className="pt-4">
//                   <button
//                     onClick={() => setShowOrderDetails(false)}
//                     className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;