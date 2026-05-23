import React, { useState, useEffect } from 'react';
import { Microscope, Search, RefreshCw, Star, DollarSign, FileText, Calendar, Activity } from 'lucide-react';
import { message, Modal } from 'antd';

const API_BASE = 'http://localhost:5000/api';

export default function AdminLabsPage() {
  const [labs, setLabs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState(null);
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [labRes, bookingRes] = await Promise.allSettled([
        fetch(`${API_BASE}/labs`, { headers }),
        fetch(`${API_BASE}/bookings`, { headers }),
      ]);

      if (labRes.status === 'fulfilled') {
        const labData = await labRes.value.json();
        if (labData.success) setLabs(labData.labs || []);
      }
      if (bookingRes.status === 'fulfilled') {
        const bookingData = await bookingRes.value.json();
        setBookings(bookingData.allBookings || bookingData.data || bookingData.bookings || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLabBookings = (labId) => bookings.filter(b => b.lab === labId || b.lab?._id === labId);

  const getLabSummary = (labId) => {
    const labBookings = getLabBookings(labId);
    return {
      total: labBookings.length,
      pending: labBookings.filter(b => b.bookingStatus === 'pending' || b.status === 'pending').length,
      completed: labBookings.filter(b => b.bookingStatus === 'completed' || b.status === 'completed').length,
      cancelled: labBookings.filter(b => b.bookingStatus === 'cancelled' || b.status === 'cancelled').length,
      revenue: labBookings.filter(b => (b.bookingStatus === 'completed' || b.status === 'completed') && b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    };
  };

  const filtered = labs.filter(lab =>
    lab.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.branches?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Labs Management</h1>
          <p className="text-gray-600 mt-1">Total {labs.length} registered labs · {bookings.length} total bookings</p>
        </div>
        <button onClick={fetchAllData} className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search labs..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((lab) => {
          const stats = getLabSummary(lab._id);
          return (
            <div key={lab._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {lab.name?.charAt(0) || 'L'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{lab.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{lab.branches || 'Main Branch'}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-lg font-bold text-blue-700">{stats.total}</p>
                      <p className="text-xs text-blue-600">Bookings</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <p className="text-lg font-bold text-green-700">{stats.completed}</p>
                      <p className="text-xs text-green-600">Completed</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2">
                      <p className="text-lg font-bold text-amber-700">{stats.pending}</p>
                      <p className="text-xs text-amber-600">Pending</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1"><DollarSign size={14} className="text-gray-400" /> Discount: {lab.discount || 0}%</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {lab.rating || 4.0}</span>
                </div>

                <button onClick={() => { setSelectedLab(lab); setDetailModal(true); }}
                  className="mt-3 w-full px-3 py-2 text-sm bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Microscope className="w-12 h-12 mx-auto mb-3 text-gray-300" /><p>No labs found</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal title={selectedLab?.name || ''} open={detailModal}
        onCancel={() => { setDetailModal(false); setSelectedLab(null); }} footer={null} width={650}>
        {selectedLab && (() => {
          const stats = getLabSummary(selectedLab._id);
          const labBookings = getLabBookings(selectedLab._id);
          return (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedLab.name?.charAt(0) || 'L'}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{selectedLab.name}</h3>
                  <p className="text-sm text-gray-500">{selectedLab.branches} · {selectedLab.city || ''}</p>
                  <div className="mt-2 flex gap-4 text-sm">
                    <span>Discount: {selectedLab.discount || 0}%</span>
                    <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" />{selectedLab.rating || 4.0}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                  <p className="text-xs text-blue-600">Bookings</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
                  <p className="text-xs text-amber-600">Pending</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-purple-700">Rs {(stats.revenue || 0).toLocaleString()}</p>
                  <p className="text-xs text-purple-600">Revenue</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Recent Bookings</h4>
                {labBookings.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No bookings yet</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {labBookings.slice(0, 10).map((b, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                        <div>
                          <p className="font-medium text-gray-900">{b.patientDetails?.name || 'Patient'}</p>
                          <p className="text-xs text-gray-500">{(b.tests?.length || 0)} tests · {new Date(b.appointmentDetails?.preferredDate || b.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            (b.bookingStatus || b.status) === 'completed' ? 'bg-green-100 text-green-700' :
                            (b.bookingStatus || b.status) === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}>{b.bookingStatus || b.status}</span>
                          <p className="font-semibold mt-1">Rs {b.totalAmount?.toLocaleString()}</p>
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