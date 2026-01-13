// import React, { useState } from 'react';
// import {
//   MessageSquare, Phone, Mail, Clock,
//   CheckCircle, XCircle, AlertCircle, HelpCircle,
//   Search, Filter, Plus, Download,
//   User, Calendar, FileText, Paperclip,
//   ThumbsUp, ThumbsDown, Star, Award,
//   ChevronDown, MoreVertical, Edit, Trash2,
//   RefreshCw, Shield, Truck, Package,
//   CreditCard, Users, Building, Settings
// } from 'lucide-react';

// const SupportPage = () => {
//   const [activeTab, setActiveTab] = useState('tickets');
//   const [selectedPriority, setSelectedPriority] = useState('all');

//   const tickets = [
//     {
//       id: 'TKT-001',
//       customer: 'John Smith',
//       email: 'john@example.com',
//       subject: 'Delivery Delay Issue',
//       category: 'delivery',
//       priority: 'high',
//       status: 'open',
//       assignedTo: 'Sarah Johnson',
//       created: '2024-01-15',
//       lastUpdate: '2 hours ago',
//       messages: 5
//     },
//     {
//       id: 'TKT-002',
//       customer: 'Emma Wilson',
//       email: 'emma@example.com',
//       subject: 'Prescription Refill Problem',
//       category: 'prescription',
//       priority: 'medium',
//       status: 'in-progress',
//       assignedTo: 'Mike Chen',
//       created: '2024-01-14',
//       lastUpdate: '1 day ago',
//       messages: 8
//     },
//     {
//       id: 'TKT-003',
//       customer: 'Robert Brown',
//       email: 'robert@example.com',
//       subject: 'Billing Discrepancy',
//       category: 'billing',
//       priority: 'high',
//       status: 'pending',
//       assignedTo: 'Not Assigned',
//       created: '2024-01-14',
//       lastUpdate: '3 hours ago',
//       messages: 3
//     },
//     {
//       id: 'TKT-004',
//       customer: 'Sarah Davis',
//       email: 'sarah@example.com',
//       subject: 'Product Quality Concern',
//       category: 'product',
//       priority: 'low',
//       status: 'resolved',
//       assignedTo: 'Lisa Wang',
//       created: '2024-01-13',
//       lastUpdate: '2 days ago',
//       messages: 12
//     },
//     {
//       id: 'TKT-005',
//       customer: 'Michael Lee',
//       email: 'michael@example.com',
//       subject: 'Account Access Issue',
//       category: 'account',
//       priority: 'medium',
//       status: 'closed',
//       assignedTo: 'David Kim',
//       created: '2024-01-12',
//       lastUpdate: '3 days ago',
//       messages: 6
//     },
//     {
//       id: 'TKT-006',
//       customer: 'Jennifer Taylor',
//       email: 'jennifer@example.com',
//       subject: 'Insurance Claim Help',
//       category: 'insurance',
//       priority: 'high',
//       status: 'open',
//       assignedTo: 'Sarah Johnson',
//       created: '2024-01-12',
//       lastUpdate: '5 hours ago',
//       messages: 4
//     },
//     {
//       id: 'TKT-007',
//       customer: 'David Wilson',
//       email: 'david@example.com',
//       subject: 'Refund Request',
//       category: 'refund',
//       priority: 'medium',
//       status: 'in-progress',
//       assignedTo: 'Mike Chen',
//       created: '2024-01-11',
//       lastUpdate: '1 day ago',
//       messages: 7
//     },
//     {
//       id: 'TKT-008',
//       customer: 'Lisa Anderson',
//       email: 'lisa@example.com',
//       subject: 'Technical Support Needed',
//       category: 'technical',
//       priority: 'low',
//       status: 'open',
//       assignedTo: 'Not Assigned',
//       created: '2024-01-10',
//       lastUpdate: '6 hours ago',
//       messages: 2
//     }
//   ];

//   const knowledgeBase = [
//     {
//       id: 1,
//       title: 'How to Track Your Order',
//       category: 'delivery',
//       views: 1245,
//       helpful: 98,
//       lastUpdated: '2024-01-10'
//     },
//     {
//       id: 2,
//       title: 'Prescription Refill Process',
//       category: 'prescription',
//       views: 1890,
//       helpful: 156,
//       lastUpdated: '2024-01-12'
//     },
//     {
//       id: 3,
//       title: 'Understanding Your Bill',
//       category: 'billing',
//       views: 987,
//       helpful: 78,
//       lastUpdated: '2024-01-08'
//     },
//     {
//       id: 4,
//       title: 'Insurance Claim Guide',
//       category: 'insurance',
//       views: 1456,
//       helpful: 134,
//       lastUpdated: '2024-01-11'
//     },
//     {
//       id: 5,
//       title: 'Return & Refund Policy',
//       category: 'refund',
//       views: 1123,
//       helpful: 89,
//       lastUpdated: '2024-01-09'
//     },
//     {
//       id: 6,
//       title: 'Account Security Tips',
//       category: 'account',
//       views: 876,
//       helpful: 67,
//       lastUpdated: '2024-01-07'
//     }
//   ];

//   const tabs = [
//     { id: 'tickets', label: 'Support Tickets', count: tickets.length },
//     { id: 'knowledge', label: 'Knowledge Base', count: knowledgeBase.length },
//     { id: 'live-chat', label: 'Live Chat', count: 3 },
//     { id: 'analytics', label: 'Analytics', count: null }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Categories', icon: FileText },
//     { id: 'delivery', name: 'Delivery', icon: Truck },
//     { id: 'prescription', name: 'Prescription', icon: Package },
//     { id: 'billing', name: 'Billing', icon: CreditCard },
//     { id: 'account', name: 'Account', icon: User },
//     { id: 'technical', name: 'Technical', icon: Settings },
//     { id: 'insurance', name: 'Insurance', icon: Shield },
//     { id: 'refund', name: 'Refund', icon: RefreshCw }
//   ];

//   const priorities = [
//     { id: 'all', label: 'All Priorities' },
//     { id: 'high', label: 'High Priority' },
//     { id: 'medium', label: 'Medium Priority' },
//     { id: 'low', label: 'Low Priority' }
//   ];

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'open': return 'bg-[#2c6774]/10 text-[#2c6774]';
//       case 'in-progress': return 'bg-[#5c878f]/10 text-[#5c878f]';
//       case 'pending': return 'bg-amber-100 text-amber-800';
//       case 'resolved': return 'bg-green-100 text-green-800';
//       case 'closed': return 'bg-gray-100 text-gray-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'high': return 'bg-red-100 text-red-800';
//       case 'medium': return 'bg-amber-100 text-amber-800';
//       case 'low': return 'bg-[#c0d3dc]/30 text-gray-700';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getCategoryIcon = (category) => {
//     const cat = categories.find(c => c.id === category);
//     return cat ? cat.icon : FileText;
//   };

//   const filteredTickets = selectedPriority === 'all'
//     ? tickets
//     : tickets.filter(ticket => ticket.priority === selectedPriority);

//   const stats = {
//     openTickets: tickets.filter(t => t.status === 'open').length,
//     inProgress: tickets.filter(t => t.status === 'in-progress').length,
//     resolved: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length,
//     avgResponse: '2.4 hours',
//     satisfaction: 94.5
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Support</h1>
//           <p className="text-gray-600">Manage customer inquiries and support requests</p>
//         </div>
//         <div className="flex gap-3 mt-4 md:mt-0">
//           <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//             <Download size={18} />
//             Export Tickets
//           </button>
//           <button className="px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
//             <Plus size={18} />
//             New Ticket
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 rounded-2xl p-6 border border-[#2c6774]/20 shadow-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[#2c6774] font-medium">Open Tickets</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.openTickets}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <AlertCircle size={16} className="text-[#2c6774]" />
//                 <span className="text-sm text-[#2c6774]">Requires attention</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#2c6774]/10">
//               <MessageSquare className="text-[#2c6774]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#5c878f]/10 to-[#9fbfc5]/20 rounded-2xl p-6 border border-[#5c878f]/20 shadow-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[#5c878f] font-medium">In Progress</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.inProgress}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <Clock size={16} className="text-[#5c878f]" />
//                 <span className="text-sm text-[#5c878f]">Being worked on</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#5c878f]/10">
//               <RefreshCw className="text-[#5c878f]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#174047]/10 to-[#2c6774]/10 rounded-2xl p-6 border border-[#174047]/20 shadow-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[#174047] font-medium">Resolved</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.resolved}</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <CheckCircle size={16} className="text-[#174047]" />
//                 <span className="text-sm text-[#174047]">Successfully closed</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <CheckCircle className="text-[#174047]" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-[#c0d3dc]/20 to-[#9fbfc5]/10 rounded-2xl p-6 border border-[#c0d3dc]/30 shadow-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[#174047] font-medium">Satisfaction</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.satisfaction}%</p>
//               <div className="flex items-center gap-1 mt-2">
//                 <Star size={16} className="text-[#174047]" />
//                 <span className="text-sm text-[#174047]">Customer rating</span>
//               </div>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <ThumbsUp className="text-[#174047]" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-8">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-6 py-3 font-medium transition-all duration-200 relative flex items-center gap-2 ${
//               activeTab === tab.id
//                 ? 'text-[#2c6774] border-b-2 border-[#2c6774]'
//                 : 'text-gray-600 hover:text-[#2c6774]'
//             }`}
//           >
//             <span>{tab.label}</span>
//             {tab.count !== null && (
//               <span className="text-xs bg-[#2c6774]/10 text-[#2c6774] px-2 py-0.5 rounded-full">
//                 {tab.count}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Tickets Tab */}
//       {activeTab === 'tickets' && (
//         <>
//           {/* Filters */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//             <div className="flex flex-wrap gap-2">
//               {priorities.map((priority) => (
//                 <button
//                   key={priority.id}
//                   onClick={() => setSelectedPriority(priority.id)}
//                   className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
//                     selectedPriority === priority.id
//                       ? 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white'
//                       : 'bg-[#c0d3dc]/20 text-[#174047] hover:bg-[#c0d3dc]/30'
//                   }`}
//                 >
//                   {priority.label}
//                 </button>
//               ))}
//             </div>
//             <div className="flex gap-2 mt-4 md:mt-0">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search tickets..."
//                   className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
//                 />
//               </div>
//               <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//                 <Filter size={18} />
//                 Filter
//               </button>
//             </div>
//           </div>

//           {/* Tickets Table */}
//           <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
//             <div className="p-6">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200">
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Ticket ID</th>
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Subject</th>
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Priority</th>
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Assigned To</th>
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Last Update</th>
//                       <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredTickets.map((ticket) => {
//                       const CategoryIcon = getCategoryIcon(ticket.category);
//                       return (
//                         <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                           <td className="py-4 px-4">
//                             <span className="font-medium text-[#2c6774]">{ticket.id}</span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <div>
//                               <div className="font-medium">{ticket.customer}</div>
//                               <div className="text-sm text-gray-500">{ticket.email}</div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <div className="font-medium">{ticket.subject}</div>
//                             <div className="text-sm text-gray-500">
//                               {ticket.messages} messages
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <div className="flex items-center gap-2">
//                               <CategoryIcon size={16} className="text-[#5c878f]" />
//                               <span className="capitalize">{ticket.category}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
//                               {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
//                               {ticket.status.replace('-', ' ').charAt(0).toUpperCase() + ticket.status.replace('-', ' ').slice(1)}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4">
//                             <div className="flex items-center gap-2">
//                               <User size={16} className="text-gray-400" />
//                               <span className={ticket.assignedTo === 'Not Assigned' ? 'text-gray-500' : 'text-gray-700'}>
//                                 {ticket.assignedTo}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4 text-gray-600">{ticket.lastUpdate}</td>
//                           <td className="py-4 px-4">
//                             <div className="flex gap-2">
//                               <button className="p-2 hover:bg-[#2c6774]/10 rounded-lg transition-colors">
//                                 <MessageSquare size={18} className="text-[#2c6774]" />
//                               </button>
//                               <button className="p-2 hover:bg-[#5c878f]/10 rounded-lg transition-colors">
//                                 <Edit size={18} className="text-[#5c878f]" />
//                               </button>
//                               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                                 <MoreVertical size={18} className="text-gray-600" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Table Footer */}
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//               <div className="flex flex-col md:flex-row md:items-center justify-between">
//                 <div className="text-sm text-gray-600">
//                   Showing {filteredTickets.length} of {tickets.length} tickets
//                 </div>
//                 <div className="flex gap-2 mt-4 md:mt-0">
//                   <button className="px-4 py-2 bg-[#c0d3dc]/20 text-[#174047] rounded-xl hover:bg-[#c0d3dc]/30 transition-colors">
//                     Previous
//                   </button>
//                   <button className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:opacity-90 transition-colors">
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Knowledge Base Tab */}
//       {activeTab === 'knowledge' && (
//         <div className="space-y-6">
//           {/* Search Bar */}
//           <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">How can we help you?</h2>
//               <div className="relative max-w-2xl mx-auto">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search for answers..."
//                   className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
//                 />
//               </div>
//               <div className="flex flex-wrap justify-center gap-2 mt-6">
//                 {categories.slice(1).map((category) => {
//                   const Icon = category.icon;
//                   return (
//                     <button
//                       key={category.id}
//                       className="flex items-center gap-2 px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200"
//                     >
//                       <Icon size={18} />
//                       <span>{category.name}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Popular Articles */}
//           <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Popular Articles</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {knowledgeBase.map((article) => (
//                 <div key={article.id} className="border border-gray-200 rounded-xl p-6 hover:border-[#5c878f] hover:shadow-lg transition-all duration-300 group cursor-pointer">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="p-3 rounded-lg bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10">
//                       <FileText className="text-[#2c6774]" size={20} />
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center gap-1">
//                         <ThumbsUp size={14} className="text-green-500" />
//                         <span className="text-sm text-gray-600">{article.helpful}%</span>
//                       </div>
//                     </div>
//                   </div>
//                   <h3 className="font-bold text-gray-800 mb-3 group-hover:text-[#2c6774] transition-colors">
//                     {article.title}
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm text-gray-500">
//                       {article.views} views
//                     </div>
//                     <button className="text-sm text-[#2c6774] font-medium hover:text-[#174047] transition-colors">
//                       Read Article →
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Support Channels */}
//           <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-2xl p-8">
//             <div className="text-center text-white mb-8">
//               <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
//               <p className="text-[#c0d3dc]">Contact us through any of these channels</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {[
//                 {
//                   icon: Phone,
//                   title: 'Phone Support',
//                   description: 'Call us for immediate assistance',
//                   contact: '(555) 123-4567',
//                   hours: '24/7 Available'
//                 },
//                 {
//                   icon: Mail,
//                   title: 'Email Support',
//                   description: 'Send us an email',
//                   contact: 'support@medicarepharmacy.com',
//                   hours: 'Response within 2 hours'
//                 },
//                 {
//                   icon: MessageSquare,
//                   title: 'Live Chat',
//                   description: 'Chat with our support team',
//                   contact: 'Available Now',
//                   hours: '9 AM - 9 PM EST'
//                 }
//               ].map((channel, index) => {
//                 const Icon = channel.icon;
//                 return (
//                   <div key={index} className="bg-white rounded-xl p-6 text-center">
//                     <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 mb-4">
//                       <Icon className="text-[#2c6774]" size={24} />
//                     </div>
//                     <h3 className="font-bold text-gray-800 mb-2">{channel.title}</h3>
//                     <p className="text-gray-600 mb-4">{channel.description}</p>
//                     <div className="text-[#2c6774] font-medium mb-2">{channel.contact}</div>
//                     <div className="text-sm text-gray-500">{channel.hours}</div>
//                     <button className="mt-4 w-full px-4 py-2 bg-[#2c6774] text-white rounded-lg font-medium hover:opacity-90 transition-colors">
//                       Contact Now
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Live Chat Tab */}
//       {activeTab === 'live-chat' && (
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-3">
//             {/* Chat List */}
//             <div className="lg:col-span-1 border-r border-gray-200">
//               <div className="p-6 border-b border-gray-200">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">Active Conversations</h2>
//                 <div className="space-y-4">
//                   {[
//                     { name: 'John Smith', time: '2 min ago', unread: 3, status: 'online' },
//                     { name: 'Emma Wilson', time: '15 min ago', unread: 0, status: 'online' },
//                     { name: 'Robert Brown', time: '1 hour ago', unread: 1, status: 'away' }
//                   ].map((chat, index) => (
//                     <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
//                       <div className="relative">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2c6774] to-[#5c878f] flex items-center justify-center text-white font-bold">
//                           {chat.name.split(' ').map(n => n[0]).join('')}
//                         </div>
//                         <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                           chat.status === 'online' ? 'bg-green-500' : 'bg-amber-500'
//                         }`}></div>
//                       </div>
//                       <div className="flex-1">
//                         <div className="font-medium">{chat.name}</div>
//                         <div className="text-sm text-gray-500">{chat.time}</div>
//                       </div>
//                       {chat.unread > 0 && (
//                         <span className="px-2 py-1 bg-[#2c6774] text-white text-xs rounded-full">
//                           {chat.unread}
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Chat Window */}
//             <div className="lg:col-span-2">
//               <div className="p-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2c6774] to-[#5c878f] flex items-center justify-center text-white font-bold">
//                     JS
//                   </div>
//                   <div>
//                     <div className="font-bold text-gray-800">John Smith</div>
//                     <div className="text-sm text-green-500 flex items-center gap-1">
//                       <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                       Online
//                     </div>
//                   </div>
//                 </div>

//                 {/* Chat Messages */}
//                 <div className="space-y-4 mb-6 h-96 overflow-y-auto">
//                   <div className="flex justify-end">
//                     <div className="max-w-xs bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-2xl rounded-br-none p-4">
//                       Hello! I need help with my prescription refill.
//                     </div>
//                   </div>
//                   <div className="flex justify-start">
//                     <div className="max-w-xs bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none p-4">
//                       Hi John! I'd be happy to help with your prescription. Could you please provide your prescription ID?
//                     </div>
//                   </div>
//                   <div className="flex justify-end">
//                     <div className="max-w-xs bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-2xl rounded-br-none p-4">
//                       The ID is RX-2024-0015. It's for my blood pressure medication.
//                     </div>
//                   </div>
//                   <div className="flex justify-start">
//                     <div className="max-w-xs bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none p-4">
//                       Thank you! I can see your prescription. It's ready for refill. Would you like me to process it now?
//                     </div>
//                   </div>
//                 </div>

//                 {/* Chat Input */}
//                 <div className="flex gap-3">
//                   <input
//                     type="text"
//                     placeholder="Type your message..."
//                     className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
//                   />
//                   <button className="px-6 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Analytics Tab */}
//       {activeTab === 'analytics' && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Response Time Chart */}
//           <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Average Response Time</h2>
//             <div className="h-64 flex items-end gap-3">
//               {[
//                 { day: 'Mon', time: 2.1 },
//                 { day: 'Tue', time: 1.8 },
//                 { day: 'Wed', time: 2.4 },
//                 { day: 'Thu', time: 1.9 },
//                 { day: 'Fri', time: 2.2 },
//                 { day: 'Sat', time: 3.1 },
//                 { day: 'Sun', time: 2.8 }
//               ].map((day, index) => (
//                 <div key={day.day} className="flex-1 flex flex-col items-center">
//                   <div 
//                     className="w-8 bg-gradient-to-t from-[#2c6774] to-[#5c878f] rounded-t-lg mb-2"
//                     style={{ height: `${(day.time / 4) * 100}%` }}
//                   ></div>
//                   <span className="text-xs text-gray-600">{day.day}</span>
//                   <span className="text-xs text-[#5c878f] font-medium">{day.time}h</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Ticket Resolution */}
//           <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Ticket Resolution Rate</h2>
//             <div className="h-64 flex items-center justify-center">
//               <div className="relative">
//                 <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-gray-800">92%</div>
//                     <div className="text-sm text-gray-600">Resolved</div>
//                   </div>
//                 </div>
//                 <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#2c6774] border-r-[#5c878f] border-b-[#174047] border-l-[#c0d3dc]"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SupportPage;


























//----------------Pretty Colors----------------------
import React, { useState } from 'react';
import {
  MessageSquare, Phone, Mail, Clock,
  CheckCircle, XCircle, AlertCircle, HelpCircle,
  Search, Filter, Plus, Download,
  User, Calendar, FileText, Paperclip,
  ThumbsUp, ThumbsDown, Star, Award,
  ChevronDown, MoreVertical, Edit, Trash2,
  RefreshCw, Shield, Truck, Package,
  CreditCard,Users, Building, Settings
} from 'lucide-react';

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const tickets = [
    {
      id: 'TKT-001',
      customer: 'John Smith',
      email: 'john@example.com',
      subject: 'Delivery Delay Issue',
      category: 'delivery',
      priority: 'high',
      status: 'open',
      assignedTo: 'Sarah Johnson',
      created: '2024-01-15',
      lastUpdate: '2 hours ago',
      messages: 5
    },
    {
      id: 'TKT-002',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      subject: 'Prescription Refill Problem',
      category: 'prescription',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Mike Chen',
      created: '2024-01-14',
      lastUpdate: '1 day ago',
      messages: 8
    },
    {
      id: 'TKT-003',
      customer: 'Robert Brown',
      email: 'robert@example.com',
      subject: 'Billing Discrepancy',
      category: 'billing',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Not Assigned',
      created: '2024-01-14',
      lastUpdate: '3 hours ago',
      messages: 3
    },
    {
      id: 'TKT-004',
      customer: 'Sarah Davis',
      email: 'sarah@example.com',
      subject: 'Product Quality Concern',
      category: 'product',
      priority: 'low',
      status: 'resolved',
      assignedTo: 'Lisa Wang',
      created: '2024-01-13',
      lastUpdate: '2 days ago',
      messages: 12
    },
    {
      id: 'TKT-005',
      customer: 'Michael Lee',
      email: 'michael@example.com',
      subject: 'Account Access Issue',
      category: 'account',
      priority: 'medium',
      status: 'closed',
      assignedTo: 'David Kim',
      created: '2024-01-12',
      lastUpdate: '3 days ago',
      messages: 6
    },
    {
      id: 'TKT-006',
      customer: 'Jennifer Taylor',
      email: 'jennifer@example.com',
      subject: 'Insurance Claim Help',
      category: 'insurance',
      priority: 'high',
      status: 'open',
      assignedTo: 'Sarah Johnson',
      created: '2024-01-12',
      lastUpdate: '5 hours ago',
      messages: 4
    },
    {
      id: 'TKT-007',
      customer: 'David Wilson',
      email: 'david@example.com',
      subject: 'Refund Request',
      category: 'refund',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Mike Chen',
      created: '2024-01-11',
      lastUpdate: '1 day ago',
      messages: 7
    },
    {
      id: 'TKT-008',
      customer: 'Lisa Anderson',
      email: 'lisa@example.com',
      subject: 'Technical Support Needed',
      category: 'technical',
      priority: 'low',
      status: 'open',
      assignedTo: 'Not Assigned',
      created: '2024-01-10',
      lastUpdate: '6 hours ago',
      messages: 2
    }
  ];

  const knowledgeBase = [
    {
      id: 1,
      title: 'How to Track Your Order',
      category: 'delivery',
      views: 1245,
      helpful: 98,
      lastUpdated: '2024-01-10'
    },
    {
      id: 2,
      title: 'Prescription Refill Process',
      category: 'prescription',
      views: 1890,
      helpful: 156,
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      title: 'Understanding Your Bill',
      category: 'billing',
      views: 987,
      helpful: 78,
      lastUpdated: '2024-01-08'
    },
    {
      id: 4,
      title: 'Insurance Claim Guide',
      category: 'insurance',
      views: 1456,
      helpful: 134,
      lastUpdated: '2024-01-11'
    },
    {
      id: 5,
      title: 'Return & Refund Policy',
      category: 'refund',
      views: 1123,
      helpful: 89,
      lastUpdated: '2024-01-09'
    },
    {
      id: 6,
      title: 'Account Security Tips',
      category: 'account',
      views: 876,
      helpful: 67,
      lastUpdated: '2024-01-07'
    }
  ];

  const tabs = [
    { id: 'tickets', label: 'Support Tickets', count: tickets.length },
    { id: 'knowledge', label: 'Knowledge Base', count: knowledgeBase.length },
    { id: 'live-chat', label: 'Live Chat', count: 3 },
    { id: 'analytics', label: 'Analytics', count: null }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: FileText },
    { id: 'delivery', name: 'Delivery', icon: Truck },
    { id: 'prescription', name: 'Prescription', icon: Package },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'account', name: 'Account', icon: User },
    { id: 'technical', name: 'Technical', icon: Settings },
    { id: 'insurance', name: 'Insurance', icon: Shield },
    { id: 'refund', name: 'Refund', icon: RefreshCw }
  ];

  const priorities = [
    { id: 'all', label: 'All Priorities' },
    { id: 'high', label: 'High Priority' },
    { id: 'medium', label: 'Medium Priority' },
    { id: 'low', label: 'Low Priority' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-emerald-100 text-emerald-800';
      case 'in-progress': return 'bg-amber-100 text-amber-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : FileText;
  };

  const filteredTickets = selectedPriority === 'all'
    ? tickets
    : tickets.filter(ticket => ticket.priority === selectedPriority);

  const stats = {
    openTickets: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length,
    avgResponse: '2.4 hours',
    satisfaction: 94.5
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Support</h1>
          <p className="text-gray-600">Manage customer inquiries and support requests</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
            <Download size={18} />
            Export Tickets
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
            <Plus size={18} />
            New Ticket
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-600 font-medium">Open Tickets</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.openTickets}</p>
              <div className="flex items-center gap-1 mt-2">
                <AlertCircle size={16} className="text-emerald-600" />
                <span className="text-sm text-emerald-600">Requires attention</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-emerald-500/10">
              <MessageSquare className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-cyan-100/50 rounded-2xl p-6 border border-teal-100 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-teal-600 font-medium">In Progress</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.inProgress}</p>
              <div className="flex items-center gap-1 mt-2">
                <Clock size={16} className="text-teal-600" />
                <span className="text-sm text-teal-600">Being worked on</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-teal-500/10">
              <RefreshCw className="text-teal-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-2xl p-6 border border-purple-100 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-600 font-medium">Resolved</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.resolved}</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle size={16} className="text-purple-600" />
                <span className="text-sm text-purple-600">Successfully closed</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-500/10">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-100/50 rounded-2xl p-6 border border-pink-100 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-600 font-medium">Satisfaction</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.satisfaction}%</p>
              <div className="flex items-center gap-1 mt-2">
                <Star size={16} className="text-rose-600" />
                <span className="text-sm text-rose-600">Customer rating</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-rose-500/10">
              <ThumbsUp className="text-rose-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-all duration-200 relative flex items-center gap-2 ${
              activeTab === tab.id
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:text-emerald-600'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  onClick={() => setSelectedPriority(priority.id)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    selectedPriority === priority.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {priority.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
              <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Ticket ID</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Subject</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Priority</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Assigned To</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Last Update</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => {
                      const CategoryIcon = getCategoryIcon(ticket.category);
                      return (
                        <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                          <td className="py-4 px-4">
                            <span className="font-medium text-emerald-600">{ticket.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium">{ticket.customer}</div>
                              <div className="text-sm text-gray-500">{ticket.email}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium">{ticket.subject}</div>
                            <div className="text-sm text-gray-500">
                              {ticket.messages} messages
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <CategoryIcon size={16} className="text-teal-600" />
                              <span className="capitalize">{ticket.category}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('-', ' ').charAt(0).toUpperCase() + ticket.status.replace('-', ' ').slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-gray-400" />
                              <span className={ticket.assignedTo === 'Not Assigned' ? 'text-gray-500' : 'text-gray-700'}>
                                {ticket.assignedTo}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{ticket.lastUpdate}</td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                                <MessageSquare size={18} className="text-emerald-600" />
                              </button>
                              <button className="p-2 hover:bg-teal-50 rounded-lg transition-colors">
                                <Edit size={18} className="text-teal-600" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical size={18} className="text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {filteredTickets.length} of {tickets.length} tickets
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
        </>
      )}

      {/* Knowledge Base Tab */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">How can we help you?</h2>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {categories.slice(1).map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      <Icon size={18} />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Popular Articles */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeBase.map((article) => (
                <div key={article.id} className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50">
                      <FileText className="text-emerald-600" size={20} />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} className="text-green-500" />
                        <span className="text-sm text-gray-600">{article.helpful}%</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {article.views} views
                    </div>
                    <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                      Read Article →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Channels */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8">
            <div className="text-center text-white mb-8">
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-emerald-100">Contact us through any of these channels</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Phone,
                  title: 'Phone Support',
                  description: 'Call us for immediate assistance',
                  contact: '(555) 123-4567',
                  hours: '24/7 Available'
                },
                {
                  icon: Mail,
                  title: 'Email Support',
                  description: 'Send us an email',
                  contact: 'support@medicarepharmacy.com',
                  hours: 'Response within 2 hours'
                },
                {
                  icon: MessageSquare,
                  title: 'Live Chat',
                  description: 'Chat with our support team',
                  contact: 'Available Now',
                  hours: '9 AM - 9 PM EST'
                }
              ].map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 text-center">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 mb-4">
                      <Icon className="text-emerald-600" size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{channel.title}</h3>
                    <p className="text-gray-600 mb-4">{channel.description}</p>
                    <div className="text-emerald-600 font-medium mb-2">{channel.contact}</div>
                    <div className="text-sm text-gray-500">{channel.hours}</div>
                    <button className="mt-4 w-full px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:opacity-90 transition-colors">
                      Contact Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Tab */}
      {activeTab === 'live-chat' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Chat List */}
            <div className="lg:col-span-1 border-r border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Active Conversations</h2>
                <div className="space-y-4">
                  {[
                    { name: 'John Smith', time: '2 min ago', unread: 3, status: 'online' },
                    { name: 'Emma Wilson', time: '15 min ago', unread: 0, status: 'online' },
                    { name: 'Robert Brown', time: '1 hour ago', unread: 1, status: 'away' }
                  ].map((chat, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                          {chat.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          chat.status === 'online' ? 'bg-green-500' : 'bg-amber-500'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{chat.name}</div>
                        <div className="text-sm text-gray-500">{chat.time}</div>
                      </div>
                      {chat.unread > 0 && (
                        <span className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    JS
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">John Smith</div>
                    <div className="text-sm text-green-500 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Online
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-6 h-96 overflow-y-auto">
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl rounded-br-none p-4">
                      Hello! I need help with my prescription refill.
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none p-4">
                      Hi John! I'd be happy to help with your prescription. Could you please provide your prescription ID?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl rounded-br-none p-4">
                      The ID is RX-2024-0015. It's for my blood pressure medication.
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none p-4">
                      Thank you! I can see your prescription. It's ready for refill. Would you like me to process it now?
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response Time Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Average Response Time</h2>
            <div className="h-64 flex items-end gap-3">
              {[
                { day: 'Mon', time: 2.1 },
                { day: 'Tue', time: 1.8 },
                { day: 'Wed', time: 2.4 },
                { day: 'Thu', time: 1.9 },
                { day: 'Fri', time: 2.2 },
                { day: 'Sat', time: 3.1 },
                { day: 'Sun', time: 2.8 }
              ].map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-8 bg-gradient-to-t from-emerald-400 to-teal-400 rounded-t-lg mb-2"
                    style={{ height: `${(day.time / 4) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-600">{day.day}</span>
                  <span className="text-xs text-teal-600 font-medium">{day.time}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Resolution */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Ticket Resolution Rate</h2>
            <div className="h-64 flex items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">92%</div>
                    <div className="text-sm text-gray-600">Resolved</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-emerald-500 border-r-teal-500 border-b-purple-500 border-l-pink-500"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;