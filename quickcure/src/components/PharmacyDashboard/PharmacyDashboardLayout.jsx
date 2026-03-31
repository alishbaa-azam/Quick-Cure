// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
// import { Menu, Search, Bell, User } from 'lucide-react';

// const PharmacyDashboardLayout = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Content Switching Logic
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard': return <Dashboard />;
//       case 'medicines': return <div className="p-10 text-center text-gray-400">My Medicines Page (Coming Soon)</div>;
//       default: return <Dashboard />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
//       <Sidebar 
//         activeTab={activeTab} 
//         setActiveTab={setActiveTab} 
//         isOpen={isSidebarOpen} 
//         setIsOpen={setIsSidebarOpen} 
//       />

//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Top Header */}
//         <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-10 shrink-0 z-30">
//           <div className="flex items-center gap-4">
//             <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
//               <Menu size={24} className="text-[#1a3a3a]" />
//             </button>
//             <div className="hidden md:flex flex-col">
//               <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Lahore Branch</h2>
//               <p className="text-lg font-black text-[#1a3a3a]">Medicare Pharmacy</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 lg:gap-6">
//             <div className="relative hidden sm:block">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input 
//                 type="text" 
//                 placeholder="Search..." 
//                 className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#2c6774] w-48 lg:w-72 transition-all"
//               />
//             </div>
            
//             <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl relative">
//               <Bell size={20} />
//               <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
//             </button>

//             <div className="flex items-center gap-3 pl-4 border-l ml-2">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2c6774] to-[#1a3a3a] flex items-center justify-center text-white font-bold shadow-lg shadow-[#2c6774]/20">
//                 <User size={20} />
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Dynamic Content Area */}
//         <main className="flex-1 overflow-y-auto p-4 lg:p-10">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDashboardLayout;
































import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProductsPage from './ProductsPage';
import OrdersPage from './OrdersPage';
import StockManagement from './StockManagement';
import CategoriesPage from './CategoriesPage';
import SettingsPage from './SettingsPage';

import { Menu, Search, Bell, User } from 'lucide-react';

const PharmacyDashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default Page
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- UPDATED SWITCH CASE ---
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'medicines':
        return <ProductsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'stock':
        return <StockManagement />;
      case 'categories':
        return <CategoriesPage />;
      case 'settings':
        return <SettingsPage />;
      case 'reports':
        return <div className="p-10 text-center font-bold text-gray-400">Sales Reports Module Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar - Control active tab state */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-10 shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} className="text-[#1a3a3a]" />
            </button>
            <div className="hidden md:flex flex-col">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Lahore Branch</h2>
              <p className="text-xl font-black text-[#1a3a3a] leading-tight">Medicare Pharmacy</p>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search database..." 
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#2c6774] focus:ring-4 focus:ring-[#2c6774]/5 w-48 lg:w-80 transition-all outline-none"
              />
            </div>
            
            <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 ml-2">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-black text-gray-800">Admin User</p>
                <p className="text-[10px] text-green-600 font-bold uppercase">Online</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2c6774] to-[#1a3a3a] flex items-center justify-center text-white shadow-lg shadow-teal-900/20">
                <User size={22} />
              </div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10 bg-[#f8fafc]">
          <div className="max-w-[1400px] mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PharmacyDashboardLayout;