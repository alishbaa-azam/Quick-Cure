import React from 'react';
import { Filter, Plus } from 'lucide-react';
import { appointments, getStatusColor } from '../data/dummyData';

const Appointments = ({ setActiveTab, setSelectedPatient }) => {
  const handleViewHistory = (appt) => {
    // Find patient data
    const patientData = {
      id: appt.id,
      name: appt.patientName,
      contact: appt.contact,
      email: appt.email,
      age: 35, // Default age, you can add actual age data
      gender: "Male", // Default gender
      lastVisit: appt.date
    };
    setSelectedPatient(patientData);
    setActiveTab('patient-history');
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Appointments</h2>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            <Filter size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm">
            <Plus size={14} />
            New Appointment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Patient Name</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Contact</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Appointment Date</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Time</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Status</th>
                  <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{appt.patientName}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{appt.contact}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{appt.date}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{appt.time}</td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        <button 
                          onClick={() => handleViewHistory(appt)}
                          className="px-3 py-1 text-xs md:text-sm bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] whitespace-nowrap"
                        >
                          View History
                        </button>
                      </div>
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

export default Appointments;