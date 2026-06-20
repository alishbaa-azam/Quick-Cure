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
    const doctorName = p.doctor?.name || 'Doctor';
    const dateStr = formatDate(p.prescribedDate || p.createdAt);
    const followUpStr = p.followUpDate ? formatDate(p.followUpDate) : 'Not scheduled';

    const medicinesHtml = p.medicines?.map((m, i) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 8px 12px; font-size: 14px; color: #374151;">${i + 1}</td>
        <td style="padding: 8px 12px; font-size: 14px; color: #111827; font-weight: 500;">${m.name}</td>
        <td style="padding: 8px 12px; font-size: 14px; color: #6b7280;">${m.dosage || '-'}</td>
        <td style="padding: 8px 12px; font-size: 14px; color: #6b7280;">${m.frequency || '-'}</td>
        <td style="padding: 8px 12px; font-size: 14px; color: #6b7280;">${m.instructions || '-'}</td>
      </tr>
    `).join('') || '<tr><td colspan="5" style="padding: 20px; text-align: center; color: #9ca3af; font-size: 14px;">No medicines prescribed</td></tr>';

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) { alert('Please allow popups to download the prescription.'); return; }

    printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>QuickCure Prescription - ${p.patientName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 0; background: #fff; }
    .header {
      background: linear-gradient(135deg, #0f2c33 0%, #174047 50%, #2c6774 100%);
      padding: 30px 35px; color: white; display: flex; align-items: center; gap: 20px;
    }
    .header-logo { width: 60px; height: 60px; background: rgba(255,255,255,0.15); border-radius: 14px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2); flex-shrink: 0; }
    .header-logo span { font-size: 22px; font-weight: 800; }
    .header-info h1 { font-size: 22px; font-weight: 700; }
    .header-info p { font-size: 12px; opacity: 0.7; margin-top: 2px; }
    .badge-green { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; background: rgba(52, 211, 153, 0.2); color: #6ee7b7; }
    .body { padding: 30px 35px; }
    .prescription-title { font-size: 18px; font-weight: 700; color: #111827; padding-bottom: 15px; border-bottom: 2px solid #0f2c33; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
    .prescription-title span { font-size: 13px; font-weight: 400; color: #6b7280; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
    .info-item { padding: 12px 16px; background: #f9fafb; border-radius: 10px; border-left: 4px solid #2c6774; }
    .info-item .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; font-weight: 600; margin-bottom: 4px; }
    .info-item .value { font-size: 15px; font-weight: 600; color: #111827; }
    .diagnosis-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px 18px; margin-bottom: 25px; }
    .diagnosis-box .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #16a34a; font-weight: 600; }
    .diagnosis-box .value { font-size: 16px; font-weight: 600; color: #15803d; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
    thead th { background: #0f2c33; color: white; padding: 10px 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; }
    thead th:first-child { border-radius: 8px 0 0 0; }
    thead th:last-child { border-radius: 0 8px 0 0; }
    .notes-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 14px 18px; margin-bottom: 25px; }
    .notes-box .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #d97706; font-weight: 600; margin-bottom: 4px; }
    .notes-box .value { font-size: 14px; color: #92400e; line-height: 1.5; }
    .follow-up { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 14px 18px; margin-bottom: 25px; }
    .follow-up .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #0284c7; font-weight: 600; }
    .follow-up .value { font-size: 15px; font-weight: 600; color: #0369a1; }
    .footer { border-top: 1px solid #e5e7eb; padding: 20px 35px; text-align: center; font-size: 11px; color: #9ca3af; }
    .footer strong { color: #6b7280; }
    @media print { body { background: white; } }
  </style>
</head>
<body>
  <div style="max-width: 800px; margin: 0 auto; background: #fff;">
    <div class="header">
      <div class="header-logo"><span>QC</span></div>
      <div class="header-info">
        <h1>QuickCure Digital Prescription</h1>
        <p>Patient Dashboard &bull; ${dateStr}</p>
      </div>
      <div style="margin-left: auto; text-align: right;">
        <span class="badge-green">&#10003; Verified</span>
      </div>
    </div>
    <div class="body">
      <div class="prescription-title">Medical Prescription <span>Rx #${p._id ? p._id.slice(-6).toUpperCase() : 'N/A'}</span></div>
      <div class="info-grid">
        <div class="info-item"><div class="label">Patient Name</div><div class="value">${p.patientName}</div></div>
        <div class="info-item"><div class="label">Doctor</div><div class="value">Dr. ${doctorName}</div></div>
        <div class="info-item"><div class="label">Age / Gender</div><div class="value">${p.patientAge || 'N/A'} / ${p.patientGender || 'N/A'}</div></div>
        <div class="info-item"><div class="label">Date</div><div class="value">${dateStr}</div></div>
      </div>
      <div class="diagnosis-box"><div class="label">Diagnosis</div><div class="value">${p.diagnosis || 'General Consultation'}</div></div>
      <table>
        <thead><tr><th>#</th><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Instructions</th></tr></thead>
        <tbody>${medicinesHtml}</tbody>
      </table>
      ${p.notes ? `<div class="notes-box"><div class="label">Additional Notes</div><div class="value">${p.notes}</div></div>` : ''}
      <div class="follow-up"><div class="label">Follow-up Date</div><div class="value">${followUpStr}</div></div>
    </div>
    <div class="footer">Generated via <strong>QuickCure</strong> Digital Healthcare Platform &bull; This is a computer-generated prescription</div>
  </div>
  <script>
    window.onload = function() { window.print(); window.close(); };
  <\/script>
</body>
</html>`);
    printWindow.document.close();
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