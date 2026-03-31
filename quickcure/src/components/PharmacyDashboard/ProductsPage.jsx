import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react';

const ProductsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a3a3a]">Medicine Inventory</h1>
          <p className="text-sm text-gray-500">Manage your pharmacy stock and details</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2c6774] text-white px-5 py-2.5 rounded-xl hover:bg-[#1a3a3a] transition-all shadow-lg shadow-[#2c6774]/20"
        >
          <Plus size={20} /> Add New Medicine
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search by name or generic..." className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[#2c6774]" />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"><Filter size={18} /> Filter</button>
          <select className="px-4 py-2 border rounded-lg text-gray-600 outline-none">
            <option>All Categories</option>
            <option>Antibiotics</option>
            <option>Analgesics</option>
          </select>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Medicine</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Panadol CF', generic: 'Paracetamol', cat: 'Analgesics', price: 'Rs 150', stock: 450 },
                { name: 'Augmentin 625mg', generic: 'Co-amoxiclav', cat: 'Antibiotics', price: 'Rs 650', stock: 12 },
              ].map((med, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{med.name}</p>
                    <p className="text-xs text-gray-400">{med.generic}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{med.cat}</td>
                  <td className="px-6 py-4 font-bold text-[#1a3a3a]">{med.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${med.stock < 20 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {med.stock} Units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
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

export default ProductsPage;
























// import React, { useState } from 'react';
// import { Search, Plus, Edit, Trash2, Filter, X, Save } from 'lucide-react';

// const ProductsPage = () => {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedMed, setSelectedMed] = useState(null);

//   const medicines = [
//     { id: 1, name: 'Panadol CF', generic: 'Paracetamol', cat: 'Analgesics', price: '150', stock: 450 },
//     { id: 2, name: 'Augmentin 625mg', generic: 'Co-amoxiclav', cat: 'Antibiotics', price: '650', stock: 12 },
//   ];

//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-black text-[#1a3a3a]">Medicine Inventory</h1>
//           <p className="text-sm text-gray-500">Manage pharmacy stock and details</p>
//         </div>
//         <button 
//           onClick={() => setShowAddModal(true)}
//           className="flex items-center gap-2 bg-[#2c6774] text-white px-5 py-2.5 rounded-xl hover:bg-[#1a3a3a] transition-all shadow-lg"
//         >
//           <Plus size={20} /> Add New Medicine
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Medicine</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Price</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Stock</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {medicines.map((med) => (
//                 <tr key={med.id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <p className="font-bold text-gray-800">{med.name}</p>
//                     <p className="text-xs text-gray-400">{med.cat}</p>
//                   </td>
//                   <td className="px-6 py-4 font-bold">Rs {med.price}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${med.stock < 20 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
//                       {med.stock} Units
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <div className="flex justify-end gap-2">
//                       <button onClick={() => {setSelectedMed(med); setShowAddModal(true)}} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
//                       <button onClick={() => setShowDeleteModal(true)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- ADD/EDIT MODAL --- */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
//             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
//               <h3 className="text-xl font-black text-[#1a3a3a]">{selectedMed ? 'Edit Medicine' : 'Add New Medicine'}</h3>
//               <button onClick={() => {setShowAddModal(false); setSelectedMed(null)}}><X size={24} /></button>
//             </div>
//             <div className="p-6 grid grid-cols-2 gap-4">
//               <div className="col-span-2 space-y-1">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Medicine Name</label>
//                 <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#2c6774]" placeholder="e.g. Panadol" defaultValue={selectedMed?.name} />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Price (Rs)</label>
//                 <input type="number" className="w-full p-3 bg-gray-50 border rounded-xl outline-none" defaultValue={selectedMed?.price} />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Initial Stock</label>
//                 <input type="number" className="w-full p-3 bg-gray-50 border rounded-xl outline-none" defaultValue={selectedMed?.stock} />
//               </div>
//             </div>
//             <div className="p-6 border-t bg-gray-50 flex gap-3">
//               <button onClick={() => {setShowAddModal(false); setSelectedMed(null)}} className="flex-1 py-3 font-bold text-gray-500">Cancel</button>
//               <button className="flex-1 py-3 bg-[#2c6774] text-white rounded-xl font-bold flex items-center justify-center gap-2"><Save size={18} /> Save Medicine</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- DELETE CONFIRMATION --- */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
//           <div className="bg-white p-8 rounded-3xl max-w-sm w-full text-center space-y-4">
//             <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto"><Trash2 size={32} /></div>
//             <h3 className="text-xl font-black text-gray-800">Are you sure?</h3>
//             <p className="text-gray-500">This action cannot be undone. This medicine will be removed from inventory.</p>
//             <div className="flex gap-3 mt-6">
//               <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 font-bold text-gray-400">No, Keep it</button>
//               <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Yes, Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;