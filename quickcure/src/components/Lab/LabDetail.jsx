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

//   if (!lab) return <div className="text-center py-24">Loading...</div>;

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
//     <div className="max-w-7xl mx-auto px-4 pb-36">

//       {/* LAB HEADER */}
//       <div
//         className="mt-8 rounded-3xl p-8 flex items-center gap-6 shadow-xl"
//         style={{
//           background:
//             "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
//           color: "var(--white)",
//         }}
//       >
//         <img
//           src={`http://localhost:5000/uploads/${lab.logo}`}
//           className="w-24 h-24 bg-whitet-white rounded-2xl object-contain p-3 shadow-md"
//           alt={lab.name}
//         />

//         <div className="flex-1">
//           <h1 className="text-3xl font-bold tracking-tight">{lab.name}</h1>
//           <p className="opacity-90 mt-1">{lab.branches}</p>

//           <span
//             className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm"
//             style={{ background: "rgba(255,255,255,0.2)" }}
//           >
//             <FaTag /> {lab.discount}% Discount on all tests
//           </span>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="mt-12 max-w-xl mx-auto  relative">
//         <FaSearch className="absolute left-4 top-4 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search medical tests"
//           className="w-full rounded-2xl py-3.5 pl-12 pr-4 outline-none border
//                      focus:ring-2"
//           style={{
//             borderColor: "var(--accent-color)",
//             background: "var(--accent-soft)",
//           }}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* TEST CARDS */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
//         {filteredTests.map((test) => {
//           const checked = selectedTests.includes(test._id);

//           return (
//             <div
//               key={test._id}
//               onClick={() => toggleSelect(test._id)}
//               className="relative p-6 rounded-3xl cursor-pointer transition-all duration-300"
//               style={{
//                 background: checked
//                   ? "var(--primary-soft)"
//                   : "var(--white)",
//                 border: checked
//                   ? "2px solid var(--primary-color)"
//                   : "1px solid #e5e7eb",
//               }}
//             >
//               {checked && (
//                 <FaCheckCircle
//                   className="absolute top-4 right-4 text-xl"
//                   style={{ color: "var(--primary-color)" }}
//                 />
//               )}

//               <h3 className="text-lg font-semibold text-gray-800">
//                 {test.name}
//               </h3>

//               <p className="text-sm text-gray-600 mt-2 line-clamp-2">
//                 {test.description}
//               </p>

//               <div className="flex items-end gap-3 mt-5">
//                 <span
//                   className="text-2xl font-bold"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   Rs {getDiscountedPrice(test.price)}
//                 </span>

//                 <s className="text-gray-400 text-sm">
//                   Rs {test.price}
//                 </s>
//               </div>

//               {/* <span
//                 className="inline-block mt-3 text-xs font-medium"
//                 style={{ color: "var(--primary-color)" }}
//               >
//                 {lab.discount}% discount
//               </span> */}
//               <span
//   className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 text-xs font-semibold rounded-full"
//   style={{
//     backgroundColor: "var(--primary-soft)",
//     color: "var(--primary-color)",
//     border: "1px solid var(--accent-color)",
//   }}
// >
//   <FaTag className="text-[11px]" />
//   {lab.discount}% Discount
// </span>

//             </div>
//           );
//         })}
//       </div>

//       {/* STICKY TOTAL BAR */}
//       {selectedTests.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-2xl"
//              style={{ background: "var(--white)" }}>
//           <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
//             <div>
//               <p className="font-semibold text-gray-800">
//                 {selectedTests.length} Tests Selected
//               </p>
//               <p className="text-sm text-gray-500">
//                 <s>Rs {total.original}</s> →{" "}
//                 <span
//                   className="font-bold"
//                   style={{ color: "var(--primary-color)" }}
//                 >
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
//               className="px-8 py-3 rounded-2xl font-semibold text-white transition"
//               style={{
//                 background: "var(--primary-color)",
//               }}
//               onMouseOver={(e) =>
//                 (e.currentTarget.style.background =
//                   "var(--hover-color)")
//               }
//               onMouseOut={(e) =>
//                 (e.currentTarget.style.background =
//                   "var(--primary-color)")
//               }
//             >
//               Book Now
//             </button>
//           </div>
//         </div>
//       )}
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

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { FaSearch, FaTag, FaCheckCircle } from "react-icons/fa";

// // ✅ ADDED: Check login function
// const checkUserLoggedIn = () => {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   return !!(token && user);
// };

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ ADDED: For getting current path

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

//   // ✅ ADDED: Track login state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // ✅ ADDED: Check login status on component mount and when storage changes
//   useEffect(() => {
//     const checkLogin = () => {
//       setIsLoggedIn(checkUserLoggedIn());
//     };
    
//     // Initial check
//     checkLogin();
    
//     // Listen for login/logout events from other tabs
//     const handleStorageChange = () => {
//       checkLogin();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     // Also check when page gains focus
//     window.addEventListener('focus', checkLogin);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('focus', checkLogin);
//     };
//   }, []);

//   // ✅ ADDED: Clear selected tests when user changes (for multi-user support)
//   useEffect(() => {
//     const handleUserChange = () => {
//       // Get current user from localStorage
//       const currentUser = localStorage.getItem("user");
//       const storedUserKey = `currentUser_lab_${id}`;
//       const lastUser = localStorage.getItem(storedUserKey);
      
//       // If user has changed (or logged out), clear selected tests
//       if (currentUser !== lastUser) {
//         setSelectedTests([]);
//         localStorage.removeItem(`selectedTests_lab_${id}`);
        
//         // Update stored user
//         if (currentUser) {
//           localStorage.setItem(storedUserKey, currentUser);
//         } else {
//           localStorage.removeItem(storedUserKey);
//         }
//       }
//     };
    
//     handleUserChange();
//   }, [id]);

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
//     // Only save if user is logged in
//     if (isLoggedIn) {
//       localStorage.setItem(
//         `selectedTests_lab_${id}`,
//         JSON.stringify(selectedTests)
//       );
//     }
//   }, [selectedTests, id, isLoggedIn]);

//   if (!lab) return <div className="text-center py-24">Loading...</div>;

//   const getDiscountedPrice = (price) =>
//     Math.round(price - (price * lab.discount) / 100);

//   const filteredTests = tests.filter((t) =>
//     t.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleSelect = (testId) => {
//     // ✅ ADDED: Check login before allowing selection
//     if (!isLoggedIn) {
//       if (window.confirm("Please login to select tests. Go to login page?")) {
//         const currentPath = location.pathname;
//         const searchParams = location.search;
//         const fullUrl = `${currentPath}${searchParams}`;
//         navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
//       }
//       return;
//     }
    
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

//   // ✅ ADDED: Handle Book Now button click with login check
//   const handleBookNow = () => {
//     if (!isLoggedIn) {
//       // Save current path for redirect after login
//       const currentPath = location.pathname;
//       const searchParams = location.search;
//       const fullUrl = `${currentPath}${searchParams}`;
      
//       // Redirect to login with return URL and lab ID
//       navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
//       return;
//     }
    
//     // If logged in, proceed to booking
//     navigate(`/labs/${id}/booking`, {
//       state: { selectedTests },
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 pb-36">
//       {/* LAB HEADER */}
//       <div
//         className="mt-8 rounded-3xl p-8 flex items-center gap-6 shadow-xl"
//         style={{
//           background:
//             "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
//           color: "var(--white)",
//         }}
//       >
//         <img
//           src={`http://localhost:5000/uploads/${lab.logo}`}
//           className="w-24 h-24 bg-whitet-white rounded-2xl object-contain p-3 shadow-md"
//           alt={lab.name}
//         />

//         <div className="flex-1">
//           <h1 className="text-3xl font-bold tracking-tight">{lab.name}</h1>
//           <p className="opacity-90 mt-1">{lab.branches}</p>

//           <span
//             className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm"
//             style={{ background: "rgba(255,255,255,0.2)" }}
//           >
//             <FaTag /> {lab.discount}% Discount on all tests
//           </span>

//           {/* ✅ ADDED: Login status indicator */}
//            <div className="mt-4">
//             {!isLoggedIn && (
//               <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full inline-flex">
//                 <span className="text-yellow-300">⚠</span>
//                 <span>Login to select tests and book</span>
//                 <button
//                   onClick={() => {
//                     const currentPath = location.pathname;
//                     const searchParams = location.search;
//                     const fullUrl = `${currentPath}${searchParams}`;
//                     navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
//                   }} 
//                   className="ml-2 px-2 py-0.5 text-xs bg-white/30 hover:bg-white/40 rounded transition"
//                 >
//                   Login
//                 </button>
//               </div>
//             )}
//           </div> 
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="mt-12 max-w-xl mx-auto  relative">
//         <FaSearch className="absolute left-4 top-4 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search medical tests"
//           className="w-full rounded-2xl py-3.5 pl-12 pr-4 outline-none border
//                      focus:ring-2"
//           style={{
//             borderColor: "var(--accent-color)",
//             background: "var(--accent-soft)",
//           }}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* TEST CARDS */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
//         {filteredTests.map((test) => {
//           const checked = selectedTests.includes(test._id);

//           return (
//             <div
//               key={test._id}
//               onClick={() => toggleSelect(test._id)}
//               className="relative p-6 rounded-3xl cursor-pointer transition-all duration-300"
//               style={{
//                 background: checked
//                   ? "var(--primary-soft)"
//                   : "var(--white)",
//                 border: checked
//                   ? "2px solid var(--primary-color)"
//                   : "1px solid #e5e7eb",
//                 opacity: !isLoggedIn ? 0.7 : 1,
//                 cursor: !isLoggedIn ? 'not-allowed' : 'pointer',
//               }}
//               title={!isLoggedIn ? "Login to select tests" : ""}
//             >
//               {checked && (
//                 <FaCheckCircle
//                   className="absolute top-4 right-4 text-xl"
//                   style={{ color: "var(--primary-color)" }}
//                 />
//               )}

//               <h3 className="text-lg font-semibold text-gray-800">
//                 {test.name}
//               </h3>

//               <p className="text-sm text-gray-600 mt-2 line-clamp-2">
//                 {test.description}
//               </p>

//               <div className="flex items-end gap-3 mt-5">
//                 <span
//                   className="text-2xl font-bold"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   Rs {getDiscountedPrice(test.price)}
//                 </span>

//                 <s className="text-gray-400 text-sm">
//                   Rs {test.price}
//                 </s>
//               </div>

//               <span
//                 className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 text-xs font-semibold rounded-full"
//                 style={{
//                   backgroundColor: "var(--primary-soft)",
//                   color: "var(--primary-color)",
//                   border: "1px solid var(--accent-color)",
//                 }}
//               >
//                 <FaTag className="text-[11px]" />
//                 {lab.discount}% Discount
//               </span>

//               {/* ✅ ADDED: Login prompt on test cards */}
//               {!isLoggedIn && (
//                 <div className="mt-3 text-center">
//                   <span className="text-xs text-gray-500">
//                     Login to select
//                   </span>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* STICKY TOTAL BAR */}
//       {selectedTests.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-2xl"
//              style={{ background: "var(--white)" }}>
//           <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
//             <div>
//               <p className="font-semibold text-gray-800">
//                 {selectedTests.length} Tests Selected
//               </p>
//               <p className="text-sm text-gray-500">
//                 <s>Rs {total.original}</s> →{" "}
//                 <span
//                   className="font-bold"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   Rs {total.final}
//                 </span>
//               </p>
//               {/* ✅ ADDED: Login status in sticky bar */}
//               {!isLoggedIn && (
//                 <p className="text-sm text-red-600 mt-1">
//                   ⚠ Login to book these tests
//                 </p>
//               )}
//             </div>

//             <button
//               onClick={handleBookNow} // ✅ UPDATED: Using new function
//               className="px-8 py-3 rounded-2xl font-semibold text-white transition"
//               style={{
//                 background: isLoggedIn 
//                   ? "var(--primary-color)" 
//                   : "var(--accent-color)",
//                 opacity: isLoggedIn ? 1 : 0.8,
//                 cursor: isLoggedIn ? 'pointer' : 'not-allowed'
//               }}
//               onMouseOver={(e) => {
//                 if (isLoggedIn) {
//                   e.currentTarget.style.background = "var(--hover-color)";
//                 }
//               }}
//               onMouseOut={(e) => {
//                 if (isLoggedIn) {
//                   e.currentTarget.style.background = "var(--primary-color)";
//                 }
//               }}
//               title={!isLoggedIn ? "Please login to book" : ""}
//             >
//               {isLoggedIn ? "Book Now" : "Login to Book"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTag, FaCheckCircle, FaTimes } from "react-icons/fa";

// ✅ ADDED: Check login function
const checkUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return !!(token && user);
};

// ✅ UPDATED: Custom Popup Component with blur effect
const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Blurred Background Overlay */}
      <div className="fixed inset-0 z-50">
        {/* Backdrop with blur */}
        <div 
          className="absolute inset-0 bg-opacity-30 backdrop-blur-md"
          onClick={onClose}
        />
        
        {/* Popup Content */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                {message || "Please login to select tests and book appointments."}
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 text-white rounded-lg transition"
                  style={{
                    background: "var(--primary-color)",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function LabDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingTestId, setPendingTestId] = useState(null);

  // Check login status
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(checkUserLoggedIn());
    };
    
    checkLogin();
    
    const handleStorageChange = () => {
      checkLogin();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', checkLogin);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', checkLogin);
    };
  }, []);

  // Handle user change
  useEffect(() => {
    const handleUserChange = () => {
      const currentUser = localStorage.getItem("user");
      const storedUserKey = `currentUser_lab_${id}`;
      const lastUser = localStorage.getItem(storedUserKey);
      
      if (currentUser !== lastUser) {
        setSelectedTests([]);
        localStorage.removeItem(`selectedTests_lab_${id}`);
        
        if (currentUser) {
          localStorage.setItem(storedUserKey, currentUser);
        } else {
          localStorage.removeItem(storedUserKey);
        }
      }
    };
    
    handleUserChange();
  }, [id]);

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
    if (isLoggedIn) {
      localStorage.setItem(
        `selectedTests_lab_${id}`,
        JSON.stringify(selectedTests)
      );
    }
  }, [selectedTests, id, isLoggedIn]);

  if (!lab) return <div className="text-center py-24">Loading...</div>;

  const getDiscountedPrice = (price) =>
    Math.round(price - (price * lab.discount) / 100);

  const filteredTests = tests.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoginRedirect = () => {
    const currentPath = location.pathname;
    const searchParams = location.search;
    const fullUrl = `${currentPath}${searchParams}`;
    navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
    setShowLoginPopup(false);
  };

  const toggleSelect = (testId) => {
    if (!isLoggedIn) {
      setPendingTestId(testId);
      setShowLoginPopup(true);
      return;
    }
    
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

  const handleBookNow = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    
    navigate(`/labs/${id}/booking`, {
      state: { selectedTests },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-36">
      {/* Login Popup with Blur Effect */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => {
          setShowLoginPopup(false);
          setPendingTestId(null);
        }}
        onConfirm={handleLoginRedirect}
        message="Please login to select tests and book appointments. Go to login page?"
      />

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

          <div className="mt-4">
            {!isLoggedIn && (
              <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full inline-flex">
                <span className="text-yellow-300">⚠</span>
                <span>Login to select tests and book</span>
                <button
                  onClick={() => setShowLoginPopup(true)} 
                  className="ml-2 px-2 py-0.5 text-xs bg-white/30 hover:bg-white/40 rounded transition"
                >
                  Login
                </button>
              </div>
            )}
          </div> 
        </div>
      </div>

      {/* SEARCH */}
      <div className="mt-12 max-w-xl mx-auto relative">
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
                opacity: !isLoggedIn ? 0.7 : 1,
                cursor: !isLoggedIn ? 'not-allowed' : 'pointer',
              }}
              title={!isLoggedIn ? "Login to select tests" : ""}
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

              {/* {!isLoggedIn && (
                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500">
                    Login to select
                  </span>
                </div>
              )} */}
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
              {!isLoggedIn && (
                <p className="text-sm text-red-600 mt-1">
                  ⚠ Login to book these tests
                </p>
              )}
            </div>

            <button
              onClick={handleBookNow}
              className="px-8 py-3 rounded-2xl font-semibold text-white transition"
              style={{
                background: isLoggedIn 
                  ? "var(--primary-color)" 
                  : "var(--accent-color)",
                opacity: isLoggedIn ? 1 : 0.8,
                cursor: isLoggedIn ? 'pointer' : 'not-allowed'
              }}
              onMouseOver={(e) => {
                if (isLoggedIn) {
                  e.currentTarget.style.background = "var(--hover-color)";
                }
              }}
              onMouseOut={(e) => {
                if (isLoggedIn) {
                  e.currentTarget.style.background = "var(--primary-color)";
                }
              }}
              title={!isLoggedIn ? "Please login to book" : ""}
            >
              {isLoggedIn ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}