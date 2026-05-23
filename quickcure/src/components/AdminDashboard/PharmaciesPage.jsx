import React, { useState, useEffect } from 'react';
import { Pill, Search, RefreshCw, Star, MapPin, ShoppingCart, DollarSign, Activity, Clock } from 'lucide-react';
import { message, Modal } from 'antd';

const API_BASE = 'http://localhost:5000/api';

export default function AdminPharmaciesPage() {
  const [pharmacies, setPharmacies] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [pharmRes, orderRes] = await Promise.allSettled([
        fetch(`${API_BASE}/pharmacies`, { headers }),
        fetch(`${API_BASE}/medicine-orders`, { headers }),
      ]);

      if (pharmRes.status === 'fulfilled') {
        const data = await pharmRes.value.json();
        if (data.success) setPharmacies(data.pharmacies || []);
      }
      if (orderRes.status === 'fulfilled') {
        const data = await orderRes.value.json();
        setOrders(data.orders || data.data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPharmacyOrders = (pharmacyId) => {
    return orders.filter(o => {
      const items = o.items || o.medicines || [];
      return items.some(item => item.pharmacyId === pharmacyId || item.pharmacy === pharmacyId ||
        item.pharmacyId?._id === pharmacyId || item.pharmacy?._id === pharmacyId);
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

  const filtered = pharmacies.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Pharmacies Management</h1>
          <p className="text-gray-600 mt-1">Total {pharmacies.length} registered pharmacies · {orders.length} total orders</p>
        </div>
        <button onClick={fetchAllData} className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search pharmacies..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pharmacy) => {
          const stats = getPharmacySummary(pharmacy._id);
          return (
            <div key={pharmacy._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {pharmacy.name?.charAt(0) || 'P'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{pharmacy.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {pharmacy.city || 'N/A'}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${pharmacy.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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
                  <span className="flex items-center gap-1"><DollarSign size={14} className="text-gray-400" /> Revenue: Rs {stats.revenue.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {pharmacy.rating || 4.0}</span>
                </div>

                <button onClick={() => { setSelectedPharmacy(pharmacy); setDetailModal(true); }}
                  className="mt-3 w-full px-3 py-2 text-sm bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Pill className="w-12 h-12 mx-auto mb-3 text-gray-300" /><p>No pharmacies found</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal title={selectedPharmacy?.name || ''} open={detailModal}
        onCancel={() => { setDetailModal(false); setSelectedPharmacy(null); }} footer={null} width={650}>
        {selectedPharmacy && (() => {
          const stats = getPharmacySummary(selectedPharmacy._id);
          const pharmOrders = getPharmacyOrders(selectedPharmacy._id);
          return (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedPharmacy.name?.charAt(0) || 'P'}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{selectedPharmacy.name}</h3>
                  <p className="text-sm text-gray-500"><MapPin size={14} className="inline" /> {selectedPharmacy.city} · {selectedPharmacy.address}</p>
                  <div className="mt-2 flex gap-4 text-sm">
                    <span>Delivery: {selectedPharmacy.deliveryTime}</span>
                    <span>Medicines: {selectedPharmacy.medicines?.length || 0}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${selectedPharmacy.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selectedPharmacy.open ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                  <p className="text-xs text-blue-600">Orders</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-700">{stats.delivered}</p>
                  <p className="text-xs text-green-600">Delivered</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
                  <p className="text-xs text-amber-600">Pending</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-purple-700">Rs {stats.revenue.toLocaleString()}</p>
                  <p className="text-xs text-purple-600">Revenue</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Recent Orders</h4>
                {pharmOrders.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No orders yet</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {pharmOrders.slice(0, 10).map((o, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                        <div>
                          <p className="font-medium text-gray-900">{o.patient?.name || 'Customer'}</p>
                          <p className="text-xs text-gray-500">{o.orderId} · {new Date(o.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            o.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            o.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            o.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>{o.status}</span>
                          <p className="font-semibold mt-1">Rs {(o.totalAmount || o.finalAmount || 0).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}