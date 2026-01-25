import React from 'react';
import { Users, Calendar, Clock, FileText } from 'lucide-react';
import { appointments, summaryStats, getStatusColor } from '../data/dummyData';

const Dashboard = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Dashboard Overview</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Total Patients</p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#174047] mt-1 md:mt-2">{summaryStats.totalPatients}</h3>
            </div>
            <Users className="text-[#2c6774] w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="mt-2 md:mt-4 text-xs md:text-sm text-green-600">
            <span>↑ 12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Today's Appointments</p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#174047] mt-1 md:mt-2">{summaryStats.todayAppointments}</h3>
            </div>
            <Calendar className="text-[#2c6774] w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="mt-2 md:mt-4 text-xs md:text-sm text-green-600">
            <span>↑ 0.01% from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Pending Appointments</p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#174047] mt-1 md:mt-2">{summaryStats.pendingAppointments}</h3>
            </div>
            <Clock className="text-[#2c6774] w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="mt-2 md:mt-4 text-xs md:text-sm text-yellow-600">
            <span>4 new requests</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Completed Appointments</p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#174047] mt-1 md:mt-2">{summaryStats.completedAppointments}</h3>
            </div>
            <FileText className="text-[#2c6774] w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="mt-2 md:mt-4 text-xs md:text-sm text-green-600">
            <span>↑ 5.6% from last month</span>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-2">
          <h3 className="text-lg md:text-xl font-bold text-[#174047]">Upcoming Appointments</h3>
          <button className="text-[#2c6774] hover:text-[#174047] text-sm font-medium self-start sm:self-auto">
            View All
          </button>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 md:py-3 md:px-4 text-gray-600 font-medium text-xs md:text-sm">Patient Name</th>
                  <th className="text-left py-2 px-3 md:py-3 md:px-4 text-gray-600 font-medium text-xs md:text-sm">Contact</th>
                  <th className="text-left py-2 px-3 md:py-3 md:px-4 text-gray-600 font-medium text-xs md:text-sm">Date</th>
                  <th className="text-left py-2 px-3 md:py-3 md:px-4 text-gray-600 font-medium text-xs md:text-sm">Time</th>
                  <th className="text-left py-2 px-3 md:py-3 md:px-4 text-gray-600 font-medium text-xs md:text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">{appt.patientName}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">{appt.contact}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">{appt.date}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">{appt.time}</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">{appt.type}</td>
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

export default Dashboard;