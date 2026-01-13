// import React, { useState } from 'react';
// import {
//   Users, UserPlus, Mail, Phone,
//   MapPin, Calendar, Package, DollarSign,
//   Star, Edit, Trash2, MoreVertical,
//   Filter, Search, Download, Eye,
//   MessageSquare, Shield, Award, TrendingUp,
//   CreditCard, FileText, Clock, CheckCircle,
//   XCircle, AlertCircle, ArrowUpRight, Award as AwardIcon
// } from 'lucide-react';

// const CustomersPage = () => {
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const customers = [
//     {
//       id: 1,
//       name: 'John Smith',
//       email: 'john.smith@example.com',
//       phone: '(555) 123-4567',
//       address: '123 Main St, New York, NY 10001',
//       joinDate: '2023-01-15',
//       lastOrder: '2024-01-15',
//       totalOrders: 12,
//       totalSpent: 245.50,
//       status: 'active',
//       loyaltyPoints: 1250,
//       tier: 'gold',
//       notes: 'Prefers morning deliveries'
//     },
//     {
//       id: 2,
//       name: 'Emma Wilson',
//       email: 'emma.wilson@example.com',
//       phone: '(555) 987-6543',
//       address: '456 Oak Ave, Brooklyn, NY 11201',
//       joinDate: '2023-03-22',
//       lastOrder: '2024-01-14',
//       totalOrders: 8,
//       totalSpent: 189.75,
//       status: 'active',
//       loyaltyPoints: 850,
//       tier: 'silver',
//       notes: 'Allergic to penicillin'
//     },
//     {
//       id: 3,
//       name: 'Robert Brown',
//       email: 'robert.brown@example.com',
//       phone: '(555) 456-7890',
//       address: '789 Pine St, Queens, NY 11355',
//       joinDate: '2022-11-05',
//       lastOrder: '2024-01-13',
//       totalOrders: 24,
//       totalSpent: 542.25,
//       status: 'active',
//       loyaltyPoints: 2450,
//       tier: 'platinum',
//       notes: 'Senior citizen discount'
//     },
//     {
//       id: 4,
//       name: 'Sarah Davis',
//       email: 'sarah.davis@example.com',
//       phone: '(555) 321-6547',
//       address: '321 Elm St, Bronx, NY 10451',
//       joinDate: '2023-06-18',
//       lastOrder: '2024-01-12',
//       totalOrders: 5,
//       totalSpent: 98.50,
//       status: 'inactive',
//       loyaltyPoints: 250,
//       tier: 'bronze',
//       notes: 'Prefers email communication'
//     },
//     {
//       id: 5,
//       name: 'Michael Lee',
//       email: 'michael.lee@example.com',
//       phone: '(555) 654-1234',
//       address: '654 Maple Dr, Staten Island, NY 10301',
//       joinDate: '2022-08-30',
//       lastOrder: '2024-01-10',
//       totalOrders: 16,
//       totalSpent: 385.00,
//       status: 'active',
//       loyaltyPoints: 1650,
//       tier: 'gold',
//       notes: 'Insurance: Blue Cross'
//     },
//     {
//       id: 6,
//       name: 'Jennifer Taylor',
//       email: 'jennifer.taylor@example.com',
//       phone: '(555) 789-0123',
//       address: '987 Cedar Ln, Manhattan, NY 10016',
//       joinDate: '2023-09-12',
//       lastOrder: '2024-01-09',
//       totalOrders: 3,
//       totalSpent: 67.25,
//       status: 'new',
//       loyaltyPoints: 150,
//       tier: 'bronze',
//       notes: 'New customer'
//     },
//     {
//       id: 7,
//       name: 'David Wilson',
//       email: 'david.wilson@example.com',
//       phone: '(555) 234-5678',
//       address: '147 Birch St, Brooklyn, NY 11215',
//       joinDate: '2022-12-01',
//       lastOrder: '2024-01-08',
//       totalOrders: 19,
//       totalSpent: 412.75,
//       status: 'active',
//       loyaltyPoints: 1950,
//       tier: 'platinum',
//       notes: 'Frequent buyer'
//     },
//     {
//       id: 8,
//       name: 'Lisa Anderson',
//       email: 'lisa.anderson@example.com',
//       phone: '(555) 876-5432',
//       address: '258 Walnut Ave, Queens, NY 11354',
//       joinDate: '2023-04-25',
//       lastOrder: '2024-01-07',
//       totalOrders: 7,
//       totalSpent: 156.50,
//       status: 'active',
//       loyaltyPoints: 750,
//       tier: 'silver',
//       notes: 'Prefers text notifications'
//     }
//   ];

//   const filters = [
//     { id: 'all', label: 'All Customers', count: customers.length },
//     { id: 'active', label: 'Active', count: customers.filter(c => c.status === 'active').length },
//     { id: 'new', label: 'New', count: customers.filter(c => c.status === 'new').length },
//     { id: 'inactive', label: 'Inactive', count: customers.filter(c => c.status === 'inactive').length },
//     { id: 'platinum', label: 'Platinum', count: customers.filter(c => c.tier === 'platinum').length },
//     { id: 'gold', label: 'Gold', count: customers.filter(c => c.tier === 'gold').length }
//   ];

//   const filteredCustomers = customers.filter(customer => {
//     const matchesFilter = activeFilter === 'all' || 
//       (activeFilter === 'active' && customer.status === 'active') ||
//       (activeFilter === 'new' && customer.status === 'new') ||
//       (activeFilter === 'inactive' && customer.status === 'inactive') ||
//       (activeFilter === customer.tier);
    
//     const matchesSearch = searchQuery === '' || 
//       customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       customer.phone.includes(searchQuery);
    
//     return matchesFilter && matchesSearch;
//   });

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'active': return 'bg-[#2c6774]/10 text-[#2c6774]';
//       case 'new': return 'bg-[#5c878f]/10 text-[#5c878f]';
//       case 'inactive': return 'bg-gray-100 text-gray-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getTierColor = (tier) => {
//     switch(tier) {
//       case 'platinum': return 'bg-gradient-to-r from-gray-700 to-gray-900 text-white';
//       case 'gold': return 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white';
//       case 'silver': return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
//       case 'bronze': return 'bg-gradient-to-r from-amber-700 to-amber-900 text-white';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const calculateStats = () => {
//     const totalCustomers = customers.length;
//     const activeCustomers = customers.filter(c => c.status === 'active').length;
//     const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
//     const averageSpent = totalRevenue / totalCustomers;
//     const newThisMonth = customers.filter(c => {
//       const joinDate = new Date(c.joinDate);
//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//       return joinDate > oneMonthAgo;
//     }).length;
    
//     return { totalCustomers, activeCustomers, totalRevenue, averageSpent, newThisMonth };
//   };

//   const stats = calculateStats();

//   const getCustomerInitials = (name) => {
//     return name
//       .split(' ')
//       .map(part => part[0])
//       .join('')
//       .toUpperCase();
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Management</h1>
//           <p className="text-gray-600">Manage customer profiles and relationships</p>
//         </div>
//         <div className="flex gap-3 mt-4 md:mt-0">
//           <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//             <Download size={18} />
//             Export
//           </button>
//           <button className="px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
//             <UserPlus size={18} />
//             Add Customer
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 rounded-2xl p-6 border border-[#2c6774]/20 shadow-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[#2c6774] font-medium">Total Customers</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalCustomers}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <TrendingUp size={16} className="text-[#2c6774]" />
//                 <span className="text-sm text-[#2c6774]">+{stats.newThisMonth} this month</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#2c6774]/10">
//               <Users className="text-[#2c6774]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#5c878f]/10 to-[#9fbfc5]/20 rounded-2xl p-6 border border-[#5c878f]/20 shadow-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[#5c878f] font-medium">Active Customers</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeCustomers}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <TrendingUp size={16} className="text-[#5c878f]" />
//                 <span className="text-sm text-[#5c878f]">+5.2% from last month</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#5c878f]/10">
//               <CheckCircle className="text-[#5c878f]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#174047]/10 to-[#2c6774]/10 rounded-2xl p-6 border border-[#174047]/20 shadow-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[#174047] font-medium">Total Revenue</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">${stats.totalRevenue.toFixed(2)}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <TrendingUp size={16} className="text-[#174047]" />
//                 <span className="text-sm text-[#174047]">+12.8% from last month</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <DollarSign className="text-[#174047]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#c0d3dc]/20 to-[#9fbfc5]/10 rounded-2xl p-6 border border-[#c0d3dc]/30 shadow-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[#174047] font-medium">Avg. Customer Value</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">${stats.averageSpent.toFixed(2)}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <TrendingUp size={16} className="text-[#174047]" />
//                 <span className="text-sm text-[#174047]">+8.5% from last month</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <AwardIcon className="text-[#174047]" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <div className="flex flex-wrap gap-2">
//           {filters.map((filter) => (
//             <button
//               key={filter.id}
//               onClick={() => setActiveFilter(filter.id)}
//               className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
//                 activeFilter === filter.id
//                   ? 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white'
//                   : 'bg-[#c0d3dc]/20 text-[#174047] hover:bg-[#c0d3dc]/30'
//               }`}
//             >
//               <span>{filter.label}</span>
//               <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
//                 {filter.count}
//               </span>
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-2 mt-4 md:mt-0">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search customers..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
//             />
//           </div>
//           <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//             <Filter size={18} />
//             Advanced
//           </button>
//         </div>
//       </div>

//       {/* Customers Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//         {filteredCustomers.map((customer) => (
//           <div key={customer.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//             {/* Customer Header */}
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#2c6774] to-[#5c878f] flex items-center justify-center text-white font-bold text-lg">
//                     {getCustomerInitials(customer.name)}
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-800 group-hover:text-[#2c6774] transition-colors">
//                       {customer.name}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
//                         {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
//                       </span>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(customer.tier)}`}>
//                         {customer.tier.charAt(0).toUpperCase() + customer.tier.slice(1)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <MoreVertical size={18} className="text-gray-400" />
//                 </button>
//               </div>

//               {/* Customer Info */}
//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Mail size={16} />
//                   <span className="text-sm truncate">{customer.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Phone size={16} />
//                   <span className="text-sm">{customer.phone}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <MapPin size={16} />
//                   <span className="text-sm truncate">{customer.address}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Calendar size={16} />
//                   <span className="text-sm">Joined {customer.joinDate}</span>
//                 </div>
//               </div>

//               {/* Customer Stats */}
//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 <div className="bg-[#c0d3dc]/20 rounded-lg p-3">
//                   <div className="text-xs text-gray-600">Total Orders</div>
//                   <div className="text-lg font-bold text-gray-800">{customer.totalOrders}</div>
//                 </div>
//                 <div className="bg-[#c0d3dc]/20 rounded-lg p-3">
//                   <div className="text-xs text-gray-600">Total Spent</div>
//                   <div className="text-lg font-bold text-gray-800">${customer.totalSpent.toFixed(2)}</div>
//                 </div>
//                 <div className="bg-[#c0d3dc]/20 rounded-lg p-3">
//                   <div className="text-xs text-gray-600">Loyalty Points</div>
//                   <div className="text-lg font-bold text-gray-800">{customer.loyaltyPoints}</div>
//                 </div>
//                 <div className="bg-[#c0d3dc]/20 rounded-lg p-3">
//                   <div className="text-xs text-gray-600">Last Order</div>
//                   <div className="text-lg font-bold text-gray-800">{customer.lastOrder}</div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-2">
//                 <button className="flex-1 px-4 py-2 bg-[#2c6774]/10 text-[#2c6774] rounded-xl font-medium hover:bg-[#2c6774]/20 transition-all duration-200">
//                   View Profile
//                 </button>
//                 <button className="p-2 bg-[#5c878f]/10 text-[#5c878f] rounded-xl hover:bg-[#5c878f]/20 transition-colors">
//                   <MessageSquare size={18} />
//                 </button>
//                 <button className="p-2 bg-[#174047]/10 text-[#174047] rounded-xl hover:bg-[#174047]/20 transition-colors">
//                   <Edit size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Customer Analytics */}
//       <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Customer Analytics</h2>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Customer Growth */}
//           <div>
//             <h3 className="font-bold text-gray-700 mb-4">Customer Growth Trend</h3>
//             <div className="h-48 flex items-end gap-2">
//               {[
//                 { month: 'Jul', customers: 120 },
//                 { month: 'Aug', customers: 135 },
//                 { month: 'Sep', customers: 148 },
//                 { month: 'Oct', customers: 165 },
//                 { month: 'Nov', customers: 180 },
//                 { month: 'Dec', customers: 195 },
//                 { month: 'Jan', customers: 215 }
//               ].map((item, index) => (
//                 <div key={item.month} className="flex-1 flex flex-col items-center">
//                   <div className="w-8 bg-gradient-to-t from-[#2c6774] to-[#5c878f] rounded-t-lg mb-2"
//                        style={{ height: `${(item.customers / 250) * 100}%` }}>
//                   </div>
//                   <span className="text-xs text-gray-600">{item.month}</span>
//                   <span className="text-xs text-[#5c878f] font-medium">{item.customers}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Tier Distribution */}
//           <div>
//             <h3 className="font-bold text-gray-700 mb-4">Customer Tier Distribution</h3>
//             <div className="h-48 flex items-center justify-center">
//               <div className="relative w-32 h-32">
//                 {[
//                   { percent: 15, color: 'from-gray-700 to-gray-900', label: 'Platinum' },
//                   { percent: 25, color: 'from-amber-500 to-yellow-600', label: 'Gold' },
//                   { percent: 35, color: 'from-gray-400 to-gray-600', label: 'Silver' },
//                   { percent: 25, color: 'from-amber-700 to-amber-900', label: 'Bronze' }
//                 ].map((slice, i) => (
//                   <div
//                     key={i}
//                     className="absolute inset-0 rounded-full border-8 border-transparent"
//                     style={{
//                       clipPath: `conic-gradient(from ${i * 90}deg, transparent ${slice.percent}%, #0000 0)`,
//                     }}
//                   >
//                     <div className={`bg-gradient-to-r ${slice.color}`}></div>
//                   </div>
//                 ))}
//               </div>
//               <div className="ml-8 space-y-3">
//                 {['Platinum', 'Gold', 'Silver', 'Bronze'].map((tier, i) => (
//                   <div key={tier} className="flex items-center gap-2">
//                     <div className={`w-3 h-3 rounded ${getTierColor(tier.toLowerCase())}`}></div>
//                     <span className="text-sm text-gray-600">{tier}</span>
//                     <span className="text-sm font-medium text-gray-800">
//                       {[15, 25, 35, 25][i]}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="mt-8 text-center">
//         <button className="px-6 py-3 bg-gradient-to-r from-[#5c878f] to-[#2c6774] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
//           View Customer Reports
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomersPage;



























//-----------Pretty Colors-----------
import React, { useState } from 'react';
import {
  Users, UserPlus, Mail, Phone,
  MapPin, Calendar, Package, DollarSign,
  Star, Edit, Trash2, MoreVertical,
  Filter, Search, Download, Eye,
  MessageSquare, Shield, Award, TrendingUp,
  CreditCard, FileText, Clock, CheckCircle,
  XCircle, AlertCircle, ArrowUpRight, Award as AwardIcon
} from 'lucide-react';

const CustomersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      joinDate: '2023-01-15',
      lastOrder: '2024-01-15',
      totalOrders: 12,
      totalSpent: 245.50,
      status: 'active',
      loyaltyPoints: 1250,
      tier: 'gold',
      notes: 'Prefers morning deliveries'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      joinDate: '2023-03-22',
      lastOrder: '2024-01-14',
      totalOrders: 8,
      totalSpent: 189.75,
      status: 'active',
      loyaltyPoints: 850,
      tier: 'silver',
      notes: 'Allergic to penicillin'
    },
    {
      id: 3,
      name: 'Robert Brown',
      email: 'robert.brown@example.com',
      phone: '(555) 456-7890',
      address: '789 Pine St, Queens, NY 11355',
      joinDate: '2022-11-05',
      lastOrder: '2024-01-13',
      totalOrders: 24,
      totalSpent: 542.25,
      status: 'active',
      loyaltyPoints: 2450,
      tier: 'platinum',
      notes: 'Senior citizen discount'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      phone: '(555) 321-6547',
      address: '321 Elm St, Bronx, NY 10451',
      joinDate: '2023-06-18',
      lastOrder: '2024-01-12',
      totalOrders: 5,
      totalSpent: 98.50,
      status: 'inactive',
      loyaltyPoints: 250,
      tier: 'bronze',
      notes: 'Prefers email communication'
    },
    {
      id: 5,
      name: 'Michael Lee',
      email: 'michael.lee@example.com',
      phone: '(555) 654-1234',
      address: '654 Maple Dr, Staten Island, NY 10301',
      joinDate: '2022-08-30',
      lastOrder: '2024-01-10',
      totalOrders: 16,
      totalSpent: 385.00,
      status: 'active',
      loyaltyPoints: 1650,
      tier: 'gold',
      notes: 'Insurance: Blue Cross'
    },
    {
      id: 6,
      name: 'Jennifer Taylor',
      email: 'jennifer.taylor@example.com',
      phone: '(555) 789-0123',
      address: '987 Cedar Ln, Manhattan, NY 10016',
      joinDate: '2023-09-12',
      lastOrder: '2024-01-09',
      totalOrders: 3,
      totalSpent: 67.25,
      status: 'new',
      loyaltyPoints: 150,
      tier: 'bronze',
      notes: 'New customer'
    },
    {
      id: 7,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      phone: '(555) 234-5678',
      address: '147 Birch St, Brooklyn, NY 11215',
      joinDate: '2022-12-01',
      lastOrder: '2024-01-08',
      totalOrders: 19,
      totalSpent: 412.75,
      status: 'active',
      loyaltyPoints: 1950,
      tier: 'platinum',
      notes: 'Frequent buyer'
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      phone: '(555) 876-5432',
      address: '258 Walnut Ave, Queens, NY 11354',
      joinDate: '2023-04-25',
      lastOrder: '2024-01-07',
      totalOrders: 7,
      totalSpent: 156.50,
      status: 'active',
      loyaltyPoints: 750,
      tier: 'silver',
      notes: 'Prefers text notifications'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Customers', count: customers.length },
    { id: 'active', label: 'Active', count: customers.filter(c => c.status === 'active').length },
    { id: 'new', label: 'New', count: customers.filter(c => c.status === 'new').length },
    { id: 'inactive', label: 'Inactive', count: customers.filter(c => c.status === 'inactive').length },
    { id: 'platinum', label: 'Platinum', count: customers.filter(c => c.tier === 'platinum').length },
    { id: 'gold', label: 'Gold', count: customers.filter(c => c.tier === 'gold').length }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'active' && customer.status === 'active') ||
      (activeFilter === 'new' && customer.status === 'new') ||
      (activeFilter === 'inactive' && customer.status === 'inactive') ||
      (activeFilter === customer.tier);
    
    const matchesSearch = searchQuery === '' || 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'new': return 'bg-amber-100 text-amber-800';
      case 'inactive': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case 'platinum': return 'bg-gradient-to-r from-gray-700 to-gray-900 text-white';
      case 'gold': return 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white';
      case 'silver': return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 'bronze': return 'bg-gradient-to-r from-amber-700 to-amber-900 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const calculateStats = () => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const averageSpent = totalRevenue / totalCustomers;
    const newThisMonth = customers.filter(c => {
      const joinDate = new Date(c.joinDate);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return joinDate > oneMonthAgo;
    }).length;
    
    return { totalCustomers, activeCustomers, totalRevenue, averageSpent, newThisMonth };
  };

  const stats = calculateStats();

  const getCustomerInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Management</h1>
          <p className="text-gray-600">Manage customer profiles and relationships</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
            <UserPlus size={18} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-600 font-medium">Total Customers</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalCustomers}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-emerald-600" />
                <span className="text-sm text-emerald-600">+{stats.newThisMonth} this month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-emerald-500/10">
              <Users className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-cyan-100/50 rounded-2xl p-6 border border-teal-100 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-teal-600 font-medium">Active Customers</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeCustomers}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-teal-600" />
                <span className="text-sm text-teal-600">+5.2% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-teal-500/10">
              <CheckCircle className="text-teal-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-2xl p-6 border border-purple-100 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-600 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">${stats.totalRevenue.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-purple-600" />
                <span className="text-sm text-purple-600">+12.8% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-500/10">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-100/50 rounded-2xl p-6 border border-pink-100 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-600 font-medium">Avg. Customer Value</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">${stats.averageSpent.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-rose-600" />
                <span className="text-sm text-rose-600">+8.5% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-rose-500/10">
              <AwardIcon className="text-rose-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{filter.label}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
            <Filter size={18} />
            Advanced
          </button>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Customer Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                    {getCustomerInitials(customer.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {customer.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(customer.tier)}`}>
                        {customer.tier.charAt(0).toUpperCase() + customer.tier.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={18} className="text-gray-400" />
                </button>
              </div>

              {/* Customer Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm truncate">{customer.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">Joined {customer.joinDate}</span>
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Total Orders</div>
                  <div className="text-lg font-bold text-gray-800">{customer.totalOrders}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Total Spent</div>
                  <div className="text-lg font-bold text-gray-800">${customer.totalSpent.toFixed(2)}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Loyalty Points</div>
                  <div className="text-lg font-bold text-gray-800">{customer.loyaltyPoints}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Last Order</div>
                  <div className="text-lg font-bold text-gray-800">{customer.lastOrder}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
                  View Profile
                </button>
                <button className="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <MessageSquare size={18} />
                </button>
                <button className="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <Edit size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Analytics */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Customer Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Growth */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Customer Growth Trend</h3>
            <div className="h-48 flex items-end gap-2">
              {[
                { month: 'Jul', customers: 120 },
                { month: 'Aug', customers: 135 },
                { month: 'Sep', customers: 148 },
                { month: 'Oct', customers: 165 },
                { month: 'Nov', customers: 180 },
                { month: 'Dec', customers: 195 },
                { month: 'Jan', customers: 215 }
              ].map((item, index) => (
                <div key={item.month} className="flex-1 flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-emerald-400 to-teal-400 rounded-t-lg mb-2"
                       style={{ height: `${(item.customers / 250) * 100}%` }}>
                  </div>
                  <span className="text-xs text-gray-600">{item.month}</span>
                  <span className="text-xs text-teal-600 font-medium">{item.customers}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier Distribution */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Customer Tier Distribution</h3>
            <div className="h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                {[
                  { percent: 15, color: 'from-gray-700 to-gray-900', label: 'Platinum' },
                  { percent: 25, color: 'from-amber-500 to-yellow-600', label: 'Gold' },
                  { percent: 35, color: 'from-gray-400 to-gray-600', label: 'Silver' },
                  { percent: 25, color: 'from-amber-700 to-amber-900', label: 'Bronze' }
                ].map((slice, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                      clipPath: `conic-gradient(from ${i * 90}deg, transparent ${slice.percent}%, #0000 0)`,
                    }}
                  >
                    <div className={`bg-gradient-to-r ${slice.color}`}></div>
                  </div>
                ))}
              </div>
              <div className="ml-8 space-y-3">
                {['Platinum', 'Gold', 'Silver', 'Bronze'].map((tier, i) => (
                  <div key={tier} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${getTierColor(tier.toLowerCase())}`}></div>
                    <span className="text-sm text-gray-600">{tier}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {[15, 25, 35, 25][i]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
          View Customer Reports
        </button>
      </div>
    </div>
  );
};

export default CustomersPage;