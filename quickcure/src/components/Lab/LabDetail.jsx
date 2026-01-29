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


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTag, FaCheckCircle } from "react-icons/fa";

// ✅ ADDED: Check login function
const checkUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return !!(token && user);
};

export default function LabDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ ADDED: For getting current path

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

  // ✅ ADDED: Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ ADDED: Check login status on component mount and when storage changes
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(checkUserLoggedIn());
    };
    
    // Initial check
    checkLogin();
    
    // Listen for login/logout events from other tabs
    const handleStorageChange = () => {
      checkLogin();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check when page gains focus
    window.addEventListener('focus', checkLogin);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', checkLogin);
    };
  }, []);

  // ✅ ADDED: Clear selected tests when user changes (for multi-user support)
  useEffect(() => {
    const handleUserChange = () => {
      // Get current user from localStorage
      const currentUser = localStorage.getItem("user");
      const storedUserKey = `currentUser_lab_${id}`;
      const lastUser = localStorage.getItem(storedUserKey);
      
      // If user has changed (or logged out), clear selected tests
      if (currentUser !== lastUser) {
        setSelectedTests([]);
        localStorage.removeItem(`selectedTests_lab_${id}`);
        
        // Update stored user
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
    // Only save if user is logged in
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

  const toggleSelect = (testId) => {
    // ✅ ADDED: Check login before allowing selection
    if (!isLoggedIn) {
      if (window.confirm("Please login to select tests. Go to login page?")) {
        const currentPath = location.pathname;
        const searchParams = location.search;
        const fullUrl = `${currentPath}${searchParams}`;
        navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
      }
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

  // ✅ ADDED: Handle Book Now button click with login check
  const handleBookNow = () => {
    if (!isLoggedIn) {
      // Save current path for redirect after login
      const currentPath = location.pathname;
      const searchParams = location.search;
      const fullUrl = `${currentPath}${searchParams}`;
      
      // Redirect to login with return URL and lab ID
      navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
      return;
    }
    
    // If logged in, proceed to booking
    navigate(`/labs/${id}/booking`, {
      state: { selectedTests },
    });
  };

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

          {/* ✅ ADDED: Login status indicator */}
          {/* <div className="mt-4">
            {!isLoggedIn && (
              <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full inline-flex">
                <span className="text-yellow-300">⚠</span>
                <span>Login to select tests and book</span>
                <button
                  onClick={() => {
                    const currentPath = location.pathname;
                    const searchParams = location.search;
                    const fullUrl = `${currentPath}${searchParams}`;
                    navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&labId=${id}`);
                  }}
                  className="ml-2 px-2 py-0.5 text-xs bg-white/30 hover:bg-white/40 rounded transition"
                >
                  Login
                </button>
              </div>
            )}
          </div> */}
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

              {/* ✅ ADDED: Login prompt on test cards */}
              {!isLoggedIn && (
                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500">
                    Login to select
                  </span>
                </div>
              )}
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
              {/* ✅ ADDED: Login status in sticky bar */}
              {!isLoggedIn && (
                <p className="text-sm text-red-600 mt-1">
                  ⚠ Login to book these tests
                </p>
              )}
            </div>

            <button
              onClick={handleBookNow} // ✅ UPDATED: Using new function
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