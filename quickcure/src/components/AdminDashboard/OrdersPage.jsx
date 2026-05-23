import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, RefreshCw, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { message, Modal, Tooltip } from 'antd';
import { getAllOrders } from './adminApi';

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-indigo-100 text-indigo-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const paymentColors = {
  pending: 'bg-amber-100 text-amber-700',
  paid: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllOrders();
      if (response.success) {
        setOrders(response.orders || []);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      message.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => `Rs ${(amount || 0).toLocaleString()}`;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patient?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Medicine Orders</h1>
          <p className="text-gray-600 mt-1">Total {orders.length} orders in the system</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by order ID, customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/10 outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize ${
                  statusFilter === status 
                    ? 'bg-[#2c6774] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-500 text-sm">Loading orders...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.orderId}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{order.patient?.name}</p>
                      <p className="text-xs text-gray-500">{order.patient?.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{order.items?.length || 0} items</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize ${statusColors[order.status] || 'bg-gray-100'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize ${paymentColors[order.paymentStatus] || 'bg-gray-100'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Tooltip title="View Details">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setDetailModal(true);
                          }}
                          className="p-1.5 text-[#2c6774] hover:bg-[#2c6774]/10 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <Modal
        title={`Order Details - ${selectedOrder?.orderId || ''}`}
        open={detailModal}
        onCancel={() => { setDetailModal(false); setSelectedOrder(null); }}
        footer={null}
        width={600}
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-3">Customer Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <p className="font-medium">{selectedOrder.patient?.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p className="font-medium">{selectedOrder.patient?.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Phone:</span>
                  <p className="font-medium">{selectedOrder.patient?.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500">Address:</span>
                  <p className="font-medium">{selectedOrder.patient?.address}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
              <div className="space-y-2">
                {selectedOrder.items?.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × Rs {item.price?.toLocaleString()}</p>
                    </div>
                    <span className="font-semibold text-sm">Rs {item.total?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Charge</span>
                <span>{formatCurrency(selectedOrder.deliveryCharge)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-green-600">-{formatCurrency(selectedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <span className={`ml-2 px-2.5 py-1 text-xs rounded-full font-medium capitalize ${statusColors[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Payment:</span>
                <span className={`ml-2 px-2.5 py-1 text-xs rounded-full font-medium capitalize ${paymentColors[selectedOrder.paymentStatus]}`}>
                  {selectedOrder.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}