// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { labs } from "./LabData";

// export default function LabsPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6 text-[var(--primary-color)]">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-[var(--primary-color)] mb-2">
//           Best Radiology & Pathology Labs in Pakistan
//         </h1>
//         {/* <p className="text-sm text-[var(--primary-color)]">Home ▸ Labs in Pakistan</p> */}
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
//         {labs.map((lab) => (
//           <div
//             key={lab.id}
//             onClick={() => navigate(`/labs/${lab.id}`)}
//             className="
//               bg-[var(--white)] shadow-md border border-[var(--bg-light)] 
//               rounded-xl p-6 cursor-pointer 
//               hover:shadow-lg hover:-translate-y-1 
//               transition-all duration-300 flex flex-col items-center
//               hover:border-[var(--accent-color)]
//               group 
          
//             "
//           >
//             {/* Logo Container */}
//             <div className="mb-4 p-3  rounded-lg  transition-colors ">
//               <img
//                 src={lab.logo}
//                 alt={lab.name}
//                 className="w-16 h-16 object-contain"
//               />
//             </div>

//             {/* Lab Info */}
//             <div className="text-center mb-4">
//               <h2 className="text-lg font-semibold text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors">
//                 {lab.name}
//               </h2>
//               <p className="text-sm text-[var(--accent-color)] mt-1">{lab.branches}</p>
//             </div>

//             {/* Button */}
//             <div className="mt-auto mx-auto">
//               <button
//                 className="
//                   w-40  py-2.5 text-sm font-medium border-2 
//                   border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg 
//                   hover:bg-[var(--primary-color)] hover:text-[var(--white)] 
//                   transition-all duration-300
//                   hover:border-[var(--hover-color)]
//                   hover:shadow-md
//                 "
//               >
//                 View Test Prices
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function LabsPage() {
//   const navigate = useNavigate();
//   const [labs, setLabs] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/labs")
//       .then((res) => setLabs(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6 text-[var(--primary-color)]">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-[var(--primary-color)] mb-2">
//           Best Radiology & Pathology Labs in Pakistan
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {labs.map((lab) => (
//           <div
//             key={lab._id}
//             onClick={() => navigate(`/labs/${lab._id}`)}
//             className="
//               bg-[var(--white)] shadow-md border rounded-xl p-6 cursor-pointer
//               hover:shadow-lg hover:-translate-y-1 transition-all duration-300
//             "
//           >
//             <img
//               src={`http://localhost:5000/uploads/${lab.logo}`}
//               className="w-16 h-16 object-contain mb-4"
//               alt={lab.name}
//             />

//             <h2 className="text-lg font-semibold">{lab.name}</h2>
//             <p className="text-sm text-[var(--accent-color)]">{lab.branches}</p>

//             <button className="mt-4 w-40 py-2 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color)] hover:text-white transition">
//               View Test Prices
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaMapMarkerAlt, FaArrowRight, FaHome, FaShieldAlt, FaClock, FaCheck, FaStethoscope } from "react-icons/fa";

// export default function LabsPage() {
//   const navigate = useNavigate();
//   const [labs, setLabs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/labs")
//       .then((res) => {
//         setLabs(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[var(--primary-color)] border-t-transparent"></div>
//           <p className="mt-4 text-[var(--accent-color)]">Loading trusted diagnostic labs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[var(--bg-light)]/30 to-white">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] text-white">
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="md:w-2/3 mb-8 md:mb-0">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                 Lab Tests Delivered to Your Doorstep
//               </h1>
//               <p className="text-xl mb-6 opacity-90">
//                 Experience the future of healthcare with <span className="font-bold">FREE HOME SAMPLE COLLECTION</span> from Pakistan's most trusted diagnostic labs.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
//                   <FaHome className="text-lg" />
//                   <span>Home Collection</span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
//                   <FaClock className="text-lg" />
//                   <span>Same Day Service</span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
//                   <FaShieldAlt className="text-lg" />
//                   <span>Safe & Sterile</span>
//                 </div>
//               </div>
//             </div>
//             {/* <div className="text-8xl">🏠</div> */}
//        <div className="text-8xl">
//   <FaStethoscope className="inline-block" />
// </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="max-w-7xl mx-auto px-4 -mt-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-[var(--bg-light)]">
//             <div className="text-3xl font-bold text-[var(--primary-color)]">{labs.length}</div>
//             <div className="text-[var(--accent-color)] mt-1">Certified Labs</div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-[var(--bg-light)]">
//             <div className="text-3xl font-bold text-[var(--primary-color)]">24/7</div>
//             <div className="text-[var(--accent-color)] mt-1">Booking Available</div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-[var(--bg-light)]">
//             <div className="text-3xl font-bold text-[var(--primary-color)]">FREE</div>
//             <div className="text-[var(--accent-color)] mt-1">Home Collection</div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-[var(--bg-light)]">
//             <div className="text-3xl font-bold text-[var(--primary-color)]">70%</div>
//             <div className="text-[var(--accent-color)] mt-1">Average Savings</div>
//           </div>
//         </div>
//       </div>

//       {/* How It Works */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-10">
//           Simple 4-Step Process
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {[1, 2, 3, 4].map((step, index) => (
//             <div key={step} className="relative">
//               <div className="bg-white p-6 h-50 rounded-2xl shadow-md border border-[var(--bg-light)]">
//                 <div className="w-14 h-14 bg-[var(--bg-light)] rounded-full flex items-center justify-center mb-4">
//                   <span className="text-2xl mx-auto font-bold text-[var(--primary-color)]">{step}</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
//                   {index === 0 && "Book Online"}
//                   {index === 1 && "Sample Collection"}
//                   {index === 2 && "Lab Processing"}
//                   {index === 3 && "Get Reports"}
//                 </h3>
//                 <p className="text-[var(--accent-color)]">
//                   {index === 0 && "Select tests & choose convenient time slot"}
//                   {index === 1 && "Expert phlebotomist visits your home"}
//                   {index === 2 && "Samples analyzed at certified labs"}
//                   {index === 3 && "Digital reports delivered online"}
//                 </p>
//               </div>
//               {index < 3 && (
//                 <div className="hidden md:block absolute top-8 left-full w-12 h-0.5 bg-[var(--bg-light)]"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Labs Section */}
//       <div className="bg-[var(--bg-light)]/20 py-12">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-3">
//               Partner Diagnostic Labs
//             </h2>
//             <p className="text-[var(--accent-color)] text-lg">
//               All offering <span className="font-bold text-[var(--primary-color)]">FREE home collection</span> with special discounts
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {labs.map((lab) => (
//               <div
//                 key={lab._id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-[var(--bg-light)] hover:border-[var(--accent-color)]"
//               >
//                 <div className="p-5 bg-gradient-to-r from-[var(--bg-light)]/40 to-[var(--bg-light)]/10">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-4">
//                         <div className="w-14 h-14 bg-white rounded-lg p-2 shadow-sm border border-[var(--bg-light)]">
//                           <img
//                             src={`http://localhost:5000/uploads/${lab.logo}`}
//                             className="w-full h-full object-contain"
//                             alt={lab.name}
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = "https://cdn-icons-png.flaticon.com/512/2965/2965358.png";
//                             }}
//                           />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-bold text-[var(--secondary-color)]">{lab.name}</h3>
//                           <div className="flex items-center gap-1 text-sm text-[var(--accent-color)] mt-1">
//                             <FaMapMarkerAlt className="text-[var(--primary-color)]" />
//                             <span>{lab.branches || "Multiple locations"}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {lab.discount > 0 && (
//                       <div className="bg-[var(--primary-color)] text-white px-3 py-1.5 rounded-lg shadow-sm">
//                         <span className="font-bold">{lab.discount}% OFF</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="p-5">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="flex items-center gap-2 bg-[var(--bg-light)] text-[var(--secondary-color)] px-3 py-1.5 rounded-lg">
//                       <FaHome className="text-[var(--primary-color)]" />
//                       <span className="text-sm font-medium">FREE Home Collection</span>
//                     </div>
//                   </div>

//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center gap-2 text-sm text-[var(--accent-color)]">
//                       <FaCheck className="text-[var(--primary-color)] text-xs" />
//                       <span>Certified Diagnostic Lab</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-[var(--accent-color)]">
//                       <FaCheck className="text-[var(--primary-color)] text-xs" />
//                       <span>Expert Phlebotomists</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-[var(--accent-color)]">
//                       <FaCheck className="text-[var(--primary-color)] text-xs" />
//                       <span>Accurate Test Results</span>
//                     </div>
//                   </div>

//                   {/* Discount Info */}
//                   <div className="mb-4">
//                     {lab.discount > 0 ? (
//                       <div className="p-3 bg-[var(--bg-light)]/40 rounded-lg border border-[var(--bg-light)]">
//                         <div className="text-center">
//                           <div className="text-xs text-[var(--accent-color)] mb-1">Special Offer</div>
//                           <div className="text-lg font-bold text-[var(--primary-color)]">Flat {lab.discount}% OFF</div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="p-3 bg-[var(--bg-light)]/20 rounded-lg">
//                         <div className="text-center text-[var(--accent-color)]">
//                           <div className="font-medium">Standard Pricing</div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/labs/${lab._id}`);
//                     }}
//                     className="w-full py-3 bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
//                   >
//                     <span>View All Tests</span>
//                     <FaArrowRight />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {labs.length === 0 && !loading && (
//             <div className="text-center py-12">
//               <div className="text-5xl mb-4 text-[var(--accent-color)]">🔬</div>
//               <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">No Labs Available</h3>
//               <p className="text-[var(--accent-color)]">We're adding more diagnostic centers soon.</p>
//             </div>
//           )}
//         </div>
//       </div> 

//       {/* Benefits Section */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-10">
//           Why Choose Home Collection?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="text-center p-6 hover:bg-[var(--bg-light)]/20 rounded-2xl transition-all duration-300 border border-[var(--bg-light)]">
//             <div className="w-20 h-20 bg-[var(--bg-light)] rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="text-3xl">⏰</div>
//             </div>
//             <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">Save Time & Effort</h3>
//             <p className="text-[var(--accent-color)]">No travel, no waiting rooms. Get tested in the comfort of your home.</p>
//           </div>

//           <div className="text-center p-6 hover:bg-[var(--bg-light)]/20 rounded-2xl transition-all duration-300 border border-[var(--bg-light)]">
//             <div className="w-20 h-20 bg-[var(--bg-light)] rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="text-3xl">🛡️</div>
//             </div>
//             <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">Safe & Sterile</h3>
//             <p className="text-[var(--accent-color)]">Hygienic procedures with disposable equipment for maximum safety.</p>
//           </div>

//           <div className="text-center p-6 hover:bg-[var(--bg-light)]/20 rounded-2xl transition-all duration-300 border border-[var(--bg-light)]">
//             <div className="w-20 h-20 bg-[var(--bg-light)] rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="text-3xl">👨‍👩‍👧</div>
//             </div>
//             <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">Family Convenience</h3>
//             <p className="text-[var(--accent-color)]">Multiple family members can be tested together at home.</p>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       {/* <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] text-white py-12">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Ready to Get Tested?
//           </h2>
//           <p className="text-xl mb-8 opacity-90">
//             Book your lab tests today and experience hassle-free healthcare at home.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button 
//               className="bg-white text-[var(--primary-color)] hover:bg-gray-100 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300"
//               onClick={() => labs.length > 0 && navigate(`/labs/${labs[0]._id}`)}
//             >
//               Browse All Tests
//             </button>
//             <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300">
//               Need Help? Call Now
//             </button>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaMapMarkerAlt, FaArrowRight, FaHome, FaShieldAlt, FaClock, FaCheck, FaStethoscope } from "react-icons/fa";

// export default function LabsPage() {
//   const navigate = useNavigate();
//   const [labs, setLabs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/labs")
//       .then((res) => {
//         setLabs(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--bg-light)]/10 to-white">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[var(--bg-light)] border-t-[var(--primary-color)]"></div>
//           <p className="mt-4 text-[var(--accent-color)] font-medium">Loading trusted diagnostic labs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[var(--bg-light)]/10 to-white">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white">
//         <div className="max-w-7xl mx-auto px-18 py-12">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="md:w-2/3 mb-8 md:mb-0">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                 Lab Tests Delivered to Your Doorstep
//               </h1>
//               <p className="text-xl mb-6 text-[var(--text-light)]">
//                 Experience the future of healthcare with <span className="font-bold text-white">FREE HOME SAMPLE COLLECTION</span> from Pakistan's most trusted diagnostic labs.
//               </p>
//               <div className="flex flex-wrap gap-3">
//                 <div className="flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-lg">
//                   <FaHome className="text-lg" />
//                   <span>Home Collection</span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-lg">
//                   <FaClock className="text-lg" />
//                   <span>Same Day Service</span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-lg">
//                   <FaShieldAlt className="text-lg" />
//                   <span>Safe & Sterile</span>
//                 </div>
//               </div>
//             </div>
//             <div className="text-8xl text-[var(--text-light)] mt-6 md:mt-0">
//               <FaStethoscope className="inline-block" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="max-w-7xl mx-auto lg:px -mt-6">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-white rounded-xl shadow-md p-6 text-center border border-[var(--bg-light)] hover:shadow-lg transition-shadow">
//             <div className="text-3xl font-bold text-[var(--primary-color)]">{labs.length}</div>
//             <div className="text-[var(--accent-color)] mt-1 font-medium">Certified Labs</div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 text-center border border-[var(--bg-light)] hover:shadow-lg transition-shadow">
//             <div className="text-3xl font-bold text-[var(--primary-color)]">24/7</div>
//             <div className="text-[var(--accent-color)] mt-1 font-medium">Booking Available</div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 text-center border border-[var(--bg-light)] hover:shadow-lg transition-shadow">
//             <div className="text-3xl font-bold text-[var(--primary-color)]">FREE</div>
//             <div className="text-[var(--accent-color)] mt-1 font-medium">Home Collection</div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 text-center border border-[var(--bg-light)] hover:shadow-lg transition-shadow">
//             <div className="text-3xl font-bold text-[var(--primary-color)]">70%</div>
//             <div className="text-[var(--accent-color)] mt-1 font-medium">Average Savings</div>
//           </div>
//         </div>
//       </div>

//       {/* How It Works */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-10">
//           Simple 4-Step Process
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {[1, 2, 3, 4].map((step, index) => (
//             <div key={step} className="relative">
//               <div className="bg-white p-6 h-full rounded-xl shadow-sm border border-[var(--bg-light)] hover:shadow-md transition-shadow">
//                 <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center mb-4">
//                   <span className="text-2xl mx-auto font-bold text-white">{step}</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
//                   {index === 0 && "Book Online"}
//                   {index === 1 && "Sample Collection"}
//                   {index === 2 && "Lab Processing"}
//                   {index === 3 && "Get Reports"}
//                 </h3>
//                 <p className="text-[var(--accent-color)]">
//                   {index === 0 && "Select tests & choose convenient time slot"}
//                   {index === 1 && "Expert phlebotomist visits your home"}
//                   {index === 2 && "Samples analyzed at certified labs"}
//                   {index === 3 && "Digital reports delivered online"}
//                 </p>
//               </div>
//               {index < 3 && (
//                 <div className="hidden md:block absolute top-8 left-full w-12 h-0.5 bg-gradient-to-r from-[var(--bg-light)] to-transparent"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Labs Section */}
//       <div className="bg-gradient-to-b from-white to-[var(--bg-light)]/20 py-12">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-3">
//               Partner Diagnostic Labs
//             </h2>
//             <p className="text-[var(--accent-color)] text-lg">
//               All offering <span className="font-bold text-[var(--primary-color)]">FREE home collection</span> with special discounts
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {labs.map((lab) => (
//               <div
//                 key={lab._id}
//                 className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-[var(--bg-light)] hover:border-[var(--primary-color)]/30"
//               >
//                 <div className="p-5 bg-gradient-to-r from-[var(--bg-light)]/30 to-[var(--bg-light)]/10">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-4">
//                         <div className="w-14 h-14 bg-white rounded-lg p-2 shadow-sm border border-[var(--bg-light)]">
//                           <img
//                             src={`http://localhost:5000/uploads/${lab.logo}`}
//                             className="w-full h-full object-contain"
//                             alt={lab.name}
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = "https://cdn-icons-png.flaticon.com/512/2965/2965358.png";
//                             }}
//                           />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-bold text-[var(--secondary-color)]">{lab.name}</h3>
//                           <div className="flex items-center gap-1 text-sm text-[var(--accent-color)] mt-1">
//                             <FaMapMarkerAlt className="text-[var(--primary-color)]" />
//                             <span>{lab.branches || "Multiple locations"}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {lab.discount > 0 && (
//                       <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-3 py-1.5 rounded-lg shadow-sm">
//                         <span className="font-bold">{lab.discount}% OFF</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="p-5">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="flex items-center gap-2 bg-[var(--bg-light)]/40 text-[var(--secondary-color)] px-3 py-1.5 rounded-lg">
//                       <FaHome className="text-[var(--primary-color)]" />
//                       <span className="text-sm font-medium">FREE Home Collection</span>
//                     </div>
//                   </div>

//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center gap-2 text-sm text-[var(--accent-color)]">
//                       <FaCheck className="text-[var(--primary-color)] text-xs" />
//                       <span>Certified Diagnostic Lab</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-[var(--accent-color)]">
//                       <FaCheck className="text-[var(--primary-color)] text-xs" />
//                       <span>Expert Phlebotomists</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-[var(--accent-color)]">
//                       <FaCheck className="text-[var(--primary-color)] text-xs" />
//                       <span>Accurate Test Results</span>
//                     </div>
//                   </div>

//                   {/* Discount Info */}
//                   <div className="mb-4">
//                     {lab.discount > 0 ? (
//                       <div className="p-3 bg-gradient-to-r from-[var(--bg-light)]/20 to-[var(--bg-light)]/10 rounded-lg border border-[var(--bg-light)]">
//                         <div className="text-center">
//                           <div className="text-xs text-[var(--accent-color)] mb-1">Special Offer</div>
//                           <div className="text-lg font-bold text-[var(--primary-color)]">Flat {lab.discount}% OFF</div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="p-3 bg-[var(--bg-light)]/10 rounded-lg">
//                         <div className="text-center text-[var(--accent-color)]">
//                           <div className="font-medium">Standard Pricing</div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/labs/${lab._id}`);
//                     }}
//                     className="w-full py-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] hover:from-[var(--hover-color)] hover:to-[var(--primary-color)] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md"
//                   >
//                     <span>View All Tests</span>
//                     <FaArrowRight />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {labs.length === 0 && !loading && (
//             <div className="text-center py-12">
//               <div className="text-5xl mb-4 text-[var(--accent-color)]">🔬</div>
//               <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">No Labs Available</h3>
//               <p className="text-[var(--accent-color)]">We're adding more diagnostic centers soon.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Benefits Section */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-10">
//           Why Choose Home Collection?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="text-center p-6 hover:bg-[var(--bg-light)]/10 rounded-xl transition-all duration-300 border border-[var(--bg-light)] hover:shadow-sm">
//             <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="text-3xl text-[var(--primary-color)]">⏰</div>
//             </div>
//             <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">Save Time & Effort</h3>
//             <p className="text-[var(--accent-color)]">No travel, no waiting rooms. Get tested in the comfort of your home.</p>
//           </div>

//           <div className="text-center p-6 hover:bg-[var(--bg-light)]/10 rounded-xl transition-all duration-300 border border-[var(--bg-light)] hover:shadow-sm">
//             <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="text-3xl text-[var(--primary-color)]">🛡️</div>
//             </div>
//             <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">Safe & Sterile</h3>
//             <p className="text-[var(--accent-color)]">Hygienic procedures with disposable equipment for maximum safety.</p>
//           </div>

//           <div className="text-center p-6 hover:bg-[var(--bg-light)]/10 rounded-xl transition-all duration-300 border border-[var(--bg-light)] hover:shadow-sm">
//             <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="text-3xl text-[var(--primary-color)]">👨‍👩‍👧</div>
//             </div>
//             <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">Family Convenience</h3>
//             <p className="text-[var(--accent-color)]">Multiple family members can be tested together at home.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaArrowRight, FaHome, FaShieldAlt, FaClock, FaCheck, FaStethoscope } from "react-icons/fa";

export default function LabsPage() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/labs")
      .then((res) => {
        setLabs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--bg-light)]/10 to-white px-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[var(--bg-light)] border-t-[var(--primary-color)]"></div>
          <p className="mt-6 text-[var(--accent-color)] font-medium">Loading trusted diagnostic labs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-light)]/10 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white">
        <div className="max-w-7xl mx-auto px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Lab Tests Delivered to Your Doorstep
              </h1>
              <p className="text-xl mb-8 text-[var(--text-light)] max-w-3xl">
                Experience the future of healthcare with <span className="font-bold text-white">FREE HOME SAMPLE COLLECTION</span> from Pakistan's most trusted diagnostic labs.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-lg">
                  <FaHome className="text-lg" />
                  <span>Home Collection</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-lg">
                  <FaClock className="text-lg" />
                  <span>Same Day Service</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-lg">
                  <FaShieldAlt className="text-lg" />
                  <span>Safe & Sterile</span>
                </div>
              </div>
            </div>
            <div className="text-8xl text-[var(--text-light)]">
              <FaStethoscope className="inline-block" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-8 -mt-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-[var(--bg-light)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">{labs.length}</div>
            <div className="text-[var(--accent-color)] font-medium">Certified Labs</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-[var(--bg-light)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">24/7</div>
            <div className="text-[var(--accent-color)] font-medium">Booking Available</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-[var(--bg-light)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">FREE</div>
            <div className="text-[var(--accent-color)] font-medium">Home Collection</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-[var(--bg-light)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">70%</div>
            <div className="text-[var(--accent-color)] font-medium">Average Savings</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--secondary-color)] mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-[var(--accent-color)] text-lg max-w-2xl mx-auto">
            Get your lab tests done easily with our streamlined process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="relative">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--bg-light)] h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-white">{step}</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">
                  {index === 0 && "Book Online"}
                  {index === 1 && "Sample Collection"}
                  {index === 2 && "Lab Processing"}
                  {index === 3 && "Get Reports"}
                </h3>
                <p className="text-[var(--accent-color)] leading-relaxed">
                  {index === 0 && "Select tests & choose convenient time slot"}
                  {index === 1 && "Expert phlebotomist visits your home"}
                  {index === 2 && "Samples analyzed at certified labs"}
                  {index === 3 && "Digital reports delivered online"}
                </p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-[var(--bg-light)]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

   
<div className="bg-gradient-to-b from-white to-[var(--bg-light)]/20 py-16">
  <div className="max-w-7xl mx-auto px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[var(--secondary-color)] mb-4">
        Partner Diagnostic Labs
      </h2>
      <p className="text-[var(--accent-color)] text-lg max-w-2xl mx-auto">
        All offering <span className="font-bold text-[var(--primary-color)]">FREE home collection</span> with special discounts
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {labs.map((lab) => (
        <div
          key={lab._id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-[var(--bg-light)] flex flex-col"
        >
          <div className="p-6 bg-gradient-to-r from-[var(--bg-light)]/30 to-[var(--bg-light)]/10">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0"> {/* Added min-w-0 for text truncation */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg p-2 shadow-sm border border-[var(--bg-light)]">
                    <img
                      src={`http://localhost:5000/uploads/${lab.logo}`}
                      className="w-full h-full object-contain"
                      alt={lab.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://cdn-icons-png.flaticon.com/512/2965/2965358.png";
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1"> {/* Added text overflow handling */}
                    <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-1 truncate" title={lab.name}>
                      {lab.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--accent-color)]">
                      <FaMapMarkerAlt className="text-[var(--primary-color)] flex-shrink-0" />
                      <span className="truncate" title={lab.branches || "Multiple locations"}>
                        {lab.branches || "Multiple locations"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {lab.discount > 0 && (
                <div className="flex-shrink-0 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-3 py-1 rounded-lg">
                  <span className="font-bold text-sm whitespace-nowrap">{lab.discount}% OFF</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col"> {/* Added flex layout */}
            <div className="mb-6">
              <div className="flex items-center gap-2 bg-[var(--bg-light)]/30 text-[var(--secondary-color)] px-4 py-3 rounded-lg">
                <FaHome className="text-[var(--primary-color)] flex-shrink-0" />
                <span className="font-medium truncate">FREE Home Collection</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-[var(--accent-color)]">
                <FaCheck className="text-[var(--primary-color)] flex-shrink-0" />
                <span className="truncate">Certified Diagnostic Lab</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--accent-color)]">
                <FaCheck className="text-[var(--primary-color)] flex-shrink-0" />
                <span className="truncate">Expert Phlebotomists</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--accent-color)]">
                <FaCheck className="text-[var(--primary-color)] flex-shrink-0" />
                <span className="truncate">Accurate Test Results</span>
              </div>
            </div>

            {/* Discount Info */}
            {/* <div className="mb-6">
              {lab.discount > 0 ? (
                <div className="p-4 bg-gradient-to-r from-[var(--bg-light)]/20 to-[var(--bg-light)]/10 rounded-lg border border-[var(--bg-light)]">
                  <div className="text-center">
                    <div className="text-sm text-[var(--accent-color)] mb-2">Special Offer</div>
                    <div className="text-xl font-bold text-[var(--primary-color)] truncate">Flat {lab.discount}% OFF</div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[var(--bg-light)]/10 rounded-lg">
                  <div className="text-center text-[var(--accent-color)]">
                    <div className="font-medium">Standard Pricing</div>
                  </div>
                </div>
              )}
            </div> */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/labs/${lab._id}`);
              }}
              className="mt-auto w-full py-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] hover:from-[var(--hover-color)] hover:to-[var(--primary-color)] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <span>View All Tests</span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Empty State */}
    {labs.length === 0 && !loading && (
      <div className="text-center py-16">
        <div className="text-6xl mb-6 text-[var(--accent-color)]">🔬</div>
        <h3 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">No Labs Available</h3>
        <p className="text-[var(--accent-color)] text-lg">We're adding more diagnostic centers soon.</p>
      </div>
    )}
  </div>
</div>


      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--secondary-color)] mb-4">
            Why Choose Home Collection?
          </h2>
          <p className="text-[var(--accent-color)] text-lg max-w-2xl mx-auto">
            Experience healthcare convenience like never before
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-[var(--bg-light)] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl text-[var(--primary-color)]">⏰</div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">Save Time & Effort</h3>
            <p className="text-[var(--accent-color)] leading-relaxed">
              No travel, no waiting rooms. Get tested in the comfort of your home.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[var(--bg-light)] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl text-[var(--primary-color)]">🛡️</div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">Safe & Sterile</h3>
            <p className="text-[var(--accent-color)] leading-relaxed">
              Hygienic procedures with disposable equipment for maximum safety.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[var(--bg-light)] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl text-[var(--primary-color)]">👨‍👩‍👧</div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">Family Convenience</h3>
            <p className="text-[var(--accent-color)] leading-relaxed">
              Multiple family members can be tested together at home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


