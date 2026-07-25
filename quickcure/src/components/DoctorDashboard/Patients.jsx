import React, { useState, useEffect } from 'react';
import { Search, Users, UserPlus, Phone, Mail, Calendar, ChevronRight, X, Clock } from 'lucide-react';
import { getDoctorPatients } from '../../api/doctorApi';
import { registerPatient } from '../../api/patientApi';

const Patients = ({ doctorId, setActiveTab, setSelectedPatient }) => {
  const [patients, setPatients]           = useState([]);
  const [searchTerm, setSearchTerm]       = useState('');
  const [loading, setLoading]             = useState(true);
  const [showModal, setShowModal]         = useState(false);
  const [registering, setRegistering]     = useState(false);
  const [msg, setMsg]                     = useState('');
  const [msgType, setMsgType]             = useState('');
  const [newPatient, setNewPatient]       = useState({ name: '', email: '', mobile: '', age: '', gender: '' });

  useEffect(() => { fetchPatients(); }, [doctorId]);

  const fetchPatients = async () => {
    setLoading(true);
    const result = await getDoctorPatients(doctorId);
    if (result.success) setPatients(Array.isArray(result.data) ? result.data : []);
    setLoading(false);
  };

  const filtered = patients.filter(p =>
    (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.contact || '').includes(searchTerm) ||
    (p.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('patient-history');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.email || !newPatient.mobile) {
      setMsg('Name, email, and mobile are required'); setMsgType('error'); return;
    }
    setRegistering(true); setMsg('');
    const result = await registerPatient({ name: newPatient.name, email: newPatient.email, mobile: newPatient.mobile, age: newPatient.age || undefined, gender: newPatient.gender || undefined });
    if (result.success) {
      setMsg(result.isNew ? 'Patient registered successfully!' : 'Patient already exists.');
      setMsgType('success');
      setNewPatient({ name: '', email: '', mobile: '', age: '', gender: '' });
      fetchPatients();
      setTimeout(() => { setShowModal(false); setMsg(''); }, 1500);
    } else {
      setMsg(result.error || 'Failed to register patient'); setMsgType('error');
    }
    setRegistering(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#174047]">Patients</h2>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} patient{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search patients…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 w-56 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] bg-gray-50" />
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1e4e56] text-sm font-semibold transition-colors shadow-sm">
            <UserPlus size={15} /> Register
          </button>
        </div>
      </div>

      {/* Register Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white rounded-t-2xl">
              <h3 className="text-lg font-bold text-[#174047]">Register New Patient</h3>
              <button onClick={() => { setShowModal(false); setMsg(''); }} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleRegister} className="p-6 space-y-4">
              {msg && (
                <div className={`p-3 rounded-xl text-sm font-medium ${msgType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{msg}</div>
              )}
              {[
                { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'Enter patient name', required: true },
                { label: 'Email *',     name: 'email', type: 'email', placeholder: 'patient@email.com', required: true },
                { label: 'Mobile *',    name: 'mobile', type: 'text', placeholder: '03XXXXXXXXX', required: true },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} required={f.required}
                    value={newPatient[f.name]} onChange={e => setNewPatient(p => ({ ...p, [f.name]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age</label>
                  <input type="number" placeholder="Years" value={newPatient.age} onChange={e => setNewPatient(p => ({ ...p, age: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
                  <select value={newPatient.gender} onChange={e => setNewPatient(p => ({ ...p, gender: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 bg-white">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setMsg(''); }}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" disabled={registering}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition-all shadow-sm">
                  {registering ? 'Registering…' : 'Register Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState searchTerm={searchTerm} onRegister={() => setShowModal(true)} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/60 border-b border-gray-100">
                  {['Patient', 'Contact', 'Email', 'Visits', 'Last Visit', 'Action'].map(h => (
                    <th
                      key={h}
                      className="text-left py-4 px-5 text-gray-500 font-semibold text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((patient, idx) => (
                  <tr
                    key={patient.id || patient.contact || patient.email || idx}
                    className="hover:bg-blue-50/20 transition-colors group"
                  >
                    {/* Patient */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                          {(patient.name || '?').charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                            {patient.name || 'Unknown'}
                          </p>
                          {(patient.age || patient.gender) && (
                            <p className="text-xs text-gray-400">
                              {patient.age ? `${patient.age}y` : ''}
                              {patient.age && patient.gender ? ' · ' : ''}
                              {patient.gender || ''}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Phone size={12} className="text-gray-400" />
                        {patient.contact || 'N/A'}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-5 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Mail size={12} className="flex-shrink-0" />
                        <span className="truncate max-w-[160px]">
                          {patient.email || 'N/A'}
                        </span>
                      </div>
                    </td>

                    {/* Visits */}
                    <td className="py-4 px-5 hidden lg:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2c6774]/10 text-[#174047] border border-[#2c6774]/15">
                        {patient.totalVisits || 1} visit{(patient.totalVisits || 1) !== 1 ? 's' : ''}
                      </span>
                    </td>

                    {/* Last Visit */}
                    <td className="py-4 px-5 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
                        <Calendar size={13} className="text-[#2c6774] flex-shrink-0" />
                        {patient.lastVisit || patient.date || 'N/A'}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleViewHistory(patient)}
                        className="px-3 py-1.5 text-xs bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors flex items-center gap-1 font-medium shadow-sm"
                      >
                        <ChevronRight size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer */}
            <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">{filtered.length} patient{filtered.length !== 1 ? 's' : ''} total</p>
              <button onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 text-xs text-[#2c6774] font-semibold hover:text-[#174047] transition-colors">
                <UserPlus size={13} /> Register new patient
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
            <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">{searchTerm ? 'No patients found' : 'No patients yet'}</p>
            {!searchTerm && (
              <button onClick={() => setShowModal(true)} className="mt-4 px-4 py-2 bg-[#2c6774] text-white rounded-xl text-sm inline-flex items-center gap-2">
                <UserPlus size={15} /> Register Patient
              </button>
            )}
          </div>
        ) : filtered.map((patient, idx) => (
          <div key={patient.id || patient.contact || patient.email || idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {(patient.name || '?').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{patient.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 truncate">{patient.contact || 'No contact'}</p>
                </div>
              </div>
              {patient.totalVisits && (
                <span className="px-2 py-1 bg-[#2c6774]/10 text-[#174047] rounded-full text-xs font-semibold flex-shrink-0">
                  {patient.totalVisits}x
                </span>
              )}
            </div>
            {patient.email && <p className="text-xs text-gray-400 mt-2 truncate">{patient.email}</p>}
            <button onClick={() => handleViewHistory(patient)}
              className="w-full mt-3 px-3 py-2 text-xs bg-[#2c6774] text-white rounded-xl hover:bg-[#1e4e56] font-semibold text-center">
              View History
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmptyState = ({ searchTerm, onRegister }) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <Users className="w-8 h-8 text-gray-300" />
    </div>
    <p className="text-gray-500 font-medium mb-1">{searchTerm ? 'No patients found' : 'No patients yet'}</p>
    <p className="text-sm text-gray-400">{searchTerm ? 'Try a different search' : 'Register a patient to get started'}</p>
    {!searchTerm && (
      <button onClick={onRegister} className="mt-4 px-5 py-2.5 bg-[#2c6774] text-white rounded-xl text-sm inline-flex items-center gap-2 font-semibold">
        <UserPlus size={15} /> Register First Patient
      </button>
    )}
  </div>
);

export default Patients;