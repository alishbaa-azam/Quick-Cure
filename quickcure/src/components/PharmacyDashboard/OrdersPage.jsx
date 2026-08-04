import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Clock, CheckCircle,
  XCircle, AlertCircle, Search,
  Eye, RefreshCw, User,
  MapPin, Phone, DollarSign,
  ShoppingBag, Grid, List,
  ChevronLeft, ChevronRight, Pill
} from 'lucide-react';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { message } from 'antd';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('table');
  const [error, setError] = useState(null);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const storedPharmacyId = localStorage.getItem('pharmacyId');
    if (storedPharmacyId) {
      setPharmacyId(storedPharmacyId);
    } else {
      message.error('Pharmacy ID not found. Please login again.');
    }
  }, []);

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
        
        const transformedOrders = ordersData.map(order => {
          const customerName = order.customer?.name || 
                              order.patientInfo?.name || 
                              order.patient?.name || 
                              'Customer';
          
          const customerPhone = order.customer?.phone || 
                               order.patientInfo?.phone || 
                               order.patient?.phone || 
                               'N/A';
          
          const deliveryAddress = order.deliveryAddress || 
                                 order.customer?.address || 
                                 order.patientInfo?.address || 
                                 order.patient?.address || 
                                 'N/A';
          
          const products = (order.products || order.cart || order.medicines || order.items || []).map(item => {
            const isTablet = item.form?.toLowerCase().includes('tablet') || 
                            item.form?.toLowerCase().includes('capsule') ||
                            item.isTablet;
            
            return {
              id: item._id || item.id || item.medicineId,
              name: item.name || 'Medicine',
              quantity: item.quantity || 1,
              price: item.price || 0,
              total: item.total || item.itemTotal || (item.price * item.quantity) || 0,
              form: item.form || 'tablet',
              isTablet: isTablet,
              tabletQuantity: item.tabletQuantity || (item.quantity * (item.tabletsPerUnit || 10)),
              tabletsPerUnit: item.tabletsPerUnit || 10
            };
          });
          
          const orderTotal = order.total || order.totalAmount || order.finalAmount || 
                            products.reduce((sum, p) => sum + (p.total || 0), 0);
          
          const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
          
          const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();
          const formattedDate = orderDate.toLocaleDateString('en-PK', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          const dayName = orderDate.toLocaleDateString('en-PK', { weekday: 'short' });
          
          let mappedStatus = (order.status || 'pending').toLowerCase();
          if (mappedStatus === 'shipped') {
            mappedStatus = 'delivered';
          }
          
          return {
            id: order._id || order.id,
            _id: order._id || order.id,
            orderNumber: order.orderNumber || order.orderId || `ORD-${(order._id || '').slice(-6)}`,
            customer: {
              name: customerName,
              email: order.customer?.email || order.patientInfo?.email || '',
              phone: customerPhone,
              address: deliveryAddress
            },
            deliveryAddress: deliveryAddress,
            products: products,
            totalItems: order.totalItems || totalItems,
            total: orderTotal,
            subtotal: order.subtotal || orderTotal,
            deliveryFee: order.deliveryFee || order.deliveryCharge || 0,
            date: formattedDate,
            day: dayName,
            fullDate: `${dayName}, ${formattedDate}`,
            status: mappedStatus,
            paymentMethod: order.paymentMethod || 'cod',
            paymentStatus: order.paymentStatus || 'pending',
            notes: order.notes || '',
            createdAt: order.createdAt
          };
        });
        
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

  const handleConfirmAction = (orderId, newStatus) => {
    setConfirmAction({ orderId, newStatus });
    setShowConfirmModal(true);
  };

  const executeStatusUpdate = async () => {
    if (!confirmAction) return;
    
    try {
      setUpdatingStatus(true);
      
      if (!pharmacyId) {
        message.error('Pharmacy ID not found');
        return;
      }
      
      // Update order status (backend handles stock restoration for cancellations)
      const response = await pharmacyAPI.updateOrderStatus(pharmacyId, confirmAction.orderId, confirmAction.newStatus);
      
      if (response.data?.success) {
        message.success(`Order status updated to ${confirmAction.newStatus}`);
        fetchOrders();
      } else {
        message.error(response.data?.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error('Failed to update order status');
    } finally {
      setUpdatingStatus(false);
      setShowConfirmModal(false);
      setConfirmAction(null);
    }
  };

  // Available actions - only delivered and cancelled
  const getAvailableActions = (currentStatus) => {
    switch(currentStatus) {
      case 'pending':
        return [
          { label: 'Mark as Delivered', value: 'delivered', icon: CheckCircle, color: 'green' },
          { label: 'Cancel Order', value: 'cancelled', icon: XCircle, color: 'red' }
        ];
      case 'processing':
        return [
          { label: 'Mark as Delivered', value: 'delivered', icon: CheckCircle, color: 'green' },
          { label: 'Cancel Order', value: 'cancelled', icon: XCircle, color: 'red' }
        ];
      case 'delivered':
        return [];
      case 'cancelled':
        return [];
      default:
        return [];
    }
  };

  // Status filter options - removed processing
  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      (order.orderNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.deliveryAddress || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const formatItemDisplay = (product) => {
    if (product.isTablet) {
      return `${product.quantity} strip${product.quantity > 1 ? 's' : ''}`;
    }
    return `${product.quantity} unit${product.quantity > 1 ? 's' : ''}`;
  };

  // Stats - removed processingOrders
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + (order.total || 0), 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length,
    cancelledOrders: orders.filter(o => o.status === 'cancelled').length
  };

  const formatCurrency = (amount) => {
    const num = Number(amount);
    return isNaN(num) ? 'Rs 0' : `Rs ${num.toLocaleString()}`;
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
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
              <List size={18} />
            </button>
            <button onClick={() => setViewMode('cards')} className={`p-2 rounded-md ${viewMode === 'cards' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
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
          <p className="text-xs text-gray-400 mt-2">From delivered orders</p>
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
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Cancelled</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.cancelledOrders}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50"><XCircle className="text-red-600" size={22} /></div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by order ID, customer name, or address..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-sm" 
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 min-w-[150px]"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
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
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Matching Orders</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <>
          {/* Table View */}
          <div className={`${viewMode === 'table' ? '' : 'hidden'}`}>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Order ID</th>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Delivery Address</th>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Items</th>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Date & Day</th>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {currentOrders.map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      const actions = getAvailableActions(order.status);
                      
                      return (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="py-3 px-3">
                            <span className="font-medium text-[#2c6774] text-sm">{order.orderNumber}</span>
                          </td>
                          <td className="py-3 px-3">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{order.customer.name}</p>
                              <p className="text-xs text-gray-500">{order.customer.phone}</p>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <p className="text-sm text-gray-600 max-w-[200px] truncate" title={order.deliveryAddress}>
                              {order.deliveryAddress}
                            </p>
                          </td>
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              {order.products.slice(0, 2).map((p, idx) => (
                                <div key={idx}>
                                  <p className="text-sm text-gray-800">{p.name}</p>
                                  <p className="text-xs text-gray-500 flex items-center gap-1">
                                    {p.isTablet ? <Pill size={10} /> : <Package size={10} />}
                                    {formatItemDisplay(p)}
                                  </p>
                                </div>
                              ))}
                              {order.products.length > 2 && (
                                <p className="text-xs text-gray-500">+{order.products.length - 2} more items</p>
                              )}
                              <p className="text-xs font-medium text-gray-600 mt-1">
                                Total: {order.totalItems} {order.totalItems > 1 ? 'items' : 'item'}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <p className="text-sm text-gray-800">{order.date}</p>
                            <p className="text-xs text-gray-500">{order.day}</p>
                          </td>
                          <td className="py-3 px-3">
                            <div>
                              <p className="font-semibold text-sm">{formatCurrency(order.total)}</p>
                              {order.deliveryFee > 0 && (
                                <p className="text-xs text-gray-500">Delivery: {formatCurrency(order.deliveryFee)}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <StatusIcon size={14} className="text-gray-500" />
                              <span className={`px-2 py-1 text-xs rounded-full border capitalize ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex gap-1">
                              <button onClick={() => handleViewOrder(order)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                                <Eye size={18} />
                              </button>
                              {actions.map(action => (
                                <button 
                                  key={action.value} 
                                  onClick={() => handleConfirmAction(order.id, action.value)} 
                                  disabled={updatingStatus}
                                  className={`p-2 rounded-lg transition-colors ${action.color === 'red' ? 'text-red-600 hover:bg-red-50' : 
                                    action.color === 'green' ? 'text-green-600 hover:bg-green-50' : 
                                    'text-blue-600 hover:bg-blue-50'}`} 
                                  title={action.label}
                                >
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

          {/* Card View */}
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
                      <p className="text-xs text-gray-500">{order.customer.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon size={14} className="text-gray-500" />
                      <span className={`px-2 py-1 text-xs rounded-full border capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-gray-500 flex items-start gap-1">
                      <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                      <span className="truncate">{order.deliveryAddress}</span>
                    </p>
                    <p className="text-xs text-gray-500">{order.fullDate}</p>
                  </div>
                  <div className="space-y-2 mb-3">
                    {order.products.slice(0, 2).map((p, idx) => (
                      <div key={idx} className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {p.isTablet ? <Pill size={10} /> : <Package size={10} />}
                            {formatItemDisplay(p)}
                          </p>
                        </div>
                        <p className="text-sm font-medium">{formatCurrency(p.total)}</p>
                      </div>
                    ))}
                    {order.products.length > 2 && (
                      <p className="text-xs text-gray-500">+{order.products.length - 2} more items</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="font-bold">{formatCurrency(order.total)}</p>
                      <p className="text-xs text-gray-500">{order.totalItems} {order.totalItems > 1 ? 'items' : 'item'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleViewOrder(order)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye size={18} />
                      </button>
                      {actions.map(action => (
                        <button 
                          key={action.value} 
                          onClick={() => handleConfirmAction(order.id, action.value)} 
                          disabled={updatingStatus}
                          className={`p-2 rounded-lg ${action.color === 'red' ? 'text-red-600 hover:bg-red-50' : 
                            action.color === 'green' ? 'text-green-600 hover:bg-green-50' : 
                            'text-blue-600 hover:bg-blue-50'}`}
                        >
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
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}
              </p>
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

      {/* Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="text-center mb-6">
                {confirmAction.newStatus === 'cancelled' ? (
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                ) : confirmAction.newStatus === 'delivered' ? (
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {confirmAction.newStatus === 'cancelled' ? 'Cancel Order' : 
                   confirmAction.newStatus === 'delivered' ? 'Mark as Delivered' : 
                   'Update Order Status'}
                </h3>
                <p className="text-gray-600">
                  {confirmAction.newStatus === 'cancelled' 
                    ? 'Are you sure you want to cancel this order? Stock will be restored for all items.' 
                    : confirmAction.newStatus === 'delivered'
                    ? 'Are you sure you want to mark this order as delivered?'
                    : `Are you sure you want to update this order status to ${confirmAction.newStatus}?`}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setConfirmAction(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  No, Keep It
                </button>
                <button
                  onClick={executeStatusUpdate}
                  disabled={updatingStatus}
                  className={`flex-1 px-4 py-3 text-white font-medium rounded-lg transition-colors ${
                    confirmAction.newStatus === 'cancelled' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : confirmAction.newStatus === 'delivered'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-[#2c6774] hover:bg-[#174047]'
                  }`}
                >
                  {updatingStatus ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw size={16} className="animate-spin" />
                      Updating...
                    </span>
                  ) : (
                    `Yes, ${confirmAction.newStatus === 'cancelled' ? 'Cancel It' : 
                           confirmAction.newStatus === 'delivered' ? 'Mark Delivered' : 
                           'Update Status'}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-3xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 sm:p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Order #{selectedOrder.orderNumber}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedOrder.fullDate}</p>
              </div>
              <button onClick={() => setShowOrderDetails(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
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

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-2"><User size={16} /><span className="text-sm">{selectedOrder.customer.name}</span></div>
                    <div className="flex items-center gap-2"><Phone size={16} /><span className="text-sm">{selectedOrder.customer.phone}</span></div>
                    <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5" /><span className="text-sm">{selectedOrder.deliveryAddress}</span></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      {selectedOrder.products.map((product, idx) => (
                        <div key={idx} className="flex justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              {product.isTablet ? <Pill size={10} /> : <Package size={10} />}
                              {formatItemDisplay(product)} × {formatCurrency(product.price)} per {product.isTablet ? 'strip' : 'unit'}
                            </p>
                          </div>
                          <p className="font-medium text-sm">{formatCurrency(product.total)}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(selectedOrder.subtotal)}</span>
                      </div>
                      {selectedOrder.deliveryFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Delivery Fee</span>
                          <span>{formatCurrency(selectedOrder.deliveryFee)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-base pt-2 border-t">
                        <span>Total ({selectedOrder.totalItems} {selectedOrder.totalItems > 1 ? 'items' : 'item'})</span>
                        <span className="text-[#2c6774]">{formatCurrency(selectedOrder.total)}</span>
                      </div>
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

              <div className="mt-6 flex flex-wrap gap-2 justify-end">
                <button onClick={() => setShowOrderDetails(false)} className="px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100">
                  Close
                </button>
                {getAvailableActions(selectedOrder.status).map(action => (
                  <button 
                    key={action.value} 
                    onClick={() => {
                      handleConfirmAction(selectedOrder.id, action.value);
                      setShowOrderDetails(false);
                    }} 
                    disabled={updatingStatus}
                    className={`px-4 py-2.5 text-white font-medium rounded-lg transition-colors ${
                      action.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                      action.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
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
