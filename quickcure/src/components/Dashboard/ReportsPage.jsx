// import React, { useState } from 'react';
// import {
//   FileText, Download, Printer, Filter,
//   Calendar, Search, BarChart3, PieChart,
//   LineChart, TrendingUp, Users, Package,
//   DollarSign, Clock, CheckCircle, XCircle,
//   Eye, Share2, Edit, Trash2,
//   ChevronDown, RefreshCw, Plus, Shield,
//   Award, Truck, Building, CreditCard,  MoreVertical,
// } from 'lucide-react';

// const ReportsPage = () => {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [dateRange, setDateRange] = useState('thisMonth');

//   const reports = [
//     {
//       id: 1,
//       title: 'Sales Performance Report',
//       description: 'Detailed analysis of sales trends and revenue',
//       category: 'sales',
//       type: 'monthly',
//       lastGenerated: '2024-01-15',
//       size: '2.4 MB',
//       status: 'ready',
//       views: 124,
//       downloads: 89
//     },
//     {
//       id: 2,
//       title: 'Inventory Analysis',
//       description: 'Stock levels, turnover rates, and reorder points',
//       category: 'inventory',
//       type: 'weekly',
//       lastGenerated: '2024-01-14',
//       size: '1.8 MB',
//       status: 'ready',
//       views: 98,
//       downloads: 67
//     },
//     {
//       id: 3,
//       title: 'Customer Insights',
//       description: 'Customer behavior, retention, and segmentation',
//       category: 'customers',
//       type: 'monthly',
//       lastGenerated: '2024-01-13',
//       size: '3.2 MB',
//       status: 'generating',
//       views: 156,
//       downloads: 112
//     },
//     {
//       id: 4,
//       title: 'Financial Statement',
//       description: 'Profit & loss, balance sheet, cash flow',
//       category: 'finance',
//       type: 'quarterly',
//       lastGenerated: '2023-12-31',
//       size: '4.5 MB',
//       status: 'ready',
//       views: 89,
//       downloads: 74
//     },
//     {
//       id: 5,
//       title: 'Prescription Analytics',
//       description: 'Prescription trends and medication compliance',
//       category: 'pharmacy',
//       type: 'weekly',
//       lastGenerated: '2024-01-12',
//       size: '2.1 MB',
//       status: 'ready',
//       views: 145,
//       downloads: 98
//     },
//     {
//       id: 6,
//       title: 'Marketing ROI Report',
//       description: 'Campaign performance and return on investment',
//       category: 'marketing',
//       type: 'monthly',
//       lastGenerated: '2024-01-11',
//       size: '1.9 MB',
//       status: 'failed',
//       views: 67,
//       downloads: 45
//     },
//     {
//       id: 7,
//       title: 'Operational Efficiency',
//       description: 'Process efficiency and resource utilization',
//       category: 'operations',
//       type: 'quarterly',
//       lastGenerated: '2023-12-30',
//       size: '3.8 MB',
//       status: 'ready',
//       views: 112,
//       downloads: 89
//     },
//     {
//       id: 8,
//       title: 'Compliance Report',
//       description: 'Regulatory compliance and audit trail',
//       category: 'compliance',
//       type: 'monthly',
//       lastGenerated: '2024-01-10',
//       size: '5.2 MB',
//       status: 'ready',
//       views: 78,
//       downloads: 56
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Reports', count: reports.length },
//     { id: 'sales', name: 'Sales', count: reports.filter(r => r.category === 'sales').length },
//     { id: 'inventory', name: 'Inventory', count: reports.filter(r => r.category === 'inventory').length },
//     { id: 'customers', name: 'Customers', count: reports.filter(r => r.category === 'customers').length },
//     { id: 'finance', name: 'Finance', count: reports.filter(r => r.category === 'finance').length },
//     { id: 'pharmacy', name: 'Pharmacy', count: reports.filter(r => r.category === 'pharmacy').length },
//     { id: 'operations', name: 'Operations', count: reports.filter(r => r.category === 'operations').length }
//   ];

//   const dateRanges = [
//     { id: 'today', label: 'Today' },
//     { id: 'yesterday', label: 'Yesterday' },
//     { id: 'thisWeek', label: 'This Week' },
//     { id: 'thisMonth', label: 'This Month' },
//     { id: 'lastMonth', label: 'Last Month' },
//     { id: 'custom', label: 'Custom Range' }
//   ];

//   const filteredReports = activeCategory === 'all' 
//     ? reports 
//     : reports.filter(report => report.category === activeCategory);

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'ready': return 'bg-[#2c6774]/10 text-[#2c6774]';
//       case 'generating': return 'bg-[#5c878f]/10 text-[#5c878f]';
//       case 'failed': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getCategoryIcon = (category) => {
//     switch(category) {
//       case 'sales': return DollarSign;
//       case 'inventory': return Package;
//       case 'customers': return Users;
//       case 'finance': return BarChart3;
//       case 'pharmacy': return Shield;
//       case 'marketing': return TrendingUp;
//       case 'operations': return Building;
//       case 'compliance': return CheckCircle;
//       default: return FileText;
//     }
//   };

//   const getTypeColor = (type) => {
//     switch(type) {
//       case 'daily': return 'bg-[#2c6774]/20 text-[#2c6774]';
//       case 'weekly': return 'bg-[#5c878f]/20 text-[#5c878f]';
//       case 'monthly': return 'bg-[#174047]/20 text-[#174047]';
//       case 'quarterly': return 'bg-[#c0d3dc]/30 text-gray-700';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const generateReport = (reportId) => {
//     // In a real app, this would trigger report generation
//     alert(`Generating report ${reportId}...`);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics & Reports</h1>
//           <p className="text-gray-600">Generate and analyze detailed business reports</p>
//         </div>
//         <div className="flex gap-3 mt-4 md:mt-0">
//           <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//             <Download size={18} />
//             Export All
//           </button>
//           <button className="px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
//             <Plus size={18} />
//             New Report
//           </button>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 rounded-2xl p-6 border border-[#2c6774]/20 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[#2c6774] font-medium">Total Reports</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{reports.length}</p>
//             </div>
//             <div className="p-3 rounded-full bg-[#2c6774]/10">
//               <FileText className="text-[#2c6774]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#5c878f]/10 to-[#9fbfc5]/20 rounded-2xl p-6 border border-[#5c878f]/20 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[#5c878f] font-medium">Ready to View</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">
//                 {reports.filter(r => r.status === 'ready').length}
//               </p>
//             </div>
//             <div className="p-3 rounded-full bg-[#5c878f]/10">
//               <CheckCircle className="text-[#5c878f]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#174047]/10 to-[#2c6774]/10 rounded-2xl p-6 border border-[#174047]/20 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[#174047] font-medium">Total Downloads</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">
//                 {reports.reduce((sum, r) => sum + r.downloads, 0)}
//               </p>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <Download className="text-[#174047]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#c0d3dc]/20 to-[#9fbfc5]/10 rounded-2xl p-6 border border-[#c0d3dc]/30 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[#174047] font-medium">Avg. Report Size</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">
//                 {(reports.reduce((sum, r) => sum + parseFloat(r.size), 0) / reports.length).toFixed(1)} MB
//               </p>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <BarChart3 className="text-[#174047]" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <div className="flex flex-wrap gap-2">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => setActiveCategory(category.id)}
//               className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
//                 activeCategory === category.id
//                   ? 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white'
//                   : 'bg-[#c0d3dc]/20 text-[#174047] hover:bg-[#c0d3dc]/30'
//               }`}
//             >
//               <span>{category.name}</span>
//               <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
//                 {category.count}
//               </span>
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-2 mt-4 md:mt-0">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search reports..."
//               className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
//             />
//           </div>
//           <select 
//             value={dateRange}
//             onChange={(e) => setDateRange(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
//           >
//             {dateRanges.map(range => (
//               <option key={range.id} value={range.id}>{range.label}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Reports Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {filteredReports.map((report) => {
//           const CategoryIcon = getCategoryIcon(report.category);
//           return (
//             <div key={report.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//               <div className="p-6">
//                 {/* Report Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="p-3 rounded-xl bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10">
//                       <CategoryIcon className="text-[#2c6774]" size={24} />
//                     </div>
//                     <div>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
//                         {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
//                       </span>
//                     </div>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(report.type)}`}>
//                     {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
//                   </span>
//                 </div>

//                 {/* Report Content */}
//                 <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#2c6774] transition-colors">
//                   {report.title}
//                 </h3>
//                 <p className="text-gray-600 mb-6">{report.description}</p>

//                 {/* Report Stats */}
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-1">
//                       <Eye size={16} className="text-gray-400" />
//                       <span className="text-sm text-gray-600">{report.views} views</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Download size={16} className="text-gray-400" />
//                       <span className="text-sm text-gray-600">{report.downloads} downloads</span>
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {report.size}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2">
//                   {report.status === 'ready' ? (
//                     <>
//                       <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
//                         View Report
//                       </button>
//                       <button className="p-2.5 bg-[#5c878f]/10 text-[#5c878f] rounded-xl hover:bg-[#5c878f]/20 transition-colors">
//                         <Download size={18} />
//                       </button>
//                     </>
//                   ) : report.status === 'generating' ? (
//                     <button className="flex-1 px-4 py-2.5 bg-[#5c878f] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2">
//                       <RefreshCw size={18} className="animate-spin" />
//                       Generating...
//                     </button>
//                   ) : (
//                     <button 
//                       onClick={() => generateReport(report.id)}
//                       className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all duration-200"
//                     >
//                       Regenerate
//                     </button>
//                   )}
//                   <button className="p-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl hover:bg-[#c0d3dc]/30 transition-colors">
//                     <MoreVertical size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Report Footer */}
//               <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">
//                     Last generated: {report.lastGenerated}
//                   </span>
//                   <button className="text-sm text-[#2c6774] hover:text-[#174047] transition-colors">
//                     Schedule Auto-generation
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Report Templates */}
//       <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-8">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Report Templates</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             {
//               title: 'Quick Sales Summary',
//               icon: DollarSign,
//               time: '5 min',
//               description: 'Instant sales overview'
//             },
//             {
//               title: 'Inventory Snapshot',
//               icon: Package,
//               time: '3 min',
//               description: 'Current stock status'
//             },
//             {
//               title: 'Customer Health',
//               icon: Users,
//               time: '10 min',
//               description: 'Customer metrics'
//             },
//             {
//               title: 'Daily Financials',
//               icon: CreditCard,
//               time: '7 min',
//               description: 'Daily financial summary'
//             }
//           ].map((template, index) => {
//             const Icon = template.icon;
//             return (
//               <div key={index} className="bg-gradient-to-br from-[#c0d3dc]/20 to-[#9fbfc5]/10 rounded-xl p-6 border border-[#c0d3dc]/30 hover:border-[#5c878f] transition-colors group cursor-pointer">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-3 rounded-lg bg-white">
//                     <Icon className="text-[#2c6774]" size={20} />
//                   </div>
//                   <span className="px-3 py-1 rounded-full bg-[#2c6774]/10 text-[#2c6774] text-sm font-medium">
//                     {template.time}
//                   </span>
//                 </div>
//                 <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#2c6774] transition-colors">
//                   {template.title}
//                 </h3>
//                 <p className="text-sm text-gray-600">{template.description}</p>
//                 <button className="mt-4 w-full px-4 py-2 bg-white text-[#2c6774] rounded-lg font-medium hover:bg-[#2c6774]/10 transition-colors">
//                   Generate Now
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Analytics Overview */}
//       <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-gray-800">Report Analytics</h2>
//           <div className="flex gap-2 mt-4 md:mt-0">
//             <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//               <Calendar size={18} />
//               Last 30 Days
//             </button>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Report Usage Chart */}
//           <div>
//             <h3 className="font-bold text-gray-700 mb-4">Report Usage Trend</h3>
//             <div className="h-48 flex items-end gap-3">
//               {[
//                 { day: 'Mon', views: 45, downloads: 32 },
//                 { day: 'Tue', views: 68, downloads: 48 },
//                 { day: 'Wed', views: 52, downloads: 41 },
//                 { day: 'Thu', views: 79, downloads: 56 },
//                 { day: 'Fri', views: 61, downloads: 45 },
//                 { day: 'Sat', views: 38, downloads: 28 },
//                 { day: 'Sun', views: 42, downloads: 31 }
//               ].map((day, index) => (
//                 <div key={day.day} className="flex-1 flex flex-col items-center">
//                   <div className="w-full flex items-end justify-center gap-1 mb-2">
//                     <div 
//                       className="w-3 bg-gradient-to-t from-[#2c6774] to-[#5c878f] rounded-t"
//                       style={{ height: `${(day.views / 80) * 100}%` }}
//                     ></div>
//                     <div 
//                       className="w-3 bg-gradient-to-t from-[#5c878f] to-[#9fbfc5] rounded-t"
//                       style={{ height: `${(day.downloads / 80) * 100}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-xs text-gray-600">{day.day}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center gap-4 mt-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gradient-to-r from-[#2c6774] to-[#5c878f] rounded"></div>
//                 <span className="text-sm text-gray-600">Views</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gradient-to-r from-[#5c878f] to-[#9fbfc5] rounded"></div>
//                 <span className="text-sm text-gray-600">Downloads</span>
//               </div>
//             </div>
//           </div>

//           {/* Category Distribution */}
//           <div>
//             <h3 className="font-bold text-gray-700 mb-4">Report Category Distribution</h3>
//             <div className="h-48 flex items-center justify-center">
//               <div className="relative w-32 h-32">
//                 {[
//                   { percent: 25, color: 'from-[#2c6774] to-[#5c878f]', label: 'Sales' },
//                   { percent: 20, color: 'from-[#5c878f] to-[#9fbfc5]', label: 'Inventory' },
//                   { percent: 18, color: 'from-[#174047] to-[#2c6774]', label: 'Customers' },
//                   { percent: 15, color: 'from-[#c0d3dc] to-[#9fbfc5]', label: 'Finance' },
//                   { percent: 22, color: 'from-[#2c6774] to-[#174047]', label: 'Operations' }
//                 ].map((slice, i) => (
//                   <div
//                     key={i}
//                     className="absolute inset-0 rounded-full border-8 border-transparent"
//                     style={{
//                       clipPath: `conic-gradient(from ${i * 72}deg, transparent ${slice.percent}%, #0000 0)`,
//                     }}
//                   >
//                     <div className={`bg-gradient-to-r ${slice.color}`}></div>
//                   </div>
//                 ))}
//               </div>
//               <div className="ml-8 space-y-2">
//                 {['Sales', 'Inventory', 'Customers', 'Finance', 'Operations'].map((category, i) => (
//                   <div key={category} className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded bg-gradient-to-r from-[#2c6774] to-[#5c878f]"></div>
//                     <span className="text-sm text-gray-600">{category}</span>
//                     <span className="text-sm font-medium text-gray-800">
//                       {[25, 20, 18, 15, 22][i]}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportsPage;



























//------------------Pretty Code Below------------------//
import React, { useState } from 'react';
import {
  FileText, Download, Printer, Filter,
  Calendar, Search, BarChart3, PieChart,
  LineChart, TrendingUp, Users, Package,
  DollarSign, Clock, CheckCircle, XCircle,
  Eye, Share2, Edit, Trash2,
  ChevronDown, RefreshCw, Plus, Shield,
  Award, Truck, Building, CreditCard,  MoreVertical,
} from 'lucide-react';

const ReportsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dateRange, setDateRange] = useState('thisMonth');

  const reports = [
    {
      id: 1,
      title: 'Sales Performance Report',
      description: 'Detailed analysis of sales trends and revenue',
      category: 'sales',
      type: 'monthly',
      lastGenerated: '2024-01-15',
      size: '2.4 MB',
      status: 'ready',
      views: 124,
      downloads: 89
    },
    {
      id: 2,
      title: 'Inventory Analysis',
      description: 'Stock levels, turnover rates, and reorder points',
      category: 'inventory',
      type: 'weekly',
      lastGenerated: '2024-01-14',
      size: '1.8 MB',
      status: 'ready',
      views: 98,
      downloads: 67
    },
    {
      id: 3,
      title: 'Customer Insights',
      description: 'Customer behavior, retention, and segmentation',
      category: 'customers',
      type: 'monthly',
      lastGenerated: '2024-01-13',
      size: '3.2 MB',
      status: 'generating',
      views: 156,
      downloads: 112
    },
    {
      id: 4,
      title: 'Financial Statement',
      description: 'Profit & loss, balance sheet, cash flow',
      category: 'finance',
      type: 'quarterly',
      lastGenerated: '2023-12-31',
      size: '4.5 MB',
      status: 'ready',
      views: 89,
      downloads: 74
    },
    {
      id: 5,
      title: 'Prescription Analytics',
      description: 'Prescription trends and medication compliance',
      category: 'pharmacy',
      type: 'weekly',
      lastGenerated: '2024-01-12',
      size: '2.1 MB',
      status: 'ready',
      views: 145,
      downloads: 98
    },
    {
      id: 6,
      title: 'Marketing ROI Report',
      description: 'Campaign performance and return on investment',
      category: 'marketing',
      type: 'monthly',
      lastGenerated: '2024-01-11',
      size: '1.9 MB',
      status: 'failed',
      views: 67,
      downloads: 45
    },
    {
      id: 7,
      title: 'Operational Efficiency',
      description: 'Process efficiency and resource utilization',
      category: 'operations',
      type: 'quarterly',
      lastGenerated: '2023-12-30',
      size: '3.8 MB',
      status: 'ready',
      views: 112,
      downloads: 89
    },
    {
      id: 8,
      title: 'Compliance Report',
      description: 'Regulatory compliance and audit trail',
      category: 'compliance',
      type: 'monthly',
      lastGenerated: '2024-01-10',
      size: '5.2 MB',
      status: 'ready',
      views: 78,
      downloads: 56
    }
  ];

  const categories = [
    { id: 'all', name: 'All Reports', count: reports.length },
    { id: 'sales', name: 'Sales', count: reports.filter(r => r.category === 'sales').length },
    { id: 'inventory', name: 'Inventory', count: reports.filter(r => r.category === 'inventory').length },
    { id: 'customers', name: 'Customers', count: reports.filter(r => r.category === 'customers').length },
    { id: 'finance', name: 'Finance', count: reports.filter(r => r.category === 'finance').length },
    { id: 'pharmacy', name: 'Pharmacy', count: reports.filter(r => r.category === 'pharmacy').length },
    { id: 'operations', name: 'Operations', count: reports.filter(r => r.category === 'operations').length }
  ];

  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'thisWeek', label: 'This Week' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'lastMonth', label: 'Last Month' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const filteredReports = activeCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === activeCategory);

  const getStatusColor = (status) => {
    switch(status) {
      case 'ready': return 'bg-emerald-100 text-emerald-800';
      case 'generating': return 'bg-amber-100 text-amber-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'sales': return DollarSign;
      case 'inventory': return Package;
      case 'customers': return Users;
      case 'finance': return BarChart3;
      case 'pharmacy': return Shield;
      case 'marketing': return TrendingUp;
      case 'operations': return Building;
      case 'compliance': return CheckCircle;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'daily': return 'bg-emerald-100 text-emerald-800';
      case 'weekly': return 'bg-teal-100 text-teal-800';
      case 'monthly': return 'bg-purple-100 text-purple-800';
      case 'quarterly': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const generateReport = (reportId) => {
    alert(`Generating report ${reportId}...`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Generate and analyze detailed business reports</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
            <Download size={18} />
            Export All
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
            <Plus size={18} />
            New Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 font-medium">Total Reports</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{reports.length}</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-500/10">
              <FileText className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-cyan-100/50 rounded-2xl p-6 border border-teal-100 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-600 font-medium">Ready to View</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {reports.filter(r => r.status === 'ready').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-teal-500/10">
              <CheckCircle className="text-teal-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-2xl p-6 border border-purple-100 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-medium">Total Downloads</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {reports.reduce((sum, r) => sum + r.downloads, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-500/10">
              <Download className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-100/50 rounded-2xl p-6 border border-pink-100 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-600 font-medium">Avg. Report Size</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {(reports.reduce((sum, r) => sum + parseFloat(r.size), 0) / reports.length).toFixed(1)} MB
              </p>
            </div>
            <div className="p-3 rounded-full bg-rose-500/10">
              <BarChart3 className="text-rose-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            {dateRanges.map(range => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredReports.map((report) => {
          const CategoryIcon = getCategoryIcon(report.category);
          return (
            <div key={report.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-6">
                {/* Report Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                      <CategoryIcon className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(report.type)}`}>
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </span>
                </div>

                {/* Report Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  {report.title}
                </h3>
                <p className="text-gray-600 mb-6">{report.description}</p>

                {/* Report Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{report.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{report.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {report.size}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {report.status === 'ready' ? (
                    <>
                      <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
                        View Report
                      </button>
                      <button className="p-2.5 bg-teal-100 text-teal-600 rounded-xl hover:bg-teal-200 transition-colors">
                        <Download size={18} />
                      </button>
                    </>
                  ) : report.status === 'generating' ? (
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2">
                      <RefreshCw size={18} className="animate-spin" />
                      Generating...
                    </button>
                  ) : (
                    <button 
                      onClick={() => generateReport(report.id)}
                      className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all duration-200"
                    >
                      Regenerate
                    </button>
                  )}
                  <button className="p-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Report Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Last generated: {report.lastGenerated}
                  </span>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                    Schedule Auto-generation
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Quick Sales Summary',
              icon: DollarSign,
              time: '5 min',
              description: 'Instant sales overview'
            },
            {
              title: 'Inventory Snapshot',
              icon: Package,
              time: '3 min',
              description: 'Current stock status'
            },
            {
              title: 'Customer Health',
              icon: Users,
              time: '10 min',
              description: 'Customer metrics'
            },
            {
              title: 'Daily Financials',
              icon: CreditCard,
              time: '7 min',
              description: 'Daily financial summary'
            }
          ].map((template, index) => {
            const Icon = template.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:border-emerald-300 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-white">
                    <Icon className="text-emerald-600" size={20} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium">
                    {template.time}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-600">{template.description}</p>
                <button className="mt-4 w-full px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                  Generate Now
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Report Analytics</h2>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
              <Calendar size={18} />
              Last 30 Days
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Usage Chart */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Report Usage Trend</h3>
            <div className="h-48 flex items-end gap-3">
              {[
                { day: 'Mon', views: 45, downloads: 32 },
                { day: 'Tue', views: 68, downloads: 48 },
                { day: 'Wed', views: 52, downloads: 41 },
                { day: 'Thu', views: 79, downloads: 56 },
                { day: 'Fri', views: 61, downloads: 45 },
                { day: 'Sat', views: 38, downloads: 28 },
                { day: 'Sun', views: 42, downloads: 31 }
              ].map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end justify-center gap-1 mb-2">
                    <div 
                      className="w-3 bg-gradient-to-t from-emerald-400 to-teal-400 rounded-t"
                      style={{ height: `${(day.views / 80) * 100}%` }}
                    ></div>
                    <div 
                      className="w-3 bg-gradient-to-t from-teal-400 to-cyan-400 rounded-t"
                      style={{ height: `${(day.downloads / 80) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded"></div>
                <span className="text-sm text-gray-600">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded"></div>
                <span className="text-sm text-gray-600">Downloads</span>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Report Category Distribution</h3>
            <div className="h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                {[
                  { percent: 25, color: 'from-emerald-400 to-teal-400', label: 'Sales' },
                  { percent: 20, color: 'from-teal-400 to-cyan-400', label: 'Inventory' },
                  { percent: 18, color: 'from-purple-400 to-violet-400', label: 'Customers' },
                  { percent: 15, color: 'from-pink-400 to-rose-400', label: 'Finance' },
                  { percent: 22, color: 'from-amber-400 to-orange-400', label: 'Operations' }
                ].map((slice, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                      clipPath: `conic-gradient(from ${i * 72}deg, transparent ${slice.percent}%, #0000 0)`,
                    }}
                  >
                    <div className={`bg-gradient-to-r ${slice.color}`}></div>
                  </div>
                ))}
              </div>
              <div className="ml-8 space-y-2">
                {['Sales', 'Inventory', 'Customers', 'Finance', 'Operations'].map((category, i) => (
                  <div key={category} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                    <span className="text-sm text-gray-600">{category}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {[25, 20, 18, 15, 22][i]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;