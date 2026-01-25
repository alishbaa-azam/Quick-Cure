import React, { useState } from 'react';
import { FilePlus } from 'lucide-react';

const Prescriptions = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    medicineName: '',
    instructions: '',
    dosage: '',
    frequency: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Prescription Data:', formData);
    // Handle form submission here
    alert('Prescription saved successfully!');
    setFormData({
      patientName: '',
      age: '',
      gender: '',
      medicineName: '',
      instructions: '',
      dosage: '',
      frequency: ''
    });
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
            {/* Patient Name - Manual Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
              <input
                type="text"
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                placeholder="Enter medicine name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  placeholder="e.g., 10mg"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <input
                  type="text"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  placeholder="e.g., Once daily"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Enter detailed instructions"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] h-32 text-sm md:text-base"
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm md:text-base font-medium"
            >
              <FilePlus size={18} />
              Save Prescription
            </button>
          </form>
        </div>

        {/* Recent Prescriptions Preview */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Recent Prescriptions</h3>
          <div className="space-y-4">
            {/* Sample prescription data */}
            <div className="border rounded-lg p-4 hover:border-[#2c6774]">
              <h4 className="font-bold text-gray-800">John Smith</h4>
              <p className="text-gray-600 text-sm mt-1">35 years • Male</p>
              <div className="mt-3">
                <p className="font-medium text-gray-700">Lisinopril 10mg</p>
                <p className="text-gray-600 text-sm mt-1">Once daily • Take with water</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Prescribed: 2024-02-10</p>
            </div>
            
            <div className="border rounded-lg p-4 hover:border-[#2c6774]">
              <h4 className="font-bold text-gray-800">Sarah Johnson</h4>
              <p className="text-gray-600 text-sm mt-1">28 years • Female</p>
              <div className="mt-3">
                <p className="font-medium text-gray-700">Metformin 500mg</p>
                <p className="text-gray-600 text-sm mt-1">Twice daily • Take with meals</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Prescribed: 2024-02-12</p>
            </div>
            
            <div className="border rounded-lg p-4 hover:border-[#2c6774]">
              <h4 className="font-bold text-gray-800">Michael Brown</h4>
              <p className="text-gray-600 text-sm mt-1">45 years • Male</p>
              <div className="mt-3">
                <p className="font-medium text-gray-700">Atorvastatin 20mg</p>
                <p className="text-gray-600 text-sm mt-1">Once daily • Take at bedtime</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Prescribed: 2024-02-08</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;