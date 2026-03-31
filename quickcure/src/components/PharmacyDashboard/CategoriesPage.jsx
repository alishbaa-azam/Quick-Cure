import React from 'react';
import { LayoutGrid, MoreVertical } from 'lucide-react';

const CategoriesPage = () => {
  const categories = [
    { name: 'Antibiotics', items: 120, icon: '💊' },
    { name: 'Analgesics', items: 85, icon: '🧪' },
    { name: 'Vitamins', items: 45, icon: '🍎' },
    { name: 'Skincare', items: 30, icon: '🧴' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#1a3a3a]">Medicine Categories</h1>
        <button className="bg-[#1a3a3a] text-white px-4 py-2 rounded-xl text-sm font-bold">+ New Category</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{cat.icon}</span>
              <button className="text-gray-400 group-hover:text-gray-600"><MoreVertical size={20} /></button>
            </div>
            <h3 className="text-lg font-bold text-gray-800">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.items} Products</p>
            <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#2c6774] h-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;