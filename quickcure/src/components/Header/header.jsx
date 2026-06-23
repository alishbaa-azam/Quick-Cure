import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import UserIcon from "./userIcon";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [joinUsDropdown, setJoinUsDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const rootRef = useRef(null);

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

    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    const handleAuthChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
        setUserMenuOpen(false);
      }
    };

    checkScreenSize();
    
    const handleResize = () => {
      checkScreenSize();
      setActiveDropdown(null);
      setJoinUsDropdown(false);
      setUserMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const toggleDropdown = (menu) => setActiveDropdown((cur) => (cur === menu ? null : menu));
  const toggleJoinUsDropdown = () => setJoinUsDropdown((cur) => !cur);
  const toggleUserMenu = () => setUserMenuOpen((cur) => !cur);

  const closeAll = () => {
    setSidebarOpen(false);
    setActiveDropdown(null);
    setJoinUsDropdown(null);
    setUserMenuOpen(false);
  };

  const handleLoginClick = () => {
    closeAll();
    navigate("/login");
  };

  // Handle "Join as Doctor" click - requires login
  const handleJoinAsDoctorClick = () => {
    closeAll();
    
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      // User is logged in - go to registration page
      navigate("/registration");
    } else {
      // User is not logged in - go to login with redirect parameter
      navigate("/login?redirect=registration");
    }
  };

  // Handle "Join as Lab" click - requires login
  const handleJoinAsLabClick = () => {
    closeAll();
    
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      // User is logged in - go to lab registration page
      navigate("/regis");
    } else {
      // User is not logged in - go to login with redirect parameter
      navigate("/login?redirect=regis");
    }
  };

  // Handle "Join as Pharmacy" click - requires login
  const handleJoinAsPharmacyClick = () => {
    closeAll();
    
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      // User is logged in - go to pharmacy registration page
      navigate("/reg");
    } else {
      // User is not logged in - go to login with redirect parameter
      navigate("/login?redirect=reg");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    closeAll();
    navigate("/");
    window.dispatchEvent(new Event('authChange'));
  };

  // Navigate to user profile based on role
  const handleViewProfile = () => {
    closeAll();
    if (user?.role === 'doctor') {
      navigate("/DoctorDashboard/dashboard/:id");
    } else if (user?.role === 'lab') {
      navigate("/lab/dashboard/:id");
    } else if (user?.role === 'pharmacy') {
      const entityId = user?.pharmacyId || user?.id || user?._id;
      if (entityId) {
        navigate(`/pharmacy/dashboard/${entityId}`);
      } else {
        navigate('/pharmacies');
      }
    } else if (user?.role === 'admin') {
      navigate("/admin/dashboard/:id");
    }else {
      navigate("/userdashboard");
    }
  };

  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current?.contains(e.target)) {
        closeAll();
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);
  
  const CHUGHTAI_LAB_ID = "69db564eb03bdd408b8e7292";
  const ESSA_LAB_ID = "69dbeaec09ad17c0d8a883ff";
  const ALNOOR_LAB_ID = "69b19a26243075f1d6068c8b";
  
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
      { label: "Pharmacies", to: "/Pharmacies" },
      { label: "Medicines", to: "/medicines" },
    ],
    labs: [
      { label: "Chughtai Lab", to:`/labs/${CHUGHTAI_LAB_ID}`},
      { label: "Dr. Essa's Laboratory", to: `/labs/${ESSA_LAB_ID}` },
      { label: "Alnoor Diagnostic Lab", to: `/labs/${ALNOOR_LAB_ID}` },
      { label: "All Labs", to: "/labs" },
    ],
    joinUs: [
      { label: "Join as Doctor", to: "/registration", action: "doctorRegistration", requiresAuth: true },
      { label: "Join as Lab", to: "/regis", action: "labRegistration", requiresAuth: true },
      { label: "Join as Pharmacy", to: "/reg", action: "pharmacyRegistration", requiresAuth: true },
    ],
  };

  return (
    <div ref={rootRef}>
      <header
        className="fixed top-0 left-0 w-full shadow-md z-50"
        style={{ backgroundColor: "var(--white)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-6 py-3 sm:py-2">
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
            <span className="text-xl sm:text-2xl">QuickCure</span> 
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-4 font-medium"
            style={{ color: "var(--primary-color)" }}
            aria-label="Primary"
          >
            {(["doctor", "medicines", "labs"]).map((menuKey) => {
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

            <div
              className="relative"
              onMouseEnter={() => !isMobile && setJoinUsDropdown(true)}
              onMouseLeave={() => !isMobile && setJoinUsDropdown(false)}
            >
              <button
                className="flex items-center gap-1 sm:gap-2 px-2 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                aria-haspopup="true"
                aria-expanded={joinUsDropdown}
                onClick={() => !isMobile && toggleJoinUsDropdown()}
              >
                Join Us
                <FaCaretDown className={`transition-transform duration-200 ${joinUsDropdown ? "rotate-180" : ""}`} />
              </button>
              
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 shadow-xl border border-gray-100 min-w-[180px] sm:min-w-[200px] z-50 transition-all duration-200 ${
                  joinUsDropdown 
                    ? "opacity-100 visible translate-y-0" 
                    : "opacity-0 invisible -translate-y-2"
                }`}
                style={{
                  backgroundColor: "var(--white)",
                  borderTop: `4px solid var(--primary-color)`,
                }}
              >
                <button
                  onClick={handleJoinAsDoctorClick}
                  className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                  style={{ color: "var(--primary-color)" }}
                >
                  Join as Doctor
                </button>
                
                <button
                  onClick={handleJoinAsLabClick}
                  className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                  style={{ color: "var(--primary-color)" }}
                >
                  Join as Lab
                </button>

                <button
                  onClick={handleJoinAsPharmacyClick}
                  className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  style={{ color: "var(--primary-color)" }}
                >
                  Join as Pharmacy
                </button>
              </div>
            </div>

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
          
          {/* Mobile Menu Button */}
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

      {/* Mobile Sidebar */}
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
          {/* Mobile User Profile Section */}
          {isLoggedIn && user && (
            <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 
                     user.username ? user.username.charAt(0).toUpperCase() : 
                     user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base truncate">
                    {user.displayName || user.username || user.email}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user.email}
                  </p>
                  {user.role && (
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Mobile User Actions */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-blue-200">
                <button
                  onClick={handleViewProfile}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white)",
                  }}
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "var(--white)",
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {(["doctor", "medicines", "labs"]).map((menuKey) => {
            const label = menuKey === "doctor" ? "Doctors" : 
                         menuKey === "medicines" ? "Medicines" : "Labs";
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

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleDropdown('joinUs')}
              className="flex items-center justify-between w-full py-4 px-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
              aria-expanded={activeDropdown === 'joinUs'}
            >
              <span className="font-semibold text-base">Join Us</span>
              <FaCaretDown className={`transition-transform duration-200 ${activeDropdown === 'joinUs' ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeDropdown === 'joinUs' ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pb-2 pl-4 flex flex-col">
                <button
                  onClick={handleJoinAsDoctorClick}
                  className="py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm text-left"
                >
                  Join as Doctor
                </button>
                
                <button
                  onClick={handleJoinAsLabClick}
                  className="py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm text-left"
                >
                  Join as Lab
                </button>

                <button
                  onClick={handleJoinAsPharmacyClick}
                  className="py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm text-left"
                >
                  Join as Pharmacy
                </button>
              </div>
            </div>
          </div>

          <Link 
            to="/about" 
            onClick={closeAll} 
            className="py-4 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 text-base font-semibold"
          >
            About
          </Link>

          {/* Show login button only if not logged in */}
          {!isLoggedIn && (
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

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          onClick={closeAll}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}  

      <div className="h-[72px] sm:h-[68px] md:h-[72px]" />
    </div>
  );
}


// import React, { useEffect, useRef, useState } from "react";
// import { FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../images/logo.svg";
// import UserIcon from "./userIcon";

// export default function Header() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [joinUsDropdown, setJoinUsDropdown] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const rootRef = useRef(null);

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = localStorage.getItem("token");
//       const userData = localStorage.getItem("user");
      
//       if (token && userData) {
//         setIsLoggedIn(true);
//         setUser(JSON.parse(userData));
//       } else {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     };

//     checkLoginStatus();

//     const handleStorageChange = () => {
//       checkLoginStatus();
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     const handleAuthChange = () => {
//       checkLoginStatus();
//     };

//     window.addEventListener('authChange', handleAuthChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('authChange', handleAuthChange);
//     };
//   }, []);

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
//       setActiveDropdown(null);
//       setJoinUsDropdown(false);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => setSidebarOpen((s) => !s);
//   const toggleDropdown = (menu) => setActiveDropdown((cur) => (cur === menu ? null : menu));
//   const toggleJoinUsDropdown = () => setJoinUsDropdown((cur) => !cur);

//   const closeAll = () => {
//     setSidebarOpen(false);
//     setActiveDropdown(null);
//     setJoinUsDropdown(false);
//   };

//   const handleLoginClick = () => {
//     closeAll();
//     navigate("/login");
//   };

//   // Handle "Join as Doctor" click - requires login
//   const handleJoinAsDoctorClick = () => {
//     closeAll();
    
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");
    
//     if (token && userData) {
//       // User is logged in - go to registration page
//       navigate("/registration");
//     } else {
//       // User is not logged in - go to login with redirect parameter
//       navigate("/login?redirect=registration");
//     }
//   };

//   // Handle "Join as Lab" click - requires login
//   const handleJoinAsLabClick = () => {
//     closeAll();
    
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");
    
//     if (token && userData) {
//       // User is logged in - go to lab registration page
//       navigate("/regis");
//     } else {
//       // User is not logged in - go to login with redirect parameter
//       navigate("/login?redirect=regis");
//     }
//   };

//   // Handle "Join as Pharmacy" click - requires login
//   const handleJoinAsPharmacyClick = () => {
//     closeAll();
    
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");
    
//     if (token && userData) {
//       // User is logged in - go to pharmacy registration page
//       navigate("/reg");
//     } else {
//       // User is not logged in - go to login with redirect parameter
//       navigate("/login?redirect=reg");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUser(null);
//     closeAll();
//     navigate("/");
//     window.dispatchEvent(new Event('authChange'));
//   };

//   useEffect(() => {
//     function onDocClick(e) {
//       if (!rootRef.current?.contains(e.target)) {
//         closeAll();
//       }
//     }
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);
  
//   const CHUGHTAI_LAB_ID = "69db564eb03bdd408b8e7292";
//   const ESSA_LAB_ID = "69dbeaec09ad17c0d8a883ff";
//   const ALNOOR_LAB_ID = "69b19a26243075f1d6068c8b";
  
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
//       { label: "Pharmacies", to: "/Pharmacies" },
//       { label: "Medicines", to: "/medicines" },
//     ],
//     labs: [
//       { label: "Chughtai Lab", to:`/labs/${CHUGHTAI_LAB_ID}`},
//       { label: "Dr. Essa's Laboratory", to: `/labs/${ESSA_LAB_ID}` },
//       { label: "Alnoor Diagnostic Lab", to: `/labs/${ALNOOR_LAB_ID}` },
//       { label: "All Labs", to: "/labs" },
//     ],
//     joinUs: [
//       { label: "Join as Doctor", to: "/registration", action: "doctorRegistration", requiresAuth: true },
//       { label: "Join as Lab", to: "/regis", action: "labRegistration", requiresAuth: true },
//       { label: "Join as Pharmacy", to: "/reg", action: "pharmacyRegistration", requiresAuth: true },
//     ],
//   };

//   return (
//     <div ref={rootRef}>
//       <header
//         className="fixed top-0 left-0 w-full shadow-md z-50"
//         style={{ backgroundColor: "var(--white)" }}
//       >
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-6 lg:px-6 py-3 sm:py-2">
//           <Link
//             to="/"
//             className="flex items-center gap-2 sm:gap-2 font-semibold text-lg sm:text-xl lg:text-2xl min-w-0"
//             style={{ color: "var(--primary-color)", fontWeight:"700" }}
//             onClick={closeAll}
//           >
//             <img 
//               src={logo} 
//               alt="QuickCure Logo" 
//               className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" 
//             />
//             <span className="text-2xl">QuickCure</span> 
//           </Link>

//           <nav
//             className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-4 font-medium"
//             style={{ color: "var(--primary-color)" }}
//             aria-label="Primary"
//           >
//             {(["doctor", "medicines", "labs"]).map((menuKey) => {
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

//             <div
//               className="relative"
//               onMouseEnter={() => !isMobile && setJoinUsDropdown(true)}
//               onMouseLeave={() => !isMobile && setJoinUsDropdown(false)}
//             >
//               <button
//                 className="flex items-center gap-1 sm:gap-2 px-2 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
//                 aria-haspopup="true"
//                 aria-expanded={joinUsDropdown}
//                 onClick={() => !isMobile && toggleJoinUsDropdown()}
//               >
//                 Join Us
//                 <FaCaretDown className={`transition-transform duration-200 ${joinUsDropdown ? "rotate-180" : ""}`} />
//               </button>
              
//               <div
//                 className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 shadow-xl border border-gray-100 min-w-[180px] sm:min-w-[200px] z-50 transition-all duration-200 ${
//                   joinUsDropdown 
//                     ? "opacity-100 visible translate-y-0" 
//                     : "opacity-0 invisible -translate-y-2"
//                 }`}
//                 style={{
//                   backgroundColor: "var(--white)",
//                   borderTop: `4px solid var(--primary-color)`,
//                 }}
//               >
//                 <button
//                   onClick={handleJoinAsDoctorClick}
//                   className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   Join as Doctor
//                 </button>
                
//                 <button
//                   onClick={handleJoinAsLabClick}
//                   className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   Join as Lab
//                 </button>

//                 <button
//                   onClick={handleJoinAsPharmacyClick}
//                   className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   Join as Pharmacy
//                 </button>
//               </div>
//             </div>

//             {isLoggedIn ? (
//               <UserIcon user={user} onLogout={handleLogout} />
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="px-4 py-4 lg:px-5 lg:py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 font-medium text-sm lg:text-base whitespace-nowrap"
//                 style={{
//                   backgroundColor: "var(--primary-color)",
//                   color: "var(--white)",
//                 }}
//               >
//                 Login
//               </button>
//             )}
//           </nav>
          
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
//           {isLoggedIn && user && (
//             <div className="mb-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
//               <div className="flex items-center gap-3">
//                 {user.photoURL ? (
//                   <img 
//                     src={user.photoURL} 
//                     alt="Profile" 
//                     className="w-10 h-10 rounded-full"
//                   />
//                 ) : (
//                   <div 
//                     className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
//                     style={{ backgroundColor: "var(--primary-color)" }}
//                   >
//                     {user.displayName ? user.displayName.charAt(0).toUpperCase() : 
//                      user.username ? user.username.charAt(0).toUpperCase() : 
//                      user.email ? user.email.charAt(0).toUpperCase() : "U"}
//                   </div>
//                 )}
//                 <div className="flex-1 min-w-0">
//                   <p className="font-semibold text-sm truncate">
//                     {user.displayName || user.username || user.email}
//                   </p>
//                   <p className="text-xs text-gray-600 truncate">
//                     {user.email}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {(["doctor", "medicines", "labs"]).map((menuKey) => {
//             const label = menuKey === "doctor" ? "Doctors" : 
//                          menuKey === "medicines" ? "Medicines" : "Labs";
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

//           <div className="border-b border-gray-200">
//             <button
//               onClick={() => toggleDropdown('joinUs')}
//               className="flex items-center justify-between w-full py-4 px-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
//               aria-expanded={activeDropdown === 'joinUs'}
//             >
//               <span className="font-semibold text-base">Join Us</span>
//               <FaCaretDown className={`transition-transform duration-200 ${activeDropdown === 'joinUs' ? "rotate-180" : ""}`} />
//             </button>

//             <div
//               className={`overflow-hidden transition-all duration-300 ${
//                 activeDropdown === 'joinUs' ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               }`}
//             >
//               <div className="pb-2 pl-4 flex flex-col">
//                 <button
//                   onClick={handleJoinAsDoctorClick}
//                   className="py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm text-left"
//                 >
//                   Join as Doctor
//                 </button>
                
//                 <button
//                   onClick={handleJoinAsLabClick}
//                   className="py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm text-left"
//                 >
//                   Join as Lab
//                 </button>

//                 <button
//                   onClick={handleJoinAsPharmacyClick}
//                   className="py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm text-left"
//                 >
//                   Join as Pharmacy
//                 </button>
//               </div>
//             </div>
//           </div>

//           <Link 
//             to="/about" 
//             onClick={closeAll} 
//             className="py-4 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 text-base font-semibold"
//           >
//             About
//           </Link>

//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="px-6 py-3 rounded-lg mt-6 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-base"
//               style={{
//                 backgroundColor: "#e74c3c",
//                 color: "var(--white)",
//               }}
//             >
//               Logout
//             </button>
//           ) : (
//             <button
//               onClick={handleLoginClick}
//               className="px-6 py-3 rounded-lg mt-6 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-base"
//               style={{
//                 backgroundColor: "var(--primary-color)",
//                 color: "var(--white)",
//               }}
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </aside>

//       {sidebarOpen && (
//         <div
//           onClick={closeAll}
//           className="fixed inset-0 bg-white bg-opacity-50 z-30 backdrop-blur-sm md:hidden"
//           aria-hidden="true"
//         />
//       )}  

//       <div className="h-[80px] sm:h-[60px]" />
//     </div>
//   );
// }


