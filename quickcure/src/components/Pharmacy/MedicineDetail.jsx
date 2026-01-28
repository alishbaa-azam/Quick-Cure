//Below code is for checking new idea.
// import React, { useState } from 'react';
// import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
// import { medicines } from './medicines';

// const MedicineDetail = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const medicine = medicines.find(med => med.id === parseInt(id));
  
//   const [activeSection, setActiveSection] = useState('uses');

//   // Sample pharmacy data
//   const pharmacies = [
//     { id: 1, name: 'Sehat Pharmacy', distance: '0.5 km' },
//     { id: 2, name: 'Medicam Pharmacy', distance: '1.2 km' },
//     { id: 3, name: 'Pharma Plus', distance: '0.8 km' },
//     { id: 4, name: 'Shifa Pharmacy', distance: '2.0 km' },
//   ];

//   if (!medicine) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-red-600">Medicine not found</h2>
//         <button 
//           onClick={() => navigate(-1)}
//           className="text-blue-600 hover:underline mt-4 inline-block"
//         >
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   // Get pharmacies where this medicine is available
//   const availablePharmacies = medicine.availableAt 
//     ? medicine.availableAt.map(pharmacyId => 
//         pharmacies.find(p => p.id === pharmacyId)
//       ).filter(Boolean)
//     : [];

//   const addToCart = () => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   const handleBack = () => {
//     if (location.state?.from) {
//       navigate(location.state.from);
//     } else {
//       navigate(-1);
//     }
//   };

//   // Get quantity in cart
//   const quantityInCart = cart.find(item => item.id === medicine.id)?.quantity || 0;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back
//       </button>

//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left Column - Smaller (Medicine Info) */}
//           <div className="md:w-2/5 lg:w-1/3 p-6 md:p-8 border-r border-gray-100">
//             {/* Medicine Image */}
//             <div className="mb-6">
//               <div className="relative rounded-xl overflow-hidden bg-gray-50">
//                 <img
//                   src={medicine.image}
//                   alt={medicine.name}
//                   className="w-full h-64 object-contain"
//                 />
//               </div>
//             </div>

//             {/* Medicine Info Box */}
//             <div className="space-y-5">
//               {/* Category */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Category</h3>
//                 </div>
//                 <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
//                   {medicine.category || 'General'}
//                 </div>
//               </div>

//               {/* Dosage */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Dosage</h3>
//                 </div>
//                 <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100">
//                   {medicine.dosage || 'As prescribed'}
//                 </div>
//               </div>

//               {/* Price */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Price</h3>
//                 </div>
//                 <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-100">
//                   <div className="flex justify-between items-center">
//                     <span className="text-2xl font-bold">${medicine.price.toFixed(2)}</span>
//                     <span className="text-sm text-gray-500">per unit</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Available at Pharmacies */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Available at</h3>
//                 </div>
//                 <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
//                   {availablePharmacies.length > 0 ? (
//                     availablePharmacies.map(pharmacy => (
//                       <Link
//                         key={pharmacy.id}
//                         to={`/pharmacies/${pharmacy.id}`}
//                         className="block bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium">{pharmacy.name}</span>
//                           <span className="text-xs text-gray-500">{pharmacy.distance}</span>
//                         </div>
//                       </Link>
//                     ))
//                   ) : (
//                     <div className="bg-gray-50 text-gray-500 px-3 py-2 rounded-lg border border-gray-200">
//                       Available at selected pharmacies
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Cart Summary */}
//               {quantityInCart > 0 && (
//                 <div className="pt-4 border-t border-gray-200">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-600 mb-1">In your cart:</p>
//                     <p className="text-lg font-bold text-blue-600">{quantityInCart} unit{quantityInCart > 1 ? 's' : ''}</p>
//                     <p className="text-sm text-gray-500">Total: ${(medicine.price * quantityInCart).toFixed(2)}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Larger (Content) */}
//           <div className="md:w-3/5 lg:w-2/3 flex flex-col">
//             {/* Fixed Header */}
//             <div className="p-6 md:p-8 border-b border-gray-100">
//               <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
//                 {medicine.name}
//               </h1>
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 {medicine.detailedDescription || medicine.description}
//               </p>
//             </div>

//             {/* Scrollable Content with Tabs */}
//             <div className="flex-1 flex flex-col min-h-0">
//               {/* Section Navigation Tabs */}
//               <div className="border-b border-gray-200">
//                 <div className="flex overflow-x-auto px-6 md:px-8">
//                   <button
//                     onClick={() => setActiveSection('uses')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'uses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Uses & Benefits
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('sideEffects')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'sideEffects' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Side Effects
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('precautions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'precautions' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Precautions
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('allergies')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'allergies' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Allergies
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('instructions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'instructions' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Instructions
//                   </button>
//                 </div>
//               </div>

//               {/* Scrollable Content Area */}
//               <div className="flex-1 overflow-y-auto p-6 md:p-8">
//                 {/* Uses Section */}
//                 {activeSection === 'uses' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Uses</h3>
//                       <ul className="space-y-3">
//                         {medicine.uses?.map((use, index) => (
//                           <li key={index} className="flex items-start">
//                             <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             <span className="text-gray-700">{use}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     {medicine.benefits && (
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Benefits</h3>
//                         <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
//                           <p className="text-blue-800">{medicine.benefits}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Side Effects Section */}
//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Common Side Effects</h3>
//                       <ul className="space-y-3">
//                         {medicine.sideEffects?.slice(0, 5).map((effect, index) => (
//                           <li key={index} className="flex items-start">
//                             <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                             </svg>
//                             <span className="text-gray-700">{effect}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     {medicine.seriousSideEffects && (
//                       <div className="bg-red-50 border border-red-100 rounded-xl p-4">
//                         <h4 className="font-bold text-red-800 mb-2">⚠️ Serious Side Effects (Seek Medical Help):</h4>
//                         <ul className="space-y-2">
//                           {medicine.seriousSideEffects.map((effect, index) => (
//                             <li key={index} className="text-red-700">{effect}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Precautions Section */}
//                 {activeSection === 'precautions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Important Precautions</h3>
//                       <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
//                         <ul className="space-y-4">
//                           {medicine.precautions?.map((precaution, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                               </svg>
//                               <span className="text-gray-800">{precaution}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                     {medicine.warnings && (
//                       <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
//                         <p className="text-orange-800 font-medium">{medicine.warnings}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Allergies Section */}
//                 {activeSection === 'allergies' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Allergy Information</h3>
//                       <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
//                         {medicine.allergies ? (
//                           <ul className="space-y-3">
//                             {medicine.allergies.map((allergy, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//                                 </svg>
//                                 <span className="text-gray-800">{allergy}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p className="text-gray-700">No specific allergy information available. Consult your doctor if you have known allergies.</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Instructions Section */}
//                 {activeSection === 'instructions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Usage Instructions</h3>
//                       <div className="bg-green-50 border border-green-100 rounded-xl p-5">
//                         {medicine.instructions ? (
//                           <ul className="space-y-4">
//                             {medicine.instructions.map((instruction, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 <span className="text-gray-800">{instruction}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p className="text-gray-700">Take as directed by your physician. Follow the dosage instructions carefully.</p>
//                         )}
//                       </div>
//                     </div>
//                     {medicine.storage && (
//                       <div>
//                         <h4 className="font-bold text-gray-900 mb-2">Storage Instructions</h4>
//                         <p className="text-gray-700">{medicine.storage}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Fixed Add to Cart Button */}
//               <div className="border-t border-gray-200 p-6 md:p-8 bg-white">
//                 <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//                   <div className="text-center sm:text-left">
//                     <p className="text-gray-600">Quantity in cart: <span className="font-bold text-blue-600">{quantityInCart}</span></p>
//                     <p className="text-sm text-gray-500">Click below to add more</p>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={() => setCart(prev => prev.filter(item => item.id !== medicine.id))}
//                       disabled={quantityInCart === 0}
//                       className={`px-6 py-3 rounded-lg font-medium ${quantityInCart === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
//                     >
//                       Remove
//                     </button>
//                     <button
//                       onClick={addToCart}
//                       className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md hover:shadow-lg"
//                     >
//                       {quantityInCart > 0 ? 'Add More to Cart' : 'Add to Cart'} - ${medicine.price.toFixed(2)}
//                     </button>
//                     <Link
//                       to="/booking"
//                       className={`px-6 py-3 rounded-lg font-medium ${cart.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
//                     >
//                       Checkout ({cart.length})
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Medicines Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Medicines</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {medicines
//             .filter(med => 
//               med.category === medicine.category && 
//               med.id !== medicine.id
//             )
//             .slice(0, 3)
//             .map(relatedMed => (
//               <div key={relatedMed.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg text-gray-800 mb-2">{relatedMed.name}</h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedMed.description}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold text-green-600">${relatedMed.price.toFixed(2)}</span>
//                     <Link
//   to={`/medicine/${relatedMed.id}`}
//   className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
// >
//   View Details
//   <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//   </svg>
// </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;

















//Not like its css

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';

// const MedicineDetail = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('uses');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);

//   // Fetch medicine details from backend
//   useEffect(() => {
//     const fetchMedicineDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/medicines/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setMedicine(data.data);
          
//           // Fetch related medicines (same category)
//           fetchRelatedMedicines(data.data.category, data.data._id);
//         } else {
//           setError('Medicine not found');
//         }
//       } catch (err) {
//         console.error('Error fetching medicine:', err);
//         setError('Error loading medicine details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   // Fetch related medicines
//   const fetchRelatedMedicines = async (category, excludeId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/medicines?category=${category}&limit=4`);
//       const data = await response.json();
      
//       if (data.success) {
//         // Exclude current medicine
//         const filtered = data.data.filter(med => med._id !== excludeId).slice(0, 3);
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related medicines:', err);
//     }
//   };

//   // Get pharmacies where this medicine is available
//   const availablePharmacies = medicine?.availableAtPharmacies || [];

//   const addToCart = () => {
//     if (!medicine) return;
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item._id === medicine._id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item._id === medicine._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   const handleBack = () => {
//     if (location.state?.from) {
//       navigate(location.state.from);
//     } else {
//       navigate(-1);
//     }
//   };

//   // Get quantity in cart
//   const quantityInCart = cart.find(item => item._id === medicine?._id)?.quantity || 0;

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="text-lg text-gray-600">Loading medicine details...</div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !medicine) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-red-600">Medicine not found</h2>
//         <button 
//           onClick={() => navigate(-1)}
//           className="text-blue-600 hover:underline mt-4 inline-block"
//         >
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back
//       </button>

//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left Column - Smaller (Medicine Info) */}
//           <div className="md:w-2/5 lg:w-1/3 p-6 md:p-8 border-r border-gray-100">
//             {/* Medicine Image */}
//             <div className="mb-6">
//               <div className="relative rounded-xl overflow-hidden bg-gray-50">
//                 <img
//                   src={medicine.image}
//                   alt={medicine.name}
//                   className="w-full h-64 object-contain"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Medicine Info Box */}
//             <div className="space-y-5">
//               {/* Category */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Category</h3>
//                 </div>
//                 <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
//                   {medicine.category || 'General'}
//                 </div>
//               </div>

//               {/* Dosage */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Dosage</h3>
//                 </div>
//                 <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100">
//                   {medicine.dosage || 'As prescribed'}
//                 </div>
//               </div>

//               {/* Price */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Price</h3>
//                 </div>
//                 <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-100">
//                   <div className="flex justify-between items-center">
//                     <span className="text-2xl font-bold">${medicine.price.toFixed(2)}</span>
//                     <span className="text-sm text-gray-500">per unit</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Available at Pharmacies */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Available at</h3>
//                 </div>
//                 <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
//                   {availablePharmacies.length > 0 ? (
//                     availablePharmacies.map(pharmacy => (
//                       <Link
//                         key={pharmacy._id}
//                         to={`/pharmacies/${pharmacy._id}`}
//                         className="block bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium">{pharmacy.name}</span>
//                           <span className="text-xs text-gray-500">{pharmacy.distance || 'Nearby'}</span>
//                         </div>
//                       </Link>
//                     ))
//                   ) : (
//                     <div className="bg-gray-50 text-gray-500 px-3 py-2 rounded-lg border border-gray-200">
//                       Available at selected pharmacies
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Cart Summary */}
//               {quantityInCart > 0 && (
//                 <div className="pt-4 border-t border-gray-200">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-600 mb-1">In your cart:</p>
//                     <p className="text-lg font-bold text-blue-600">{quantityInCart} unit{quantityInCart > 1 ? 's' : ''}</p>
//                     <p className="text-sm text-gray-500">Total: ${(medicine.price * quantityInCart).toFixed(2)}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Larger (Content) */}
//           <div className="md:w-3/5 lg:w-2/3 flex flex-col">
//             {/* Fixed Header */}
//             <div className="p-6 md:p-8 border-b border-gray-100">
//               <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
//                 {medicine.name}
//               </h1>
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 {medicine.detailedDescription || medicine.description}
//               </p>
//             </div>

//             {/* Scrollable Content with Tabs */}
//             <div className="flex-1 flex flex-col min-h-0">
//               {/* Section Navigation Tabs */}
//               <div className="border-b border-gray-200">
//                 <div className="flex overflow-x-auto px-6 md:px-8">
//                   <button
//                     onClick={() => setActiveSection('uses')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'uses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Uses & Benefits
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('sideEffects')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'sideEffects' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Side Effects
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('precautions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'precautions' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Precautions
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('allergies')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'allergies' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Allergies
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('instructions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'instructions' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Instructions
//                   </button>
//                 </div>
//               </div>

//               {/* Scrollable Content Area */}
//               <div className="flex-1 overflow-y-auto p-6 md:p-8">
//                 {/* Uses Section */}
//                 {activeSection === 'uses' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Uses</h3>
//                       {medicine.uses && medicine.uses.length > 0 ? (
//                         <ul className="space-y-3">
//                           {medicine.uses.map((use, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                               </svg>
//                               <span className="text-gray-700">{use}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific uses listed.</p>
//                       )}
//                     </div>
//                     {medicine.benefits && (
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Benefits</h3>
//                         <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
//                           <p className="text-blue-800">{medicine.benefits}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Side Effects Section */}
//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Common Side Effects</h3>
//                       {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                         <ul className="space-y-3">
//                           {medicine.sideEffects.slice(0, 5).map((effect, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                               </svg>
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific side effects listed.</p>
//                       )}
//                     </div>
//                     {medicine.seriousSideEffects && (
//                       <div className="bg-red-50 border border-red-100 rounded-xl p-4">
//                         <h4 className="font-bold text-red-800 mb-2">⚠️ Serious Side Effects (Seek Medical Help):</h4>
//                         <ul className="space-y-2">
//                           {medicine.seriousSideEffects.map((effect, index) => (
//                             <li key={index} className="text-red-700">{effect}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Precautions Section */}
//                 {activeSection === 'precautions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Important Precautions</h3>
//                       {medicine.precautions && medicine.precautions.length > 0 ? (
//                         <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
//                           <ul className="space-y-4">
//                             {medicine.precautions.map((precaution, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <span className="text-gray-800">{precaution}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific precautions listed.</p>
//                       )}
//                     </div>
//                     {medicine.warnings && (
//                       <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
//                         <p className="text-orange-800 font-medium">{medicine.warnings}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Allergies Section */}
//                 {activeSection === 'allergies' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Allergy Information</h3>
//                       {medicine.allergies ? (
//                         <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
//                           <ul className="space-y-3">
//                             {medicine.allergies.map((allergy, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//                                 </svg>
//                                 <span className="text-gray-800">{allergy}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-700">No specific allergy information available. Consult your doctor if you have known allergies.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Instructions Section */}
//                 {activeSection === 'instructions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Usage Instructions</h3>
//                       {medicine.instructions && medicine.instructions.length > 0 ? (
//                         <div className="bg-green-50 border border-green-100 rounded-xl p-5">
//                           <ul className="space-y-4">
//                             {medicine.instructions.map((instruction, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 <span className="text-gray-800">{instruction}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-700">Take as directed by your physician. Follow the dosage instructions carefully.</p>
//                       )}
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div>
//                         <h4 className="font-bold text-gray-900 mb-2">Storage Instructions</h4>
//                         <p className="text-gray-700">{medicine.storageInstructions}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Fixed Add to Cart Button */}
//               <div className="border-t border-gray-200 p-6 md:p-8 bg-white">
//                 <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//                   <div className="text-center sm:text-left">
//                     <p className="text-gray-600">Quantity in cart: <span className="font-bold text-blue-600">{quantityInCart}</span></p>
//                     <p className="text-sm text-gray-500">Click below to add more</p>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={() => setCart(prev => prev.filter(item => item._id !== medicine._id))}
//                       disabled={quantityInCart === 0}
//                       className={`px-6 py-3 rounded-lg font-medium ${quantityInCart === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
//                     >
//                       Remove
//                     </button>
//                     <button
//                       onClick={addToCart}
//                       className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md hover:shadow-lg"
//                     >
//                       {quantityInCart > 0 ? 'Add More to Cart' : 'Add to Cart'} - ${medicine.price.toFixed(2)}
//                     </button>
//                     <Link
//                       to="/booking"
//                       className={`px-6 py-3 rounded-lg font-medium ${cart.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
//                     >
//                       Checkout ({cart.length})
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Medicines Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Medicines</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {relatedMedicines.length > 0 ? (
//             relatedMedicines.map(relatedMed => (
//               <div key={relatedMed._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg text-gray-800 mb-2">{relatedMed.name}</h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedMed.description}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold text-green-600">${relatedMed.price.toFixed(2)}</span>
//                     <Link
//                       to={`/medicine/${relatedMed._id}`}
//                       className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
//                     >
//                       View Details
//                       <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-3 text-center py-8">
//               <p className="text-gray-500">No related medicines found</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;


























//The backend API is attached below. Working perfect can return to this
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';

// const MedicineDetail = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('uses');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);

//   // Fetch medicine details from backend
// useEffect(() => {
//   const fetchMedicineDetails = async () => {
//     try {
//       setLoading(true);
//       // Use medicine name instead of ID (new aggregated endpoint)
//       const encodedName = encodeURIComponent(id); // id is actually medicine name
//       const response = await fetch(`http://localhost:5000/api/medicines/${encodedName}`);
//       const data = await response.json();
      
//       if (data.success) {
//         // Transform aggregated data to match your component format
//         const medicineDetails = {
//           _id: data.data.medicine._id || data.data.medicine.name,
//           name: data.data.medicine.name,
//           genericName: data.data.medicine.genericName,
//           description: data.data.medicine.description,
//           detailedDescription: data.data.medicine.detailedDescription,
//           category: data.data.medicine.category,
//           // Use lowest price from aggregated data
//           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
//           discountedPrice: data.data.stats?.lowestDiscountedPrice,
//           discountPercentage: data.data.medicine.discountPercentage || 0,
//           dosage: data.data.medicine.dosage,
//           strength: data.data.medicine.strength,
//           form: data.data.medicine.form,
//           manufacturer: data.data.medicine.manufacturer,
//           image: data.data.medicine.image,
//           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
//           inStock: data.data.stats?.totalPharmacies > 0, // Available if at least one pharmacy
//           // Transform availableAtPharmacies
//           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
//             _id: pharmacy.pharmacyId,
//             name: pharmacy.pharmacyName,
//             city: pharmacy.pharmacyCity,
//             distance: pharmacy.pharmacyDistance,
//             // Add other pharmacy fields if needed
//           })) || []
//         };
        
//         setMedicine(medicineDetails);
        
//         // Fetch related medicines (same category)
//         fetchRelatedMedicines(medicineDetails.category, medicineDetails._id);
//       } else {
//         setError('Medicine not found');
//       }
//     } catch (err) {
//       console.error('Error fetching medicine:', err);
//       setError('Error loading medicine details');
//     } finally {
//       setLoading(false);
//     }
//   };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   // Fetch related medicines
//   const fetchRelatedMedicines = async (category, excludeId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/medicines?category=${category}&limit=4`);
//       const data = await response.json();
      
//       if (data.success) {
//         // Exclude current medicine
//         const filtered = data.data.filter(med => med._id !== excludeId).slice(0, 3);
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related medicines:', err);
//     }
//   };

//   // Get quantity in cart
//   const quantityInCart = medicine ? 
//     cart.find(item => item._id === medicine._id)?.quantity || 0 
//     : 0;

//   const addToCart = () => {
//     if (!medicine) return;
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item._id === medicine._id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item._id === medicine._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   const removeFromCart = () => {
//     if (!medicine) return;
    
//     setCart(prevCart => prevCart.filter(item => item._id !== medicine._id));
//   };

//   // Calculate final price with discount
//   const calculateFinalPrice = () => {
//     if (!medicine) return 0;
    
//     if (medicine.discountedPrice) {
//       return medicine.discountedPrice;
//     }
    
//     if (medicine.discountPercentage > 0) {
//       return medicine.price * (1 - medicine.discountPercentage / 100);
//     }
    
//     return medicine.price;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-600">Loading medicine details...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !medicine) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <h2 className="text-2xl font-bold text-red-600 mb-2">Medicine Not Found</h2>
//         <p className="text-gray-500 mb-6">{error || 'The medicine you are looking for does not exist.'}</p>
//         <button 
//           onClick={() => navigate(-1)}
//           className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   const finalPrice = calculateFinalPrice();
//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   const availablePharmacies = medicine.availableAtPharmacies || [];

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Go Back
//       </button>

//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left Column - Medicine Info */}
//           <div className="md:w-2/5 lg:w-1/3 p-6 md:p-8 border-r border-gray-100">
//             {/* Medicine Image */}
//             <div className="mb-6">
//               <div className="relative rounded-xl overflow-hidden bg-gray-50 h-64">
//                 <img
//                   src={medicine.image}
//                   alt={medicine.name}
//                   className="w-full h-full object-contain p-4"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                   }}
//                 />
//                 {isDiscounted && (
//                   <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
//                     {medicine.discountPercentage > 0 
//                       ? `Rs. {medicine.discountPercentage}% OFF` 
//                       : 'SALE'}
//                   </div>
//                 )}
//                 {!medicine.inStock && (
//                   <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-lg font-bold">
//                     OUT OF STOCK
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Medicine Info Box */}
//             <div className="space-y-5">
//               {/* Category */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Category</h3>
//                 </div>
//                 <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
//                   {medicine.category || 'General'}
//                 </div>
//               </div>

//               {/* Manufacturer */}
//               {medicine.manufacturer && (
//                 <div>
//                   <div className="flex items-center mb-2">
//                     <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <h3 className="text-sm font-semibold text-gray-700">Manufacturer</h3>
//                   </div>
//                   <div className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-100">
//                     {medicine.manufacturer}
//                   </div>
//                 </div>
//               )}

//               {/* Dosage */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Dosage</h3>
//                 </div>
//                 <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100">
//                   {medicine.dosage || 'As prescribed'}
//                 </div>
//               </div>

//               {/* Price */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Price</h3>
//                 </div>
//                 <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-100">
//                   <div className="flex justify-between items-center">
//                     <span className="text-2xl font-bold">Rs. {finalPrice.toFixed(2)}</span>
//                     {isDiscounted && medicine.price > finalPrice && (
//                       <span className="text-sm text-gray-500 line-through">
//                         Rs. {medicine.price.toFixed(2)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">per unit</div>
//                 </div>
//               </div>

//               {/* Available at Pharmacies */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Available at</h3>
//                 </div>
//                 <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
//                   {availablePharmacies.length > 0 ? (
//                     availablePharmacies.map(pharmacy => (
//                       <Link
//                         key={pharmacy._id}
//                         to={`/pharmacies/${pharmacy._id}`}
//                         className="block bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium">{pharmacy.name}</span>
//                           <span className="text-xs text-gray-500">{pharmacy.distance || 'Nearby'}</span>
//                         </div>
//                         <div className="text-xs text-gray-500 mt-1">{pharmacy.city}</div>
//                       </Link>
//                     ))
//                   ) : (
//                     <div className="bg-gray-50 text-gray-500 px-3 py-2 rounded-lg border border-gray-200">
//                       Available at selected pharmacies
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Cart Summary */}
//               {quantityInCart > 0 && (
//                 <div className="pt-4 border-t border-gray-200">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-600 mb-1">In your cart:</p>
//                     <p className="text-lg font-bold text-blue-600">{quantityInCart} unit{quantityInCart > 1 ? 's' : ''}</p>
//                     <p className="text-sm text-gray-500">Total: Rs. {(finalPrice * quantityInCart).toFixed(2)}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Content */}
//           <div className="md:w-3/5 lg:w-2/3 flex flex-col">
//             {/* Fixed Header */}
//             <div className="p-6 md:p-8 border-b border-gray-100">
//               <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
//                 <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-0">
//                   {medicine.name}
//                 </h1>
//                 <div className="flex items-center space-x-4">
//                   {/* {medicine.brand && (
//                     <span className="text-lg text-gray-600 font-medium">{medicine.brand}</span>
//                   )} */}
//                   {medicine.prescriptionRequired && (
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                       Prescription Required
//                     </span>
//                   )}
//                 </div>
//               </div>
              
//               {medicine.genericName && (
//                 <p className="text-gray-500 italic mb-3">Generic: {medicine.genericName}</p>
//               )}
              
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 {medicine.detailedDescription || medicine.description}
//               </p>
//             </div>

//             {/* Scrollable Content with Tabs */}
//             <div className="flex-1 flex flex-col min-h-0">
//               {/* Section Navigation Tabs */}
//               <div className="border-b border-gray-200">
//                 <div className="flex overflow-x-auto px-6 md:px-8">
//                   <button
//                     onClick={() => setActiveSection('uses')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'uses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Uses & Benefits
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('sideEffects')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'sideEffects' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Side Effects
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('precautions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'precautions' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Precautions
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('instructions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'instructions' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Instructions
//                   </button>
//                 </div>
//               </div>

//               {/* Scrollable Content Area */}
//               <div className="flex-1 overflow-y-auto p-6 md:p-8">
//                 {/* Uses Section */}
//                 {activeSection === 'uses' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Uses</h3>
//                       {medicine.uses && medicine.uses.length > 0 ? (
//                         <ul className="space-y-3">
//                           {medicine.uses.map((use, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                               </svg>
//                               <span className="text-gray-700">{use}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific uses listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Side Effects Section */}
//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Common Side Effects</h3>
//                       {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                         <ul className="space-y-3">
//                           {medicine.sideEffects.map((effect, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                               </svg>
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific side effects listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Precautions Section */}
//                 {activeSection === 'precautions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Important Precautions</h3>
//                       {medicine.precautions && medicine.precautions.length > 0 ? (
//                         <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
//                           <ul className="space-y-4">
//                             {medicine.precautions.map((precaution, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <span className="text-gray-800">{precaution}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific precautions listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Instructions Section */}
//                 {activeSection === 'instructions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Usage Instructions</h3>
//                       {medicine.instructions && medicine.instructions.length > 0 ? (
//                         <div className="bg-green-50 border border-green-100 rounded-xl p-5">
//                           <ul className="space-y-4">
//                             {medicine.instructions.map((instruction, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 <span className="text-gray-800">{instruction}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-700">Take as directed by your physician. Follow the dosage instructions carefully.</p>
//                       )}
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div>
//                         <h4 className="font-bold text-gray-900 mb-2">Storage Instructions</h4>
//                         <p className="text-gray-700">{medicine.storageInstructions}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Fixed Add to Cart Button */}
//               <div className="border-t border-gray-200 p-6 md:p-8 bg-white">
//                 <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//                   <div className="text-center sm:text-left">
//                     <p className="text-gray-600">Quantity in cart: <span className="font-bold text-blue-600">{quantityInCart}</span></p>
//                     <p className="text-sm text-gray-500">Click below to add more</p>
//                   </div>
//                   {/* <div className="flex flex-wrap gap-3 items-center"> */}
// <div className="flex items-center space-x-4">
//                     <button
//                       onClick={removeFromCart}
//                       disabled={quantityInCart === 0}
//                       className={`px-6 py-3 rounded-lg font-medium ${quantityInCart === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
//                     >
//                       Remove
//                     </button>
//                     <button
//                       onClick={addToCart}
//                       disabled={!medicine.inStock}
//                       className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-colors ${
//                         medicine.inStock
//                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] hover:shadow-lg'
//                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       {medicine.inStock 
//                         ? (quantityInCart > 0 ? 'Add More to Cart' : 'Add to Cart')
//                         : 'Out of Stock'
//                       } - Rs. {finalPrice.toFixed(2)}
//                     </button>
//                     <Link
//                       to="/booking"
//                       className={`px-6 py-3 rounded-lg font-medium ${
//                         cart.length === 0 
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                           : 'bg-green-600 text-white hover:bg-green-700'
//                       }`}
//                     >
//                       Checkout ({cart.length})
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Medicines Section */}
//       {relatedMedicines.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Medicines</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {relatedMedicines.map(relatedMed => (
//               <div key={relatedMed._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
//                     {relatedMed.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                     {relatedMed.description}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold text-green-600">
//                       Rs.{relatedMed.discountedPrice 
//                         ? relatedMed.discountedPrice.toFixed(2)
//                         : relatedMed.price.toFixed(2)
//                       }
//                     </span>
//                     <Link
//                       to={`/medicine/${relatedMed._id}`}
//                       className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
//                     >
//                       View Details
//                       <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Additional Information */}
//       <div className="mt-8 bg-blue-50 rounded-xl p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h4 className="font-semibold text-gray-700 mb-2">📞 Need Help?</h4>
//             <p className="text-gray-600 text-sm">
//               Contact our pharmacists for any questions about this medicine.
//             </p>
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-700 mb-2">⚠️ Safety First</h4>
//             <p className="text-gray-600 text-sm">
//               Always consult your doctor before starting any new medication.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;





















// Updated backend code with new logic
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';

// const MedicineDetail = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('uses');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);
//   const [isAggregatedView, setIsAggregatedView] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);

//   // SMART medicine fetching - detects pharmacy-specific vs aggregated
//   useEffect(() => {
//     const fetchMedicineDetails = async () => {
//       try {
//         setLoading(true);
        
//         // Check if ID is in format: "pharmacyId_medicineId" (pharmacy-specific)
//         // or just "medicineName" (aggregated - for future)
//         const idParts = id.split('_');
        
//         if (idParts.length === 2) {
//           // PHARMACY-SPECIFIC FLOW: pharmacyId_medicineId
//           await fetchPharmacyMedicine(idParts[0], idParts[1]);
//         } else {
//           // AGGREGATED FLOW: medicineName (not implemented yet)
//           await fetchAggregatedMedicine(id);
//         }
//       } catch (err) {
//         console.error('Error fetching medicine:', err);
//         setError('Error loading medicine details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   // 1. Fetch pharmacy-specific medicine
//   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineData = data.data;
        
//         // Calculate discount percentage automatically
//         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
//           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
//           : 0;
        
//         const medicineDetails = {
//           _id: medicineId,
//           id: `${pharmacyId}_${medicineId}`, // Combined ID for cart
//           name: medicineData.name,
//           genericName: medicineData.genericName,
//           description: medicineData.description,
//           detailedDescription: medicineData.detailedDescription || medicineData.description,
//           category: medicineData.category,
//           price: medicineData.price,
//           discountedPrice: medicineData.discountedPrice,
//           discountPercentage: discountPercentage,
//           dosage: medicineData.dosage || 'As prescribed',
//           strength: medicineData.strength,
//           form: medicineData.form,
//           manufacturer: medicineData.manufacturer,
//           image: medicineData.image,
//           prescriptionRequired: medicineData.prescriptionRequired || false,
//           inStock: medicineData.inStock !== false, // Default to true if not specified
//           // Detailed arrays
//           sideEffects: medicineData.sideEffects || [],
//           uses: medicineData.uses || [],
//           precautions: medicineData.precautions || [],
//           instructions: medicineData.instructions || [],
//           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//           // Pharmacy info
//           pharmacyId: pharmacyId,
//           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
//           pharmacyAddress: medicineData.pharmacy?.address,
//           pharmacyCity: medicineData.pharmacy?.city,
//           pharmacyPhone: medicineData.pharmacy?.phone,
//           // Available at (for this pharmacy only)
//           availableAtPharmacies: [{
//             _id: pharmacyId,
//             name: medicineData.pharmacy?.name || 'Pharmacy',
//             city: medicineData.pharmacy?.city,
//             distance: medicineData.pharmacy?.distance || 'Nearby'
//           }]
//         };
        
//         setMedicine(medicineDetails);
//         setPharmacyId(pharmacyId);
//         setIsAggregatedView(false);
        
//         // Fetch related medicines from SAME pharmacy
//         if (medicineData.category) {
//           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
//         }
//       } else {
//         setError(data.message || 'Medicine not found');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacy medicine:', err);
//       setError('Error loading medicine details from pharmacy');
//     }
//   };

//   // 2. Fetch aggregated medicine (FOR FUTURE - NOT WORKING YET)
//   const fetchAggregatedMedicine = async (medicineName) => {
//     try {
//       // For now, show message that aggregated view is not ready
//       // You can uncomment this when you implement aggregation
      
//       /*
//       // UNCOMMENT THIS WHEN READY FOR AGGREGATION:
//       const encodedName = encodeURIComponent(medicineName);
//       const response = await fetch(`http://localhost:5000/api/medicines/${encodedName}`);
//       const data = await response.json();
      
//       if (data.success) {
//         // Transform aggregated data
//         const medicineDetails = {
//           _id: data.data.medicine._id || data.data.medicine.name,
//           id: medicineName, // Use name as ID for aggregated
//           name: data.data.medicine.name,
//           genericName: data.data.medicine.genericName,
//           description: data.data.medicine.description,
//           detailedDescription: data.data.medicine.detailedDescription,
//           category: data.data.medicine.category,
//           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
//           discountedPrice: data.data.stats?.lowestDiscountedPrice,
//           discountPercentage: data.data.medicine.discountPercentage || 0,
//           dosage: data.data.medicine.dosage,
//           strength: data.data.medicine.strength,
//           form: data.data.medicine.form,
//           manufacturer: data.data.medicine.manufacturer,
//           image: data.data.medicine.image,
//           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
//           inStock: data.data.stats?.totalPharmacies > 0,
//           sideEffects: data.data.medicine.sideEffects || [],
//           uses: data.data.medicine.uses || [],
//           precautions: data.data.medicine.precautions || [],
//           instructions: data.data.medicine.instructions || [],
//           storageInstructions: data.data.medicine.storageInstructions,
//           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
//             _id: pharmacy.pharmacyId,
//             name: pharmacy.pharmacyName,
//             city: pharmacy.pharmacyCity,
//             distance: pharmacy.pharmacyDistance,
//           })) || []
//         };
        
//         setMedicine(medicineDetails);
//         setIsAggregatedView(true);
        
//         // Fetch related aggregated medicines
//         if (data.data.medicine.category) {
//           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
//         }
//       } else {
//         setError('Medicine not found in aggregated data');
//       }
//       */
      
//       // TEMPORARY: Show error for aggregated access
//       setError('Aggregated medicine view is not enabled yet. Please access medicines through pharmacies.');
//       setIsAggregatedView(true);
      
//     } catch (err) {
//       console.error('Error fetching aggregated medicine:', err);
//       setError('Error loading aggregated medicine details');
//     }
//   };

//   // Fetch related medicines for pharmacy-specific view
//   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med._id !== excludeMedicineId)
//           .slice(0, 3)
//           .map(med => ({
//             _id: `${pharmacyId}_${med._id}`, // Combined ID
//             name: med.name,
//             description: med.description,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountedPrice && med.price > 0
//               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
//               : 0,
//             image: med.image
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related pharmacy medicines:', err);
//     }
//   };

//   // Fetch related aggregated medicines (FOR FUTURE)
//   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
//     try {
//       // Uncomment when aggregated is ready
//       /*
//       const response = await fetch(`http://localhost:5000/api/medicines?category=${category}&limit=4`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med.name !== excludeMedicineName)
//           .slice(0, 3)
//           .map(med => ({
//             _id: med.name, // Use name as ID
//             name: med.name,
//             description: med.description,
//             price: med.priceStats?.displayPrice || med.price,
//             discountedPrice: med.priceStats?.lowestDiscountedPrice,
//             discountPercentage: med.priceStats?.discountPercentage || 0,
//             image: med.image
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//       */
//     } catch (err) {
//       console.error('Error fetching related aggregated medicines:', err);
//     }
//   };

//   // Get quantity in cart
//   const quantityInCart = medicine ? 
//     cart.find(item => item.id === medicine.id)?.quantity || 0 
//     : 0;

//   const addToCart = () => {
//     if (!medicine) return;
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   const removeFromCart = () => {
//     if (!medicine) return;
    
//     setCart(prevCart => prevCart.filter(item => item.id !== medicine.id));
//   };

//   // Calculate final price with discount
//   const calculateFinalPrice = () => {
//     if (!medicine) return 0;
    
//     if (medicine.discountedPrice) {
//       return medicine.discountedPrice;
//     }
    
//     if (medicine.discountPercentage > 0) {
//       return medicine.price * (1 - medicine.discountPercentage / 100);
//     }
    
//     return medicine.price;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-600">Loading medicine details...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !medicine) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <h2 className="text-2xl font-bold text-red-600 mb-2">Medicine Not Found</h2>
//         <p className="text-gray-500 mb-6">{error || 'The medicine you are looking for does not exist.'}</p>
        
//         {isAggregatedView && (
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//             <p className="text-blue-800 mb-2">
//               Try accessing medicine through a pharmacy:
//             </p>
//             <Link 
//               to="/pharmacies"
//               className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//               Browse Pharmacies →
//             </Link>
//           </div>
//         )}
        
//         <button 
//           onClick={() => navigate(-1)}
//           className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   const finalPrice = calculateFinalPrice();
//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   const availablePharmacies = medicine.availableAtPharmacies || [];

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Go Back
//       </button>

//       {/* Pharmacy Info Banner (only for pharmacy-specific view) */}
//       {!isAggregatedView && medicine.pharmacyName && (
//         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//             <span className="font-medium text-blue-800">
//               Available at: 
//               <Link 
//                 to={`/pharmacies/${medicine.pharmacyId}`} 
//                 className="ml-1 hover:underline font-semibold"
//               >
//                 {medicine.pharmacyName}
//               </Link>
//               {medicine.pharmacyCity && ` (${medicine.pharmacyCity})`}
//             </span>
//             <span className="ml-auto text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
//               Pharmacy-specific price
//             </span>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left Column - Medicine Info */}
//           <div className="md:w-2/5 lg:w-1/3 p-6 md:p-8 border-r border-gray-100">
//             {/* Medicine Image */}
//             <div className="mb-6">
//               <div className="relative rounded-xl overflow-hidden bg-gray-50 h-64">
//                 <img
//                   src={medicine.image}
//                   alt={medicine.name}
//                   className="w-full h-full object-contain p-4"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                   }}
//                 />
//                 {isDiscounted && (
//                   <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
//                     {medicine.discountPercentage > 0 
//                       ? `${medicine.discountPercentage}% OFF` 
//                       : 'SALE'}
//                   </div>
//                 )}
//                 {!medicine.inStock && (
//                   <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-lg font-bold">
//                     OUT OF STOCK
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Medicine Info Box */}
//             <div className="space-y-5">
//               {/* Category */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Category</h3>
//                 </div>
//                 <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
//                   {medicine.category || 'General'}
//                 </div>
//               </div>

//               {/* Manufacturer */}
//               {medicine.manufacturer && (
//                 <div>
//                   <div className="flex items-center mb-2">
//                     <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <h3 className="text-sm font-semibold text-gray-700">Manufacturer</h3>
//                   </div>
//                   <div className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-100">
//                     {medicine.manufacturer}
//                   </div>
//                 </div>
//               )}

//               {/* Dosage */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Dosage</h3>
//                 </div>
//                 <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100">
//                   {medicine.dosage || 'As prescribed'}
//                 </div>
//               </div>

//               {/* Price */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Price</h3>
//                 </div>
//                 <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-100">
//                   <div className="flex justify-between items-center">
//                     <span className="text-2xl font-bold">Rs. {finalPrice.toFixed(2)}</span>
//                     {isDiscounted && medicine.price > finalPrice && (
//                       <span className="text-sm text-gray-500 line-through">
//                         Rs. {medicine.price.toFixed(2)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">per unit</div>
//                   {medicine.discountPercentage > 0 && (
//                     <div className="text-xs text-green-600 font-medium mt-1">
//                       Save {medicine.discountPercentage}%
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Available at Pharmacies */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Available at</h3>
//                 </div>
//                 <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
//                   {availablePharmacies.length > 0 ? (
//                     availablePharmacies.map(pharmacy => (
//                       <Link
//                         key={pharmacy._id}
//                         to={`/pharmacies/${pharmacy._id}`}
//                         className="block bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium">{pharmacy.name}</span>
//                           <span className="text-xs text-gray-500">{pharmacy.distance || 'Nearby'}</span>
//                         </div>
//                         <div className="text-xs text-gray-500 mt-1">{pharmacy.city}</div>
//                       </Link>
//                     ))
//                   ) : (
//                     <div className="bg-gray-50 text-gray-500 px-3 py-2 rounded-lg border border-gray-200">
//                       Available at selected pharmacies
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Cart Summary */}
//               {quantityInCart > 0 && (
//                 <div className="pt-4 border-t border-gray-200">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-600 mb-1">In your cart:</p>
//                     <p className="text-lg font-bold text-blue-600">{quantityInCart} unit{quantityInCart > 1 ? 's' : ''}</p>
//                     <p className="text-sm text-gray-500">Total: Rs. {(finalPrice * quantityInCart).toFixed(2)}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Content */}
//           <div className="md:w-3/5 lg:w-2/3 flex flex-col">
//             {/* Fixed Header */}
//             <div className="p-6 md:p-8 border-b border-gray-100">
//               <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
//                 <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-0">
//                   {medicine.name}
//                 </h1>
//                 <div className="flex items-center space-x-4">
//                   {medicine.prescriptionRequired && (
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                       Prescription Required
//                     </span>
//                   )}
//                 </div>
//               </div>
              
//               {medicine.genericName && (
//                 <p className="text-gray-500 italic mb-3">Generic: {medicine.genericName}</p>
//               )}
              
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 {medicine.detailedDescription || medicine.description}
//               </p>
//             </div>

//             {/* Scrollable Content with Tabs */}
//             <div className="flex-1 flex flex-col min-h-0">
//               {/* Section Navigation Tabs */}
//               <div className="border-b border-gray-200">
//                 <div className="flex overflow-x-auto px-6 md:px-8">
//                   <button
//                     onClick={() => setActiveSection('uses')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'uses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Uses & Benefits
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('sideEffects')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'sideEffects' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Side Effects
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('precautions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'precautions' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Precautions
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('instructions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'instructions' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Instructions
//                   </button>
//                 </div>
//               </div>

//               {/* Scrollable Content Area */}
//               <div className="flex-1 overflow-y-auto p-6 md:p-8">
//                 {/* Uses Section */}
//                 {activeSection === 'uses' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Uses</h3>
//                       {medicine.uses && medicine.uses.length > 0 ? (
//                         <ul className="space-y-3">
//                           {medicine.uses.map((use, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                               </svg>
//                               <span className="text-gray-700">{use}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific uses listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Side Effects Section */}
//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Common Side Effects</h3>
//                       {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                         <ul className="space-y-3">
//                           {medicine.sideEffects.map((effect, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                               </svg>
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific side effects listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Precautions Section */}
//                 {activeSection === 'precautions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Important Precautions</h3>
//                       {medicine.precautions && medicine.precautions.length > 0 ? (
//                         <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
//                           <ul className="space-y-4">
//                             {medicine.precautions.map((precaution, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <span className="text-gray-800">{precaution}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific precautions listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Instructions Section */}
//                 {activeSection === 'instructions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Usage Instructions</h3>
//                       {medicine.instructions && medicine.instructions.length > 0 ? (
//                         <div className="bg-green-50 border border-green-100 rounded-xl p-5">
//                           <ul className="space-y-4">
//                             {medicine.instructions.map((instruction, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 <span className="text-gray-800">{instruction}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-700">Take as directed by your physician. Follow the dosage instructions carefully.</p>
//                       )}
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div>
//                         <h4 className="font-bold text-gray-900 mb-2">Storage Instructions</h4>
//                         <p className="text-gray-700">{medicine.storageInstructions}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Fixed Add to Cart Button */}
//               <div className="border-t border-gray-200 p-6 md:p-8 bg-white">
//                 <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//                   <div className="text-center sm:text-left">
//                     <p className="text-gray-600">Quantity in cart: <span className="font-bold text-blue-600">{quantityInCart}</span></p>
//                     <p className="text-sm text-gray-500">Click below to add more</p>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={removeFromCart}
//                       disabled={quantityInCart === 0}
//                       className={`px-6 py-3 rounded-lg font-medium ${quantityInCart === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
//                     >
//                       Remove
//                     </button>
//                     <button
//                       onClick={addToCart}
//                       disabled={!medicine.inStock}
//                       className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-colors ${
//                         medicine.inStock
//                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] hover:shadow-lg'
//                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       {medicine.inStock 
//                         ? (quantityInCart > 0 ? 'Add More to Cart' : 'Add to Cart')
//                         : 'Out of Stock'
//                       } - Rs. {finalPrice.toFixed(2)}
//                     </button>
//                     <Link
//                       to="/booking"
//                       className={`px-6 py-3 rounded-lg font-medium ${
//                         cart.length === 0 
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                           : 'bg-green-600 text-white hover:bg-green-700'
//                       }`}
//                     >
//                       Checkout ({cart.length})
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Medicines Section */}
//       {relatedMedicines.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Medicines</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {relatedMedicines.map(relatedMed => (
//               <div key={relatedMed._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
//                     {relatedMed.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                     {relatedMed.description}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <span className="text-xl font-bold text-green-600">
//                         Rs.{relatedMed.discountedPrice 
//                           ? relatedMed.discountedPrice.toFixed(2)
//                           : relatedMed.price.toFixed(2)
//                         }
//                       </span>
//                       {relatedMed.discountPercentage > 0 && (
//                         <span className="ml-2 text-sm text-red-600 font-medium">
//                           {relatedMed.discountPercentage}% OFF
//                         </span>
//                       )}
//                     </div>
//                     <Link
//                       to={`/medicine/${relatedMed._id}`}
//                       className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
//                     >
//                       View Details
//                       <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Additional Information */}
//       <div className="mt-8 bg-blue-50 rounded-xl p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h4 className="font-semibold text-gray-700 mb-2">📞 Need Help?</h4>
//             <p className="text-gray-600 text-sm">
//               Contact our pharmacists for any questions about this medicine.
//             </p>
//             {medicine.pharmacyPhone && (
//               <a 
//                 href={`tel:${medicine.pharmacyPhone}`}
//                 className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mt-1"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Call {medicine.pharmacyName}: {medicine.pharmacyPhone}
//               </a>
//             )}
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-700 mb-2">⚠️ Safety First</h4>
//             <p className="text-gray-600 text-sm">
//               Always consult your doctor before starting any new medication.
//             </p>
//             {medicine.prescriptionRequired && (
//               <p className="text-red-600 text-sm mt-1 font-medium">
//                 ⚠️ This medicine requires a valid prescription.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;



















// Aggregated logic
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';

// const MedicineDetail = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('uses');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);
//   const [isAggregatedView, setIsAggregatedView] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);

//   // SMART medicine fetching - detects pharmacy-specific vs aggregated
//   useEffect(() => {
//     const fetchMedicineDetails = async () => {
//       try {
//         setLoading(true);
        
//         // Check if ID is in format: "pharmacyId_medicineId" (pharmacy-specific)
//         // or just "medicineName" (aggregated)
//         const idParts = id.split('_');
        
//         if (idParts.length === 2) {
//           // PHARMACY-SPECIFIC FLOW: pharmacyId_medicineId
//           await fetchPharmacyMedicine(idParts[0], idParts[1]);
//         } else {
//           // AGGREGATED FLOW: medicineName
//           await fetchAggregatedMedicine(id);
//         }
//       } catch (err) {
//         console.error('Error fetching medicine:', err);
//         setError('Error loading medicine details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   // 1. Fetch pharmacy-specific medicine
//   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineData = data.data;
        
//         // Calculate discount percentage automatically
//         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
//           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
//           : 0;
        
//         const medicineDetails = {
//           _id: medicineId,
//           id: `${pharmacyId}_${medicineId}`, // Combined ID for cart
//           name: medicineData.name,
//           genericName: medicineData.genericName,
//           description: medicineData.description,
//           detailedDescription: medicineData.detailedDescription || medicineData.description,
//           category: medicineData.category,
//           price: medicineData.price,
//           discountedPrice: medicineData.discountedPrice,
//           discountPercentage: discountPercentage,
//           dosage: medicineData.dosage || 'As prescribed',
//           strength: medicineData.strength,
//           form: medicineData.form,
//           manufacturer: medicineData.manufacturer,
//           image: medicineData.image,
//           prescriptionRequired: medicineData.prescriptionRequired || false,
//           inStock: medicineData.inStock !== false, // Default to true if not specified
//           // Detailed arrays
//           sideEffects: medicineData.sideEffects || [],
//           uses: medicineData.uses || [],
//           precautions: medicineData.precautions || [],
//           instructions: medicineData.instructions || [],
//           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//           // Pharmacy info
//           pharmacyId: pharmacyId,
//           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
//           pharmacyAddress: medicineData.pharmacy?.address,
//           pharmacyCity: medicineData.pharmacy?.city,
//           pharmacyPhone: medicineData.pharmacy?.phone,
//           // Available at (for this pharmacy only)
//           availableAtPharmacies: [{
//             _id: pharmacyId,
//             name: medicineData.pharmacy?.name || 'Pharmacy',
//             city: medicineData.pharmacy?.city,
//             distance: medicineData.pharmacy?.distance || 'Nearby'
//           }]
//         };
        
//         setMedicine(medicineDetails);
//         setPharmacyId(pharmacyId);
//         setIsAggregatedView(false);
        
//         // Fetch related medicines from SAME pharmacy
//         if (medicineData.category) {
//           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
//         }
//       } else {
//         setError(data.message || 'Medicine not found');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacy medicine:', err);
//       setError('Error loading medicine details from pharmacy');
//     }
//   };

//   // 2. Fetch aggregated medicine
//   const fetchAggregatedMedicine = async (medicineName) => {
//     try {
//       const encodedName = encodeURIComponent(medicineName);
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
//       const data = await response.json();
      
//       if (data.success) {
//         // Transform aggregated data
//         const medicineDetails = {
//           _id: medicineName,
//           id: medicineName,
//           name: data.data.medicine.name,
//           genericName: data.data.medicine.genericName,
//           description: data.data.medicine.description,
//           detailedDescription: data.data.medicine.detailedDescription,
//           category: data.data.medicine.category,
//           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
//           discountedPrice: data.data.stats?.lowestDiscountedPrice,
//           discountPercentage: 0, // Will calculate from availableAt
//           dosage: data.data.medicine.dosage,
//           strength: data.data.medicine.strength,
//           form: data.data.medicine.form,
//           manufacturer: data.data.medicine.manufacturer,
//           image: data.data.medicine.image,
//           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
//           inStock: data.data.stats?.totalPharmacies > 0,
//           sideEffects: data.data.medicine.sideEffects || [],
//           uses: data.data.medicine.uses || [],
//           precautions: data.data.medicine.precautions || [],
//           instructions: data.data.medicine.instructions || [],
//           storageInstructions: data.data.medicine.storageInstructions,
//           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
//             _id: pharmacy.pharmacyId,
//             name: pharmacy.pharmacyName,
//             city: pharmacy.pharmacyCity,
//             distance: pharmacy.distance || 'Nearby',
//             price: pharmacy.price,
//             discountedPrice: pharmacy.discountedPrice,
//             discountPercentage: pharmacy.discountPercentage || 0,
//             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
//           })) || [],
//           stats: data.data.stats
//         };
        
//         setMedicine(medicineDetails);
//         setIsAggregatedView(true);
        
//         // Fetch related aggregated medicines
//         if (data.data.medicine.category) {
//           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
//         }
//       } else {
//         setError('Medicine not found in aggregated data');
//       }
//     } catch (err) {
//       console.error('Error fetching aggregated medicine:', err);
//       setError('Error loading aggregated medicine details');
//     }
//   };

//   // Fetch related medicines for pharmacy-specific view
//   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med._id !== excludeMedicineId)
//           .slice(0, 3)
//           .map(med => ({
//             _id: `${pharmacyId}_${med._id}`, // Combined ID
//             name: med.name,
//             description: med.description,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountedPrice && med.price > 0
//               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
//               : 0,
//             image: med.image
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related pharmacy medicines:', err);
//     }
//   };

//   // Fetch related aggregated medicines
//   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med.name !== excludeMedicineName)
//           .slice(0, 3)
//           .map(med => ({
//             _id: med.name,
//             name: med.name,
//             description: med.description,
//             price: med.lowestPrice || med.price || 0,
//             discountedPrice: med.lowestDiscountedPrice,
//             discountPercentage: 0,
//             image: med.image
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related aggregated medicines:', err);
//     }
//   };

//   // Get quantity in cart
//   const quantityInCart = medicine ? 
//     cart.find(item => item.id === medicine.id)?.quantity || 0 
//     : 0;

//   const addToCart = () => {
//     if (!medicine) return;
    
//     // For aggregated view, can't add to cart directly (need to choose a pharmacy)
//     if (isAggregatedView) {
//       alert('Please select a specific pharmacy to add this medicine to cart');
//       return;
//     }
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   const removeFromCart = () => {
//     if (!medicine) return;
    
//     setCart(prevCart => prevCart.filter(item => item.id !== medicine.id));
//   };

//   // Calculate final price with discount
//   const calculateFinalPrice = () => {
//     if (!medicine) return 0;
    
//     if (medicine.discountedPrice) {
//       return medicine.discountedPrice;
//     }
    
//     if (medicine.discountPercentage > 0) {
//       return medicine.price * (1 - medicine.discountPercentage / 100);
//     }
    
//     return medicine.price;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-600">Loading medicine details...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !medicine) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <h2 className="text-2xl font-bold text-red-600 mb-2">Medicine Not Found</h2>
//         <p className="text-gray-500 mb-6">{error || 'The medicine you are looking for does not exist.'}</p>
        
//         {isAggregatedView && (
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//             <p className="text-blue-800 mb-2">
//               Try accessing medicine through a pharmacy:
//             </p>
//             <Link 
//               to="/pharmacies"
//               className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//               Browse Pharmacies →
//             </Link>
//           </div>
//         )}
        
//         <button 
//           onClick={() => navigate(-1)}
//           className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   const finalPrice = calculateFinalPrice();
//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   const availablePharmacies = medicine.availableAtPharmacies || [];

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Go Back
//       </button>

//       {/* Pharmacy Info Banner (only for pharmacy-specific view) */}
//       {!isAggregatedView && medicine.pharmacyName && (
//         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//             <span className="font-medium text-blue-800">
//               Available at: 
//               <Link 
//                 to={`/pharmacies/${medicine.pharmacyId}`} 
//                 className="ml-1 hover:underline font-semibold"
//               >
//                 {medicine.pharmacyName}
//               </Link>
//               {medicine.pharmacyCity && ` (${medicine.pharmacyCity})`}
//             </span>
//             <span className="ml-auto text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
//               Pharmacy-specific price
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Aggregated View Banner */}
//       {isAggregatedView && (
//         <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//             </svg>
//             <span className="font-medium text-green-800">
//               Available at {availablePharmacies.length} pharmacies • 
//               <span className="ml-2 font-semibold">
//                 Price range: Rs. {medicine.stats?.lowestPrice || 0} - Rs. {medicine.stats?.highestPrice || 0}
//               </span>
//             </span>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left Column - Medicine Info */}
//           <div className="md:w-2/5 lg:w-1/3 p-6 md:p-8 border-r border-gray-100">
//             {/* Medicine Image */}
//             <div className="mb-6">
//               <div className="relative rounded-xl overflow-hidden bg-gray-50 h-64">
//                 <img
//                   src={medicine.image}
//                   alt={medicine.name}
//                   className="w-full h-full object-contain p-4"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                   }}
//                 />
//                 {isDiscounted && (
//                   <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
//                     {medicine.discountPercentage > 0 
//                       ? `${medicine.discountPercentage}% OFF` 
//                       : 'SALE'}
//                   </div>
//                 )}
//                 {!medicine.inStock && (
//                   <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-lg font-bold">
//                     OUT OF STOCK
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Medicine Info Box */}
//             <div className="space-y-5">
//               {/* Category */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Category</h3>
//                 </div>
//                 <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
//                   {medicine.category || 'General'}
//                 </div>
//               </div>

//               {/* Manufacturer */}
//               {medicine.manufacturer && (
//                 <div>
//                   <div className="flex items-center mb-2">
//                     <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <h3 className="text-sm font-semibold text-gray-700">Manufacturer</h3>
//                   </div>
//                   <div className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-100">
//                     {medicine.manufacturer}
//                   </div>
//                 </div>
//               )}

//               {/* Dosage */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Dosage</h3>
//                 </div>
//                 <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100">
//                   {medicine.dosage || 'As prescribed'}
//                 </div>
//               </div>

//               {/* Price */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Price</h3>
//                 </div>
//                 <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-100">
//                   <div className="flex justify-between items-center">
//                     <span className="text-2xl font-bold">Rs. {finalPrice.toFixed(2)}</span>
//                     {isDiscounted && medicine.price > finalPrice && (
//                       <span className="text-sm text-gray-500 line-through">
//                         Rs. {medicine.price.toFixed(2)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">per unit</div>
//                   {medicine.discountPercentage > 0 && (
//                     <div className="text-xs text-green-600 font-medium mt-1">
//                       Save {medicine.discountPercentage}%
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Available at Pharmacies */}
//               <div>
//                 <div className="flex items-center mb-2">
//                   <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-gray-700">Available at</h3>
//                 </div>
//                 <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
//                   {availablePharmacies.length > 0 ? (
//                     availablePharmacies.map(pharmacy => (
//                       <Link
//                         key={pharmacy._id}
//                         to={`/medicine/${pharmacy.uniqueId || `${pharmacy._id}_${medicine.name}`}`}
//                         className="block bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium">{pharmacy.name}</span>
//                           <span className="text-xs text-gray-500">{pharmacy.distance || 'Nearby'}</span>
//                         </div>
//                         <div className="flex justify-between items-center mt-1">
//                           <span className="text-xs text-gray-500">{pharmacy.city}</span>
//                           <span className="text-sm font-bold text-green-600">
//                             Rs. {pharmacy.discountedPrice || pharmacy.price}
//                             {pharmacy.discountPercentage > 0 && (
//                               <span className="ml-1 text-xs text-red-500">
//                                 ({pharmacy.discountPercentage}% OFF)
//                               </span>
//                             )}
//                           </span>
//                         </div>
//                       </Link>
//                     ))
//                   ) : (
//                     <div className="bg-gray-50 text-gray-500 px-3 py-2 rounded-lg border border-gray-200">
//                       Available at selected pharmacies
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Cart Summary */}
//               {quantityInCart > 0 && (
//                 <div className="pt-4 border-t border-gray-200">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-600 mb-1">In your cart:</p>
//                     <p className="text-lg font-bold text-blue-600">{quantityInCart} unit{quantityInCart > 1 ? 's' : ''}</p>
//                     <p className="text-sm text-gray-500">Total: Rs. {(finalPrice * quantityInCart).toFixed(2)}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Content */}
//           <div className="md:w-3/5 lg:w-2/3 flex flex-col">
//             {/* Fixed Header */}
//             <div className="p-6 md:p-8 border-b border-gray-100">
//               <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
//                 <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-0">
//                   {medicine.name}
//                 </h1>
//                 <div className="flex items-center space-x-4">
//                   {medicine.prescriptionRequired && (
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                       Prescription Required
//                     </span>
//                   )}
//                 </div>
//               </div>
              
//               {medicine.genericName && (
//                 <p className="text-gray-500 italic mb-3">Generic: {medicine.genericName}</p>
//               )}
              
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 {medicine.detailedDescription || medicine.description}
//               </p>
//             </div>

//             {/* Scrollable Content with Tabs */}
//             <div className="flex-1 flex flex-col min-h-0">
//               {/* Section Navigation Tabs */}
//               <div className="border-b border-gray-200">
//                 <div className="flex overflow-x-auto px-6 md:px-8">
//                   <button
//                     onClick={() => setActiveSection('uses')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'uses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Uses & Benefits
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('sideEffects')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'sideEffects' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Side Effects
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('precautions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'precautions' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Precautions
//                   </button>
//                   <button
//                     onClick={() => setActiveSection('instructions')}
//                     className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'instructions' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                   >
//                     Instructions
//                   </button>
//                 </div>
//               </div>

//               {/* Scrollable Content Area */}
//               <div className="flex-1 overflow-y-auto p-6 md:p-8">
//                 {/* Uses Section */}
//                 {activeSection === 'uses' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Uses</h3>
//                       {medicine.uses && medicine.uses.length > 0 ? (
//                         <ul className="space-y-3">
//                           {medicine.uses.map((use, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                               </svg>
//                               <span className="text-gray-700">{use}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific uses listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Side Effects Section */}
//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Common Side Effects</h3>
//                       {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                         <ul className="space-y-3">
//                           {medicine.sideEffects.map((effect, index) => (
//                             <li key={index} className="flex items-start">
//                               <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                               </svg>
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific side effects listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Precautions Section */}
//                 {activeSection === 'precautions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Important Precautions</h3>
//                       {medicine.precautions && medicine.precautions.length > 0 ? (
//                         <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
//                           <ul className="space-y-4">
//                             {medicine.precautions.map((precaution, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <span className="text-gray-800">{precaution}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-500 italic">No specific precautions listed.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Instructions Section */}
//                 {activeSection === 'instructions' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Usage Instructions</h3>
//                       {medicine.instructions && medicine.instructions.length > 0 ? (
//                         <div className="bg-green-50 border border-green-100 rounded-xl p-5">
//                           <ul className="space-y-4">
//                             {medicine.instructions.map((instruction, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 <span className="text-gray-800">{instruction}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         <p className="text-gray-700">Take as directed by your physician. Follow the dosage instructions carefully.</p>
//                       )}
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div>
//                         <h4 className="font-bold text-gray-900 mb-2">Storage Instructions</h4>
//                         <p className="text-gray-700">{medicine.storageInstructions}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Fixed Add to Cart Button */}
//               <div className="border-t border-gray-200 p-6 md:p-8 bg-white">
//                 <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//                   <div className="text-center sm:text-left">
//                     <p className="text-gray-600">Quantity in cart: <span className="font-bold text-blue-600">{quantityInCart}</span></p>
//                     <p className="text-sm text-gray-500">Click below to add more</p>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={removeFromCart}
//                       disabled={quantityInCart === 0}
//                       className={`px-6 py-3 rounded-lg font-medium ${quantityInCart === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
//                     >
//                       Remove
//                     </button>
//                     <button
//                       onClick={addToCart}
//                       disabled={!medicine.inStock || isAggregatedView}
//                       className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-colors ${
//                         medicine.inStock && !isAggregatedView
//                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] hover:shadow-lg'
//                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       {medicine.inStock 
//                         ? (isAggregatedView ? 'Select Pharmacy First' : (quantityInCart > 0 ? 'Add More to Cart' : 'Add to Cart'))
//                         : 'Out of Stock'
//                       } - Rs. {finalPrice.toFixed(2)}
//                     </button>
//                     <Link
//                       to="/booking"
//                       className={`px-6 py-3 rounded-lg font-medium ${
//                         cart.length === 0 
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                           : 'bg-green-600 text-white hover:bg-green-700'
//                       }`}
//                     >
//                       Checkout ({cart.length})
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Medicines Section */}
//       {relatedMedicines.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Medicines</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {relatedMedicines.map(relatedMed => (
//               <div key={relatedMed._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
//                     {relatedMed.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                     {relatedMed.description}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <span className="text-xl font-bold text-green-600">
//                         Rs.{relatedMed.discountedPrice 
//                           ? relatedMed.discountedPrice.toFixed(2)
//                           : relatedMed.price.toFixed(2)
//                         }
//                       </span>
//                       {relatedMed.discountPercentage > 0 && (
//                         <span className="ml-2 text-sm text-red-600 font-medium">
//                           {relatedMed.discountPercentage}% OFF
//                         </span>
//                       )}
//                     </div>
//                     <Link
//                       to={`/medicine/${relatedMed._id}`}
//                       className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
//                     >
//                       View Details
//                       <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Additional Information */}
//       <div className="mt-8 bg-blue-50 rounded-xl p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h4 className="font-semibold text-gray-700 mb-2">📞 Need Help?</h4>
//             <p className="text-gray-600 text-sm">
//               Contact our pharmacists for any questions about this medicine.
//             </p>
//             {medicine.pharmacyPhone && (
//               <a 
//                 href={`tel:${medicine.pharmacyPhone}`}
//                 className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mt-1"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Call {medicine.pharmacyName}: {medicine.pharmacyPhone}
//               </a>
//             )}
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-700 mb-2">⚠️ Safety First</h4>
//             <p className="text-gray-600 text-sm">
//               Always consult your doctor before starting any new medication.
//             </p>
//             {medicine.prescriptionRequired && (
//               <p className="text-red-600 text-sm mt-1 font-medium">
//                 ⚠️ This medicine requires a valid prescription.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;



























//        New design
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { 
//   FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
//   FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
//   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
//   FaTruck, FaStar, FaCheckCircle, FaShoppingBag,
//   FaMinus, FaPlus, FaTrash, FaHeart, FaShareAlt,
//   FaPrescriptionBottle, FaTemperatureLow, FaUserMd,
//   FaChevronRight, FaFilter, FaSortAmountDown
// } from 'react-icons/fa';

// const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('overview');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);
//   const [isAggregatedView, setIsAggregatedView] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     const fetchMedicineDetails = async () => {
//       try {
//         setLoading(true);
//         const idParts = id.split('_');
        
//         if (idParts.length === 2) {
//           await fetchPharmacyMedicine(idParts[0], idParts[1]);
//         } else {
//           await fetchAggregatedMedicine(id);
//         }
//       } catch (err) {
//         console.error('Error fetching medicine:', err);
//         setError('Error loading medicine details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineData = data.data;
//         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
//           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
//           : 0;
        
//         const medicineDetails = {
//           _id: medicineId,
//           id: `${pharmacyId}_${medicineId}`,
//           name: medicineData.name,
//           genericName: medicineData.genericName,
//           description: medicineData.description,
//           detailedDescription: medicineData.detailedDescription || medicineData.description,
//           category: medicineData.category,
//           price: medicineData.price,
//           discountedPrice: medicineData.discountedPrice,
//           discountPercentage: discountPercentage,
//           dosage: medicineData.dosage || 'As prescribed',
//           strength: medicineData.strength,
//           form: medicineData.form,
//           manufacturer: medicineData.manufacturer,
//           image: medicineData.image,
//           prescriptionRequired: medicineData.prescriptionRequired || false,
//           inStock: medicineData.inStock !== false,
//           sideEffects: medicineData.sideEffects || [],
//           uses: medicineData.uses || [],
//           precautions: medicineData.precautions || [],
//           instructions: medicineData.instructions || [],
//           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//           pharmacyId: pharmacyId,
//           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
//           pharmacyAddress: medicineData.pharmacy?.address,
//           pharmacyCity: medicineData.pharmacy?.city,
//           pharmacyPhone: medicineData.pharmacy?.phone,
//           pharmacyRating: medicineData.pharmacy?.rating || 4.2,
//           availableAtPharmacies: [{
//             _id: pharmacyId,
//             name: medicineData.pharmacy?.name || 'Pharmacy',
//             city: medicineData.pharmacy?.city,
//             distance: medicineData.pharmacy?.distance || '2.5 km',
//             deliveryTime: '30-45 min',
//             rating: medicineData.pharmacy?.rating || 4.2
//           }]
//         };
        
//         setMedicine(medicineDetails);
//         setPharmacyId(pharmacyId);
//         setIsAggregatedView(false);
//         setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
//         if (medicineData.category) {
//           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
//         }
//       } else {
//         setError(data.message || 'Medicine not found');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacy medicine:', err);
//       setError('Error loading medicine details from pharmacy');
//     }
//   };

//   const fetchAggregatedMedicine = async (medicineName) => {
//     try {
//       const encodedName = encodeURIComponent(medicineName);
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineDetails = {
//           _id: medicineName,
//           id: medicineName,
//           name: data.data.medicine.name,
//           genericName: data.data.medicine.genericName,
//           description: data.data.medicine.description,
//           detailedDescription: data.data.medicine.detailedDescription,
//           category: data.data.medicine.category,
//           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
//           discountedPrice: data.data.stats?.lowestDiscountedPrice,
//           discountPercentage: 0,
//           dosage: data.data.medicine.dosage,
//           strength: data.data.medicine.strength,
//           form: data.data.medicine.form,
//           manufacturer: data.data.medicine.manufacturer,
//           image: data.data.medicine.image,
//           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
//           inStock: data.data.stats?.totalPharmacies > 0,
//           sideEffects: data.data.medicine.sideEffects || [],
//           uses: data.data.medicine.uses || [],
//           precautions: data.data.medicine.precautions || [],
//           instructions: data.data.medicine.instructions || [],
//           storageInstructions: data.data.medicine.storageInstructions,
//           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
//             _id: pharmacy.pharmacyId,
//             name: pharmacy.pharmacyName,
//             city: pharmacy.pharmacyCity,
//             distance: pharmacy.distance || '2.5 km',
//             deliveryTime: '30-45 min',
//             rating: pharmacy.rating || 4.0,
//             price: pharmacy.price,
//             discountedPrice: pharmacy.discountedPrice,
//             discountPercentage: pharmacy.discountPercentage || 0,
//             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
//           })) || [],
//           stats: data.data.stats
//         };
        
//         setMedicine(medicineDetails);
//         setIsAggregatedView(true);
        
//         if (data.data.availableAt?.length > 0) {
//           setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
//         }
        
//         if (data.data.medicine.category) {
//           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
//         }
//       } else {
//         setError('Medicine not found in aggregated data');
//       }
//     } catch (err) {
//       console.error('Error fetching aggregated medicine:', err);
//       setError('Error loading aggregated medicine details');
//     }
//   };

//   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med._id !== excludeMedicineId)
//           .slice(0, 4)
//           .map(med => ({
//             _id: `${pharmacyId}_${med._id}`,
//             name: med.name,
//             description: med.description,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountedPrice && med.price > 0
//               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
//               : 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.2
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related pharmacy medicines:', err);
//     }
//   };

//   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med.name !== excludeMedicineName)
//           .slice(0, 4)
//           .map(med => ({
//             _id: med.name,
//             name: med.name,
//             description: med.description,
//             price: med.lowestPrice || med.price || 0,
//             discountedPrice: med.lowestDiscountedPrice,
//             discountPercentage: 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.0
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related aggregated medicines:', err);
//     }
//   };

//   const quantityInCart = medicine ? 
//     cart.find(item => item.id === medicine.id)?.quantity || 0 
//     : 0;

//   const addToCart = () => {
//     if (!medicine || !selectedPharmacy) return;
    
//     const cartItem = {
//       ...medicine,
//       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
//       quantity: quantity,
//       selectedPharmacy: selectedPharmacy
//     };
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === cartItem.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === cartItem.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prevCart, cartItem];
//     });
//   };

//   const removeFromCart = () => {
//     if (!medicine || !selectedPharmacy) return;
//     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
//     setCart(prevCart => prevCart.filter(item => item.id !== itemId));
//   };

//   const incrementQuantity = () => quantity < 10 && setQuantity(prev => prev + 1);
//   const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

//   const toggleFavorite = () => {
//     if (!medicine) return;
//     setIsFavorite(!isFavorite);
//     // In real app, you would update favorites state here
//   };

//   const calculateFinalPrice = () => {
//     if (!medicine) return 0;
//     if (medicine.discountedPrice) return medicine.discountedPrice;
//     if (medicine.discountPercentage > 0) {
//       return medicine.price * (1 - medicine.discountPercentage / 100);
//     }
//     return medicine.price;
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <FaStar 
//         key={i} 
//         className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
//         size={14}
//       />
//     ));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="h-96 bg-gray-200 rounded-xl"></div>
//                 <div className="h-64 bg-gray-200 rounded-xl"></div>
//               </div>
//               <div className="space-y-6">
//                 <div className="h-32 bg-gray-200 rounded-xl"></div>
//                 <div className="h-48 bg-gray-200 rounded-xl"></div>
//                 <div className="h-24 bg-gray-200 rounded-xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !medicine) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
//             <FaExclamationTriangle className="w-10 h-10 text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
//           <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
//           <button 
//             onClick={() => navigate(-1)}
//             className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
//           >
//             <FaArrowLeft className="mr-2" />
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const finalPrice = calculateFinalPrice();
//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   const availablePharmacies = medicine.availableAtPharmacies || [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
//             >
//               <FaArrowLeft className="mr-2" />
//               Back
//             </button>
            
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={toggleFavorite}
//                 className="p-2 text-gray-600 hover:text-red-500 transition-colors"
//               >
//                 <FaHeart className={isFavorite ? "text-red-500" : ""} />
//               </button>
//               <button className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors">
//                 <FaShareAlt />
//               </button>
//               <Link
//                 to="/booking"
//                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
//                   cart.length === 0 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                 }`}
//               >
//                 <FaShoppingCart className="mr-2" />
//                 Checkout ({cart.length})
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-600 mb-6">
//           <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <span className="text-gray-400">{medicine.category}</span>
//           <FaChevronRight className="mx-2" size={10} />
//           <span className="font-medium text-gray-900">{medicine.name}</span>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Column - Product Info */}
//           <div className="lg:col-span-2">
//             {/* Product Card */}
//             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Product Image */}
//                 <div className="flex flex-col">
//                   <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-8 flex items-center justify-center h-80">
//                     <img
//                       src={medicine.image}
//                       alt={medicine.name}
//                       className="max-h-64 object-contain"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                       }}
//                     />
//                   </div>
//                   {isDiscounted && (
//                     <div className="mt-4">
//                       <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
//                         {medicine.discountPercentage}% OFF
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Product Details */}
//                 <div>
//                   <div className="mb-4">
//                     <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
//                     {medicine.genericName && (
//                       <p className="text-gray-600">
//                         <span className="font-medium">Generic:</span> {medicine.genericName}
//                       </p>
//                     )}
//                     <div className="flex items-center mt-2">
//                       {renderStars(4.2)}
//                       <span className="ml-2 text-sm text-gray-600">(4.2)</span>
//                     </div>
//                   </div>

//                   {/* Price Section */}
//                   <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//                     <div className="flex items-end mb-2">
//                       <span className="text-3xl font-bold text-[var(--secondary-color)]">
//                         Rs. {finalPrice.toFixed(2)}
//                       </span>
//                       {isDiscounted && medicine.price > finalPrice && (
//                         <span className="ml-3 text-lg text-gray-500 line-through">
//                           Rs. {medicine.price.toFixed(2)}
//                         </span>
//                       )}
//                       {medicine.discountPercentage > 0 && (
//                         <span className="ml-3 px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded">
//                           Save {medicine.discountPercentage}%
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600">Inclusive of all taxes</p>
//                   </div>

//                   {/* Key Features */}
//                   <div className="grid grid-cols-2 gap-3 mb-6">
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaCapsules className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Form</div>
//                         <div className="font-medium">{medicine.form}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaIndustry className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Manufacturer</div>
//                         <div className="font-medium">{medicine.manufacturer || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaPills className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Strength</div>
//                         <div className="font-medium">{medicine.strength || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaPrescriptionBottle className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Prescription</div>
//                         <div className={`font-medium ${medicine.prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
//                           {medicine.prescriptionRequired ? 'Required' : 'Not Required'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stock Status */}
//                   <div className={`mb-6 p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
//                     <div className="flex items-center">
//                       {medicine.inStock ? (
//                         <>
//                           <FaCheckCircle className="text-green-500 mr-3" />
//                           <div>
//                             <div className="font-medium text-green-700">In Stock</div>
//                             <div className="text-sm text-green-600">Available for delivery</div>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <FaExclamationTriangle className="text-red-500 mr-3" />
//                           <div>
//                             <div className="font-medium text-red-700">Out of Stock</div>
//                             <div className="text-sm text-red-600">Check nearby pharmacies</div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs Section */}
//             <div className="bg-white rounded-xl shadow-md mb-6">
//               {/* Tab Navigation */}
//               <div className="border-b">
//                 <div className="flex overflow-x-auto">
//                   {[
//                     { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
//                     { id: 'uses', label: 'Uses', icon: <FaPills /> },
//                     { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
//                     { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
//                     { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
//                   ].map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveSection(tab.id)}
//                       className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
//                         activeSection === tab.id
//                           ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
//                           : 'border-transparent text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       <span className="mr-2">{tab.icon}</span>
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Tab Content */}
//               <div className="p-6">
//                 {activeSection === 'overview' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
//                       <p className="text-gray-700 leading-relaxed">
//                         {medicine.detailedDescription || medicine.description}
//                       </p>
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div className="bg-blue-50 p-4 rounded-lg">
//                         <div className="flex items-start">
//                           <FaTemperatureLow className="text-blue-500 mt-1 mr-3" />
//                           <div>
//                             <h4 className="font-bold text-gray-900 mb-1">Storage Instructions</h4>
//                             <p className="text-gray-700">{medicine.storageInstructions}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'uses' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Therapeutic Uses</h3>
//                     {medicine.uses && medicine.uses.length > 0 ? (
//                       <ul className="space-y-3">
//                         {medicine.uses.map((use, index) => (
//                           <li key={index} className="flex items-start">
//                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
//                             <span className="text-gray-700">{use}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific uses listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Possible Side Effects</h3>
//                     {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                       <div className="bg-yellow-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.sideEffects.map((effect, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific side effects listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'precautions' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Safety Precautions</h3>
//                     {medicine.precautions && medicine.precautions.length > 0 ? (
//                       <div className="bg-red-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.precautions.map((precaution, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{precaution}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific precautions listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'instructions' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Usage Instructions</h3>
//                     {medicine.instructions && medicine.instructions.length > 0 ? (
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.instructions.map((instruction, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{instruction}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-700">Take as directed by your physician.</p>
//                     )}
//                     <div className="mt-6">
//                       <h4 className="font-bold text-gray-900 mb-2">Dosage</h4>
//                       <p className="text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Related Medicines */}
//             {relatedMedicines.length > 0 && (
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
//                   <Link 
//                     to={`/search?category=${medicine.category}`}
//                     className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium flex items-center"
//                   >
//                     View All
//                     <FaChevronRight className="ml-1" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {relatedMedicines.map(relatedMed => (
//                     <Link
//                       key={relatedMed._id}
//                       to={`/medicine/${relatedMed._id}`}
//                       className="group border border-gray-200 rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
//                     >
//                       <div className="flex">
//                         <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
//                           <img
//                             src={relatedMed.image}
//                             alt={relatedMed.name}
//                             className="max-h-16 max-w-16 object-contain"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 line-clamp-1">
//                             {relatedMed.name}
//                           </h3>
//                           <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs.{relatedMed.discountedPrice || relatedMed.price}
//                               </span>
//                               {relatedMed.discountedPrice && (
//                                 <span className="ml-2 text-sm text-gray-500 line-through">
//                                   Rs.{relatedMed.price}
//                                 </span>
//                               )}
//                             </div>
//                             <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)]" />
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Action Panel */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Pharmacy Selection */}
//               {isAggregatedView && availablePharmacies.length > 0 && (
//                 <div className="bg-white rounded-xl shadow-md p-5">
//                   <div className="flex items-center mb-4">
//                     <FaStore className="text-[var(--primary-color)] mr-2" />
//                     <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
//                     <span className="ml-auto text-sm text-gray-600">{availablePharmacies.length} options</span>
//                   </div>
//                   <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
//                     {availablePharmacies.map(pharmacy => (
//                       <button
//                         key={pharmacy._id}
//                         onClick={() => setSelectedPharmacy(pharmacy)}
//                         className={`w-full text-left p-4 rounded-lg border transition-all ${
//                           selectedPharmacy?._id === pharmacy._id
//                             ? 'border-[var(--primary-color)] bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
//                           <div className="flex items-center">
//                             {renderStars(pharmacy.rating)}
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaMapMarkerAlt className="mr-2" />
//                             {pharmacy.city} • {pharmacy.distance}
//                           </div>
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaClock className="mr-2" />
//                             {pharmacy.deliveryTime}
//                           </div>
//                           <div className="flex items-center justify-between mt-3">
//                             <div className="flex items-center">
//                               <FaTag className="text-green-500 mr-2" />
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
//                               </span>
//                               {pharmacy.discountPercentage > 0 && (
//                                 <span className="ml-2 text-sm text-red-500">
//                                   ({pharmacy.discountPercentage}% OFF)
//                                 </span>
//                               )}
//                             </div>
//                             {selectedPharmacy?._id === pharmacy._id && (
//                               <FaCheckCircle className="text-green-500" />
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Order Summary */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                
//                 {/* Quantity Selector */}
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-gray-700">Quantity</span>
//                     <span className="text-sm text-gray-500">Max: 10 units</span>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       onClick={decrementQuantity}
//                       disabled={quantity <= 1}
//                       className="w-12 h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       <FaMinus />
//                     </button>
//                     <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-lg">
//                       {quantity}
//                     </div>
//                     <button
//                       onClick={incrementQuantity}
//                       disabled={quantity >= 10}
//                       className="w-12 h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       <FaPlus />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Price Breakdown */}
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Price ({quantity} units)</span>
//                     <span className="font-medium">Rs. {(finalPrice * quantity).toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Delivery</span>
//                     <span className="text-green-600 font-medium">FREE</span>
//                   </div>
//                   {medicine.discountPercentage > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Discount</span>
//                       <span className="text-red-600 font-medium">-Rs. {(medicine.price - finalPrice).toFixed(2)}</span>
//                     </div>
//                   )}
//                   <div className="border-t pt-3">
//                     <div className="flex justify-between font-bold text-lg">
//                       <span>Total Amount</span>
//                       <span className="text-[var(--secondary-color)]">Rs. {(finalPrice * quantity).toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   {quantityInCart > 0 ? (
//                     <>
//                       <button
//                         onClick={addToCart}
//                         className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition-colors flex items-center justify-center"
//                       >
//                         <FaShoppingBag className="mr-2" />
//                         Update Cart ({quantityInCart})
//                       </button>
//                       <button
//                         onClick={removeFromCart}
//                         className="w-full py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
//                       >
//                         <FaTrash className="mr-2" />
//                         Remove from Cart
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={addToCart}
//                       disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
//                       className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
//                         medicine.inStock && (!isAggregatedView || selectedPharmacy)
//                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       <FaShoppingCart className="mr-2" />
//                       {medicine.inStock 
//                         ? (isAggregatedView && !selectedPharmacy ? 'Select Pharmacy' : 'Add to Cart')
//                         : 'Out of Stock'
//                       }
//                     </button>
//                   )}
                  
//                   {medicine.prescriptionRequired && (
//                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                       <div className="flex items-start">
//                         <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
//                         <p className="text-sm text-yellow-800">
//                           This medicine requires a valid prescription. Upload prescription during checkout.
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <div className="flex items-center mb-4">
//                   <FaTruck className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900">Delivery Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <FaMapMarkerAlt className="text-gray-400 mr-3" />
//                     <div>
//                       <div className="font-medium">Deliver to</div>
//                       <div className="text-sm text-gray-600">Your current location</div>
//                     </div>
//                     <button className="ml-auto text-[var(--primary-color)] text-sm font-medium">
//                       Change
//                     </button>
//                   </div>
//                   <div className="flex items-center">
//                     <FaClock className="text-gray-400 mr-3" />
//                     <div>
//                       <div className="font-medium">Delivery Time</div>
//                       <div className="text-sm text-gray-600">30-45 minutes</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Need Help */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <div className="flex items-center mb-4">
//                   <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900">Need Help?</h3>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-4">
//                   Our pharmacists are available 24/7 to answer your questions.
//                 </p>
//                 <div className="space-y-3">
//                   <a 
//                     href={`tel:${medicine.pharmacyPhone || '1800-123-4567'}`}
//                     className="flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors"
//                   >
//                     <FaPhoneAlt className="mr-2" />
//                     Call Pharmacy
//                   </a>
//                   <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//                     Chat with Pharmacist
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Safety Footer */}
//         <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-6">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center mb-4 md:mb-0">
//               <FaShieldAlt className="text-white text-2xl mr-4" />
//               <div>
//                 <h3 className="text-white font-bold text-lg">100% Safe & Secure</h3>
//                 <p className="text-white/90 text-sm">Your health is our priority</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-6">
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">10K+</div>
//                 <div className="text-white/80 text-sm">Happy Customers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">24/7</div>
//                 <div className="text-white/80 text-sm">Pharmacy Support</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">100%</div>
//                 <div className="text-white/80 text-sm">Authentic Medicines</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;






















// New design fixing:
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { 
//   FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
//   FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
//   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
//   FaTruck, FaCheckCircle, FaShoppingBag,
//   FaMinus, FaPlus, FaTrash, FaHeart, FaShareAlt,
//   FaPrescriptionBottle, FaTemperatureLow, FaUserMd,
//   FaChevronRight, FaFilter, FaSortAmountDown
// } from 'react-icons/fa';

// const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('overview');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);
//   const [isAggregatedView, setIsAggregatedView] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // You can get this from auth context

//   // ==============================================
//   // Login/Signup functionality - Temporarily commented
//   // In production, get this from your auth context or localStorage
//   // ==============================================
//   /*
//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem('authToken');
//     setIsLoggedIn(!!token);
//   }, []);
//   */

//   const requireLogin = (actionType) => {
//     // Uncomment this in production
//     /*
//     if (!isLoggedIn) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: `/medicine/${id}`,
//           message: `Please login to ${actionType}` 
//         } 
//       });
//       return false;
//     }
//     return true;
//     */
//    return true; // Remove this line when enabling login
//   };

//   // ==============================================

//   useEffect(() => {
//     const fetchMedicineDetails = async () => {
//       try {
//         setLoading(true);
//         const idParts = id.split('_');
        
//         if (idParts.length === 2) {
//           await fetchPharmacyMedicine(idParts[0], idParts[1]);
//         } else {
//           await fetchAggregatedMedicine(id);
//         }
//       } catch (err) {
//         console.error('Error fetching medicine:', err);
//         setError('Error loading medicine details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineData = data.data;
//         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
//           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
//           : 0;
        
//         const medicineDetails = {
//           _id: medicineId,
//           id: `${pharmacyId}_${medicineId}`,
//           name: medicineData.name,
//           genericName: medicineData.genericName,
//           description: medicineData.description,
//           detailedDescription: medicineData.detailedDescription || medicineData.description,
//           category: medicineData.category,
//           price: medicineData.price,
//           discountedPrice: medicineData.discountedPrice,
//           discountPercentage: discountPercentage,
//           dosage: medicineData.dosage || 'As prescribed',
//           strength: medicineData.strength,
//           form: medicineData.form,
//           manufacturer: medicineData.manufacturer,
//           image: medicineData.image,
//           prescriptionRequired: medicineData.prescriptionRequired || false,
//           inStock: medicineData.inStock !== false,
//           sideEffects: medicineData.sideEffects || [],
//           uses: medicineData.uses || [],
//           precautions: medicineData.precautions || [],
//           instructions: medicineData.instructions || [],
//           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//           pharmacyId: pharmacyId,
//           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
//           pharmacyAddress: medicineData.pharmacy?.address,
//           pharmacyCity: medicineData.pharmacy?.city,
//           pharmacyPhone: medicineData.pharmacy?.phone,
//           pharmacyRating: medicineData.pharmacy?.rating || 4.2,
//           availableAtPharmacies: [{
//             _id: pharmacyId,
//             name: medicineData.pharmacy?.name || 'Pharmacy',
//             city: medicineData.pharmacy?.city,
//             distance: medicineData.pharmacy?.distance || '2.5 km',
//             deliveryTime: '30-45 min',
//             rating: medicineData.pharmacy?.rating || 4.2
//           }]
//         };
        
//         setMedicine(medicineDetails);
//         setPharmacyId(pharmacyId);
//         setIsAggregatedView(false);
//         setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
//         if (medicineData.category) {
//           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
//         }
//       } else {
//         setError(data.message || 'Medicine not found');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacy medicine:', err);
//       setError('Error loading medicine details from pharmacy');
//     }
//   };

//   const fetchAggregatedMedicine = async (medicineName) => {
//     try {
//       const encodedName = encodeURIComponent(medicineName);
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineDetails = {
//           _id: medicineName,
//           id: medicineName,
//           name: data.data.medicine.name,
//           genericName: data.data.medicine.genericName,
//           description: data.data.medicine.description,
//           detailedDescription: data.data.medicine.detailedDescription,
//           category: data.data.medicine.category,
//           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
//           discountedPrice: data.data.stats?.lowestDiscountedPrice,
//           discountPercentage: 0,
//           dosage: data.data.medicine.dosage,
//           strength: data.data.medicine.strength,
//           form: data.data.medicine.form,
//           manufacturer: data.data.medicine.manufacturer,
//           image: data.data.medicine.image,
//           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
//           inStock: data.data.stats?.totalPharmacies > 0,
//           sideEffects: data.data.medicine.sideEffects || [],
//           uses: data.data.medicine.uses || [],
//           precautions: data.data.medicine.precautions || [],
//           instructions: data.data.medicine.instructions || [],
//           storageInstructions: data.data.medicine.storageInstructions,
//           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
//             _id: pharmacy.pharmacyId,
//             name: pharmacy.pharmacyName,
//             city: pharmacy.pharmacyCity,
//             distance: pharmacy.distance || '2.5 km',
//             deliveryTime: '30-45 min',
//             rating: pharmacy.rating || 4.0,
//             price: pharmacy.price,
//             discountedPrice: pharmacy.discountedPrice,
//             discountPercentage: pharmacy.discountPercentage || 0,
//             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
//           })) || [],
//           stats: data.data.stats
//         };
        
//         setMedicine(medicineDetails);
//         setIsAggregatedView(true);
        
//         if (data.data.availableAt?.length > 0) {
//           setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
//         }
        
//         if (data.data.medicine.category) {
//           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
//         }
//       } else {
//         setError('Medicine not found in aggregated data');
//       }
//     } catch (err) {
//       console.error('Error fetching aggregated medicine:', err);
//       setError('Error loading aggregated medicine details');
//     }
//   };

//   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med._id !== excludeMedicineId)
//           .slice(0, 4)
//           .map(med => ({
//             _id: `${pharmacyId}_${med._id}`,
//             name: med.name,
//             description: med.description,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountedPrice && med.price > 0
//               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
//               : 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.2
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related pharmacy medicines:', err);
//     }
//   };

//   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med.name !== excludeMedicineName)
//           .slice(0, 4)
//           .map(med => ({
//             _id: med.name,
//             name: med.name,
//             description: med.description,
//             price: med.lowestPrice || med.price || 0,
//             discountedPrice: med.lowestDiscountedPrice,
//             discountPercentage: 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.0
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related aggregated medicines:', err);
//     }
//   };

//   const quantityInCart = medicine ? 
//     cart.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
//     : 0;

//   const addToCart = () => {
//     // Check login before adding to cart
//     if (!requireLogin('add to cart')) return;
    
//     if (!medicine || !selectedPharmacy) return;
    
//     const cartItem = {
//       ...medicine,
//       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
//       quantity: quantity,
//       selectedPharmacy: selectedPharmacy,
//       pharmacyTag: medicine.pharmacyName || selectedPharmacy.name
//     };
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === cartItem.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === cartItem.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prevCart, cartItem];
//     });
//   };

//   const updateCart = () => {
//     if (!medicine || !selectedPharmacy) return;
    
//     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
//     setCart(prevCart => 
//       prevCart.map(item => 
//         item.id === itemId
//           ? { ...item, quantity: quantity }
//           : item
//       )
//     );
//   };

//   const removeFromCart = () => {
//     if (!medicine || !selectedPharmacy) return;
//     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
//     setCart(prevCart => prevCart.filter(item => item.id !== itemId));
//   };

//   const incrementQuantity = () => quantity < 10 && setQuantity(prev => prev + 1);
//   const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

//   const toggleFavorite = () => {
//     // Check login before adding to wishlist
//     if (!requireLogin('add to wishlist')) return;
    
//     if (!medicine) return;
//     setIsFavorite(!isFavorite);
//     // In real app, you would update favorites state here
//   };

//   const calculateFinalPrice = () => {
//     if (!medicine) return 0;
//     if (medicine.discountedPrice) return medicine.discountedPrice;
//     if (medicine.discountPercentage > 0) {
//       return medicine.price * (1 - medicine.discountPercentage / 100);
//     }
//     return medicine.price;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="h-96 bg-gray-200 rounded-xl"></div>
//                 <div className="h-64 bg-gray-200 rounded-xl"></div>
//               </div>
//               <div className="space-y-6">
//                 <div className="h-32 bg-gray-200 rounded-xl"></div>
//                 <div className="h-48 bg-gray-200 rounded-xl"></div>
//                 <div className="h-24 bg-gray-200 rounded-xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !medicine) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
//             <FaExclamationTriangle className="w-10 h-10 text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
//           <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
//           <button 
//             onClick={() => navigate(-1)}
//             className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
//           >
//             <FaArrowLeft className="mr-2" />
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const finalPrice = calculateFinalPrice();
//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   const availablePharmacies = medicine.availableAtPharmacies || [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
//             >
//               <FaArrowLeft className="mr-2" />
//               Back
//             </button>
            
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={toggleFavorite}
//                 className="p-2 text-gray-600 hover:text-red-500 transition-colors"
//               >
//                 <FaHeart className={isFavorite ? "text-red-500" : ""} />
//               </button>
//               <button className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors">
//                 <FaShareAlt />
//               </button>
//               <Link
//                 to="/booking"
//                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
//                   cart.length === 0 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                 }`}
//               >
//                 <FaShoppingCart className="mr-2" />
//                 Checkout ({cart.length})
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-600 mb-6">
//           <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <span className="text-gray-400">{medicine.category}</span>
//           <FaChevronRight className="mx-2" size={10} />
//           <span className="font-medium text-gray-900">{medicine.name}</span>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Column - Product Info */}
//           <div className="lg:col-span-2">
//             {/* Product Card */}
//             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Product Image */}
//                 <div className="flex flex-col">
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-64">
//                       <img
//                         src={medicine.image}
//                         alt={medicine.name}
//                         className="max-h-52 object-contain"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                         }}
//                       />
//                     </div>
//                     {/* Discount badge moved to top */}
//                     {isDiscounted && (
//                       <div className="absolute top-4 left-4">
//                         <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
//                           Save {medicine.discountPercentage}%
//                         </span>
//                       </div>
//                     )}
//                     {/* Pharmacy tag */}
//                     <div className="absolute top-4 right-4">
//                       <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
//                         {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Product Details */}
//                 <div>
//                   <div className="mb-4">
//                     <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
//                     {medicine.genericName && (
//                       <p className="text-gray-600">
//                         <span className="font-medium">Generic:</span> {medicine.genericName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Price Section */}
//                   <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//                     <div className="flex items-end mb-2">
//                       <span className="text-3xl font-bold text-[var(--secondary-color)]">
//                         Rs. {finalPrice.toFixed(2)}
//                       </span>
//                       {isDiscounted && medicine.price > finalPrice && (
//                         <span className="ml-3 text-lg text-gray-500 line-through">
//                           Rs. {medicine.price.toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600">Inclusive of all taxes</p>
//                   </div>

//                   {/* Key Features */}
//                   <div className="grid grid-cols-2 gap-3 mb-6">
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaCapsules className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Form</div>
//                         <div className="font-medium">{medicine.form}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaIndustry className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Manufacturer</div>
//                         <div className="font-medium">{medicine.manufacturer || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaPills className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Strength</div>
//                         <div className="font-medium">{medicine.strength || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaPrescriptionBottle className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Prescription</div>
//                         <div className={`font-medium ${medicine.prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
//                           {medicine.prescriptionRequired ? 'Required' : 'Not Required'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stock Status */}
//                   <div className={`mb-6 p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
//                     <div className="flex items-center">
//                       {medicine.inStock ? (
//                         <>
//                           <FaCheckCircle className="text-green-500 mr-3" />
//                           <div>
//                             <div className="font-medium text-green-700">In Stock</div>
//                             <div className="text-sm text-green-600">Available for delivery</div>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <FaExclamationTriangle className="text-red-500 mr-3" />
//                           <div>
//                             <div className="font-medium text-red-700">Out of Stock</div>
//                             <div className="text-sm text-red-600">Check nearby pharmacies</div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs Section - Fixed height with scroll */}
//             <div className="bg-white rounded-xl shadow-md mb-6">
//               {/* Tab Navigation */}
//               <div className="border-b">
//                 <div className="flex overflow-x-auto">
//                   {[
//                     { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
//                     { id: 'uses', label: 'Uses', icon: <FaPills /> },
//                     { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
//                     { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
//                     { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
//                   ].map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveSection(tab.id)}
//                       className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
//                         activeSection === tab.id
//                           ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
//                           : 'border-transparent text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       <span className="mr-2">{tab.icon}</span>
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Tab Content - Fixed height with scroll */}
//               <div className="p-6 max-h-[400px] overflow-y-auto">
//                 {activeSection === 'overview' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
//                       <p className="text-gray-700 leading-relaxed">
//                         {medicine.detailedDescription || medicine.description}
//                       </p>
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div className="bg-blue-50 p-4 rounded-lg">
//                         <div className="flex items-start">
//                           <FaTemperatureLow className="text-blue-500 mt-1 mr-3" />
//                           <div>
//                             <h4 className="font-bold text-gray-900 mb-1">Storage Instructions</h4>
//                             <p className="text-gray-700">{medicine.storageInstructions}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'uses' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Therapeutic Uses</h3>
//                     {medicine.uses && medicine.uses.length > 0 ? (
//                       <ul className="space-y-3">
//                         {medicine.uses.map((use, index) => (
//                           <li key={index} className="flex items-start">
//                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
//                             <span className="text-gray-700">{use}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific uses listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Possible Side Effects</h3>
//                     {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                       <div className="bg-yellow-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.sideEffects.map((effect, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific side effects listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'precautions' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Safety Precautions</h3>
//                     {medicine.precautions && medicine.precautions.length > 0 ? (
//                       <div className="bg-red-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.precautions.map((precaution, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{precaution}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific precautions listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'instructions' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Usage Instructions</h3>
//                     {medicine.instructions && medicine.instructions.length > 0 ? (
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.instructions.map((instruction, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaUserMd className="text-green-600 mt=1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{instruction}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-700">Take as directed by your physician.</p>
//                     )}
//                     <div className="mt-6">
//                       <h4 className="font-bold text-gray-900 mb-2">Dosage</h4>
//                       <p className="text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Related Medicines */}
//             {relatedMedicines.length > 0 && (
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
//                   <Link 
//                     to={`/search?category=${medicine.category}`}
//                     className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium flex items-center"
//                   >
//                     View All
//                     <FaChevronRight className="ml-1" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {relatedMedicines.map(relatedMed => (
//                     <Link
//                       key={relatedMed._id}
//                       to={`/medicine/${relatedMed._id}`}
//                       className="group border border-gray-200 rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
//                     >
//                       <div className="flex">
//                         <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
//                           <img
//                             src={relatedMed.image}
//                             alt={relatedMed.name}
//                             className="max-h-16 max-w-16 object-contain"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 line-clamp-1">
//                             {relatedMed.name}
//                           </h3>
//                           <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs.{relatedMed.discountedPrice || relatedMed.price}
//                               </span>
//                               {relatedMed.discountedPrice && (
//                                 <span className="ml-2 text-sm text-gray-500 line-through">
//                                   Rs.{relatedMed.price}
//                                 </span>
//                               )}
//                             </div>
//                             <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)]" />
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Action Panel */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Pharmacy Selection */}
//               {isAggregatedView && availablePharmacies.length > 0 && (
//                 <div className="bg-white rounded-xl shadow-md p-5">
//                   <div className="flex items-center mb-4">
//                     <FaStore className="text-[var(--primary-color)] mr-2" />
//                     <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
//                     <span className="ml-auto text-sm text-gray-600">{availablePharmacies.length} options</span>
//                   </div>
//                   <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
//                     {availablePharmacies.map(pharmacy => (
//                       <button
//                         key={pharmacy._id}
//                         onClick={() => setSelectedPharmacy(pharmacy)}
//                         className={`w-full text-left p-4 rounded-lg border transition-all ${
//                           selectedPharmacy?._id === pharmacy._id
//                             ? 'border-[var(--primary-color)] bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
//                           <div className="flex items-center">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <span 
//                                 key={star} 
//                                 className={star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaMapMarkerAlt className="mr-2" />
//                             {pharmacy.city} • {pharmacy.distance}
//                           </div>
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaClock className="mr-2" />
//                             {pharmacy.deliveryTime}
//                           </div>
//                           <div className="flex items-center justify-between mt-3">
//                             <div className="flex items-center">
//                               <FaTag className="text-green-500 mr-2" />
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
//                               </span>
//                               {pharmacy.discountPercentage > 0 && (
//                                 <span className="ml-2 text-sm text-red-500">
//                                   ({pharmacy.discountPercentage}% OFF)
//                                 </span>
//                               )}
//                             </div>
//                             {selectedPharmacy?._id === pharmacy._id && (
//                               <FaCheckCircle className="text-green-500" />
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Order Summary */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                
//                 {/* Quantity Selector */}
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-gray-700">Quantity</span>
//                     <span className="text-sm text-gray-500">Max: 10 units</span>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       onClick={decrementQuantity}
//                       disabled={quantity <= 1}
//                       className="w-12 h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       <FaMinus />
//                     </button>
//                     <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-lg">
//                       {quantity}
//                     </div>
//                     <button
//                       onClick={incrementQuantity}
//                       disabled={quantity >= 10}
//                       className="w-12 h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       <FaPlus />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Price Breakdown */}
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Price ({quantity} units)</span>
//                     <span className="font-medium">Rs. {(finalPrice * quantity).toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Delivery</span>
//                     <span className="text-green-600 font-medium">FREE</span>
//                   </div>
//                   {medicine.discountPercentage > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Discount</span>
//                       <span className="text-red-600 font-medium">-Rs. {((medicine.price - finalPrice) * quantity).toFixed(2)}</span>
//                     </div>
//                   )}
//                   <div className="border-t pt-3">
//                     <div className="flex justify-between font-bold text-lg">
//                       <span>Total Amount</span>
//                       <span className="text-[var(--secondary-color)]">Rs. {(finalPrice * quantity).toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   {quantityInCart > 0 ? (
//                     <div className="space-y-3">
//                       <button
//                         onClick={addToCart}
//                         className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition-colors flex items-center justify-center"
//                       >
//                         <FaShoppingCart className="mr-2" />
//                         Add More to Cart
//                       </button>
//                       <div className="text-center text-sm text-gray-600">
//                         Already {quantityInCart} in cart
//                       </div>
//                       <button
//                         onClick={removeFromCart}
//                         className="w-full py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
//                       >
//                         <FaTrash className="mr-2" />
//                         Remove from Cart
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={addToCart}
//                       disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
//                       className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
//                         medicine.inStock && (!isAggregatedView || selectedPharmacy)
//                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       <FaShoppingCart className="mr-2" />
//                       {medicine.inStock 
//                         ? (isAggregatedView && !selectedPharmacy ? 'Select Pharmacy' : 'Add to Cart')
//                         : 'Out of Stock'
//                       }
//                     </button>
//                   )}
                  
//                   {medicine.prescriptionRequired && (
//                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                       <div className="flex items-start">
//                         <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
//                         <p className="text-sm text-yellow-800">
//                           This medicine requires a valid prescription. Upload prescription during checkout.
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <div className="flex items-center mb-4">
//                   <FaTruck className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900">Delivery Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <FaMapMarkerAlt className="text-gray-400 mr-3" />
//                     <div>
//                       <div className="font-medium">Deliver to</div>
//                       <div className="text-sm text-gray-600">Your current location</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <FaClock className="text-gray-400 mr-3" />
//                     <div>
//                       <div className="font-medium">Delivery Time</div>
//                       <div className="text-sm text-gray-600">30-45 minutes</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Need Help - Simplified */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <div className="flex items-center mb-4">
//                   <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900">Need Help?</h3>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-4">
//                   Our pharmacists are available 24/7 to answer your questions.
//                 </p>
//                 <a 
//                   href={`tel:${medicine.pharmacyPhone || '1800-123-4567'}`}
//                   className="flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors"
//                 >
//                   <FaPhoneAlt className="mr-2" />
//                   Call Pharmacy
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Safety Footer */}
//         <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-6">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center mb-4 md:mb-0">
//               <FaShieldAlt className="text-white text-2xl mr-4" />
//               <div>
//                 <h3 className="text-white font-bold text-lg">100% Safe & Secure</h3>
//                 <p className="text-white/90 text-sm">Your health is our priority</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-6">
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">10K+</div>
//                 <div className="text-white/80 text-sm">Happy Customers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">24/7</div>
//                 <div className="text-white/80 text-sm">Pharmacy Support</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">100%</div>
//                 <div className="text-white/80 text-sm">Authentic Medicines</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;




















// fixinggggggggggggggggggg
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { 
//   FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
//   FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
//   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
//   FaTruck, FaCheckCircle, FaShoppingBag,
//   FaMinus, FaPlus, FaTrash, FaHeart, FaShareAlt,
//   FaPrescriptionBottle, FaTemperatureLow, FaUserMd,
//   FaChevronRight
// } from 'react-icons/fa';

// const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('overview');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);
//   const [isAggregatedView, setIsAggregatedView] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check login status from localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const user = localStorage.getItem('user');
//     setIsLoggedIn(!!token && !!user);
//   }, []);

//   const requireLogin = (actionType) => {
//     if (!isLoggedIn) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: `/medicine/${id}`,
//           message: `Please login to ${actionType}` 
//         } 
//       });
//       return false;
//     }
//     return true;
//   };

//   // Share function
//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: medicine?.name,
//         text: `Check out ${medicine?.name} on Pharmacy App`,
//         url: window.location.href,
//       })
//       .catch(console.error);
//     } else {
//       // Fallback: Copy to clipboard
//       navigator.clipboard.writeText(window.location.href)
//         .then(() => alert('Link copied to clipboard!'))
//         .catch(console.error);
//     }
//   };

//   useEffect(() => {
//     const fetchMedicineDetails = async () => {
//       try {
//         setLoading(true);
//         const idParts = id.split('_');
        
//         if (idParts.length === 2) {
//           await fetchPharmacyMedicine(idParts[0], idParts[1]);
//         } else {
//           await fetchAggregatedMedicine(id);
//         }
//       } catch (err) {
//         console.error('Error fetching medicine:', err);
//         setError('Error loading medicine details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineData = data.data;
//         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
//           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
//           : 0;
        
//         const medicineDetails = {
//           _id: medicineId,
//           id: `${pharmacyId}_${medicineId}`,
//           name: medicineData.name,
//           genericName: medicineData.genericName,
//           description: medicineData.description,
//           detailedDescription: medicineData.detailedDescription || medicineData.description,
//           category: medicineData.category,
//           price: medicineData.price,
//           discountedPrice: medicineData.discountedPrice,
//           discountPercentage: discountPercentage,
//           dosage: medicineData.dosage || 'As prescribed',
//           strength: medicineData.strength,
//           form: medicineData.form,
//           manufacturer: medicineData.manufacturer,
//           image: medicineData.image,
//           prescriptionRequired: medicineData.prescriptionRequired || false,
//           inStock: medicineData.inStock !== false,
//           sideEffects: medicineData.sideEffects || [],
//           uses: medicineData.uses || [],
//           precautions: medicineData.precautions || [],
//           instructions: medicineData.instructions || [],
//           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//           pharmacyId: pharmacyId,
//           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
//           pharmacyAddress: medicineData.pharmacy?.address,
//           pharmacyCity: medicineData.pharmacy?.city,
//           pharmacyPhone: medicineData.pharmacy?.phone,
//           pharmacyRating: medicineData.pharmacy?.rating || 4.2,
//           availableAtPharmacies: [{
//             _id: pharmacyId,
//             name: medicineData.pharmacy?.name || 'Pharmacy',
//             city: medicineData.pharmacy?.city,
//             distance: medicineData.pharmacy?.distance || '2.5 km',
//             deliveryTime: '30-45 min',
//             rating: medicineData.pharmacy?.rating || 4.2
//           }]
//         };
        
//         setMedicine(medicineDetails);
//         setPharmacyId(pharmacyId);
//         setIsAggregatedView(false);
//         setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
//         if (medicineData.category) {
//           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
//         }
//       } else {
//         setError(data.message || 'Medicine not found');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacy medicine:', err);
//       setError('Error loading medicine details from pharmacy');
//     }
//   };

//   const fetchAggregatedMedicine = async (medicineName) => {
//     try {
//       const encodedName = encodeURIComponent(medicineName);
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineDetails = {
//           _id: medicineName,
//           id: medicineName,
//           name: data.data.medicine.name,
//           genericName: data.data.medicine.genericName,
//           description: data.data.medicine.description,
//           detailedDescription: data.data.medicine.detailedDescription,
//           category: data.data.medicine.category,
//           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
//           discountedPrice: data.data.stats?.lowestDiscountedPrice,
//           discountPercentage: 0,
//           dosage: data.data.medicine.dosage,
//           strength: data.data.medicine.strength,
//           form: data.data.medicine.form,
//           manufacturer: data.data.medicine.manufacturer,
//           image: data.data.medicine.image,
//           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
//           inStock: data.data.stats?.totalPharmacies > 0,
//           sideEffects: data.data.medicine.sideEffects || [],
//           uses: data.data.medicine.uses || [],
//           precautions: data.data.medicine.precautions || [],
//           instructions: data.data.medicine.instructions || [],
//           storageInstructions: data.data.medicine.storageInstructions,
//           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
//             _id: pharmacy.pharmacyId,
//             name: pharmacy.pharmacyName,
//             city: pharmacy.pharmacyCity,
//             distance: pharmacy.distance || '2.5 km',
//             deliveryTime: '30-45 min',
//             rating: pharmacy.rating || 4.0,
//             price: pharmacy.price,
//             discountedPrice: pharmacy.discountedPrice,
//             discountPercentage: pharmacy.discountPercentage || 0,
//             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
//           })) || [],
//           stats: data.data.stats
//         };
        
//         setMedicine(medicineDetails);
//         setIsAggregatedView(true);
        
//         if (data.data.availableAt?.length > 0) {
//           setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
//         }
        
//         if (data.data.medicine.category) {
//           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
//         }
//       } else {
//         setError('Medicine not found in aggregated data');
//       }
//     } catch (err) {
//       console.error('Error fetching aggregated medicine:', err);
//       setError('Error loading aggregated medicine details');
//     }
//   };

//   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med._id !== excludeMedicineId)
//           .slice(0, 4)
//           .map(med => ({
//             _id: `${pharmacyId}_${med._id}`,
//             name: med.name,
//             description: med.description,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountedPrice && med.price > 0
//               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
//               : 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.2
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related pharmacy medicines:', err);
//     }
//   };

//   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med.name !== excludeMedicineName)
//           .slice(0, 4)
//           .map(med => ({
//             _id: med.name,
//             name: med.name,
//             description: med.description,
//             price: med.lowestPrice || med.price || 0,
//             discountedPrice: med.lowestDiscountedPrice,
//             discountPercentage: 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.0
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related aggregated medicines:', err);
//     }
//   };

//   const quantityInCart = medicine ? 
//     cart.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
//     : 0;

//   const addToCart = () => {
//     if (!requireLogin('add to cart')) return;
    
//     if (!medicine || !selectedPharmacy) return;
    
//     const cartItem = {
//       ...medicine,
//       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
//       quantity: quantity,
//       selectedPharmacy: selectedPharmacy,
//       pharmacyTag: medicine.pharmacyName || selectedPharmacy.name
//     };
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === cartItem.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === cartItem.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prevCart, cartItem];
//     });
//   };

//   const removeFromCart = () => {
//     if (!medicine || !selectedPharmacy) return;
//     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
//     setCart(prevCart => prevCart.filter(item => item.id !== itemId));
//   };

//   const incrementQuantity = () => quantity < 10 && setQuantity(prev => prev + 1);
//   const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

//   const toggleFavorite = () => {
//     if (!requireLogin('add to wishlist')) return;
    
//     if (!medicine) return;
//     setIsFavorite(!isFavorite);
//     // In real app, you would update favorites state here
//   };

//   const calculateFinalPrice = () => {
//     if (!medicine) return 0;
//     if (medicine.discountedPrice) return medicine.discountedPrice;
//     if (medicine.discountPercentage > 0) {
//       return medicine.price * (1 - medicine.discountPercentage / 100);
//     }
//     return medicine.price;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="h-96 bg-gray-200 rounded-xl"></div>
//                 <div className="h-64 bg-gray-200 rounded-xl"></div>
//               </div>
//               <div className="space-y-6">
//                 <div className="h-32 bg-gray-200 rounded-xl"></div>
//                 <div className="h-48 bg-gray-200 rounded-xl"></div>
//                 <div className="h-24 bg-gray-200 rounded-xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !medicine) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
//             <FaExclamationTriangle className="w-10 h-10 text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
//           <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
//           <button 
//             onClick={() => navigate(-1)}
//             className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
//           >
//             <FaArrowLeft className="mr-2" />
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const finalPrice = calculateFinalPrice();
//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   const availablePharmacies = medicine.availableAtPharmacies || [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
//             >
//               <FaArrowLeft className="mr-2" />
//               Back
//             </button>
            
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={toggleFavorite}
//                 className="p-2 text-gray-600 hover:text-red-500 transition-colors"
//               >
//                 <FaHeart className={isFavorite ? "text-red-500" : ""} />
//               </button>
//               <button 
//                 onClick={handleShare}
//                 className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors"
//               >
//                 <FaShareAlt />
//               </button>
//               <Link
//                 to="/booking"
//                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
//                   cart.length === 0 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                 }`}
//               >
//                 <FaShoppingCart className="mr-2" />
//                 Checkout ({cart.length})
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-600 mb-6">
//           <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <span className="text-gray-400">{medicine.category}</span>
//           <FaChevronRight className="mx-2" size={10} />
//           <span className="font-medium text-gray-900">{medicine.name}</span>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Column - Product Info */}
//           <div className="lg:col-span-2">
//             {/* Product Card */}
//             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Product Image - Fixed size with scroll */}
//                 <div className="flex flex-col">
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-64 overflow-hidden">
//                       <div className="w-full h-full flex items-center justify-center">
//                         <img
//                           src={medicine.image}
//                           alt={medicine.name}
//                           className="max-h-52 max-w-full object-contain"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                           }}
//                         />
//                       </div>
//                     </div>
//                     {/* Discount badge - moved below image */}
//                     {isDiscounted && (
//                       <div className="mt-4">
//                         <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
//                           Save {medicine.discountPercentage}%
//                         </span>
//                       </div>
//                     )}
//                     {/* Pharmacy tag - moved to below the image */}
//                     <div className="mt-2">
//                       <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                         {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Product Details */}
//                 <div>
//                   <div className="mb-4">
//                     <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
//                     {medicine.genericName && (
//                       <p className="text-gray-600">
//                         <span className="font-medium">Generic:</span> {medicine.genericName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Price Section */}
//                   <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//                     <div className="flex items-end mb-2">
//                       <span className="text-3xl font-bold text-[var(--secondary-color)]">
//                         Rs. {finalPrice.toFixed(2)}
//                       </span>
//                       {isDiscounted && medicine.price > finalPrice && (
//                         <span className="ml-3 text-lg text-gray-500 line-through">
//                           Rs. {medicine.price.toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600">Inclusive of all taxes</p>
//                   </div>

//                   {/* Key Features */}
//                   <div className="grid grid-cols-2 gap-3 mb-6">
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaCapsules className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Form</div>
//                         <div className="font-medium">{medicine.form}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaIndustry className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Manufacturer</div>
//                         <div className="font-medium">{medicine.manufacturer || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaPills className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Strength</div>
//                         <div className="font-medium">{medicine.strength || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaPrescriptionBottle className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Prescription</div>
//                         <div className={`font-medium ${medicine.prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
//                           {medicine.prescriptionRequired ? 'Required' : 'Not Required'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stock Status */}
//                   <div className={`mb-6 p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
//                     <div className="flex items-center">
//                       {medicine.inStock ? (
//                         <>
//                           <FaCheckCircle className="text-green-500 mr-3" />
//                           <div>
//                             <div className="font-medium text-green-700">In Stock</div>
//                             <div className="text-sm text-green-600">Available for delivery</div>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <FaExclamationTriangle className="text-red-500 mr-3" />
//                           <div>
//                             <div className="font-medium text-red-700">Out of Stock</div>
//                             <div className="text-sm text-red-600">Check nearby pharmacies</div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs Section - Fixed height with scroll */}
//             <div className="bg-white rounded-xl shadow-md mb-6">
//               {/* Tab Navigation */}
//               <div className="border-b">
//                 <div className="flex overflow-x-auto">
//                   {[
//                     { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
//                     { id: 'uses', label: 'Uses', icon: <FaPills /> },
//                     { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
//                     { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
//                     { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
//                   ].map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveSection(tab.id)}
//                       className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
//                         activeSection === tab.id
//                           ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
//                           : 'border-transparent text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       <span className="mr-2">{tab.icon}</span>
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Tab Content - Fixed height with scroll */}
//               <div className="p-6 max-h-[400px] overflow-y-auto">
//                 {activeSection === 'overview' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
//                       <p className="text-gray-700 leading-relaxed">
//                         {medicine.detailedDescription || medicine.description}
//                       </p>
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div className="bg-blue-50 p-4 rounded-lg">
//                         <div className="flex items-start">
//                           <FaTemperatureLow className="text-blue-500 mt-1 mr-3" />
//                           <div>
//                             <h4 className="font-bold text-gray-900 mb-1">Storage Instructions</h4>
//                             <p className="text-gray-700">{medicine.storageInstructions}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'uses' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Therapeutic Uses</h3>
//                     {medicine.uses && medicine.uses.length > 0 ? (
//                       <ul className="space-y-3">
//                         {medicine.uses.map((use, index) => (
//                           <li key={index} className="flex items-start">
//                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
//                             <span className="text-gray-700">{use}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific uses listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Possible Side Effects</h3>
//                     {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                       <div className="bg-yellow-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.sideEffects.map((effect, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific side effects listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'precautions' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Safety Precautions</h3>
//                     {medicine.precautions && medicine.precautions.length > 0 ? (
//                       <div className="bg-red-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.precautions.map((precaution, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{precaution}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific precautions listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'instructions' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Usage Instructions</h3>
//                     {medicine.instructions && medicine.instructions.length > 0 ? (
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.instructions.map((instruction, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{instruction}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-700">Take as directed by your physician.</p>
//                     )}
//                     <div className="mt-6">
//                       <h4 className="font-bold text-gray-900 mb-2">Dosage</h4>
//                       <p className="text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Related Medicines */}
//             {relatedMedicines.length > 0 && (
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
//                   <Link 
//                     to={`/search?category=${medicine.category}`}
//                     className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium flex items-center"
//                   >
//                     View All
//                     <FaChevronRight className="ml-1" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {relatedMedicines.map(relatedMed => (
//                     <Link
//                       key={relatedMed._id}
//                       to={`/medicine/${relatedMed._id}`}
//                       className="group border border-gray-200 rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
//                     >
//                       <div className="flex">
//                         <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
//                           <img
//                             src={relatedMed.image}
//                             alt={relatedMed.name}
//                             className="max-h-16 max-w-16 object-contain"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 line-clamp-1">
//                             {relatedMed.name}
//                           </h3>
//                           <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs.{relatedMed.discountedPrice || relatedMed.price}
//                               </span>
//                               {relatedMed.discountedPrice && (
//                                 <span className="ml-2 text-sm text-gray-500 line-through">
//                                   Rs.{relatedMed.price}
//                                 </span>
//                               )}
//                             </div>
//                             <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)]" />
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Action Panel */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Pharmacy Selection */}
//               {isAggregatedView && availablePharmacies.length > 0 && (
//                 <div className="bg-white rounded-xl shadow-md p-5">
//                   <div className="flex items-center mb-4">
//                     <FaStore className="text-[var(--primary-color)] mr-2" />
//                     <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
//                     <span className="ml-auto text-sm text-gray-600">{availablePharmacies.length} options</span>
//                   </div>
//                   <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
//                     {availablePharmacies.map(pharmacy => (
//                       <button
//                         key={pharmacy._id}
//                         onClick={() => setSelectedPharmacy(pharmacy)}
//                         className={`w-full text-left p-4 rounded-lg border transition-all ${
//                           selectedPharmacy?._id === pharmacy._id
//                             ? 'border-[var(--primary-color)] bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
//                           <div className="flex items-center">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <span 
//                                 key={star} 
//                                 className={star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaMapMarkerAlt className="mr-2" />
//                             {pharmacy.city} • {pharmacy.distance}
//                           </div>
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaClock className="mr-2" />
//                             {pharmacy.deliveryTime}
//                           </div>
//                           <div className="flex items-center justify-between mt-3">
//                             <div className="flex items-center">
//                               <FaTag className="text-green-500 mr-2" />
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
//                               </span>
//                               {pharmacy.discountPercentage > 0 && (
//                                 <span className="ml-2 text-sm text-red-500">
//                                   ({pharmacy.discountPercentage}% OFF)
//                                 </span>
//                               )}
//                             </div>
//                             {selectedPharmacy?._id === pharmacy._id && (
//                               <FaCheckCircle className="text-green-500" />
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Order Summary */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                
//                 {/* Quantity Selector */}
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-gray-700">Quantity</span>
//                     <span className="text-sm text-gray-500">Max: 10 units</span>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       onClick={decrementQuantity}
//                       disabled={quantity <= 1}
//                       className="w-12 h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       <FaMinus />
//                     </button>
//                     <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-lg">
//                       {quantity}
//                     </div>
//                     <button
//                       onClick={incrementQuantity}
//                       disabled={quantity >= 10}
//                       className="w-12 h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       <FaPlus />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Price Breakdown */}
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Price ({quantity} units)</span>
//                     <span className="font-medium">Rs. {(finalPrice * quantity).toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Delivery</span>
//                     <span className="text-green-600 font-medium">FREE</span>
//                   </div>
//                   {medicine.discountPercentage > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Discount</span>
//                       <span className="text-red-600 font-medium">-Rs. {((medicine.price - finalPrice) * quantity).toFixed(2)}</span>
//                     </div>
//                   )}
//                   <div className="border-t pt-3">
//                     <div className="flex justify-between font-bold text-lg">
//                       <span>Total Amount</span>
//                       <span className="text-[var(--secondary-color)]">Rs. {(finalPrice * quantity).toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   {quantityInCart > 0 ? (
//                     <div className="space-y-3">
//                       <button
//                         onClick={addToCart}
//                         className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition-colors flex items-center justify-center"
//                       >
//                         <FaShoppingCart className="mr-2" />
//                         Add More to Cart
//                       </button>
//                       <div className="text-center text-sm text-gray-600">
//                         Already {quantityInCart} in cart
//                       </div>
//                       <button
//                         onClick={removeFromCart}
//                         className="w-full py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
//                       >
//                         <FaTrash className="mr-2" />
//                         Remove from Cart
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={addToCart}
//                       disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
//                       className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
//                         medicine.inStock && (!isAggregatedView || selectedPharmacy)
//                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       <FaShoppingCart className="mr-2" />
//                       {medicine.inStock 
//                         ? (isAggregatedView && !selectedPharmacy ? 'Select Pharmacy' : 'Add to Cart')
//                         : 'Out of Stock'
//                       }
//                     </button>
//                   )}
                  
//                   {medicine.prescriptionRequired && (
//                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                       <div className="flex items-start">
//                         <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
//                         <p className="text-sm text-yellow-800">
//                           This medicine requires a valid prescription. Upload prescription during checkout.
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Delivery Info - Removed "Deliver to" section */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <div className="flex items-center mb-4">
//                   <FaTruck className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900">Delivery Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <FaClock className="text-gray-400 mr-3" />
//                     <div>
//                       <div className="font-medium">Delivery Time</div>
//                       <div className="text-sm text-gray-600">30-45 minutes</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Need Help - Simplified */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <div className="flex items-center mb-4">
//                   <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900">Need Help?</h3>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-4">
//                   Our pharmacists are available 24/7 to answer your questions.
//                 </p>
//                 <a 
//                   href={`tel:${medicine.pharmacyPhone || '1800-123-4567'}`}
//                   className="flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors"
//                 >
//                   <FaPhoneAlt className="mr-2" />
//                   Call Pharmacy
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Safety Footer */}
//         <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-6">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center mb-4 md:mb-0">
//               <FaShieldAlt className="text-white text-2xl mr-4" />
//               <div>
//                 <h3 className="text-white font-bold text-lg">100% Safe & Secure</h3>
//                 <p className="text-white/90 text-sm">Your health is our priority</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-6">
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">10K+</div>
//                 <div className="text-white/80 text-sm">Happy Customers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">24/7</div>
//                 <div className="text-white/80 text-sm">Pharmacy Support</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">100%</div>
//                 <div className="text-white/80 text-sm">Authentic Medicines</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;













//------------- Login attached but not correct------------
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { 
//   FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
//   FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
//   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
//   FaTruck, FaCheckCircle, FaShoppingBag,
//   FaMinus, FaPlus, FaTrash, FaHeart, FaShareAlt,
//   FaPrescriptionBottle, FaTemperatureLow, FaUserMd,
//   FaChevronRight, FaChevronLeft, FaTimes, FaExclamationCircle,
//   FaCheck, FaInfo
// } from 'react-icons/fa';

// const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('overview');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);
//   const [isAggregatedView, setIsAggregatedView] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
  
//   // Modal states
//   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
//   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
//   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Check login status from localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const user = localStorage.getItem('user');
//     setIsLoggedIn(!!token && !!user);
//   }, []);

//   const requireLogin = (actionType) => {
//     if (!isLoggedIn) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: `/medicine/${id}`,
//           message: `Please login to ${actionType}` 
//         } 
//       });
//       return false;
//     }
//     return true;
//   };

//   // Fix: Checkout button logic - show modal instead of alert
//   const handleCheckout = () => {
//     if (cart.length === 0) {
//       setShowEmptyCartModal(true);
//       return;
//     }
    
//     if (!isLoggedIn) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: '/booking',
//           message: 'Please login to proceed to checkout' 
//         } 
//       });
//       return;
//     }
    
//     navigate('/booking');
//   };

//   // Fix: Add to cart button logic - prevent adding without login
//   const addToCart = () => {
//     if (!isLoggedIn) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: `/medicine/${id}`,
//           message: 'Please login to add items to cart' 
//         } 
//       });
//       return;
//     }
    
//     if (!medicine || !selectedPharmacy) return;
    
//     const cartItem = {
//       ...medicine,
//       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
//       quantity: quantity,
//       selectedPharmacy: selectedPharmacy,
//       pharmacyTag: medicine.pharmacyName || selectedPharmacy.name
//     };
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === cartItem.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === cartItem.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prevCart, cartItem];
//     });
    
//     // Show success modal
//     setSuccessMessage(`${quantity} ${medicine.name} added to cart successfully!`);
//     setShowSuccessModal(true);
//   };

//   // Fix: Call Pharmacy button logic - show modal instead of alert
//   const handleCallPharmacy = () => {
//     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
//     setShowCallPharmacyModal(true);
//   };

//   // Actual call function after confirmation
//   const confirmCallPharmacy = () => {
//     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
//     window.location.href = `tel:${phoneNumber}`;
//     setShowCallPharmacyModal(false);
//   };

//   // Share function with modal confirmation
//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: medicine?.name,
//         text: `Check out ${medicine?.name} on Pharmacy App`,
//         url: window.location.href,
//       })
//       .catch(console.error);
//     } else {
//       // Fallback: Copy to clipboard
//       navigator.clipboard.writeText(window.location.href)
//         .then(() => {
//           setShowLinkCopiedModal(true);
//           setTimeout(() => setShowLinkCopiedModal(false), 2000);
//         })
//         .catch(console.error);
//     }
//   };

//   // Close all modals
//   const closeAllModals = () => {
//     setShowEmptyCartModal(false);
//     setShowCallPharmacyModal(false);
//     setShowLinkCopiedModal(false);
//     setShowSuccessModal(false);
//   };

//   // Modal components

// const EmptyCartModal = () => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//     {/* Blur background overlay */}
//     <div 
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//       onClick={() => setShowEmptyCartModal(false)}
//     />
    
//     <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
//       <div className="p-6">
//         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
//           <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
//         </div>
//         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
//         <p className="text-gray-600 text-center mb-6">
//           You need to add items to your cart before proceeding to checkout.
//         </p>
//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowEmptyCartModal(false)}
//             className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => {
//               setShowEmptyCartModal(false);
//               navigate('/medicines');
//             }}
//             className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
//           >
//             Browse Medicines
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const CallPharmacyModal = () => {
//   const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
  
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Blur background overlay */}
//       <div 
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={() => setShowCallPharmacyModal(false)}
//       />
      
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
//         <div className="p-6">
//           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
//             <FaPhoneAlt className="w-8 h-8 text-blue-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
//           <p className="text-gray-600 text-center mb-4">
//             Do you want to call this pharmacy?
//           </p>
//           <div className="bg-blue-50 rounded-lg p-4 mb-6">
//             <div className="flex items-center justify-center">
//               <FaPhoneAlt className="text-blue-500 mr-3" />
//               <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
//             </div>
//             <p className="text-sm text-gray-500 text-center mt-2">
//               {selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={() => setShowCallPharmacyModal(false)}
//               className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmCallPharmacy}
//               className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center"
//             >
//               <FaPhoneAlt className="mr-2" />
//               Call Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LinkCopiedModal = () => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//     {/* Blur background overlay */}
//     <div 
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//       onClick={() => setShowLinkCopiedModal(false)}
//     />
    
//     <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
//       <div className="p-6">
//         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
//           <FaCheck className="w-8 h-8 text-green-500" />
//         </div>
//         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
//         <p className="text-gray-600 text-center">
//           Medicine link has been copied to clipboard.
//         </p>
//       </div>
//     </div>
//   </div>
// );

// const SuccessModal = () => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//     {/* Blur background overlay */}
//     <div 
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//       onClick={() => setShowSuccessModal(false)}
//     />
    
//     <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
//       <div className="p-6">
//         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
//           <FaCheck className="w-8 h-8 text-green-500" />
//         </div>
//         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
//         <p className="text-gray-600 text-center mb-6">
//           {successMessage}
//         </p>
//         <button
//           onClick={() => setShowSuccessModal(false)}
//           className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   </div>
// );



//   useEffect(() => {
//     const fetchMedicineDetails = async () => {
//       try {
//         setLoading(true);
//         const idParts = id.split('_');
        
//         if (idParts.length === 2) {
//           await fetchPharmacyMedicine(idParts[0], idParts[1]);
//         } else {
//           await fetchAggregatedMedicine(id);
//         }
//       } catch (err) {
//         console.error('Error fetching medicine:', err);
//         setError('Error loading medicine details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineData = data.data;
//         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
//           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
//           : 0;
        
//         const medicineDetails = {
//           _id: medicineId,
//           id: `${pharmacyId}_${medicineId}`,
//           name: medicineData.name,
//           genericName: medicineData.genericName,
//           description: medicineData.description,
//           detailedDescription: medicineData.detailedDescription || medicineData.description,
//           category: medicineData.category,
//           price: medicineData.price,
//           discountedPrice: medicineData.discountedPrice,
//           discountPercentage: discountPercentage,
//           dosage: medicineData.dosage || 'As prescribed',
//           strength: medicineData.strength,
//           form: medicineData.form,
//           manufacturer: medicineData.manufacturer,
//           image: medicineData.image,
//           prescriptionRequired: medicineData.prescriptionRequired || false,
//           inStock: medicineData.inStock !== false,
//           sideEffects: medicineData.sideEffects || [],
//           uses: medicineData.uses || [],
//           precautions: medicineData.precautions || [],
//           instructions: medicineData.instructions || [],
//           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//           pharmacyId: pharmacyId,
//           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
//           pharmacyAddress: medicineData.pharmacy?.address,
//           pharmacyCity: medicineData.pharmacy?.city,
//           pharmacyPhone: medicineData.pharmacy?.phone,
//           pharmacyRating: medicineData.pharmacy?.rating || 4.2,
//           pharmacyDeliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
//           availableAtPharmacies: [{
//             _id: pharmacyId,
//             name: medicineData.pharmacy?.name || 'Pharmacy',
//             city: medicineData.pharmacy?.city,
//             distance: medicineData.pharmacy?.distance || '2.5 km',
//             deliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
//             rating: medicineData.pharmacy?.rating || 4.2
//           }]
//         };
        
//         setMedicine(medicineDetails);
//         setPharmacyId(pharmacyId);
//         setIsAggregatedView(false);
//         setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
//         if (medicineData.category) {
//           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
//         }
//       } else {
//         setError(data.message || 'Medicine not found');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacy medicine:', err);
//       setError('Error loading medicine details from pharmacy');
//     }
//   };

//   const fetchAggregatedMedicine = async (medicineName) => {
//     try {
//       const encodedName = encodeURIComponent(medicineName);
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineDetails = {
//           _id: medicineName,
//           id: medicineName,
//           name: data.data.medicine.name,
//           genericName: data.data.medicine.genericName,
//           description: data.data.medicine.description,
//           detailedDescription: data.data.medicine.detailedDescription,
//           category: data.data.medicine.category,
//           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
//           discountedPrice: data.data.stats?.lowestDiscountedPrice,
//           discountPercentage: 0,
//           dosage: data.data.medicine.dosage,
//           strength: data.data.medicine.strength,
//           form: data.data.medicine.form,
//           manufacturer: data.data.medicine.manufacturer,
//           image: data.data.medicine.image,
//           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
//           inStock: data.data.stats?.totalPharmacies > 0,
//           sideEffects: data.data.medicine.sideEffects || [],
//           uses: data.data.medicine.uses || [],
//           precautions: data.data.medicine.precautions || [],
//           instructions: data.data.medicine.instructions || [],
//           storageInstructions: data.data.medicine.storageInstructions,
//           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
//             _id: pharmacy.pharmacyId,
//             name: pharmacy.pharmacyName,
//             city: pharmacy.pharmacyCity,
//             distance: pharmacy.distance || '2.5 km',
//             deliveryTime: pharmacy.deliveryTime || '30-45 min',
//             rating: pharmacy.rating || 4.0,
//             price: pharmacy.price,
//             discountedPrice: pharmacy.discountedPrice,
//             discountPercentage: pharmacy.discountPercentage || 0,
//             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
//           })) || [],
//           stats: data.data.stats
//         };
        
//         setMedicine(medicineDetails);
//         setIsAggregatedView(true);
        
//         if (data.data.availableAt?.length > 0) {
//           setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
//         }
        
//         if (data.data.medicine.category) {
//           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
//         }
//       } else {
//         setError('Medicine not found in aggregated data');
//       }
//     } catch (err) {
//       console.error('Error fetching aggregated medicine:', err);
//       setError('Error loading aggregated medicine details');
//     }
//   };

//   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med._id !== excludeMedicineId)
//           .map(med => ({
//             _id: `${pharmacyId}_${med._id}`,
//             name: med.name,
//             description: med.description,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountedPrice && med.price > 0
//               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
//               : 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.2
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related pharmacy medicines:', err);
//     }
//   };

//   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med.name !== excludeMedicineName)
//           .map(med => ({
//             _id: med.name,
//             name: med.name,
//             description: med.description,
//             price: med.lowestPrice || med.price || 0,
//             discountedPrice: med.lowestDiscountedPrice,
//             discountPercentage: 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.0
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related aggregated medicines:', err);
//     }
//   };

//   // Fix: Related medicines navigation
//   const nextRelated = () => {
//     if (relatedMedicines.length <= 2) return;
//     setCurrentRelatedIndex(prev => 
//       prev + 2 >= relatedMedicines.length ? 0 : prev + 2
//     );
//   };

//   const prevRelated = () => {
//     if (relatedMedicines.length <= 2) return;
//     setCurrentRelatedIndex(prev => 
//       prev - 2 < 0 ? Math.max(0, relatedMedicines.length - 2) : prev - 2
//     );
//   };

//   const quantityInCart = medicine ? 
//     cart.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
//     : 0;

//   const removeFromCart = () => {
//     if (!medicine || !selectedPharmacy) return;
//     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
//     setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    
//     // Show success modal for removal
//     setSuccessMessage(`${medicine.name} removed from cart`);
//     setShowSuccessModal(true);
//   };

//   const incrementQuantity = () => quantity < 10 && setQuantity(prev => prev + 1);
//   const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

//   const toggleFavorite = () => {
//     if (!requireLogin('add to wishlist')) return;
    
//     if (!medicine) return;
//     setIsFavorite(!isFavorite);
    
//     // Show success modal for wishlist
//     setSuccessMessage(!isFavorite 
//       ? 'Added to wishlist' 
//       : 'Removed from wishlist'
//     );
//     setShowSuccessModal(true);
//   };

//   const calculateFinalPrice = () => {
//     if (!medicine) return 0;
//     if (medicine.discountedPrice) return medicine.discountedPrice;
//     if (medicine.discountPercentage > 0) {
//       return medicine.price * (1 - medicine.discountPercentage / 100);
//     }
//     return medicine.price;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="h-96 bg-gray-200 rounded-xl"></div>
//                 <div className="h-64 bg-gray-200 rounded-xl"></div>
//               </div>
//               <div className="space-y-6">
//                 <div className="h-32 bg-gray-200 rounded-xl"></div>
//                 <div className="h-48 bg-gray-200 rounded-xl"></div>
//                 <div className="h-24 bg-gray-200 rounded-xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !medicine) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
//             <FaExclamationTriangle className="w-10 h-10 text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
//           <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
//           <button 
//             onClick={() => navigate(-1)}
//             className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
//           >
//             <FaArrowLeft className="mr-2" />
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const finalPrice = calculateFinalPrice();
//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   const availablePharmacies = medicine.availableAtPharmacies || [];
//   const visibleRelatedMedicines = relatedMedicines.slice(currentRelatedIndex, currentRelatedIndex + 2);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Modals */}
//       {showEmptyCartModal && <EmptyCartModal />}
//       {showCallPharmacyModal && <CallPharmacyModal />}
//       {showLinkCopiedModal && <LinkCopiedModal />}
//       {showSuccessModal && <SuccessModal />}

//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
//             >
//               <FaArrowLeft className="mr-2" />
//               Back
//             </button>
            
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={toggleFavorite}
//                 className="p-2 text-gray-600 hover:text-red-500 transition-colors"
//               >
//                 <FaHeart className={isFavorite ? "text-red-500 fill-red-500" : ""} />
//               </button>
//               <button 
//                 onClick={handleShare}
//                 className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors"
//               >
//                 <FaShareAlt />
//               </button>
//               <button
//                 onClick={handleCheckout}
//                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
//                   cart.length === 0 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                 }`}
//               >
//                 <FaShoppingCart className="mr-2" />
//                 Checkout ({cart.length})
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-600 mb-6">
//           <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <span className="font-medium text-gray-900">{medicine.name}</span>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Column - Product Info */}
//           <div className="lg:col-span-2">
//             {/* Product Card */}
//             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Product Image */}
//                 <div className="flex flex-col">
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-64 overflow-hidden">
//                       <div className="w-full h-full flex items-center justify-center">
//                         <img
//                           src={medicine.image}
//                           alt={medicine.name}
//                           className="max-h-52 max-w-full object-contain"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                           }}
//                         />
//                         {/* Fix: Save % badge on top-left of image */}
//                         {isDiscounted && (
//                           <div className="absolute top-0 left-0">
//                             <span className="bg-red-500 text-white px-3 py-1 rounded-br-lg rounded-tl-xl text-sm font-bold shadow-md">
//                               Save {medicine.discountPercentage}%
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     {/* Pharmacy tag */}
//                     <div className="mt-4">
//                       <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                         {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Product Details */}
//                 <div>
//                   <div className="mb-4">
//                     <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
//                     {medicine.genericName && (
//                       <p className="text-gray-600">
//                         <span className="font-medium">Generic:</span> {medicine.genericName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Price Section */}
//                   <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//                     <div className="flex items-end mb-2">
//                       <span className="text-3xl font-bold text-[var(--secondary-color)]">
//                         Rs. {finalPrice.toFixed(2)}
//                       </span>
//                       {isDiscounted && medicine.price > finalPrice && (
//                         <span className="ml-3 text-lg text-gray-500 line-through">
//                           Rs. {medicine.price.toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600">Inclusive of all taxes</p>
//                   </div>

//                   {/* Key Features */}
//                   <div className="grid grid-cols-2 gap-3 mb-6">
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaCapsules className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Form</div>
//                         <div className="font-medium">{medicine.form}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaIndustry className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Manufacturer</div>
//                         <div className="font-medium">{medicine.manufacturer || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaPills className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Strength</div>
//                         <div className="font-medium">{medicine.strength || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <FaPrescriptionBottle className="text-[var(--primary-color)] mr-3" />
//                       <div>
//                         <div className="text-sm text-gray-600">Prescription</div>
//                         <div className={`font-medium ${medicine.prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
//                           {medicine.prescriptionRequired ? 'Required' : 'Not Required'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stock Status */}
//                   <div className={`mb-6 p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
//                     <div className="flex items-center">
//                       {medicine.inStock ? (
//                         <>
//                           <FaCheckCircle className="text-green-500 mr-3" />
//                           <div>
//                             <div className="font-medium text-green-700">In Stock</div>
//                             <div className="text-sm text-green-600">Available for delivery</div>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <FaExclamationTriangle className="text-red-500 mr-3" />
//                           <div>
//                             <div className="font-medium text-red-700">Out of Stock</div>
//                             <div className="text-sm text-red-600">Check nearby pharmacies</div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs Section */}
//             <div className="bg-white rounded-xl shadow-md mb-6">
//               {/* Tab Navigation */}
//               <div className="border-b">
//                 <div className="flex overflow-x-auto">
//                   {[
//                     { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
//                     { id: 'uses', label: 'Uses', icon: <FaPills /> },
//                     { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
//                     { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
//                     { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
//                   ].map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveSection(tab.id)}
//                       className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
//                         activeSection === tab.id
//                           ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
//                           : 'border-transparent text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       <span className="mr-2">{tab.icon}</span>
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Tab Content */}
//               <div className="p-6 max-h-[400px] overflow-y-auto">
//                 {activeSection === 'overview' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
//                       <p className="text-gray-700 leading-relaxed">
//                         {medicine.detailedDescription || medicine.description}
//                       </p>
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div className="bg-blue-50 p-4 rounded-lg">
//                         <div className="flex items-start">
//                           <FaTemperatureLow className="text-blue-500 mt-1 mr-3" />
//                           <div>
//                             <h4 className="font-bold text-gray-900 mb-1">Storage Instructions</h4>
//                             <p className="text-gray-700">{medicine.storageInstructions}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'uses' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Therapeutic Uses</h3>
//                     {medicine.uses && medicine.uses.length > 0 ? (
//                       <ul className="space-y-3">
//                         {medicine.uses.map((use, index) => (
//                           <li key={index} className="flex items-start">
//                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
//                             <span className="text-gray-700">{use}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific uses listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Possible Side Effects</h3>
//                     {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                       <div className="bg-yellow-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.sideEffects.map((effect, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific side effects listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'precautions' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Safety Precautions</h3>
//                     {medicine.precautions && medicine.precautions.length > 0 ? (
//                       <div className="bg-red-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.precautions.map((precaution, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{precaution}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 italic">No specific precautions listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'instructions' && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-gray-900">Usage Instructions</h3>
//                     {medicine.instructions && medicine.instructions.length > 0 ? (
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <ul className="space-y-3">
//                           {medicine.instructions.map((instruction, index) => (
//                             <li key={index} className="flex items-start">
//                               <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{instruction}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-gray-700">Take as directed by your physician.</p>
//                     )}
//                     <div className="mt-6">
//                       <h4 className="font-bold text-gray-900 mb-2">Dosage</h4>
//                       <p className="text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Related Medicines - Fixed with arrows */}
//             {relatedMedicines.length > 0 && (
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
//                   <div className="flex items-center space-x-2">
//                     <button 
//                       onClick={prevRelated}
//                       disabled={relatedMedicines.length <= 2}
//                       className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <FaChevronLeft />
//                     </button>
//                     <button 
//                       onClick={nextRelated}
//                       disabled={relatedMedicines.length <= 2}
//                       className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <FaChevronRight />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {visibleRelatedMedicines.map(relatedMed => (
//                     <Link
//                       key={relatedMed._id}
//                       to={`/medicine/${relatedMed._id}`}
//                       className="group border border-gray-200 rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
//                     >
//                       <div className="flex">
//                         <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
//                           <img
//                             src={relatedMed.image}
//                             alt={relatedMed.name}
//                             className="max-h-16 max-w-16 object-contain"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 line-clamp-1">
//                             {relatedMed.name}
//                           </h3>
//                           <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs.{relatedMed.discountedPrice || relatedMed.price}
//                               </span>
//                               {relatedMed.discountedPrice && (
//                                 <span className="ml-2 text-sm text-gray-500 line-through">
//                                   Rs.{relatedMed.price}
//                                 </span>
//                               )}
//                             </div>
//                             <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)]" />
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Action Panel */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Pharmacy Selection */}
//               {isAggregatedView && availablePharmacies.length > 0 && (
//                 <div className="bg-white rounded-xl shadow-md p-5">
//                   <div className="flex items-center mb-4">
//                     <FaStore className="text-[var(--primary-color)] mr-2" />
//                     <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
//                     <span className="ml-auto text-sm text-gray-600">{availablePharmacies.length} options</span>
//                   </div>
//                   <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
//                     {availablePharmacies.map(pharmacy => (
//                       <button
//                         key={pharmacy._id}
//                         onClick={() => setSelectedPharmacy(pharmacy)}
//                         className={`w-full text-left p-4 rounded-lg border transition-all ${
//                           selectedPharmacy?._id === pharmacy._id
//                             ? 'border-[var(--primary-color)] bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
//                           <div className="flex items-center">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <span 
//                                 key={star} 
//                                 className={star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaMapMarkerAlt className="mr-2" />
//                             {pharmacy.city} • {pharmacy.distance}
//                           </div>
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaClock className="mr-2" />
//                             {/*Dynamic delivery time from backend */}
//                             {pharmacy.deliveryTime}
//                           </div>
//                           <div className="flex items-center justify-between mt-3">
//                             <div className="flex items-center">
//                               <FaTag className="text-green-500 mr-2" />
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
//                               </span>
//                               {pharmacy.discountPercentage > 0 && (
//                                 <span className="ml-2 text-sm text-red-500">
//                                   ({pharmacy.discountPercentage}% OFF)
//                                 </span>
//                               )}
//                             </div>
//                             {selectedPharmacy?._id === pharmacy._id && (
//                               <FaCheckCircle className="text-green-500" />
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Order Summary */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                
//                 {/* Quantity Selector */}
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-gray-700">Quantity</span>
//                     <span className="text-sm text-gray-500">Max: 10 units</span>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       onClick={decrementQuantity}
//                       disabled={quantity <= 1}
//                       className="w-12 h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       <FaMinus />
//                     </button>
//                     <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-lg">
//                       {quantity}
//                     </div>
//                     <button
//                       onClick={incrementQuantity}
//                       disabled={quantity >= 10}
//                       className="w-12 h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       <FaPlus />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Price Breakdown */}
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Price ({quantity} units)</span>
//                     <span className="font-medium">Rs. {(finalPrice * quantity).toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Delivery</span>
//                     <span className="text-green-600 font-medium">FREE</span>
//                   </div>
//                   {medicine.discountPercentage > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Discount</span>
//                       <span className="text-red-600 font-medium">-Rs. {((medicine.price - finalPrice) * quantity).toFixed(2)}</span>
//                     </div>
//                   )}
//                   <div className="border-t pt-3">
//                     <div className="flex justify-between font-bold text-lg">
//                       <span>Total Amount</span>
//                       <span className="text-[var(--secondary-color)]">Rs. {(finalPrice * quantity).toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   {quantityInCart > 0 ? (
//                     <div className="space-y-3">
//                       <button
//                         onClick={addToCart}
//                         className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition-colors flex items-center justify-center"
//                       >
//                         <FaShoppingCart className="mr-2" />
//                         Add More to Cart
//                       </button>
//                       <div className="text-center text-sm text-gray-600">
//                         Already {quantityInCart} in cart
//                       </div>
//                       <button
//                         onClick={removeFromCart}
//                         className="w-full py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
//                       >
//                         <FaTrash className="mr-2" />
//                         Remove from Cart
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={addToCart}
//                       disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
//                       className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
//                         medicine.inStock && (!isAggregatedView || selectedPharmacy)
//                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       <FaShoppingCart className="mr-2" />
//                       {medicine.inStock 
//                         ? (isAggregatedView && !selectedPharmacy ? 'Select Pharmacy' : 'Add to Cart')
//                         : 'Out of Stock'
//                       }
//                     </button>
//                   )}
                  
//                   {medicine.prescriptionRequired && (
//                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                       <div className="flex items-start">
//                         <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
//                         <p className="text-sm text-yellow-800">
//                           This medicine requires a valid prescription. Upload prescription during checkout.
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <div className="flex items-center mb-4">
//                   <FaTruck className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900">Delivery Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <FaClock className="text-gray-400 mr-3" />
//                     <div>
//                       <div className="font-medium">Delivery Time</div>
//                       {/*Dynamic delivery time */}
//                       <div className="text-sm text-gray-600">
//                         {selectedPharmacy?.deliveryTime || medicine.pharmacyDeliveryTime || '30-45 minutes'}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Need Help */}
//               <div className="bg-white rounded-xl shadow-md p-5">
//                 <div className="flex items-center mb-4">
//                   <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900">Need Help?</h3>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-4">
//                   Our pharmacists are available 24/7 to answer your questions.
//                 </p>
//                 <button 
//                   onClick={handleCallPharmacy}
//                   className="w-full flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors"
//                 >
//                   <FaPhoneAlt className="mr-2" />
//                   Call Pharmacy
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Safety Footer */}
//         <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-6">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center mb-4 md:mb-0">
//               <FaShieldAlt className="text-white text-2xl mr-4" />
//               <div>
//                 <h3 className="text-white font-bold text-lg">100% Safe & Secure</h3>
//                 <p className="text-white/90 text-sm">Your health is our priority</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-6">
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">10K+</div>
//                 <div className="text-white/80 text-sm">Happy Customers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">24/7</div>
//                 <div className="text-white/80 text-sm">Pharmacy Support</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-xl">100%</div>
//                 <div className="text-white/80 text-sm">Authentic Medicines</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;









//-------------------Login corrected------------
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
  FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
  FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
  FaTruck, FaCheckCircle, FaShoppingBag,
  FaMinus, FaPlus, FaTrash, FaHeart, FaShareAlt,
  FaPrescriptionBottle, FaTemperatureLow, FaUserMd,
  FaChevronRight, FaChevronLeft, FaTimes, FaExclamationCircle,
  FaCheck, FaInfo, FaBan
} from 'react-icons/fa';

const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [isAggregatedView, setIsAggregatedView] = useState(false);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPharmacyUser, setIsPharmacyUser] = useState(false);
  const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
  
  // Modal states
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
  const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check login status from localStorage - same as pharmacy dashboard
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr);
          setIsLoggedIn(true);
          // Check if user is pharmacy (same logic as pharmacy dashboard)
          setIsPharmacyUser(user.role === 'pharmacy');
        } else {
          setIsLoggedIn(false);
          setIsPharmacyUser(false);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsLoggedIn(false);
        setIsPharmacyUser(false);
      }
    };

    checkAuth();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const requireLogin = (actionType) => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          redirectTo: `/medicine/${id}`,
          message: `Please login to ${actionType}` 
        } 
      });
      return false;
    }
    return true;
  };

  // Fix: Checkout button logic - show modal instead of alert
  const handleCheckout = () => {
    if (cart.length === 0) {
      setShowEmptyCartModal(true);
      return;
    }
    
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          redirectTo: '/booking',
          message: 'Please login to proceed to checkout' 
        } 
      });
      return;
    }
    
    // Check if pharmacy user trying to checkout
    if (isPharmacyUser) {
      setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
      setShowPharmacyErrorModal(true);
      return;
    }
    
    navigate('/booking');
  };

  // Fix: Add to cart button logic - prevent adding without login and check pharmacy role
  const addToCart = () => {
    // Direct check from localStorage (same as pharmacy dashboard)
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      navigate('/login', { 
        state: { 
          redirectTo: `/medicine/${id}`,
          message: 'Please login to add items to cart' 
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
          redirectTo: `/medicine/${id}`,
          message: 'Session expired. Please login again.' 
        } 
      });
      return;
    }

    // Check if pharmacy user (same logic as pharmacy dashboard)
    if (user && user.role === 'pharmacy') {
      setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
      setShowPharmacyErrorModal(true);
      return;
    }

    if (!medicine || !selectedPharmacy) return;
    
    const cartItem = {
      ...medicine,
      id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
      quantity: quantity,
      selectedPharmacy: selectedPharmacy,
      pharmacyTag: medicine.pharmacyName || selectedPharmacy.name
    };
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === cartItem.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, cartItem];
    });
    
    // Show success modal
    setSuccessMessage(`${quantity} ${medicine.name} added to cart successfully!`);
    setShowSuccessModal(true);
  };

  // Fix: Call Pharmacy button logic - show modal instead of alert
  const handleCallPharmacy = () => {
    const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    setShowCallPharmacyModal(true);
  };

  // Actual call function after confirmation
  const confirmCallPharmacy = () => {
    const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    window.location.href = `tel:${phoneNumber}`;
    setShowCallPharmacyModal(false);
  };

  // Share function with modal confirmation
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: medicine?.name,
        text: `Check out ${medicine?.name} on Pharmacy App`,
        url: window.location.href,
      })
      .catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setShowLinkCopiedModal(true);
          setTimeout(() => setShowLinkCopiedModal(false), 2000);
        })
        .catch(console.error);
    }
  };

  // Close all modals
  const closeAllModals = () => {
    setShowEmptyCartModal(false);
    setShowCallPharmacyModal(false);
    setShowLinkCopiedModal(false);
    setShowSuccessModal(false);
    setShowPharmacyErrorModal(false);
  };

  // Modal components

const EmptyCartModal = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setShowEmptyCartModal(false)}
    />
    
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
          <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
        <p className="text-gray-600 text-center mb-6">
          You need to add items to your cart before proceeding to checkout.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowEmptyCartModal(false)}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              setShowEmptyCartModal(false);
              navigate('/medicines');
            }}
            className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
          >
            Browse Medicines
          </button>
        </div>
      </div>
    </div>
  </div>
);

const CallPharmacyModal = () => {
  const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowCallPharmacyModal(false)}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
            <FaPhoneAlt className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
          <p className="text-gray-600 text-center mb-4">
            Do you want to call this pharmacy?
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center">
              <FaPhoneAlt className="text-blue-500 mr-3" />
              <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              {selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCallPharmacyModal(false)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmCallPharmacy}
              className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center"
            >
              <FaPhoneAlt className="mr-2" />
              Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkCopiedModal = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setShowLinkCopiedModal(false)}
    />
    
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
          <FaCheck className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
        <p className="text-gray-600 text-center">
          Medicine link has been copied to clipboard.
        </p>
      </div>
    </div>
  </div>
);

const SuccessModal = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setShowSuccessModal(false)}
    />
    
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
          <FaCheck className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
        <p className="text-gray-600 text-center mb-6">
          {successMessage}
        </p>
        <button
          onClick={() => setShowSuccessModal(false)}
          className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
);

const PharmacyErrorModal = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setShowPharmacyErrorModal(false)}
    />
    
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
          <FaExclamationTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
        <p className="text-gray-600 text-center mb-6">
          {successMessage}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPharmacyErrorModal(false)}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            OK
          </button>
          <button
            onClick={() => {
              setShowPharmacyErrorModal(false);
              navigate('/login');
            }}
            className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
          >
            Switch Account
          </button>
        </div>
      </div>
    </div>
  </div>
);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        setLoading(true);
        const idParts = id.split('_');
        
        if (idParts.length === 2) {
          await fetchPharmacyMedicine(idParts[0], idParts[1]);
        } else {
          await fetchAggregatedMedicine(id);
        }
      } catch (err) {
        console.error('Error fetching medicine:', err);
        setError('Error loading medicine details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMedicineDetails();
    }
  }, [id]);

  const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
      );
      const data = await response.json();
      
      if (data.success) {
        const medicineData = data.data;
        const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
          ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
          : 0;
        
        const medicineDetails = {
          _id: medicineId,
          id: `${pharmacyId}_${medicineId}`,
          name: medicineData.name,
          genericName: medicineData.genericName,
          description: medicineData.description,
          detailedDescription: medicineData.detailedDescription || medicineData.description,
          category: medicineData.category,
          price: medicineData.price,
          discountedPrice: medicineData.discountedPrice,
          discountPercentage: discountPercentage,
          dosage: medicineData.dosage || 'As prescribed',
          strength: medicineData.strength,
          form: medicineData.form,
          manufacturer: medicineData.manufacturer,
          image: medicineData.image,
          prescriptionRequired: medicineData.prescriptionRequired || false,
          inStock: medicineData.inStock !== false,
          sideEffects: medicineData.sideEffects || [],
          uses: medicineData.uses || [],
          precautions: medicineData.precautions || [],
          instructions: medicineData.instructions || [],
          storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
          pharmacyId: pharmacyId,
          pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
          pharmacyAddress: medicineData.pharmacy?.address,
          pharmacyCity: medicineData.pharmacy?.city,
          pharmacyPhone: medicineData.pharmacy?.phone,
          pharmacyRating: medicineData.pharmacy?.rating || 4.2,
          pharmacyDeliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
          availableAtPharmacies: [{
            _id: pharmacyId,
            name: medicineData.pharmacy?.name || 'Pharmacy',
            city: medicineData.pharmacy?.city,
            distance: medicineData.pharmacy?.distance || '2.5 km',
            deliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
            rating: medicineData.pharmacy?.rating || 4.2
          }]
        };
        
        setMedicine(medicineDetails);
        setPharmacyId(pharmacyId);
        setIsAggregatedView(false);
        setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
        if (medicineData.category) {
          fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
        }
      } else {
        setError(data.message || 'Medicine not found');
      }
    } catch (err) {
      console.error('Error fetching pharmacy medicine:', err);
      setError('Error loading medicine details from pharmacy');
    }
  };

  const fetchAggregatedMedicine = async (medicineName) => {
    try {
      const encodedName = encodeURIComponent(medicineName);
      const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
      const data = await response.json();
      
      if (data.success) {
        const medicineDetails = {
          _id: medicineName,
          id: medicineName,
          name: data.data.medicine.name,
          genericName: data.data.medicine.genericName,
          description: data.data.medicine.description,
          detailedDescription: data.data.medicine.detailedDescription,
          category: data.data.medicine.category,
          price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
          discountedPrice: data.data.stats?.lowestDiscountedPrice,
          discountPercentage: 0,
          dosage: data.data.medicine.dosage,
          strength: data.data.medicine.strength,
          form: data.data.medicine.form,
          manufacturer: data.data.medicine.manufacturer,
          image: data.data.medicine.image,
          prescriptionRequired: data.data.medicine.prescriptionRequired || false,
          inStock: data.data.stats?.totalPharmacies > 0,
          sideEffects: data.data.medicine.sideEffects || [],
          uses: data.data.medicine.uses || [],
          precautions: data.data.medicine.precautions || [],
          instructions: data.data.medicine.instructions || [],
          storageInstructions: data.data.medicine.storageInstructions,
          availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
            _id: pharmacy.pharmacyId,
            name: pharmacy.pharmacyName,
            city: pharmacy.pharmacyCity,
            distance: pharmacy.distance || '2.5 km',
            deliveryTime: pharmacy.deliveryTime || '30-45 min',
            rating: pharmacy.rating || 4.0,
            price: pharmacy.price,
            discountedPrice: pharmacy.discountedPrice,
            discountPercentage: pharmacy.discountPercentage || 0,
            uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
          })) || [],
          stats: data.data.stats
        };
        
        setMedicine(medicineDetails);
        setIsAggregatedView(true);
        
        if (data.data.availableAt?.length > 0) {
          setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        }
        
        if (data.data.medicine.category) {
          fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
        }
      } else {
        setError('Medicine not found in aggregated data');
      }
    } catch (err) {
      console.error('Error fetching aggregated medicine:', err);
      setError('Error loading aggregated medicine details');
    }
  };

  const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
      );
      const data = await response.json();
      
      if (data.success) {
        const filtered = data.data
          .filter(med => med._id !== excludeMedicineId)
          .map(med => ({
            _id: `${pharmacyId}_${med._id}`,
            name: med.name,
            description: med.description,
            price: med.price,
            discountedPrice: med.discountedPrice,
            discountPercentage: med.discountedPrice && med.price > 0
              ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
              : 0,
            image: med.image,
            category: med.category,
            rating: 4.2
          }));
        
        setRelatedMedicines(filtered);
      }
    } catch (err) {
      console.error('Error fetching related pharmacy medicines:', err);
    }
  };

  const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
      const data = await response.json();
      
      if (data.success) {
        const filtered = data.data
          .filter(med => med.name !== excludeMedicineName)
          .map(med => ({
            _id: med.name,
            name: med.name,
            description: med.description,
            price: med.lowestPrice || med.price || 0,
            discountedPrice: med.lowestDiscountedPrice,
            discountPercentage: 0,
            image: med.image,
            category: med.category,
            rating: 4.0
          }));
        
        setRelatedMedicines(filtered);
      }
    } catch (err) {
      console.error('Error fetching related aggregated medicines:', err);
    }
  };

  // Fix: Related medicines navigation
  const nextRelated = () => {
    if (relatedMedicines.length <= 2) return;
    setCurrentRelatedIndex(prev => 
      prev + 2 >= relatedMedicines.length ? 0 : prev + 2
    );
  };

  const prevRelated = () => {
    if (relatedMedicines.length <= 2) return;
    setCurrentRelatedIndex(prev => 
      prev - 2 < 0 ? Math.max(0, relatedMedicines.length - 2) : prev - 2
    );
  };

  const quantityInCart = medicine ? 
    cart.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
    : 0;

  const removeFromCart = () => {
    if (!medicine || !selectedPharmacy) return;
    const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    
    // Show success modal for removal
    setSuccessMessage(`${medicine.name} removed from cart`);
    setShowSuccessModal(true);
  };

  const incrementQuantity = () => quantity < 10 && setQuantity(prev => prev + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const toggleFavorite = () => {
    // Direct check from localStorage
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      navigate('/login', { 
        state: { 
          redirectTo: `/medicine/${id}`,
          message: 'Please login to add to wishlist' 
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
          redirectTo: `/medicine/${id}`,
          message: 'Session expired. Please login again.' 
        } 
      });
      return;
    }

    // Check if pharmacy user
    if (user && user.role === 'pharmacy') {
      setSuccessMessage('Pharmacy accounts cannot add to wishlist. Please use a regular customer account.');
      setShowPharmacyErrorModal(true);
      return;
    }
    
    if (!medicine) return;
    setIsFavorite(!isFavorite);
    
    // Show success modal for wishlist
    setSuccessMessage(!isFavorite 
      ? 'Added to wishlist' 
      : 'Removed from wishlist'
    );
    setShowSuccessModal(true);
  };

  const calculateFinalPrice = () => {
    if (!medicine) return 0;
    if (medicine.discountedPrice) return medicine.discountedPrice;
    if (medicine.discountPercentage > 0) {
      return medicine.price * (1 - medicine.discountPercentage / 100);
    }
    return medicine.price;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded-xl"></div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-24 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const finalPrice = calculateFinalPrice();
  const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
  const availablePharmacies = medicine.availableAtPharmacies || [];
  const visibleRelatedMedicines = relatedMedicines.slice(currentRelatedIndex, currentRelatedIndex + 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals */}
      {showEmptyCartModal && <EmptyCartModal />}
      {showCallPharmacyModal && <CallPharmacyModal />}
      {showLinkCopiedModal && <LinkCopiedModal />}
      {showSuccessModal && <SuccessModal />}
      {showPharmacyErrorModal && <PharmacyErrorModal />}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleFavorite}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <FaHeart className={isFavorite ? "text-red-500 fill-red-500" : ""} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors"
              >
                <FaShareAlt />
              </button>
              <button
                onClick={handleCheckout}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  cart.length === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
                }`}
              >
                <FaShoppingCart className="mr-2" />
                Checkout ({cart.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
          <FaChevronRight className="mx-2" size={10} />
          <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
          <FaChevronRight className="mx-2" size={10} />
          <span className="font-medium text-gray-900">{medicine.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Product Info */}
          <div className="lg:col-span-2">
            {/* Product Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex flex-col">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-64 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="max-h-52 max-w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
                          }}
                        />
                        {/* Fix: Save % badge on top-left of image */}
                        {isDiscounted && (
                          <div className="absolute top-0 left-0">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-br-lg rounded-tl-xl text-sm font-bold shadow-md">
                              Save {medicine.discountPercentage}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Pharmacy tag */}
                    <div className="mt-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
                    {medicine.genericName && (
                      <p className="text-gray-600">
                        <span className="font-medium">Generic:</span> {medicine.genericName}
                      </p>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-end mb-2">
                      <span className="text-3xl font-bold text-[var(--secondary-color)]">
                        Rs. {finalPrice.toFixed(2)}
                      </span>
                      {isDiscounted && medicine.price > finalPrice && (
                        <span className="ml-3 text-lg text-gray-500 line-through">
                          Rs. {medicine.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaCapsules className="text-[var(--primary-color)] mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Form</div>
                        <div className="font-medium">{medicine.form}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaIndustry className="text-[var(--primary-color)] mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Manufacturer</div>
                        <div className="font-medium">{medicine.manufacturer || 'Not specified'}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaPills className="text-[var(--primary-color)] mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Strength</div>
                        <div className="font-medium">{medicine.strength || 'Not specified'}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaPrescriptionBottle className="text-[var(--primary-color)] mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Prescription</div>
                        <div className={`font-medium ${medicine.prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
                          {medicine.prescriptionRequired ? 'Required' : 'Not Required'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className={`mb-6 p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center">
                      {medicine.inStock ? (
                        <>
                          <FaCheckCircle className="text-green-500 mr-3" />
                          <div>
                            <div className="font-medium text-green-700">In Stock</div>
                            <div className="text-sm text-green-600">Available for delivery</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="text-red-500 mr-3" />
                          <div>
                            <div className="font-medium text-red-700">Out of Stock</div>
                            <div className="text-sm text-red-600">Check nearby pharmacies</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-xl shadow-md mb-6">
              {/* Tab Navigation */}
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
                    { id: 'uses', label: 'Uses', icon: <FaPills /> },
                    { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
                    { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
                    { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSection(tab.id)}
                      className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeSection === tab.id
                          ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-[400px] overflow-y-auto">
                {activeSection === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {medicine.detailedDescription || medicine.description}
                      </p>
                    </div>
                    {medicine.storageInstructions && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <FaTemperatureLow className="text-blue-500 mt-1 mr-3" />
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Storage Instructions</h4>
                            <p className="text-gray-700">{medicine.storageInstructions}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeSection === 'uses' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Therapeutic Uses</h3>
                    {medicine.uses && medicine.uses.length > 0 ? (
                      <ul className="space-y-3">
                        {medicine.uses.map((use, index) => (
                          <li key={index} className="flex items-start">
                            <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{use}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No specific uses listed.</p>
                    )}
                  </div>
                )}

                {activeSection === 'sideEffects' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Possible Side Effects</h3>
                    {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <ul className="space-y-3">
                          {medicine.sideEffects.map((effect, index) => (
                            <li key={index} className="flex items-start">
                              <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{effect}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No specific side effects listed.</p>
                    )}
                  </div>
                )}

                {activeSection === 'precautions' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Safety Precautions</h3>
                    {medicine.precautions && medicine.precautions.length > 0 ? (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <ul className="space-y-3">
                          {medicine.precautions.map((precaution, index) => (
                            <li key={index} className="flex items-start">
                              <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{precaution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No specific precautions listed.</p>
                    )}
                  </div>
                )}

                {activeSection === 'instructions' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Usage Instructions</h3>
                    {medicine.instructions && medicine.instructions.length > 0 ? (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <ul className="space-y-3">
                          {medicine.instructions.map((instruction, index) => (
                            <li key={index} className="flex items-start">
                              <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-700">Take as directed by your physician.</p>
                    )}
                    <div className="mt-6">
                      <h4 className="font-bold text-gray-900 mb-2">Dosage</h4>
                      <p className="text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Medicines - Fixed with arrows */}
            {relatedMedicines.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={prevRelated}
                      disabled={relatedMedicines.length <= 2}
                      className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      onClick={nextRelated}
                      disabled={relatedMedicines.length <= 2}
                      className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {visibleRelatedMedicines.map(relatedMed => (
                    <Link
                      key={relatedMed._id}
                      to={`/medicine/${relatedMed._id}`}
                      className="group border border-gray-200 rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
                    >
                      <div className="flex">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <img
                            src={relatedMed.image}
                            alt={relatedMed.name}
                            className="max-h-16 max-w-16 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 line-clamp-1">
                            {relatedMed.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-[var(--secondary-color)]">
                                Rs.{relatedMed.discountedPrice || relatedMed.price}
                              </span>
                              {relatedMed.discountedPrice && (
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                  Rs.{relatedMed.price}
                                </span>
                              )}
                            </div>
                            <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)]" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Action Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Pharmacy Selection */}
              {isAggregatedView && availablePharmacies.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-5">
                  <div className="flex items-center mb-4">
                    <FaStore className="text-[var(--primary-color)] mr-2" />
                    <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
                    <span className="ml-auto text-sm text-gray-600">{availablePharmacies.length} options</span>
                  </div>
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {availablePharmacies.map(pharmacy => (
                      <button
                        key={pharmacy._id}
                        onClick={() => setSelectedPharmacy(pharmacy)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedPharmacy?._id === pharmacy._id
                            ? 'border-[var(--primary-color)] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span 
                                key={star} 
                                className={star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaMapMarkerAlt className="mr-2" />
                            {pharmacy.city} • {pharmacy.distance}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FaClock className="mr-2" />
                            {/*Dynamic delivery time from backend */}
                            {pharmacy.deliveryTime}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center">
                              <FaTag className="text-green-500 mr-2" />
                              <span className="font-bold text-[var(--secondary-color)]">
                                Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
                              </span>
                              {pharmacy.discountPercentage > 0 && (
                                <span className="ml-2 text-sm text-red-500">
                                  ({pharmacy.discountPercentage}% OFF)
                                </span>
                              )}
                            </div>
                            {selectedPharmacy?._id === pharmacy._id && (
                              <FaCheckCircle className="text-green-500" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Quantity</span>
                    <span className="text-sm text-gray-500">Max: 10 units</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-12 h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <FaMinus />
                    </button>
                    <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-lg">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                      className="w-12 h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price ({quantity} units)</span>
                    <span className="font-medium">Rs. {(finalPrice * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  {medicine.discountPercentage > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-red-600 font-medium">-Rs. {((medicine.price - finalPrice) * quantity).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-[var(--secondary-color)]">Rs. {(finalPrice * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {quantityInCart > 0 ? (
                    <div className="space-y-3">
                      <button
                        onClick={addToCart}
                        className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                          medicine.inStock && (!isAggregatedView || selectedPharmacy)
                            ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
                      >
                        <FaShoppingCart className="mr-2" />
                        Add More to Cart
                      </button>
                      <div className="text-center text-sm text-gray-600">
                        Already {quantityInCart} in cart
                      </div>
                      <button
                        onClick={removeFromCart}
                        className="w-full py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                      >
                        <FaTrash className="mr-2" />
                        Remove from Cart
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={addToCart}
                      disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy) || isPharmacyUser}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                        medicine.inStock && (!isAggregatedView || selectedPharmacy) && !isPharmacyUser
                          ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isPharmacyUser ? (
                        <>
                          <FaBan className="mr-2" />
                          Not Allowed
                        </>
                      ) : medicine.inStock ? (
                        (isAggregatedView && !selectedPharmacy ? (
                          <>
                            <FaStore className="mr-2" />
                            Select Pharmacy
                          </>
                        ) : (
                          <>
                            <FaShoppingCart className="mr-2" />
                            Add to Cart
                          </>
                        ))
                      ) : (
                        <>
                          <FaBan className="mr-2" />
                          Out of Stock
                        </>
                      )}
                    </button>
                  )}
                  
                  {medicine.prescriptionRequired && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start">
                        <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-yellow-800">
                          This medicine requires a valid prescription. Upload prescription during checkout.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex items-center mb-4">
                  <FaTruck className="text-[var(--primary-color)] mr-2" />
                  <h3 className="font-bold text-gray-900">Delivery Information</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">Delivery Time</div>
                      {/*Dynamic delivery time */}
                      <div className="text-sm text-gray-600">
                        {selectedPharmacy?.deliveryTime || medicine.pharmacyDeliveryTime || '30-45 minutes'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex items-center mb-4">
                  <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
                  <h3 className="font-bold text-gray-900">Need Help?</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Our pharmacists are available 24/7 to answer your questions.
                </p>
                <button 
                  onClick={handleCallPharmacy}
                  className="w-full flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <FaPhoneAlt className="mr-2" />
                  Call Pharmacy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Footer */}
        <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <FaShieldAlt className="text-white text-2xl mr-4" />
              <div>
                <h3 className="text-white font-bold text-lg">100% Safe & Secure</h3>
                <p className="text-white/90 text-sm">Your health is our priority</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-white font-bold text-xl">10K+</div>
                <div className="text-white/80 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-xl">24/7</div>
                <div className="text-white/80 text-sm">Pharmacy Support</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-xl">100%</div>
                <div className="text-white/80 text-sm">Authentic Medicines</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;

