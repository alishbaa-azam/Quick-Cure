// // import React from 'react';
// // import dayjs from 'dayjs';
// // import { FaFilePdf } from 'react-icons/fa';
// // import { FiDownload, FiTrash2 } from 'react-icons/fi';

// // export default function ReportsTab({ reports, onAddReport, onDeleteReport, theme }) {
// //   const StatusBadge = ({ status }) => {
// //     const config = {
// //       pending: 'bg-yellow-100 text-yellow-800',
// //       ready: 'bg-green-100 text-green-800',
// //       approved: 'bg-blue-100 text-blue-800'
// //     };
// //     return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status] || config.pending}`}>{status}</span>;
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex justify-between items-center">
// //         <div className="flex items-center gap-3">
// //           <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
// //             <FaFilePdf size={20} />
// //           </div>
// //           <h2 className="text-xl font-semibold">Lab Reports</h2>
// //         </div>
// //         <button 
// //           onClick={onAddReport}
// //           className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" 
// //           style={{ backgroundColor: theme.primary }}
// //         >
// //           <FiDownload className="rotate-180" size={16} /> Upload Report
// //         </button>
// //       </div>

// //       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
// //         <table className="w-full">
// //           <thead style={{ backgroundColor: `${theme.bgLight || '#9fbfc5'}30` }}>
// //             <tr>
// //               <th className="px-4 py-3 text-left text-sm">Report #</th>
// //               <th className="px-4 py-3 text-left text-sm">Patient</th>
// //               <th className="px-4 py-3 text-left text-sm">Test</th>
// //               <th className="px-4 py-3 text-left text-sm">Date</th>
// //               <th className="px-4 py-3 text-left text-sm">Status</th>
// //               <th className="px-4 py-3 text-left text-sm">Action</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y">
// //             {reports?.map((report) => (
// //               <tr key={report._id} className="hover:bg-gray-50">
// //                 <td className="px-4 py-3 text-sm font-mono">{report.reportNumber}</td>
// //                 <td className="px-4 py-3">
// //                   {report.patientId?.name || report.patientName || report.patientDetails?.name || 'N/A'}
// //                 </td>
// //                 <td className="px-4 py-3">
// //                   {report.testId?.name || report.testName || report.testDetails?.name || 'N/A'}
// //                 </td>
// //                 <td className="px-4 py-3">{dayjs(report.reportDate).format('DD MMM YYYY')}</td>
// //                 <td className="px-4 py-3"><StatusBadge status={report.status} /></td>
// //                 <td className="px-4 py-3 flex gap-3">
// //                   {report.reportFile?.url && (
// //                     <a href={report.reportFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="Download">
// //                       <FiDownload size={16} />
// //                     </a>
// //                   )}
// //                   <button 
// //                     onClick={() => onDeleteReport?.(report._id)}
// //                     className="text-red-600 hover:text-red-800" 
// //                     title="Delete Report"
// //                   >
// //                     <FiTrash2 size={16} />
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {reports?.length === 0 && (
// //         <div className="text-center py-12 bg-white rounded-xl"><FaFilePdf size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No reports found</p></div>
// //       )}
// //     </div>
// //   );
// // }


// import React from 'react';
// import dayjs from 'dayjs';
// import { FaFilePdf } from 'react-icons/fa';
// import { FiDownload, FiTrash2 } from 'react-icons/fi';

// export default function ReportsTab({ reports, onAddReport, onDeleteReport, theme }) {
  
//   // ✅ Helper function to get patient name from different possible field structures
//   const getPatientName = (report) => {
//     if (!report) return 'N/A';
    
//     // Try all possible field combinations
//     if (report.patientDetails?.name) {
//       return report.patientDetails.name;
//     }
//     if (report.patientId?.name) {
//       return report.patientId.name;
//     }
//     if (report.patientName) {
//       return report.patientName;
//     }
//     if (report.patient?.name) {
//       return report.patient.name;
//     }
//     if (report.bookingId?.patientDetails?.name) {
//       return report.bookingId.patientDetails.name;
//     }
//     if (report.userId?.name) {
//       return report.userId.name;
//     }
    
//     // Debug: log to see what fields are available
//     console.log('Report patient fields:', {
//       id: report._id,
//       availableFields: Object.keys(report),
//       patientDetails: report.patientDetails,
//       patientId: report.patientId,
//       patientName: report.patientName
//     });
    
//     return 'N/A';
//   };

//   // ✅ Helper function to get test name from different possible field structures
//   const getTestName = (report) => {
//     if (!report) return 'N/A';
    
//     if (report.testId?.name) {
//       return report.testId.name;
//     }
//     if (report.testName) {
//       return report.testName;
//     }
//     if (report.testDetails?.name) {
//       return report.testDetails.name;
//     }
//     if (report.test?.name) {
//       return report.test.name;
//     }
//     if (report.bookingId?.tests?.[0]?.name) {
//       return report.bookingId.tests[0].name;
//     }
    
//     return 'N/A';
//   };

//   const StatusBadge = ({ status }) => {
//     const config = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       ready: 'bg-green-100 text-green-800',
//       approved: 'bg-blue-100 text-blue-800',
//       uploaded: 'bg-purple-100 text-purple-800',
//       completed: 'bg-teal-100 text-teal-800'
//     };
//     return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status] || config.pending}`}>{status?.toUpperCase() || 'PENDING'}</span>;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme?.primary || '#2c6774'}20`, color: theme?.primary || '#2c6774' }}>
//             <FaFilePdf size={20} />
//           </div>
//           <h2 className="text-xl font-semibold">Lab Reports</h2>
//         </div>
//         <button 
//           onClick={onAddReport}
//           className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" 
//           style={{ backgroundColor: theme?.primary || '#2c6774' }}
//         >
//           <FiDownload className="rotate-180" size={16} /> Upload Report
//         </button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead style={{ backgroundColor: `${theme?.bgLight || '#9fbfc5'}30` }}>
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Report #</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Patient Name</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Mobile Number</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Test Name</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Report Date</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {reports?.map((report) => {
//                 const patientName = getPatientName(report);
//                 const testName = getTestName(report);
                
//                 return (
//                   <tr key={report._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-3 text-sm font-mono font-medium">
//                       {report.reportNumber || report._id?.slice(-8) || 'N/A'}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div>
//                         <p className="font-medium text-gray-900">{patientName}</p>
//                         {report.patientDetails?.mobile && (
//                           <p className="text-xs text-gray-500">{report.patientDetails.mobile}</p>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {report.patientDetails?.mobile || report.mobile || report.patientId?.mobile || 'N/A'}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div>
//                         <p className="text-sm text-gray-900">{testName}</p>
//                         {report.testId?.code && (
//                           <p className="text-xs text-gray-500">Code: {report.testId.code}</p>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {report.reportDate ? dayjs(report.reportDate).format('DD MMM YYYY') : 
//                        report.createdAt ? dayjs(report.createdAt).format('DD MMM YYYY') : 'N/A'}
//                     </td>
//                     <td className="px-4 py-3">
//                       <StatusBadge status={report.status} />
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-3">
//                         {report.reportFile?.url && (
//                           <a 
//                             href={report.reportFile.url} 
//                             target="_blank" 
//                             rel="noopener noreferrer" 
//                             className="text-blue-600 hover:text-blue-800 transition-colors"
//                             title="Download Report"
//                           >
//                             <FiDownload size={18} />
//                           </a>
//                         )}
//                         {report.fileUrl && (
//                           <a 
//                             href={report.fileUrl} 
//                             target="_blank" 
//                             rel="noopener noreferrer" 
//                             className="text-blue-600 hover:text-blue-800 transition-colors"
//                             title="Download Report"
//                           >
//                             <FiDownload size={18} />
//                           </a>
//                         )}
//                         <button 
//                           onClick={() => onDeleteReport?.(report._id)}
//                           className="text-red-600 hover:text-red-800 transition-colors" 
//                           title="Delete Report"
//                         >
//                           <FiTrash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {reports?.length === 0 && (
//         <div className="text-center py-12 bg-white rounded-xl shadow-sm">
//           <FaFilePdf size={48} className="mx-auto text-gray-300 mb-3" />
//           <p className="text-gray-500">No reports found</p>
//           <button 
//             onClick={onAddReport}
//             className="mt-4 px-4 py-2 text-white rounded-lg hover:opacity-90 inline-flex items-center gap-2"
//             style={{ backgroundColor: theme?.primary || '#2c6774' }}
//           >
//             <FiDownload className="rotate-180" size={16} /> Upload First Report
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import React from 'react';
import dayjs from 'dayjs';
import { FaFilePdf } from 'react-icons/fa';
import { FiDownload, FiTrash2 } from 'react-icons/fi';

export default function ReportsTab({ reports, onAddReport, onDeleteReport, theme }) {
  
  // ✅ Helper function to get patient name
  const getPatientName = (report) => {
    if (!report) return 'N/A';
    
    if (report.patientDetails?.name) return report.patientDetails.name;
    if (report.patientId?.name) return report.patientId.name;
    if (report.patientName) return report.patientName;
    if (report.patient?.name) return report.patient.name;
    if (report.bookingId?.patientDetails?.name) return report.bookingId.patientDetails.name;
    if (report.userId?.name) return report.userId.name;
    
    return 'N/A';
  };

  // ✅ FIXED: Helper function to get mobile number from different possible field structures
  const getMobileNumber = (report) => {
    if (!report) return 'N/A';
    
    // Try all possible field combinations for mobile number
    if (report.patientDetails?.mobile) {
      return report.patientDetails.mobile;
    }
    if (report.patientDetails?.phone) {
      return report.patientDetails.phone;
    }
    if (report.patientDetails?.contactNumber) {
      return report.patientDetails.contactNumber;
    }
    if (report.patientId?.mobile) {
      return report.patientId.mobile;
    }
    if (report.patientId?.phone) {
      return report.patientId.phone;
    }
    if (report.mobile) {
      return report.mobile;
    }
    if (report.phone) {
      return report.phone;
    }
    if (report.contactNumber) {
      return report.contactNumber;
    }
    if (report.bookingId?.patientDetails?.mobile) {
      return report.bookingId.patientDetails.mobile;
    }
    if (report.bookingId?.patientDetails?.phone) {
      return report.bookingId.patientDetails.phone;
    }
    if (report.userId?.mobile) {
      return report.userId.mobile;
    }
    
    // Debug log
    console.log('Report mobile fields:', {
      id: report._id,
      patientDetails: report.patientDetails,
      patientId: report.patientId,
      availableFields: Object.keys(report)
    });
    
    return 'N/A';
  };

  // ✅ Helper function to get test name
  const getTestName = (report) => {
    if (!report) return 'N/A';
    
    if (report.testId?.name) return report.testId.name;
    if (report.testName) return report.testName;
    if (report.testDetails?.name) return report.testDetails.name;
    if (report.test?.name) return report.test.name;
    if (report.bookingId?.tests?.[0]?.name) return report.bookingId.tests[0].name;
    
    return 'N/A';
  };

  // ✅ Status Badge with tooltip/explanation
  const StatusBadge = ({ status }) => {
    const config = {
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'PENDING',
        tooltip: 'Report is being prepared or waiting for upload'
      },
      ready: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'READY',
        tooltip: 'Report is ready for download'
      },
      approved: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'APPROVED',
        tooltip: 'Report has been reviewed and approved'
      },
      uploaded: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        label: 'UPLOADED',
        tooltip: 'Report file has been uploaded'
      },
      completed: {
        bg: 'bg-teal-100',
        text: 'text-teal-800',
        label: 'COMPLETED',
        tooltip: 'Report process is complete'
      }
    };
    
    const statusConfig = config[status] || config.pending;
    
    return (
      <span 
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} cursor-help`}
        title={statusConfig.tooltip}
      >
        {statusConfig.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Info Card - Explain Pending Status */}
      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">i</div>
          <div>
            <h4 className="font-semibold text-blue-900">Status Information</h4>
            <p className="text-sm text-blue-700 mt-1">
              <span className="font-medium">Pending:</span> Report is being prepared or waiting for upload from lab
            </p>
            <p className="text-sm text-blue-700">
              <span className="font-medium">Ready:</span> Report is ready for download
            </p>
            <p className="text-sm text-blue-700">
              <span className="font-medium">Approved:</span> Report has been reviewed and approved by doctor
            </p>
          </div>
        </div> */}
      {/* </div> */}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme?.primary || '#2c6774'}20`, color: theme?.primary || '#2c6774' }}>
            <FaFilePdf size={20} />
          </div>
          <h2 className="text-xl font-semibold">Lab Reports</h2>
        </div>
        <button 
          onClick={onAddReport}
          className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" 
          style={{ backgroundColor: theme?.primary || '#2c6774' }}
        >
          <FiDownload className="rotate-180" size={16} /> Upload Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: `${theme?.bgLight || '#9fbfc5'}30` }}>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Report #</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Patient Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Mobile Number</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Test Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Report Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {reports?.map((report) => {
                const patientName = getPatientName(report);
                const mobileNumber = getMobileNumber(report);
                const testName = getTestName(report);
                
                return (
                  <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-medium">
                      {report.reportNumber || report._id?.slice(-8) || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{patientName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-gray-900">{mobileNumber}</p>
                        {mobileNumber === 'N/A' && (
                          <p className="text-xs text-gray-400">No mobile number available</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-gray-900">{testName}</p>
                        {report.testId?.code && (
                          <p className="text-xs text-gray-500">Code: {report.testId.code}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {report.reportDate ? dayjs(report.reportDate).format('DD MMM YYYY') : 
                       report.createdAt ? dayjs(report.createdAt).format('DD MMM YYYY') : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        {(report.reportFile?.url || report.fileUrl) && (
                          <a 
                            href={report.reportFile?.url || report.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Download Report"
                          >
                            <FiDownload size={18} />
                          </a>
                        )}
                        <button 
                          onClick={() => onDeleteReport?.(report._id)}
                          className="text-red-600 hover:text-red-800 transition-colors" 
                          title="Delete Report"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
           </table>
        </div>
      </div>

      {reports?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <FaFilePdf size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No reports found</p>
          <button 
            onClick={onAddReport}
            className="mt-4 px-4 py-2 text-white rounded-lg hover:opacity-90 inline-flex items-center gap-2"
            style={{ backgroundColor: theme?.primary || '#2c6774' }}
          >
            <FiDownload className="rotate-180" size={16} /> Upload First Report
          </button>
        </div>
      )}
    </div>
  );
}