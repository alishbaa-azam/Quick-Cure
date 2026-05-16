import React, { useState, useEffect } from 'react';
import { Search, Users, UserPlus, Phone, Mail, Calendar } from 'lucide-react';
import { getDoctorPatients } from '../../api/doctorApi';
import { registerPatient } from '../../api/patientApi';

const Patients = ({ doctorId, setActiveTab, setSelectedPatient }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerMsg, setRegisterMsg] = useState('');
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
    patient.contact?.includes(searchTerm) || 
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('patient-history');
  };

  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.email || !newPatient.mobile) {
      setRegisterMsg('Name, email, and mobile are required');
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
      setNewPatient({ name: '', email: '', mobile: '', age: '', gender: '' });
      fetchPatients();
      setTimeout(() => {
        setShowRegisterModal(false);
        setRegisterMsg('');
      }, 1500);
    } else {
      setRegisterMsg(result.error || 'Failed to register patient');
    }
    setRegistering(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c6774]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Patients</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
            />
          </div>
          <button 
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm whitespace-nowrap"
          >
            <UserPlus size={16} />
            Register Patient
          </button>
        </div>
      </div>

      {/* Register Patient Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#174047]">Register New Patient</h3>
                <button 
                  onClick={() => { setShowRegisterModal(false); setRegisterMsg(''); }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleRegisterPatient} className="p-6 space-y-4">
              {registerMsg && (
                <div className={`p-3 rounded-lg text-sm ${
                  registerMsg.includes('successfully') || registerMsg.includes('already exists')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {registerMsg}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
                  placeholder="Enter patient name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
                  placeholder="patient@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                <input
                  type="text"
                  value={newPatient.mobile}
                  onChange={(e) => setNewPatient(p => ({ ...p, mobile: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
                  placeholder="03XXXXXXXXX"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient(p => ({ ...p, age: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient(p => ({ ...p, gender: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
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
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={registering}
                  className="flex-1 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm disabled:opacity-50"
                >
                  {registering ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Users className="mx-auto w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">
              {searchTerm ? 'No patients found matching your search' : 'No patients yet'}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              {searchTerm ? 'Try a different search term' : 'Register a new patient or wait for appointment bookings'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowRegisterModal(true)}
                className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm inline-flex items-center gap-2"
              >
                <UserPlus size={16} />
                Register First Patient
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-full inline-block align-middle">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Name</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Contact</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Email</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Visits</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Last Visit</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient, index) => (
                    <tr key={patient.id || patient.contact || index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-3 md:py-4 md:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {patient.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-medium text-gray-800">{patient.name || 'Unknown'}</p>
                            {patient.age && patient.gender && (
                              <p className="text-xs text-gray-500">{patient.age}y • {patient.gender}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6">
                        <div className="flex items-center gap-1 text-xs md:text-sm">
                          <Phone size={12} className="text-gray-400" />
                          {patient.contact || 'N/A'}
                        </div>
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6">
                        <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600">
                          <Mail size={12} className="text-gray-400" />
                          {patient.email || 'N/A'}
                        </div>
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {patient.totalVisits || 1}
                        </span>
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6">
                        <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600">
                          <Calendar size={12} className="text-gray-400" />
                          {patient.lastVisit || 'N/A'}
                        </div>
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">
                        <button 
                          onClick={() => handleViewHistory(patient)}
                          className="px-3 py-1 text-xs md:text-sm bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] whitespace-nowrap"
                        >
                          View History
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;