import React from 'react';
import { AlertCircle, Calendar, Package, ArrowUpRight } from 'lucide-react';

const StockManagement = () => {
  const stockData = [
    { id: 'B-9901', name: 'Panadol CF', batch: 'BTCH-2024', expiry: '2026-12-15', stock: 450, status: 'Healthy' },
    { id: 'B-8822', name: 'Augmentin 625mg', batch: 'BTCH-4412', expiry: '2026-04-10', stock: 12, status: 'Expiring Soon' },
    { id: 'B-7710', name: 'Arinac Syrup', batch: 'BTCH-1109', expiry: '2024-01-01', stock: 45, status: 'Expired' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-700';
      case 'Expiring Soon': return 'bg-orange-100 text-orange-700';
      case 'Expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#1a3a3a]">Stock & Batch Control</h1>
        <div className="flex gap-2">
          <button className="bg-white border px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            <Calendar size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* Expiry Alerts Header */}
      <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4 text-red-800">
        <AlertCircle className="shrink-0" />
        <p className="text-sm font-medium">
          <strong>Attention:</strong> 3 Batches are expiring within the next 30 days. Please review your inventory.
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Batch Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Alert Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stockData.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-blue-600 font-mono">{item.batch}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} /> {item.expiry}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-gray-800">
                      <Package size={16} className="text-gray-400" /> {item.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-[#2c6774] hover:bg-teal-50 rounded-lg">
                      <ArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;