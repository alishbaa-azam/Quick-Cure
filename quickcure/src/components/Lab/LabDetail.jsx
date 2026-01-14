// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import labs from "./LabData";
// import labTests from "./LabTestsData";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function LabDetail() {
//   const { id } = useParams();
//   const lab = labs.find((l) => l.id === Number(id));
//   const tests = labTests[id] || [];

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTests, setSelectedTests] = useState([]);

//   if (!lab) {
//     return (
//       <div className="flex justify-center items-center h-64 text-[var(--secondary-color)]">
//         Lab not found
//       </div>
//     );
//   }

//   // Filter tests based on search input
//   const filteredTests = tests.filter((test) =>
//     test.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle checkbox selection for multiple tests
//   const handleCheckboxChange = (testId) => {
//     setSelectedTests((prevSelected) =>
//       prevSelected.includes(testId)
//         ? prevSelected.filter((id) => id !== testId)
//         : [...prevSelected, testId]
//     );
//   };

//   // Calculate discounted price - FIXED
//   const calculateDiscountedPrice = (originalPrice, discount) => {
//     // Ensure discount is a number
//     const discountPercent =
//       typeof discount === "number" ? discount : parseInt(discount);
//     const discountAmount = (originalPrice * discountPercent) / 100;
//     return Math.round(originalPrice - discountAmount);
//   };

//   // Calculate total amounts - FIXED
//   const calculateTotal = () => {
//     const selectedTestDetails = tests.filter((t) =>
//       selectedTests.includes(t.id)
//     );

//     let totalOriginal = 0;
//     let totalDiscount = 0;

//     selectedTestDetails.forEach((test) => {
//       totalOriginal += test.price;
//       const discountPercent =
//         typeof test.discount === "number"
//           ? test.discount
//           : parseInt(test.discount);
//       totalDiscount += (test.price * discountPercent) / 100;
//     });

//     const totalFinal = totalOriginal - totalDiscount;

//     return {
//       original: Math.round(totalOriginal),
//       discount: Math.round(totalDiscount),
//       final: Math.round(totalFinal),
//       count: selectedTests.length,
//     };
//   };

//   const totals = calculateTotal();

//   const navigate = useNavigate();

//   const handleBookAppointment = () => {
//     if (selectedTests.length === 0) {
//       alert("Please select at least one test before booking an appointment!");
//       return;
//     }

//     navigate(`/labs/${lab.id}/booking`, { state: { selectedTests } });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       {/* ====== Header Section ====== */}
//       <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-[var(--bg-light)] rounded-xl shadow-sm border border-[var(--text-light)]">
//         <img
//           src={lab.logo}
//           alt={lab.name}
//           className="w-24 h-24 md:w-32 md:h-32 object-contain bg-[var(--white)] rounded-lg p-3 shadow-sm"
//         />
//         <div className="flex-1 text-center md:text-left">
//           <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary-color)] mb-2">
//             {lab.name}
//           </h1>
//           <p className="text-[var(--primary-color)] mb-4">{lab.branches}</p>
//           <button className="bg-[var(--primary-color)] text-[var(--white)] px-6 py-2 rounded-lg hover:bg-[var(--hover-color)] transition-colors font-medium">
//             Get {lab.discount} Discount
//           </button>
//         </div>
//       </div>

//       {/* ====== Search & Tests Section ====== */}
//       <div className="mt-8">
//         <h2 className="text-xl md:text-2xl font-bold text-[var(--secondary-color)] mb-6">
//           Lab Tests & Prices
//         </h2>

//         {/* Search Input */}
//         <div className="relative max-w-2xl mx-auto mb-8">
//           <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--accent-color)] text-lg" />
//           <input
//             type="text"
//             placeholder="Search Test Here..."
//             className="w-full pl-12 pr-4 py-3 border border-[var(--accent-color)] rounded-lg focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 text-[var(--secondary-color)] bg-[var(--white)]"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Total Summary Bar */}
//         {selectedTests.length > 0 && (
//           <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] text-[var(--white)] p-4 rounded-lg mb-6">
//             <div className="flex flex-wrap justify-between items-center">
//               <div>
//                 <h3 className="font-semibold">
//                   Selected {totals.count}{" "}
//                   {totals.count === 1 ? "Test" : "Tests"}
//                 </h3>
//                 <p className="text-sm opacity-90">
//                   Total savings: Rs. {totals.discount}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <div className="flex items-center gap-2 justify-end">
//                   <span className="text-sm line-through opacity-80">
//                     Rs. {totals.original}
//                   </span>
//                   <span className="text-lg font-bold">Rs. {totals.final}</span>
//                 </div>
//                 <p className="text-sm opacity-90">After discount</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Test Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTests.length > 0 ? (
//             filteredTests.map((test) => {
//               const discountedPrice = calculateDiscountedPrice(
//                 test.price,
//                 test.discount
//               );

//               return (
//                 <div
//                   key={test.id}
//                   className={`
//                     relative bg-[var(--white)] border rounded-xl p-4 cursor-pointer transition-all duration-300
//                     ${
//                       selectedTests.includes(test.id)
//                         ? "border-[var(--primary-color)] border-2 bg-[#f0f8f8] shadow-lg"
//                         : "border-[var(--bg-light)] hover:border-[var(--accent-color)] hover:shadow-md"
//                     }
//                   `}
//                   onClick={() => handleCheckboxChange(test.id)}
//                 >
//                   {/* Checkbox in top-right corner */}
//                   <input
//                     type="checkbox"
//                     className="absolute top-3 right-3 w-5 h-5 accent-[var(--primary-color)] cursor-pointer"
//                     checked={selectedTests.includes(test.id)}
//                     onChange={() => handleCheckboxChange(test.id)}
//                     onClick={(e) => e.stopPropagation()}
//                   />

//                   <div className="pr-6">
//                     <div className="mb-3">
//                       <h3 className="font-semibold text-[var(--secondary-color)] text-lg">
//                         {test.name}
//                       </h3>
//                     </div>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {test.description}
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <div className="flex flex-col">
//                         <div className="flex items-center gap-2">
//                           <span className="text-[var(--primary-color)] font-bold text-lg">
//                             Rs. {discountedPrice}
//                           </span>
//                           <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
//                             {test.discount}% OFF
//                           </span>
//                         </div>
//                         <span className="text-gray-500 text-sm line-through">
//                           Rs. {test.price}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="col-span-full text-center py-8 text-gray-500">
//               No tests found.
//             </div>
//           )}
//         </div>

//         {/* Book Appointment Button */}
//         <div className="text-center mt-8">
//           <button
//             className={`
//               px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300
//               ${
//                 selectedTests.length > 0
//                   ? "bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-[var(--white)] shadow-lg hover:shadow-xl transform hover:scale-105"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }
//             `}
//             onClick={handleBookAppointment}
//             disabled={selectedTests.length === 0}
//           >
//             {selectedTests.length > 0
//               ? `Book ${selectedTests.length} ${
//                   selectedTests.length === 1 ? "Test" : "Tests"
//                 } - Rs. ${totals.final}`
//               : "Book Appointment"}
//           </button>

//           {selectedTests.length > 0 && (
//             <p className="text-sm text-gray-600 mt-2">
//               You save Rs. {totals.discount} with discount
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTests, setSelectedTests] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/labs/${id}`).then((res) => {
//       setLab(res.data);
//     });

//     axios.get(`http://localhost:5000/api/labs/${id}/tests`).then((res) => {
//       setTests(res.data);
//     });
//   }, [id]);

//   if (!lab) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   const filteredTests = tests.filter((test) =>
//     test.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleSelect = (testId) => {
//     setSelectedTests((prev) =>
//       prev.includes(testId)
//         ? prev.filter((x) => x !== testId)
//         : [...prev, testId]
//     );
//   };

//   const calculateDiscountedPrice = (price, discount) => {
//     const d = parseInt(discount);
//     return Math.round(price - (price * d) / 100);
//   };

//   const calculateTotals = () => {
//     const selected = tests.filter((t) => selectedTests.includes(t._id));
//     let original = 0;
//     let discount = 0;

//     selected.forEach((t) => {
//       original += t.price;
//       discount += (t.price * t.discount) / 100;
//     });

//     return {
//       original: Math.round(original),
//       discount: Math.round(discount),
//       final: Math.round(original - discount),
//       count: selected.length,
//     };
//   };

//   const totals = calculateTotals();

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       {/* Lab Header */}
//       <div className="p-6 bg-gray-100 rounded-xl flex gap-6">
//         <img src={lab.logo} className="w-28 h-28 object-contain bg-white p-2 rounded" />
//         <div>
//           <h1 className="text-2xl font-bold">{lab.name}</h1>
//           <p>{lab.branches}</p>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
//             Get {lab.discount}% Discount
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="relative mt-8 max-w-xl mx-auto">
//         <FaSearch className="absolute left-4 top-3 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search Test..."
//           className="w-full border rounded-lg py-2 pl-10 pr-4"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Total Bar */}
//       {selectedTests.length > 0 && (
//         <div className="bg-blue-600 text-white p-4 rounded-lg mt-6 flex justify-between">
//           <div>Selected {totals.count} tests</div>
//           <div>
//             <s>Rs {totals.original}</s> →{" "}
//             <strong>Rs {totals.final}</strong>
//           </div>
//         </div>
//       )}

//       {/* Tests Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {filteredTests.map((test) => (
//           <div
//             key={test._id}
//             onClick={() => toggleSelect(test._id)}
//             className={`p-4 border rounded-xl cursor-pointer ${
//               selectedTests.includes(test._id)
//                 ? "border-blue-600 bg-blue-50"
//                 : "border-gray-200"
//             }`}
//           >
//             <input
//               type="checkbox"
//               checked={selectedTests.includes(test._id)}
//               className="float-right"
//               onChange={() => toggleSelect(test._id)}
//             />
//             <h3 className="text-lg font-semibold">{test.name}</h3>
//             <p className="text-sm">{test.description}</p>
//             <div className="mt-2">
//               <strong>Rs {calculateDiscountedPrice(test.price, test.discount)}</strong>
//               <s className="text-gray-500 ml-2">Rs {test.price}</s>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-8">
//         <button
//           disabled={selectedTests.length === 0}
//           onClick={() =>
//             navigate(`/labs/${id}/booking`, { state: { selectedTests } })
//           }
//           className={`px-8 py-3 rounded-lg ${
//             selectedTests.length
//               ? "bg-blue-600 text-white"
//               : "bg-gray-300 text-gray-500"
//           }`}
//         >
//           Book Tests – Rs {totals.final}
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTests, setSelectedTests] = useState([]);

//   useEffect(() => {
//     // Load Lab Data
//     axios.get(`http://localhost:5000/api/labs/${id}`).then((res) => {
//       setLab(res.data);
//     });

//     // Load Tests According to Lab ID
//     axios.get(`http://localhost:5000/api/tests/lab/${id}`).then((res) => {
//       setTests(res.data);
//     });
//   }, [id]);

//   if (!lab) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   const filteredTests = tests.filter((test) =>
//     test.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleSelect = (testId) => {
//     setSelectedTests((prev) =>
//       prev.includes(testId)
//         ? prev.filter((x) => x !== testId)
//         : [...prev, testId]
//     );
//   };

//   const calculateDiscountedPrice = (price, discount) => {
//     const d = parseInt(discount);
//     return Math.round(price - (price * d) / 100);
//   };

//   const calculateTotals = () => {
//     const selected = tests.filter((t) => selectedTests.includes(t._id));
//     let original = 0;
//     let discount = 0;

//     selected.forEach((t) => {
//       original += t.price;
//       discount += (t.price * t.discount) / 100;
//     });

//     return {
//       original: Math.round(original),
//       discount: Math.round(discount),
//       final: Math.round(original - discount),
//       count: selected.length,
//     };
//   };

//   const totals = calculateTotals();

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">

//       {/* Lab Header */}
//       <div className="p-6 bg-gray-100 rounded-xl flex gap-6">
//         <img src={lab.logo} className="w-28 h-28 object-contain bg-white p-2 rounded" />
//         <div>
//           <h1 className="text-2xl font-bold">{lab.name}</h1>
//           <p>{lab.branches}</p>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
//             Get {lab.discount}% Discount
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="relative mt-8 max-w-xl mx-auto">
//         <FaSearch className="absolute left-4 top-3 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search Test..."
//           className="w-full border rounded-lg py-2 pl-10 pr-4"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Total Bar */}
//       {selectedTests.length > 0 && (
//         <div className="bg-blue-600 text-white p-4 rounded-lg mt-6 flex justify-between">
//           <div>Selected {totals.count} tests</div>
//           <div>
//             <s>Rs {totals.original}</s> →{" "}
//             <strong>Rs {totals.final}</strong>
//           </div>
//         </div>
//       )}

//       {/* Tests Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {filteredTests.map((test) => (
//           <div
//             key={test._id}
//             onClick={() => toggleSelect(test._id)}
//             className={`p-4 border rounded-xl cursor-pointer ${
//               selectedTests.includes(test._id)
//                 ? "border-blue-600 bg-blue-50"
//                 : "border-gray-200"
//             }`}
//           >
//             <input
//               type="checkbox"
//               checked={selectedTests.includes(test._id)}
//               className="float-right"
//               onChange={() => toggleSelect(test._id)}
//             />
//             <h3 className="text-lg font-semibold">{test.name}</h3>
//             <p className="text-sm">{test.description}</p>
//             <div className="mt-2">
//               <strong>
//                 Rs {calculateDiscountedPrice(test.price, test.discount)}
//               </strong>
//               <s className="text-gray-500 ml-2">Rs {test.price}</s>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-8">
//         <button
//           disabled={selectedTests.length === 0}
//           onClick={() =>
//             navigate(`/labs/${id}/booking`, { state: { selectedTests } })
//           }
//           className={`px-8 py-3 rounded-lg ${
//             selectedTests.length
//               ? "bg-blue-600 text-white"
//               : "bg-gray-300 text-gray-500"
//           }`}
//         >
//           Book Tests – Rs {totals.final}
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [lab, setLab] = useState(null);
//  const [tests, setTests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTests, setSelectedTests] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/labs/${id}`).then((res) => {
//       setLab(res.data);
//     });

//     axios.get(`http://localhost:5000/api/tests/lab/${id}`).then((res) => {
//       setTests(res.data);
//     });
//   }, [id]);

//   if (!lab) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   const filteredTests = tests.filter((test) =>
//     test.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleSelect = (testId) => {
//     setSelectedTests((prev) =>
//       prev.includes(testId)
//         ? prev.filter((x) => x !== testId)
//         : [...prev, testId]
//     );
//   };

//   const calculateDiscountedPrice = (price, discount) => {
//     const d = parseInt(discount);
//     return Math.round(price - (price * d) / 100);
//   };

//   const calculateTotals = () => {
//     const selected = tests.filter((t) => selectedTests.includes(t._id));
//     let original = 0;
//     let discount = 0;

//     selected.forEach((t) => {
//       original += t.price;
//       discount += (t.price * t.discount) / 100;
//     });

//     return {
//       original: Math.round(original),
//       discount: Math.round(discount),
//       final: Math.round(original - discount),
//       count: selected.length,
//     };
//   };

//   const totals = calculateTotals();

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">

//       {/* Lab Header */}
//       <div
//         className="p-6 rounded-xl flex gap-6"
//         style={{ backgroundColor: "var(--bg-light)" }}
//       >
//         <img
//           src={lab.logo}
//           className="w-28 h-28 object-contain bg-white p-2 rounded"
//         />
//         <div>
//           <h1 className="text-2xl font-bold" style={{ color: "var(--secondary-color)" }}>
//             {lab.name}
//           </h1>
//           <p style={{ color: "var(--accent-color)" }}>{lab.branches}</p>

//           <button
//             className="px-4 py-2 rounded mt-2 text-white"
//             style={{
//               backgroundColor: "var(--primary-color)",
//             }}
//           >
//             Get {lab.discount}% Discount
//           </button>
//         </div>
//       </div>

//       {/* Search Box */}
//       <div className="relative mt-8 max-w-xl mx-auto">
//         <FaSearch
//           className="absolute left-4 top-3"
//           style={{ color: "var(--accent-color)" }}
//         />

//         <input
//           type="text"
//           placeholder="Search Test..."
//           className="w-full border rounded-lg py-2 pl-10 pr-4"
//           style={{
//             borderColor: "var(--accent-color)",
//             color: "var(--secondary-color)",
//           }}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Total Bar */}
//       {selectedTests.length > 0 && (
//         <div
//           className="p-4 rounded-lg mt-6 flex justify-between"
//           style={{
//             backgroundColor: "var(--primary-color)",
//             color: "var(--white)",
//           }}
//         >
//           <div>Selected {totals.count} tests</div>

//           <div>
//             <s>Rs {totals.original}</s> →{" "}
//             <strong>Rs {totals.final}</strong>
//           </div>
//         </div>
//       )}

//       {/* Tests Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {filteredTests.map((test) => (
//           <div
//             key={test._id}
//             onClick={() => toggleSelect(test._id)}
//             className="p-4 border rounded-xl cursor-pointer"
//             style={{
//               borderColor: selectedTests.includes(test._id)
//                 ? "var(--primary-color)"
//                 : "var(--accent-color)",
//               backgroundColor: selectedTests.includes(test._id)
//                 ? "var(--bg-light)"
//                 : "var(--white)",
//             }}
//           >
//             <input
//               type="checkbox"
//               checked={selectedTests.includes(test._id)}
//               className="float-right"
//               onChange={() => toggleSelect(test._id)}
//             />

//             <h3
//               className="text-lg font-semibold"
//               style={{ color: "var(--secondary-color)" }}
//             >
//               {test.name}
//             </h3>

//             <p style={{ color: "var(--accent-color)" }}>{test.description}</p>

//             <div className="mt-2">
//               <strong style={{ color: "var(--secondary-color)" }}>
//                 Rs {calculateDiscountedPrice(test.price, test.discount)}
//               </strong>

//               <s className="ml-2" style={{ color: "var(--accent-color)" }}>
//                 Rs {test.price}
//               </s>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Book Button */}
//       <div className="text-center mt-8">
//         <button
//           disabled={selectedTests.length === 0}
//           onClick={() =>
//             navigate(`/labs/${id}/booking`, { state: { selectedTests } })
//           }
//           className="px-8 py-3 rounded-lg"
//           style={{
//             backgroundColor: selectedTests.length
//               ? "var(--primary-color)"
//               : "var(--accent-color)",
//             color: "white",
//             cursor: selectedTests.length ? "pointer" : "not-allowed",
//           }}
//         >
//           Book Tests – Rs {totals.final}
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTests, setSelectedTests] = useState(() => {
//     // try to restore from localStorage so user doesn't lose selection
//     try {
//       const s = localStorage.getItem(`selectedTests_lab_${id}`);
//       return s ? JSON.parse(s) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     let mounted = true;

//     const load = async () => {
//       try {
//         const [labRes, testsRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/labs/${id}`),
//           axios.get(`http://localhost:5000/api/tests/lab/${id}`),
//         ]);
//         if (!mounted) return;
//         setLab(labRes.data);
//         setTests(Array.isArray(testsRes.data) ? testsRes.data : []);
//       } catch (err) {
//         console.error("Error loading lab/tests:", err);
//         // optional fallback if you keep local data: setLab(localLab) etc.
//       }
//     };

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   useEffect(() => {
//     // persist selection for this lab so user won't lose it on accidental refresh
//     try {
//       localStorage.setItem(`selectedTests_lab_${id}`, JSON.stringify(selectedTests));
//     } catch {}
//   }, [selectedTests, id]);

//   if (!lab) return <div className="text-center py-10">Loading...</div>;

//   const filteredTests = tests.filter((test) =>
//     (test.name || "").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleSelect = (testId) => {
//     setSelectedTests((prev) =>
//       prev.includes(testId) ? prev.filter((x) => x !== testId) : [...prev, testId]
//     );
//   };

//   const calculateDiscountedPrice = (price, discount) => {
//     const p = Number(price) || 0;
//     const d = Number(discount) || 0;
//     if (d <= 0) return Math.round(p);
//     return Math.round(p - (p * d) / 100);
//   };

//   const calculateTotals = () => {
//     const selected = tests.filter((t) => selectedTests.includes(t._id));
//     let original = 0;
//     let discount = 0;

//     selected.forEach((t) => {
//       const p = Number(t.price) || 0;
//       const d = Number(t.discount) || 0;
//       original += p;
//       discount += (p * d) / 100;
//     });

//     const final = Math.round(original - discount);
//     return {
//       original: Math.round(original),
//       discount: Math.round(discount),
//       final,
//       count: selected.length,
//     };
//   };

//   const totals = calculateTotals();

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       {/* Lab Header */}
//       <div className="p-6 rounded-xl flex gap-6" style={{ backgroundColor: "var(--bg-light)" }}>
//         <img src={`http://localhost:5000/uploads/${lab.logo}`} className="w-28 h-28 object-contain bg-white p-2 rounded" alt={lab.name} />
//         <div>
//           <h1 className="text-2xl font-bold" style={{ color: "var(--secondary-color)" }}>
//             {lab.name}
//           </h1>
//           <p style={{ color: "var(--accent-color)" }}>{lab.branches}</p>

//           <button
//             className="px-4 py-2 rounded mt-2 text-white"
//             style={{ backgroundColor: "var(--primary-color)" }}
//           >
//             Get {lab.discount}% Discount
//           </button>
//         </div>
//       </div>

//       {/* Search Box */}
//       <div className="relative mt-8 max-w-xl mx-auto">
//         <FaSearch className="absolute left-4 top-3" style={{ color: "var(--accent-color)" }} />
//         <input
//           type="text"
//           placeholder="Search Test..."
//           className="w-full border rounded-lg py-2 pl-10 pr-4"
//           style={{ borderColor: "var(--accent-color)", color: "var(--secondary-color)" }}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Total Bar */}
//       {selectedTests.length > 0 && (
//         <div
//           className="p-4 rounded-lg mt-6 flex justify-between"
//           style={{ backgroundColor: "var(--primary-color)", color: "var(--white)" }}
//         >
//           <div>Selected {totals.count} tests</div>

//           <div>
//             <s>Rs {totals.original}</s> → <strong>Rs {totals.final}</strong>
//           </div>
//         </div>
//       )}

//       {/* Tests Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {filteredTests.map((test) => {
//           const checked = selectedTests.includes(test._id);
//           return (
//             <div
//               key={test._id}
//               onClick={() => toggleSelect(test._id)}
//               className="p-4 border rounded-xl cursor-pointer"
//               style={{
//                 borderColor: checked ? "var(--primary-color)" : "var(--accent-color)",
//                 backgroundColor: checked ? "var(--bg-light)" : "var(--white)",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 checked={checked}
//                 className="float-right"
//                 onChange={(e) => {
//                   // prevent parent onClick from toggling twice
//                   e.stopPropagation();
//                   toggleSelect(test._id);
//                 }}
//               />

//               <h3 className="text-lg font-semibold" style={{ color: "var(--secondary-color)" }}>
//                 {test.name}
//               </h3>

//               <p style={{ color: "var(--accent-color)" }}>{test.description}</p>

//               <div className="mt-2">
//                 <strong style={{ color: "var(--secondary-color)" }}>
//                   Rs {calculateDiscountedPrice(test.price, test.discount)}
//                 </strong>

//                 <s className="ml-2" style={{ color: "var(--accent-color)" }}>
//                   Rs {test.price}
//                 </s>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Book Button */}
//       <div className="text-center mt-8">
//         <button
//           disabled={selectedTests.length === 0}
//           onClick={() => {
//             // pass selectedTests array of ids to booking page
//             navigate(`/labs/${id}/booking`, { state: { selectedTests } });
//           }}
//           className="px-8 py-3 rounded-lg"
//           style={{
//             backgroundColor: selectedTests.length ? "var(--primary-color)" : "var(--accent-color)",
//             color: "white",
//             cursor: selectedTests.length ? "pointer" : "not-allowed",
//           }}
//         >
//           Book Tests – Rs {totals.final}
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaSearch, FaTag } from "react-icons/fa";

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTests, setSelectedTests] = useState(() => {
//     try {
//       const s = localStorage.getItem(`selectedTests_lab_${id}`);
//       return s ? JSON.parse(s) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     const load = async () => {
//       const [labRes, testsRes] = await Promise.all([
//         axios.get(`http://localhost:5000/api/labs/${id}`),
//         axios.get(`http://localhost:5000/api/tests/lab/${id}`),
//       ]);
//       setLab(labRes.data);
//       setTests(testsRes.data || []);
//     };
//     load();
//   }, [id]);

//   useEffect(() => {
//     localStorage.setItem(
//       `selectedTests_lab_${id}`,
//       JSON.stringify(selectedTests)
//     );
//   }, [selectedTests, id]);

//   if (!lab) return <div className="text-center py-10">Loading...</div>;

//   // ✅ LAB discount applied everywhere
//   const getDiscountedPrice = (price) => {
//     const p = Number(price) || 0;
//     const d = Number(lab.discount) || 0;
//     return Math.round(p - (p * d) / 100);
//   };

//   const filteredTests = tests.filter((t) =>
//     t.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleSelect = (testId) => {
//     setSelectedTests((prev) =>
//       prev.includes(testId)
//         ? prev.filter((x) => x !== testId)
//         : [...prev, testId]
//     );
//   };

//   const totals = () => {
//     let original = 0;
//     let final = 0;

//     tests
//       .filter((t) => selectedTests.includes(t._id))
//       .forEach((t) => {
//         original += Number(t.price);
//         final += getDiscountedPrice(t.price);
//       });

//     return { original, final };
//   };

//   const total = totals();

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       {/* LAB CARD */}
//       <div className="bg-white shadow rounded-xl p-6 flex gap-6 items-center">
//         <img
//           src={`http://localhost:5000/uploads/${lab.logo}`}
//           className="w-24 h-24 object-contain border rounded"
//           alt={lab.name}
//         />
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold">{lab.name}</h1>
//           <p className="text-gray-500">{lab.branches}</p>

//           <span className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
//             <FaTag /> {lab.discount}% OFF on all tests
//           </span>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="relative mt-8 max-w-xl mx-auto">
//         <FaSearch className="absolute left-4 top-3 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search test"
//           className="w-full border rounded-lg py-2 pl-10 pr-4"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* TOTAL BAR */}
//       {selectedTests.length > 0 && (
//         <div className="mt-6 bg-indigo-600 text-white p-4 rounded-lg flex justify-between">
//           <div>{selectedTests.length} Tests Selected</div>
//           <div>
//             <s className="opacity-80">Rs {total.original}</s>{" "}
//             <strong>Rs {total.final}</strong>
//           </div>
//         </div>
//       )}

//       {/* TESTS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {filteredTests.map((test) => {
//           const checked = selectedTests.includes(test._id);
//           return (
//             <div
//               key={test._id}
//               onClick={() => toggleSelect(test._id)}
//               className={`p-5 border rounded-xl cursor-pointer transition
//                 ${checked ? "border-indigo-600 bg-indigo-50" : "hover:shadow"}
//               `}
//             >
//               <input
//                 type="checkbox"
//                 checked={checked}
//                 className="float-right"
//                 onChange={(e) => e.stopPropagation()}
//               />

//               <h3 className="text-lg font-semibold">{test.name}</h3>
//               <p className="text-gray-500 text-sm">{test.description}</p>

//               <div className="mt-3">
//                 <span className="text-xl font-bold text-indigo-600">
//                   Rs {getDiscountedPrice(test.price)}
//                 </span>
//                 <s className="ml-2 text-gray-400">
//                   Rs {test.price}
//                 </s>
//               </div>

//               <p className="text-xs text-green-600 mt-1">
//                 {lab.discount}% lab discount applied
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       {/* BOOK */}
//       <div className="text-center mt-10">
//         <button
//           disabled={!selectedTests.length}
//           onClick={() =>
//             navigate(`/labs/${id}/booking`, {
//               state: { selectedTests },
//             })
//           }
//           className={`px-10 py-3 rounded-lg text-white text-lg
//             ${selectedTests.length ? "bg-indigo-600" : "bg-gray-400"}
//           `}
//         >
//           Book Tests – Rs {total.final}
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaSearch, FaTag, FaCheckCircle } from "react-icons/fa";

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTests, setSelectedTests] = useState(() => {
//     try {
//       const s = localStorage.getItem(`selectedTests_lab_${id}`);
//       return s ? JSON.parse(s) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     Promise.all([
//       axios.get(`http://localhost:5000/api/labs/${id}`),
//       axios.get(`http://localhost:5000/api/tests/lab/${id}`),
//     ]).then(([labRes, testsRes]) => {
//       setLab(labRes.data);
//       setTests(testsRes.data || []);
//     });
//   }, [id]);

//   useEffect(() => {
//     localStorage.setItem(
//       `selectedTests_lab_${id}`,
//       JSON.stringify(selectedTests)
//     );
//   }, [selectedTests, id]);

//   if (!lab) return <div className="text-center py-20">Loading...</div>;

//   const getDiscountedPrice = (price) =>
//     Math.round(price - (price * lab.discount) / 100);

//   const filteredTests = tests.filter((t) =>
//     t.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleSelect = (testId) => {
//     setSelectedTests((prev) =>
//       prev.includes(testId)
//         ? prev.filter((x) => x !== testId)
//         : [...prev, testId]
//     );
//   };

//   const total = filteredTests.reduce(
//     (acc, t) => {
//       if (selectedTests.includes(t._id)) {
//         acc.original += Number(t.price);
//         acc.final += getDiscountedPrice(t.price);
//       }
//       return acc;
//     },
//     { original: 0, final: 0 }
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 pb-32">

//       {/* LAB HEADER */}
//       <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white flex items-center gap-6 shadow-lg">
//         <img
//           src={`http://localhost:5000/uploads/${lab.logo}`}
//           className="w-24 h-24 bg-white rounded-xl object-contain p-2"
//           alt={lab.name}
//         />
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold">{lab.name}</h1>
//           <p className="opacity-90">{lab.branches}</p>
//           <span className="inline-flex items-center gap-2 mt-3 bg-white/20 px-4 py-1 rounded-full text-sm">
//             <FaTag /> {lab.discount}% OFF on all tests
//           </span>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="mt-10 max-w-lg mx-auto relative">
//         <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search medical test..."
//           className="w-full border rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* TEST LIST */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//         {filteredTests.map((test) => {
//           const checked = selectedTests.includes(test._id);
//           return (
//             <div
//               key={test._id}
//               onClick={() => toggleSelect(test._id)}
//               className={`relative p-6 rounded-2xl border cursor-pointer transition-all
//                 ${checked
//                   ? "border-indigo-600 bg-indigo-50 shadow-lg"
//                   : "hover:shadow-md bg-white"}
//               `}
//             >
//               {checked && (
//                 <FaCheckCircle className="absolute top-4 right-4 text-indigo-600 text-xl" />
//               )}

//               <h3 className="text-lg font-semibold">{test.name}</h3>
//               <p className="text-gray-500 text-sm mt-1">
//                 {test.description}
//               </p>

//               <div className="flex items-end gap-3 mt-4">
//                 <span className="text-2xl font-bold text-indigo-600">
//                   Rs {getDiscountedPrice(test.price)}
//                 </span>
//                 <s className="text-gray-400 text-sm">
//                   Rs {test.price}
//                 </s>
//               </div>

//               <span className="inline-block mt-2 text-xs text-green-600">
//                 {lab.discount}% lab discount applied
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       {/* STICKY TOTAL BAR */}
//       {selectedTests.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-xl p-4 z-50">
//           <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <div>
//               <p className="font-semibold">
//                 {selectedTests.length} Tests Selected
//               </p>
//               <p className="text-sm text-gray-500">
//                 <s>Rs {total.original}</s> →{" "}
//                 <span className="text-indigo-600 font-bold">
//                   Rs {total.final}
//                 </span>
//               </p>
//             </div>
//             <button
//               onClick={() =>
//                 navigate(`/labs/${id}/booking`, {
//                   state: { selectedTests },
//                 })
//               }
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"
//             >
//               Book Now
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTag, FaCheckCircle } from "react-icons/fa";

export default function LabDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lab, setLab] = useState(null);
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTests, setSelectedTests] = useState(() => {
    try {
      const s = localStorage.getItem(`selectedTests_lab_${id}`);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:5000/api/labs/${id}`),
      axios.get(`http://localhost:5000/api/tests/lab/${id}`),
    ]).then(([labRes, testsRes]) => {
      setLab(labRes.data);
      setTests(testsRes.data || []);
    });
  }, [id]);

  useEffect(() => {
    localStorage.setItem(
      `selectedTests_lab_${id}`,
      JSON.stringify(selectedTests)
    );
  }, [selectedTests, id]);

  if (!lab) return <div className="text-center py-24">Loading...</div>;

  const getDiscountedPrice = (price) =>
    Math.round(price - (price * lab.discount) / 100);

  const filteredTests = tests.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (testId) => {
    setSelectedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((x) => x !== testId)
        : [...prev, testId]
    );
  };

  const total = filteredTests.reduce(
    (acc, t) => {
      if (selectedTests.includes(t._id)) {
        acc.original += Number(t.price);
        acc.final += getDiscountedPrice(t.price);
      }
      return acc;
    },
    { original: 0, final: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-36">

      {/* LAB HEADER */}
      <div
        className="mt-8 rounded-3xl p-8 flex items-center gap-6 shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
          color: "var(--white)",
        }}
      >
        <img
          src={`http://localhost:5000/uploads/${lab.logo}`}
          className="w-24 h-24 bg-whitet-white rounded-2xl object-contain p-3 shadow-md"
          alt={lab.name}
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{lab.name}</h1>
          <p className="opacity-90 mt-1">{lab.branches}</p>

          <span
            className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <FaTag /> {lab.discount}% Discount on all tests
          </span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mt-12 max-w-xl mx-auto  relative">
        <FaSearch className="absolute left-4 top-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search medical tests"
          className="w-full rounded-2xl py-3.5 pl-12 pr-4 outline-none border
                     focus:ring-2"
          style={{
            borderColor: "var(--accent-color)",
            background: "var(--accent-soft)",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TEST CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredTests.map((test) => {
          const checked = selectedTests.includes(test._id);

          return (
            <div
              key={test._id}
              onClick={() => toggleSelect(test._id)}
              className="relative p-6 rounded-3xl cursor-pointer transition-all duration-300"
              style={{
                background: checked
                  ? "var(--primary-soft)"
                  : "var(--white)",
                border: checked
                  ? "2px solid var(--primary-color)"
                  : "1px solid #e5e7eb",
              }}
            >
              {checked && (
                <FaCheckCircle
                  className="absolute top-4 right-4 text-xl"
                  style={{ color: "var(--primary-color)" }}
                />
              )}

              <h3 className="text-lg font-semibold text-gray-800">
                {test.name}
              </h3>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {test.description}
              </p>

              <div className="flex items-end gap-3 mt-5">
                <span
                  className="text-2xl font-bold"
                  style={{ color: "var(--primary-color)" }}
                >
                  Rs {getDiscountedPrice(test.price)}
                </span>

                <s className="text-gray-400 text-sm">
                  Rs {test.price}
                </s>
              </div>

              {/* <span
                className="inline-block mt-3 text-xs font-medium"
                style={{ color: "var(--primary-color)" }}
              >
                {lab.discount}% discount
              </span> */}
              <span
  className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 text-xs font-semibold rounded-full"
  style={{
    backgroundColor: "var(--primary-soft)",
    color: "var(--primary-color)",
    border: "1px solid var(--accent-color)",
  }}
>
  <FaTag className="text-[11px]" />
  {lab.discount}% Discount
</span>

            </div>
          );
        })}
      </div>

      {/* STICKY TOTAL BAR */}
      {selectedTests.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-2xl"
             style={{ background: "var(--white)" }}>
          <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
            <div>
              <p className="font-semibold text-gray-800">
                {selectedTests.length} Tests Selected
              </p>
              <p className="text-sm text-gray-500">
                <s>Rs {total.original}</s> →{" "}
                <span
                  className="font-bold"
                  style={{ color: "var(--primary-color)" }}
                >
                  Rs {total.final}
                </span>
              </p>
            </div>

            <button
              onClick={() =>
                navigate(`/labs/${id}/booking`, {
                  state: { selectedTests },
                })
              }
              className="px-8 py-3 rounded-2xl font-semibold text-white transition"
              style={{
                background: "var(--primary-color)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background =
                  "var(--hover-color)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  "var(--primary-color)")
              }
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
