// import React, { useState, useEffect } from 'react';
// import { 
//   Pill, Search, RefreshCw, Star, MapPin, ShoppingCart, 
//   DollarSign, Activity, Clock, Trash2, Phone, Mail, User,
//   ChevronDown, ChevronUp, Eye, CheckCircle, XCircle
// } from 'lucide-react';
// import { message, Modal, Tag, Tabs, Table } from 'antd';

// const API_BASE = 'http://localhost:5000/api';
// const IMG_BASE = 'http://localhost:5000';
// const getToken = () => localStorage.getItem('token');

// export default function AdminPharmaciesPage() {
//   const [pharmacies, setPharmacies] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [detailModal, setDetailModal] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const token = getToken();
//       const headers = { 'Authorization': `Bearer ${token}` };

//       const [pharmRes, orderRes] = await Promise.allSettled([
//         fetch(`${API_BASE}/pharmacies`, { headers }),
//         fetch(`${API_BASE}/medicine-orders`, { headers }),
//       ]);

//       if (pharmRes.status === 'fulfilled') {
//         const data = await pharmRes.value.json();
//         // API returns array directly, or wrapped in pharmacies/data
//         const pharmList = Array.isArray(data) ? data : (data.pharmacies || data.data || []);
//         setPharmacies(pharmList);
//       }
//       if (orderRes.status === 'fulfilled') {
//         const data = await orderRes.value.json();
//         setOrders(data.orders || data.data || data || []);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getPharmacyOrders = (pharmacyId) => {
//     if (!orders || !Array.isArray(orders)) return [];
//     return orders.filter(o => {
//       const pharmId = o.pharmacyId || o.pharmacy;
//       const pharmObjId = typeof pharmId === 'object' ? pharmId?._id : pharmId;
//       return pharmObjId === pharmacyId || pharmObjId?.toString() === pharmacyId?.toString();
//     });
//   };

//   const getPharmacySummary = (pharmacyId) => {
//     const pharmOrders = getPharmacyOrders(pharmacyId);
//     return {
//       total: pharmOrders.length,
//       pending: pharmOrders.filter(o => o.status === 'pending').length,
//       delivered: pharmOrders.filter(o => o.status === 'delivered').length,
//       cancelled: pharmOrders.filter(o => o.status === 'cancelled').length,
//       revenue: pharmOrders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + (o.totalAmount || o.finalAmount || 0), 0),
//     };
//   };

//   const getMonthlyRevenue = (pharmOrders) => {
//     const monthlyData = {};
//     pharmOrders.filter(o => o.status === 'delivered').forEach(o => {
//       const date = new Date(o.createdAt || o.updatedAt);
//       const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
//       const amount = o.totalAmount || o.finalAmount || 0;
//       if (!monthlyData[monthYear]) monthlyData[monthYear] = { revenue: 0, count: 0 };
//       monthlyData[monthYear].revenue += amount;
//       monthlyData[monthYear].count += 1;
//     });
//     return Object.entries(monthlyData).map(([month, data]) => ({
//       month, revenue: data.revenue, orders: data.count
//     })).reverse();
//   };

//   const getImageUrl = (img) => {
//     if (!img) return null;
//     if (img.startsWith('http')) return img;
//     if (img.startsWith('/uploads')) return `${IMG_BASE}${img}`;
//     if (img.startsWith('/')) return `${IMG_BASE}${img}`;
//     return `${IMG_BASE}/uploads/${img}`;
//   };

//   const handleDeletePharmacy = (pharmacy) => {
//     Modal.confirm({
//       title: 'Delete Pharmacy',
//       content: `Are you sure you want to delete "${pharmacy.name}"? This action cannot be undone.`,
//       okText: 'Delete',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         try {
//           const token = getToken();
//           const res = await fetch(`${API_BASE}/pharmacies/${pharmacy._id}`, {
//             method: 'DELETE',
//             headers: { 'Authorization': `Bearer ${token}` }
//           });
//           if (res.ok) {
//             message.success(`Pharmacy "${pharmacy.name}" deleted successfully`);
//             setDetailModal(false);
//             setSelectedPharmacy(null);
//             fetchAllData();
//           } else {
//             const data = await res.json();
//             message.error(data.message || 'Failed to delete pharmacy');
//           }
//         } catch (err) {
//           message.error('Failed to delete pharmacy');
//         }
//       }
//     });
//   };

//   const filtered = pharmacies.filter(p =>
//     p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     p.ownerName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const orderColumns = [
//     { title: 'Order ID', dataIndex: 'orderId', key: 'orderId', render: (id) => id?.slice(-8) || 'N/A' },
//     { title: 'Customer', dataIndex: 'patient', key: 'customer', render: (p) => p?.name || 'Customer' },
//     { title: 'Date', dataIndex: 'createdAt', key: 'date', render: (d) => d ? new Date(d).toLocaleDateString() : 'N/A' },
//     { title: 'Amount', dataIndex: 'totalAmount', key: 'amount', render: (a) => `Rs ${(a || 0).toLocaleString()}` },
//     { title: 'Status', dataIndex: 'status', key: 'status',
//       render: (s) => {
//         const color = s === 'delivered' ? 'green' : s === 'pending' ? 'orange' : s === 'cancelled' ? 'red' : 'blue';
//         return <Tag color={color}>{s?.toUpperCase() || 'N/A'}</Tag>;
//       }
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Pharmacies Management</h1>
//           <p className="text-gray-600 mt-1">
//             Total {pharmacies.length} registered pharmacies · {Array.isArray(orders) ? orders.length : 0} total orders
//           </p>
//         </div>
//         <button onClick={fetchAllData} className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2">
//           <RefreshCw size={16} /> Refresh
//         </button>
//       </div>

//       <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input type="text" placeholder="Search pharmacies by name, city or owner..." value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] outline-none" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filtered.map((pharmacy) => {
//           const stats = getPharmacySummary(pharmacy._id);
//           return (
//             <div key={pharmacy._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
//               <div className="p-5">
//                 <div className="flex items-start gap-4">
//                   {/* Pharmacy Image/Logo */}
//                   <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
//                     {getImageUrl(pharmacy.image) || getImageUrl(pharmacy.logo) ? (
//                       <img 
//                         src={getImageUrl(pharmacy.image) || getImageUrl(pharmacy.logo)} 
//                         alt={pharmacy.name}
//                         className="w-full h-full object-cover"
//                         onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = pharmacy.name?.charAt(0).toUpperCase() || 'P'; }}
//                       />
//                     ) : (
//                       <span className="text-white text-xl font-bold">{pharmacy.name?.charAt(0) || 'P'}</span>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-900 truncate">{pharmacy.name}</h3>
//                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                       <MapPin size={12} /> {pharmacy.city || 'N/A'}
//                     </p>
//                     {pharmacy.ownerName && (
//                       <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
//                         <User size={11} /> {pharmacy.ownerName}
//                       </p>
//                     )}
//                   </div>
//                   <span className={`px-2 py-0.5 text-xs rounded-full font-medium shrink-0 ${
//                     pharmacy.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                   }`}>
//                     {pharmacy.open ? 'Open' : 'Closed'}
//                   </span>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <div className="grid grid-cols-3 gap-3 text-center">
//                     <div className="bg-blue-50 rounded-lg p-2">
//                       <p className="text-lg font-bold text-blue-700">{stats.total}</p>
//                       <p className="text-xs text-blue-600">Orders</p>
//                     </div>
//                     <div className="bg-green-50 rounded-lg p-2">
//                       <p className="text-lg font-bold text-green-700">{stats.delivered}</p>
//                       <p className="text-xs text-green-600">Delivered</p>
//                     </div>
//                     <div className="bg-amber-50 rounded-lg p-2">
//                       <p className="text-lg font-bold text-amber-700">{stats.pending}</p>
//                       <p className="text-xs text-amber-600">Pending</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-3 flex items-center justify-between text-sm">
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <DollarSign size={14} /> Rs {stats.revenue.toLocaleString()}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Star size={14} className="text-amber-400 fill-amber-400" /> {pharmacy.rating || 4.0}
//                   </span>
//                 </div>

//                 {pharmacy.phone && (
//                   <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
//                     <Phone size={11} /> {pharmacy.phone}
//                   </div>
//                 )}

//                 <div className="mt-3 flex gap-2">
//                   <button onClick={() => { setSelectedPharmacy(pharmacy); setDetailModal(true); setActiveTab('overview'); }}
//                     className="flex-1 px-3 py-2 text-sm bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors flex items-center justify-center gap-1">
//                     <Eye size={14} /> View Details
//                   </button>
//                   <button onClick={(e) => { e.stopPropagation(); handleDeletePharmacy(pharmacy); }}
//                     className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1">
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         {filtered.length === 0 && !loading && (
//           <div className="col-span-full text-center py-12 text-gray-500">
//             <Pill className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//             <p className="text-lg font-medium">No pharmacies found</p>
//             <p className="text-sm text-gray-400">Try a different search or create a pharmacy from Users page</p>
//           </div>
//         )}
//       </div>

//       {/* Detail Modal with Tabs */}
//       <Modal title={null} open={detailModal}
//         onCancel={() => { setDetailModal(false); setSelectedPharmacy(null); }}
//         footer={null} width={800}>
//         {selectedPharmacy && (() => {
//           const pharmOrders = getPharmacyOrders(selectedPharmacy._id);
//           const stats = getPharmacySummary(selectedPharmacy._id);
//           const monthlyRevenue = getMonthlyRevenue(pharmOrders);

//           const tabItems = [
//             {
//               key: 'overview',
//               label: <span className="flex items-center gap-2"><Activity size={16} /> Overview</span>,
//               children: (
//                 <div className="space-y-6">
//                   {/* Header */}
//                   <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
//                     <div className="flex items-start gap-5">
//                       <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white text-3xl font-bold shadow-md shrink-0">
//                         {getImageUrl(selectedPharmacy.image) || getImageUrl(selectedPharmacy.logo) ? (
//                           <img src={getImageUrl(selectedPharmacy.image) || getImageUrl(selectedPharmacy.logo)} alt={selectedPharmacy.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = selectedPharmacy.name?.charAt(0).toUpperCase() || 'P'; }} />
//                         ) : (
//                           selectedPharmacy.name?.charAt(0).toUpperCase() || 'P'
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h3 className="text-2xl font-bold text-gray-900">{selectedPharmacy.name}</h3>
//                             <p className="text-gray-500 mt-1">
//                               <MapPin size={14} className="inline" /> {selectedPharmacy.city || 'N/A'}
//                               {selectedPharmacy.address && <span> · {selectedPharmacy.address}</span>}
//                             </p>
//                           </div>
//                           <span className={`px-3 py-1 rounded-xl text-sm font-semibold ${
//                             selectedPharmacy.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                           }`}>
//                             {selectedPharmacy.open ? '● Open' : '● Closed'}
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
//                           <div>
//                             <p className="text-[10px] text-gray-400 uppercase font-semibold">Pharmacy ID</p>
//                             <p className="text-sm font-mono text-gray-800">{selectedPharmacy._id?.slice(-8)}</p>
//                           </div>
//                           <div>
//                             <p className="text-[10px] text-gray-400 uppercase font-semibold">Owner</p>
//                             <p className="text-sm font-medium text-gray-800">{selectedPharmacy.ownerName || 'N/A'}</p>
//                           </div>
//                           <div>
//                             <p className="text-[10px] text-gray-400 uppercase font-semibold">Phone</p>
//                             <p className="text-sm text-gray-700">{selectedPharmacy.phone || 'N/A'}</p>
//                           </div>
//                           <div>
//                             <p className="text-[10px] text-gray-400 uppercase font-semibold">Email</p>
//                             <p className="text-sm text-gray-700 truncate">{selectedPharmacy.email || 'N/A'}</p>
//                           </div>
//                         </div>
//                         <div className="flex gap-4 mt-2 text-sm text-gray-500">
//                           <span>Delivery: {selectedPharmacy.deliveryTime || 'N/A'}</span>
//                           <span>Medicines: {selectedPharmacy.medicines?.length || 0}</span>
//                           <span>Rating: <Star size={12} className="inline text-amber-400 fill-amber-400" /> {selectedPharmacy.rating || 4.0}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stats Cards */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
//                       <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
//                       <p className="text-xs text-gray-500">Total Orders</p>
//                     </div>
//                     <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
//                       <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
//                       <p className="text-xs text-gray-500">Delivered</p>
//                     </div>
//                     <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
//                       <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
//                       <p className="text-xs text-gray-500">Pending</p>
//                     </div>
//                     <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
//                       <p className="text-2xl font-bold text-purple-700">Rs {stats.revenue.toLocaleString()}</p>
//                       <p className="text-xs text-gray-500">Revenue</p>
//                     </div>
//                   </div>

//                   {/* Monthly Revenue */}
//                   {monthlyRevenue.length > 0 && (
//                     <div className="bg-white rounded-xl border border-gray-100 p-4">
//                       <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//                         <DollarSign size={16} className="text-[#2c6774]" /> Monthly Revenue
//                       </h4>
//                       <table className="w-full text-sm">
//                         <thead className="bg-gray-50">
//                           <tr><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">Revenue</th><th className="px-4 py-2 text-right">Orders</th><th className="px-4 py-2 text-right">Avg</th></tr>
//                         </thead>
//                         <tbody>
//                           {monthlyRevenue.map((m, i) => (
//                             <tr key={i} className="border-t hover:bg-gray-50">
//                               <td className="px-4 py-2 font-medium">{m.month}</td>
//                               <td className="px-4 py-2 text-right font-semibold">Rs {m.revenue.toLocaleString()}</td>
//                               <td className="px-4 py-2 text-right">{m.orders}</td>
//                               <td className="px-4 py-2 text-right">Rs {Math.round(m.revenue / m.orders).toLocaleString()}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}

//                   {/* Additional Info */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="bg-gray-50 p-3 rounded-xl">
//                       <p className="text-[10px] text-gray-400 uppercase font-semibold">License</p>
//                       <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPharmacy.licenseNumber || 'N/A'}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-xl">
//                       <p className="text-[10px] text-gray-400 uppercase font-semibold">Type</p>
//                       <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPharmacy.pharmacyType || 'N/A'}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-xl">
//                       <p className="text-[10px] text-gray-400 uppercase font-semibold">Year Est.</p>
//                       <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPharmacy.yearEstablished || 'N/A'}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-xl">
//                       <p className="text-[10px] text-gray-400 uppercase font-semibold">Created</p>
//                       <p className="text-sm font-medium text-gray-800 mt-0.5">
//                         {selectedPharmacy.createdAt ? new Date(selectedPharmacy.createdAt).toLocaleDateString() : 'N/A'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ),
//             },
//             {
//               key: 'orders',
//               label: <span className="flex items-center gap-2"><ShoppingCart size={16} /> Orders ({pharmOrders.length})</span>,
//               children: (
//                 <div>
//                   <div className="mb-3 flex gap-2 flex-wrap">
//                     <Tag color="green">Delivered: {stats.delivered}</Tag>
//                     <Tag color="orange">Pending: {stats.pending}</Tag>
//                     <Tag color="red">Cancelled: {stats.cancelled}</Tag>
//                     <Tag color="blue">Total: {stats.total}</Tag>
//                   </div>
//                   {pharmOrders.length === 0 ? (
//                     <p className="text-center py-8 text-gray-400">No orders found for this pharmacy</p>
//                   ) : (
//                     <Table columns={orderColumns} dataSource={pharmOrders} rowKey="_id" pagination={{ pageSize: 10 }} />
//                   )}
//                 </div>
//               ),
//             },
//             {
//               key: 'revenue',
//               label: <span className="flex items-center gap-2"><DollarSign size={16} /> Revenue</span>,
//               children: (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
//                       <p className="text-2xl font-bold text-green-600">Rs {stats.revenue.toLocaleString()}</p>
//                       <p className="text-xs text-gray-500">Total Revenue</p>
//                     </div>
//                     <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
//                       <p className="text-2xl font-bold text-blue-600">Rs {stats.delivered > 0 ? Math.round(stats.revenue / stats.delivered).toLocaleString() : 0}</p>
//                       <p className="text-xs text-gray-500">Avg Per Order</p>
//                     </div>
//                     <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
//                       <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
//                       <p className="text-xs text-gray-500">Pending Orders</p>
//                     </div>
//                   </div>
//                   {monthlyRevenue.length > 0 && (
//                     <div className="bg-white rounded-xl border border-gray-100 p-4">
//                       <h4 className="text-sm font-bold text-gray-800 mb-3">Monthly Breakdown</h4>
//                       <table className="w-full text-sm">
//                         <thead className="bg-gray-50">
//                           <tr><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">Revenue</th><th className="px-4 py-2 text-right">Orders</th><th className="px-4 py-2 text-right">Avg</th><th className="px-4 py-2 text-right">%</th></tr>
//                         </thead>
//                         <tbody>
//                           {monthlyRevenue.map((m, i) => (
//                             <tr key={i} className="border-t hover:bg-gray-50">
//                               <td className="px-4 py-2 font-medium">{m.month}</td>
//                               <td className="px-4 py-2 text-right font-semibold text-green-600">Rs {m.revenue.toLocaleString()}</td>
//                               <td className="px-4 py-2 text-right">{m.orders}</td>
//                               <td className="px-4 py-2 text-right">Rs {Math.round(m.revenue / m.orders).toLocaleString()}</td>
//                               <td className="px-4 py-2 text-right">{stats.revenue > 0 ? ((m.revenue / stats.revenue) * 100).toFixed(1) : 0}%</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               ),
//             },
//           ];

//           return (
//             <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" type="card" />
//           );
//         })()}
//       </Modal>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { 
  Pill, Search, RefreshCw, Star, MapPin, ShoppingCart, 
  DollarSign, Activity, Clock, Trash2, Phone, Mail, User,
  ChevronDown, ChevronUp, Eye, CheckCircle, XCircle
} from 'lucide-react';
import { message, Modal, Tag, Tabs, Table } from 'antd';

const getToken = () => localStorage.getItem('token');

export default function AdminPharmaciesPage() {
  const [pharmacies, setPharmacies] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const headers = { 'Authorization': `Bearer ${token}` };

      const [pharmRes, orderRes] = await Promise.allSettled([
        fetch(`http://localhost:5000/api/pharmacies`, { headers }),
        fetch(`http://localhost:5000/api/medicine-orders`, { headers }),
      ]);

      if (pharmRes.status === 'fulfilled') {
        const data = await pharmRes.value.json();
        console.log('Pharmacies API response:', data);
        // Backend returns { success: true, count: X, data: [...] }
        const pharmList = Array.isArray(data) ? data : (data.data || []);
        setPharmacies(pharmList);
        console.log('Pharmacies loaded:', pharmList);
      }
      if (orderRes.status === 'fulfilled') {
        const data = await orderRes.value.json();
        setOrders(data.orders || data.data || data || []);
      }
    } catch (err) {
      console.error('Error:', err);
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getPharmacyOrders = (pharmacyId) => {
    if (!orders || !Array.isArray(orders)) return [];
    return orders.filter(o => {
      const pharmId = o.pharmacyId || o.pharmacy;
      const pharmObjId = typeof pharmId === 'object' ? pharmId?._id : pharmId;
      return pharmObjId === pharmacyId || pharmObjId?.toString() === pharmacyId?.toString();
    });
  };

  const getPharmacySummary = (pharmacyId) => {
    const pharmOrders = getPharmacyOrders(pharmacyId);
    return {
      total: pharmOrders.length,
      pending: pharmOrders.filter(o => o.status === 'pending').length,
      delivered: pharmOrders.filter(o => o.status === 'delivered').length,
      cancelled: pharmOrders.filter(o => o.status === 'cancelled').length,
      revenue: pharmOrders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + (o.totalAmount || o.finalAmount || 0), 0),
    };
  };

  const getMonthlyRevenue = (pharmOrders) => {
    const monthlyData = {};
    pharmOrders.filter(o => o.status === 'delivered').forEach(o => {
      const date = new Date(o.createdAt || o.updatedAt);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      const amount = o.totalAmount || o.finalAmount || 0;
      if (!monthlyData[monthYear]) monthlyData[monthYear] = { revenue: 0, count: 0 };
      monthlyData[monthYear].revenue += amount;
      monthlyData[monthYear].count += 1;
    });
    return Object.entries(monthlyData).map(([month, data]) => ({
      month, revenue: data.revenue, orders: data.count
    })).reverse();
  };

  // FIXED: Get image URL from backend
  const getImageUrl = (img) => {
    if (!img) return null;
    
    console.log('Getting image URL for:', img);
    
    // If it's already a full URL (http://localhost:5000/uploads/... or https://...)
    if (img.startsWith('http://') || img.startsWith('https://')) {
      // Extract the path from the URL and reconstruct with current backend URL
      // This handles cases where the stored URL has localhost but we're accessing from a different host
      const url = new URL(img);
      const path = url.pathname; // e.g., /uploads/pharmacies/xyz.jpg
      return `http://localhost:5000${path}`;
    }
    // If it starts with /uploads
    if (img.startsWith('/uploads/')) {
      return `http://localhost:5000${img}`;
    }
    // If it starts with uploads/
    if (img.startsWith('uploads/')) {
      return `http://localhost:5000/${img}`;
    }
    // If it starts with /
    if (img.startsWith('/')) {
      return `http://localhost:5000${img}`;
    }
    // Default: assume it's just a filename in uploads folder
    return `http://localhost:5000/uploads/${img}`;
  };

  // Handle image error
  const handleImageError = (e, pharmacyId) => {
    console.log('Image failed to load for pharmacy:', pharmacyId);
    setImageErrors(prev => ({ ...prev, [pharmacyId]: true }));
    e.target.style.display = 'none';
  };

  // Get fallback initials
  const getInitials = (name) => {
    if (!name) return 'P';
    return name.charAt(0).toUpperCase();
  };

  const handleDeletePharmacy = (pharmacy) => {
    Modal.confirm({
      title: 'Delete Pharmacy',
      content: `Are you sure you want to delete "${pharmacy.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = getToken();
          const res = await fetch(`http://localhost:5000/api/pharmacies/${pharmacy._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            message.success(`Pharmacy "${pharmacy.name}" deleted successfully`);
            setDetailModal(false);
            setSelectedPharmacy(null);
            fetchAllData();
          } else {
            const data = await res.json();
            message.error(data.message || 'Failed to delete pharmacy');
          }
        } catch (err) {
          message.error('Failed to delete pharmacy');
        }
      }
    });
  };

  const filtered = pharmacies.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.ownerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const orderColumns = [
    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId', render: (id) => id?.slice(-8) || 'N/A' },
    { title: 'Customer', dataIndex: 'patient', key: 'customer', render: (p) => p?.name || 'Customer' },
    { title: 'Date', dataIndex: 'createdAt', key: 'date', render: (d) => d ? new Date(d).toLocaleDateString() : 'N/A' },
    { title: 'Amount', dataIndex: 'totalAmount', key: 'amount', render: (a) => `Rs ${(a || 0).toLocaleString()}` },
    { title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => {
        const color = s === 'delivered' ? 'green' : s === 'pending' ? 'orange' : s === 'cancelled' ? 'red' : 'blue';
        return <Tag color={color}>{s?.toUpperCase() || 'N/A'}</Tag>;
      }
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pharmacies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Pharmacies Management</h1>
          <p className="text-gray-600 mt-1">
            Total {pharmacies.length} registered pharmacies · {Array.isArray(orders) ? orders.length : 0} total orders
          </p>
        </div>
        <button onClick={fetchAllData} className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search pharmacies by name, city or owner..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pharmacy) => {
          const stats = getPharmacySummary(pharmacy._id);
          // Get image URL from backend
          const imageUrl = getImageUrl(pharmacy.image || pharmacy.logo);
          const hasError = imageErrors[pharmacy._id];
          const initials = getInitials(pharmacy.name);
          
          return (
            <div key={pharmacy._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Pharmacy Image/Logo - Fetch from backend */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                    {imageUrl && !hasError ? (
                      <img 
                        src={imageUrl} 
                        alt={pharmacy.name}
                        className="w-full h-full object-cover"
                        onError={(e) => handleImageError(e, pharmacy._id)}
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">{initials}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{pharmacy.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {pharmacy.city || 'N/A'}
                    </p>
                    {pharmacy.ownerName && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <User size={11} /> {pharmacy.ownerName}
                      </p>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium shrink-0 ${
                    pharmacy.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {pharmacy.open ? 'Open' : 'Closed'}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-lg font-bold text-blue-700">{stats.total}</p>
                      <p className="text-xs text-blue-600">Orders</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <p className="text-lg font-bold text-green-700">{stats.delivered}</p>
                      <p className="text-xs text-green-600">Delivered</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2">
                      <p className="text-lg font-bold text-amber-700">{stats.pending}</p>
                      <p className="text-xs text-amber-600">Pending</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <DollarSign size={14} /> Rs {stats.revenue.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" /> {pharmacy.rating || 4.0}
                  </span>
                </div>

                {pharmacy.phone && (
                  <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                    <Phone size={11} /> {pharmacy.phone}
                  </div>
                )}

                <div className="mt-3 flex gap-2">
                  <button onClick={() => { setSelectedPharmacy(pharmacy); setDetailModal(true); setActiveTab('overview'); }}
                    className="flex-1 px-3 py-2 text-sm bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors flex items-center justify-center gap-1">
                    <Eye size={14} /> View Details
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeletePharmacy(pharmacy); }}
                    className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Pill className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">No pharmacies found</p>
            <p className="text-sm text-gray-400">Try a different search or create a pharmacy from Users page</p>
          </div>
        )}
      </div>

      {/* Detail Modal with Tabs */}
      <Modal title={null} open={detailModal}
        onCancel={() => { setDetailModal(false); setSelectedPharmacy(null); }}
        footer={null} width={800}>
        {selectedPharmacy && (() => {
          const pharmOrders = getPharmacyOrders(selectedPharmacy._id);
          const stats = getPharmacySummary(selectedPharmacy._id);
          const monthlyRevenue = getMonthlyRevenue(pharmOrders);
          const imageUrl = getImageUrl(selectedPharmacy.image || selectedPharmacy.logo);
          const hasError = imageErrors[selectedPharmacy._id];
          const initials = getInitials(selectedPharmacy.name);

          const tabItems = [
            {
              key: 'overview',
              label: <span className="flex items-center gap-2"><Activity size={16} /> Overview</span>,
              children: (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
                    <div className="flex items-start gap-5">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white text-3xl font-bold shadow-md shrink-0">
                        {imageUrl && !hasError ? (
                          <img src={imageUrl} alt={selectedPharmacy.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.log('Modal image failed to load for:', selectedPharmacy.name);
                              setImageErrors(prev => ({ ...prev, [selectedPharmacy._id]: true }));
                              e.target.style.display = 'none';
                            }} />
                        ) : (
                          <span className="text-white text-3xl font-bold">{initials}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{selectedPharmacy.name}</h3>
                            <p className="text-gray-500 mt-1">
                              <MapPin size={14} className="inline" /> {selectedPharmacy.city || 'N/A'}
                              {selectedPharmacy.address && <span> · {selectedPharmacy.address}</span>}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-xl text-sm font-semibold ${
                            selectedPharmacy.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {selectedPharmacy.open ? '● Open' : '● Closed'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Pharmacy ID</p>
                            <p className="text-sm font-mono text-gray-800">{selectedPharmacy._id?.slice(-8)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Owner</p>
                            <p className="text-sm font-medium text-gray-800">{selectedPharmacy.ownerName || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Phone</p>
                            <p className="text-sm text-gray-700">{selectedPharmacy.phone || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Email</p>
                            <p className="text-sm text-gray-700 truncate">{selectedPharmacy.email || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span>Delivery: {selectedPharmacy.deliveryTime || 'N/A'}</span>
                          <span>Medicines: {selectedPharmacy.medicines?.length || 0}</span>
                          <span>Rating: <Star size={12} className="inline text-amber-400 fill-amber-400" /> {selectedPharmacy.rating || 4.0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                      <p className="text-xs text-gray-500">Total Orders</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
                      <p className="text-xs text-gray-500">Delivered</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <p className="text-2xl font-bold text-purple-700">Rs {stats.revenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>

                  {/* Monthly Revenue */}
                  {monthlyRevenue.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                      <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <DollarSign size={16} className="text-[#2c6774]" /> Monthly Revenue
                      </h4>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">Revenue</th><th className="px-4 py-2 text-right">Orders</th><th className="px-4 py-2 text-right">Avg</th></tr>
                        </thead>
                        <tbody>
                          {monthlyRevenue.map((m, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium">{m.month}</td>
                              <td className="px-4 py-2 text-right font-semibold">Rs {m.revenue.toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{m.orders}</td>
                              <td className="px-4 py-2 text-right">Rs {Math.round(m.revenue / m.orders).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">License</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPharmacy.licenseNumber || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Type</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPharmacy.pharmacyType || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Year Est.</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPharmacy.yearEstablished || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Created</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">
                        {selectedPharmacy.createdAt ? new Date(selectedPharmacy.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: 'orders',
              label: <span className="flex items-center gap-2"><ShoppingCart size={16} /> Orders ({pharmOrders.length})</span>,
              children: (
                <div>
                  <div className="mb-3 flex gap-2 flex-wrap">
                    <Tag color="green">Delivered: {stats.delivered}</Tag>
                    <Tag color="orange">Pending: {stats.pending}</Tag>
                    <Tag color="red">Cancelled: {stats.cancelled}</Tag>
                    <Tag color="blue">Total: {stats.total}</Tag>
                  </div>
                  {pharmOrders.length === 0 ? (
                    <p className="text-center py-8 text-gray-400">No orders found for this pharmacy</p>
                  ) : (
                    <Table columns={orderColumns} dataSource={pharmOrders} rowKey="_id" pagination={{ pageSize: 10 }} />
                  )}
                </div>
              ),
            },
            {
              key: 'revenue',
              label: <span className="flex items-center gap-2"><DollarSign size={16} /> Revenue</span>,
              children: (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
                      <p className="text-2xl font-bold text-green-600">Rs {stats.revenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Total Revenue</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
                      <p className="text-2xl font-bold text-blue-600">Rs {stats.delivered > 0 ? Math.round(stats.revenue / stats.delivered).toLocaleString() : 0}</p>
                      <p className="text-xs text-gray-500">Avg Per Order</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
                      <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                      <p className="text-xs text-gray-500">Pending Orders</p>
                    </div>
                  </div>
                  {monthlyRevenue.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                      <h4 className="text-sm font-bold text-gray-800 mb-3">Monthly Breakdown</h4>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">Revenue</th><th className="px-4 py-2 text-right">Orders</th><th className="px-4 py-2 text-right">Avg</th><th className="px-4 py-2 text-right">%</th></tr>
                        </thead>
                        <tbody>
                          {monthlyRevenue.map((m, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium">{m.month}</td>
                              <td className="px-4 py-2 text-right font-semibold text-green-600">Rs {m.revenue.toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{m.orders}</td>
                              <td className="px-4 py-2 text-right">Rs {Math.round(m.revenue / m.orders).toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{stats.revenue > 0 ? ((m.revenue / stats.revenue) * 100).toFixed(1) : 0}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ),
            },
          ];

          return (
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" type="card" />
          );
        })()}
      </Modal>
    </div>
  );
}