// import React from 'react';
// import { FaFlask, FaMicroscope } from 'react-icons/fa';
// import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

// export default function TestsTab({ tests, searchText, setSearchText, lab, theme, onAddTest, onEditTest, onDeleteTest }) {
//   // Safe check - ensure tests is an array
//   const testsArray = Array.isArray(tests) ? tests : [];
  
//   const filteredTests = testsArray.filter(t => 
//     !searchText || t?.name?.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const calculateDiscountedPrice = (originalPrice) => {
//     if (!originalPrice) return 0;
//     const labDiscount = lab?.discount || 0;
//     return originalPrice - (originalPrice * labDiscount / 100);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm">
//       <div className="p-4 border-b" style={{ borderBottomColor: `${theme.primary}20` }}>
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
//               <FaFlask size={20} />
//             </div>
//             <h2 className="text-xl font-semibold">Test Management</h2>
//             <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>{testsArray.length} Tests</span>
//           </div>
//           <div className="flex gap-3">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//               <input type="text" placeholder="Search tests..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2" style={{ outlineColor: theme.primary }} />
//             </div>
//             <button onClick={onAddTest} className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: theme.primary }}>
//               <FiPlus size={16} /> Add Test
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead style={{ backgroundColor: `${theme.bgLight || '#9fbfc5'}30` }}>
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Test Details</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Discounted</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {filteredTests.map((test) => {
//               const discountedPrice = calculateDiscountedPrice(test.price);
//               return (
//                 <tr key={test._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
//                         <FaMicroscope size={16} />
//                       </div>
//                       <div>
//                         <p className="font-medium">{test.name}</p>
//                         {test.description && <p className="text-sm text-gray-500">{test.description}</p>}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">₹{test.price?.toLocaleString() || 0}</td>
//                   <td className="px-4 py-3"><p className="font-semibold" style={{ color: theme.primary }}>₹{discountedPrice.toLocaleString()}</p></td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2">
//                       <button onClick={() => onEditTest(test)} className="p-2 border rounded-lg hover:bg-gray-50"><FiEdit2 size={16} /></button>
//                       <button onClick={() => onDeleteTest(test._id)} className="p-2 border rounded-lg hover:bg-red-50 text-red-600"><FiTrash2 size={16} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {filteredTests.length === 0 && (
//         <div className="py-12 text-center"><FaFlask size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No tests found</p></div>
//       )}
//     </div>
//   );
// }


import React from 'react';
import { FaFlask, FaMicroscope } from 'react-icons/fa';
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function TestsTab({
  tests,
  searchText,
  setSearchText,
  lab,
  theme,
  onAddTest,
  onEditTest,
  onDeleteTest
}) {
  // ✅ Ensure tests is always an array
  const testsArray = Array.isArray(tests) ? tests : [];

  // ✅ Safe theme fallback
  const primary = theme?.primary || "#0d9488";
  const bgLight = theme?.bgLight || "#9fbfc5";

  // ✅ Optimize search
  const searchLower = (searchText || "").toLowerCase();

  const filteredTests = testsArray.filter(t =>
    !searchLower || t?.name?.toLowerCase()?.includes(searchLower)
  );

  // ✅ Safe discount calculation
  const calculateDiscountedPrice = (originalPrice) => {
    if (originalPrice == null) return 0;
    const labDiscount = lab?.discount ?? 0;
    return Math.max(0, originalPrice - (originalPrice * labDiscount / 100));
  };

  // ✅ Professional price formatter (PKR)
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-PK').format(price);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      
      {/* Header */}
      <div className="p-4 border-b" style={{ borderBottomColor: `${primary}20` }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${primary}20`, color: primary }}
            >
              <FaFlask size={20} />
            </div>

            <h2 className="text-xl font-semibold">Test Management</h2>

            <span
              className="px-2 py-1 rounded-full text-xs"
              style={{ backgroundColor: `${primary}20`, color: primary }}
            >
              {testsArray.length} Tests
            </span>
          </div>

          <div className="flex gap-3">
            
            {/* Search */}
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search tests..."
                value={searchText || ""}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ outlineColor: primary }}
              />
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={() => onAddTest?.()}
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: primary }}
            >
              <FiPlus size={16} /> Add Test
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          
          <thead style={{ backgroundColor: `${bgLight}30` }}>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Test Details</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Discounted</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredTests.map((test, index) => {
              const discountedPrice = calculateDiscountedPrice(test.price);

              return (
                <tr key={test._id || `${test.name}-${index}`} className="hover:bg-gray-50">
                  
                  {/* Test Details */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${primary}20`, color: primary }}
                      >
                        <FaMicroscope size={16} />
                      </div>

                      <div>
                        <p className="font-medium">{test.name || "Unnamed Test"}</p>
                        {test.description && (
                          <p className="text-sm text-gray-500">{test.description}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3">
                    ₨{formatPrice(test.price || 0)}
                  </td>

                  {/* Discounted Price */}
                  <td className="px-4 py-3">
                    <p className="font-semibold" style={{ color: primary }}>
                      ₨{formatPrice(discountedPrice)}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      
                      <button
                        title="Edit Test"
                        onClick={() => onEditTest?.(test)}
                        className="p-2 border rounded-lg hover:bg-gray-50"
                      >
                        <FiEdit2 size={16} />
                      </button>

                      <button
                        title="Delete Test"
                        onClick={() => onDeleteTest?.(test._id)}
                        className="p-2 border rounded-lg hover:bg-red-50 text-red-600"
                      >
                        <FiTrash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredTests.length === 0 && (
        <div className="py-12 text-center">
          <FaFlask size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">
            {searchText ? "No matching tests found" : "No tests available"}
          </p>
        </div>
      )}
    </div>
  );
}