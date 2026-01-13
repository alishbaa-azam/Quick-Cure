// import React, { useState } from 'react';
// import { 
//   DollarSign, TrendingUp, TrendingDown, Download,
//   Filter, Calendar, ShoppingCart, Package,
//   Users, CreditCard, PieChart, BarChart3,
//   ChevronDown, MoreVertical, Eye, Printer,
//   FileText, RefreshCw, Search, Plus,
//   CheckCircle, XCircle, Clock, ArrowUpRight,
//   ArrowDownRight, Star, Target, Award
// } from 'lucide-react';

// const SalesPage = () => {
//   const [timeRange, setTimeRange] = useState('week');
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   const salesData = [
//     {
//       id: 1,
//       product: 'Paracetamol',
//       category: 'Pain Relief',
//       customer: 'John Smith',
//       date: '2024-01-15',
//       quantity: 2,
//       price: 5.99,
//       total: 11.98,
//       payment: 'Credit Card',
//       status: 'completed',
//       invoice: 'INV-001'
//     },
//     {
//       id: 2,
//       product: 'Amoxicillin',
//       category: 'Antibiotic',
//       customer: 'Emma Wilson',
//       date: '2024-01-15',
//       quantity: 1,
//       price: 12.50,
//       total: 12.50,
//       payment: 'Insurance',
//       status: 'completed',
//       invoice: 'INV-002'
//     },
//     {
//       id: 3,
//       product: 'Cetirizine',
//       category: 'Allergy',
//       customer: 'Robert Brown',
//       date: '2024-01-14',
//       quantity: 3,
//       price: 6.25,
//       total: 18.75,
//       payment: 'Cash',
//       status: 'completed',
//       invoice: 'INV-003'
//     },
//     {
//       id: 4,
//       product: 'Omeprazole',
//       category: 'Digestive',
//       customer: 'Sarah Davis',
//       date: '2024-01-14',
//       quantity: 1,
//       price: 15.99,
//       total: 15.99,
//       payment: 'Credit Card',
//       status: 'pending',
//       invoice: 'INV-004'
//     },
//     {
//       id: 5,
//       product: 'Aspirin',
//       category: 'Pain Relief',
//       customer: 'Michael Lee',
//       date: '2024-01-13',
//       quantity: 2,
//       price: 8.75,
//       total: 17.50,
//       payment: 'Insurance',
//       status: 'cancelled',
//       invoice: 'INV-005'
//     },
//     {
//       id: 6,
//       product: 'Vitamin C',
//       category: 'Supplements',
//       customer: 'Jennifer Taylor',
//       date: '2024-01-13',
//       quantity: 1,
//       price: 9.99,
//       total: 9.99,
//       payment: 'Credit Card',
//       status: 'completed',
//       invoice: 'INV-006'
//     },
//     {
//       id: 7,
//       product: 'Ibuprofen',
//       category: 'Pain Relief',
//       customer: 'David Wilson',
//       date: '2024-01-12',
//       quantity: 3,
//       price: 7.50,
//       total: 22.50,
//       payment: 'Cash',
//       status: 'completed',
//       invoice: 'INV-007'
//     },
//     {
//       id: 8,
//       product: 'Loratadine',
//       category: 'Allergy',
//       customer: 'Lisa Anderson',
//       date: '2024-01-12',
//       quantity: 2,
//       price: 8.25,
//       total: 16.50,
//       payment: 'Insurance',
//       status: 'completed',
//       invoice: 'INV-008'
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Categories', value: 2480.25 },
//     { id: 'pain-relief', name: 'Pain Relief', value: 890.50 },
//     { id: 'antibiotic', name: 'Antibiotics', value: 625.75 },
//     { id: 'allergy', name: 'Allergy', value: 425.25 },
//     { id: 'digestive', name: 'Digestive', value: 320.00 },
//     { id: 'supplements', name: 'Supplements', value: 218.75 }
//   ];

//   const dailySales = [
//     { day: 'Mon', sales: 245, target: 220 },
//     { day: 'Tue', sales: 320, target: 280 },
//     { day: 'Wed', sales: 198, target: 240 },
//     { day: 'Thu', sales: 412, target: 350 },
//     { day: 'Fri', sales: 385, target: 320 },
//     { day: 'Sat', sales: 450, target: 400 },
//     { day: 'Sun', sales: 290, target: 260 }
//   ];

//   const topProducts = [
//     { name: 'Paracetamol', sales: 245, growth: 12.5 },
//     { name: 'Amoxicillin', sales: 189, growth: 8.2 },
//     { name: 'Vitamin C', sales: 167, growth: 15.3 },
//     { name: 'Cetirizine', sales: 142, growth: 5.7 },
//     { name: 'Ibuprofen', sales: 128, growth: -2.4 }
//   ];

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'completed': return 'bg-[#2c6774]/10 text-[#2c6774]';
//       case 'pending': return 'bg-[#5c878f]/10 text-[#5c878f]';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getPaymentColor = (method) => {
//     switch(method) {
//       case 'Credit Card': return 'text-[#2c6774]';
//       case 'Insurance': return 'text-[#5c878f]';
//       case 'Cash': return 'text-gray-600';
//       default: return 'text-gray-600';
//     }
//   };

//   const calculateTotal = () => {
//     return salesData.reduce((sum, sale) => sum + sale.total, 0).toFixed(2);
//   };

//   const calculateAverageSale = () => {
//     const completedSales = salesData.filter(sale => sale.status === 'completed');
//     const total = completedSales.reduce((sum, sale) => sum + sale.total, 0);
//     return (total / completedSales.length).toFixed(2);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Sales Dashboard</h1>
//           <p className="text-gray-600">Track sales performance and revenue analytics</p>
//         </div>
//         <div className="flex gap-3 mt-4 md:mt-0">
//           <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//             <Download size={18} />
//             Export Report
//           </button>
//           <button className="px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
//             <Plus size={18} />
//             New Sale
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Total Revenue */}
//         <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 rounded-2xl p-6 border border-[#2c6774]/20 shadow-lg">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-[#2c6774] font-medium">Total Revenue</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">${calculateTotal()}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <TrendingUp size={16} className="text-[#2c6774]" />
//                 <span className="text-sm text-[#2c6774]">+12.5% from last week</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#2c6774]/10">
//               <DollarSign className="text-[#2c6774]" size={24} />
//             </div>
//           </div>
//         </div>

//         {/* Average Sale */}
//         <div className="bg-gradient-to-br from-[#5c878f]/10 to-[#9fbfc5]/20 rounded-2xl p-6 border border-[#5c878f]/20 shadow-lg">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-[#5c878f] font-medium">Average Sale</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">${calculateAverageSale()}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <TrendingUp size={16} className="text-[#5c878f]" />
//                 <span className="text-sm text-[#5c878f]">+8.2% from last week</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#5c878f]/10">
//               <ShoppingCart className="text-[#5c878f]" size={24} />
//             </div>
//           </div>
//         </div>

//         {/* Total Orders */}
//         <div className="bg-gradient-to-br from-[#174047]/10 to-[#2c6774]/10 rounded-2xl p-6 border border-[#174047]/20 shadow-lg">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-[#174047] font-medium">Total Orders</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{salesData.length}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <TrendingUp size={16} className="text-[#174047]" />
//                 <span className="text-sm text-[#174047]">+15.3% from last week</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <Package className="text-[#174047]" size={24} />
//             </div>
//           </div>
//         </div>

//         {/* Conversion Rate */}
//         <div className="bg-gradient-to-br from-[#c0d3dc]/20 to-[#9fbfc5]/10 rounded-2xl p-6 border border-[#c0d3dc]/30 shadow-lg">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-[#174047] font-medium">Conversion Rate</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">68.5%</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <TrendingDown size={16} className="text-red-500" />
//                 <span className="text-sm text-red-500">-2.1% from last week</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <Target className="text-[#174047]" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         {/* Sales Chart */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800">Sales Performance</h2>
//             <div className="flex gap-2 mt-4 md:mt-0">
//               {['day', 'week', 'month', 'year'].map((range) => (
//                 <button
//                   key={range}
//                   onClick={() => setTimeRange(range)}
//                   className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
//                     timeRange === range
//                       ? 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white'
//                       : 'bg-[#c0d3dc]/20 text-[#174047] hover:bg-[#c0d3dc]/30'
//                   }`}
//                 >
//                   {range.charAt(0).toUpperCase() + range.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="h-64">
//             {/* Chart Visualization */}
//             <div className="flex items-end h-48 gap-4 px-4">
//               {dailySales.map((day, index) => (
//                 <div key={day.day} className="flex-1 flex flex-col items-center">
//                   <div className="w-full flex flex-col items-center">
//                     <div 
//                       className="w-10 bg-gradient-to-t from-[#2c6774] to-[#5c878f] rounded-t-lg mb-2"
//                       style={{ height: `${(day.sales / 500) * 100}%` }}
//                     ></div>
//                     <div 
//                       className="w-8 bg-gradient-to-t from-[#174047] to-[#2c6774] rounded-t-lg opacity-50"
//                       style={{ height: `${(day.target / 500) * 100}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-sm text-gray-600 mt-2">{day.day}</span>
//                   <span className="text-xs text-[#5c878f] font-medium">
//                     ${day.sales}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center gap-4 mt-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gradient-to-r from-[#2c6774] to-[#5c878f] rounded"></div>
//                 <span className="text-sm text-gray-600">Actual Sales</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded opacity-50"></div>
//                 <span className="text-sm text-gray-600">Target</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Category Distribution */}
//         <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">Sales by Category</h2>
//           <div className="space-y-4">
//             {categories.slice(1).map((category) => (
//               <div key={category.id} className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#2c6774] to-[#5c878f]"></div>
//                   <span className="font-medium text-gray-700">{category.name}</span>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-bold text-gray-800">${category.value}</div>
//                   <div className="text-sm text-[#5c878f]">+8.2%</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent Sales Table */}
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
//         <div className="p-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800">Recent Sales</h2>
//             <div className="flex gap-2 mt-4 md:mt-0">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search sales..."
//                   className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
//                 />
//               </div>
//               <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//                 <Filter size={18} />
//                 Filter
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Invoice</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Product</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Payment</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
//                   <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {salesData.map((sale) => (
//                   <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                     <td className="py-4 px-4">
//                       <span className="font-medium text-[#2c6774]">{sale.invoice}</span>
//                     </td>
//                     <td className="py-4 px-4 font-medium">{sale.customer}</td>
//                     <td className="py-4 px-4">{sale.product}</td>
//                     <td className="py-4 px-4">
//                       <span className="px-3 py-1 rounded-full bg-[#c0d3dc]/30 text-gray-700 text-sm">
//                         {sale.category}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4 text-gray-600">{sale.date}</td>
//                     <td className="py-4 px-4">
//                       <span className={`font-medium ${getPaymentColor(sale.payment)}`}>
//                         {sale.payment}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4 font-bold text-gray-800">${sale.total.toFixed(2)}</td>
//                     <td className="py-4 px-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sale.status)}`}>
//                         {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4">
//                       <div className="flex gap-2">
//                         <button className="p-2 hover:bg-[#2c6774]/10 rounded-lg transition-colors">
//                           <Eye size={18} className="text-[#2c6774]" />
//                         </button>
//                         <button className="p-2 hover:bg-[#5c878f]/10 rounded-lg transition-colors">
//                           <Printer size={18} className="text-[#5c878f]" />
//                         </button>
//                         <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                           <MoreVertical size={18} className="text-gray-600" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Table Footer */}
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             <div className="text-sm text-gray-600">
//               Showing {salesData.length} of 128 total sales
//             </div>
//             <div className="flex gap-2 mt-4 md:mt-0">
//               <button className="px-4 py-2 bg-[#c0d3dc]/20 text-[#174047] rounded-xl hover:bg-[#c0d3dc]/30 transition-colors">
//                 Previous
//               </button>
//               <button className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:opacity-90 transition-colors">
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SalesPage;


















// -------- pretty colors
import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, Download,
  Filter, Calendar, ShoppingCart, Package,
  Users, CreditCard, PieChart, BarChart3,
  ChevronDown, MoreVertical, Eye, Printer,
  FileText, RefreshCw, Search, Plus,
  CheckCircle, XCircle, Clock, ArrowUpRight,
  ArrowDownRight, Star, Target, Award
} from 'lucide-react';

const SalesPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const salesData = [
    {
      id: 1,
      product: 'Paracetamol',
      category: 'Pain Relief',
      customer: 'John Smith',
      date: '2024-01-15',
      quantity: 2,
      price: 5.99,
      total: 11.98,
      payment: 'Credit Card',
      status: 'completed',
      invoice: 'INV-001'
    },
    {
      id: 2,
      product: 'Amoxicillin',
      category: 'Antibiotic',
      customer: 'Emma Wilson',
      date: '2024-01-15',
      quantity: 1,
      price: 12.50,
      total: 12.50,
      payment: 'Insurance',
      status: 'completed',
      invoice: 'INV-002'
    },
    {
      id: 3,
      product: 'Cetirizine',
      category: 'Allergy',
      customer: 'Robert Brown',
      date: '2024-01-14',
      quantity: 3,
      price: 6.25,
      total: 18.75,
      payment: 'Cash',
      status: 'completed',
      invoice: 'INV-003'
    },
    {
      id: 4,
      product: 'Omeprazole',
      category: 'Digestive',
      customer: 'Sarah Davis',
      date: '2024-01-14',
      quantity: 1,
      price: 15.99,
      total: 15.99,
      payment: 'Credit Card',
      status: 'pending',
      invoice: 'INV-004'
    },
    {
      id: 5,
      product: 'Aspirin',
      category: 'Pain Relief',
      customer: 'Michael Lee',
      date: '2024-01-13',
      quantity: 2,
      price: 8.75,
      total: 17.50,
      payment: 'Insurance',
      status: 'cancelled',
      invoice: 'INV-005'
    },
    {
      id: 6,
      product: 'Vitamin C',
      category: 'Supplements',
      customer: 'Jennifer Taylor',
      date: '2024-01-13',
      quantity: 1,
      price: 9.99,
      total: 9.99,
      payment: 'Credit Card',
      status: 'completed',
      invoice: 'INV-006'
    },
    {
      id: 7,
      product: 'Ibuprofen',
      category: 'Pain Relief',
      customer: 'David Wilson',
      date: '2024-01-12',
      quantity: 3,
      price: 7.50,
      total: 22.50,
      payment: 'Cash',
      status: 'completed',
      invoice: 'INV-007'
    },
    {
      id: 8,
      product: 'Loratadine',
      category: 'Allergy',
      customer: 'Lisa Anderson',
      date: '2024-01-12',
      quantity: 2,
      price: 8.25,
      total: 16.50,
      payment: 'Insurance',
      status: 'completed',
      invoice: 'INV-008'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', value: 2480.25 },
    { id: 'pain-relief', name: 'Pain Relief', value: 890.50 },
    { id: 'antibiotic', name: 'Antibiotics', value: 625.75 },
    { id: 'allergy', name: 'Allergy', value: 425.25 },
    { id: 'digestive', name: 'Digestive', value: 320.00 },
    { id: 'supplements', name: 'Supplements', value: 218.75 }
  ];

  const dailySales = [
    { day: 'Mon', sales: 245, target: 220 },
    { day: 'Tue', sales: 320, target: 280 },
    { day: 'Wed', sales: 198, target: 240 },
    { day: 'Thu', sales: 412, target: 350 },
    { day: 'Fri', sales: 385, target: 320 },
    { day: 'Sat', sales: 450, target: 400 },
    { day: 'Sun', sales: 290, target: 260 }
  ];

  const topProducts = [
    { name: 'Paracetamol', sales: 245, growth: 12.5 },
    { name: 'Amoxicillin', sales: 189, growth: 8.2 },
    { name: 'Vitamin C', sales: 167, growth: 15.3 },
    { name: 'Cetirizine', sales: 142, growth: 5.7 },
    { name: 'Ibuprofen', sales: 128, growth: -2.4 }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPaymentColor = (method) => {
    switch(method) {
      case 'Credit Card': return 'text-emerald-600';
      case 'Insurance': return 'text-blue-600';
      case 'Cash': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const calculateTotal = () => {
    return salesData.reduce((sum, sale) => sum + sale.total, 0).toFixed(2);
  };

  const calculateAverageSale = () => {
    const completedSales = salesData.filter(sale => sale.status === 'completed');
    const total = completedSales.reduce((sum, sale) => sum + sale.total, 0);
    return (total / completedSales.length).toFixed(2);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sales Dashboard</h1>
          <p className="text-gray-600">Track sales performance and revenue analytics</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
            <Download size={18} />
            Export Report
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
            <Plus size={18} />
            New Sale
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-emerald-600 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">${calculateTotal()}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-emerald-600" />
                <span className="text-sm text-emerald-600">+12.5% from last week</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-emerald-500/10">
              <DollarSign className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>

        {/* Average Sale */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-100/50 rounded-2xl p-6 border border-teal-100 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-teal-600 font-medium">Average Sale</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">${calculateAverageSale()}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-teal-600" />
                <span className="text-sm text-teal-600">+8.2% from last week</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-teal-500/10">
              <ShoppingCart className="text-teal-600" size={24} />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-2xl p-6 border border-purple-100 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-purple-600 font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{salesData.length}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-purple-600" />
                <span className="text-sm text-purple-600">+15.3% from last week</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-500/10">
              <Package className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-100/50 rounded-2xl p-6 border border-pink-100 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-rose-600 font-medium">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">68.5%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown size={16} className="text-red-500" />
                <span className="text-sm text-red-500">-2.1% from last week</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-rose-500/10">
              <Target className="text-rose-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Sales Performance</h2>
            <div className="flex gap-2 mt-4 md:mt-0">
              {['day', 'week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            {/* Chart Visualization */}
            <div className="flex items-end h-48 gap-4 px-4">
              {dailySales.map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center">
                    <div 
                      className="w-10 bg-gradient-to-t from-emerald-400 to-teal-400 rounded-t-lg mb-2"
                      style={{ height: `${(day.sales / 500) * 100}%` }}
                    ></div>
                    <div 
                      className="w-8 bg-gradient-to-t from-purple-400 to-violet-400 rounded-t-lg opacity-50"
                      style={{ height: `${(day.target / 500) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{day.day}</span>
                  <span className="text-xs text-teal-600 font-medium">
                    ${day.sales}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded"></div>
                <span className="text-sm text-gray-600">Actual Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-400 rounded opacity-50"></div>
                <span className="text-sm text-gray-600">Target</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Sales by Category</h2>
          <div className="space-y-4">
            {categories.slice(1).map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                  <span className="font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">${category.value}</div>
                  <div className="text-sm text-teal-600">+8.2%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Sales</h2>
            <div className="flex gap-2 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search sales..."
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
              <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Invoice</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Payment</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="py-4 px-4">
                      <span className="font-medium text-emerald-600">{sale.invoice}</span>
                    </td>
                    <td className="py-4 px-4 font-medium">{sale.customer}</td>
                    <td className="py-4 px-4">{sale.product}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                        {sale.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{sale.date}</td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${getPaymentColor(sale.payment)}`}>
                        {sale.payment}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-800">${sale.total.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sale.status)}`}>
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Eye size={18} className="text-emerald-600" />
                        </button>
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Printer size={18} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {salesData.length} of 128 total sales
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;