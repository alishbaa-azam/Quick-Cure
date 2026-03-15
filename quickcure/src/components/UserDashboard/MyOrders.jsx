import React, { useState, useEffect } from 'react';
import { FaBox, FaCalendarAlt, FaClock, FaRupeeSign, FaEye, FaSpinner, FaPrescriptionBottle } from 'react-icons/fa';
import { getUserOrders, cancelOrder } from '../../api/userApi';

const MyOrders = ({ refreshTrigger }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [refreshTrigger]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getUserOrders();
    
    if (result.success) {
      setOrders(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleCancelOrder = async (orderId) => {
    setCancellingId(orderId);
    
    const result = await cancelOrder(orderId);
    
    if (result.success) {
      await fetchOrders();
    } else {
      setError(result.error);
    }
    
    setCancellingId(null);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString) => {
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders</h3>
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
                key={order._id || order.orderId}
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
                        {order.orderId || order._id?.slice(-8).toUpperCase()}
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
                      {formatDate(order.createdAt || order.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Items</p>
                    <p className="text-sm font-medium mt-1">{order.totalItems || order.medicines?.length || 0} items</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-sm font-medium flex items-center mt-1">
                      <FaRupeeSign className="mr-1 text-xs" style={{ color: 'var(--accent-color)' }} />
                      {order.finalAmount || order.total || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment</p>
                    <p className="text-sm font-medium mt-1">
                      {order.payment?.method?.toUpperCase() || 'COD'}
                    </p>
                  </div>
                </div>

                {/* Medicine List Preview */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Medicines:</p>
                  <div className="flex flex-wrap gap-2">
                    {(order.medicines || []).slice(0, 3).map((medicine, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ backgroundColor: 'var(--bg-light)', color: 'var(--secondary-color)' }}
                      >
                        {medicine.name} x{medicine.quantity}
                      </span>
                    ))}
                    {(order.medicines?.length || 0) > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        +{order.medicines.length - 3} more
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

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="text-sm font-mono font-medium">{selectedOrder.orderId || selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Order Date</p>
                  <p className="text-sm">{formatDate(selectedOrder.createdAt || selectedOrder.date)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="text-sm">{selectedOrder.payment?.method?.toUpperCase() || 'COD'}</p>
                </div>
              </div>

              {/* Patient Info */}
              {selectedOrder.patient && (
                <div>
                  <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Patient Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Name</p>
                      <p className="font-medium">{selectedOrder.patient.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium">{selectedOrder.patient.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Address</p>
                      <p className="font-medium">{selectedOrder.patient.address}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Medicines List */}
              <div>
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Medicines</h4>
                <div className="space-y-3">
                  {(selectedOrder.medicines || []).map((medicine, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={medicine.image || 'https://via.placeholder.com/40'} 
                          alt={medicine.name}
                          className="w-10 h-10 object-contain rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{medicine.name}</p>
                          <p className="text-xs text-gray-500">{medicine.strength} • {medicine.form}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">x{medicine.quantity}</p>
                        <p className="text-sm">Rs {medicine.price * medicine.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>Rs {selectedOrder.totalAmount || selectedOrder.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Charge</span>
                    <span>Rs {selectedOrder.deliveryCharge || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>Rs {selectedOrder.taxAmount || 0}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-lg" style={{ color: 'var(--primary-color)' }}>
                      Rs {selectedOrder.finalAmount || selectedOrder.total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prescription Info */}
              {selectedOrder.prescriptionDetails?.fileUrl && (
                <div className="p-4 rounded-lg bg-blue-50">
                  <p className="text-sm font-medium text-blue-800 mb-2">Prescription Uploaded</p>
                  <a 
                    href={selectedOrder.prescriptionDetails.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Prescription
                  </a>
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