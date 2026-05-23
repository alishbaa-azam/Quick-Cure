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

  /* -------- COMMON OPTIONS (USER PROFILE ONLY FOR USER) -------- */
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
          path: `/DoctorDashboard/dashboard/${user?.id || user?._id}`,
          color: "text-green-600",
        },
      ];

    case "lab":
      return [
        {
          label: "Lab Dashboard",
          icon: FaBookMedical,
          path: `/lab/dashboard/${user?.id || user?._id}`,
          color: "text-blue-600",
        },
      ];

    case "pharmacy":
      return [
        {
          label: "Pharmacy Dashboard",
          icon: FaBookMedical,
          path: `/pharmacy/dashboard/${user?.id || user?._id}`,
          color: "text-pink-600",
        },
      ];

    default:
      return [];
  }
};
  const commonOptions = [
    ...(role === "user"
      ? [
          {
            label: "User Profile",
            icon: FaUser,
            path: "/userdashboard",
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
