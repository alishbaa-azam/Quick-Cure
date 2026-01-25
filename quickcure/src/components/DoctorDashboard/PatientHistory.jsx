import React, { useState } from 'react';
import { ArrowLeft, Download, Plus, X, Eye, Calendar, Clock, Share2 } from 'lucide-react';
import { medicalHistory, patientDetails } from '../data/dummyData';

const PatientHistory = ({ selectedPatient, setActiveTab }) => {
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [showViewPrescription, setShowViewPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  
  // Get the selected patient's details or use the dummy data
  const currentPatient = selectedPatient || patientDetails;
  
  // State for patient information that doctor can edit
  const [patientInfo, setPatientInfo] = useState({
    age: currentPatient.age || '',
    gender: currentPatient.gender || '',
    disease: '',
    symptoms: ''
  });

  const [prescription, setPrescription] = useState({
    date: new Date().toISOString().split('T')[0],
    diagnosis: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    instructions: '',
    followUpDate: '',
    labTests: [],
    notes: ''
  });

  // Mock data for patient history with prescriptions
  const patientHistoryData = [
    {
      id: 1,
      date: '2024-03-10',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Chen',
      diagnosis: 'Upper Respiratory Infection',
      treatment: 'Antibiotics and rest',
      prescription: {
        diagnosis: 'Upper Respiratory Infection',
        medications: [
          { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' },
          { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed for pain', duration: '3 days' }
        ],
        instructions: 'Take with food. Complete full course of antibiotics.',
        followUpDate: '2024-03-17',
        labTests: ['CBC'],
        notes: 'Patient advised to drink plenty of fluids.'
      }
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '2:15 PM',
      doctor: 'Dr. Sarah Chen',
      diagnosis: 'Hypertension Follow-up',
      treatment: 'Medication adjustment',
      prescription: {
        diagnosis: 'Hypertension',
        medications: [
          { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' }
        ],
        instructions: 'Take in the morning. Monitor blood pressure daily.',
        followUpDate: '2024-03-15',
        labTests: ['Blood Pressure Monitoring', 'Kidney Function Test'],
        notes: 'Patient responding well to current dosage.'
      }
    },
    {
      id: 3,
      date: '2024-01-20',
      time: '11:00 AM',
      doctor: 'Dr. Robert Kim',
      diagnosis: 'Annual Check-up',
      treatment: 'Routine examination',
      prescription: {
        diagnosis: 'Healthy, No Acute Issues',
        medications: [
          { name: 'Multivitamin', dosage: '1 tablet', frequency: 'Once daily', duration: 'Ongoing' }
        ],
        instructions: 'Continue regular exercise and balanced diet.',
        followUpDate: '2025-01-20',
        labTests: ['CBC', 'Lipid Profile', 'Blood Sugar'],
        notes: 'All results within normal range.'
      }
    }
  ];

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addMedication = () => {
    setPrescription({
      ...prescription,
      medications: [...prescription.medications, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  const removeMedication = (index) => {
    const newMedications = prescription.medications.filter((_, i) => i !== index);
    setPrescription({ ...prescription, medications: newMedications });
  };

  const updateMedication = (index, field, value) => {
    const newMedications = [...prescription.medications];
    newMedications[index][field] = value;
    setPrescription({ ...prescription, medications: newMedications });
  };

  const handleViewPrescription = (prescriptionData) => {
    setSelectedPrescription(prescriptionData);
    setShowViewPrescription(true);
  };

  const sharePrescriptionViaSMS = async (prescriptionData) => {
    try {
      setIsSharing(true);
      
      // Create a simplified prescription message for SMS
      const medicationList = prescriptionData.medications.map(med => 
        `${med.name} (${med.dosage}): ${med.frequency} for ${med.duration}`
      ).join('\n');
      
      const message = `New Prescription for ${currentPatient.name}

Diagnosis: ${prescriptionData.diagnosis}

Medications:
${medicationList}

Instructions: ${prescriptionData.instructions}

Follow-up Date: ${prescriptionData.followUpDate}

Please download the full prescription from your patient portal or contact the clinic for details.`;
      
      // Simulate SMS sending (in a real app, you would use an SMS API)
      console.log('Sending SMS to:', currentPatient.contact);
      console.log('Message:', message);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate downloadable prescription PDF as well
      generatePrescriptionPDF(prescriptionData);
      
      setShareSuccess(true);
      setTimeout(() => {
        setShareSuccess(false);
        setIsSharing(false);
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('Error sharing prescription:', error);
      alert('Failed to share prescription. Please try again.');
      setIsSharing(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!prescription.diagnosis || prescription.medications.some(med => !med.name || !med.dosage)) {
      alert('Please fill in all required fields (diagnosis and all medication details)');
      return;
    }

    // Here you would typically save to database
    console.log('Prescription submitted:', prescription);
    console.log('Patient info updated:', patientInfo);
    
    // Share prescription via SMS
    const shared = await sharePrescriptionViaSMS(prescription);
    
    if (shared) {
      // Reset form
      setPrescription({
        date: new Date().toISOString().split('T')[0],
        diagnosis: '',
        medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
        instructions: '',
        followUpDate: '',
        labTests: [],
        notes: ''
      });
      setShowPrescriptionForm(false);
    }
  };

  const generatePrescriptionPDF = (prescriptionData = prescription) => {
    // This would be implemented with a PDF generation library
    console.log('Generating PDF prescription...');
    // For now, we'll create a downloadable HTML page
    const prescriptionHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Prescription - ${currentPatient.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { border-bottom: 2px solid #174047; padding-bottom: 20px; margin-bottom: 30px; }
          .clinic-info { color: #174047; }
          .patient-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .prescription-body { margin: 30px 0; }
          .medication-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .medication-table th, .medication-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .medication-table th { background: #174047; color: white; }
          .signature { margin-top: 50px; border-top: 1px solid #000; padding-top: 20px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="clinic-info">HealthCare Medical Center</h1>
          <p>123 Medical Plaza, New York, NY 10001 • Phone: (555) 123-4567</p>
          <p>License: MD-789456 • DEA: AB1234567</p>
        </div>
        
        <div class="patient-info">
          <h2>Patient Information</h2>
          <p><strong>Name:</strong> ${currentPatient.name}</p>
          <p><strong>Age/Gender:</strong> ${patientInfo.age} years / ${patientInfo.gender}</p>
          <p><strong>Contact:</strong> ${currentPatient.contact}</p>
          <p><strong>Date:</strong> ${prescriptionData.date}</p>
        </div>
        
        <div class="prescription-body">
          <h2>PRESCRIPTION</h2>
          <p><strong>Diagnosis:</strong> ${prescriptionData.diagnosis}</p>
          
          <table class="medication-table">
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              ${prescriptionData.medications.map(med => `
                <tr>
                  <td>${med.name}</td>
                  <td>${med.dosage}</td>
                  <td>${med.frequency}</td>
                  <td>${med.duration}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <p><strong>Instructions:</strong> ${prescriptionData.instructions}</p>
          <p><strong>Lab Tests Required:</strong> ${prescriptionData.labTests.join(', ') || 'None'}</p>
          <p><strong>Follow-up Date:</strong> ${prescriptionData.followUpDate}</p>
          <p><strong>Additional Notes:</strong> ${prescriptionData.notes}</p>
        </div>
        
        <div class="signature">
          <p><strong>Dr. Sarah Chen</strong></p>
          <p>MD, Board Certified Physician</p>
          <p>Signature: ___________________</p>
        </div>
        
        <div class="footer">
          <p>This prescription expires in 6 months. No refills without consultation.</p>
          <p>Prescription shared via SMS to: ${currentPatient.contact}</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([prescriptionHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Prescription_${currentPatient.name}_${prescriptionData.date}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Success Message */}
      {shareSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold">Prescription Shared Successfully!</p>
              <p className="text-sm">Sent to {currentPatient.contact}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button 
              onClick={() => setActiveTab('appointments')}
              className="lg:hidden p-1 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Patient History</h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            {currentPatient.name} • {patientInfo.age} years • {patientInfo.gender}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPrescriptionForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#174047] text-white rounded-lg hover:bg-[#2c6774] whitespace-nowrap"
          >
            <Plus size={18} />
            New Prescription
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 whitespace-nowrap"
          >
            ← Back to Appointments
          </button>
        </div>
      </div>

      {/* Prescription Form Modal */}
      {showPrescriptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#174047]">New Prescription</h3>
                <button 
                  onClick={() => setShowPrescriptionForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> This prescription will be saved and automatically shared with {currentPatient.name} via SMS to {currentPatient.contact}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={prescription.date}
                    onChange={(e) => setPrescription({...prescription, date: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174047] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={prescription.followUpDate}
                    onChange={(e) => setPrescription({...prescription, followUpDate: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174047] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={prescription.diagnosis}
                  onChange={(e) => setPrescription({...prescription, diagnosis: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174047] focus:border-transparent"
                  rows="2"
                  placeholder="Enter diagnosis..."
                  required
                />
              </div>

              {/* Medications Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">Medications <span className="text-red-500">*</span></h4>
                  <button
                    type="button"
                    onClick={addMedication}
                    className="flex items-center gap-2 text-sm text-[#174047] hover:text-[#2c6774]"
                  >
                    <Plus size={16} />
                    Add Medication
                  </button>
                </div>
                
                <div className="space-y-4">
                  {prescription.medications.map((med, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Medication Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) => updateMedication(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="e.g., Amoxicillin"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dosage <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="e.g., 500mg"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frequency <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="e.g., Twice daily"
                          required
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={med.duration}
                            onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="e.g., 7 days"
                            required
                          />
                        </div>
                        {prescription.medications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedication(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  value={prescription.instructions}
                  onChange={(e) => setPrescription({...prescription, instructions: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174047] focus:border-transparent"
                  rows="3"
                  placeholder="Enter instructions for patient..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lab Tests Required
                </label>
                <input
                  type="text"
                  value={prescription.labTests}
                  onChange={(e) => setPrescription({...prescription, labTests: e.target.value.split(',')})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174047] focus:border-transparent"
                  placeholder="e.g., CBC, Lipid Profile, Blood Sugar"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={prescription.notes}
                  onChange={(e) => setPrescription({...prescription, notes: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174047] focus:border-transparent"
                  rows="2"
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowPrescriptionForm(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSharing}
                  className="px-6 py-2 bg-[#174047] text-white rounded-lg hover:bg-[#2c6774] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSharing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sharing...
                    </>
                  ) : (
                    <>
                      <Share2 size={18} />
                      Save & Share Prescription
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Prescription Modal */}
      {showViewPrescription && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#174047]">Prescription Details</h3>
                <button 
                  onClick={() => setShowViewPrescription(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Diagnosis</h4>
                <p className="text-gray-700">{selectedPrescription.diagnosis}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Medications</h4>
                <div className="space-y-3">
                  {selectedPrescription.medications.map((med, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Medication</p>
                          <p className="text-gray-800">{med.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Dosage</p>
                          <p className="text-gray-800">{med.dosage}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Frequency</p>
                          <p className="text-gray-800">{med.frequency}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Duration</p>
                          <p className="text-gray-800">{med.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h4>
                <p className="text-gray-700">{selectedPrescription.instructions}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Lab Tests</h4>
                  <p className="text-gray-800">
                    {selectedPrescription.labTests.length > 0 
                      ? selectedPrescription.labTests.join(', ')
                      : 'None'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Follow-up Date</h4>
                  <p className="text-gray-800">{selectedPrescription.followUpDate || 'Not specified'}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Notes</h4>
                <p className="text-gray-800">{selectedPrescription.notes || 'No additional notes'}</p>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowViewPrescription(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Patient Information and History */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Patient Information Section */}
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Patient Information</h3>
            
            <div className="space-y-4">
              {/* Pre-filled Patient Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                  <input 
                    type="text"
                    value={currentPatient.name}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email"
                    value={currentPatient.email || "patient@example.com"}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input 
                  type="tel"
                  value={currentPatient.contact || "Not provided"}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              
              {/* Doctor Editable Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input 
                    type="text"
                    name="age"
                    value={patientInfo.age}
                    onChange={handlePatientInfoChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                    placeholder="Enter age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={patientInfo.gender}
                    onChange={handlePatientInfoChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disease</label>
                  <input 
                    type="text"
                    name="disease"
                    value={patientInfo.disease}
                    onChange={handlePatientInfoChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                    placeholder="Enter disease"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                <textarea 
                  name="symptoms"
                  value={patientInfo.symptoms}
                  onChange={handlePatientInfoChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                  rows="3"
                  placeholder="Describe symptoms..."
                />
              </div>
            </div>
          </div>

          {/* Patient History Section */}
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Patient History</h3>
            
            <div className="space-y-4">
              {patientHistoryData.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#174047] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{record.date}</span>
                        <Clock size={16} className="text-gray-500 ml-2" />
                        <span className="text-sm text-gray-600">{record.time}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-lg">{record.diagnosis}</h4>
                      <p className="text-sm text-gray-600 mt-1">{record.treatment}</p>
                      <p className="text-sm text-gray-500 mt-2">Doctor: {record.doctor}</p>
                    </div>
                    <div className="sm:text-right">
                      <button
                        onClick={() => handleViewPrescription(record.prescription)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#174047] text-white rounded-lg hover:bg-[#2c6774] text-sm whitespace-nowrap"
                      >
                        <Eye size={16} />
                        View Prescription
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-2">Prescribed Medications:</p>
                    <div className="flex flex-wrap gap-2">
                      {record.prescription.medications.map((med, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                        >
                          {med.name} ({med.dosage})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-4 md:space-y-6">
          {/* Quick Actions - Updated with only 2 buttons */}
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => setShowPrescriptionForm(true)}
                className="p-4 bg-[#174047] text-white rounded-lg hover:bg-[#2c6774] flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                <span className="text-sm font-medium">New Prescription</span>
              </button>
              <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2">
                <Download size={20} />
                <span className="text-sm font-medium">Export History</span>
              </button>
            </div>
          </div>

          {/* Current Medications */}
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4">Current Medications</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Lisinopril 10mg</span>
                <span className="text-xs text-gray-500">Once daily</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Metformin 500mg</span>
                <span className="text-xs text-gray-500">Twice daily</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Atorvastatin 20mg</span>
                <span className="text-xs text-gray-500">At bedtime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;