import React, { useState, useEffect } from 'react';
import { FilePlus, Clock, Pill, User, Loader } from 'lucide-react';
import { createPrescription, getDoctorPrescriptions } from '../../api/prescriptionApi';

const Prescriptions = ({ doctorId }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientPhone: '',
    diagnosis: '',
    medicines: [{ name: '', dosage: '', frequency: '', instructions: '' }],
    notes: '',
    followUpDate: ''
  });

  useEffect(() => {
    loadPrescriptions();
  }, [doctorId]);

  const loadPrescriptions = async () => {
    setLoading(true);
    const result = await getDoctorPrescriptions(doctorId);
    if (result.success) {
      setPrescriptions(Array.isArray(result.data) ? result.data : []);
    }
    setLoading(false);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value };
    setFormData(prev => ({ ...prev, medicines: updatedMedicines }));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.medicines[0].name) {
      alert('Patient name and at least one medicine are required');
      return;
    }

    setSubmitting(true);
    const result = await createPrescription({
      doctorId,
      patientName: formData.patientName,
      patientAge: formData.patientAge,
      patientGender: formData.patientGender,
      patientPhone: formData.patientPhone,
      medicines: formData.medicines.filter(m => m.name.trim()),
      diagnosis: formData.diagnosis,
      notes: formData.notes,
      followUpDate: formData.followUpDate || undefined
    });

    if (result.success) {
      alert('Prescription saved successfully!');
      setFormData({
        patientName: '',
        patientAge: '',
        patientGender: '',
        patientPhone: '',
        diagnosis: '',
        medicines: [{ name: '', dosage: '', frequency: '', instructions: '' }],
        notes: '',
        followUpDate: ''
      });
      loadPrescriptions();
    } else {
      alert(result.error || 'Failed to save prescription');
    }
    setSubmitting(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Prescriptions</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Prescription Form */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Create New Prescription</h3>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="patientGender"
                  value={formData.patientGender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="patientPhone"
                  value={formData.patientPhone}
                  onChange={handleChange}
                  placeholder="03XXXXXXXXX"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder="e.g., Hypertension, Diabetes"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
              />
            </div>

            {/* Medicines Section */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Medicines *</label>
                <button
                  type="button"
                  onClick={addMedicine}
                  className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  + Add Medicine
                </button>
              </div>
              {formData.medicines.map((med, index) => (
                <div key={index} className="border rounded-lg p-3 mb-2 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">Medicine #{index + 1}</span>
                    {formData.medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicine(index)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Medicine name *"
                      value={med.name}
                      onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                      className="px-3 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                      required={index === 0}
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g., 10mg)"
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                      className="px-3 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                    />
                    <input
                      type="text"
                      placeholder="Frequency (e.g., Once daily)"
                      value={med.frequency}
                      onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                      className="px-3 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                    />
                    <input
                      type="text"
                      placeholder="Instructions (e.g., Take with food)"
                      value={med.instructions}
                      onChange={(e) => handleMedicineChange(index, 'instructions', e.target.value)}
                      className="px-3 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter additional instructions"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] h-24 text-sm md:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm md:text-base font-medium disabled:opacity-50"
            >
              {submitting ? <Loader className="animate-spin" size={18} /> : <FilePlus size={18} />}
              {submitting ? 'Saving...' : 'Save Prescription'}
            </button>
          </form>
        </div>

        {/* Recent Prescriptions */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Recent Prescriptions</h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2c6774]"></div>
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Pill className="mx-auto w-12 h-12 mb-3 text-gray-300" />
              <p>No prescriptions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {prescriptions.slice(0, 10).map((prescription) => (
                <div key={prescription._id} className="border rounded-lg p-4 hover:border-[#2c6774] transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        <User size={14} />
                        {prescription.patientName}
                      </h4>
                      {(prescription.patientAge || prescription.patientGender) && (
                        <p className="text-gray-600 text-xs mt-0.5">
                          {prescription.patientAge ? `${prescription.patientAge} years` : ''}
                          {prescription.patientAge && prescription.patientGender ? ' • ' : ''}
                          {prescription.patientGender || ''}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(prescription.prescribedDate || prescription.createdAt)}
                    </span>
                  </div>
                  
                  {prescription.diagnosis && (
                    <p className="text-xs text-[#2c6774] mt-2 font-medium">Diagnosis: {prescription.diagnosis}</p>
                  )}
                  
                  <div className="mt-2 space-y-1">
                    {prescription.medicines?.map((med, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Pill size={12} className="text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-gray-700">{med.name}</span>
                        {med.dosage && <span className="text-gray-500">{med.dosage}</span>}
                        {med.frequency && <span className="text-gray-400 text-xs">• {med.frequency}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
