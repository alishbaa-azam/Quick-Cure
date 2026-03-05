// import React from 'react';
// import { Link } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//       {/* Medicine Image */}
//       <img
//         src={medicine.image}
//         alt={medicine.name}
//         className="w-full h-48 object-cover"
//       />
      
//       {/* Medicine Info */}
//       <div className="p-4">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">
//           {medicine.name}
//         </h3>
//         <p className="text-gray-600 mb-4">{medicine.description}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-2xl font-bold text-green-600">
//             ${medicine.price}
//           </span>
//         </div>
        
//         {/* Buttons */}
//         <div className="flex space-x-2 mt-4">
//           <button
//             onClick={() => onAddToCart(medicine)}
//             className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//           >
//             Add to Cart
//           </button>
//           <Link
//             to={`/medicine/${medicine.id}`}
//             className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors text-center"
//           >
//             Learn More
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;








//Below code is perfect size of cards.
// import React from 'react';
// import { Link } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart }) => {
//   return (
//     <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
//      
// {/* Medicine Image - Ultra compact */}
//       {/* <div className="relative h-24 bg-gray-50"> */}
//       {/* <div className="relative h-24 bg-gray-50 flex items-center justify-center p-1"> */}
// <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//         <img
//           src={medicine.image}
//           alt={medicine.name}
//           // className="w-full h-full object-contain p-1"
//           // className="max-w-full max-h-full object-contain"
//           className="w-full h-full object-cover"
//         />
//       </div>
      
//       {/* Medicine Info - Ultra compact */}
//       <div className="p-1.5">
//         <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//           {medicine.name}
//         </h3>
//         <p className="text-[10px] text-gray-600 line-clamp-2 mb-1.5">
//           {medicine.description}
//         </p>
        
//         <div className="flex justify-between items-center mb-1.5">
//           <span className="text-sm font-bold text-green-600">
//             ${medicine.price}
//           </span>
//         </div>
        
//         {/* Buttons - Ultra compact */}
//         <div className="flex space-x-1">
//           <button
//             onClick={() => onAddToCart(medicine)}
//             className="flex-1 bg-[var(--primary-color)] text-white py-1 px-1.5 rounded hover:bg-[var(--secondary-color)] transition-colors text-[10px] font-medium"
//           >
//             Add to Cart
//           </button>
//           <Link
//             to={`/medicine/${medicine.id}`}
//             className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;





//The below code is with backend integration
// import React from 'react';
// import { Link } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart }) => {
//   // Calculate final price with discount
//   const finalPrice = medicine.discountedPrice || 
//     (medicine.discountPercentage > 0 
//       ? medicine.price * (1 - medicine.discountPercentage / 100)
//       : medicine.price);

//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-150 w-full max-w-[200px] mx-auto">
//       {/* Medicine Image */}
//       <div className="relative h-32 bg-gray-50 flex items-center justify-center p-2">
//         <img
//           src={medicine.image}
//           alt={medicine.name}
//           className="w-full h-full object-contain"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//           }}
//         />
//         {isDiscounted && (
//           <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//             {medicine.discountPercentage > 0 
//               ? `${medicine.discountPercentage}% OFF` 
//               : 'SALE'}
//           </div>
//         )}
//         {!medicine.inStock && (
//           <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
//             OUT OF STOCK
//           </div>
//         )}
//       </div>
      
//       {/* Medicine Info */}
//       <div className="p-3">
//         <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
//           {medicine.name}
//         </h3>
//         {medicine.brand && (
//           <p className="text-xs text-gray-500 mb-1">{medicine.brand}</p>
//         )}
//         <p className="text-xs text-gray-600 line-clamp-2 mb-2 min-h-[2.5rem]">
//           {medicine.description}
//         </p>
        
//         {/* Price */}
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <span className="text-base font-bold text-green-600">
//               ${finalPrice.toFixed(2)}
//             </span>
//             {isDiscounted && medicine.price > finalPrice && (
//               <span className="text-xs text-gray-500 line-through ml-2">
//                 ${medicine.price.toFixed(2)}
//               </span>
//             )}
//           </div>
//           {medicine.prescriptionRequired && (
//             <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//               Rx
//             </span>
//           )}
//         </div>
        
//         {/* Buttons */}
//         <div className="flex space-x-2">
//           <button
//             onClick={() => onAddToCart(medicine)}
//             disabled={!medicine.inStock}
//             className={`flex-1 py-2 px-3 rounded text-xs font-medium transition-colors ${
//               medicine.inStock
//                 ? 'bg-[var(--primary-color)] text-white hover:bg-blue-700'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
//           </button>
//           <Link
//             to={`/medicine/${medicine._id}`}
//             className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded hover:bg-gray-200 transition-colors text-xs font-medium text-center"
//           >
//             Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;
















//Just to check if not good UI then above will use
// import React, { useState } from 'react';

// const MedicineCard = ({ medicine, addToCart, cart }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     // Ensure all required fields are present
//     const medicineToAdd = {
//       ...medicine,
//       _id: medicine._id,
//       name: medicine.name || 'Unknown Medicine',
//       price: medicine.price || 0,
//       discountedPrice: medicine.discountedPrice || medicine.price || 0,
//       image: medicine.image || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=500'
//     };
    
//     addToCart(medicineToAdd);
//   };

//   // Check if this medicine is already in cart
//   const isInCart = cart.find(item => item.id === medicine._id);

//   return (
//     <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
//       {/* Medicine image */}
//       <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-gray-100">
//         <img 
//           src={medicine.image} 
//           alt={medicine.name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=500';
//           }}
//         />
//       </div>
      
//       {/* Medicine details */}
//       <div className="mb-4">
//         <h3 className="font-bold text-gray-900 mb-1 truncate">{medicine.name}</h3>
//         <p className="text-sm text-gray-600 mb-2 truncate">{medicine.genericName || medicine.description?.substring(0, 50)}</p>
//         <div className="flex items-center justify-between mb-2">
//           <div>
//             {medicine.discountedPrice && medicine.discountedPrice < medicine.price ? (
//               <>
//                 <span className="text-lg font-bold text-gray-900">Rs. {medicine.discountedPrice}</span>
//                 <span className="text-sm text-gray-500 line-through ml-2">Rs. {medicine.price}</span>
//               </>
//             ) : (
//               <span className="text-lg font-bold text-gray-900">Rs. {medicine.price || 0}</span>
//             )}
//           </div>
//           <div className="flex items-center">
//             <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//             <span className="text-sm font-medium">{medicine.rating || 4.0}</span>
//           </div>
//         </div>
//       </div>

//       {/* Add to cart button */}
//       {isInCart ? (
//         <div className="flex items-center justify-between">
//           <span className="text-green-600 font-medium text-sm">✓ Added to cart</span>
//           <button
//             onClick={handleAddToCart}
//             className="px-4 py-2 bg-blue-50 text-[var(--primary-color)] rounded-lg font-medium hover:bg-blue-100 transition-colors"
//           >
//             Add More
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={handleAddToCart}
//           className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//         >
//           Add to Cart
//         </button>
//       )}
//     </div>
//   );
// };

// export default MedicineCard;




























//The below code is correct css and backen API attached
// import React from 'react';
// import { Link } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart }) => {
//   // Calculate final price with discount (keep your original $medicine.price format)
//   const finalPrice = medicine.discountedPrice || 
//     (medicine.discountPercentage > 0 
//       ? medicine.price * (1 - medicine.discountPercentage / 100)
//       : medicine.price);

//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;

//   return (
//     <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
      
//   {/* Medicine Image - Ultra compact */}
//       <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//         <img
//           src={medicine.image}
//           alt={medicine.name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//           }}
//         />
//         {/* Discount badge - smaller to match original style */}
//         {isDiscounted && (
//           <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//             {medicine.discountPercentage > 0 
//               ? `${medicine.discountPercentage}%` 
//               : 'SALE'}
//           </div>
//         )}
//         {/* Out of stock badge - smaller */}
//         {!medicine.inStock && (
//           <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//             OOS
//           </div>
//         )}
//       </div>
      
//       {/* Medicine Info - Ultra compact */}
//       <div className="p-1.5">
//         <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//           {medicine.name}
//         </h3>
//         {/* {medicine.brand && (
//           <p className="text-[10px] text-gray-500 mb-0.5">{medicine.brand}</p>
//         )} */}
//         <p className="text-[10px] text-gray-600 line-clamp-2 mb-1.5">
//           {medicine.description}
//         </p>
        
//         <div className="flex justify-between items-center mb-1.5">
//           <div className="flex items-center">
//             <span className="text-sm font-bold text-green-600">
//               Rs. {finalPrice.toFixed(2)}
//             </span>
//             {isDiscounted && medicine.price > finalPrice && (
//               <span className="text-[10px] text-gray-500 line-through ml-1">
//                 Rs. {medicine.price.toFixed(2)}
//               </span>
//             )}
//           </div>
//           {/* Prescription badge - smaller */}
//           {medicine.prescriptionRequired && (
//             <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//               Rx
//             </span>
//           )}
//           {/* Prescription badge with tooltip */}
// {/* {medicine.prescriptionRequired && (
//   <div className="relative group">
//     <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium cursor-help">
//       Prescription Required
//     </span>
//     <div className="absolute hidden group-hover:block z-10 w-48 p-2 mt-1 text-xs bg-gray-800 text-white rounded-lg shadow-lg">
//       Requires doctor's prescription. Upload when ordering.
//     </div>
//   </div>
// )} */}
//         </div>
        
//         {/* Buttons - Ultra compact */}
//         <div className="flex space-x-1">
//           <button
//             onClick={() => onAddToCart(medicine)}
//             disabled={!medicine.inStock}
//             className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
//               medicine.inStock
//                 ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
//           </button>
//           <Link
//             to={`/medicine/${medicine._id}`}
//             className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;






//--------------------------------------------------------------------
//New code with aggregation
// import React from 'react';
// import { Link } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart, context = 'all-medicines' }) => {
//   // Determine if this is aggregated view or pharmacy-specific view
//   const isAggregatedView = context === 'all-medicines' && medicine.priceStats;
//   const isPharmacyView = context === 'pharmacy-detail';
  
//   // Calculate price based on context
//   let finalPrice, originalPrice, discountPercentage, isDiscounted;
  
//   if (isAggregatedView) {
//     // "All Medicines" page - aggregated data
//     finalPrice = medicine.priceStats?.displayPrice || medicine.price || 0;
//     originalPrice = medicine.priceStats?.lowestPrice || medicine.price || 0;
//     discountPercentage = medicine.priceStats?.discountPercentage || 0;
//     isDiscounted = medicine.priceStats?.hasDiscount || false;
//   } else {
//     // Pharmacy Detail page - specific pharmacy price
//     finalPrice = medicine.discountedPrice || 
//       (medicine.discountPercentage > 0 
//         ? medicine.price * (1 - medicine.discountPercentage / 100)
//         : medicine.price);
//     originalPrice = medicine.price || 0;
//     discountPercentage = medicine.discountPercentage || 0;
//     isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   }
  
//   // Check availability based on context
//   const isAvailable = isAggregatedView 
//     ? (medicine.availableAtCount > 0 || medicine.inStock)
//     : (medicine.inStock !== false);

//   return (
//     <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
      
//       {/* Medicine Image */}
//       <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//         <img
//           src={medicine.image}
//           alt={medicine.name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//           }}
//         />
        
//         {/* Discount badge */}
//         {isDiscounted && (
//           <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//             {discountPercentage > 0 ? `${discountPercentage}%` : 'SALE'}
//           </div>
//         )}
        
//         {/* Out of stock badge */}
//         {!isAvailable && (
//           <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//             OOS
//           </div>
//         )}
        
//         {/* Available at multiple pharmacies badge (only in aggregated view) */}
//         {isAggregatedView && medicine.availableAtCount > 1 && (
//           <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//             {medicine.availableAtCount} stores
//           </div>
//         )}
//       </div>
      
//       {/* Medicine Info */}
//       <div className="p-1.5">
//         <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//           {medicine.name}
//         </h3>
        
//         {medicine.genericName && (
//           <p className="text-[10px] text-gray-500 mb-0.5">{medicine.genericName}</p>
//         )}
      
//           <div className="mb-1.0 min-h-[2.5rem]">
//   <p className="text-[10px] text-gray-600 line-clamp-2">
//     {medicine.description}
//   </p>
// </div>

//         <div className="flex justify-between items-center mb-1.5">
//           <div className="flex items-center">
//             <span className="text-sm font-bold text-green-600">
//               Rs. {finalPrice.toFixed(2)}
//             </span>
            
//             {/* Show original price if discounted */}
//             {isDiscounted && originalPrice > finalPrice && (
//               <span className="text-[10px] text-gray-500 line-through ml-1">
//                 Rs. {originalPrice.toFixed(2)}
//               </span>
//             )}
            
//             {/* Show price range for aggregated view */}
//             {isAggregatedView && medicine.priceStats && (
//               <span className="text-[10px] text-gray-500 ml-1">
//                 ({medicine.availableAtCount} stores)
//               </span>
//             )}
//           </div>
          
//           {/* Prescription badge */}
//           {medicine.prescriptionRequired && (
//             <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//               Rx
//             </span>
//           )}
//         </div>
        
//         {/* Buttons */}
//         <div className="flex space-x-1">
//           <button
//             onClick={() => onAddToCart(medicine)}
//             disabled={!isAvailable}
//             className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
//               isAvailable
//                 ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {isAvailable ? 'Add to Cart' : 'Out of Stock'}
//           </button>
          
//           {/* Link to medicine detail page */}
//           {isAggregatedView ? (
//             // Link to aggregated medicine detail (by name)
//             <Link
//               to={`/medicines/${encodeURIComponent(medicine.name)}`}
//               className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//             >
//               Compare
//             </Link>
//           ) : (
//             // Link to medicine detail page (by ID)
//             <Link
//               to={`/medicine/${medicine._id}`}
//               className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//             >
//               Details
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;




















//--------------Login attached
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart, context = 'all-medicines' }) => {
//   const navigate = useNavigate();
  
//   // Check if user is logged in
//   const isLoggedIn = () => {
//     const token = localStorage.getItem('authToken');
//     const user = localStorage.getItem('user');
//     return !!(token && user);
//   };

//   // Redirect to login if not logged in
//   const requireLogin = (actionType) => {
//     if (!isLoggedIn()) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: `Please login to ${actionType}` 
//         } 
//       });
//       return false;
//     }
//     return true;
//   };

//   // Wrapper for add to cart with login check
//   const handleAddToCart = (medicine) => {
//     if (!requireLogin('add to cart')) return;
//     onAddToCart(medicine);
//   };

 

//   // Determine if this is aggregated view or pharmacy-specific view
//   const isAggregatedView = context === 'all-medicines' && medicine.priceStats;
//   const isPharmacyView = context === 'pharmacy-detail';
  
//   // Calculate price based on context
//   let finalPrice, originalPrice, discountPercentage, isDiscounted;
  
//   if (isAggregatedView) {
//     // "All Medicines" page - aggregated data
//     finalPrice = medicine.priceStats?.displayPrice || medicine.price || 0;
//     originalPrice = medicine.priceStats?.lowestPrice || medicine.price || 0;
//     discountPercentage = medicine.priceStats?.discountPercentage || 0;
//     isDiscounted = medicine.priceStats?.hasDiscount || false;
//   } else {
//     // Pharmacy Detail page - specific pharmacy price
//     finalPrice = medicine.discountedPrice || 
//       (medicine.discountPercentage > 0 
//         ? medicine.price * (1 - medicine.discountPercentage / 100)
//         : medicine.price);
//     originalPrice = medicine.price || 0;
//     discountPercentage = medicine.discountPercentage || 0;
//     isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   }
  
//   // Check availability based on context
//   const isAvailable = isAggregatedView 
//     ? (medicine.availableAtCount > 0 || medicine.inStock)
//     : (medicine.inStock !== false);

//   return (
//     <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
      
//       {/* Medicine Image */}
//       <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//         <img
//           src={medicine.image}
//           alt={medicine.name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//           }}
//         />
        
//         {/* Discount badge */}
//         {isDiscounted && (
//           <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//             {discountPercentage > 0 ? `${discountPercentage}%` : 'SALE'}
//           </div>
//         )}
        
//         {/* Out of stock badge */}
//         {!isAvailable && (
//           <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//             OOS
//           </div>
//         )}
        
//         {/* Available at multiple pharmacies badge (only in aggregated view) */}
//         {isAggregatedView && medicine.availableAtCount > 1 && (
//           <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//             {medicine.availableAtCount} stores
//           </div>
//         )}
//       </div>
      
//       {/* Medicine Info */}
//       <div className="p-1.5">
//         <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//           {medicine.name}
//         </h3>
        
//         {medicine.genericName && (
//           <p className="text-[10px] text-gray-500 mb-0.5">{medicine.genericName}</p>
//         )}
      
//         <div className="mb-1.0 min-h-[2.5rem]">
//           <p className="text-[10px] text-gray-600 line-clamp-2">
//             {medicine.description}
//           </p>
//         </div>

//         <div className="flex justify-between items-center mb-1.5">
//           <div className="flex items-center">
//             <span className="text-sm font-bold text-green-600">
//               Rs. {finalPrice.toFixed(2)}
//             </span>
            
//             {/* Show original price if discounted */}
//             {isDiscounted && originalPrice > finalPrice && (
//               <span className="text-[10px] text-gray-500 line-through ml-1">
//                 Rs. {originalPrice.toFixed(2)}
//               </span>
//             )}
            
//             {/* Show price range for aggregated view */}
//             {isAggregatedView && medicine.priceStats && (
//               <span className="text-[10px] text-gray-500 ml-1">
//                 ({medicine.availableAtCount} stores)
//               </span>
//             )}
//           </div>
          
//           {/* Prescription badge */}
//           {medicine.prescriptionRequired && (
//             <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//               Rx
//             </span>
//           )}
//         </div>
        
//         {/* Buttons */}
//         <div className="flex space-x-1">
//           <button
//             onClick={() => handleAddToCart(medicine)}
//             disabled={!isAvailable}
//             className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
//               isAvailable
//                 ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {isAvailable ? 'Add to Cart' : 'Out of Stock'}
//           </button>
          
//           {/* Link to medicine detail page */}
//           {isAggregatedView ? (
//             // Link to aggregated medicine detail (by name)
//             <Link
//               to={`/medicines/${encodeURIComponent(medicine.name)}`}
//               onClick={(e) => handleNavigation(e, `/medicines/${encodeURIComponent(medicine.name)}`, 'view details')}
//               className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//             >
//               Compare
//             </Link>
//           ) : (
//             // Link to medicine detail page (by ID)
//             <Link
//               to={`/medicine/${medicine._id}`}
//               onClick={(e) => handleNavigation(e, `/medicine/${medicine._id}`, 'view details')}
//               className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//             >
//               Details
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;





























//-------------Only pharmacy not allowed corrected-----------------
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart, context = 'all-medicines' }) => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [popupType, setPopupType] = useState('error'); // 'error' or 'info'
  
//   // Get user info from localStorage
//   const getUser = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       return userStr ? JSON.parse(userStr) : null;
//     } catch (error) {
//       return null;
//     }
//   };

//   // Check if user is logged in
//   const isLoggedIn = () => {
//     const token = localStorage.getItem('authToken');
//     const user = localStorage.getItem('user');
//     return !!(token && user);
//   };

//   // Check if user has pharmacy role
//   const isPharmacyUser = () => {
//     const user = getUser();
//     return user && user.role === 'pharmacy';
//   };

//   // Show popup message
//   const showPopupMessage = (message, type = 'error') => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setShowPopup(true);
//   };

//   // Close popup
//   const closePopup = () => {
//     setShowPopup(false);
//     setPopupMessage('');
//   };

//   // Handle add to cart with proper validation
//   const handleAddToCart = (medicine) => {
//     if (!isLoggedIn()) {
//       // Not logged in - redirect to login
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Please login to add to cart' 
//         } 
//       });
//       return;
//     }
    
//     if (isPharmacyUser()) {
//       // Pharmacy user - show popup message
//       showPopupMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.', 'error');
//       return;
//     }
    
//     // Regular user - proceed with add to cart
//     onAddToCart(medicine);
//     // Optional: Show success message
//     showPopupMessage('Item added to cart successfully!', 'info');
//   };

//   // Determine if this is aggregated view or pharmacy-specific view
//   const isAggregatedView = context === 'all-medicines' && medicine.priceStats;
//   const isPharmacyView = context === 'pharmacy-detail';
  
//   // Calculate price based on context
//   let finalPrice, originalPrice, discountPercentage, isDiscounted;
  
//   if (isAggregatedView) {
//     // "All Medicines" page - aggregated data
//     finalPrice = medicine.priceStats?.displayPrice || medicine.price || 0;
//     originalPrice = medicine.priceStats?.lowestPrice || medicine.price || 0;
//     discountPercentage = medicine.priceStats?.discountPercentage || 0;
//     isDiscounted = medicine.priceStats?.hasDiscount || false;
//   } else {
//     // Pharmacy Detail page - specific pharmacy price
//     finalPrice = medicine.discountedPrice || 
//       (medicine.discountPercentage > 0 
//         ? medicine.price * (1 - medicine.discountPercentage / 100)
//         : medicine.price);
//     originalPrice = medicine.price || 0;
//     discountPercentage = medicine.discountPercentage || 0;
//     isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   }
  
//   // Check availability based on context
//   const isAvailable = isAggregatedView 
//     ? (medicine.availableAtCount > 0 || medicine.inStock)
//     : (medicine.inStock !== false);

//   return (
//     <>
//       {/* Popup/Modal */}
//       {showPopup && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             borderRadius: '8px',
//             padding: '20px',
//             width: '90%',
//             maxWidth: '400px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//           }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '15px'
//             }}>
//               <h3 style={{
//                 margin: 0,
//                 color: popupType === 'error' ? '#dc2626' : '#059669',
//                 fontSize: '18px'
//               }}>
//                 {popupType === 'error' ? 'Error' : 'Success'}
//               </h3>
//               <button
//                 onClick={closePopup}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '20px',
//                   cursor: 'pointer',
//                   color: '#666'
//                 }}
//               >
//                 ×
//               </button>
//             </div>
            
//             <p style={{
//               marginBottom: '20px',
//               color: '#333',
//               lineHeight: '1.5'
//             }}>
//               {popupMessage}
//             </p>
            
//             <div style={{
//               display: 'flex',
//               justifyContent: 'flex-end'
//             }}>
//               <button
//                 onClick={closePopup}
//                 style={{
//                   backgroundColor: popupType === 'error' ? '#dc2626' : '#059669',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Medicine Card */}
//       <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
        
//         {/* Medicine Image */}
//         <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//           <img
//             src={medicine.image}
//             alt={medicine.name}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//             }}
//           />
          
//           {/* Discount badge */}
//           {isDiscounted && (
//             <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {discountPercentage > 0 ? `${discountPercentage}%` : 'SALE'}
//             </div>
//           )}
          
//           {/* Out of stock badge */}
//           {!isAvailable && (
//             <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               OOS
//             </div>
//           )}
          
//           {/* Available at multiple pharmacies badge (only in aggregated view) */}
//           {isAggregatedView && medicine.availableAtCount > 1 && (
//             <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {medicine.availableAtCount} stores
//             </div>
//           )}
//         </div>
        
//         {/* Medicine Info */}
//         <div className="p-1.5">
//           <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//             {medicine.name}
//           </h3>
          
//           {medicine.genericName && (
//             <p className="text-[10px] text-gray-500 mb-0.5">{medicine.genericName}</p>
//           )}
        
//           <div className="mb-1.0 min-h-[2.5rem]">
//             <p className="text-[10px] text-gray-600 line-clamp-2">
//               {medicine.description}
//             </p>
//           </div>

//           <div className="flex justify-between items-center mb-1.5">
//             <div className="flex items-center">
//               <span className="text-sm font-bold text-green-600">
//                 Rs. {finalPrice.toFixed(2)}
//               </span>
              
//               {/* Show original price if discounted */}
//               {isDiscounted && originalPrice > finalPrice && (
//                 <span className="text-[10px] text-gray-500 line-through ml-1">
//                   Rs. {originalPrice.toFixed(2)}
//                 </span>
//               )}
              
//               {/* Show price range for aggregated view */}
//               {isAggregatedView && medicine.priceStats && (
//                 <span className="text-[10px] text-gray-500 ml-1">
//                   ({medicine.availableAtCount} stores)
//                 </span>
//               )}
//             </div>
            
//             {/* Prescription badge */}
//             {medicine.prescriptionRequired && (
//               <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                 Rx
//               </span>
//             )}
//           </div>
          
//           {/* Buttons */}
//           <div className="flex space-x-1">
//             <button
//               onClick={() => handleAddToCart(medicine)}
//               disabled={!isAvailable || isPharmacyUser()}
//               className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
//                 isAvailable && !isPharmacyUser()
//                   ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               {isAvailable ? (isPharmacyUser() ? 'Not Allowed' : 'Add to Cart') : 'Out of Stock'}
//             </button>
            
//             {/* Link to medicine detail page */}
//             {isAggregatedView ? (
//               // Link to aggregated medicine detail (by name)
//               <Link
//                 to={`/medicines/${encodeURIComponent(medicine.name)}`}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Compare
//               </Link>
//             ) : (
//               // Link to medicine detail page (by ID)
//               <Link
//                 to={`/medicine/${medicine._id}`}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Details
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MedicineCard;




































//--------------------- login corrected-----------------
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart, context = 'all-medicines' }) => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [popupType, setPopupType] = useState('error'); // 'error' or 'info'
//   const [isPharmacy, setIsPharmacy] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     const checkAuth = () => {
//       try {
//         // Use same keys as pharmacy dashboard
//         const token = localStorage.getItem('token');
//         const userStr = localStorage.getItem('user');
        
//         if (token && userStr) {
//           const user = JSON.parse(userStr);
//           setIsLoggedIn(true);
//           setUserData(user);
//           // Check if user is pharmacy (same logic as pharmacy dashboard)
//           setIsPharmacy(user.role === 'pharmacy');
//         } else {
//           setIsLoggedIn(false);
//           setUserData(null);
//           setIsPharmacy(false);
//         }
//       } catch (error) {
//         console.error('Error checking auth:', error);
//         setIsLoggedIn(false);
//         setUserData(null);
//         setIsPharmacy(false);
//       }
//     };

//     checkAuth();

//     // Listen for storage changes
//     const handleStorageChange = () => {
//       checkAuth();
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   // Show popup message
//   const showPopupMessage = (message, type = 'error') => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setShowPopup(true);
//   };

//   // Close popup
//   const closePopup = () => {
//     setShowPopup(false);
//     setPopupMessage('');
//   };

//   // Handle add to cart with proper validation
//   const handleAddToCart = (medicine) => {
//     // Direct check from localStorage (same as pharmacy dashboard)
//     const token = localStorage.getItem('token');
//     const userStr = localStorage.getItem('user');
    
//     if (!token || !userStr) {
//       // Not logged in - redirect to login
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Please login to add to cart' 
//         } 
//       });
//       return;
//     }

//     // Parse user data
//     let user = null;
//     try {
//       user = JSON.parse(userStr);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       // Invalid user data - redirect to login
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Session expired. Please login again.' 
//         } 
//       });
//       return;
//     }

//     // Check if pharmacy user (same logic as pharmacy dashboard)
//     if (user && user.role === 'pharmacy') {
//       // Pharmacy user - show popup message
//       showPopupMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.', 'error');
//       return;
//     }

//     // Regular user - proceed with add to cart
//     if (onAddToCart) {
//       onAddToCart(medicine);
//       // Optional: Show success message
//       showPopupMessage('Item added to cart successfully!', 'info');
//     }
//   };

//   // Handle navigation with login check (if needed for details)
//   const handleViewDetails = (e, path) => {
//     e.preventDefault();
//     navigate(path);
//   };

//   // Determine if this is aggregated view or pharmacy-specific view
//   const isAggregatedView = context === 'all-medicines' && medicine.priceStats;
  
//   // Calculate price based on context
//   let finalPrice, originalPrice, discountPercentage, isDiscounted;
  
//   if (isAggregatedView) {
//     // "All Medicines" page - aggregated data
//     finalPrice = medicine.priceStats?.displayPrice || medicine.price || 0;
//     originalPrice = medicine.priceStats?.lowestPrice || medicine.price || 0;
//     discountPercentage = medicine.priceStats?.discountPercentage || 0;
//     isDiscounted = medicine.priceStats?.hasDiscount || false;
//   } else {
//     // Pharmacy Detail page - specific pharmacy price
//     finalPrice = medicine.discountedPrice || 
//       (medicine.discountPercentage > 0 
//         ? medicine.price * (1 - medicine.discountPercentage / 100)
//         : medicine.price);
//     originalPrice = medicine.price || 0;
//     discountPercentage = medicine.discountPercentage || 0;
//     isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   }
  
//   // Check availability based on context
//   const isAvailable = isAggregatedView 
//     ? (medicine.availableAtCount > 0 || medicine.inStock)
//     : (medicine.inStock !== false);

//   return (
//     <>
//       {/* Popup/Modal */}
//       {showPopup && (
//         <div 
//           onClick={closePopup}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 1000
//           }}
//         >
//           <div 
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               padding: '20px',
//               width: '90%',
//               maxWidth: '400px',
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }}
//           >
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '15px'
//             }}>
//               <h3 style={{
//                 margin: 0,
//                 color: popupType === 'error' ? '#dc2626' : '#059669',
//                 fontSize: '18px'
//               }}>
//                 {popupType === 'error' ? 'Error' : 'Success'}
//               </h3>
//               <button
//                 onClick={closePopup}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '20px',
//                   cursor: 'pointer',
//                   color: '#666'
//                 }}
//               >
//                 ×
//               </button>
//             </div>
            
//             <p style={{
//               marginBottom: '20px',
//               color: '#333',
//               lineHeight: '1.5'
//             }}>
//               {popupMessage}
//             </p>
            
//             <div style={{
//               display: 'flex',
//               justifyContent: 'flex-end'
//             }}>
//               <button
//                 onClick={closePopup}
//                 style={{
//                   backgroundColor: popupType === 'error' ? '#dc2626' : '#059669',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Medicine Card */}
//       <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
        
//         {/* Medicine Image */}
//         <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//           <img
//             src={medicine.image}
//             alt={medicine.name}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//             }}
//           />
          
//           {/* Discount badge */}
//           {isDiscounted && (
//             <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {discountPercentage > 0 ? `${discountPercentage}%` : 'SALE'}
//             </div>
//           )}
          
//           {/* Out of stock badge */}
//           {!isAvailable && (
//             <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               OOS
//             </div>
//           )}
          
//           {/* Available at multiple pharmacies badge (only in aggregated view) */}
//           {isAggregatedView && medicine.availableAtCount > 1 && (
//             <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {medicine.availableAtCount} stores
//             </div>
//           )}
//         </div>
        
//         {/* Medicine Info */}
//         <div className="p-1.5">
//           <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//             {medicine.name}
//           </h3>
          
//           {medicine.genericName && (
//             <p className="text-[10px] text-gray-500 mb-0.5">{medicine.genericName}</p>
//           )}
        
//           <div className="mb-1.0 min-h-[2.5rem]">
//             <p className="text-[10px] text-gray-600 line-clamp-2">
//               {medicine.description}
//             </p>
//           </div>

//           <div className="flex justify-between items-center mb-1.5">
//             <div className="flex items-center">
//               <span className="text-sm font-bold text-green-600">
//                 Rs. {finalPrice.toFixed(2)}
//               </span>
              
//               {/* Show original price if discounted */}
//               {isDiscounted && originalPrice > finalPrice && (
//                 <span className="text-[10px] text-gray-500 line-through ml-1">
//                   Rs. {originalPrice.toFixed(2)}
//                 </span>
//               )}
              
//               {/* Show price range for aggregated view */}
//               {isAggregatedView && medicine.priceStats && (
//                 <span className="text-[10px] text-gray-500 ml-1">
//                   ({medicine.availableAtCount} stores)
//                 </span>
//               )}
//             </div>
            
//             {/* Prescription badge */}
//             {medicine.prescriptionRequired && (
//               <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                 Rx
//               </span>
//             )}
//           </div>
          
//           {/* Buttons */}
//           <div className="flex space-x-1">
//             <button
//               onClick={() => handleAddToCart(medicine)}
//               disabled={!isAvailable || isPharmacy}
//               className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
//                 isAvailable && !isPharmacy
//                   ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               {isAvailable ? (isPharmacy ? 'Not Allowed' : 'Add to Cart') : 'Out of Stock'}
//             </button>
            
//             {/* Link to medicine detail page */}
//             {isAggregatedView ? (
//               // Link to aggregated medicine detail (by name)
//               <Link
//                 to={`/medicines/${encodeURIComponent(medicine.name)}`}
//                 onClick={(e) => handleViewDetails(e, `/medicines/${encodeURIComponent(medicine.name)}`)}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Compare
//               </Link>
//             ) : (
//               // Link to medicine detail page (by ID)
//               <Link
//                 to={`/medicine/${medicine._id}`}
//                 onClick={(e) => handleViewDetails(e, `/medicine/${medicine._id}`)}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Details
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MedicineCard;




















//--------------cart persistence check---------------
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart, context = 'all-medicines' }) => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [popupType, setPopupType] = useState('error'); // 'error' or 'info'
//   const [isPharmacy, setIsPharmacy] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     const checkAuth = () => {
//       try {
//         // Use same keys as pharmacy dashboard
//         const token = localStorage.getItem('token');
//         const userStr = localStorage.getItem('user');
        
//         if (token && userStr) {
//           const user = JSON.parse(userStr);
//           setIsLoggedIn(true);
//           setUserData(user);
//           // Check if user is pharmacy (same logic as pharmacy dashboard)
//           setIsPharmacy(user.role === 'pharmacy');
//         } else {
//           setIsLoggedIn(false);
//           setUserData(null);
//           setIsPharmacy(false);
//         }
//       } catch (error) {
//         console.error('Error checking auth:', error);
//         setIsLoggedIn(false);
//         setUserData(null);
//         setIsPharmacy(false);
//       }
//     };

//     checkAuth();

//     // Listen for storage changes
//     const handleStorageChange = () => {
//       checkAuth();
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   // Show popup message
//   const showPopupMessage = (message, type = 'error') => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setShowPopup(true);
//   };

//   // Close popup
//   const closePopup = () => {
//     setShowPopup(false);
//     setPopupMessage('');
//   };

//   // Get user-specific cart key
//   const getUserCartKey = (userId) => {
//     return userId ? `medicineCart_${userId}` : 'medicineCart';
//   };

//   // Handle add to cart with proper validation and user-specific storage
//   const handleAddToCart = (medicine) => {
//     // Direct check from localStorage (same as pharmacy dashboard)
//     const token = localStorage.getItem('token');
//     const userStr = localStorage.getItem('user');
    
//     if (!token || !userStr) {
//       // Not logged in - redirect to login
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Please login to add to cart' 
//         } 
//       });
//       return;
//     }

//     // Parse user data
//     let user = null;
//     try {
//       user = JSON.parse(userStr);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       // Invalid user data - redirect to login
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Session expired. Please login again.' 
//         } 
//       });
//       return;
//     }

//     // Check if pharmacy user (same logic as pharmacy dashboard)
//     if (user && user.role === 'pharmacy') {
//       // Pharmacy user - show popup message
//       showPopupMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.', 'error');
//       return;
//     }

//     // Regular user - proceed with add to cart
//     if (onAddToCart) {
//       onAddToCart(medicine);
//       // Optional: Show success message
//       showPopupMessage('Item added to cart successfully!', 'info');
      
//       // Get user ID for cart storage
//       const userId = user._id || user.id;
//       if (userId) {
//         // Load existing cart for this user
//         const cartKey = getUserCartKey(userId);
//         const savedCart = localStorage.getItem(cartKey);
//         let cart = [];
        
//         if (savedCart) {
//           try {
//             cart = JSON.parse(savedCart);
//           } catch (error) {
//             console.error('Error parsing cart:', error);
//           }
//         }
        
//         // Add medicine to cart
//         const existingItem = cart.find(item => item._id === medicine._id || item.id === medicine.id);
//         if (existingItem) {
//           cart = cart.map(item =>
//             (item._id === medicine._id || item.id === medicine.id)
//               ? { ...item, quantity: (item.quantity || 1) + 1 }
//               : item
//           );
//         } else {
//           cart.push({
//             ...medicine,
//             id: medicine._id || medicine.id,
//             quantity: 1
//           });
//         }
        
//         // Save to user-specific cart
//         localStorage.setItem(cartKey, JSON.stringify(cart));
//       }
//     }
//   };

//   // Handle navigation with login check (if needed for details)
//   const handleViewDetails = (e, path) => {
//     e.preventDefault();
//     navigate(path);
//   };

//   // Determine if this is aggregated view or pharmacy-specific view
//   const isAggregatedView = context === 'all-medicines' && medicine.priceStats;
  
//   // Calculate price based on context
//   let finalPrice, originalPrice, discountPercentage, isDiscounted;
  
//   if (isAggregatedView) {
//     // "All Medicines" page - aggregated data
//     finalPrice = medicine.priceStats?.displayPrice || medicine.price || 0;
//     originalPrice = medicine.priceStats?.lowestPrice || medicine.price || 0;
//     discountPercentage = medicine.priceStats?.discountPercentage || 0;
//     isDiscounted = medicine.priceStats?.hasDiscount || false;
//   } else {
//     // Pharmacy Detail page - specific pharmacy price
//     finalPrice = medicine.discountedPrice || 
//       (medicine.discountPercentage > 0 
//         ? medicine.price * (1 - medicine.discountPercentage / 100)
//         : medicine.price);
//     originalPrice = medicine.price || 0;
//     discountPercentage = medicine.discountPercentage || 0;
//     isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   }
  
//   // Check availability based on context
//   const isAvailable = isAggregatedView 
//     ? (medicine.availableAtCount > 0 || medicine.inStock)
//     : (medicine.inStock !== false);

//   return (
//     <>
//       {/* Popup/Modal */}
//       {showPopup && (
//         <div 
//           onClick={closePopup}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 1000
//           }}
//         >
//           <div 
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               padding: '20px',
//               width: '90%',
//               maxWidth: '400px',
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }}
//           >
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '15px'
//             }}>
//               <h3 style={{
//                 margin: 0,
//                 color: popupType === 'error' ? '#dc2626' : '#059669',
//                 fontSize: '18px'
//               }}>
//                 {popupType === 'error' ? 'Error' : 'Success'}
//               </h3>
//               <button
//                 onClick={closePopup}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '20px',
//                   cursor: 'pointer',
//                   color: '#666'
//                 }}
//               >
//                 ×
//               </button>
//             </div>
            
//             <p style={{
//               marginBottom: '20px',
//               color: '#333',
//               lineHeight: '1.5'
//             }}>
//               {popupMessage}
//             </p>
            
//             <div style={{
//               display: 'flex',
//               justifyContent: 'flex-end'
//             }}>
//               <button
//                 onClick={closePopup}
//                 style={{
//                   backgroundColor: popupType === 'error' ? '#dc2626' : '#059669',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Medicine Card */}
//       <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
        
//         {/* Medicine Image */}
//         <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//           <img
//             src={medicine.image}
//             alt={medicine.name}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//             }}
//           />
          
//           {/* Discount badge */}
//           {isDiscounted && (
//             <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {discountPercentage > 0 ? `${discountPercentage}%` : 'SALE'}
//             </div>
//           )}
          
//           {/* Out of stock badge */}
//           {!isAvailable && (
//             <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               OOS
//             </div>
//           )}
          
//           {/* Available at multiple pharmacies badge (only in aggregated view) */}
//           {isAggregatedView && medicine.availableAtCount > 1 && (
//             <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {medicine.availableAtCount} stores
//             </div>
//           )}
//         </div>
        
//         {/* Medicine Info */}
//         <div className="p-1.5">
//           <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//             {medicine.name}
//           </h3>
          
//           {medicine.genericName && (
//             <p className="text-[10px] text-gray-500 mb-0.5">{medicine.genericName}</p>
//           )}
        
//           <div className="mb-1.0 min-h-[2.5rem]">
//             <p className="text-[10px] text-gray-600 line-clamp-2">
//               {medicine.description}
//             </p>
//           </div>

//           <div className="flex justify-between items-center mb-1.5">
//             <div className="flex items-center">
//               <span className="text-sm font-bold text-green-600">
//                 Rs. {finalPrice.toFixed(2)}
//               </span>
              
//               {/* Show original price if discounted */}
//               {isDiscounted && originalPrice > finalPrice && (
//                 <span className="text-[10px] text-gray-500 line-through ml-1">
//                   Rs. {originalPrice.toFixed(2)}
//                 </span>
//               )}
              
//               {/* Show price range for aggregated view */}
//               {isAggregatedView && medicine.priceStats && (
//                 <span className="text-[10px] text-gray-500 ml-1">
//                   ({medicine.availableAtCount} stores)
//                 </span>
//               )}
//             </div>
            
//             {/* Prescription badge */}
//             {medicine.prescriptionRequired && (
//               <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                 Rx
//               </span>
//             )}
//           </div>
          
//           {/* Buttons */}
//           <div className="flex space-x-1">
//             <button
//               onClick={() => handleAddToCart(medicine)}
//               disabled={!isAvailable || isPharmacy}
//               className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
//                 isAvailable && !isPharmacy
//                   ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               {isAvailable ? (isPharmacy ? 'Not Allowed' : 'Add to Cart') : 'Out of Stock'}
//             </button>
            
//             {/* Link to medicine detail page */}
//             {isAggregatedView ? (
//               // Link to aggregated medicine detail (by name)
//               <Link
//                 to={`/medicines/${encodeURIComponent(medicine.name)}`}
//                 onClick={(e) => handleViewDetails(e, `/medicines/${encodeURIComponent(medicine.name)}`)}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Compare
//               </Link>
//             ) : (
//               // Link to medicine detail page (by ID)
//               <Link
//                 to={`/medicine/${medicine._id}`}
//                 onClick={(e) => handleViewDetails(e, `/medicine/${medicine._id}`)}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Details
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MedicineCard;






















//-------------check again
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart, context = 'all-medicines' }) => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [popupType, setPopupType] = useState('error');
//   const [isPharmacy, setIsPharmacy] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // ================================
//   // AUTH EVENT HANDLERS (ADD THESE)
//   // ================================
//   const handleLoginSuccess = (userData) => {
//     // User data save karein localStorage mein
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', userData.token);
    
//     // Event trigger karein taaki sab components update ho jaayein
//     window.dispatchEvent(new CustomEvent('userChanged'));
    
//     // Redirect karein
//     navigate('/');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
    
//     // Event trigger karein
//     window.dispatchEvent(new CustomEvent('userChanged'));
    
//     navigate('/login');
//   };
//   // ================================

//   // Initialize auth state
//   useEffect(() => {
//     const checkAuth = () => {
//       try {
//         const userStr = localStorage.getItem('user');
        
//         if (userStr) {
//           const user = JSON.parse(userStr);
//           setIsLoggedIn(true);
//           setUserData(user);
//           setIsPharmacy(user.role === 'pharmacy');
//         } else {
//           setIsLoggedIn(false);
//           setUserData(null);
//           setIsPharmacy(false);
//         }
//       } catch (error) {
//         console.error('Error checking auth:', error);
//         setIsLoggedIn(false);
//         setUserData(null);
//         setIsPharmacy(false);
//       }
//     };

//     checkAuth();

//     // Listen for auth changes
//     const handleAuthChange = () => {
//       checkAuth();
//     };

//     window.addEventListener('userChanged', handleAuthChange);
    
//     return () => {
//       window.removeEventListener('userChanged', handleAuthChange);
//     };
//   }, []);

//   // Show popup message
//   const showPopupMessage = (message, type = 'error') => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setShowPopup(true);
//   };

//   // Close popup
//   const closePopup = () => {
//     setShowPopup(false);
//     setPopupMessage('');
//   };

//   // Get user-specific cart key
//   const getUserCartKey = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         return user._id || user.id ? `medicineCart_${user._id || user.id}` : 'medicineCart_guest';
//       }
//     } catch (error) {
//       console.error('Error getting user cart key:', error);
//     }
//     return 'medicineCart_guest';
//   };

//   // Handle add to cart with proper validation
//   const handleAddToCart = (medicine) => {
//     // Direct check from localStorage
//     const userStr = localStorage.getItem('user');
    
//     if (!userStr) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Please login to add to cart' 
//         } 
//       });
//       return;
//     }

//     // Parse user data
//     let user = null;
//     try {
//       user = JSON.parse(userStr);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Session expired. Please login again.' 
//         } 
//       });
//       return;
//     }

//     // Check if pharmacy user
//     if (user && user.role === 'pharmacy') {
//       showPopupMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.', 'error');
//       return;
//     }

//     // Get user-specific cart key
//     const cartKey = getUserCartKey();
    
//     // Load existing cart
//     let cart = [];
//     try {
//       const savedCart = localStorage.getItem(cartKey);
//       if (savedCart) {
//         cart = JSON.parse(savedCart);
//       }
//     } catch (error) {
//       console.error('Error loading cart:', error);
//     }

//     // Check if item already exists
//     const existingIndex = cart.findIndex(item => 
//       item.id === medicine.id || 
//       (medicine._id && item._id === medicine._id) ||
//       (medicine.name && item.name === medicine.name)
//     );

//     if (existingIndex > -1) {
//       // Update quantity if item exists
//       cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
//     } else {
//       // Add new item
//       cart.push({
//         ...medicine,
//         id: medicine.id || medicine._id,
//         quantity: 1
//       });
//     }

//     // Save to user-specific cart
//     try {
//       localStorage.setItem(cartKey, JSON.stringify(cart));
      
//       // Dispatch cart change event
//       window.dispatchEvent(new CustomEvent('cartUpdated', {
//         detail: { cart }
//       }));
      
//       // Show success message
//       showPopupMessage('Item added to cart successfully!', 'info');
//     } catch (error) {
//       console.error('Error saving cart:', error);
//       showPopupMessage('Failed to add item to cart. Please try again.', 'error');
//       return;
//     }

//     // Call parent component's onAddToCart if provided
//     if (onAddToCart) {
//       onAddToCart(medicine);
//     }
//   };

//   // Handle navigation with login check
//   const handleViewDetails = (e, path) => {
//     e.preventDefault();
//     navigate(path);
//   };

//   // Determine if this is aggregated view
//   const isAggregatedView = context === 'all-medicines' && medicine.priceStats;
  
//   // Calculate price based on context
//   let finalPrice, originalPrice, discountPercentage, isDiscounted;
  
//   if (isAggregatedView) {
//     finalPrice = medicine.priceStats?.displayPrice || medicine.price || 0;
//     originalPrice = medicine.priceStats?.lowestPrice || medicine.price || 0;
//     discountPercentage = medicine.priceStats?.discountPercentage || 0;
//     isDiscounted = medicine.priceStats?.hasDiscount || false;
//   } else {
//     finalPrice = medicine.discountedPrice || 
//       (medicine.discountPercentage > 0 
//         ? medicine.price * (1 - medicine.discountPercentage / 100)
//         : medicine.price);
//     originalPrice = medicine.price || 0;
//     discountPercentage = medicine.discountPercentage || 0;
//     isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   }
  
//   // Check availability
//   const isAvailable = isAggregatedView 
//     ? (medicine.availableAtCount > 0 || medicine.inStock)
//     : (medicine.inStock !== false);

//   return (
//     <>
//       {/* Popup/Modal */}
//       {showPopup && (
//         <div 
//           onClick={closePopup}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 1000
//           }}
//         >
//           <div 
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               padding: '20px',
//               width: '90%',
//               maxWidth: '400px',
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }}
//           >
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '15px'
//             }}>
//               <h3 style={{
//                 margin: 0,
//                 color: popupType === 'error' ? '#dc2626' : '#059669',
//                 fontSize: '18px'
//               }}>
//                 {popupType === 'error' ? 'Error' : 'Success'}
//               </h3>
//               <button
//                 onClick={closePopup}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '20px',
//                   cursor: 'pointer',
//                   color: '#666'
//                 }}
//               >
//                 ×
//               </button>
//             </div>
            
//             <p style={{
//               marginBottom: '20px',
//               color: '#333',
//               lineHeight: '1.5'
//             }}>
//               {popupMessage}
//             </p>
            
//             <div style={{
//               display: 'flex',
//               justifyContent: 'flex-end'
//             }}>
//               <button
//                 onClick={closePopup}
//                 style={{
//                   backgroundColor: popupType === 'error' ? '#dc2626' : '#059669',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Medicine Card */}
//       <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
        
//         {/* Medicine Image */}
//         <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//           <img
//             src={medicine.image}
//             alt={medicine.name}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//             }}
//           />
          
//           {/* Discount badge */}
//           {isDiscounted && (
//             <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {discountPercentage > 0 ? `${discountPercentage}%` : 'SALE'}
//             </div>
//           )}
          
//           {/* Out of stock badge */}
//           {!isAvailable && (
//             <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               OOS
//             </div>
//           )}
          
//           {/* Available at multiple pharmacies badge */}
//           {isAggregatedView && medicine.availableAtCount > 1 && (
//             <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {medicine.availableAtCount} stores
//             </div>
//           )}
//         </div>
        
//         {/* Medicine Info */}
//         <div className="p-1.5">
//           <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//             {medicine.name}
//           </h3>
          
//           {medicine.genericName && (
//             <p className="text-[10px] text-gray-500 mb-0.5">{medicine.genericName}</p>
//           )}
        
//           <div className="mb-1.0 min-h-[2.5rem]">
//             <p className="text-[10px] text-gray-600 line-clamp-2">
//               {medicine.description}
//             </p>
//           </div>

//           <div className="flex justify-between items-center mb-1.5">
//             <div className="flex items-center">
//               <span className="text-sm font-bold text-green-600">
//                 Rs. {finalPrice.toFixed(2)}
//               </span>
              
//               {/* Show original price if discounted */}
//               {isDiscounted && originalPrice > finalPrice && (
//                 <span className="text-[10px] text-gray-500 line-through ml-1">
//                   Rs. {originalPrice.toFixed(2)}
//                 </span>
//               )}
              
//               {/* Show price range for aggregated view */}
//               {isAggregatedView && medicine.priceStats && (
//                 <span className="text-[10px] text-gray-500 ml-1">
//                   ({medicine.availableAtCount} stores)
//                 </span>
//               )}
//             </div>
            
//             {/* Prescription badge */}
//             {medicine.prescriptionRequired && (
//               <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                 Rx
//               </span>
//             )}
//           </div>
          
//           {/* Buttons */}
//           <div className="flex space-x-1">
//             <button
//               onClick={() => handleAddToCart(medicine)}
//               disabled={!isAvailable || isPharmacy}
//               className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
//                 isAvailable && !isPharmacy
//                   ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               {isAvailable ? (isPharmacy ? 'Not Allowed' : 'Add to Cart') : 'Out of Stock'}
//             </button>
            
//             {/* Link to medicine detail page */}
//             {isAggregatedView ? (
//               <Link
//                 to={`/medicines/${encodeURIComponent(medicine.name)}`}
//                 onClick={(e) => handleViewDetails(e, `/medicines/${encodeURIComponent(medicine.name)}`)}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Compare
//               </Link>
//             ) : (
//               <Link
//                 to={`/medicine/${medicine._id}`}
//                 onClick={(e) => handleViewDetails(e, `/medicine/${medicine._id}`)}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Details
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MedicineCard;































// prescription removed
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MedicineCard = ({ medicine, onAddToCart, context = 'all-medicines' }) => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [popupType, setPopupType] = useState('error');
//   const [isPharmacy, setIsPharmacy] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [showQuantitySelector, setShowQuantitySelector] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [tabletQuantity, setTabletQuantity] = useState(1);
//   const [quantityType, setQuantityType] = useState('unit'); // 'unit' or 'tablet'

//   // Helper function to detect medicine form type
//   const isTabletForm = (form) => {
//     if (!form) return false;
//     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
//     return tabletForms.some(t => form?.toLowerCase().includes(t));
//   };

//   // Get tablets per unit (default to 10)
//   const getTabletsPerUnit = () => {
//     return medicine.tabletsPerUnit || 10;
//   };

//   // Get price per tablet
//   const getPricePerTablet = () => {
//     const unitPrice = medicine.discountedPrice || medicine.price || 0;
//     return unitPrice / getTabletsPerUnit();
//   };

//   // ================================
//   // AUTH EVENT HANDLERS
//   // ================================
//   const handleLoginSuccess = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', userData.token);
//     window.dispatchEvent(new CustomEvent('userChanged'));
//     navigate('/');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     window.dispatchEvent(new CustomEvent('userChanged'));
//     navigate('/login');
//   };
//   // ================================

//   // Initialize auth state
//   useEffect(() => {
//     const checkAuth = () => {
//       try {
//         const userStr = localStorage.getItem('user');
        
//         if (userStr) {
//           const user = JSON.parse(userStr);
//           setIsLoggedIn(true);
//           setUserData(user);
//           setIsPharmacy(user.role === 'pharmacy');
//         } else {
//           setIsLoggedIn(false);
//           setUserData(null);
//           setIsPharmacy(false);
//         }
//       } catch (error) {
//         console.error('Error checking auth:', error);
//         setIsLoggedIn(false);
//         setUserData(null);
//         setIsPharmacy(false);
//       }
//     };

//     checkAuth();

//     const handleAuthChange = () => {
//       checkAuth();
//     };

//     window.addEventListener('userChanged', handleAuthChange);
    
//     return () => {
//       window.removeEventListener('userChanged', handleAuthChange);
//     };
//   }, []);

//   // Show popup message
//   const showPopupMessage = (message, type = 'error') => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setShowPopup(true);
//   };

//   // Close popup
//   const closePopup = () => {
//     setShowPopup(false);
//     setPopupMessage('');
//     setShowQuantitySelector(false);
//   };

//   // Get user-specific cart key
//   const getUserCartKey = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         return user._id || user.id ? `medicineCart_${user._id || user.id}` : 'medicineCart_guest';
//       }
//     } catch (error) {
//       console.error('Error getting user cart key:', error);
//     }
//     return 'medicineCart_guest';
//   };

//   // Handle add to cart with tablet/unit selection
//   const handleAddToCart = (medicine) => {
//     // Direct check from localStorage
//     const userStr = localStorage.getItem('user');
    
//     if (!userStr) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Please login to add to cart' 
//         } 
//       });
//       return;
//     }

//     // Parse user data
//     let user = null;
//     try {
//       user = JSON.parse(userStr);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       navigate('/login', { 
//         state: { 
//           redirectTo: window.location.pathname,
//           message: 'Session expired. Please login again.' 
//         } 
//       });
//       return;
//     }

//     // Check if pharmacy user
//     if (user && user.role === 'pharmacy') {
//       showPopupMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.', 'error');
//       return;
//     }

//     // If it's a tablet form, show quantity selector first
//     if (isTabletForm(medicine.form)) {
//       setShowQuantitySelector(true);
//       return;
//     }

//     // For non-tablet items, add directly
//     addToCartWithQuantity(medicine, 1, 'unit', 1);
//   };

//   // Add to cart with specific quantity
//   const addToCartWithQuantity = (medicine, qty, type, tabletQty) => {
//     // Get user-specific cart key
//     const cartKey = getUserCartKey();
    
//     // Load existing cart
//     let cart = [];
//     try {
//       const savedCart = localStorage.getItem(cartKey);
//       if (savedCart) {
//         cart = JSON.parse(savedCart);
//       }
//     } catch (error) {
//       console.error('Error loading cart:', error);
//     }

//     // Calculate total tablets if applicable
//     const tabletsPerUnit = getTabletsPerUnit();
//     const totalTablets = type === 'tablet' ? tabletQty : qty * tabletsPerUnit;

//     // Create cart item
//     const cartItem = {
//       ...medicine,
//       id: medicine.id || medicine._id,
//       quantity: type === 'tablet' ? Math.ceil(tabletQty / tabletsPerUnit) : qty,
//       tabletQuantity: type === 'tablet' ? tabletQty : qty * tabletsPerUnit,
//       totalTablets: totalTablets,
//       quantityType: type,
//       tabletsPerUnit: tabletsPerUnit
//     };

//     // Check if item already exists
//     const existingIndex = cart.findIndex(item => 
//       item.id === cartItem.id || 
//       (medicine._id && item._id === medicine._id) ||
//       (medicine.name && item.name === medicine.name)
//     );

//     if (existingIndex > -1) {
//       // Update quantity if item exists
//       if (isTabletForm(medicine.form)) {
//         cart[existingIndex].tabletQuantity = (cart[existingIndex].tabletQuantity || 0) + totalTablets;
//         cart[existingIndex].totalTablets = (cart[existingIndex].totalTablets || 0) + totalTablets;
//         cart[existingIndex].quantity = Math.ceil(cart[existingIndex].totalTablets / tabletsPerUnit);
//       } else {
//         cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + qty;
//       }
//     } else {
//       cart.push(cartItem);
//     }

//     // Save to user-specific cart
//     try {
//       localStorage.setItem(cartKey, JSON.stringify(cart));
      
//       // Dispatch cart change event
//       window.dispatchEvent(new CustomEvent('cartUpdated', {
//         detail: { cart }
//       }));
      
//       // Show success message
//       const quantityText = type === 'tablet' 
//         ? `${tabletQty} tablets` 
//         : `${qty} unit${qty > 1 ? 's' : ''}`;
//       showPopupMessage(`${quantityText} of ${medicine.name} added to cart!`, 'info');
//     } catch (error) {
//       console.error('Error saving cart:', error);
//       showPopupMessage('Failed to add item to cart. Please try again.', 'error');
//       return;
//     }

//     // Call parent component's onAddToCart if provided
//     if (onAddToCart) {
//       onAddToCart(cartItem);
//     }

//     setShowQuantitySelector(false);
//   };

//   // Handle navigation with login check
//   const handleViewDetails = (e, path) => {
//     e.preventDefault();
//     navigate(path);
//   };

//   // Determine if this is aggregated view
//   const isAggregatedView = context === 'all-medicines' && medicine.priceStats;
  
//   // Calculate price based on context
//   let finalPrice, originalPrice, discountPercentage, isDiscounted;
  
//   if (isAggregatedView) {
//     finalPrice = medicine.priceStats?.displayPrice || medicine.price || 0;
//     originalPrice = medicine.priceStats?.lowestPrice || medicine.price || 0;
//     discountPercentage = medicine.priceStats?.discountPercentage || 0;
//     isDiscounted = medicine.priceStats?.hasDiscount || false;
//   } else {
//     finalPrice = medicine.discountedPrice || 
//       (medicine.discountPercentage > 0 
//         ? medicine.price * (1 - medicine.discountPercentage / 100)
//         : medicine.price);
//     originalPrice = medicine.price || 0;
//     discountPercentage = medicine.discountPercentage || 0;
//     isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   }
  
//   // Check availability
//   const isAvailable = isAggregatedView 
//     ? (medicine.availableAtCount > 0 || medicine.inStock)
//     : (medicine.inStock !== false);

//   return (
//     <>
//       {/* Popup/Modal */}
//       {showPopup && (
//         <div 
//           onClick={closePopup}
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//         >
//           <div 
//             onClick={(e) => e.stopPropagation()}
//             className="bg-white rounded-lg p-5 w-full max-w-sm shadow-xl"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <h3 className={`m-0 text-lg font-semibold ${popupType === 'error' ? 'text-red-600' : 'text-green-600'}`}>
//                 {popupType === 'error' ? 'Error' : 'Success'}
//               </h3>
//               <button
//                 onClick={closePopup}
//                 className="bg-transparent border-none text-xl cursor-pointer text-gray-600 hover:text-gray-800"
//               >
//                 ×
//               </button>
//             </div>
            
//             <p className="mb-4 text-gray-700 text-sm">
//               {popupMessage}
//             </p>
            
//             {/* Quantity Selector for Tablet Items */}
//             {showQuantitySelector && isTabletForm(medicine.form) && (
//               <div className="mb-4 p-3 bg-blue-50 rounded-lg">
//                 <p className="text-sm font-medium text-gray-700 mb-2">Select Quantity for {medicine.name}</p>
                
//                 <div className="flex gap-2 mb-3">
//                   <button
//                     onClick={() => setQuantityType('unit')}
//                     className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
//                       quantityType === 'unit'
//                         ? 'bg-[var(--primary-color)] text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     Unit ({getTabletsPerUnit()} tablets)
//                   </button>
//                   <button
//                     onClick={() => setQuantityType('tablet')}
//                     className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
//                       quantityType === 'tablet'
//                         ? 'bg-[var(--primary-color)] text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     Tablet
//                   </button>
//                 </div>
                
//                 {quantityType === 'unit' ? (
//                   <div className="flex items-center justify-center gap-3">
//                     <button
//                       onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
//                     >
//                       -
//                     </button>
//                     <span className="w-10 text-center font-medium">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity(prev => prev + 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center gap-3">
//                     <button
//                       onClick={() => setTabletQuantity(prev => Math.max(1, prev - 1))}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
//                     >
//                       -
//                     </button>
//                     <span className="w-10 text-center font-medium">{tabletQuantity}</span>
//                     <button
//                       onClick={() => setTabletQuantity(prev => prev + 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                 )}
                
//                 <div className="mt-3 text-xs text-gray-600">
//                   {quantityType === 'unit' ? (
//                     <p>Total: {quantity * getTabletsPerUnit()} tablets (Rs. {(finalPrice * quantity).toFixed(2)})</p>
//                   ) : (
//                     <p>Total: {tabletQuantity} tablets (Rs. {(getPricePerTablet() * tabletQuantity).toFixed(2)})</p>
//                   )}
//                   <p className="text-gray-500 mt-1">Per tablet: Rs. {getPricePerTablet().toFixed(2)}</p>
//                 </div>
//               </div>
//             )}
            
//             <div className="flex justify-end gap-2">
//               {showQuantitySelector && isTabletForm(medicine.form) && (
//                 <>
//                   <button
//                     onClick={closePopup}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       addToCartWithQuantity(medicine, quantity, quantityType, tabletQuantity);
//                     }}
//                     className="px-4 py-2 bg-[var(--primary-color)] text-white rounded hover:bg-[var(--secondary-color)] text-sm"
//                   >
//                     Add to Cart
//                   </button>
//                 </>
//               )}
//               {!showQuantitySelector && (
//                 <button
//                   onClick={closePopup}
//                   className={`px-4 py-2 text-white rounded text-sm ${
//                     popupType === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
//                   }`}
//                 >
//                   OK
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Medicine Card - Original Design Preserved */}
//       <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
        
//         {/* Medicine Image */}
//         <div className="relative h-24 bg-gray-50 flex items-center justify-center">
//           <img
//             src={medicine.image}
//             alt={medicine.name}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//             }}
//           />
          
//           {/* Discount badge */}
//           {isDiscounted && (
//             <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {discountPercentage > 0 ? `${discountPercentage}%` : 'SALE'}
//             </div>
//           )}
          
//           {/* Out of stock badge */}
//           {!isAvailable && (
//             <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               OOS
//             </div>
//           )}
          
//           {/* Available at multiple pharmacies badge */}
//           {isAggregatedView && medicine.availableAtCount > 1 && (
//             <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {medicine.availableAtCount} stores
//             </div>
//           )}

//           {/* Form type badge - NEW but keeps design */}
//           {medicine.form && (
//             <div className="absolute bottom-1 right-1 bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded">
//               {medicine.form}
//             </div>
//           )}
//         </div>
        
//         {/* Medicine Info */}
//         <div className="p-1.5">
//           <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
//             {medicine.name}
//           </h3>
          
//           {medicine.genericName && (
//             <p className="text-[10px] text-gray-500 mb-0.5">{medicine.genericName}</p>
//           )}
        
//           <div className="mb-1.0 min-h-[2.5rem]">
//             <p className="text-[10px] text-gray-600 line-clamp-2">
//               {medicine.description}
//             </p>
//           </div>

//           <div className="flex justify-between items-center mb-1.5">
//             <div className="flex items-center flex-wrap">
//               <span className="text-sm font-bold text-green-600">
//                 Rs. {finalPrice.toFixed(2)}
//               </span>
              
//               {/* Show original price if discounted */}
//               {isDiscounted && originalPrice > finalPrice && (
//                 <span className="text-[10px] text-gray-500 line-through ml-1">
//                   Rs. {originalPrice.toFixed(2)}
//                 </span>
//               )}
              
//               {/* Show price range for aggregated view */}
//               {isAggregatedView && medicine.priceStats && (
//                 <span className="text-[10px] text-gray-500 ml-1">
//                   ({medicine.availableAtCount} stores)
//                 </span>
//               )}
//             </div>
//           </div>
          
//           {/* Tablets info - small text under price */}
//           {isTabletForm(medicine.form) && (
//             <div className="text-[8px] text-gray-500 mb-1">
//               {getTabletsPerUnit()} tablets/unit • Rs. {getPricePerTablet().toFixed(2)}/tablet
//             </div>
//           )}
          
//           {/* Buttons */}
//           <div className="flex space-x-1">
//             <button
//               onClick={() => handleAddToCart(medicine)}
//               disabled={!isAvailable || isPharmacy}
//               className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
//                 isAvailable && !isPharmacy
//                   ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               {isAvailable ? (isPharmacy ? 'Not Allowed' : 'Add to Cart') : 'Out of Stock'}
//             </button>
            
//             {/* Link to medicine detail page */}
//             {isAggregatedView ? (
//               <Link
//                 to={`/medicines/${encodeURIComponent(medicine.name)}`}
//                 onClick={(e) => handleViewDetails(e, `/medicines/${encodeURIComponent(medicine.name)}`)}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Compare
//               </Link>
//             ) : (
//               <Link
//                 to={`/medicine/${medicine._id}`}
//                 onClick={(e) => handleViewDetails(e, `/medicine/${medicine._id}`)}
//                 className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
//               >
//                 Details
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MedicineCard;






















import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MedicineCard = ({ medicine, onAddToCart, context = 'all-medicines' }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('error');
  const [isPharmacy, setIsPharmacy] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [tabletQuantity, setTabletQuantity] = useState(1);
  const [quantityType, setQuantityType] = useState('unit'); // 'unit' or 'tablet'

  // Helper function to detect medicine form type
  const isTabletForm = (form) => {
    if (!form) return false;
    const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
    return tabletForms.some(t => form?.toLowerCase().includes(t));
  };

  // Get tablets per unit (default to 10)
  const getTabletsPerUnit = () => {
    return medicine.tabletsPerUnit || 10;
  };

  // Get price per tablet
  const getPricePerTablet = () => {
    const unitPrice = medicine.discountedPrice || medicine.price || 0;
    return unitPrice / getTabletsPerUnit();
  };

  // ================================
  // AUTH EVENT HANDLERS
  // ================================
  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    window.dispatchEvent(new CustomEvent('userChanged'));
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new CustomEvent('userChanged'));
    navigate('/login');
  };
  // ================================

  // Initialize auth state
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userStr = localStorage.getItem('user');
        
        if (userStr) {
          const user = JSON.parse(userStr);
          setIsLoggedIn(true);
          setUserData(user);
          setIsPharmacy(user.role === 'pharmacy');
        } else {
          setIsLoggedIn(false);
          setUserData(null);
          setIsPharmacy(false);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsLoggedIn(false);
        setUserData(null);
        setIsPharmacy(false);
      }
    };

    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('userChanged', handleAuthChange);
    
    return () => {
      window.removeEventListener('userChanged', handleAuthChange);
    };
  }, []);

  // Show popup message
  const showPopupMessage = (message, type = 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
    setShowQuantitySelector(false);
  };

  // Get user-specific cart key
  const getUserCartKey = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user._id || user.id ? `medicineCart_${user._id || user.id}` : 'medicineCart_guest';
      }
    } catch (error) {
      console.error('Error getting user cart key:', error);
    }
    return 'medicineCart_guest';
  };

  // Handle add to cart with tablet/unit selection
  const handleAddToCart = () => {
    console.log('MedicineCard handleAddToCart called with:', medicine); // Debug log
    
    // Direct check from localStorage
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
      navigate('/login', { 
        state: { 
          redirectTo: window.location.pathname,
          message: 'Please login to add to cart' 
        } 
      });
      return;
    }

    // Parse user data
    let user = null;
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login', { 
        state: { 
          redirectTo: window.location.pathname,
          message: 'Session expired. Please login again.' 
        } 
      });
      return;
    }

    // Check if pharmacy user
    if (user && user.role === 'pharmacy') {
      showPopupMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.', 'error');
      return;
    }

    // If it's a tablet form, show quantity selector first
    if (isTabletForm(medicine.form)) {
      setShowQuantitySelector(true);
      return;
    }

    // For non-tablet items, add directly using the parent's onAddToCart
    console.log('Calling onAddToCart with medicine:', medicine); // Debug log
    if (onAddToCart) {
      onAddToCart(medicine);
      showPopupMessage('Item added to cart successfully!', 'info');
    } else {
      console.error('onAddToCart is not defined'); // Debug log
    }
  };

  // Add to cart with specific quantity (for tablet items)
  const addToCartWithQuantity = () => {
    console.log('addToCartWithQuantity called with:', { medicine, quantity, quantityType, tabletQuantity }); // Debug log
    
    if (onAddToCart) {
      // Create a copy of medicine with quantity information
      const medicineWithQuantity = {
        ...medicine,
        selectedQuantity: quantity,
        selectedTabletQuantity: tabletQuantity,
        selectedQuantityType: quantityType
      };
      onAddToCart(medicineWithQuantity);
      
      const quantityText = quantityType === 'tablet' 
        ? `${tabletQuantity} tablets` 
        : `${quantity} unit${quantity > 1 ? 's' : ''}`;
      showPopupMessage(`${quantityText} of ${medicine.name} added to cart!`, 'info');
    } else {
      console.error('onAddToCart is not defined'); // Debug log
    }
    
    setShowQuantitySelector(false);
  };

  // Handle navigation with login check
  const handleViewDetails = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Determine if this is aggregated view
  const isAggregatedView = context === 'all-medicines' && medicine.priceStats;
  
  // Calculate price based on context
  let finalPrice, originalPrice, discountPercentage, isDiscounted;
  
  if (isAggregatedView) {
    finalPrice = medicine.priceStats?.displayPrice || medicine.price || 0;
    originalPrice = medicine.priceStats?.lowestPrice || medicine.price || 0;
    discountPercentage = medicine.priceStats?.discountPercentage || 0;
    isDiscounted = medicine.priceStats?.hasDiscount || false;
  } else {
    finalPrice = medicine.discountedPrice || 
      (medicine.discountPercentage > 0 
        ? medicine.price * (1 - medicine.discountPercentage / 100)
        : medicine.price);
    originalPrice = medicine.price || 0;
    discountPercentage = medicine.discountPercentage || 0;
    isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
  }
  
  // Check availability
  const isAvailable = isAggregatedView 
    ? (medicine.availableAtCount > 0 || medicine.inStock)
    : (medicine.inStock !== false);

  return (
    <>
      {/* Popup/Modal */}
      {showPopup && (
        <div 
          onClick={closePopup}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-5 w-full max-w-sm shadow-xl"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className={`m-0 text-lg font-semibold ${popupType === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {popupType === 'error' ? 'Error' : 'Success'}
              </h3>
              <button
                onClick={closePopup}
                className="bg-transparent border-none text-xl cursor-pointer text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </div>
            
            <p className="mb-4 text-gray-700 text-sm">
              {popupMessage}
            </p>
            
            {/* Quantity Selector for Tablet Items */}
            {showQuantitySelector && isTabletForm(medicine.form) && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Select Quantity for {medicine.name}</p>
                
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setQuantityType('unit')}
                    className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                      quantityType === 'unit'
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Unit ({getTabletsPerUnit()} tablets)
                  </button>
                  <button
                    onClick={() => setQuantityType('tablet')}
                    className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                      quantityType === 'tablet'
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Tablet
                  </button>
                </div>
                
                {quantityType === 'unit' ? (
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setTabletQuantity(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium">{tabletQuantity}</span>
                    <button
                      onClick={() => setTabletQuantity(prev => prev + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                )}
                
                <div className="mt-3 text-xs text-gray-600">
                  {quantityType === 'unit' ? (
                    <p>Total: {quantity * getTabletsPerUnit()} tablets (Rs. {(finalPrice * quantity).toFixed(2)})</p>
                  ) : (
                    <p>Total: {tabletQuantity} tablets (Rs. {(getPricePerTablet() * tabletQuantity).toFixed(2)})</p>
                  )}
                  <p className="text-gray-500 mt-1">Per tablet: Rs. {getPricePerTablet().toFixed(2)}</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              {showQuantitySelector && isTabletForm(medicine.form) && (
                <>
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addToCartWithQuantity}
                    className="px-4 py-2 bg-[var(--primary-color)] text-white rounded hover:bg-[var(--secondary-color)] text-sm"
                  >
                    Add to Cart
                  </button>
                </>
              )}
              {!showQuantitySelector && (
                <button
                  onClick={closePopup}
                  className={`px-4 py-2 text-white rounded text-sm ${
                    popupType === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Medicine Card - Original Design Preserved */}
      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
        
        {/* Medicine Image */}
        <div className="relative h-24 bg-gray-50 flex items-center justify-center">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
            }}
          />
          
          {/* Discount badge */}
          {isDiscounted && (
            <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
              {discountPercentage > 0 ? `${discountPercentage}%` : 'SALE'}
            </div>
          )}
          
          {/* Out of stock badge */}
          {!isAvailable && (
            <div className="absolute top-1 right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded">
              OOS
            </div>
          )}
          
          {/* Available at multiple pharmacies badge */}
          {isAggregatedView && medicine.availableAtCount > 1 && (
            <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
              {medicine.availableAtCount} stores
            </div>
          )}

          {/* Form type badge */}
          {medicine.form && (
            <div className="absolute bottom-1 right-1 bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded">
              {medicine.form}
            </div>
          )}
        </div>
        
        {/* Medicine Info */}
        <div className="p-1.5">
          <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
            {medicine.name}
          </h3>
          
          {medicine.genericName && (
            <p className="text-[10px] text-gray-500 mb-0.5">{medicine.genericName}</p>
          )}
        
          <div className="mb-1.0 min-h-[2.5rem]">
            <p className="text-[10px] text-gray-600 line-clamp-2">
              {medicine.description}
            </p>
          </div>

          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center flex-wrap">
              <span className="text-sm font-bold text-green-600">
                Rs. {finalPrice.toFixed(2)}
              </span>
              
              {/* Show original price if discounted */}
              {isDiscounted && originalPrice > finalPrice && (
                <span className="text-[10px] text-gray-500 line-through ml-1">
                  Rs. {originalPrice.toFixed(2)}
                </span>
              )}
              
              {/* Show price range for aggregated view */}
              {isAggregatedView && medicine.priceStats && (
                <span className="text-[10px] text-gray-500 ml-1">
                  ({medicine.availableAtCount} stores)
                </span>
              )}
            </div>
          </div>
          
          {/* Tablets info - small text under price */}
          {isTabletForm(medicine.form) && (
            <div className="text-[8px] text-gray-500 mb-1">
              {getTabletsPerUnit()} tablets/unit • Rs. {getPricePerTablet().toFixed(2)}/tablet
            </div>
          )}
          
          {/* Buttons */}
          <div className="flex space-x-1">
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable || isPharmacy}
              className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
                isAvailable && !isPharmacy
                  ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isAvailable ? (isPharmacy ? 'Not Allowed' : 'Add to Cart') : 'Out of Stock'}
            </button>
            
            {/* Link to medicine detail page */}
            {isAggregatedView ? (
              <Link
                to={`/medicines/${encodeURIComponent(medicine.name)}`}
                onClick={(e) => handleViewDetails(e, `/medicines/${encodeURIComponent(medicine.name)}`)}
                className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
              >
                Compare
              </Link>
            ) : (
              <Link
                to={`/medicine/${medicine._id}`}
                onClick={(e) => handleViewDetails(e, `/medicine/${medicine._id}`)}
                className="flex-1 bg-[var(--bg-light)] text-[var(--secondary-color)] py-1 px-1.5 rounded hover:bg-[var(--text-light)] transition-colors text-[10px] font-medium text-center"
              >
                Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineCard;