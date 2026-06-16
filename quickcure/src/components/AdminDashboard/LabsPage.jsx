import React, { useState, useEffect } from 'react';
import { Microscope, Search, RefreshCw, Star, DollarSign, Calendar, Activity, AlertCircle, TrendingUp, Users, TestTube, Clock, CheckCircle, XCircle, Mail, Phone, MapPin, Image, Trash2 } from 'lucide-react';
import { message, Modal, Spin, Tabs, Table, Tag, Statistic, Row, Col, Card } from 'antd';

const API_BASE = 'http://localhost:5000/api';

export default function AdminLabsPage() {
  const [labs, setLabs] = useState([]);
  const [bookingsMap, setBookingsMap] = useState({});
  const [testsMap, setTestsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLabBookings, setSelectedLabBookings] = useState([]);
  const [selectedLabTests, setSelectedLabTests] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }
      
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch all labs - API returns array directly
      const labRes = await fetch(`${API_BASE}/labs`, { headers });
      if (labRes.ok) {
        const labData = await labRes.json();
        // The labs API returns the array directly
        const labList = Array.isArray(labData) ? labData : (labData.data || labData.labs || []);
        setLabs(labList);
        message.success(`Loaded ${labList.length} labs successfully`);
      } else {
        setError('Failed to load labs');
      }
    } catch (err) {
      console.error('Error fetching labs:', err);
      setError(err.message || 'Failed to fetch data');
      message.error('Failed to load labs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLabDetails = async (labId) => {
    try {
      setDetailLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch bookings and tests for this specific lab
      const [bookingRes, testsRes] = await Promise.allSettled([
        fetch(`${API_BASE}/bookings/lab/${labId}`, { headers }),
        fetch(`${API_BASE}/tests/lab/${labId}`, { headers }),
      ]);

      let bookingList = [];
      let testsList = [];

      if (bookingRes.status === 'fulfilled' && bookingRes.value.ok) {
        const data = await bookingRes.value.json();
        bookingList = Array.isArray(data) ? data : (data.data || data.bookings || data.allBookings || []);
      }
      
      if (testsRes.status === 'fulfilled' && testsRes.value.ok) {
        const data = await testsRes.value.json();
        testsList = Array.isArray(data) ? data : (data.data || data.tests || []);
      }

      setSelectedLabBookings(bookingList);
      setSelectedLabTests(testsList);
    } catch (err) {
      console.error('Error fetching lab details:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleViewDetails = (lab) => {
    setSelectedLab(lab);
    setDetailModal(true);
    setActiveTab('overview');
    setSelectedLabBookings([]);
    setSelectedLabTests([]);
    fetchLabDetails(lab._id || lab.id);
  };

  const getLabSummary = (labBookings) => {
    const completed = labBookings.filter(b => b.bookingStatus === 'completed' || b.status === 'completed');
    const pending = labBookings.filter(b => b.bookingStatus === 'pending' || b.status === 'pending');
    const cancelled = labBookings.filter(b => b.bookingStatus === 'cancelled' || b.status === 'cancelled');
    const paid = completed.filter(b => b.paymentStatus === 'paid');
    const pendingRevenue = pending.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    
    return {
      total: labBookings.length,
      pending: pending.length,
      completed: completed.length,
      cancelled: cancelled.length,
      revenue: paid.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
      pendingRevenue,
      totalTests: labBookings.reduce((sum, b) => sum + (b.tests?.length || 0), 0),
      uniquePatients: new Set(labBookings.map(b => b.patientDetails?.id || b.patientId)).size,
    };
  };

  const getMonthlyRevenue = (labBookings) => {
    const monthlyData = {};
    labBookings.forEach(booking => {
      if (booking.bookingStatus === 'completed' || booking.status === 'completed') {
        const date = new Date(booking.appointmentDetails?.preferredDate || booking.createdAt);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        const amount = booking.totalAmount || 0;
        if (!monthlyData[monthYear]) monthlyData[monthYear] = { revenue: 0, count: 0 };
        monthlyData[monthYear].revenue += amount;
        monthlyData[monthYear].count += 1;
      }
    });
    return Object.entries(monthlyData).map(([month, data]) => ({
      month, revenue: data.revenue, bookings: data.count
    })).reverse();
  };

  const getTopTests = (labBookings) => {
    const testCount = {};
    labBookings.forEach(booking => {
      if (booking.tests && Array.isArray(booking.tests)) {
        booking.tests.forEach(test => {
          const testName = test.name || test.testName;
          if (testName) testCount[testName] = (testCount[testName] || 0) + 1;
        });
      }
    });
    return Object.entries(testCount).map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count).slice(0, 5);
  };

  const handleDeleteLab = (lab) => {
    const labId = lab._id || lab.id;
    Modal.confirm({
      title: 'Delete Lab',
      content: `Are you sure you want to delete "${lab.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${API_BASE}/labs/${labId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            message.success(`Lab "${lab.name}" deleted successfully`);
            setDetailModal(false);
            setSelectedLab(null);
            fetchAllData();
          } else {
            const data = await res.json();
            message.error(data.message || 'Failed to delete lab');
          }
        } catch (err) {
          message.error('Failed to delete lab');
        }
      }
    });
  };

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http')) return img;
    if (img.startsWith('/uploads')) return `http://localhost:5000${img}`;
    return `http://localhost:5000/uploads/${img}`;
  };

  const filteredLabs = labs.filter(lab =>
    lab.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.branches?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bookingColumns = [
    { title: 'Patient', dataIndex: 'patientDetails', key: 'patient',
      render: (pd, r) => pd?.name || r.patientName || 'N/A' },
    { title: 'Tests', dataIndex: 'tests', key: 'tests',
      render: (t) => t?.length || 0 },
    { title: 'Date', dataIndex: 'appointmentDetails', key: 'date',
      render: (ad, r) => new Date(ad?.preferredDate || r.createdAt).toLocaleDateString() },
    { title: 'Amount', dataIndex: 'totalAmount', key: 'amount',
      render: (a) => `Rs ${(a || 0).toLocaleString()}` },
    { title: 'Status', dataIndex: 'bookingStatus', key: 'status',
      render: (s, r) => {
        const status = s || r.status;
        const color = status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red';
        return <Tag color={color}>{status?.toUpperCase() || 'N/A'}</Tag>;
      }
    },
    { title: 'Payment', dataIndex: 'paymentStatus', key: 'payment',
      render: (s) => <Tag color={s === 'paid' ? 'green' : 'orange'}>{s?.toUpperCase() || 'PENDING'}</Tag>
    },
  ];

  const testColumns = [
    { title: 'Test Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Price', dataIndex: 'price', key: 'price',
      render: (p) => `Rs ${p?.toLocaleString() || 0}` },
    { title: 'Duration', dataIndex: 'duration', key: 'duration',
      render: (d) => d ? `${d} mins` : 'N/A' },
    { title: 'Status', dataIndex: 'isActive', key: 'status',
      render: (a) => <Tag color={a !== false ? 'green' : 'red'}>{a !== false ? 'Active' : 'Inactive'}</Tag>
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Labs Management</h1>
          <p className="text-gray-600 mt-1">
            Total {labs.length} registered {labs.length === 1 ? 'lab' : 'labs'}
          </p>
        </div>
        <button onClick={fetchAllData} disabled={loading}
          className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search labs by name or branch..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] outline-none" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" tip="Loading labs..." />
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-500" />
          <p className="text-red-600 font-medium">{error}</p>
          <button onClick={fetchAllData} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg">Try Again</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLabs.map((lab) => (
            <div key={lab._id || lab.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Lab Logo */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xl font-bold shrink-0 overflow-hidden">
                    {getImageUrl(lab.logo) ? (
                      <img src={getImageUrl(lab.logo)} alt={lab.name} className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = lab.name?.charAt(0).toUpperCase() || 'L'; }} />
                    ) : (
                      lab.name?.charAt(0).toUpperCase() || 'L'
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{lab.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{lab.branches || lab.city || 'Main Branch'}</p>
                    {lab.discount > 0 && (
                      <p className="text-xs text-green-600 font-medium mt-1">{lab.discount}% discount</p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    {/* <Star size={14} className="text-amber-400 fill-amber-400" /> {lab.rating || 4.0} */}
                  </span>
                  <span className="text-xs text-gray-400">{lab._id?.slice(-6).toUpperCase() || ''}</span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleViewDetails(lab)}
                    className="flex-1 px-3 py-2 text-sm bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] font-medium">
                    View Complete Details
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteLab(lab); }}
                    className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium flex items-center gap-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredLabs.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <Microscope className="w-12 h-12 mx-auto mb-3 text-gray-300" /><p>No labs found</p>
            </div>
          )}
        </div>
      )}

      {/* Full Detail Modal with Tabs */}
      <Modal title={null} open={detailModal}
        onCancel={() => { setDetailModal(false); setSelectedLab(null); }} 
        footer={null} width={1000} style={{ top: 20 }}>
        {selectedLab && (() => {
          const labId = selectedLab._id || selectedLab.id;
          const stats = getLabSummary(selectedLabBookings);
          const monthlyRevenue = getMonthlyRevenue(selectedLabBookings);
          const topTests = getTopTests(selectedLabBookings);

          if (detailLoading) {
            return (
              <div className="flex justify-center items-center py-20">
                <Spin size="large" tip="Loading details..." />
              </div>
            );
          }

          const tabItems = [
            {
              key: 'overview',
              label: <span className="flex items-center gap-2"><Activity size={16} /> Overview</span>,
              children: (
                <div className="space-y-6">
                  {/* Lab Info Header with Logo */}
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-5 rounded-xl border border-emerald-100">
                    <div className="flex items-start gap-5">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-3xl font-bold shadow-md overflow-hidden shrink-0">
                        {getImageUrl(selectedLab.logo) ? (
                          <img src={getImageUrl(selectedLab.logo)} alt={selectedLab.name} className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = selectedLab.name?.charAt(0).toUpperCase() || 'L'; }} />
                        ) : (
                          selectedLab.name?.charAt(0).toUpperCase() || 'L'
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900">{selectedLab.name}</h3>
                        <p className="text-gray-500">{selectedLab.branches || 'Main Branch'}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Lab ID</p>
                            <p className="text-sm font-medium text-gray-800">{labId}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Created</p>
                            <p className="text-sm text-gray-700">{selectedLab.createdAt ? new Date(selectedLab.createdAt).toLocaleDateString() : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Discount</p>
                            <p className="text-sm font-medium text-emerald-600">{selectedLab.discount || 0}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                      <Card><Statistic title="Total Bookings" value={stats.total} prefix={<Calendar size={20} />} /></Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <Card><Statistic title="Completed" value={stats.completed} prefix={<CheckCircle size={20} />} valueStyle={{ color: '#3f8600' }} /></Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <Card><Statistic title="Pending" value={stats.pending} prefix={<Clock size={20} />} valueStyle={{ color: '#faad14' }} /></Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <Card><Statistic title="Total Revenue" value={stats.revenue} prefix="Rs" valueStyle={{ color: '#3f8600' }} suffix={`from ${stats.completed} bookings`} /></Card>
                    </Col>
                  </Row>

                  {/* Status Distribution */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Booking Status Distribution</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                        <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
                        <p className="text-xs text-green-600">Completed</p>
                      </div>
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <Clock className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                        <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
                        <p className="text-xs text-amber-600">Pending</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <XCircle className="w-8 h-8 mx-auto text-red-600 mb-2" />
                        <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
                        <p className="text-xs text-red-600">Cancelled</p>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Revenue */}
                  {monthlyRevenue.length > 0 && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <TrendingUp size={18} /> Monthly Revenue
                      </h4>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">Revenue</th><th className="px-4 py-2 text-right">Bookings</th><th className="px-4 py-2 text-right">Avg</th></tr>
                        </thead>
                        <tbody>
                          {monthlyRevenue.map((m, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium">{m.month}</td>
                              <td className="px-4 py-2 text-right font-semibold">Rs {m.revenue.toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{m.bookings}</td>
                              <td className="px-4 py-2 text-right">Rs {Math.round(m.revenue / m.bookings).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Most Popular Tests */}
                  {topTests.length > 0 && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><TestTube size={18} /> Most Booked Tests</h4>
                      <div className="space-y-1">
                        {topTests.map((t, i) => (
                          <div key={i} className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100">
                            <span className="font-medium text-gray-700">{t.name}</span>
                            <span className="text-sm font-semibold text-[#2c6774]">{t.count} bookings</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedLabBookings.length === 0 && selectedLabTests.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p>No bookings or tests data available for this lab yet.</p>
                    </div>
                  )}
                </div>
              ),
            },
            {
              key: 'tests',
              label: <span className="flex items-center gap-2"><TestTube size={16} /> Tests ({selectedLabTests.length})</span>,
              children: (
                <div>
                  <div className="mb-3"><Tag color="blue">{selectedLabTests.length} Tests</Tag></div>
                  {selectedLabTests.length === 0 ? (
                    <p className="text-center py-8 text-gray-400">No tests found for this lab</p>
                  ) : (
                    <Table columns={testColumns} dataSource={selectedLabTests} rowKey="_id" pagination={{ pageSize: 10 }} />
                  )}
                </div>
              ),
            },
            {
              key: 'bookings',
              label: <span className="flex items-center gap-2"><Calendar size={16} /> Bookings ({selectedLabBookings.length})</span>,
              children: (
                <div>
                  <div className="mb-3 flex gap-2 flex-wrap">
                    <Tag color="green">Completed: {stats.completed}</Tag>
                    <Tag color="orange">Pending: {stats.pending}</Tag>
                    <Tag color="red">Cancelled: {stats.cancelled}</Tag>
                  </div>
                  {selectedLabBookings.length === 0 ? (
                    <p className="text-center py-8 text-gray-400">No bookings found for this lab</p>
                  ) : (
                    <Table columns={bookingColumns} dataSource={selectedLabBookings} rowKey="_id" pagination={{ pageSize: 10 }} />
                  )}
                </div>
              ),
            },
            {
              key: 'revenue',
              label: <span className="flex items-center gap-2"><DollarSign size={16} /> Revenue</span>,
              children: (
                <div className="space-y-6">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                      <Card><Statistic title="Total Revenue" value={stats.revenue} prefix="Rs" valueStyle={{ color: '#3f8600', fontSize: '24px' }} /></Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card><Statistic title="Avg Order Value" value={stats.completed > 0 ? Math.round(stats.revenue / stats.completed) : 0} prefix="Rs" valueStyle={{ color: '#1890ff', fontSize: '24px' }} /></Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card><Statistic title="Pending Collection" value={stats.pendingRevenue} prefix="Rs" valueStyle={{ color: '#cf7c00', fontSize: '24px' }} /></Card>
                    </Col>
                  </Row>

                  {monthlyRevenue.length > 0 && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Monthly Revenue Breakdown</h4>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">Revenue</th><th className="px-4 py-2 text-right">Bookings</th><th className="px-4 py-2 text-right">Avg</th><th className="px-4 py-2 text-right">%</th></tr>
                        </thead>
                        <tbody>
                          {monthlyRevenue.map((m, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium">{m.month}</td>
                              <td className="px-4 py-2 text-right font-semibold text-green-600">Rs {m.revenue.toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{m.bookings}</td>
                              <td className="px-4 py-2 text-right">Rs {Math.round(m.revenue / m.bookings).toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{stats.revenue > 0 ? ((m.revenue / stats.revenue) * 100).toFixed(1) : 0}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Insights</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• Total revenue: Rs {stats.revenue.toLocaleString()} from {stats.completed} completed bookings</li>
                      <li>• Average per booking: Rs {stats.completed > 0 ? Math.round(stats.revenue / stats.completed).toLocaleString() : 0}</li>
                      <li>• Pending collection: Rs {stats.pendingRevenue.toLocaleString()} from {stats.pending} bookings</li>
                      <li>• {stats.cancelled} cancelled bookings</li>
                    </ul>
                  </div>
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