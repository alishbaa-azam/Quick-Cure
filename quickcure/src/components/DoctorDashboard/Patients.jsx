import React, { useState, useEffect } from 'react';
import { Search, Users, UserPlus, Phone, Mail, Calendar, ChevronRight, X, User, Clock } from 'lucide-react';
import { getDoctorPatients } from '../../api/doctorApi';
import { registerPatient } from '../../api/patientApi';

const Patients = ({ doctorId, setActiveTab, setSelectedPatient }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerMsg, setRegisterMsg] = useState('');
  const [registerMsgType, setRegisterMsgType] = useState('');
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    mobile: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    fetchPatients();
  }, [doctorId]);

  const fetchPatients = async () => {
    setLoading(true);
    const result = await getDoctorPatients(doctorId);
    if (result.success) {
      setPatients(Array.isArray(result.data) ? result.data : []);
    }
    setLoading(false);
  };

  const filteredPatients = patients.filter(patient => 
    (patient.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.contact || '').includes(searchTerm) ||
    (patient.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('patient-history');
  };

  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.email || !newPatient.mobile) {
      setRegisterMsg('Name, email, and mobile are required');
      setRegisterMsgType('error');
      return;
    }
    setRegistering(true);
    setRegisterMsg('');

    const result = await registerPatient({
      name: newPatient.name,
      email: newPatient.email,
      mobile: newPatient.mobile,
      age: newPatient.age || undefined,
      gender: newPatient.gender || undefined
    });

    if (result.success) {
      setRegisterMsg(result.isNew 
        ? 'Patient registered successfully!' 
        : 'Patient already exists in system.'
      );
      setRegisterMsgType('success');
      setNewPatient({ name: '', email: '', mobile: '', age: '', gender: '' });
      fetchPatients();
      setTimeout(() => {
        setShowRegisterModal(false);
        setRegisterMsg('');
      }, 1500);
    } else {
      setRegisterMsg(result.error || 'Failed to register patient');
      setRegisterMsgType('error');
    }
    setRegistering(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#174047]">Patients</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full sm:w-48 md:w-56 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
            />
          </div>
          <button 
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm font-medium transition-colors shadow-sm"
          >
            <UserPlus size={16} />
            <span>Register Patient</span>
          </button>
        </div>
      </div>

      {/* Register Patient Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-bold text-[#174047]">Register New Patient</h3>
              <button 
                onClick={() => { setShowRegisterModal(false); setRegisterMsg(''); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleRegisterPatient} className="p-6 space-y-5">
              {registerMsg && (
                <div className={`p-3 rounded-lg text-sm font-medium ${
                  registerMsgType === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {registerMsg}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
                  placeholder="Enter patient name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
                  placeholder="patient@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newPatient.mobile}
                  onChange={(e) => setNewPatient(p => ({ ...p, mobile: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
                  placeholder="03XXXXXXXXX"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age</label>
                  <input
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient(p => ({ ...p, age: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
                    placeholder="Years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient(p => ({ ...p, gender: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm bg-white"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowRegisterModal(false); setRegisterMsg(''); }}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={registering}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-lg hover:from-[#1e4e56] hover:to-[#0f2c33] text-sm font-medium disabled:opacity-50 transition-all duration-300 shadow-sm"
                >
                  {registering ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium text-base mb-1">
              {searchTerm ? 'No patients found' : 'No patients yet'}
            </p>
            <p className="text-sm text-gray-400">
              {searchTerm ? 'Try adjusting your search term' : 'Register a new patient to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowRegisterModal(true)}
                className="mt-4 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm inline-flex items-center gap-2 transition-colors"
              >
                <UserPlus size={16} />
                Register First Patient
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider">Patient</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider">Contact</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Visits</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Last Visit</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.map((patient, index) => (
                  <tr key={patient.id || patient.contact || patient.email || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                          {(patient.name || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{patient.name || 'Unknown'}</p>
                          {(patient.age || patient.gender) && (
                            <p className="text-xs text-gray-400">
                              {patient.age ? `${patient.age}y` : ''}{patient.age && patient.gender ? ' • ' : ''}{patient.gender || ''}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Phone size={13} className="text-gray-400 flex-shrink-0" />
                        <span>{patient.contact || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Mail size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{patient.email || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {patient.totalVisits || 1}
                      </span>
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                        <span>{patient.lastVisit || patient.date || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleViewHistory(patient)}
                        className="px-3 py-1.5 text-xs bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors inline-flex items-center gap-1"
                      >
                        <span>View History</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredPatients.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">
              {searchTerm ? 'No patients found' : 'No patients yet'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm ? 'Try a different search' : 'Register a new patient'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowRegisterModal(true)}
                className="mt-4 px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm inline-flex items-center gap-2 transition-colors"
              >
                <UserPlus size={16} />
                Register Patient
              </button>
            )}
          </div>
        ) : (
          filteredPatients.map((patient, index) => (
            <div key={patient.id || patient.contact || patient.email || index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {(patient.name || '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{patient.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500 truncate">{patient.contact || 'No contact'}</p>
                  </div>
                </div>
                {patient.totalVisits && (
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {patient.totalVisits} visit{patient.totalVisits !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                {patient.age && <span>{patient.age}y</span>}
                {patient.gender && <span>{patient.gender}</span>}
                {patient.email && (
                  <span className="truncate">{patient.email}</span>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-50">
                <button 
                  onClick={() => handleViewHistory(patient)}
                  className="w-full px-3 py-2 text-xs bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors text-center"
                >
                  View History
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Patients;