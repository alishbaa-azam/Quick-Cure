// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { FaSearch, FaTag, FaCheckCircle, FaTimes } from "react-icons/fa";

// // ✅ ADDED: Check login function
// const checkUserLoggedIn = () => {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   return !!(token && user);
// };

// // ✅ UPDATED: Custom Popup Component with blur effect
// const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Blurred Background Overlay */}
//       <div className="fixed inset-0 z-50">
//         {/* Backdrop with blur */}
//         <div 
//           className="absolute inset-0 bg-opacity-30 backdrop-blur-md"
//           onClick={onClose}
//         />
        
//         {/* Popup Content */}
//         <div className="absolute inset-0 flex items-center justify-center p-4">
//           <div 
//             className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-slideUp"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
//                 <button
//                   onClick={onClose}
//                   className="text-gray-400 hover:text-gray-600 transition"
//                 >
//                   <FaTimes size={20} />
//                 </button>
//               </div>
              
//               <p className="text-gray-600 mb-6">
//                 {message || "Please login to select tests and book appointments."}
//               </p>
              
//               <div className="flex gap-3 justify-end">
//                 <button
//                   onClick={onClose}
//                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={onConfirm}
//                   className="px-4 py-2 text-white rounded-lg transition"
//                   style={{
//                     background: "var(--primary-color)",
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
//                   onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
//                 >
//                   Go to Login
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

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

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [pendingTestId, setPendingTestId] = useState(null);

//   // Check login status
//   useEffect(() => {
//     const checkLogin = () => {
//       setIsLoggedIn(checkUserLoggedIn());
//     };
    
//     checkLogin();
    
//     const handleStorageChange = () => {
//       checkLogin();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('focus', checkLogin);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('focus', checkLogin);
//     };
//   }, []);

//   // Handle user change
//   useEffect(() => {
//     const handleUserChange = () => {
//       const currentUser = localStorage.getItem("user");
//       const storedUserKey = `currentUser_lab_${id}`;
//       const lastUser = localStorage.getItem(storedUserKey);
      
//       if (currentUser !== lastUser) {
//         setSelectedTests([]);
//         localStorage.removeItem(`selectedTests_lab_${id}`);
        
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

//   const handleLoginRedirect = () => {
//     const currentPath = location.pathname;
//     const searchParams = location.search;
//     const fullUrl = `${currentPath}${searchParams}`;
//     navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
//     setShowLoginPopup(false);
//   };

//   const toggleSelect = (testId) => {
//     if (!isLoggedIn) {
//       setPendingTestId(testId);
//       setShowLoginPopup(true);
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

//   const handleBookNow = () => {
//     if (!isLoggedIn) {
//       setShowLoginPopup(true);
//       return;
//     }
    
//     navigate(`/labs/${id}/booking`, {
//       state: { selectedTests },
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 pb-36">
//       {/* Login Popup with Blur Effect */}
//       <LoginPopup
//         isOpen={showLoginPopup}
//         onClose={() => {
//           setShowLoginPopup(false);
//           setPendingTestId(null);
//         }}
//         onConfirm={handleLoginRedirect}
//         message="Please login to select tests and book appointments. Go to login page?"
//       />

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

//           <div className="mt-4">
//             {!isLoggedIn && (
//               <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full inline-flex">
//                 <span className="text-yellow-300">⚠</span>
//                 <span>Login to select tests and book</span>
//                 <button
//                   onClick={() => setShowLoginPopup(true)} 
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
//       <div className="mt-12 max-w-xl mx-auto relative">
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

//               {/* {!isLoggedIn && (
//                 <div className="mt-3 text-center">
//                   <span className="text-xs text-gray-500">
//                     Login to select
//                   </span>
//                 </div>
//               )} */}
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
//               {!isLoggedIn && (
//                 <p className="text-sm text-red-600 mt-1">
//                   ⚠ Login to book these tests
//                 </p>
//               )}
//             </div>

//             <button
//               onClick={handleBookNow}
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

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { FaSearch, FaTag, FaCheckCircle, FaTimes, FaUserPlus, FaUser, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// // ✅ ADDED: Check login function
// const checkUserLoggedIn = () => {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   return !!(token && user);
// };

// // ✅ UPDATED: Custom Popup Component with blur effect
// const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Blurred Background Overlay */}
//       <div className="fixed inset-0 z-50">
//         {/* Backdrop with blur */}
//         <div 
//           className="absolute inset-0 bg-opacity-30 backdrop-blur-md"
//           onClick={onClose}
//         />
        
//         {/* Popup Content */}
//         <div className="absolute inset-0 flex items-center justify-center p-4">
//           <div 
//             className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-slideUp"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
//                 <button
//                   onClick={onClose}
//                   className="text-gray-400 hover:text-gray-600 transition"
//                 >
//                   <FaTimes size={20} />
//                 </button>
//               </div>
              
//               <p className="text-gray-600 mb-6">
//                 {message || "Please login to select tests and book appointments."}
//               </p>
              
//               <div className="flex gap-3 justify-end">
//                 <button
//                   onClick={onClose}
//                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={onConfirm}
//                   className="px-4 py-2 text-white rounded-lg transition"
//                   style={{
//                     background: "var(--primary-color)",
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
//                   onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
//                 >
//                   Go to Login
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // Patient Selector Component
// const PatientSelector = ({ patients, currentPatientIndex, onSwitchPatient, onAddPatient, onEditPatient, onRemovePatient }) => {
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] mb-8">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-2 rounded-lg">
//             <FaUser className="text-white" />
//           </div>
//           <h2 className="text-xl font-bold text-[#174047]">Patients</h2>
//         </div>
//         <button
//           onClick={onAddPatient}
//           className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-all transform hover:scale-105"
//         >
//           <FaUserPlus />
//           Add Another Person
//         </button>
//       </div>
      
//       <div className="flex flex-wrap gap-3">
//         {patients.map((patient, index) => (
//           <div
//             key={patient.id}
//             className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
//               currentPatientIndex === index
//                 ? 'border-[#2c6774] bg-[#2c6774]/10 shadow-md'
//                 : 'border-gray-200 hover:border-[#5c878f] hover:shadow-sm'
//             }`}
//           >
//             <button
//               onClick={() => onSwitchPatient(index)}
//               className="flex items-center gap-3 px-3 py-1 min-w-[150px]"
//             >
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
//                 currentPatientIndex === index
//                   ? 'bg-[#2c6774] text-white'
//                   : 'bg-gray-200 text-gray-600'
//               }`}>
//                 {index + 1}
//               </div>
//               <div className="flex-1 text-left">
//                 <div className="font-medium text-[#174047]">
//                   {patient.name || `Patient ${index + 1}`}
//                 </div>
//                 <div className="text-xs text-[#5c878f]">
//                   {patient.selectedTests.length} {patient.selectedTests.length === 1 ? 'test' : 'tests'} selected
//                 </div>
//               </div>
//             </button>
            
//             {patient.selectedTests.length > 0 && (
//               <button
//                 onClick={() => onEditPatient(index)}
//                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                 title="Edit tests"
//               >
//                 <FaChevronRight />
//               </button>
//             )}
            
//             {patients.length > 1 && (
//               <button
//                 onClick={() => onRemovePatient(index)}
//                 className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                 title="Remove patient"
//               >
//                 <FaTimes size={14} />
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Navigation提示 */}
//       {patients.length > 1 && (
//         <div className="mt-4 p-3 bg-[#9fbfc5]/20 rounded-lg text-sm text-[#174047] flex items-center gap-2">
//           <FaChevronLeft className="text-[#2c6774]" />
//           <span>Click on a patient to switch between them and select different tests</span>
//           <FaChevronRight className="text-[#2c6774]" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default function LabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Multi-patient state
//   const [patients, setPatients] = useState(() => {
//     // Try to load from localStorage or use default
//     try {
//       const savedPatients = localStorage.getItem(`patients_lab_${id}`);
//       if (savedPatients) {
//         return JSON.parse(savedPatients);
//       }
//     } catch {
//       // Ignore error
//     }
//     // Default: one patient
//     return [{ id: Date.now(), name: 'Patient 1', selectedTests: [] }];
//   });

//   const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
  
//   // Current selected tests for the active patient
//   const [selectedTests, setSelectedTests] = useState(() => {
//     try {
//       const savedPatients = localStorage.getItem(`patients_lab_${id}`);
//       if (savedPatients) {
//         const patients = JSON.parse(savedPatients);
//         return patients[0]?.selectedTests || [];
//       }
//     } catch {
//       // Ignore error
//     }
//     return [];
//   });

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);

//   // Check login status
//   useEffect(() => {
//     const checkLogin = () => {
//       setIsLoggedIn(checkUserLoggedIn());
//     };
    
//     checkLogin();
    
//     const handleStorageChange = () => {
//       checkLogin();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('focus', checkLogin);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('focus', checkLogin);
//     };
//   }, []);

//   // Handle user change
//   useEffect(() => {
//     const handleUserChange = () => {
//       const currentUser = localStorage.getItem("user");
//       const storedUserKey = `currentUser_lab_${id}`;
//       const lastUser = localStorage.getItem(storedUserKey);
      
//       if (currentUser !== lastUser) {
//         // Reset patients for new user
//         const newPatients = [{ id: Date.now(), name: 'Patient 1', selectedTests: [] }];
//         setPatients(newPatients);
//         setSelectedTests([]);
//         setCurrentPatientIndex(0);
//         localStorage.removeItem(`patients_lab_${id}`);
        
//         if (currentUser) {
//           localStorage.setItem(storedUserKey, currentUser);
//         } else {
//           localStorage.removeItem(storedUserKey);
//         }
//       }
//     };
    
//     handleUserChange();
//   }, [id]);

//   // Save patients to localStorage when they change
//   useEffect(() => {
//     if (isLoggedIn) {
//       localStorage.setItem(`patients_lab_${id}`, JSON.stringify(patients));
//     }
//   }, [patients, id, isLoggedIn]);

//   // Update selectedTests when switching patients
//   useEffect(() => {
//     if (patients[currentPatientIndex]) {
//       setSelectedTests(patients[currentPatientIndex].selectedTests || []);
//     }
//   }, [currentPatientIndex, patients]);

//   // Fetch lab and tests data
//   useEffect(() => {
//     Promise.all([
//       axios.get(`http://localhost:5000/api/labs/${id}`),
//       axios.get(`http://localhost:5000/api/tests/lab/${id}`),
//     ]).then(([labRes, testsRes]) => {
//       setLab(labRes.data);
//       setTests(testsRes.data || []);
//     }).catch(error => {
//       console.error('Error fetching data:', error);
//     });
//   }, [id]);

//   // Handle location state for editing a specific patient
//   useEffect(() => {
//     if (location.state?.editPatientIndex !== undefined && location.state?.patients) {
//       const { editPatientIndex, patients: updatedPatients } = location.state;
//       setPatients(updatedPatients);
//       setCurrentPatientIndex(editPatientIndex);
//       setSelectedTests(updatedPatients[editPatientIndex].selectedTests || []);
      
//       // Clear the location state
//       navigate(location.pathname, { replace: true });
//     }
//   }, [location.state, navigate]);

//   if (!lab) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2c6774] border-t-transparent"></div>
//     </div>
//   );

//   const getDiscountedPrice = (price) =>
//     Math.round(price - (price * lab.discount) / 100);

//   const filteredTests = tests.filter((t) =>
//     t.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleLoginRedirect = () => {
//     const currentPath = location.pathname;
//     const searchParams = location.search;
//     const fullUrl = `${currentPath}${searchParams}`;
//     navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
//     setShowLoginPopup(false);
//   };

//   const handleAddPatient = () => {
//     if (!isLoggedIn) {
//       setPendingAction('addPatient');
//       setShowLoginPopup(true);
//       return;
//     }
    
//     const newPatient = {
//       id: Date.now(),
//       name: `Patient ${patients.length + 1}`,
//       selectedTests: []
//     };
//     setPatients([...patients, newPatient]);
//     setCurrentPatientIndex(patients.length);
//     setSelectedTests([]);
//   };

//   const handleSwitchPatient = (index) => {
//     // Save current patient's tests
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].selectedTests = selectedTests;
//     setPatients(updatedPatients);
    
//     // Switch to new patient
//     setCurrentPatientIndex(index);
//     setSelectedTests(updatedPatients[index].selectedTests || []);
//   };

//   const handleEditPatient = (index) => {
//     // Save current patient's tests first
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].selectedTests = selectedTests;
//     setPatients(updatedPatients);
    
//     // Navigate to same page with state (this will trigger the useEffect above)
//     navigate(`/labs/${id}`, {
//       state: { 
//         editPatientIndex: index,
//         patients: updatedPatients 
//       },
//       replace: true
//     });
//   };

//   const handleRemovePatient = (index) => {
//     if (patients.length <= 1) {
//       alert("Cannot remove the last patient. At least one patient is required.");
//       return;
//     }
    
//     const updatedPatients = patients.filter((_, i) => i !== index);
//     setPatients(updatedPatients);
    
//     // Adjust current index if needed
//     if (currentPatientIndex >= updatedPatients.length) {
//       setCurrentPatientIndex(updatedPatients.length - 1);
//     } else if (currentPatientIndex === index) {
//       setCurrentPatientIndex(Math.max(0, index - 1));
//     }
//   };

//   const toggleSelect = (testId) => {
//     if (!isLoggedIn) {
//       setPendingAction({ type: 'selectTest', testId });
//       setShowLoginPopup(true);
//       return;
//     }
    
//     const updatedSelectedTests = selectedTests.includes(testId)
//       ? selectedTests.filter((x) => x !== testId)
//       : [...selectedTests, testId];
    
//     setSelectedTests(updatedSelectedTests);
    
//     // Update the current patient's selected tests
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].selectedTests = updatedSelectedTests;
//     setPatients(updatedPatients);
//   };

//   // Calculate total for all patients
//   const calculateTotalForAllPatients = () => {
//     let totalOriginal = 0;
//     let totalFinal = 0;
    
//     patients.forEach(patient => {
//       patient.selectedTests.forEach(testId => {
//         const test = tests.find(t => t._id === testId);
//         if (test) {
//           totalOriginal += Number(test.price);
//           totalFinal += getDiscountedPrice(test.price);
//         }
//       });
//     });
    
//     return { original: totalOriginal, final: totalFinal };
//   };

//   const total = calculateTotalForAllPatients();
//   const totalSelectedTests = patients.reduce((sum, p) => sum + p.selectedTests.length, 0);

//   const handleBookNow = () => {
//     if (!isLoggedIn) {
//       setPendingAction('bookNow');
//       setShowLoginPopup(true);
//       return;
//     }
    
//     // Save current patient's tests before navigating
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].selectedTests = selectedTests;
    
//     // Filter out patients with no tests selected
//     const patientsWithTests = updatedPatients.filter(p => p.selectedTests.length > 0);
    
//     if (patientsWithTests.length === 0) {
//       alert("Please select at least one test for at least one patient.");
//       return;
//     }
    
//     navigate(`/labs/${id}/booking`, {
//       state: { 
//         patients: patientsWithTests,
//         labId: id 
//       },
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 pb-36">
//       {/* Login Popup with Blur Effect */}
//       <LoginPopup
//         isOpen={showLoginPopup}
//         onClose={() => {
//           setShowLoginPopup(false);
//           setPendingAction(null);
//         }}
//         onConfirm={handleLoginRedirect}
//         message="Please login to select tests and book appointments. Go to login page?"
//       />

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
//           className="w-24 h-24 bg-white rounded-2xl object-contain p-3 shadow-md"
//           alt={lab.name}
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/96?text=Lab';
//           }}
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

//           <div className="mt-4">
//             {!isLoggedIn && (
//               <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full inline-flex">
//                 <span className="text-yellow-300">⚠</span>
//                 <span>Login to select tests and book</span>
//                 <button
//                   onClick={() => setShowLoginPopup(true)} 
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
//       <div className="mt-12 max-w-xl mx-auto relative">
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

//       {/* PATIENT SELECTOR - Only show when logged in */}
//       {isLoggedIn && (
//         <PatientSelector
//           patients={patients}
//           currentPatientIndex={currentPatientIndex}
//           onSwitchPatient={handleSwitchPatient}
//           onAddPatient={handleAddPatient}
//           onEditPatient={handleEditPatient}
//           onRemovePatient={handleRemovePatient}
//         />
//       )}

//       {/* Current Patient Indicator */}
//       {isLoggedIn && patients.length > 0 && (
//         <div className="mb-6 p-4 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 rounded-xl border border-[#5c878f]">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-[#2c6774] text-white flex items-center justify-center font-bold text-lg">
//                 {currentPatientIndex + 1}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-[#174047]">
//                   Currently selecting tests for: <span className="text-[#2c6774]">{patients[currentPatientIndex].name}</span>
//                 </h3>
//                 <p className="text-sm text-[#5c878f]">
//                   {selectedTests.length} {selectedTests.length === 1 ? 'test' : 'tests'} selected for this patient
//                 </p>
//               </div>
//             </div>
//             {selectedTests.length > 0 && (
//               <div className="text-sm bg-white px-4 py-2 rounded-lg shadow-sm">
//                 <span className="font-medium text-[#174047]">Subtotal for this patient: </span>
//                 <span className="font-bold text-[#2c6774]">
//                   Rs {selectedTests.reduce((sum, testId) => {
//                     const test = tests.find(t => t._id === testId);
//                     return sum + (test ? getDiscountedPrice(test.price) : 0);
//                   }, 0)}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* TEST CARDS */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
//         {filteredTests.map((test) => {
//           const checked = selectedTests.includes(test._id);

//           return (
//             <div
//               key={test._id}
//               onClick={() => toggleSelect(test._id)}
//               className="relative p-6 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
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

//               {isLoggedIn && checked && (
//                 <div className="absolute bottom-4 right-4 text-xs text-[#2c6774] font-medium">
//                   Added for {patients[currentPatientIndex].name}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* No tests found message */}
//       {filteredTests.length === 0 && (
//         <div className="text-center py-16">
//           <p className="text-xl text-gray-500">No tests found matching "{searchTerm}"</p>
//         </div>
//       )}

//       {/* STICKY TOTAL BAR */}
//       {totalSelectedTests > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-2xl"
//              style={{ background: "var(--white)" }}>
//           <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
//             <div>
//               <p className="font-semibold text-gray-800">
//                 {totalSelectedTests} Tests Selected for {patients.length} {patients.length === 1 ? 'Patient' : 'Patients'}
//               </p>
//               <p className="text-sm text-gray-500">
//                 <s>Rs {total.original}</s> →{" "}
//                 <span
//                   className="font-bold"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   Rs {total.final}
//                 </span>
//                 <span className="ml-2 text-green-600">
//                   (Save Rs {total.original - total.final})
//                 </span>
//               </p>
//               {!isLoggedIn && (
//                 <p className="text-sm text-red-600 mt-1">
//                   ⚠ Login to book these tests
//                 </p>
//               )}
//             </div>

//             <div className="flex gap-3">
//               {/* Patient Summary Button - Only when multiple patients */}
//               {isLoggedIn && patients.length > 1 && (
//                 <button
//                   onClick={() => {
//                     // Show quick summary of patients
//                     const summary = patients.map((p, i) => 
//                       `${p.name}: ${p.selectedTests.length} tests`
//                     ).join('\n');
//                     alert(`Selected Tests Summary:\n${summary}`);
//                   }}
//                   className="px-6 py-3 rounded-2xl font-semibold border-2 border-[#2c6774] text-[#2c6774] hover:bg-[#9fbfc5]/20 transition"
//                 >
//                   View Summary
//                 </button>
//               )}

//               <button
//                 onClick={handleBookNow}
//                 className="px-8 py-3 rounded-2xl font-semibold text-white transition transform hover:scale-105"
//                 style={{
//                   background: isLoggedIn 
//                     ? "linear-gradient(to right, #2c6774, #1e4e56)" 
//                     : "var(--accent-color)",
//                   opacity: isLoggedIn ? 1 : 0.8,
//                   cursor: isLoggedIn ? 'pointer' : 'not-allowed'
//                 }}
//                 onMouseOver={(e) => {
//                   if (isLoggedIn) {
//                     e.currentTarget.style.background = "linear-gradient(to right, #1e4e56, #174047)";
//                   }
//                 }}
//                 onMouseOut={(e) => {
//                   if (isLoggedIn) {
//                     e.currentTarget.style.background = "linear-gradient(to right, #2c6774, #1e4e56)";
//                   }
//                 }}
//                 title={!isLoggedIn ? "Please login to book" : ""}
//               >
//                 {!isLoggedIn ? "Login to Book" : 
//                  patients.length === 1 ? "Book Now" : 
//                  `Book for ${patients.length} Patients`}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTag, FaCheckCircle, FaTimes, FaUserPlus, FaUser, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

// Patient Selector Component
const PatientSelector = ({ patients, currentPatientIndex, onSwitchPatient, onAddPatient, onEditPatient, onRemovePatient }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-2 rounded-lg">
            <FaUser className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#174047]">Patients</h2>
        </div>
        <button
          onClick={onAddPatient}
          className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-all transform hover:scale-105"
        >
          <FaUserPlus />
          Add Another Person
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {patients.map((patient, index) => (
          <div
            key={patient.id}
            className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
              currentPatientIndex === index
                ? 'border-[#2c6774] bg-[#2c6774]/10 shadow-md'
                : 'border-gray-200 hover:border-[#5c878f] hover:shadow-sm'
            }`}
          >
            <button
              onClick={() => onSwitchPatient(index)}
              className="flex items-center gap-3 px-3 py-1 min-w-[150px]"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                currentPatientIndex === index
                  ? 'bg-[#2c6774] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-[#174047]">
                  {patient.name || `Patient ${index + 1}`}
                </div>
                <div className="text-xs text-[#5c878f]">
                  {patient.selectedTests.length} {patient.selectedTests.length === 1 ? 'test' : 'tests'} selected
                </div>
              </div>
            </button>
            
            {patient.selectedTests.length > 0 && (
              <button
                onClick={() => onEditPatient(index)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="Edit tests"
              >
                <FaChevronRight />
              </button>
            )}
            
            {patients.length > 1 && (
              <button
                onClick={() => onRemovePatient(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Remove patient"
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Navigation提示 */}
      {patients.length > 1 && (
        <div className="mt-4 p-3 bg-[#9fbfc5]/20 rounded-lg text-sm text-[#174047] flex items-center gap-2">
          <FaChevronLeft className="text-[#2c6774]" />
          <span>Click on a patient to switch between them and select different tests</span>
          <FaChevronRight className="text-[#2c6774]" />
        </div>
      )}
    </div>
  );
};

export default function LabDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [lab, setLab] = useState(null);
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Multi-patient state
  const [patients, setPatients] = useState(() => {
    // Try to load from localStorage or use default
    try {
      const savedPatients = localStorage.getItem(`patients_lab_${id}`);
      if (savedPatients) {
        return JSON.parse(savedPatients);
      }
    } catch {
      // Ignore error
    }
    // Default: one patient
    return [{ id: Date.now(), name: 'Patient 1', selectedTests: [] }];
  });

  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
  
  // Current selected tests for the active patient
  const [selectedTests, setSelectedTests] = useState(() => {
    try {
      const savedPatients = localStorage.getItem(`patients_lab_${id}`);
      if (savedPatients) {
        const patients = JSON.parse(savedPatients);
        return patients[0]?.selectedTests || [];
      }
    } catch {
      // Ignore error
    }
    return [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // ✅ FIX 1: Page refresh when booking confirmed
  // useEffect(() => {
  //   // Check if booking was confirmed
  //   const bookingConfirmed = sessionStorage.getItem('bookingConfirmed');
  //   if (bookingConfirmed === 'true') {
  //     sessionStorage.removeItem('bookingConfirmed');
  //     window.location.reload();
  //   }
  // }, []);

  // In LabDetail.js - Update the useEffect that checks for booking confirmation

// ✅ FIX 1: Page refresh when booking confirmed - Enhanced version
useEffect(() => {
  // Check if booking was confirmed
  const bookingConfirmed = sessionStorage.getItem('bookingConfirmed');
  const navigatedToBooking = sessionStorage.getItem('navigatedToBooking');
  
  if (bookingConfirmed === 'true') {
    // Clear the flag
    sessionStorage.removeItem('bookingConfirmed');
    sessionStorage.removeItem('navigatedToBooking');
    
    // Clear patients data for this lab
    localStorage.removeItem(`patients_lab_${id}`);
    
    // Reset state
    const newPatients = [{ id: Date.now(), name: 'Patient 1', selectedTests: [] }];
    setPatients(newPatients);
    setSelectedTests([]);
    setCurrentPatientIndex(0);
    
    // Show a success message (optional)
    // You could add a toast notification here
    
    // Reload the page to fetch fresh data
    window.location.reload();
  } else if (navigatedToBooking === 'true') {
    // If we navigated to booking but haven't confirmed yet,
    // keep the flag but don't refresh
    console.log('Navigated to booking page');
  }
}, [id]); // Add id to dependency array



  // ✅ FIX 2: Check login status with refresh on user change
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = checkUserLoggedIn();
      const oldLoginStatus = sessionStorage.getItem('wasLoggedIn');
      
      // If login status changed, refresh
      if (oldLoginStatus !== null && oldLoginStatus !== String(loggedIn)) {
        sessionStorage.setItem('wasLoggedIn', String(loggedIn));
        window.location.reload();
      } else {
        sessionStorage.setItem('wasLoggedIn', String(loggedIn));
      }
      
      setIsLoggedIn(loggedIn);
    };
    
    checkLogin();
    
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkLogin();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', checkLogin);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', checkLogin);
    };
  }, []);

  // Handle user change and reset patients
  // useEffect(() => {
  //   const handleUserChange = () => {
  //     const currentUser = localStorage.getItem("user");
  //     const storedUserKey = `currentUser_lab_${id}`;
  //     const lastUser = localStorage.getItem(storedUserKey);
      
  //     if (currentUser !== lastUser) {
  //       // Reset patients for new user
  //       const newPatients = [{ id: Date.now(), name: 'Patient 1', selectedTests: [] }];
  //       setPatients(newPatients);
  //       setSelectedTests([]);
  //       setCurrentPatientIndex(0);
  //       localStorage.removeItem(`patients_lab_${id}`);
        
  //       if (currentUser) {
  //         localStorage.setItem(storedUserKey, currentUser);
  //       } else {
  //         localStorage.removeItem(storedUserKey);
  //       }
  //     }
  //   };
    
  //   handleUserChange();
  // }, [id, isLoggedIn]);

  // In LabDetail.js - Update the user change useEffect

// Handle user change and reset patients
useEffect(() => {
  const handleUserChange = () => {
    const currentUser = localStorage.getItem("user");
    const storedUserKey = `currentUser_lab_${id}`;
    const lastUser = localStorage.getItem(storedUserKey);
    
    if (currentUser !== lastUser) {
      // Reset patients for new user
      const newPatients = [{ id: Date.now(), name: 'Patient 1', selectedTests: [] }];
      setPatients(newPatients);
      setSelectedTests([]);
      setCurrentPatientIndex(0);
      
      // Clear all lab-specific data
      localStorage.removeItem(`patients_lab_${id}`);
      sessionStorage.removeItem('bookingConfirmed');
      sessionStorage.removeItem('navigatedToBooking');
      
      if (currentUser) {
        localStorage.setItem(storedUserKey, currentUser);
      } else {
        localStorage.removeItem(storedUserKey);
      }
      
      // Optional: Show a message that user has changed
      console.log('User changed, resetting page');
    }
  };
  
  handleUserChange();
}, [id, isLoggedIn]);

  // Save patients to localStorage when they change
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(`patients_lab_${id}`, JSON.stringify(patients));
    }
  }, [patients, id, isLoggedIn]);

  // Update selectedTests when switching patients
  useEffect(() => {
    if (patients[currentPatientIndex]) {
      setSelectedTests(patients[currentPatientIndex].selectedTests || []);
    }
  }, [currentPatientIndex, patients]);

  // Fetch lab and tests data
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:5000/api/labs/${id}`),
      axios.get(`http://localhost:5000/api/tests/lab/${id}`),
    ]).then(([labRes, testsRes]) => {
      setLab(labRes.data);
      setTests(testsRes.data || []);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [id]);

  // Handle location state for editing a specific patient
  useEffect(() => {
    if (location.state?.editPatientIndex !== undefined && location.state?.patients) {
      const { editPatientIndex, patients: updatedPatients } = location.state;
      setPatients(updatedPatients);
      setCurrentPatientIndex(editPatientIndex);
      setSelectedTests(updatedPatients[editPatientIndex].selectedTests || []);
      
      // Clear the location state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  if (!lab) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2c6774] border-t-transparent"></div>
    </div>
  );

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

  const handleAddPatient = () => {
    if (!isLoggedIn) {
      setPendingAction('addPatient');
      setShowLoginPopup(true);
      return;
    }
    
    const newPatient = {
      id: Date.now(),
      name: `Patient ${patients.length + 1}`,
      selectedTests: []
    };
    setPatients([...patients, newPatient]);
    setCurrentPatientIndex(patients.length);
    setSelectedTests([]);
  };

  const handleSwitchPatient = (index) => {
    // Save current patient's tests
    const updatedPatients = [...patients];
    updatedPatients[currentPatientIndex].selectedTests = selectedTests;
    setPatients(updatedPatients);
    
    // Switch to new patient
    setCurrentPatientIndex(index);
    setSelectedTests(updatedPatients[index].selectedTests || []);
  };

  const handleEditPatient = (index) => {
    // Save current patient's tests first
    const updatedPatients = [...patients];
    updatedPatients[currentPatientIndex].selectedTests = selectedTests;
    setPatients(updatedPatients);
    
    // Navigate to same page with state (this will trigger the useEffect above)
    navigate(`/labs/${id}`, {
      state: { 
        editPatientIndex: index,
        patients: updatedPatients 
      },
      replace: true
    });
  };

  const handleRemovePatient = (index) => {
    if (patients.length <= 1) {
      alert("Cannot remove the last patient. At least one patient is required.");
      return;
    }
    
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
    
    // Adjust current index if needed
    if (currentPatientIndex >= updatedPatients.length) {
      setCurrentPatientIndex(updatedPatients.length - 1);
    } else if (currentPatientIndex === index) {
      setCurrentPatientIndex(Math.max(0, index - 1));
    }
  };

  const toggleSelect = (testId) => {
    if (!isLoggedIn) {
      setPendingAction({ type: 'selectTest', testId });
      setShowLoginPopup(true);
      return;
    }
    
    const updatedSelectedTests = selectedTests.includes(testId)
      ? selectedTests.filter((x) => x !== testId)
      : [...selectedTests, testId];
    
    setSelectedTests(updatedSelectedTests);
    
    // Update the current patient's selected tests
    const updatedPatients = [...patients];
    updatedPatients[currentPatientIndex].selectedTests = updatedSelectedTests;
    setPatients(updatedPatients);
  };

  // Calculate total for all patients
  const calculateTotalForAllPatients = () => {
    let totalOriginal = 0;
    let totalFinal = 0;
    
    patients.forEach(patient => {
      patient.selectedTests.forEach(testId => {
        const test = tests.find(t => t._id === testId);
        if (test) {
          totalOriginal += Number(test.price);
          totalFinal += getDiscountedPrice(test.price);
        }
      });
    });
    
    return { original: totalOriginal, final: totalFinal };
  };

  const total = calculateTotalForAllPatients();
  const totalSelectedTests = patients.reduce((sum, p) => sum + p.selectedTests.length, 0);

  const handleBookNow = () => {
    if (!isLoggedIn) {
      setPendingAction('bookNow');
      setShowLoginPopup(true);
      return;
    }
    
    // Save current patient's tests before navigating
    const updatedPatients = [...patients];
    updatedPatients[currentPatientIndex].selectedTests = selectedTests;
    
    // Filter out patients with no tests selected
    const patientsWithTests = updatedPatients.filter(p => p.selectedTests.length > 0);
    
    if (patientsWithTests.length === 0) {
      alert("Please select at least one test for at least one patient.");
      return;
    }
    
    // ✅ FIX 3: Set flag before navigating to booking page
    // This will trigger refresh when returning from booking
    sessionStorage.setItem('navigatedToBooking', 'true');
    
    navigate(`/labs/${id}/booking`, {
      state: { 
        patients: patientsWithTests,
        labId: id 
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-36">
      {/* Login Popup with Blur Effect */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => {
          setShowLoginPopup(false);
          setPendingAction(null);
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
          className="w-24 h-24 bg-white rounded-2xl object-contain p-3 shadow-md"
          alt={lab.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/96?text=Lab';
          }}
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
      <div className="mt-12 mb-10 max-w-xl mx-auto relative">
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

      {/* PATIENT SELECTOR - Only show when logged in */}
      {isLoggedIn && (
        <PatientSelector
          patients={patients}
          currentPatientIndex={currentPatientIndex}
          onSwitchPatient={handleSwitchPatient}
          onAddPatient={handleAddPatient}
          onEditPatient={handleEditPatient}
          onRemovePatient={handleRemovePatient}
        />
      )}

      {/* Current Patient Indicator */}
      {isLoggedIn && patients.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 rounded-xl border border-[#5c878f]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2c6774] text-white flex items-center justify-center font-bold text-lg">
                {currentPatientIndex + 1}
              </div>
              <div>
                <h3 className="font-semibold text-[#174047]">
                  Currently selecting tests for: <span className="text-[#2c6774]">{patients[currentPatientIndex].name}</span>
                </h3>
                <p className="text-sm text-[#5c878f]">
                  {selectedTests.length} {selectedTests.length === 1 ? 'test' : 'tests'} selected for this patient
                </p>
              </div>
            </div>
            {selectedTests.length > 0 && (
              <div className="text-sm bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="font-medium text-[#174047]">Subtotal for this patient: </span>
                <span className="font-bold text-[#2c6774]">
                  Rs {selectedTests.reduce((sum, testId) => {
                    const test = tests.find(t => t._id === testId);
                    return sum + (test ? getDiscountedPrice(test.price) : 0);
                  }, 0)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TEST CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredTests.map((test) => {
          const checked = selectedTests.includes(test._id);

          return (
            <div
              key={test._id}
              onClick={() => toggleSelect(test._id)}
              className="relative p-6 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
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

              {isLoggedIn && checked && (
                <div className="absolute bottom-4 right-4 text-xs text-[#2c6774] font-medium">
                  Added for {patients[currentPatientIndex].name}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No tests found message */}
      {filteredTests.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No tests found matching "{searchTerm}"</p>
        </div>
      )}

      {/* STICKY TOTAL BAR */}
      {totalSelectedTests > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-2xl"
             style={{ background: "var(--white)" }}>
          <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
            <div>
              <p className="font-semibold text-gray-800">
                {totalSelectedTests} Tests Selected for {patients.length} {patients.length === 1 ? 'Patient' : 'Patients'}
              </p>
              <p className="text-sm text-gray-500">
                <s>Rs {total.original}</s> →{" "}
                <span
                  className="font-bold"
                  style={{ color: "var(--primary-color)" }}
                >
                  Rs {total.final}
                </span>
                <span className="ml-2 text-green-600">
                  (Save Rs {total.original - total.final})
                </span>
              </p>
              {!isLoggedIn && (
                <p className="text-sm text-red-600 mt-1">
                  ⚠ Login to book these tests
                </p>
              )}
            </div>

            <div className="flex gap-3">
              {/* Patient Summary Button - Only when multiple patients */}
              {isLoggedIn && patients.length > 1 && (
                <button
                  onClick={() => {
                    // Show quick summary of patients
                    const summary = patients.map((p, i) => 
                      `${p.name}: ${p.selectedTests.length} tests`
                    ).join('\n');
                    alert(`Selected Tests Summary:\n${summary}`);
                  }}
                  className="px-6 py-3 rounded-2xl font-semibold border-2 border-[#2c6774] text-[#2c6774] hover:bg-[#9fbfc5]/20 transition"
                >
                  View Summary
                </button>
              )}

              <button
                onClick={handleBookNow}
                className="px-8 py-3 rounded-2xl font-semibold text-white transition transform hover:scale-105"
                style={{
                  background: isLoggedIn 
                    ? "linear-gradient(to right, #2c6774, #1e4e56)" 
                    : "var(--accent-color)",
                  opacity: isLoggedIn ? 1 : 0.8,
                  cursor: isLoggedIn ? 'pointer' : 'not-allowed'
                }}
                onMouseOver={(e) => {
                  if (isLoggedIn) {
                    e.currentTarget.style.background = "linear-gradient(to right, #1e4e56, #174047)";
                  }
                }}
                onMouseOut={(e) => {
                  if (isLoggedIn) {
                    e.currentTarget.style.background = "linear-gradient(to right, #2c6774, #1e4e56)";
                  }
                }}
                title={!isLoggedIn ? "Please login to book" : ""}
              >
                {!isLoggedIn ? "Login to Book" : 
                 patients.length === 1 ? "Book Now" : 
                 `Book for ${patients.length} Patients`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}