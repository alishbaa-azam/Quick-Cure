import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Eye, Calendar, Clock, FileText, Pill, Loader, Stethoscope, User, Phone, Mail, Activity, Share2, Edit2, Download, Send, Printer } from 'lucide-react';
import { getDoctorPrescriptions, createPrescription, updatePrescription } from '../../api/prescriptionApi';

const PatientHistory = ({ selectedPatient, setActiveTab, doctorId }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [showViewPrescription, setShowViewPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const currentPatient = selectedPatient || {};

  const [formData, setFormData] = useState({
    patientName: currentPatient.name || '',
    patientAge: currentPatient.age || '',
    patientGender: currentPatient.gender || '',
    patientEmail: currentPatient.email || '',
    patientPhone: currentPatient.contact || '',
    diagnosis: '',
    medicines: [{ name: '', dosage: '', frequency: '', instructions: '' }],
    notes: '',
    followUpDate: '',
    _id: null,
  });

  useEffect(() => {
    if (currentPatient?.name) {
      setFormData(prev => ({
        ...prev,
        patientName: currentPatient.name || '',
        patientAge: currentPatient.age || '',
        patientGender: currentPatient.gender || '',
        patientEmail: currentPatient.email || '',
        patientPhone: currentPatient.contact || ''
      }));
      fetchPatientPrescriptions();
    } else {
      setLoading(false);
    }
  }, [currentPatient?.name, currentPatient?.email, currentPatient?.age, currentPatient?.gender, currentPatient?.contact]);

  const fetchPatientPrescriptions = async () => {
    setLoading(true);
    const result = await getDoctorPrescriptions(doctorId);
    if (result.success) {
      const data = Array.isArray(result.data) ? result.data : [];
      const filtered = data.filter(p => 
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitPrescription = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.medicines[0].name) {
      alert('Patient name and at least one medicine are required');
      return;
    }
    if (!doctorId) {
      alert('Doctor ID not found. Please log in again.');
      return;
    }
    const filteredMedicines = formData.medicines.filter(m => m.name.trim() !== '');
    if (filteredMedicines.length === 0) { alert('At least one medicine is required.'); return; }
    setSubmitting(true);
    
    const prescriptionData = {
      doctorId,
      patientId: currentPatient.id || currentPatient._id,
      patientName: formData.patientName,
      patientAge: formData.patientAge,
      patientGender: formData.patientGender,
      patientEmail: formData.patientEmail || currentPatient.email || '',
      patientPhone: formData.patientPhone,
      medicines: filteredMedicines,
      diagnosis: formData.diagnosis,
      notes: formData.notes,
      followUpDate: formData.followUpDate || undefined
    };

    const apiCall = isEditing ? updatePrescription(formData._id, prescriptionData) : createPrescription(prescriptionData);
    const result = await apiCall;

    if (result.success) {
      alert(`Prescription ${isEditing ? 'updated' : 'saved'} successfully!`);
      resetForm();
      fetchPatientPrescriptions();
      setIsEditing(false);
      setShowPrescriptionForm(false);
    } else {
      alert(result.error || `Failed to ${isEditing ? 'update' : 'save'} prescription`);
    }
    setSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      patientName: currentPatient.name || '',
      patientAge: currentPatient.age || '',
      patientGender: currentPatient.gender || '',
      patientEmail: currentPatient.email || '',
      patientPhone: currentPatient.contact || '',
      diagnosis: '',
      medicines: [{ name: '', dosage: '', frequency: '', instructions: '' }],
      notes: '',
      followUpDate: '',
      _id: null
    });
  };

  const handleEditPrescription = (p) => {
    setIsEditing(true);
    setSelectedPrescription(p);
    setFormData({
      _id: p._id,
      patientName: p.patientName || currentPatient.name || '',
      patientAge: p.patientAge || currentPatient.age || '',
      patientGender: p.patientGender || currentPatient.gender || '',
      patientEmail: p.patientEmail || currentPatient.email || '',
      patientPhone: p.patientPhone || currentPatient.contact || '',
      diagnosis: p.diagnosis || '',
      medicines: p.medicines && p.medicines.length > 0 ? p.medicines : [{ name: '', dosage: '', frequency: '', instructions: '' }],
      notes: p.notes || '',
      followUpDate: p.followUpDate ? new Date(p.followUpDate).toISOString().split('T')[0] : '',
    });
    setShowPrescriptionForm(true);
  };

  const handleViewPrescription = (p) => {
    setSelectedPrescription(p);
    setShowViewPrescription(true);
  };

  const handleDownloadPrescription = (p) => {
    const medicinesText = p.medicines?.map(m => 
      `${m.name}${m.dosage ? ` (${m.dosage})` : ''}${m.frequency ? ` - ${m.frequency}` : ''}${m.instructions ? ` - ${m.instructions}` : ''}`
    ).join('\n') || 'No medicines';

    const text = `QuickCure Digital Prescription
==============================
Patient: ${p.patientName}
Diagnosis: ${p.diagnosis || 'General Consultation'}
Date: ${formatDate(p.prescribedDate || p.createdAt)}

Medicines:
${medicinesText}

Notes: ${p.notes || 'N/A'}
Follow-up: ${p.followUpDate ? formatDate(p.followUpDate) : 'Not scheduled'}
==============================
Generated via QuickCure`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription_${p.patientName.replace(/\s+/g, '_')}_${new Date(p.prescribedDate || p.createdAt).toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendToPatient = async (p) => {
    const patientEmail = currentPatient.email || p.patientEmail;
    if (!patientEmail) {
      alert('Patient email is not available. Cannot send to patient dashboard.');
      return;
    }
    setSubmitting(true);
    try {
      const result = await updatePrescription(p._id, {
        patientName: p.patientName,
        patientAge: p.patientAge,
        patientGender: p.patientGender,
        patientPhone: p.patientPhone || '',
        patientEmail: patientEmail,
        medicines: p.medicines || [],
        diagnosis: p.diagnosis || '',
        notes: p.notes || '',
        followUpDate: p.followUpDate || ''
      });
      if (result.success) {
        alert('✅ Prescription sent to patient dashboard successfully!');
        fetchPatientPrescriptions();
      } else {
        alert(result.error || 'Failed to send prescription to patient.');
      }
    } catch (error) {
      console.error('Error sending prescription to patient:', error);
      alert('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSharePrescription = (p) => {
    if (!p) return;
    const medicinesText = p.medicines?.map(m => 
      `- ${m.name}${m.dosage ? ` (${m.dosage})` : ''}${m.frequency ? `, ${m.frequency}` : ''}`
    ).join('\n') || 'No medicines listed';
    const shareText = `*QuickCure Digital Prescription*\n\n*Patient:* ${p.patientName}\n*Diagnosis:* ${p.diagnosis || 'General'}\n\n*Medicines:*\n${medicinesText}\n\n*Notes:* ${p.notes || 'N/A'}\n*Date:* ${formatDate(p.prescribedDate || p.createdAt)}\n\nGenerated via QuickCure Portal`;
    if (navigator.share) {
      navigator.share({ title: `Prescription - ${p.patientName}`, text: shareText })
        .catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Prescription details copied to clipboard!');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return dateStr; }
  };

  if (!currentPatient.name) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium">No patient selected</p>
        <p className="text-sm text-gray-400">Select a patient from the Patients tab to view their history</p>
        <button 
          onClick={() => setActiveTab('patients')}
          className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm hover:bg-[#1e4e56] transition-colors"
        >
          Go to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('patients')}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back to patients"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center font-bold shadow-sm">
                {(currentPatient.name || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#174047]">{currentPatient.name || 'Unknown Patient'}</h2>
                <p className="text-sm text-gray-500">
                  {currentPatient.age ? `${currentPatient.age}y` : ''}{currentPatient.age && currentPatient.gender ? ' • ' : ''}{currentPatient.gender || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => { setIsEditing(false); resetForm(); setShowPrescriptionForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#174047] to-[#2c6774] text-white rounded-lg hover:from-[#2c6774] hover:to-[#174047] text-sm font-medium transition-all shadow-sm"
        >
          <Plus size={18} />
          <span>New Prescription</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Patient Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#174047] to-[#2c6774] p-4 text-white">
              <h3 className="font-semibold text-sm">Patient Information</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <User size={13} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Name</p>
                  <p className="text-sm font-medium text-gray-800">{currentPatient.name || 'Unknown'}</p>
                </div>
              </div>
              {currentPatient.email && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                    <Mail size={13} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{currentPatient.email}</p>
                  </div>
                </div>
              )}
              {currentPatient.contact && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Phone size={13} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Contact</p>
                    <p className="text-sm font-medium text-gray-800">{currentPatient.contact}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Activity size={13} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Age / Gender</p>
                  <p className="text-sm font-medium text-gray-800">{currentPatient.age || 'N/A'} / {currentPatient.gender || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prescription History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#174047] to-[#2c6774] px-4 py-3 text-white flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">Prescription History</h3>
                <p className="text-[11px] text-white/70">{prescriptions.length} prescription{prescriptions.length !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => { setIsEditing(false); resetForm(); setShowPrescriptionForm(true); }}
                className="px-3 py-1.5 bg-white/15 text-white rounded-lg text-[11px] font-medium hover:bg-white/25 transition-colors">
                + New Rx
              </button>
            </div>
            
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center py-12"><Loader className="animate-spin text-[#2c6774]" size={24} /></div>
              ) : prescriptions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Pill className="w-7 h-7 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium text-sm">No prescription history yet</p>
                  <p className="text-xs text-gray-400 mt-1">Click "New Prescription" to create the first one</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {prescriptions.map((p) => (
                    <div key={p._id} className="border border-gray-100 rounded-lg p-4 hover:border-[#2c6774]/30 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <div className="p-1 rounded-lg bg-[#2c6774]/10">
                              <Stethoscope size={12} className="text-[#2c6774]" />
                            </div>
                            <p className="font-semibold text-gray-800 text-sm truncate">
                              {p.diagnosis || (p.fileUrl ? 'Uploaded Prescription' : 'General Consultation')}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} className="text-gray-400" />
                              {formatDate(p.prescribedDate || p.createdAt)}
                            </span>
                            {p.patientEmail && (
                              <span className="flex items-center gap-1 text-emerald-600">
                                <Mail size={10} />
                                Sent
                              </span>
                            )}
                          </div>
                          {p.medicines?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {p.medicines.map((med, i) => (
                                <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium">
                                  {med.name}{med.dosage ? ` (${med.dosage})` : ''}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button onClick={() => handleDownloadPrescription(p)}
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                            <Download size={14} />
                          </button>
                          <button onClick={() => handleEditPrescription(p)}
                            className="p-1.5 text-[#2c6774] hover:bg-[#2c6774]/10 rounded-lg transition-colors" title="Edit">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleSendToPatient(p)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Send to Patient">
                            <Send size={14} />
                          </button>
                          <button onClick={() => handleSharePrescription(p)}
                            className="p-1.5 text-[#2c6774] hover:bg-[#2c6774]/10 rounded-lg transition-colors" title="Share">
                            <Share2 size={14} />
                          </button>
                          <button onClick={() => handleViewPrescription(p)}
                            className="px-2.5 py-1.5 text-[11px] bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors flex items-center gap-1">
                            <Eye size={11} />
                            View
                          </button>
                        </div>
                      </div>
                      {p.fileUrl && (
                        <div className="mt-2 pt-2 border-t border-gray-50">
                          <a href={`http://localhost:5000${p.fileUrl}`} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] text-blue-600 hover:text-blue-700 font-medium">
                            <FileText size={12} /> View attached file
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New/Edit Prescription Modal */}
      {showPrescriptionForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b flex justify-between items-center px-5 py-4 z-10">
              <h3 className="text-base font-bold text-[#174047]">{isEditing ? 'Edit Prescription' : 'New Prescription'}</h3>
              <button onClick={() => { setShowPrescriptionForm(false); if(!isEditing) resetForm(); }} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmitPrescription} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Patient Name *', name: 'patientName', required: true },
                  { label: 'Age', name: 'patientAge' },
                  { label: 'Gender', name: 'patientGender' },
                  { label: 'Phone', name: 'patientPhone' },
                  { label: 'Email', name: 'patientEmail', type: 'email' },
                ].map(({ label, name, required, type }) => (
                  <div key={name}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                    <input type={type || 'text'} name={name} value={formData[name] || ''} onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                      readOnly={name !== 'diagnosis' && name !== 'notes' && name !== 'followUpDate'} required={required} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Diagnosis</label>
                <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleFormChange}
                  placeholder="e.g., Hypertension, Diabetes"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]" />
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-600">Medicines *</label>
                  <button type="button" onClick={addMedicine} className="text-[11px] px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 font-medium">+ Add Medicine</button>
                </div>
                {formData.medicines.map((med, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-3 mb-2 bg-gray-50/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-semibold text-gray-500">#{index + 1}</span>
                      {formData.medicines.length > 1 && (
                        <button type="button" onClick={() => removeMedicine(index)} className="text-[11px] text-red-500 hover:text-red-700 font-medium">Remove</button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input placeholder="Medicine name *" value={med.name} onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]" required={index === 0} />
                      <input placeholder="Dosage (e.g., 10mg)" value={med.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]" />
                      <input placeholder="Frequency" value={med.frequency} onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]" />
                      <input placeholder="Instructions" value={med.instructions} onChange={(e) => handleMedicineChange(index, 'instructions', e.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]" />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Additional Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleFormChange} placeholder="Enter additional instructions"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774] h-20" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Follow-up Date</label>
                <input type="date" name="followUpDate" value={formData.followUpDate} onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]" />
              </div>

              <button type="submit" disabled={submitting}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-lg hover:from-[#1e4e56] hover:to-[#0f2c33] text-sm font-medium disabled:opacity-50 transition-all">
                {submitting ? <Loader className="animate-spin" size={16} /> : <Plus size={16} />}
                {submitting ? 'Saving...' : (isEditing ? 'Update Prescription' : 'Save Prescription')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Prescription Modal */}
      {showViewPrescription && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b flex items-center justify-between px-5 py-4">
              <h3 className="text-base font-bold text-[#174047]">Prescription Details</h3>
              <div className="flex items-center gap-1">
                <button onClick={() => handleDownloadPrescription(selectedPrescription)}
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                  <Download size={16} />
                </button>
                <button onClick={() => handleSharePrescription(selectedPrescription)}
                  className="p-1.5 text-[#2c6774] hover:bg-[#2c6774]/10 rounded-lg transition-colors" title="Share">
                  <Share2 size={16} />
                </button>
                <button onClick={() => setShowViewPrescription(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {selectedPrescription.fileUrl ? (
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Uploaded Prescription File</p>
                  <a href={`http://localhost:5000${selectedPrescription.fileUrl}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <FileText size={14} /> View File
                  </a>
                  {selectedPrescription.notes && <p className="text-xs text-blue-700 mt-2">Notes: {selectedPrescription.notes}</p>}
                </div>
              ) : (
                <>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div><p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Patient</p><p className="font-semibold text-gray-800 text-sm">{selectedPrescription.patientName}</p></div>
                      {selectedPrescription.patientPhone && <div><p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Phone</p><p className="font-semibold text-gray-800 text-sm">{selectedPrescription.patientPhone}</p></div>}
                    </div>
                  </div>
                  {selectedPrescription.diagnosis && (
                    <div><p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Diagnosis</p><p className="font-semibold text-gray-800 text-sm">{selectedPrescription.diagnosis}</p></div>
                  )}
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-1.5">Medicines ({selectedPrescription.medicines?.length || 0})</p>
                    <div className="space-y-1.5">
                      {selectedPrescription.medicines?.map((med, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <p className="font-semibold text-gray-800 text-sm">{med.name}</p>
                          <div className="flex flex-wrap gap-2 text-[11px] text-gray-600 mt-1">
                            {med.dosage && <span className="bg-white px-2 py-0.5 rounded border">{med.dosage}</span>}
                            {med.frequency && <span className="bg-white px-2 py-0.5 rounded border">{med.frequency}</span>}
                            {med.instructions && <span className="bg-white px-2 py-0.5 rounded border">{med.instructions}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedPrescription.notes && (
                    <div><p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Notes</p><p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{selectedPrescription.notes}</p></div>
                  )}
                  {selectedPrescription.followUpDate && (
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <p className="text-[10px] text-amber-600 font-medium uppercase tracking-wide">Follow-up</p>
                      <p className="font-semibold text-amber-800 text-sm">{formatDate(selectedPrescription.followUpDate)}</p>
                    </div>
                  )}
                </>
              )}
              <div className="pt-2 border-t text-[11px] text-gray-400">
                Prescribed on: {formatDate(selectedPrescription.prescribedDate || selectedPrescription.createdAt)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;