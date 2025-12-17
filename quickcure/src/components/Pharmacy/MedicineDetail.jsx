// components/MedicineDetail.jsx
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { medicines } from "./medicines";
// // import Header from "../header";
// import Header from '../Header/header.jsx';
// import VerificationModal from "./VerificationModal";
// import "./MedicineDetail.css";

// export default function MedicineDetail() {
//   const { id } = useParams();
//   const medicine = medicines.find((m) => m.id === parseInt(id));
//   const [activeTab, setActiveTab] = useState("about");

//   if (!medicine) return <h2>Medicine not found</h2>;


  
//   const tabs = [
//     { key: "about", label: "About" },
//     { key: "uses", label: "Uses" },
//     { key: "dosage", label: "Dosage" },
//     { key: "warnings", label: "Warnings" },
//     { key: "precautions", label: "Precautions" },
//     { key: "sideEffects", label: "Side Effects" },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="medicine-detail-container">
//         {/* 🧭 Tabs Navigation */}
//         <div className="tabs">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               className={activeTab === tab.key ? "tab active" : "tab"}
//               onClick={() => setActiveTab(tab.key)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* 🧴 Medicine Header */}
//         <div className="medicine-header">
//           <img src={medicine.image} alt={medicine.name} />
//           <div className="medicine-info">
//             <h1>{medicine.name}</h1>
//             <p>
//               <strong>Manufacturer:</strong> {medicine.manufacturer}
//             </p>
//             <p>
//               <strong>Category:</strong> {medicine.category}
//             </p>
//             <p>
//               <strong>Form:</strong> {medicine.form || "Tablet"}
//             </p>
//             <p>
//               <strong>Price:</strong>{" "}
//               {medicine.discountPrice ? (
//                 <>
//                   <span className="discount">${medicine.discountPrice}</span>{" "}
//                   <span className="original">${medicine.price}</span>
//                 </>
//               ) : (
//                 <span>${medicine.price}</span>
//               )}
//             </p>
//           </div>
//         </div>

//         {/* 💊 Tab Content */}
//         <div className="tab-content">
//           {activeTab === "about" && (
//             <div>
//               <h2>About {medicine.name}</h2>
//               <p>{medicine.description}</p>
//             </div>
//           )}

//           {activeTab === "uses" && medicine.uses && (
//             <div>
//               <h2>Uses of {medicine.name}</h2>
//               <ul>
//                 {medicine.uses.map((use, i) => (
//                   <li key={i}>{use}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {activeTab === "dosage" && medicine.dosage && (
//             <div>
//               <h2>Dosage and Administration</h2>
//               <p>{medicine.dosage}</p>
//             </div>
//           )}

//           {activeTab === "warnings" && medicine.warnings && (
//             <div>
//               <h2>Warnings</h2>
//               <ul>
//                 {medicine.warnings.map((warn, i) => (
//                   <li key={i}>{warn}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {activeTab === "precautions" && medicine.precautions && (
//             <div>
//               <h2>Precautions</h2>
//               <ul>
//                 {medicine.precautions.map((prec, i) => (
//                   <li key={i}>{prec}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {activeTab === "sideEffects" && medicine.sideEffects && (
//             <div>
//               <h2>Possible Side Effects</h2>
//               <ul>
//                 {medicine.sideEffects.map((effect, i) => (
//                   <li key={i}>{effect}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* 🛒 Buttons */}
//         <div className="detail-buttons">
//           <button className="buy-btn">Buy Now</button>
//           <button className="back-btn" onClick={() => window.history.back()}>
//             Go Back
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }












// The below code is working perfectly

// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { medicines } from './medicines';

// const MedicineDetail = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const medicine = medicines.find(med => med.id === parseInt(id));

//   if (!medicine) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-red-600">Medicine not found</h2>
//         <Link to="/medicines" className="text-blue-600 hover:underline mt-4 inline-block">
//           Back to Medicines
//         </Link>
//       </div>
//     );
//   }

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

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Link
//         to="/"
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         ← Back
//       </Link>

//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="md:flex">
//           {/* Medicine Image */}
//           <div className="md:w-1/3">
//             <img
//               src={medicine.image}
//               alt={medicine.name}
//               className="w-full h-64 md:h-full object-cover"
//             />
//           </div>
          
//           {/* Medicine Details */}
//           <div className="md:w-2/3 p-6">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//               {medicine.name}
//             </h1>
//             <p className="text-gray-600 text-lg mb-4">
//               {medicine.detailedDescription}
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <h3 className="font-semibold text-gray-700">Category</h3>
//                 <p className="text-gray-600">{medicine.category}</p>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-700">Dosage</h3>
//                 <p className="text-gray-600">{medicine.dosage}</p>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-700">Price</h3>
//                 <p className="text-2xl font-bold text-green-600">${medicine.price}</p>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-700 mb-2">Uses</h3>
//               <ul className="list-disc list-inside text-gray-600">
//                 {medicine.uses.map((use, index) => (
//                   <li key={index}>{use}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-700 mb-2">Possible Side Effects</h3>
//               <ul className="list-disc list-inside text-gray-600">
//                 {medicine.sideEffects.map((effect, index) => (
//                   <li key={index}>{effect}</li>
//                 ))}
//               </ul>
//             </div>

//             <button
//               onClick={addToCart}
//               className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
//             >
//               Add to Cart - ${medicine.price}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;















// Below code is for checking new idea.
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







//The backend API is attached below.
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const MedicineDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('uses');
  const [relatedMedicines, setRelatedMedicines] = useState([]);

  // Fetch medicine details from backend
  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/medicines/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setMedicine(data.data);
          
          // Fetch related medicines (same category)
          fetchRelatedMedicines(data.data.category, data.data._id);
        } else {
          setError('Medicine not found');
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

  // Fetch related medicines
  const fetchRelatedMedicines = async (category, excludeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/medicines?category=${category}&limit=4`);
      const data = await response.json();
      
      if (data.success) {
        // Exclude current medicine
        const filtered = data.data.filter(med => med._id !== excludeId).slice(0, 3);
        setRelatedMedicines(filtered);
      }
    } catch (err) {
      console.error('Error fetching related medicines:', err);
    }
  };

  // Get quantity in cart
  const quantityInCart = medicine ? 
    cart.find(item => item._id === medicine._id)?.quantity || 0 
    : 0;

  const addToCart = () => {
    if (!medicine) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === medicine._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = () => {
    if (!medicine) return;
    
    setCart(prevCart => prevCart.filter(item => item._id !== medicine._id));
  };

  // Calculate final price with discount
  const calculateFinalPrice = () => {
    if (!medicine) return 0;
    
    if (medicine.discountedPrice) {
      return medicine.discountedPrice;
    }
    
    if (medicine.discountPercentage > 0) {
      return medicine.price * (1 - medicine.discountPercentage / 100);
    }
    
    return medicine.price;
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading medicine details...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !medicine) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Medicine Not Found</h2>
        <p className="text-gray-500 mb-6">{error || 'The medicine you are looking for does not exist.'}</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const finalPrice = calculateFinalPrice();
  const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
  const availablePharmacies = medicine.availableAtPharmacies || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Go Back
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Column - Medicine Info */}
          <div className="md:w-2/5 lg:w-1/3 p-6 md:p-8 border-r border-gray-100">
            {/* Medicine Image */}
            <div className="mb-6">
              <div className="relative rounded-xl overflow-hidden bg-gray-50 h-64">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
                  }}
                />
                {isDiscounted && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                    {medicine.discountPercentage > 0 
                      ? `Rs. {medicine.discountPercentage}% OFF` 
                      : 'SALE'}
                  </div>
                )}
                {!medicine.inStock && (
                  <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-lg font-bold">
                    OUT OF STOCK
                  </div>
                )}
              </div>
            </div>

            {/* Medicine Info Box */}
            <div className="space-y-5">
              {/* Category */}
              <div>
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-700">Category</h3>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
                  {medicine.category || 'General'}
                </div>
              </div>

              {/* Manufacturer */}
              {medicine.manufacturer && (
                <div>
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h3 className="text-sm font-semibold text-gray-700">Manufacturer</h3>
                  </div>
                  <div className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-100">
                    {medicine.manufacturer}
                  </div>
                </div>
              )}

              {/* Dosage */}
              <div>
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-700">Dosage</h3>
                </div>
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100">
                  {medicine.dosage || 'As prescribed'}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-700">Price</h3>
                </div>
                <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Rs. {finalPrice.toFixed(2)}</span>
                    {isDiscounted && medicine.price > finalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        Rs. {medicine.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">per unit</div>
                </div>
              </div>

              {/* Available at Pharmacies */}
              <div>
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-700">Available at</h3>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {availablePharmacies.length > 0 ? (
                    availablePharmacies.map(pharmacy => (
                      <Link
                        key={pharmacy._id}
                        to={`/pharmacies/${pharmacy._id}`}
                        className="block bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{pharmacy.name}</span>
                          <span className="text-xs text-gray-500">{pharmacy.distance || 'Nearby'}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{pharmacy.city}</div>
                      </Link>
                    ))
                  ) : (
                    <div className="bg-gray-50 text-gray-500 px-3 py-2 rounded-lg border border-gray-200">
                      Available at selected pharmacies
                    </div>
                  )}
                </div>
              </div>

              {/* Cart Summary */}
              {quantityInCart > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">In your cart:</p>
                    <p className="text-lg font-bold text-blue-600">{quantityInCart} unit{quantityInCart > 1 ? 's' : ''}</p>
                    <p className="text-sm text-gray-500">Total: Rs. {(finalPrice * quantityInCart).toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:w-3/5 lg:w-2/3 flex flex-col">
            {/* Fixed Header */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-0">
                  {medicine.name}
                </h1>
                <div className="flex items-center space-x-4">
                  {medicine.brand && (
                    <span className="text-lg text-gray-600 font-medium">{medicine.brand}</span>
                  )}
                  {medicine.prescriptionRequired && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Prescription Required
                    </span>
                  )}
                </div>
              </div>
              
              {medicine.genericName && (
                <p className="text-gray-500 italic mb-3">Generic: {medicine.genericName}</p>
              )}
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {medicine.detailedDescription || medicine.description}
              </p>
            </div>

            {/* Scrollable Content with Tabs */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Section Navigation Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto px-6 md:px-8">
                  <button
                    onClick={() => setActiveSection('uses')}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'uses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Uses & Benefits
                  </button>
                  <button
                    onClick={() => setActiveSection('sideEffects')}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'sideEffects' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Side Effects
                  </button>
                  <button
                    onClick={() => setActiveSection('precautions')}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'precautions' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Precautions
                  </button>
                  <button
                    onClick={() => setActiveSection('instructions')}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === 'instructions' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Instructions
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {/* Uses Section */}
                {activeSection === 'uses' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Uses</h3>
                      {medicine.uses && medicine.uses.length > 0 ? (
                        <ul className="space-y-3">
                          {medicine.uses.map((use, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700">{use}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No specific uses listed.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Side Effects Section */}
                {activeSection === 'sideEffects' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Common Side Effects</h3>
                      {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
                        <ul className="space-y-3">
                          {medicine.sideEffects.map((effect, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              <span className="text-gray-700">{effect}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No specific side effects listed.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Precautions Section */}
                {activeSection === 'precautions' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Important Precautions</h3>
                      {medicine.precautions && medicine.precautions.length > 0 ? (
                        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
                          <ul className="space-y-4">
                            {medicine.precautions.map((precaution, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-800">{precaution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No specific precautions listed.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Instructions Section */}
                {activeSection === 'instructions' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Usage Instructions</h3>
                      {medicine.instructions && medicine.instructions.length > 0 ? (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                          <ul className="space-y-4">
                            {medicine.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="text-gray-800">{instruction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-gray-700">Take as directed by your physician. Follow the dosage instructions carefully.</p>
                      )}
                    </div>
                    {medicine.storageInstructions && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Storage Instructions</h4>
                        <p className="text-gray-700">{medicine.storageInstructions}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Fixed Add to Cart Button */}
              <div className="border-t border-gray-200 p-6 md:p-8 bg-white">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-center sm:text-left">
                    <p className="text-gray-600">Quantity in cart: <span className="font-bold text-blue-600">{quantityInCart}</span></p>
                    <p className="text-sm text-gray-500">Click below to add more</p>
                  </div>
                  {/* <div className="flex flex-wrap gap-3 items-center"> */}
<div className="flex items-center space-x-4">
                    <button
                      onClick={removeFromCart}
                      disabled={quantityInCart === 0}
                      className={`px-6 py-3 rounded-lg font-medium ${quantityInCart === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      Remove
                    </button>
                    <button
                      onClick={addToCart}
                      disabled={!medicine.inStock}
                      className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-colors ${
                        medicine.inStock
                          ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] hover:shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {medicine.inStock 
                        ? (quantityInCart > 0 ? 'Add More to Cart' : 'Add to Cart')
                        : 'Out of Stock'
                      } - Rs. {finalPrice.toFixed(2)}
                    </button>
                    <Link
                      to="/booking"
                      className={`px-6 py-3 rounded-lg font-medium ${
                        cart.length === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      Checkout ({cart.length})
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Medicines Section */}
      {relatedMedicines.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Medicines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedMedicines.map(relatedMed => (
              <div key={relatedMed._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                    {relatedMed.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {relatedMed.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">
                      Rs.{relatedMed.discountedPrice 
                        ? relatedMed.discountedPrice.toFixed(2)
                        : relatedMed.price.toFixed(2)
                      }
                    </span>
                    <Link
                      to={`/medicine/${relatedMed._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">📞 Need Help?</h4>
            <p className="text-gray-600 text-sm">
              Contact our pharmacists for any questions about this medicine.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">⚠️ Safety First</h4>
            <p className="text-gray-600 text-sm">
              Always consult your doctor before starting any new medication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;












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












// Updated backend code
