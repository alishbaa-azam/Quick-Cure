import React, { useState, useEffect } from 'react';
import {
  FileText, Search, RefreshCw, CheckCircle, XCircle, Eye,
  X, Stethoscope, Microscope, Pill, UserPlus, ExternalLink
} from 'lucide-react';
import { message, Modal, Button, Tooltip, Spin } from 'antd';

const API_BASE = 'http://localhost:5000/api';

const statusColors = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  approved: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
  under_review: 'bg-blue-100 text-blue-700 border-blue-200',
};

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export default function RegistrationRequestsPage() {
  const [activeTab, setActiveTab] = useState('doctor');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReg, setSelectedReg] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [creatingEntity, setCreatingEntity] = useState(false);

  const tabs = [
    { id: 'doctor', label: 'Doctor Registrations', icon: Stethoscope },
    { id: 'lab', label: 'Lab Registrations', icon: Microscope },
    { id: 'pharmacy', label: 'Pharmacy Registrations', icon: Pill },
  ];

  useEffect(() => {
    fetchRegistrations();
  }, [activeTab]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      let endpoint = '';
      if (activeTab === 'doctor') {
        endpoint = `${API_BASE}/doctor-registration/registrations`;
      } else if (activeTab === 'lab') {
        endpoint = `${API_BASE}/labreg/all`;
      } else {
        endpoint = `${API_BASE}/pharmacy/all`;
      }

      const res = await fetch(endpoint, { headers: getAuthHeaders() });
      const data = await res.json();

      let list = [];
      if (activeTab === 'doctor') {
        list = data?.data || data?.registrations || [];
      } else {
        list = data?.data || [];
      }
      setRegistrations(list);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (regId, newStatus, notes = '') => {
    try {
      let endpoint = '';
      let method = 'PATCH';
      if (activeTab === 'doctor') {
        endpoint = `${API_BASE}/doctor-registration/registrations/${regId}/status`;
      } else if (activeTab === 'lab') {
        endpoint = `${API_BASE}/labreg/${regId}/status`;
        method = 'PUT';
      } else {
        endpoint = `${API_BASE}/pharmacy/${regId}/status`;
        method = 'PUT';
      }

      const res = await fetch(endpoint, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus, adminNotes: notes }),
      });
      const result = await res.json();

      if (result.success) {
        message.success(`Registration ${newStatus} successfully`);
        fetchRegistrations();
        setDetailModal(false);
      } else {
        message.error(result.message || 'Failed to update status');
      }
    } catch (err) {
      message.error('Failed to update registration status');
    }
  };

  const handleApprove = (reg) => {
    Modal.confirm({
      title: 'Approve Registration',
      content: `Approve this ${activeTab} registration?`,
      okText: 'Approve',
      okType: 'primary',
      onOk: () => handleStatusChange(reg._id, 'approved'),
    });
  };

  const handleReject = (reg) => {
    let reason = '';
    Modal.confirm({
      title: 'Reject Registration',
      content: (
        <div>
          <p className="mb-2">Reject this registration?</p>
          <textarea
            className="w-full p-2 border rounded-lg text-sm"
            placeholder="Enter rejection reason..."
            rows={3}
            onChange={(e) => { reason = e.target.value; }}
          />
        </div>
      ),
      okText: 'Reject',
      okType: 'danger',
      onOk: () => handleStatusChange(reg._id, 'rejected', reason),
    });
  };

  const handleDelete = (reg) => {
    Modal.confirm({
      title: 'Delete Registration',
      content: 'Delete this registration request?',
      okType: 'danger',
      okText: 'Delete',
      onOk: async () => {
        try {
          let endpoint = '';
          if (activeTab === 'doctor') {
            endpoint = `${API_BASE}/doctor-registration/registrations/${reg._id}`;
          } else if (activeTab === 'lab') {
            endpoint = `${API_BASE}/labreg/${reg._id}`;
          } else {
            endpoint = `${API_BASE}/pharmacy/${reg._id}`;
          }
          const res = await fetch(endpoint, { method: 'DELETE', headers: getAuthHeaders() });
          const data = await res.json();
          if (data.success) {
            message.success('Deleted successfully');
            fetchRegistrations();
          }
        } catch (err) {
          message.error('Failed to delete');
        }
      },
    });
  };

  // Create entity from registration data
  const handleCreateEntity = async (reg) => {
    setCreatingEntity(true);
    try {
      let endpoint = '';
      let body = {};
      
      if (activeTab === 'pharmacy') {
        endpoint = `${API_BASE}/pharmacies`;
        body = {
          pharmacyName: reg.pharmacyName,
          ownerName: reg.ownerName,
          email: reg.email,
          phone: reg.phone,
          address: reg.address,
          city: reg.city,
          licenseNumber: reg.licenseNumber,
          pharmacyType: reg.pharmacyType,
          yearEstablished: reg.yearEstablished,
          status: 'approved',
          open: true
        };
      } else if (activeTab === 'doctor') {
        endpoint = `${API_BASE}/doctor-registration/registrations/${reg._id}/status`;
        const res = await fetch(endpoint, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status: 'approved' }),
        });
        const result = await res.json();
        if (result.success) {
          message.success('Doctor registration approved successfully');
          fetchRegistrations();
          setDetailModal(false);
        } else {
          message.error(result.message || 'Failed to create doctor');
        }
        return; // Doctor registration is just approval
      } else if (activeTab === 'lab') {
        endpoint = `${API_BASE}/labreg/${reg._id}/status`;
        // Lab uses status update same flow
        const res = await fetch(endpoint, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status: 'approved' }),
        });
        const result = await res.json();
        if (result.success) {
          message.success('Lab registration approved successfully');
          fetchRegistrations();
          setDetailModal(false);
        } else {
          message.error(result.message || 'Failed to create lab');
        }
        return;
      }

      // For pharmacy: create actual pharmacy record
      if (activeTab === 'pharmacy') {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(body),
        });
        const result = await res.json();
        if (result.success) {
          message.success('Pharmacy created and approved successfully!');
          // Also update registration status
          await fetch(`${API_BASE}/pharmacy/${reg._id}/status`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status: 'approved' }),
          });
          fetchRegistrations();
          setDetailModal(false);
        } else {
          message.error(result.message || 'Failed to create pharmacy');
        }
      }
    } catch (err) {
      message.error('Failed to create entity');
    } finally {
      setCreatingEntity(false);
    }
  };

  const getName = (reg) => {
    if (activeTab === 'doctor') return reg.fullName || 'Unknown';
    if (activeTab === 'lab') return reg.labName || 'Unknown';
    return reg.pharmacyName || reg.name || reg.contactPerson || reg.ownerName || 'Unknown';
  };

  const getInitials = (reg) => getName(reg)?.charAt(0)?.toUpperCase() || '?';
  const getStatus = (reg) => reg.status || reg.registrationStatus || 'pending';

  const filtered = registrations.filter(reg => {
    const name = (getName(reg) || '').toLowerCase();
    const email = (reg.email || '').toLowerCase();
    return (name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase())) &&
           (statusFilter === 'all' || getStatus(reg) === statusFilter);
  });

  const summary = {
    total: registrations.length,
    pending: registrations.filter(r => getStatus(r) === 'pending' || getStatus(r) === 'under_review').length,
    approved: registrations.filter(r => getStatus(r) === 'approved').length,
    rejected: registrations.filter(r => getStatus(r) === 'rejected').length,
  };

  // Get ALL detail fields based on registration type
  const getDetailFields = () => {
    if (!selectedReg) return [];
    const r = selectedReg;

    if (activeTab === 'doctor') {
      const fields = [
        // Personal Information
        { section: 'Personal Information', fields: [
          { label: 'Full Name', value: r.fullName },
          { label: 'Email', value: r.email },
          { label: 'Phone', value: r.phone },
          { label: 'Gender', value: r.gender },
          { label: 'Date of Birth', value: r.dob ? new Date(r.dob).toLocaleDateString() : null },
          { label: 'CNIC', value: r.cnic },
          { label: 'Address', value: r.address },
          { label: 'City', value: r.city },
          { label: 'Country', value: r.country },
        ]},
        { section: 'Education', fields: [
          { label: 'Qualification', value: r.qualification },
          { label: 'Specialization', value: r.specialization },
          { label: 'Institute', value: r.institute },
          { label: 'Passing Year', value: r.passingYear ? new Date(r.passingYear).toLocaleDateString() : null },
        ]},
        { section: 'Professional', fields: [
          { label: 'Experience', value: r.experienceYears ? `${r.experienceYears} years` : null },
          { label: 'Current Hospital', value: r.currentHospital },
          { label: 'Designation', value: r.designation },
          { label: 'License Number', value: r.licenseNumber },
          { label: 'Registration #', value: r.registrationNumber },
        ]},
        { section: 'Documents', fields: [
          { label: 'Profile Picture', value: r.profilePicture, isImage: true },
          { label: 'ID Card Front', value: r.idCardFront, isImage: true },
          { label: 'ID Card Back', value: r.idCardBack, isImage: true },
          { label: 'License', value: r.doctorLicense, isImage: true },
          { label: 'MBBS Certificate', value: r.mbbsCertificate, isImage: true },
          { label: 'House Job Cert', value: r.houseJobCertificate, isImage: true },
          { label: 'Specialization Cert', value: r.specializationCertificate, isImage: true },
          { label: 'FCPS Cert', value: r.fcpsCertificate, isImage: true },
        ]},
      ];
      return fields;
    }

    if (activeTab === 'lab') {
      return [
        { section: 'Basic Information', fields: [
          { label: 'Lab Name', value: r.labName },
          { label: 'Registration #', value: r.registrationNumber },
          { label: 'Lab Type', value: r.labType },
          { label: 'Establishment Year', value: r.establishmentYear },
        ]},
        { section: 'Contact Details', fields: [
          { label: 'Contact Person', value: r.contactPerson },
          { label: 'Designation', value: r.designation },
          { label: 'Email', value: r.email },
          { label: 'Mobile', value: r.mobileNumber ? `+92 ${r.mobileNumber}` : null },
        ]},
        { section: 'Location', fields: [
          { label: 'Province', value: r.province },
          { label: 'City', value: r.city },
          { label: 'Address', value: r.completeAddress },
        ]},
        { section: 'Documents', fields: [
          { label: 'Registration Cert', value: r.registrationCertificate?.filename, isFile: true },
          { label: 'CNIC Front', value: r.cnicFront?.filename, isFile: true },
          { label: 'CNIC Back', value: r.cnicBack?.filename, isFile: true },
        ]},
      ];
    }

    // Pharmacy
    return [
      { section: 'Pharmacy Details', fields: [
        { label: 'Name', value: r.pharmacyName },
        { label: 'License #', value: r.licenseNumber },
        { label: 'Type', value: r.pharmacyType },
        { label: 'License Expiry', value: r.licenseExpiry ? new Date(r.licenseExpiry).toLocaleDateString() : null },
        { label: 'Year Established', value: r.yearEstablished },
      ]},
      { section: 'Contact Information', fields: [
        { label: 'Owner', value: r.ownerName },
        { label: 'Owner CNIC', value: r.ownerCnic },
        { label: 'Email', value: r.email },
        { label: 'Phone', value: r.phone ? `+92 ${r.phone}` : null },
      ]},
      { section: 'Location', fields: [
        { label: 'Province', value: r.province },
        { label: 'City', value: r.city },
        { label: 'Address', value: r.address },
      ]},
      { section: 'Documents', fields: [
        { label: 'License File', value: r.licenseFile?.filename, isFile: true },
        { label: 'Tax Certificate', value: r.taxCertificate?.filename, isFile: true },
        { label: 'Owner ID Proof', value: r.ownerIdProof?.filename, isFile: true },
      ]},
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Registration Requests</h1>
          <p className="text-gray-600 mt-1">Review {activeTab} registration applications</p>
        </div>
        <button onClick={fetchRegistrations} className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm inline-flex gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setStatusFilter('all'); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab.id ? 'bg-[#2c6774] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Total</p>
          <p className="text-xl font-bold text-gray-900">{summary.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-4 shadow-sm">
          <p className="text-xs text-amber-600 font-medium">Pending</p>
          <p className="text-xl font-bold text-amber-600">{summary.pending}</p>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-4 shadow-sm">
          <p className="text-xs text-green-600 font-medium">Approved</p>
          <p className="text-xl font-bold text-green-600">{summary.approved}</p>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-4 shadow-sm">
          <p className="text-xs text-red-600 font-medium">Rejected</p>
          <p className="text-xl font-bold text-red-600">{summary.rejected}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder={`Search ${activeTab} registrations...`} value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] outline-none" />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize ${statusFilter === s ? 'bg-[#2c6774] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(reg => (
                  <tr key={reg._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          getStatus(reg) === 'approved' ? 'bg-green-500' : getStatus(reg) === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                        }`}>{getInitials(reg)}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{getName(reg)}</p>
                          <p className="text-xs text-gray-400">{reg.registrationNumber || reg.licenseNumber || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{reg.email || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{reg.phone || reg.mobileNumber || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize border ${statusColors[getStatus(reg)] || 'bg-gray-100'}`}>
                        {getStatus(reg)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(reg.createdAt || reg.submittedAt || reg.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Tooltip title="View Details">
                          <button onClick={() => { setSelectedReg(reg); setDetailModal(true); }}
                            className="p-1.5 text-[#2c6774] hover:bg-[#2c6774]/10 rounded-lg"><Eye size={16} /></button>
                        </Tooltip>
                        {(getStatus(reg) === 'pending' || getStatus(reg) === 'under_review') && (
                          <>
                            <Tooltip title="Approve">
                              <button onClick={() => handleApprove(reg)}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle size={16} /></button>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <button onClick={() => handleReject(reg)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><XCircle size={16} /></button>
                            </Tooltip>
                          </>
                        )}
                        {getStatus(reg) !== 'pending' && getStatus(reg) !== 'under_review' && (
                          <Tooltip title="Create Entity from Data">
                            <button onClick={() => handleCreateEntity(reg)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><UserPlus size={16} /></button>
                          </Tooltip>
                        )}
                        <Tooltip title="Delete">
                          <button onClick={() => handleDelete(reg)}
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"><X size={16} /></button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No registration requests found</p>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal title={
        <div className="flex items-center gap-2">
          {activeTab === 'doctor' ? <Stethoscope size={20} /> : activeTab === 'lab' ? <Microscope size={20} /> : <Pill size={20} />}
          <span>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Full Details</span>
        </div>
      }
        open={detailModal} onCancel={() => { setDetailModal(false); setSelectedReg(null); }} footer={null} width={800}>
        {selectedReg && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Status Bar */}
            <div className="flex justify-between items-center sticky top-0 bg-white py-2 z-10 border-b">
              <span className={`px-3 py-1.5 text-sm rounded-full font-medium capitalize border ${statusColors[getStatus(selectedReg)]}`}>
                {getStatus(selectedReg)}
              </span>
              <span className="text-xs text-gray-400">
                Submitted: {new Date(selectedReg.createdAt || selectedReg.submittedAt).toLocaleString()}
              </span>
            </div>

            {/* Detail Sections */}
            {getDetailFields().map((section, si) => (
              <div key={si}>
                <h4 className="text-sm font-bold text-[#2c6774] mb-3 pb-1 border-b border-gray-100">
                  {section.section}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {section.fields.map((field, fi) => {
                    if (!field.value) return null;
                    return (
                      <div key={fi} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 font-medium">{field.label}</p>
                        {field.isImage ? (
                          <img src={field.value} alt={field.label} className="mt-1 max-h-20 rounded object-cover cursor-pointer"
                            onClick={() => window.open(field.value, '_blank')} />
                        ) : field.isFile ? (
                          <p className="text-sm font-medium mt-1 text-blue-600">
                            <a href={`${API_BASE.replace('/api', '')}/uploads/${field.value}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                              <ExternalLink size={14} /> {field.value}
                            </a>
                          </p>
                        ) : (
                          <p className="text-sm font-medium mt-1">{field.value}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {selectedReg.adminNotes && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">Admin Notes</p>
                <p className="text-sm">{selectedReg.adminNotes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white py-3">
              {(getStatus(selectedReg) === 'pending' || getStatus(selectedReg) === 'under_review') && (
                <>
                  <Button danger onClick={() => handleReject(selectedReg)} disabled={creatingEntity}>
                    <XCircle size={16} /> Reject
                  </Button>
                  <Button type="primary" onClick={() => handleApprove(selectedReg)}
                    disabled={creatingEntity}
                    style={{ backgroundColor: '#2c6774', borderColor: '#2c6774' }}>
                    <CheckCircle size={16} /> Approve
                  </Button>
                </>
              )}
              {getStatus(selectedReg) !== 'pending' && getStatus(selectedReg) !== 'under_review' && (
                <Button type="primary" onClick={() => handleCreateEntity(selectedReg)}
                  loading={creatingEntity}
                  style={{ backgroundColor: '#2c6774', borderColor: '#2c6774' }}
                  icon={<UserPlus size={16} />}>
                  Create {activeTab === 'doctor' ? 'Doctor' : activeTab === 'lab' ? 'Lab' : 'Pharmacy'} Record
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}