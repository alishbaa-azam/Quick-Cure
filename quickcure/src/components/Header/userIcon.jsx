// // components/UserIcon/UserIcon.js
// import React, { useState } from "react";
// import "./userIcon.css";

// export default function UserIcon({ user, onLogout }) {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleToggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setShowDropdown(false);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getInitials = () => {
//     if (user.displayName) {
//       return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
//     }
//     if (user.username) {
//       return user.username.charAt(0).toUpperCase();
//     }
//     if (user.email) {
//       return user.email.charAt(0).toUpperCase();
//     }
//     return "U";
//   };

//   return (
//     <div className="user-icon-container">
//       <div className="user-avatar" onClick={handleToggleDropdown}>
//         {user.photoURL ? (
//           <img src={user.photoURL} alt="Profile" className="user-avatar-img" />
//         ) : (
//           <div className="user-avatar-initials">{getInitials()}</div>
//         )}
//       </div>
      
//       {showDropdown && (
//         <div className="user-dropdown">
//           <div className="user-info">
//             <p className="user-name">{user.displayName || user.username || user.email}</p>
//             <p className="user-email">{user.email}</p>
//           </div>
//           <div className="dropdown-divider"></div>
//           <button className="dropdown-item" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       )}
      
//       {showDropdown && (
//         <div className="dropdown-overlay" onClick={() => setShowDropdown(false)} />
//       )}
//     </div>
//   );
// }

// components/UserIcon/UserIcon.js
// import React, { useState, useRef, useEffect } from "react";
// import { FaCaretDown, FaSignOutAlt } from "react-icons/fa";

// export default function UserIcon({ user, onLogout }) {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleToggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setShowDropdown(false);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getInitials = () => {
//     if (user.displayName) {
//       return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
//     }
//     if (user.username) {
//       return user.username.charAt(0).toUpperCase();
//     }
//     if (user.email) {
//       return user.email.charAt(0).toUpperCase();
//     }
//     return "U";
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* User Avatar Button */}
//       <button
//         onClick={handleToggleDropdown}
//         className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--bg-light)] transition-all duration-200 border border-[var(--accent-color)]"
//         aria-expanded={showDropdown}
//       >
//         {user.photoURL ? (
//           <img 
//             src={user.photoURL} 
//             alt="Profile" 
//             className="w-8 h-8 rounded-full object-cover"
//           />
//         ) : (
//           <div 
//             className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
//             style={{ backgroundColor: "var(--primary-color)" }}
//           >
//             {getInitials()}
//           </div>
//         )}
//         <FaCaretDown 
//           className={`transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
//           style={{ color: "var(--primary-color)" }}
//         />
//       </button>
      
//       {/* Dropdown Menu */}
//       {showDropdown && (
//         <div 
//           className="absolute top-full right-0 mt-2 w-64 bg-white  shadow-xl border border-gray-200 z-50 py-2"
//           style={{ 
//             borderTop: `3px solid var(--primary-color)`,
//           }}
//         >
//           {/* User Info Section */}
//           <div className="px-4 py-3 border-b border-gray-100">
//             <p className="font-semibold text-gray-800 truncate text-[15px]">
//               {user.displayName || user.username || "User"}
//             </p>
//             <p className="text-sm text-gray-600 truncate mt-1">
//               {user.email}
//             </p>
//           </div>

//           {/* Dropdown Items */}
//           <div className="py-1">
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200 text-[15px] font-medium"
//             >
//               <FaSignOutAlt className="text-red-500" />
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// components/UserIcon/UserIcon.js
// import React, { useState, useRef, useEffect } from "react";
// import { FaCaretDown, FaSignOutAlt, FaUser, FaCog, FaTachometerAlt, FaUserMd, FaBookMedical } from "react-icons/fa";

// export default function UserIcon({ user, onLogout }) {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleToggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setShowDropdown(false);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const handleNavigation = (path) => {
//     setShowDropdown(false);
//     // You can use navigate hook here or window.location
//     window.location.href = path;
//   };

//   const getInitials = () => {
//     if (user.displayName) {
//       return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
//     }
//     if (user.username) {
//       return user.username.charAt(0).toUpperCase();
//     }
//     if (user.email) {
//       return user.email.charAt(0).toUpperCase();
//     }
//     return "U";
//   };

//   // Get user role from user object (assuming role is stored in user data)
//   const getUserRole = () => {
//     return user?.role || 'user'; // Default to 'user' if no role specified
//   };

//   // Get role-specific options
//   const getRoleSpecificOptions = () => {
//     const role = getUserRole();
    
//     switch (role) {
//       case 'admin':
//         return [
//           {
//             label: 'Admin Dashboard',
//             icon: FaTachometerAlt,
//             path: '/admin/dashboard',
//             color: 'text-purple-600'
//           }
//         ];
//       case 'librarian':
//         return [
//           {
//             label: 'Lab Dashboard',
//             icon: FaBookMedical,
//             path: '/lab/dashboard',
//             color: 'text-blue-600'
//           }
//         ];
//       case 'doctor':
//         return [
//           {
//             label: 'Doctor Profile',
//             icon: FaUserMd,
//             path: '/doctor/profile',
//             color: 'text-green-600'
//           }
//         ];
//       default:
//         return [];
//     }
//   };

//   // Common options for all users
//   const commonOptions = [
//     {
//       label: 'User Profile',
//       icon: FaUser,
//       path: '/profile',
//       color: 'text-gray-600'
//     },
//     {
//       label: 'Settings',
//       icon: FaCog,
//       path: '/settings',
//       color: 'text-gray-600'
//     }
//   ];

//   const roleSpecificOptions = getRoleSpecificOptions();
//   const allOptions = [...commonOptions, ...roleSpecificOptions];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* User Avatar Button */}
//       <button
//         onClick={handleToggleDropdown}
//         className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--bg-light)] transition-all duration-200 border border-[var(--accent-color)]"
//         aria-expanded={showDropdown}
//       >
//         {user.photoURL ? (
//           <img 
//             src={user.photoURL} 
//             alt="Profile" 
//             className="w-8 h-8 rounded-full object-cover"
//           />
//         ) : (
//           <div 
//             className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
//             style={{ backgroundColor: "var(--primary-color)" }}
//           >
//             {getInitials()}
//           </div>
//         )}
//         <FaCaretDown 
//           className={`transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
//           style={{ color: "var(--primary-color)" }}
//         />
//       </button>
      
//       {/* Dropdown Menu */}
//       {showDropdown && (
//         <div 
//           className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2"
//           style={{ 
//             borderTop: `3px solid var(--primary-color)`,
//           }}
//         >
//           {/* User Info Section */}
//           <div className="px-4 py-3 border-b border-gray-100">
//             <p className="font-semibold text-gray-800 truncate text-[15px]">
//               {user.displayName || user.username || "User"}
//             </p>
//             <p className="text-sm text-gray-600 truncate mt-1">
//               {user.email}
//             </p>
//             <div className="flex items-center gap-2 mt-2">
//               <span 
//                 className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize"
//                 style={{ 
//                   backgroundColor: "var(--bg-light)",
//                   color: "var(--primary-color)"
//                 }}
//               >
//                 {getUserRole()}
//               </span>
//             </div>
//           </div>

//           {/* Dropdown Items */}
//           <div className="py-1">
//             {allOptions.map((option, index) => {
//               const IconComponent = option.icon;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleNavigation(option.path)}
//                   className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-[15px] font-medium ${option.color}`}
//                 >
//                   <IconComponent className="flex-shrink-0" />
//                   {option.label}
//                 </button>
//               );
//             })}
            
//             {/* Logout Button */}
//             <div className="border-t border-gray-100 mt-1 pt-1">
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200 text-[15px] font-medium"
//               >
//                 <FaSignOutAlt />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import {
  FaCaretDown,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaTachometerAlt,
  FaUserMd,
  FaBookMedical,
} from "react-icons/fa";

export default function UserIcon({ user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const role = user?.role || "user";

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowDropdown(false);
    if (onLogout) onLogout();
  };

  const handleNavigation = (path) => {
    setShowDropdown(false);
    window.location.href = path;
  };

  const getInitials = () => {
    if (user?.displayName)
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    if (user?.username) return user.username[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  /* ---------------- ROLE BASED OPTIONS ---------------- */

  const roleSpecificOptions = () => {
    switch (role) {
      case "admin":
        return [
          {
            label: "Admin Dashboard",
            icon: FaTachometerAlt,
            path: "/admin/dashboard",
            color: "text-purple-600",
          },
        ];

      case "doctor":
        return [
          {
            label: "Doctor Dashboard",
            icon: FaUserMd,
            path: "/doctor/dashboard",
            color: "text-green-600",
          },
        ];

      case "lab":
        return [
          {
            label: "Lab Dashboard",
            icon: FaBookMedical,
            path: "/lab/dashboard",
            color: "text-blue-600",
          },
        ];

      case "pharmacy":
        return [
          {
            label: "Pharmacy Dashboard",
            icon: FaBookMedical,
            path: "/PharmacyDashboard",
            color: "text-pink-600",
          },
        ];

      default:
        return [];
    }
  };

  /* -------- COMMON OPTIONS (USER PROFILE ONLY FOR USER) -------- */

  const commonOptions = [
    ...(role === "user"
      ? [
          {
            label: "User Profile",
            icon: FaUser,
            path: "/profile",
            color: "text-gray-700",
          },
        ]
      : []),

    {
      label: "Settings",
      icon: FaCog,
      path: "/settings",
      color: "text-gray-700",
    },
  ];

  const allOptions = [...commonOptions, ...roleSpecificOptions()];

  /* ---------------- CLICK OUTSIDE CLOSE ---------------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={handleToggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">
            {getInitials()}
          </div>
        )}

        <FaCaretDown
          className={`transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="font-semibold truncate">
              {user?.displayName || user?.username || "User"}
            </p>
            <p className="text-sm text-gray-600 truncate">{user?.email}</p>
            <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-100 capitalize">
              {role}
            </span>
          </div>

          {/* Menu */}
          <div className="py-1">
            {allOptions.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleNavigation(opt.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left ${opt.color}`}
                >
                  <Icon />
                  {opt.label}
                </button>
              );
            })}

            {/* Logout */}
            <div className="border-t">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
