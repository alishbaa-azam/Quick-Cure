import React from 'react';
import { FiUser, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaUserCircle, FaCheckCircle, FaClock } from 'react-icons/fa';

export default function PatientsTab({ patients, searchText, setSearchText, theme, onEditPatient, onDeletePatient }) {
  // Safe check - ensure patients is an array
  const patientsArray = Array.isArray(patients) ? patients : [];
  
  const filteredPatients = patientsArray.filter(p => 
    !searchText || 
    p?.name?.toLowerCase().includes(searchText.toLowerCase()) || 
    p?.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b" style={{ borderBottomColor: `${theme.primary}20` }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
              <FiUser size={20} />
            </div>
            <h2 className="text-xl font-semibold">Patient Registry</h2>
            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>{patientsArray.length} Patients</span>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search patients..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-64 pl-10 pr-4 py-2 border rounded-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredPatients.map((patient) => (
          <div key={patient._id || patient.email} className="border rounded-xl p-4 hover:shadow-md transition bg-white group relative">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEditPatient?.(patient)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                title="Edit Patient"
              >
                <FiEdit2 size={16} />
              </button>
              <button 
                onClick={() => onDeletePatient?.(patient.email)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                title="Delete Patient"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <FaUserCircle size={32} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{patient.name}</h3>
                <p className="text-xs text-gray-500 truncate mb-1">{patient.email}</p>
                <p className="text-xs font-medium text-gray-600 mb-2">{patient.mobile}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{patient.age} Yrs</span>
                  <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{patient.gender}</span>
                </div>

                {/* Sample Collected Status */}
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${patient.bookingStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {patient.bookingStatus === 'completed' ? <FaCheckCircle size={10} /> : <FaClock size={10} />}
                  {patient.bookingStatus === 'completed' ? 'Sample Collected' : 'Collection Pending'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="py-12 text-center"><FiUser size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No patients found</p></div>
      )}
    </div>
  );
}