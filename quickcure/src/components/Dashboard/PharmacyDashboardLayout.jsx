// components/Dashboard/PharmacyDashboardLayout.jsx
// import React, { useState } from 'react';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import { 
//   BarChart3, Bell, Home, Menu, Package, 
//   Search, Settings, ShoppingBag, ShoppingCart, 
//   TrendingUp, Users, DollarSign, FileText, Circle,
//   Building, Eye
// } from 'lucide-react';

// const PharmacyDashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [pharmacyOpen, setPharmacyOpen] = useState(true);
//   const location = useLocation();

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const togglePharmacyStatus = () => setPharmacyOpen(!pharmacyOpen);

//   const navItems = [
//     { path: '/PharmacyDashboard', label: 'Dashboard', icon: <Home size={20} /> },
//     { path: '/PharmacyDashboard/features', label: 'Features', icon: <Circle size={20} /> },
//     { path: '/PharmacyDashboard/categories', label: 'Category', icon: <ShoppingBag size={20} /> },
//     { path: '/PharmacyDashboard/products', label: 'Products', icon: <Package size={20} /> },
//     { path: '/PharmacyDashboard/sales', label: 'Sales', icon: <TrendingUp size={20} /> },
//     { path: '/PharmacyDashboard/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
//     { path: '/PharmacyDashboard/customers', label: 'Customer', icon: <Users size={20} /> },
//     { path: '/PharmacyDashboard/finance', label: 'Finance', icon: <DollarSign size={20} /> },
//     { path: '/PharmacyDashboard/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
//     { path: '/PharmacyDashboard/support', label: 'Support', icon: <FileText size={20} /> },
//     { path: '/PharmacyDashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
//       {/* Header */}
//       <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
//         <div className="flex items-center justify-between px-6 py-4">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={toggleSidebar}
//               className="p-2 rounded-lg hover:bg-gray-100"
//             >
//               <Menu size={24} />
//             </button>
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
//               <span className="text-xl font-bold bg-gradient-to-r from-[#2c6774] to-[#5c878f] bg-clip-text text-transparent">
//                 QuickCure
//               </span>
//             </div>
//           </div>
          
//           <div className="flex-1 max-w-2xl mx-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search medicines, orders, analytics..."
//                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 bg-white/50 backdrop-blur-sm"
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <button className="relative p-2 rounded-lg hover:bg-gray-100">
//               <Bell size={22} />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
//             <Link 
//               to="/pharmacies" 
//               className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:opacity-90 transition-all"
//             >
//               <Building size={18} />
//               <span>View Public Page</span>
//             </Link>
//             <div className="flex items-center space-x-3">
//               <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
//               <div>
//                 <p className="text-sm font-semibold">Welcome Code Astro!</p>
//                 <p className="text-xs text-gray-500">Admin</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white/70 backdrop-blur-md shadow-lg`}>
//           <div className="h-full py-6 overflow-y-auto">
//             <nav className="space-y-1 px-4">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
//                     location.pathname === item.path
//                       ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 border-l-4 border-emerald-500'
//                       : 'hover:bg-gray-100/50 text-gray-600'
//                   }`}
//                 >
//                   {item.icon}
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {/* Pharmacy Status Bar */}
//           <div className="flex justify-between items-center mb-8">
//             <div className="flex items-center space-x-4">
//               <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${pharmacyOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
//                 <div className={`w-3 h-3 rounded-full ${pharmacyOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
//                 <span className="font-medium">{pharmacyOpen ? 'Open Now' : 'Closed'}</span>
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800">MediCare Pharmacy</h1>
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 onClick={togglePharmacyStatus}
//                 className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
//                   pharmacyOpen
//                     ? 'bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 hover:bg-red-100'
//                     : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 hover:bg-emerald-100'
//                 }`}
//               >
//                 {pharmacyOpen ? 'Close Pharmacy' : 'Open Pharmacy'}
//               </button>
//               <Link
//                 to="/PharmacyDashboard/settings"
//                 className="px-4 py-2.5 bg-gradient-to-r from-[#7ba7b0] to-[#2c6774] text-white rounded-xl font-medium hover:from-[#5c878f] hover:to-[#1e4e56] hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
//               >
//                 Edit Pharmacy Info
//               </Link>
//             </div>
//           </div>

//           {/* Page Content */}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDashboardLayout;























//-------Updated theme
// components/Dashboard/PharmacyDashboardLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  BarChart3, Bell, Home, Menu, Package, 
  Search, Settings, ShoppingBag, ShoppingCart, 
  TrendingUp, Users, DollarSign, FileText, Circle,
  Building, Eye
} from 'lucide-react';

const PharmacyDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pharmacyOpen, setPharmacyOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const togglePharmacyStatus = () => setPharmacyOpen(!pharmacyOpen);

  const navItems = [
    { path: '/PharmacyDashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/PharmacyDashboard/features', label: 'Features', icon: <Circle size={20} /> },
    { path: '/PharmacyDashboard/categories', label: 'Category', icon: <ShoppingBag size={20} /> },
    { path: '/PharmacyDashboard/products', label: 'Products', icon: <Package size={20} /> },
    { path: '/PharmacyDashboard/sales', label: 'Sales', icon: <TrendingUp size={20} /> },
    { path: '/PharmacyDashboard/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { path: '/PharmacyDashboard/customers', label: 'Customer', icon: <Users size={20} /> },
    { path: '/PharmacyDashboard/finance', label: 'Finance', icon: <DollarSign size={20} /> },
    { path: '/PharmacyDashboard/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { path: '/PharmacyDashboard/support', label: 'Support', icon: <FileText size={20} /> },
    { path: '/PharmacyDashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2c6774] to-[#174047]"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#2c6774] to-[#174047] bg-clip-text text-transparent">
                QuickCure
              </span>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search medicines, orders, analytics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link 
              to="/pharmacies" 
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:opacity-90 transition-all"
            >
              <Building size={18} />
              <span>View Public Page</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#9fbfc5] to-[#5c878f]"></div>
              <div>
                <p className="text-sm font-semibold">Welcome Code Astro!</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white/70 backdrop-blur-md shadow-lg`}>
          <div className="h-full py-6 overflow-y-auto">
            <nav className="space-y-1 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-[#5c878f]/10 to-[#2c6774]/10 text-[#2c6774] border-l-4 border-[#2c6774]'
                      : 'hover:bg-gray-100/50 text-gray-600'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Pharmacy Status Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${pharmacyOpen ? 'bg-[#d4f4dd] text-[#1e8544]' : 'bg-red-100 text-red-800'}`}>
                <div className={`w-3 h-3 rounded-full ${pharmacyOpen ? 'bg-[#2c6774]' : 'bg-red-500'}`}></div>
                <span className="font-medium">{pharmacyOpen ? 'Open Now' : 'Closed'}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">MediCare Pharmacy</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={togglePharmacyStatus}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  pharmacyOpen
                    ? 'bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 hover:bg-red-100'
                    : 'bg-gradient-to-r from-[#5c878f]/10 to-[#2c6774]/10 text-[#2c6774] hover:bg-[#5c878f]/10'
                }`}
              >
                {pharmacyOpen ? 'Close Pharmacy' : 'Open Pharmacy'}
              </button>
              <Link
                to="/PharmacyDashboard/settings"
                className="px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#4a767d] hover:to-[#1e4e56] hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Edit Pharmacy Info
              </Link>
            </div>
          </div>

          {/* Page Content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PharmacyDashboardLayout;