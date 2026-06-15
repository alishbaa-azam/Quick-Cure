import React, { useState, useEffect } from 'react';
import { FaFilePrescription, FaDownload, FaEye, FaCalendarAlt, FaUserMd, FaPills, FaSpinner, FaShareAlt, FaClipboard } from 'react-icons/fa';
import { getPatientPrescriptions } from '../../api/prescriptionApi';

const MyPrescriptions = ({ refreshTrigger }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, [refreshTrigger]);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const email = user.email || '';
      
      if (!email) {
        setPrescriptions([]);
        setLoading(false);
        return;
      }

      const result = await getPatientPrescriptions(email);
      if (result.success) {
        setPrescriptions(Array.isArray(result.data) ? result.data : []);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      });
    } catch { return dateStr; }
  };

  const handleViewPrescription = (p) => {
    setSelectedPrescription(p);
    setShowModal(true);
  };

  const handleDownloadPrescription = (p) => {
    const medicinesText = p.medicines?.map(m => 
      `${m.name}${m.dosage ? ` (${m.dosage})` : ''}${m.frequency ? ` - ${m.frequency}` : ''}${m.instructions ? ` - ${m.instructions}` : ''}`
    ).join('\n') || 'No medicines';

    const prescriptionText = `QuickCure Digital Prescription
==============================
Patient: ${p.patientName}
Doctor: ${p.doctor?.name || 'Doctor'}
Speciality: ${p.doctor?.speciality || 'General'}
Diagnosis: ${p.diagnosis || 'General Consultation'}
Date: ${formatDate(p.prescribedDate || p.createdAt)}

Medicines:
${medicinesText}

Notes: ${p.notes || 'N/A'}
Follow-up: ${p.followUpDate ? formatDate(p.followUpDate) : 'Not scheduled'}
==============================
Generated via QuickCure`;

    const blob = new Blob([prescriptionText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription_${p.patientName.replace(/\s+/g, '_')}_${new Date(p.prescribedDate || p.createdAt).toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSharePrescription = (p) => {
    const medicinesText = p.medicines?.map(m => 
      `- ${m.name}${m.dosage ? ` (${m.dosage})` : ''}${m.frequency ? `, ${m.frequency}` : ''}`
    ).join('\n') || 'No medicines';

    const shareText = `*QuickCure Prescription*\nPatient: ${p.patientName}\nDoctor: ${p.doctor?.name || 'Doctor'}\nDiagnosis: ${p.diagnosis || 'General'}\n\nMedicines:\n${medicinesText}\n\nDate: ${formatDate(p.prescribedDate || p.createdAt)}`;

    if (navigator.share) {
      navigator.share({ title: `Prescription - ${p.patientName}`, text: shareText })
        .catch(err => console.log('Share cancelled'));
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Prescription copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#174047' }}>
              My Prescriptions
            </h2>
            <p className="text-sm mt-1" style={{ color: '#5c878f' }}>
              View and download your prescriptions from doctors
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(44, 103, 116, 0.1)' }}>
            <FaFilePrescription className="text-2xl" style={{ color: '#2c6774' }} />
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-3xl" style={{ color: '#2c6774' }} />
          </div>
        ) : prescriptions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FaFilePrescription className="text-3xl" style={{ color: '#5c878f' }} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescriptions Yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your doctor's prescriptions will appear here once prescribed
            </p>
            <p className="text-xs text-gray-400">
              After a doctor creates a prescription, it will automatically be available for download
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((p) => (
              <div key={p._id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(44, 103, 116, 0.1)' }}>
                        <FaUserMd className="text-sm" style={{ color: '#2c6774' }} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          Dr. {p.doctor?.name || 'Doctor'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {p.doctor?.speciality || 'General Practitioner'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt size={10} />
                        {formatDate(p.prescribedDate || p.createdAt)}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(44, 103, 116, 0.1)', color: '#2c6774' }}>
                        {p.diagnosis || 'General'}
                      </span>
                    </div>

                    {p.medicines?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.medicines.slice(0, 3).map((med, i) => (
                          <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                            {med.name}
                          </span>
                        ))}
                        {p.medicines.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                            +{p.medicines.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {p.followUpDate && (
                      <p className="text-xs mt-2" style={{ color: '#d97706' }}>
                        Follow-up: {formatDate(p.followUpDate)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleViewPrescription(p)}
                      className="px-3 py-2 text-xs bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors flex items-center gap-1.5"
                    >
                      <FaEye size={11} />
                      View
                    </button>
                    <button
                      onClick={() => handleDownloadPrescription(p)}
                      className="px-3 py-2 text-xs border border-[#2c6774] text-[#2c6774] rounded-lg hover:bg-[#2c6774]/5 transition-colors flex items-center gap-1.5"
                    >
                      <FaDownload size={11} />
                      Download
                    </button>
                    <button
                      onClick={() => handleSharePrescription(p)}
                      className="p-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Share"
                    >
                      <FaShareAlt size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Prescription Modal */}
      {showModal && selectedPrescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b flex justify-between items-center p-5">
              <h3 className="text-lg font-bold" style={{ color: '#174047' }}>Prescription Details</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Doctor Info */}
              {selectedPrescription.doctor && (
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(44, 103, 116, 0.15)' }}>
                    <FaUserMd className="text-lg" style={{ color: '#2c6774' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Dr. {selectedPrescription.doctor.name}</p>
                    <p className="text-xs text-gray-500">{selectedPrescription.doctor.speciality || 'Doctor'}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Patient</p>
                  <p className="font-semibold text-gray-800">{selectedPrescription.patientName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Date</p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(selectedPrescription.prescribedDate || selectedPrescription.createdAt)}
                  </p>
                </div>
              </div>

              {selectedPrescription.diagnosis && (
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Diagnosis</p>
                  <p className="font-semibold text-gray-800">{selectedPrescription.diagnosis}</p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500 font-medium mb-2">
                  Medicines ({selectedPrescription.medicines?.length || 0})
                </p>
                <div className="space-y-2">
                  {selectedPrescription.medicines?.map((med, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                        <FaPills className="text-xs" style={{ color: '#2c6774' }} />
                        {med.name}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1 ml-5">
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
                  <p className="text-xs text-gray-500 font-medium mb-1">Notes</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{selectedPrescription.notes}</p>
                </div>
              )}

              {selectedPrescription.followUpDate && (
                <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                  <p className="text-xs font-medium" style={{ color: '#d97706' }}>Follow-up Date</p>
                  <p className="font-semibold" style={{ color: '#92400e' }}>
                    {formatDate(selectedPrescription.followUpDate)}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-3 border-t">
                <button
                  onClick={() => handleDownloadPrescription(selectedPrescription)}
                  className="flex-1 px-4 py-2.5 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#1e4e56] transition-colors flex items-center justify-center gap-2"
                >
                  <FaDownload size={14} />
                  Download
                </button>
                <button
                  onClick={() => handleSharePrescription(selectedPrescription)}
                  className="flex-1 px-4 py-2.5 border border-[#2c6774] text-[#2c6774] rounded-lg text-sm font-medium hover:bg-[#2c6774]/5 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShareAlt size={14} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPrescriptions;