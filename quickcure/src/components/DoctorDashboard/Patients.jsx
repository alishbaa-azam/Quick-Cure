import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { patients } from '../data/dummyData';

const Patients = ({ setActiveTab, setSelectedPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.contact.includes(searchTerm) || 
    patient.email?.includes(searchTerm) ||
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('patient-history');
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Patients</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by contact number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm whitespace-nowrap">
            + Add Patient
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Name</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Age</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Gender</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Contact Number</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Email</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Last Visit</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{patient.name}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{patient.age}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{patient.gender}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm font-mono">{patient.contact}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm text-gray-600">{patient.email}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{patient.lastVisit}</td>
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
      </div>
    </div>
  );
};

export default Patients;