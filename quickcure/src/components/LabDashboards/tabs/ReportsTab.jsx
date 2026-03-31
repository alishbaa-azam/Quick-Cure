import React from 'react';
import dayjs from 'dayjs';
import { FaFilePdf } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

export default function ReportsTab({ reports, theme }) {
  const StatusBadge = ({ status }) => {
    const config = {
      pending: 'bg-yellow-100 text-yellow-800',
      ready: 'bg-green-100 text-green-800',
      approved: 'bg-blue-100 text-blue-800'
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status] || config.pending}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
            <FaFilePdf size={20} />
          </div>
          <h2 className="text-xl font-semibold">Lab Reports</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead style={{ backgroundColor: `${theme.bgLight || '#9fbfc5'}30` }}>
            <tr>
              <th className="px-4 py-3 text-left text-sm">Report #</th>
              <th className="px-4 py-3 text-left text-sm">Patient</th>
              <th className="px-4 py-3 text-left text-sm">Test</th>
              <th className="px-4 py-3 text-left text-sm">Date</th>
              <th className="px-4 py-3 text-left text-sm">Status</th>
              <th className="px-4 py-3 text-left text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reports?.map((report) => (
              <tr key={report._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-mono">{report.reportNumber}</td>
                <td className="px-4 py-3">{report.patientId?.name || 'N/A'}</td>
                <td className="px-4 py-3">{report.testId?.name || 'N/A'}</td>
                <td className="px-4 py-3">{dayjs(report.reportDate).format('DD MMM YYYY')}</td>
                <td className="px-4 py-3"><StatusBadge status={report.status} /></td>
                <td className="px-4 py-3"><button className="text-blue-600 hover:text-blue-800"><FiDownload size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reports?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl"><FaFilePdf size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No reports found</p></div>
      )}
    </div>
  );
}