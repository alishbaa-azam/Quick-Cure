import React, { useState } from 'react';
import {
  Package, Truck, Clock, CheckCircle,
  XCircle, AlertCircle, Filter, Search,
  Download, Eye, Printer, MoreVertical,
  Plus, RefreshCw, ChevronDown, User,
  MapPin, Phone, DollarSign, Calendar,
  FileText, ShoppingBag, Tag, Percent,
  ArrowRight, Edit, Trash2, Shield
} from 'lucide-react';

const OrdersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const orders = [
    {
      id: 'ORD-001',
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '(555) 123-4567'
      },
      products: [
        { name: 'Paracetamol', quantity: 2, price: 5.99 },
        { name: 'Vitamin C', quantity: 1, price: 9.99 }
      ],
      total: 21.97,
      date: '2024-01-15',
      deliveryDate: '2024-01-16',
      status: 'processing',
      payment: 'credit_card',
      paymentStatus: 'paid',
      address: '123 Main St, New York, NY 10001',
      notes: 'Customer requested morning delivery'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        phone: '(555) 987-6543'
      },
      products: [
        { name: 'Amoxicillin', quantity: 1, price: 12.50 }
      ],
      total: 12.50,
      date: '2024-01-15',
      deliveryDate: '2024-01-17',
      status: 'pending',
      payment: 'insurance',
      paymentStatus: 'pending',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      notes: 'Requires prescription verification'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Robert Brown',
        email: 'robert@example.com',
        phone: '(555) 456-7890'
      },
      products: [
        { name: 'Cetirizine', quantity: 3, price: 6.25 },
        { name: 'Eye Drops', quantity: 1, price: 8.50 }
      ],
      total: 27.25,
      date: '2024-01-14',
      deliveryDate: '2024-01-15',
      status: 'delivered',
      payment: 'cash',
      paymentStatus: 'paid',
      address: '789 Pine St, Queens, NY 11355',
      notes: 'Left at front desk'
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Sarah Davis',
        email: 'sarah@example.com',
        phone: '(555) 321-6547'
      },
      products: [
        { name: 'Omeprazole', quantity: 1, price: 15.99 },
        { name: 'Antacid', quantity: 2, price: 4.75 }
      ],
      total: 25.49,
      date: '2024-01-14',
      deliveryDate: '2024-01-16',
      status: 'shipped',
      payment: 'credit_card',
      paymentStatus: 'paid',
      address: '321 Elm St, Bronx, NY 10451',
      notes: 'Fragile items'
    },
    {
      id: 'ORD-005',
      customer: {
        name: 'Michael Lee',
        email: 'michael@example.com',
        phone: '(555) 654-1234'
      },
      products: [
        { name: 'Aspirin', quantity: 2, price: 8.75 },
        { name: 'Bandages', quantity: 1, price: 3.99 }
      ],
      total: 21.49,
      date: '2024-01-13',
      deliveryDate: '2024-01-14',
      status: 'cancelled',
      payment: 'insurance',
      paymentStatus: 'refunded',
      address: '654 Maple Dr, Staten Island, NY 10301',
      notes: 'Customer cancelled order'
    },
    {
      id: 'ORD-006',
      customer: {
        name: 'Jennifer Taylor',
        email: 'jennifer@example.com',
        phone: '(555) 789-0123'
      },
      products: [
        { name: 'Ibuprofen', quantity: 3, price: 7.50 },
        { name: 'Thermometer', quantity: 1, price: 12.99 }
      ],
      total: 35.49,
      date: '2024-01-13',
      deliveryDate: '2024-01-15',
      status: 'delivered',
      payment: 'credit_card',
      paymentStatus: 'paid',
      address: '987 Cedar Ln, Manhattan, NY 10016',
      notes: 'Signature required'
    },
    {
      id: 'ORD-007',
      customer: {
        name: 'David Wilson',
        email: 'david@example.com',
        phone: '(555) 234-5678'
      },
      products: [
        { name: 'Loratadine', quantity: 2, price: 8.25 },
        { name: 'Nasal Spray', quantity: 1, price: 11.50 }
      ],
      total: 28.00,
      date: '2024-01-12',
      deliveryDate: '2024-01-13',
      status: 'returned',
      payment: 'cash',
      paymentStatus: 'refunded',
      address: '147 Birch St, Brooklyn, NY 11215',
      notes: 'Product damaged during delivery'
    },
    {
      id: 'ORD-008',
      customer: {
        name: 'Lisa Anderson',
        email: 'lisa@example.com',
        phone: '(555) 876-5432'
      },
      products: [
        { name: 'Multivitamin', quantity: 1, price: 14.99 },
        { name: 'Omega-3', quantity: 2, price: 19.99 }
      ],
      total: 54.97,
      date: '2024-01-12',
      deliveryDate: '2024-01-14',
      status: 'processing',
      payment: 'insurance',
      paymentStatus: 'pending',
      address: '258 Walnut Ave, Queens, NY 11354',
      notes: 'Customer will pick up'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled' || o.status === 'returned').length }
  ];

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-[#5c878f]/10 text-[#5c878f]';
      case 'processing': return 'bg-[#2c6774]/10 text-[#2c6774]';
      case 'shipped': return 'bg-[#174047]/10 text-[#174047]';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      case 'returned': return AlertCircle;
      default: return Clock;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'text-[#2c6774]';
      case 'pending': return 'text-[#5c878f]';
      case 'refunded': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, you would update via API
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const calculateStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    
    return { totalOrders, totalRevenue, pendingOrders, deliveredOrders };
  };

  const stats = calculateStats();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
            <Plus size={18} />
            New Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 rounded-2xl p-6 border border-[#2c6774]/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#2c6774] font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
            </div>
            <div className="p-3 rounded-full bg-[#2c6774]/10">
              <ShoppingBag className="text-[#2c6774]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#5c878f]/10 to-[#9fbfc5]/20 rounded-2xl p-6 border border-[#5c878f]/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#5c878f] font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-full bg-[#5c878f]/10">
              <DollarSign className="text-[#5c878f]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#174047]/10 to-[#2c6774]/10 rounded-2xl p-6 border border-[#174047]/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#174047] font-medium">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.pendingOrders}</p>
            </div>
            <div className="p-3 rounded-full bg-[#174047]/10">
              <Clock className="text-[#174047]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#c0d3dc]/20 to-[#9fbfc5]/10 rounded-2xl p-6 border border-[#c0d3dc]/30 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#174047] font-medium">Delivered</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.deliveredOrders}</p>
            </div>
            <div className="p-3 rounded-full bg-[#174047]/10">
              <CheckCircle className="text-[#174047]" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white'
                  : 'bg-[#c0d3dc]/20 text-[#174047] hover:bg-[#c0d3dc]/30'
              }`}
            >
              <span>{filter.label}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
            />
          </div>
          <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
            <Filter size={18} />
            More Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium w-12">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(orders.map(o => o.id));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Order ID</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Products</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Order Date</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Delivery Date</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleOrderSelection(order.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-[#2c6774]">{order.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          {order.products.map((product, idx) => (
                            <div key={idx} className="text-sm">
                              {product.quantity} × {product.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-800">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-gray-600">{order.date}</td>
                      <td className="py-4 px-4 text-gray-600">{order.deliveryDate}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <StatusIcon size={16} />
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                            className="p-2 hover:bg-[#2c6774]/10 rounded-lg transition-colors"
                            title="Process Order"
                          >
                            <Package size={18} className="text-[#2c6774]" />
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                            className="p-2 hover:bg-[#5c878f]/10 rounded-lg transition-colors"
                            title="Mark as Shipped"
                          >
                            <Truck size={18} className="text-[#5c878f]" />
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                            title="Mark as Delivered"
                          >
                            <CheckCircle size={18} className="text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="px-6 py-4 bg-[#c0d3dc]/20 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[#174047]">
                {selectedOrders.length} orders selected
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30">
                  <option>Update Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button className="px-4 py-2 bg-[#5c878f] text-white rounded-xl hover:opacity-90 transition-colors">
                  Apply
                </button>
                <button 
                  onClick={() => setSelectedOrders([])}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-[#c0d3dc]/20 text-[#174047] rounded-xl hover:bg-[#c0d3dc]/30 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:opacity-90 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal Trigger */}
      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-gradient-to-r from-[#5c878f] to-[#2c6774] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
          View Order Analytics
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;



























//--------Pretty colors
// import React, { useState } from 'react';
// import {
//   Package, Truck, Clock, CheckCircle,
//   XCircle, AlertCircle, Filter, Search,
//   Download, Eye, Printer, MoreVertical,
//   Plus, RefreshCw, ChevronDown, User,
//   MapPin, Phone, DollarSign, Calendar,
//   FileText, ShoppingBag, Tag, Percent,
//   ArrowRight, Edit, Trash2, Shield
// } from 'lucide-react';

// const OrdersPage = () => {
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [selectedOrders, setSelectedOrders] = useState([]);

//   const orders = [
//     {
//       id: 'ORD-001',
//       customer: {
//         name: 'John Smith',
//         email: 'john@example.com',
//         phone: '(555) 123-4567'
//       },
//       products: [
//         { name: 'Paracetamol', quantity: 2, price: 5.99 },
//         { name: 'Vitamin C', quantity: 1, price: 9.99 }
//       ],
//       total: 21.97,
//       date: '2024-01-15',
//       deliveryDate: '2024-01-16',
//       status: 'processing',
//       payment: 'credit_card',
//       paymentStatus: 'paid',
//       address: '123 Main St, New York, NY 10001',
//       notes: 'Customer requested morning delivery'
//     },
//     {
//       id: 'ORD-002',
//       customer: {
//         name: 'Emma Wilson',
//         email: 'emma@example.com',
//         phone: '(555) 987-6543'
//       },
//       products: [
//         { name: 'Amoxicillin', quantity: 1, price: 12.50 }
//       ],
//       total: 12.50,
//       date: '2024-01-15',
//       deliveryDate: '2024-01-17',
//       status: 'pending',
//       payment: 'insurance',
//       paymentStatus: 'pending',
//       address: '456 Oak Ave, Brooklyn, NY 11201',
//       notes: 'Requires prescription verification'
//     },
//     {
//       id: 'ORD-003',
//       customer: {
//         name: 'Robert Brown',
//         email: 'robert@example.com',
//         phone: '(555) 456-7890'
//       },
//       products: [
//         { name: 'Cetirizine', quantity: 3, price: 6.25 },
//         { name: 'Eye Drops', quantity: 1, price: 8.50 }
//       ],
//       total: 27.25,
//       date: '2024-01-14',
//       deliveryDate: '2024-01-15',
//       status: 'delivered',
//       payment: 'cash',
//       paymentStatus: 'paid',
//       address: '789 Pine St, Queens, NY 11355',
//       notes: 'Left at front desk'
//     },
//     {
//       id: 'ORD-004',
//       customer: {
//         name: 'Sarah Davis',
//         email: 'sarah@example.com',
//         phone: '(555) 321-6547'
//       },
//       products: [
//         { name: 'Omeprazole', quantity: 1, price: 15.99 },
//         { name: 'Antacid', quantity: 2, price: 4.75 }
//       ],
//       total: 25.49,
//       date: '2024-01-14',
//       deliveryDate: '2024-01-16',
//       status: 'shipped',
//       payment: 'credit_card',
//       paymentStatus: 'paid',
//       address: '321 Elm St, Bronx, NY 10451',
//       notes: 'Fragile items'
//     },
//     {
//       id: 'ORD-005',
//       customer: {
//         name: 'Michael Lee',
//         email: 'michael@example.com',
//         phone: '(555) 654-1234'
//       },
//       products: [
//         { name: 'Aspirin', quantity: 2, price: 8.75 },
//         { name: 'Bandages', quantity: 1, price: 3.99 }
//       ],
//       total: 21.49,
//       date: '2024-01-13',
//       deliveryDate: '2024-01-14',
//       status: 'cancelled',
//       payment: 'insurance',
//       paymentStatus: 'refunded',
//       address: '654 Maple Dr, Staten Island, NY 10301',
//       notes: 'Customer cancelled order'
//     },
//     {
//       id: 'ORD-006',
//       customer: {
//         name: 'Jennifer Taylor',
//         email: 'jennifer@example.com',
//         phone: '(555) 789-0123'
//       },
//       products: [
//         { name: 'Ibuprofen', quantity: 3, price: 7.50 },
//         { name: 'Thermometer', quantity: 1, price: 12.99 }
//       ],
//       total: 35.49,
//       date: '2024-01-13',
//       deliveryDate: '2024-01-15',
//       status: 'delivered',
//       payment: 'credit_card',
//       paymentStatus: 'paid',
//       address: '987 Cedar Ln, Manhattan, NY 10016',
//       notes: 'Signature required'
//     },
//     {
//       id: 'ORD-007',
//       customer: {
//         name: 'David Wilson',
//         email: 'david@example.com',
//         phone: '(555) 234-5678'
//       },
//       products: [
//         { name: 'Loratadine', quantity: 2, price: 8.25 },
//         { name: 'Nasal Spray', quantity: 1, price: 11.50 }
//       ],
//       total: 28.00,
//       date: '2024-01-12',
//       deliveryDate: '2024-01-13',
//       status: 'returned',
//       payment: 'cash',
//       paymentStatus: 'refunded',
//       address: '147 Birch St, Brooklyn, NY 11215',
//       notes: 'Product damaged during delivery'
//     },
//     {
//       id: 'ORD-008',
//       customer: {
//         name: 'Lisa Anderson',
//         email: 'lisa@example.com',
//         phone: '(555) 876-5432'
//       },
//       products: [
//         { name: 'Multivitamin', quantity: 1, price: 14.99 },
//         { name: 'Omega-3', quantity: 2, price: 19.99 }
//       ],
//       total: 54.97,
//       date: '2024-01-12',
//       deliveryDate: '2024-01-14',
//       status: 'processing',
//       payment: 'insurance',
//       paymentStatus: 'pending',
//       address: '258 Walnut Ave, Queens, NY 11354',
//       notes: 'Customer will pick up'
//     }
//   ];

//   const filters = [
//     { id: 'all', label: 'All Orders', count: orders.length },
//     { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
//     { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
//     { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
//     { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
//     { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled' || o.status === 'returned').length }
//   ];

//   const filteredOrders = activeFilter === 'all' 
//     ? orders 
//     : orders.filter(order => order.status === activeFilter);

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'pending': return 'bg-amber-100 text-amber-800';
//       case 'processing': return 'bg-blue-100 text-blue-800';
//       case 'shipped': return 'bg-purple-100 text-purple-800';
//       case 'delivered': return 'bg-emerald-100 text-emerald-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       case 'returned': return 'bg-rose-100 text-rose-800';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

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

//   const getPaymentStatusColor = (status) => {
//     switch(status) {
//       case 'paid': return 'text-emerald-600';
//       case 'pending': return 'text-amber-600';
//       case 'refunded': return 'text-red-600';
//       default: return 'text-gray-600';
//     }
//   };

//   const toggleOrderSelection = (orderId) => {
//     setSelectedOrders(prev =>
//       prev.includes(orderId)
//         ? prev.filter(id => id !== orderId)
//         : [...prev, orderId]
//     );
//   };

//   const updateOrderStatus = (orderId, newStatus) => {
//     alert(`Order ${orderId} status updated to ${newStatus}`);
//   };

//   const calculateStats = () => {
//     const totalOrders = orders.length;
//     const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
//     const pendingOrders = orders.filter(o => o.status === 'pending').length;
//     const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    
//     return { totalOrders, totalRevenue, pendingOrders, deliveredOrders };
//   };

//   const stats = calculateStats();

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1>
//           <p className="text-gray-600">Manage and track customer orders</p>
//         </div>
//         <div className="flex gap-3 mt-4 md:mt-0">
//           <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
//             <Download size={18} />
//             Export
//           </button>
//           <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
//             <Plus size={18} />
//             New Order
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-emerald-600 font-medium">Total Orders</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
//             </div>
//             <div className="p-3 rounded-full bg-emerald-500/10">
//               <ShoppingBag className="text-emerald-600" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-teal-50 to-cyan-100/50 rounded-2xl p-6 border border-teal-100 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-teal-600 font-medium">Total Revenue</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">${stats.totalRevenue.toFixed(2)}</p>
//             </div>
//             <div className="p-3 rounded-full bg-teal-500/10">
//               <DollarSign className="text-teal-600" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-2xl p-6 border border-purple-100 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-purple-600 font-medium">Pending Orders</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.pendingOrders}</p>
//             </div>
//             <div className="p-3 rounded-full bg-purple-500/10">
//               <Clock className="text-purple-600" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-pink-50 to-rose-100/50 rounded-2xl p-6 border border-pink-100 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-rose-600 font-medium">Delivered</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.deliveredOrders}</p>
//             </div>
//             <div className="p-3 rounded-full bg-rose-500/10">
//               <CheckCircle className="text-rose-600" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <div className="flex flex-wrap gap-2">
//           {filters.map((filter) => (
//             <button
//               key={filter.id}
//               onClick={() => setActiveFilter(filter.id)}
//               className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
//                 activeFilter === filter.id
//                   ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               <span>{filter.label}</span>
//               <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
//                 {filter.count}
//               </span>
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-2 mt-4 md:mt-0">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search orders..."
//               className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
//             />
//           </div>
//           <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
//             <Filter size={18} />
//             More Filters
//           </button>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
//         <div className="p-6">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium w-12">
//                     <input
//                       type="checkbox"
//                       className="rounded border-gray-300"
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setSelectedOrders(orders.map(o => o.id));
//                         } else {
//                           setSelectedOrders([]);
//                         }
//                       }}
//                     />
//                   </th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Order ID</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Products</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Order Date</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Delivery Date</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((order) => {
//                   const StatusIcon = getStatusIcon(order.status);
//                   return (
//                     <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                       <td className="py-4 px-4">
//                         <input
//                           type="checkbox"
//                           checked={selectedOrders.includes(order.id)}
//                           onChange={() => toggleOrderSelection(order.id)}
//                           className="rounded border-gray-300"
//                         />
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className="font-medium text-emerald-600">{order.id}</span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div>
//                           <div className="font-medium">{order.customer.name}</div>
//                           <div className="text-sm text-gray-500">{order.customer.email}</div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex flex-col gap-1">
//                           {order.products.map((product, idx) => (
//                             <div key={idx} className="text-sm">
//                               {product.quantity} × {product.name}
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 font-bold text-gray-800">
//                         ${order.total.toFixed(2)}
//                       </td>
//                       <td className="py-4 px-4 text-gray-600">{order.date}</td>
//                       <td className="py-4 px-4 text-gray-600">{order.deliveryDate}</td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-2">
//                           <StatusIcon size={16} />
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
//                             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => updateOrderStatus(order.id, 'processing')}
//                             className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
//                             title="Process Order"
//                           >
//                             <Package size={18} className="text-emerald-600" />
//                           </button>
//                           <button
//                             onClick={() => updateOrderStatus(order.id, 'shipped')}
//                             className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
//                             title="Mark as Shipped"
//                           >
//                             <Truck size={18} className="text-blue-600" />
//                           </button>
//                           <button
//                             onClick={() => updateOrderStatus(order.id, 'delivered')}
//                             className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
//                             title="Mark as Delivered"
//                           >
//                             <CheckCircle size={18} className="text-emerald-600" />
//                           </button>
//                           <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                             <MoreVertical size={18} className="text-gray-600" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Bulk Actions */}
//         {selectedOrders.length > 0 && (
//           <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-700">
//                 {selectedOrders.length} orders selected
//               </div>
//               <div className="flex gap-2">
//                 <select className="px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30">
//                   <option>Update Status</option>
//                   <option value="processing">Processing</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//                 <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:opacity-90 transition-colors">
//                   Apply
//                 </button>
//                 <button 
//                   onClick={() => setSelectedOrders([])}
//                   className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
//                 >
//                   Clear Selection
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Table Footer */}
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             <div className="text-sm text-gray-600">
//               Showing {filteredOrders.length} of {orders.length} orders
//             </div>
//             <div className="flex gap-2 mt-4 md:mt-0">
//               <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
//                 Previous
//               </button>
//               <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-colors">
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Order Details Modal Trigger */}
//       <div className="mt-8 text-center">
//         <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
//           View Order Analytics
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;