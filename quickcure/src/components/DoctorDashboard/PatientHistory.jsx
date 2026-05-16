import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Plus, X, Eye, Calendar, Clock, FileText, Pill } from 'lucide-react';
import { getDoctorPrescriptions } from '../../api/prescriptionApi';

const PatientHistory = ({ selectedPatient, setActiveTab }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [showViewPrescription, setShowViewPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showCurrentMeds, setShowCurrentMeds] = useState(false);
  
  const currentPatient = selectedPatient || {};

  const [formData, setFormData] = useState({
    patientName: currentPatient.name || '',
    patientAge: currentPatient.age || '',
    patientGender: currentPatient.gender || '',
    patientPhone: currentPatient.contact || '',
    diagnosis: '',
    medicines: [{ name: '', dosage: '', frequency: '', instructions: '' }],
    notes: '',
    followUpDate: ''
  });

  useEffect(() => {
    if (currentPatient?.name) {
      setFormData(prev => ({
        ...prev,
        patientName: currentPatient.name || '',
        patientAge: currentPatient.age || '',
        patientGender: currentPatient.gender || '',
        patientPhone: currentPatient.contact || ''
      }));
      fetchPatientPrescriptions();
    } else {
      setLoading(false);
    }
  }, [currentPatient?.name, currentPatient?.email]);

  const fetchPatientPrescriptions = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const result = await getDoctorPrescriptions(user.id || user._id);
    if (result.success) {
      const filtered = result.data.filter(p => 
        p.patientName?.toLowerCase() === currentPatient.name?.toLowerCase() ||
        p.patientPhone === currentPatient.contact
      );
      setPrescriptions(filtered);
    }
    setLoading(false);
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...formData.medicines];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, medicines: updated }));
  };

  const addMedicine = () => {
    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: '', frequency: '', instructions: '' }]
    }));
  };

  const removeMedicine = (index) => {
    if (formData.medicines.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const handleViewPrescription = (p) => {
    setSelectedPrescription(p);
    setShowViewPrescription(true);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button 
              onClick={() => setActiveTab('patients')}
              className="lg:hidden p-1 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Patient History</h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            {currentPatient.name || 'Unknown Patient'}
          </p>
        </div>
        <button 
          onClick={() => setShowPrescriptionForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#174047] text-white rounded-lg hover:bg-[#2c6774] whitespace-nowrap"
        >
          <Plus size={18} />
          New Prescription
        </button>
      </div>

      {!currentPatient.name ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          <FileText className="mx-auto w-16 h-16 mb-4 text-gray-300" />
          <p>No patient selected. Select a patient from the Patients tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Patient Info */}
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input value={currentPatient.name || ''} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input value={currentPatient.email || 'N/A'} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input value={currentPatient.contact || 'N/A'} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age / Gender</label>
                  <input value={`${currentPatient.age || 'N/A'} / ${currentPatient.gender || 'N/A'}`} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600 text-sm" />
                </div>
              </div>
            </div>

            {/* Prescription History */}
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4">Prescription History</h3>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2c6774]"></div>
                </div>
              ) : prescriptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Pill className="mx-auto w-12 h-12 mb-3 text-gray-300" />
                  <p className="text-sm">No prescription history yet</p>
                  <p className="text-xs text-gray-400 mt-1">Create a prescription to start tracking</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {prescriptions.map((p) => (
                    <div key={p._id} className="border rounded-lg p-4 hover:border-[#2c6774] transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">{p.diagnosis || 'General Consultation'}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar size={12} />
                            {formatDate(p.prescribedDate || p.createdAt)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleViewPrescription(p)}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 bg-[#2c6774] text-white rounded hover:bg-[#1e4e56]"
                        >
                          <Eye size={12} />
                          View
                        </button>
                      </div>
                      {p.medicines?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {p.medicines.map((med, i) => (
                            <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                              {med.name} {med.dosage ? `(${med.dosage})` : ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowPrescriptionForm(true)}
                  className="w-full p-3 bg-[#174047] text-white rounded-lg hover:bg-[#2c6774] flex items-center justify-center gap-2 text-sm"
                >
                  <Plus size={18} />
                  New Prescription
                </button>
                <button
                  onClick={() => setActiveTab('prescriptions')}
                  className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 text-sm"
                >
                  <FileText size={18} />
                  All Prescriptions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Prescription Modal */}
      {showViewPrescription && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#174047]">Prescription Details</h3>
              <button onClick={() => setShowViewPrescription(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-medium">{selectedPrescription.patientName}</p>
              </div>
              {selectedPrescription.diagnosis && (
                <div>
                  <p className="text-sm text-gray-500">Diagnosis</p>
                  <p className="font-medium">{selectedPrescription.diagnosis}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 mb-2">Medicines ({selectedPrescription.medicines?.length || 0})</p>
                <div className="space-y-2">
                  {selectedPrescription.medicines?.map((med, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-sm">{med.name}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
                        {med.dosage && <span>Dosage: {med.dosage}</span>}
                        {med.frequency && <span>• {med.frequency}</span>}
                        {med.instructions && <span>• {med.instructions}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {selectedPrescription.notes && (
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-sm">{selectedPrescription.notes}</p>
                </div>
              )}
              {selectedPrescription.followUpDate && (
                <div>
                  <p className="text-sm text-gray-500">Follow-up</p>
                  <p className="text-sm font-medium">{formatDate(selectedPrescription.followUpDate)}</p>
                </div>
              )}
              <div className="pt-3 border-t text-xs text-gray-400">
                Prescribed: {formatDate(selectedPrescription.prescribedDate || selectedPrescription.createdAt)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;