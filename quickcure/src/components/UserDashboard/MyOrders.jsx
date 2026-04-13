// import React, { useState, useEffect } from 'react';
// import { FaBox, FaCalendarAlt, FaClock, FaRupeeSign, FaEye, FaSpinner, FaPrescriptionBottle } from 'react-icons/fa';
// import { getUserOrders, cancelOrder } from '../../api/userApi';

// const MyOrders = ({ refreshTrigger, onStatsUpdate }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cancellingId, setCancellingId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, [refreshTrigger]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError(null);
    
//     const result = await getUserOrders();
    
//     if (result.success) {
//       setOrders(result.data);

//       // Update stats in dashboard and persistence
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       const userKey = user?.id || user?._id || 'guest';
//       localStorage.setItem(`medicineOrders_${userKey}`, JSON.stringify(result.data));
//       if (onStatsUpdate) {
//         onStatsUpdate(result.data.length);
//       }
//     } else {
//       setError(result.error);
//     }
    
//     setLoading(false);
//   };

//   const handleCancelOrder = async (orderId) => {
//     setCancellingId(orderId);
    
//     const result = await cancelOrder(orderId);
    
//     if (result.success) {
//       await fetchOrders();
//     } else {
//       setError(result.error);
//     }
    
//     setCancellingId(null);
//   };

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setShowDetailsModal(true);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString('en-PK', options);
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
//       confirmed: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
//       processing: { color: 'bg-blue-100 text-blue-800', label: 'Processing' },
//       dispatched: { color: 'bg-purple-100 text-purple-800', label: 'Dispatched' },
//       out_for_delivery: { color: 'bg-indigo-100 text-indigo-800', label: 'Out for Delivery' },
//       delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
//       cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
//       pending_prescription: { color: 'bg-orange-100 text-orange-800', label: 'Prescription Required' },
//       pending_review: { color: 'bg-blue-100 text-blue-800', label: 'Under Review' }
//     };

//     const config = statusConfig[status] || statusConfig.pending;
    
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
//         {config.label}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl shadow-sm p-8">
//         <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--secondary-color)' }}>
//           My Orders
//         </h2>
//         <div className="flex justify-center items-center py-12">
//           <FaSpinner className="animate-spin text-3xl" style={{ color: 'var(--primary-color)' }} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-100">
//         <h2 className="text-xl font-semibold" style={{ color: 'var(--secondary-color)' }}>
//           My Orders
//         </h2>
//         <p className="text-sm mt-1" style={{ color: 'var(--accent-color)' }}>
//           Track your medicine orders
//         </p>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mx-6 mt-4 p-4 bg-red-50 rounded-lg">
//           <p className="text-sm text-red-700">{error}</p>
//           <button 
//             onClick={fetchOrders}
//             className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
//           >
//             Try Again
//           </button>
//         </div>
//       )}

//       {/* Orders List */}
//       <div className="p-6">
//         {orders.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//               <FaBox className="text-3xl" style={{ color: 'var(--accent-color)' }} />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders</h3>
//             <p className="text-sm text-gray-500 mb-4">You haven't placed any medicine orders yet</p>
//             <button 
//               className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition"
//               style={{ backgroundColor: 'var(--primary-color)' }}
//               onClick={() => window.location.href = '/pharmacies'}
//             >
//               Order Medicines
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {orders.map((order) => (
//               <div 
//                 key={order._id || order.orderId}
//                 className="border rounded-xl p-5 hover:shadow-md transition-shadow"
//                 style={{ borderColor: 'var(--bg-light)' }}
//               >
//                 {/* Order Header */}
//                 <div className="flex flex-wrap items-center justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
//                       <FaPrescriptionBottle className="text-lg" style={{ color: 'var(--accent-color)' }} />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-700 font-semibold">Order ID</p>
//                       <p className="text-sm font-mono font-medium" style={{ color: 'var(--secondary-color)' }}>
//                         {order.orderId || order._id?.slice(-8).toUpperCase()}
//                       </p>
//                     </div>
//                   </div>
//                   {getStatusBadge(order.status)}
//                 </div>

//                 {/* Order Details */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                   <div>
//                     <p className="text-xs text-gray-700 font-semibold">Order Date</p>
//                     <p className="text-sm font-medium flex items-center mt-1">
//                       <FaCalendarAlt className="mr-1 text-xs" style={{ color: 'var(--accent-color)' }} />
//                       {formatDate(order.createdAt || order.date)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-700 font-semibold">Items</p>
//                     <p className="text-sm font-medium mt-1">{order.totalItems || order.medicines?.length || 0} items</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-700 font-semibold">Total Amount</p>
//                     <p className="text-sm font-medium flex items-center mt-1">
//                       <FaRupeeSign className="mr-1 text-xs" style={{ color: 'var(--accent-color)' }} />
//                       {order.finalAmount || order.total || 0}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-700 font-semibold">Payment</p>
//                     <p className="text-sm font-medium mt-1">
//                       {order.payment?.method?.toUpperCase() || 'COD'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Medicine List Preview */}
//                 <div className="mb-4">
//                   <p className="text-xs text-gray-500 mb-2">Medicines:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {(order.medicines || []).slice(0, 3).map((medicine, idx) => (
//                       <span 
//                         key={idx}
//                         className="px-2 py-1 text-xs rounded-full"
//                         style={{ backgroundColor: 'var(--bg-light)', color: 'var(--secondary-color)' }}
//                       >
//                         {medicine.name} x{medicine.quantity}
//                       </span>
//                     ))}
//                     {(order.medicines?.length || 0) > 3 && (
//                       <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
//                         +{order.medicines.length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end space-x-3 pt-3 border-t" style={{ borderColor: 'var(--bg-light)' }}>
//                   <button 
//                     className="px-4 py-2 text-sm rounded-lg border transition flex items-center"
//                     style={{ 
//                       borderColor: 'var(--primary-color)', 
//                       color: 'var(--primary-color)',
//                       backgroundColor: 'transparent'
//                     }}
//                     onClick={() => handleViewDetails(order)}
//                   >
//                     <FaEye className="mr-2" />
//                     View Details
//                   </button>
//                   {order.status !== 'delivered' && order.status !== 'cancelled' && order.status !== 'failed' && (
//                     <button 
//                       className="px-4 py-2 text-sm rounded-lg text-white transition hover:opacity-90"
//                       style={{ backgroundColor: 'var(--accent-color)' }}
//                       onClick={() => handleCancelOrder(order._id || order.orderId)}
//                       disabled={cancellingId === (order._id || order.orderId)}
//                     >
//                       {cancellingId === (order._id || order.orderId) ? (
//                         <FaSpinner className="animate-spin" />
//                       ) : (
//                         'Cancel Order'
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Order Details Modal */}
//       {showDetailsModal && selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
//               <h3 className="text-lg font-semibold" style={{ color: 'var(--secondary-color)' }}>
//                 Order Details
//               </h3>
//               <button 
//                 onClick={() => setShowDetailsModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full"
//               >
//                 ✕
//               </button>
//             </div>
            
//             <div className="p-6 space-y-6">
//               {/* Order Info */}
//               <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <div>
//                   <p className="text-xs text-gray-500">Order ID</p>
//                   <p className="text-sm font-mono font-medium">{selectedOrder.orderId || selectedOrder._id}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Status</p>
//                   {getStatusBadge(selectedOrder.status)}
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Order Date</p>
//                   <p className="text-sm">{formatDate(selectedOrder.createdAt || selectedOrder.date)}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Payment Method</p>
//                   <p className="text-sm">{selectedOrder.payment?.method?.toUpperCase() || 'COD'}</p>
//                 </div>
//               </div>

//               {/* Patient Info */}
//               {selectedOrder.patient && (
//                 <div>
//                   <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Patient Information</h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <p className="text-gray-500">Name</p>
//                       <p className="font-medium">{selectedOrder.patient.name}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Phone</p>
//                       <p className="font-medium">{selectedOrder.patient.phone}</p>
//                     </div>
//                     <div className="col-span-2">
//                       <p className="text-gray-500">Address</p>
//                       <p className="font-medium">{selectedOrder.patient.address}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Medicines List */}
//               <div>
//                 <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Medicines</h4>
//                 <div className="space-y-3">
//                   {(selectedOrder.medicines || []).map((medicine, idx) => (
//                     <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
//                       <div className="flex items-center space-x-3">
//                         <img 
//                           src={medicine.image || 'https://via.placeholder.com/40'} 
//                           alt={medicine.name}
//                           className="w-10 h-10 object-contain rounded"
//                         />
//                         <div>
//                           <p className="font-medium text-sm">{medicine.name}</p>
//                           <p className="text-xs text-gray-500">{medicine.strength} • {medicine.form}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium">x{medicine.quantity}</p>
//                         <p className="text-sm">Rs {medicine.price * medicine.quantity}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Summary */}
//               <div className="border-t pt-4">
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Subtotal</span>
//                     <span>Rs {selectedOrder.totalAmount || selectedOrder.total}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Delivery Charge</span>
//                     <span>Rs {selectedOrder.deliveryCharge || 0}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Tax</span>
//                     <span>Rs {selectedOrder.taxAmount || 0}</span>
//                   </div>
//                   <div className="flex justify-between font-semibold pt-2 border-t">
//                     <span>Total</span>
//                     <span className="text-lg" style={{ color: 'var(--primary-color)' }}>
//                       Rs {selectedOrder.finalAmount || selectedOrder.total}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Prescription Info */}
//               {selectedOrder.prescriptionDetails?.fileUrl && (
//                 <div className="p-4 rounded-lg bg-blue-50">
//                   <p className="text-sm font-medium text-blue-800 mb-2">Prescription Uploaded</p>
//                   <a 
//                     href={selectedOrder.prescriptionDetails.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-blue-600 hover:underline"
//                   >
//                     View Prescription
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;


import React, { useState, useEffect } from 'react';
import { FaBox, FaCalendarAlt, FaRupeeSign, FaEye, FaSpinner, FaPrescriptionBottle, FaMapMarkerAlt, FaPhone, FaUser, FaEnvelope } from 'react-icons/fa';

const MyOrders = ({ refreshTrigger, onStatsUpdate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchOrders();
  }, [refreshTrigger]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current logged-in user
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?.id || user?._id;
      
      if (!userId) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }
      
      const token = localStorage.getItem('token');
      
      // Fetch orders from API - using your route
      const response = await fetch(`${API_BASE_URL}/medicine-orders?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Handle different response structures
        let ordersData = [];
        if (data.orders) {
          ordersData = data.orders;
        } else if (data.data) {
          ordersData = data.data;
        } else if (Array.isArray(data)) {
          ordersData = data;
        } else {
          ordersData = [];
        }
        
        setOrders(ordersData);
        
        // Update stats
        if (onStatsUpdate) {
          onStatsUpdate(ordersData.length);
        }
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }
    
    setCancellingId(orderId);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/medicine-orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Order cancelled successfully');
        await fetchOrders(); // Refresh orders
      } else {
        setError(data.message || 'Failed to cancel order');
        alert('Failed to cancel order: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      setError('Error connecting to server');
      alert('Failed to cancel order. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-PK', options);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      confirmed: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      processing: { color: 'bg-blue-100 text-blue-800', label: 'Processing' },
      dispatched: { color: 'bg-purple-100 text-purple-800', label: 'Dispatched' },
      out_for_delivery: { color: 'bg-indigo-100 text-indigo-800', label: 'Out for Delivery' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      pending_prescription: { color: 'bg-orange-100 text-orange-800', label: 'Prescription Required' },
      pending_review: { color: 'bg-blue-100 text-blue-800', label: 'Under Review' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--secondary-color)' }}>
          My Orders
        </h2>
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-3xl" style={{ color: 'var(--primary-color)' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--secondary-color)' }}>
          My Orders
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--accent-color)' }}>
          Track your medicine orders
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
          <button 
            onClick={fetchOrders}
            className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Orders List */}
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBox className="text-3xl" style={{ color: 'var(--accent-color)' }} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-sm text-gray-500 mb-4">You haven't placed any medicine orders yet</p>
            <button 
              className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition"
              style={{ backgroundColor: 'var(--primary-color)' }}
              onClick={() => window.location.href = '/pharmacies'}
            >
              Order Medicines
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order._id || order.orderId || order.orderNumber}
                className="border rounded-xl p-5 hover:shadow-md transition-shadow"
                style={{ borderColor: 'var(--bg-light)' }}
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaPrescriptionBottle className="text-lg" style={{ color: 'var(--accent-color)' }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="text-sm font-mono font-medium" style={{ color: 'var(--secondary-color)' }}>
                        {order.orderNumber || order.orderId || order._id?.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Order Date</p>
                    <p className="text-sm font-medium flex items-center mt-1">
                      <FaCalendarAlt className="mr-1 text-xs" style={{ color: 'var(--accent-color)' }} />
                      {formatDate(order.createdAt || order.date || order.timestamp)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Items</p>
                    <p className="text-sm font-medium mt-1">
                      {order.items?.length || order.medicines?.length || order.cart?.length || 0} items
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-sm font-medium flex items-center mt-1">
                      <FaRupeeSign className="mr-1 text-xs" style={{ color: 'var(--accent-color)' }} />
                      Rs.{order.totalAmount || order.finalAmount || order.total || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment</p>
                    <p className="text-sm font-medium mt-1">
                      {order.paymentMethod || order.payment?.method || 'COD'}
                    </p>
                  </div>
                </div>

                {/* Customer Info Preview */}
                {(order.patientInfo || order.patient) && (
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--secondary-color)' }}>
                      Delivery Details:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <FaUser className="w-3 h-3 mr-2" style={{ color: 'var(--accent-color)' }} />
                        <span>{order.patientInfo?.name || order.patient?.name}</span>
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="w-3 h-3 mr-2" style={{ color: 'var(--accent-color)' }} />
                        <span>{order.patientInfo?.phone || order.patient?.phone}</span>
                      </div>
                      <div className="flex items-center col-span-2">
                        <FaMapMarkerAlt className="w-3 h-3 mr-2" style={{ color: 'var(--accent-color)' }} />
                        <span className="truncate">{order.patientInfo?.address || order.patient?.address || order.shippingAddress?.street}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Medicine List Preview */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Medicines:</p>
                  <div className="flex flex-wrap gap-2">
                    {(order.items || order.medicines || order.cart || []).slice(0, 3).map((medicine, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ backgroundColor: 'var(--bg-light)', color: 'var(--secondary-color)' }}
                      >
                        {medicine.name} x{medicine.quantity}
                      </span>
                    ))}
                    {(order.items?.length || order.medicines?.length || order.cart?.length || 0) > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        +{(order.items?.length || order.medicines?.length || order.cart?.length || 0) - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-3 border-t" style={{ borderColor: 'var(--bg-light)' }}>
                  <button 
                    className="px-4 py-2 text-sm rounded-lg border transition flex items-center"
                    style={{ 
                      borderColor: 'var(--primary-color)', 
                      color: 'var(--primary-color)',
                      backgroundColor: 'transparent'
                    }}
                    onClick={() => handleViewDetails(order)}
                  >
                    <FaEye className="mr-2" />
                    View Details
                  </button>
                  {order.status !== 'delivered' && order.status !== 'cancelled' && order.status !== 'failed' && (
                    <button 
                      className="px-4 py-2 text-sm rounded-lg text-white transition hover:opacity-90"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                      onClick={() => handleCancelOrder(order._id || order.orderId)}
                      disabled={cancellingId === (order._id || order.orderId)}
                    >
                      {cancellingId === (order._id || order.orderId) ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        'Cancel Order'
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal - Complete Details */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--secondary-color)' }}>
                Order Details
              </h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="text-sm font-mono font-medium">{selectedOrder.orderNumber || selectedOrder.orderId || selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Order Date</p>
                  <p className="text-sm">{formatDate(selectedOrder.createdAt || selectedOrder.date || selectedOrder.timestamp)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="text-sm">{selectedOrder.paymentMethod || selectedOrder.payment?.method || 'COD'}</p>
                </div>
              </div>

              {/* Customer Information */}
              {(selectedOrder.patientInfo || selectedOrder.patient) && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--secondary-color)' }}>
                    <FaUser className="text-sm" /> Customer Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="text-sm font-medium">{selectedOrder.patientInfo?.name || selectedOrder.patient?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="text-sm font-medium">{selectedOrder.patientInfo?.phone || selectedOrder.patient?.phone}</p>
                    </div>
                    {selectedOrder.patientInfo?.email && (
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium">{selectedOrder.patientInfo.email}</p>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500">Delivery Address</p>
                      <p className="text-sm font-medium">{selectedOrder.patientInfo?.address || selectedOrder.patient?.address || selectedOrder.shippingAddress?.street}</p>
                    </div>
                    {selectedOrder.patientInfo?.notes && (
                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-500">Additional Notes</p>
                        <p className="text-sm">{selectedOrder.patientInfo.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pharmacy Information */}
              {selectedOrder.selectedPharmacy && (
                <div>
                  <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>
                    Pharmacy Information
                  </h4>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">{selectedOrder.selectedPharmacy === 'all' ? 'Multiple Pharmacies' : selectedOrder.selectedPharmacy}</p>
                    {selectedOrder.pharmacyDetails && (
                      <p className="text-sm text-gray-600 mt-1">{selectedOrder.pharmacyDetails}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Medicines List */}
              <div>
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>
                  Medicines Ordered
                </h4>
                <div className="space-y-3">
                  {(selectedOrder.items || selectedOrder.medicines || selectedOrder.cart || []).map((medicine, idx) => (
                    <div key={idx} className="flex justify-between items-start p-3 border rounded-lg">
                      <div className="flex items-start space-x-3 flex-1">
                        <img 
                          src={medicine.image || 'https://via.placeholder.com/50'} 
                          alt={medicine.name}
                          className="w-12 h-12 object-contain rounded bg-gray-50"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/50';
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{medicine.name}</p>
                          {medicine.form && (
                            <p className="text-xs text-gray-500 mt-1">
                              Form: {medicine.form}
                              {medicine.strength && ` • ${medicine.strength}`}
                            </p>
                          )}
                          {medicine.tabletQuantity && (
                            <p className="text-xs text-gray-500">
                              {medicine.tabletQuantity} tablets ({medicine.quantity} unit{medicine.quantity > 1 ? 's' : ''})
                            </p>
                          )}
                          {medicine.pharmacyTag && (
                            <p className="text-xs mt-1" style={{ color: 'var(--accent-color)' }}>
                              Pharmacy: {medicine.pharmacyTag}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-medium">x{medicine.quantity}</p>
                        <p className="text-sm" style={{ color: 'var(--primary-color)' }}>
                          Rs.{(medicine.price || medicine.discountedPrice || 0) * medicine.quantity}
                        </p>
                        {medicine.perTabletPrice && (
                          <p className="text-xs text-gray-500">
                            Rs.{medicine.perTabletPrice}/tab
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>
                  Price Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>Rs.{selectedOrder.subtotal || selectedOrder.totalAmount || selectedOrder.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Charge</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>Rs.{selectedOrder.tax || selectedOrder.taxAmount || 0}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total Amount</span>
                    <span className="text-lg" style={{ color: 'var(--primary-color)' }}>
                      Rs.{selectedOrder.totalAmount || selectedOrder.finalAmount || selectedOrder.total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prescription Info */}
              {selectedOrder.prescriptionUrl && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--secondary-color)' }}>
                    Prescription Uploaded
                  </p>
                  <a 
                    href={selectedOrder.prescriptionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    View Prescription Document
                  </a>
                </div>
              )}

              {/* Order Timeline */}
              {selectedOrder.timeline && selectedOrder.timeline.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>
                    Order Timeline
                  </h4>
                  <div className="space-y-2">
                    {selectedOrder.timeline.map((event, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                        <div className="flex-1">
                          <p className="font-medium">{event.status}</p>
                          <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
                          {event.note && <p className="text-xs text-gray-600">{event.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;