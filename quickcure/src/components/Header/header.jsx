// import React, { useState } from "react";
// import "./header.css";
// import logo from "../images/logo.svg";
// import { FaCaretDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom"; 

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const navigate = useNavigate(); 

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleDropdown = (dropdownName) => {
//     setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//     setActiveDropdown(null);
//   };

 
//   const handleLoginClick = () => {
//     closeMenu();
//     navigate("/login"); // navigate to the Login page
//   };

//   return (
//     <nav>
//       <section className="navbar">
//         <div className="logo">
//           <img src={logo} alt="logo" />
//           <h3>QuickCure</h3>
//         </div>

//         <div className="menu-toggle" onClick={toggleMenu}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>


//         <ul className={isMenuOpen ? "active" : ""}>
        

//           <li className={`dropdown ${activeDropdown === "doctor" ? "active" : ""}`}>
//             <Link to="" onClick={() => toggleDropdown("doctor")}>
//               Doctors <FaCaretDown />
//             </Link>
//             <div className="dropdown-content">
//               <Link to="/specialites/dermatologist" onClick={closeMenu}>Dermatologist</Link>
//               <Link to="/specialities/gynecologist" onClick={closeMenu}>Gynecologist</Link>
//               <Link to="" onClick={closeMenu}>Neurologist</Link>
//               <Link to="" onClick={closeMenu}>Psychiatrist</Link>
//               <Link to="" onClick={closeMenu}>Psychologist</Link>
//               <Link to="" onClick={closeMenu}>Urologist</Link>
//               <Link to="" onClick={closeMenu}>Pediatrician</Link>
//               <Link to="" onClick={closeMenu}>Nutritionist</Link>
//               <Link to="/doctors" onClick={closeMenu}>All specialities</Link>
//             </div>
//           </li>

//           <li className={`dropdown ${activeDropdown === "medicines" ? "active" : ""}`}>
//             <Link href="" onClick={() => toggleDropdown("medicines")}>
//               Medicines <FaCaretDown />
//             </Link>
//             <div className="dropdown-content">
//               <Link to="" onClick={closeMenu}>Medicines</Link>
//               <Link to="pharmacy" onClick={closeMenu}>All Medicines</Link>
//             </div>
//           </li>

//           <li className={`dropdown ${activeDropdown === "labs" ? "active" : ""}`}>
//             <Link to="" onClick={() => toggleDropdown("labs")}>
//               Labs <FaCaretDown />
//             </Link>
//             <div className="dropdown-content">
//               <Link to="" onClick={closeMenu}>Chughtai Lab</Link>
//               <Link to="" onClick={closeMenu}>Dr. Essa’s Laboratory & Diagnostic Center</Link>
//               <Link to="" onClick={closeMenu}>Excel Labs</Link>
//               <Link to="/labs" onClick={closeMenu}>All Labs</Link>
//             </div>
//           </li>

//           <Link  to="/about" onClick={closeMenu}><li>About</li></Link>
//           {/* <li className="w-30"><a href="#!" onClick={closeMenu}>Join as doctor</a></li> */}
//           <Link to="registration" onClick={closeMenu}><li className="w-30">Join as doctor</li></Link>
         
//           <button className="login-btn" onClick={handleLoginClick}>
//             Login
//           </button>
//         </ul>
//       </section>
//     </nav>
//   );
// }

// src/components/Header.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../images/logo.svg";

// export default function Header() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const navigate = useNavigate();
//   const rootRef = useRef(null);

//   // Enhanced responsive detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setSidebarOpen(false);
//       }
//     };

//     checkScreenSize();
    
//     const handleResize = () => {
//       checkScreenSize();
//       setActiveDropdown(null); // Close dropdowns on resize
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => setSidebarOpen((s) => !s);

//   const toggleDropdown = (menu) =>
//     setActiveDropdown((cur) => (cur === menu ? null : menu));

//   const closeAll = () => {
//     setSidebarOpen(false);
//     setActiveDropdown(null);
//   };

//   const handleLoginClick = () => {
//     closeAll();
//     navigate("/login");
//   };

//   // Close when clicking outside
//   useEffect(() => {
//     function onDocClick(e) {
//       if (!rootRef.current?.contains(e.target)) {
//         closeAll();
//       }
//     }
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);

//   // Data for menus
//   const menus = {
//     doctor: [
//       { label: "Dermatologist", to: "/specialities/dermatologist" },
//       { label: "Gynecologist", to: "/specialities/gynecologist" },
//       { label: "Neurologist", to: "/specialities/neurologist" },
//       { label: "Psychiatrist", to: "/specialities/psychiatrist" },
//       { label: "Psychologist", to: "/specialities/psychologist" },
//       { label: "Urologist", to: "/specialities/urologist" },
//       { label: "Pediatrician", to: "/specialities/pediatrician" },
//       { label: "Nutritionist", to: "/specialities/nutritionist" },
//       { label: "All Specialities", to: "/doctors" },
//     ],
//     medicines: [
//       { label: "Medicines", to: "/medicines" },
//       { label: "All Medicines", to: "/pharmacy" },
//     ],
//     labs: [
//       { label: "Chughtai Lab", to: "/labs/chughtai" },
//       { label: "Dr. Essa's Laboratory", to: "/labs/essa" },
//       { label: "Excel Labs", to: "/labs/excel" },
//       { label: "All Labs", to: "/labs" },
//     ],
//   };

//   return (
//     <div ref={rootRef}>
//       {/* NAVBAR */}
//       <header
//         className="fixed top-0 left-0 w-full shadow-md z-50"
//         style={{ backgroundColor: "var(--white)" }}
//       >
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-6 lg:px-6 py-3 sm:py-2">
//           {/* Logo - Improved responsive sizing */}
//           <div
//             // to="/"
//             className="flex items-center gap-2 sm:gap-2 font-semibold text-lg sm:text-xl lg:text-2xl min-w-0"
//             style={{ color: "var(--primary-color)", fontWeight:"700" }}
//             // onClick={closeAll}
//           >
//             <img 
//               src={logo} 
//               alt="QuickCure Logo" 
//               className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" 
//             />
//             {/* <span className="hidden xs:inline">QuickCure</span> */}
//             <span className="text-2xl">QuickCure</span> 
//           </div>

//           {/* Desktop menu - Improved responsive spacing */}
//           <nav
//             className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-4 font-medium"
//             style={{ color: "var(--primary-color)" }}
//             aria-label="Primary"
//           >
//              {/* <Link 
//               to="/home" 
//               className="px-2 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base"
//             >Home</Link> */}
//             {(["doctor", "medicines", "labs"] ).map((menuKey) => {
//               const isOpen = activeDropdown === menuKey;
//               const label = menuKey === "doctor" ? "Doctors" : menuKey === "medicines" ? "Medicines" : "Labs";
              
//               return (
//                 <div
//                   key={menuKey}
//                   className="relative"
//                   onMouseEnter={() => !isMobile && setActiveDropdown(menuKey)}
//                   onMouseLeave={() => !isMobile && setActiveDropdown(null)}
//                 >
//                   <button
//                     className="flex items-center gap-1 sm:gap-2 px-2 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base"
//                     aria-haspopup="true"
//                     aria-expanded={isOpen}
//                     onClick={() => !isMobile && toggleDropdown(menuKey)}
//                   >
//                     {label}
//                     <FaCaretDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
//                   </button>
                  
//                   {/* Dropdown panel */}
//                   <div
//                     className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 shadow-xl border border-gray-100 min-w-[200px] sm:min-w-[200px] z-50 transition-all duration-200 ${
//                       isOpen 
//                         ? "opacity-100 visible translate-y-0" 
//                         : "opacity-0 invisible -translate-y-2"
//                     }`}
//                     style={{
//                       backgroundColor: "var(--white)",
//                       borderTop: `4px solid var(--primary-color)`,
//                     }}
//                   >
//                     {menus[menuKey].map((item) => (
//                       <Link
//                         key={item.to}
//                         to={item.to}
//                         className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
//                         style={{ color: "var(--primary-color)" }}
//                         onClick={() => setActiveDropdown(null)}
//                       >
//                         {item.label}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}

//             <Link 
//               to="/about" 
//               className="px-2 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base"
//             >
//               About
//             </Link>
//             <Link 
//               to="/registration" 
//               className="px-2 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
//             >
//               Join as Doctor
//             </Link>

//             <button
//               onClick={handleLoginClick}
//               className="px-4 py-4 lg:px-5 lg:py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 font-medium text-sm lg:text-base whitespace-nowrap"
//               style={{
//                 backgroundColor: "var(--primary-color)",
//                 color: "var(--white)",
                
//               }}
//             >
//               Login
//             </button>
//           </nav>

//           {/* Mobile menu button - Improved touch targets */}
//           <button
//             onClick={toggleSidebar}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             aria-label={sidebarOpen ? "Close menu" : "Open menu"}
//             style={{ color: "var(--primary-color)" }}
//             aria-expanded={sidebarOpen}
//           >
//             {sidebarOpen ? (
//               <FaTimes className="text-xl sm:text-2xl" />
//             ) : (
//               <FaBars className="text-xl sm:text-2xl" />
//             )}
//           </button>
//         </div>
//       </header>

//       {/* SIDEBAR - Improved mobile experience */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-80 max-w-[90vw] shadow-2xl transform transition-transform duration-300 ease-out z-40 overflow-y-auto ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         style={{ 
//           backgroundColor: "var(--white)", 
//           color: "var(--primary-color)" 
//         }}
//         aria-hidden={!sidebarOpen}
//       >
//         <div className="p-6 pt-20 flex flex-col gap-1 font-medium">
//           {/* Sidebar menus with better mobile UX */}
//           {(["doctor", "medicines", "labs"]).map((menuKey) => {
//             const label = menuKey === "doctor" ? "Doctors" : menuKey === "medicines" ? "Medicines" : "Labs";
//             const isOpen = activeDropdown === menuKey;
            
//             return (
//               <div key={menuKey} className="border-b border-gray-200 last:border-b-0">
//                 <button
//                   onClick={() => toggleDropdown(menuKey)}
//                   className="flex items-center justify-between w-full py-4 px-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
//                   aria-expanded={isOpen}
//                 >
//                   <span className="font-semibold text-base">{label}</span>
//                   <FaCaretDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
//                 </button>

//                 <div
//                   className={`overflow-hidden transition-all duration-300 ${
//                     isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                   }`}
//                 >
//                   <div className="pb-2 pl-4 flex flex-col">
//                     {menus[menuKey].map((item) => (
//                       <Link
//                         key={item.to}
//                         to={item.to}
//                         onClick={closeAll}
//                         className="py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
//                       >
//                         {item.label}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           <Link 
//             to="/about" 
//             onClick={closeAll} 
//             className="py-4 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 text-base font-semibold"
//           >
//             About
//           </Link>
//           <Link 
//             to="/registration" 
//             onClick={closeAll} 
//             className="py-4 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 text-base font-semibold"
//           >
//             Join as Doctor
//           </Link>

//           <button
//             onClick={handleLoginClick}
//             className="px-6 py-3 rounded-lg mt-6 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-base"
//             style={{
//               backgroundColor: "var(--primary-color)",
//               color: "var(--white)",
//             }}
//           >
//             Login
//           </button>
//         </div>
//       </aside>

//       {/* Overlay with better backdrop */}
//       {sidebarOpen && (
//         <div
//           onClick={closeAll}
//           className="fixed inset-0 bg-white bg-opacity-50 z-30 backdrop-blur-sm md:hidden"
//           aria-hidden="true"
//         />
//       )}

//       {/* Spacer for content */}
//       <div className="h-16 sm:h-20" />
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import UserIcon from "./userIcon"; // Make sure to create this component

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const rootRef = useRef(null);

  // Check login status on component mount and when token changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();

    // Listen for storage changes (for logging out from other tabs)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for login/logout within same tab
    const handleAuthChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Enhanced responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    
    const handleResize = () => {
      checkScreenSize();
      setActiveDropdown(null); // Close dropdowns on resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  const toggleDropdown = (menu) =>
    setActiveDropdown((cur) => (cur === menu ? null : menu));

  const closeAll = () => {
    setSidebarOpen(false);
    setActiveDropdown(null);
  };

  const handleLoginClick = () => {
    closeAll();
    navigate("/login");
  };

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Update state
    setIsLoggedIn(false);
    setUser(null);
    
    // Close sidebar if open
    closeAll();
    
    // Navigate to home page
    navigate("/");
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
  };

  // Close when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current?.contains(e.target)) {
        closeAll();
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Data for menus
  const menus = {
    doctor: [
      { label: "Dermatologist", to: "/specialities/dermatologist" },
      { label: "Gynecologist", to: "/specialities/gynecologist" },
      { label: "Neurologist", to: "/specialities/neurologist" },
      { label: "Psychiatrist", to: "/specialities/psychiatrist" },
      { label: "Psychologist", to: "/specialities/psychologist" },
      { label: "Urologist", to: "/specialities/urologist" },
      { label: "Pediatrician", to: "/specialities/pediatrician" },
      { label: "Nutritionist", to: "/specialities/nutritionist" },
      { label: "All Specialities", to: "/doctors" },
    ],
    medicines: [
      { label: "Medicines", to: "/medicines" },
      { label: "All Medicines", to: "/pharmacy" },
    ],
    labs: [
      { label: "Chughtai Lab", to: "/labs/chughtai" },
      { label: "Dr. Essa's Laboratory", to: "/labs/essa" },
      { label: "Excel Labs", to: "/labs/excel" },
      { label: "All Labs", to: "/labs" },
    ],
  };

  return (
    <div ref={rootRef}>
      {/* NAVBAR */}
      <header
        className="fixed top-0 left-0 w-full shadow-md z-50"
        style={{ backgroundColor: "var(--white)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-6 lg:px-6 py-3 sm:py-2">
          {/* Logo - Improved responsive sizing */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2 font-semibold text-lg sm:text-xl lg:text-2xl min-w-0"
            style={{ color: "var(--primary-color)", fontWeight:"700" }}
            onClick={closeAll}
          >
            <img 
              src={logo} 
              alt="QuickCure Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" 
            />
            <span className="text-2xl">QuickCure</span> 
          </Link>

          {/* Desktop menu - Improved responsive spacing */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-4 font-medium"
            style={{ color: "var(--primary-color)" }}
            aria-label="Primary"
          >
            {(["doctor", "medicines", "labs"] ).map((menuKey) => {
              const isOpen = activeDropdown === menuKey;
              const label = menuKey === "doctor" ? "Doctors" : menuKey === "medicines" ? "Medicines" : "Labs";
              
              return (
                <div
                  key={menuKey}
                  className="relative"
                  onMouseEnter={() => !isMobile && setActiveDropdown(menuKey)}
                  onMouseLeave={() => !isMobile && setActiveDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 sm:gap-2 px-2 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => !isMobile && toggleDropdown(menuKey)}
                  >
                    {label}
                    <FaCaretDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 shadow-xl border border-gray-100 min-w-[200px] sm:min-w-[200px] z-50 transition-all duration-200 ${
                      isOpen 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                    style={{
                      backgroundColor: "var(--white)",
                      borderTop: `4px solid var(--primary-color)`,
                    }}
                  >
                    {menus[menuKey].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                        style={{ color: "var(--primary-color)" }}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            <Link 
              to="/about" 
              className="px-2 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base"
            >
              About
            </Link>
            <Link 
              to="/registration" 
              className="px-2 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
            >
              Join as Doctor
            </Link>

            {/* Login Button or User Icon */}
            {isLoggedIn ? (
              <UserIcon user={user} onLogout={handleLogout} />
            ) : (
              <button
                onClick={handleLoginClick}
                className="px-4 py-4 lg:px-5 lg:py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 font-medium text-sm lg:text-base whitespace-nowrap"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--white)",
                }}
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile menu button - Improved touch targets */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            style={{ color: "var(--primary-color)" }}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? (
              <FaTimes className="text-xl sm:text-2xl" />
            ) : (
              <FaBars className="text-xl sm:text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* SIDEBAR - Improved mobile experience */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 max-w-[90vw] shadow-2xl transform transition-transform duration-300 ease-out z-40 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ 
          backgroundColor: "var(--white)", 
          color: "var(--primary-color)" 
        }}
        aria-hidden={!sidebarOpen}
      >
        <div className="p-6 pt-20 flex flex-col gap-1 font-medium">
          {/* User info if logged in */}
          {isLoggedIn && user && (
            <div className="mb-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 
                     user.username ? user.username.charAt(0).toUpperCase() : 
                     user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {user.displayName || user.username || user.email}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar menus with better mobile UX */}
          {(["doctor", "medicines", "labs"]).map((menuKey) => {
            const label = menuKey === "doctor" ? "Doctors" : menuKey === "medicines" ? "Medicines" : "Labs";
            const isOpen = activeDropdown === menuKey;
            
            return (
              <div key={menuKey} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleDropdown(menuKey)}
                  className="flex items-center justify-between w-full py-4 px-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-base">{label}</span>
                  <FaCaretDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-2 pl-4 flex flex-col">
                    {menus[menuKey].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeAll}
                        className="py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <Link 
            to="/about" 
            onClick={closeAll} 
            className="py-4 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 text-base font-semibold"
          >
            About
          </Link>
          <Link 
            to="/registration" 
            onClick={closeAll} 
            className="py-4 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 text-base font-semibold"
          >
            Join as Doctor
          </Link>

          {/* Mobile login/logout button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-lg mt-6 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-base"
              style={{
                backgroundColor: "#e74c3c",
                color: "var(--white)",
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-6 py-3 rounded-lg mt-6 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-base"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white)",
              }}
            >
              Login
            </button>
          )}
        </div>
      </aside>

      {/* Overlay with better backdrop */}
      {sidebarOpen && (
        <div
          onClick={closeAll}
          className="fixed inset-0 bg-white bg-opacity-50 z-30 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Spacer for content */}
      <div className="h-16 sm:h-20" />
    </div>
  );
}