import React from 'react';
import dayjs from 'dayjs';
import { FaTruck } from 'react-icons/fa';
import { FiPlus, FiEdit2, FiTrash2, FiUser, FiMapPin, FiFileText, FiCheckCircle, FiClock, FiCalendar, FiExternalLink } from 'react-icons/fi';

export default function CollectionsTab({ collections, bookings, theme, onAddCollection, onEditCollection, onDeleteCollection, onViewBooking, onUpdateStatus }) {
  const StatusBadge = ({ status }) => {
    const config = {
      scheduled: 'bg-blue-100 text-blue-800',
      assigned: 'bg-purple-100 text-purple-800',
      in_progress: 'bg-orange-100 text-orange-800',
      collected: 'bg-green-100 text-green-800',
      delivered: 'bg-indigo-100 text-indigo-800',
      cancelled: 'bg-red-100 text-red-800',
      rescheduled: 'bg-yellow-100 text-yellow-800'
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status] || 'bg-gray-100 text-gray-800'}`}>{status?.replace(/_/g, ' ').toUpperCase()}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
            <FaTruck size={20} />
          </div>
          <h2 className="text-xl font-semibold">Sample Collections</h2>
        </div>
        <button 
          onClick={onAddCollection} 
          className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" 
          style={{ backgroundColor: theme.primary }}
        >
          <FiPlus size={16} /> Schedule Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {collections?.map((collection) => {
          // Fetch data from Booking
          const patient = collection.bookingId?.patientDetails || collection.patientId;
          const booking = collection.bookingId;
          
          // Logic consistent with Patients Tab
          const isCompleted = 
            ['collected', 'completed', 'delivered'].includes(collection.status?.toLowerCase()) || 
            booking?.bookingStatus?.toLowerCase() === 'completed';

          const testList = Array.isArray(booking?.tests) ? booking.tests : 
                         Array.isArray(booking?.testDetails) ? booking.testDetails : [];
          
          return (
            <div key={collection._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all flex flex-col h-full">
              {/* Top Section: ID & Status */}
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-5">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Tracking ID</p>
                    <p className="font-mono text-sm font-medium text-gray-700">{collection.trackingId || 'N/A'}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={collection.status} />
                    <div className="flex gap-1">
                      <button 
                        onClick={() => onEditCollection?.(collection)} 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl border border-gray-50 bg-gray-50/50 transition-colors" 
                        title="Edit Schedule"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        onClick={() => onDeleteCollection?.(collection._id)} 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl border border-gray-50 bg-gray-50/50 transition-colors" 
                        title="Delete Schedule"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Patient Info from Booking */}
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                      <FiUser size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Patient & Contact</p>
                      <p className="text-sm font-bold text-gray-800">{patient?.name || "N/A"}</p>
                      <p className="text-xs text-gray-500">{patient?.mobile}</p>
                    </div>
                  </div>

                  {/* Booking Details (Tests & Price) */}
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 shrink-0">
                      <FiFileText size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Booking Details</p>
                      <p className="text-xs font-mono text-indigo-600 font-bold">{booking?.bookingReference || 'N/A'}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {testList.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 bg-gray-50 border rounded-md text-gray-600">
                            {t.name || t.testId?.name}
                          </span>
                        ))}
                        {testList.length > 3 && <span className="text-[9px] text-gray-400">+{testList.length - 3} more</span>}
                      </div>
                      {/* <p className="text-sm font-bold text-gray-700 mt-1">₨{(booking?.totalAmount || 0).toLocaleString()}</p> */}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 shrink-0">
                      <FiMapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Collection Address</p>
                      <p className="text-xs text-gray-600 line-clamp-2 italic">"{collection.collectionAddress || patient?.address || "Address not provided"}"</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  {/* Status Banner */}
                  <div className={`p-2.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest border ${isCompleted ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                    {isCompleted ? <FiCheckCircle size={14} /> : <FiClock size={14} />}
                    Collection {isCompleted ? 'Completed' : 'Pending'}
                  </div>

                  {/* Quick Update Button */}
                  {!isCompleted && (
                    <button
                      onClick={() => onUpdateStatus?.(collection._id, 'collected')}
                      className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-100"
                    >
                      <FiCheckCircle size={14} />
                      Mark as Collected
                    </button>
                  )}

                  {/* View Details Button */}
                  <button
                    onClick={() => {
                      const bookingId = booking?._id || booking;
                      const fullBooking = bookings?.find(b => b._id === bookingId);
                      if (fullBooking) onViewBooking?.(fullBooking);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors border border-teal-100"
                  >
                    <FiExternalLink size={14} />
                    View Booking Details
                  </button>
                </div>
              </div>

              {/* Bottom Bar: Schedule Time */}
              <div className="bg-gray-50/50 px-5 py-3 border-t border-gray-100 flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <FiCalendar size={14} />
                  {dayjs(collection.scheduledDate).format('DD MMM YYYY')}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium capitalize">
                  <FiClock size={14} />
                  {collection.scheduledTimeSlot}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {collections?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl"><FaTruck size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No collections scheduled</p></div>
      )}
    </div>
  );
}