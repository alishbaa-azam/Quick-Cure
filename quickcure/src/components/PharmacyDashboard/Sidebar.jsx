// import React, { useState } from 'react';
// import { 
//   LayoutDashboard, 
//   Package, 
//   ShoppingCart, 
//   Users, 
//   BarChart3, 
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Pill,
//   TrendingUp,
//   AlertCircle
// } from 'lucide-react';

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeItem, setActiveItem] = useState('dashboard');

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'medicines', label: 'Medicines', icon: Pill },
//     { id: 'orders', label: 'Orders', icon: ShoppingCart },
//     { id: 'customers', label: 'Customers', icon: Users },
//     { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//     { id: 'reports', label: 'Reports', icon: TrendingUp },
//     { id: 'alerts', label: 'Alerts', icon: AlertCircle, badge: 5 },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ];

//   return (
//     <div 
//       className={`bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen transition-all duration-300 relative ${
//         isCollapsed ? 'w-20' : 'w-64'
//       }`}
//     >
//       {/* Toggle Button */}
//       <button 
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className="absolute -right-3 top-20 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 transition-colors border-2 border-white"
//       >
//         {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//       </button>

//       {/* Logo Section */}
//       <div className="p-4 border-b border-blue-700">
//         <div className="flex items-center gap-3">
//           <div className="bg-white p-2 rounded-lg">
//             <Package className="w-6 h-6 text-blue-900" />
//           </div>
//           {!isCollapsed && (
//             <div>
//               <h1 className="font-bold text-lg">MediCare</h1>
//               <p className="text-xs text-blue-300">Pharmacy Management</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Menu Items */}
//       <div className="p-3">
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => setActiveItem(item.id)}
//             className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-all ${
//               activeItem === item.id 
//                 ? 'bg-blue-600 shadow-lg' 
//                 : 'hover:bg-blue-700/50'
//             }`}
//           >
//             <item.icon size={20} className="min-w-[20px]" />
//             {!isCollapsed && (
//               <>
//                 <span className="text-sm flex-1 text-left">{item.label}</span>
//                 {item.badge && (
//                   <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {item.badge}
//                   </span>
//                 )}
//               </>
//             )}
//             {isCollapsed && item.badge && (
//               <span className="absolute left-10 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 {item.badge}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* User Profile & Logout */}
//       <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
//             <span className="text-sm font-medium">AD</span>
//           </div>
//           {!isCollapsed && (
//             <>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">Admin User</p>
//                 <p className="text-xs text-blue-300">admin@medicare.com</p>
//               </div>
//               <button className="hover:bg-blue-700 p-2 rounded-lg">
//                 <LogOut size={18} />
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;






















import React from 'react';
import { 
  LayoutDashboard, Pill, ShoppingCart, Package, 
  Boxes, BarChart3, Settings, LogOut, X 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, id: 'dashboard' },
    { name: 'My Medicines', icon: <Pill size={20} />, id: 'medicines' },
    { name: 'Orders', icon: <ShoppingCart size={20} />, id: 'orders' },
    { name: 'Stock Management', icon: <Package size={20} />, id: 'stock' },
    { name: 'Categories', icon: <Boxes size={20} />, id: 'categories' },
    { name: 'Sales Reports', icon: <BarChart3 size={20} />, id: 'reports' },
    { name: 'Settings', icon: <Settings size={20} />, id: 'settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1a3a3a] text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:relative lg:translate-x-0 border-r border-[#2c6774]
      `}>
        <div className="p-6 flex items-center justify-between border-b border-[#2c6774]">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg text-[#1a3a3a]">
              <Pill size={24} />
            </div>
            <h1 className="font-bold text-xl tracking-tight">QuickCure</h1>
          </div>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if(window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                ${activeTab === item.id ? 'bg-[#2c6774] text-white shadow-lg' : 'text-gray-400 hover:bg-[#2c6774]/20 hover:text-white'}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-[#2c6774] bg-[#1a3a3a]">
          <button className="flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors w-full">
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;