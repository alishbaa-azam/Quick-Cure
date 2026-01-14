// import React, { useState } from 'react';
// import {
//   DollarSign, TrendingUp, TrendingDown, CreditCard,
//   Building, Wallet, Download, Filter,
//   Calendar, PieChart, BarChart3, LineChart,
//   ArrowUpRight, ArrowDownRight, Eye, Printer,
//   FileText, RefreshCw, Search, Plus,
//   CheckCircle, XCircle, Clock, Shield,
//   Users, Truck, Package, Award,
//   ChevronDown, MoreVertical, Edit, Trash2
// } from 'lucide-react';

// const FinancePage = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [timeRange, setTimeRange] = useState('month');

//   const financialData = {
//     revenue: {
//       total: 125847.50,
//       change: 12.5,
//       trend: 'up',
//       breakdown: {
//         prescriptions: 78450.25,
//         otc: 32540.75,
//         services: 14856.50
//       }
//     },
//     expenses: {
//       total: 89450.75,
//       change: -8.2,
//       trend: 'down',
//       breakdown: {
//         inventory: 52480.50,
//         salaries: 24580.25,
//         utilities: 7850.00,
//         marketing: 4540.00
//       }
//     },
//     profit: {
//       total: 36396.75,
//       margin: 28.9,
//       change: 25.3,
//       trend: 'up'
//     },
//     invoices: {
//       pending: 12,
//       overdue: 3,
//       paid: 245,
//       totalAmount: 78450.25
//     }
//   };

//   const transactions = [
//     {
//       id: 1,
//       date: '2024-01-15',
//       description: 'Pharmaceutical Supplies',
//       category: 'Inventory',
//       vendor: 'MediCorp Inc.',
//       amount: -12500.00,
//       type: 'expense',
//       status: 'completed',
//       invoice: 'INV-001'
//     },
//     {
//       id: 2,
//       date: '2024-01-15',
//       description: 'Customer Payment',
//       category: 'Revenue',
//       customer: 'John Smith',
//       amount: 2450.50,
//       type: 'income',
//       status: 'completed',
//       invoice: 'INV-002'
//     },
//     {
//       id: 3,
//       date: '2024-01-14',
//       description: 'Staff Salaries',
//       category: 'Salaries',
//       vendor: 'Payroll',
//       amount: -18500.00,
//       type: 'expense',
//       status: 'completed',
//       invoice: 'INV-003'
//     },
//     {
//       id: 4,
//       date: '2024-01-14',
//       description: 'Insurance Claim',
//       category: 'Revenue',
//       insurance: 'Blue Cross',
//       amount: 7840.75,
//       type: 'income',
//       status: 'pending',
//       invoice: 'INV-004'
//     },
//     {
//       id: 5,
//       date: '2024-01-13',
//       description: 'Utility Bills',
//       category: 'Utilities',
//       vendor: 'Utility Corp',
//       amount: -2450.50,
//       type: 'expense',
//       status: 'completed',
//       invoice: 'INV-005'
//     },
//     {
//       id: 6,
//       date: '2024-01-13',
//       description: 'OTC Sales',
//       category: 'Revenue',
//       customer: 'Retail Sales',
//       amount: 9850.25,
//       type: 'income',
//       status: 'completed',
//       invoice: 'INV-006'
//     },
//     {
//       id: 7,
//       date: '2024-01-12',
//       description: 'Marketing Campaign',
//       category: 'Marketing',
//       vendor: 'Marketing Pro',
//       amount: -3500.00,
//       type: 'expense',
//       status: 'pending',
//       invoice: 'INV-007'
//     },
//     {
//       id: 8,
//       date: '2024-01-12',
//       description: 'Consultation Services',
//       category: 'Services',
//       customer: 'Sarah Johnson',
//       amount: 4500.00,
//       type: 'income',
//       status: 'completed',
//       invoice: 'INV-008'
//     }
//   ];

//   const bills = [
//     {
//       id: 1,
//       vendor: 'MediCorp Inc.',
//       amount: 12500.00,
//       dueDate: '2024-01-25',
//       status: 'pending',
//       category: 'Inventory'
//     },
//     {
//       id: 2,
//       vendor: 'Utility Corp',
//       amount: 2450.50,
//       dueDate: '2024-01-20',
//       status: 'overdue',
//       category: 'Utilities'
//     },
//     {
//       id: 3,
//       vendor: 'Rent Management',
//       amount: 8500.00,
//       dueDate: '2024-02-01',
//       status: 'pending',
//       category: 'Rent'
//     },
//     {
//       id: 4,
//       vendor: 'Insurance Co.',
//       amount: 3200.00,
//       dueDate: '2024-01-30',
//       status: 'pending',
//       category: 'Insurance'
//     }
//   ];

//   const tabs = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'transactions', label: 'Transactions' },
//     { id: 'bills', label: 'Bills & Payments' },
//     { id: 'reports', label: 'Financial Reports' }
//   ];

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'completed': return 'bg-[#2c6774]/10 text-[#2c6774]';
//       case 'pending': return 'bg-[#5c878f]/10 text-[#5c878f]';
//       case 'overdue': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Financial Dashboard</h1>
//           <p className="text-gray-600">Track revenue, expenses, and financial performance</p>
//         </div>
//         <div className="flex gap-3 mt-4 md:mt-0">
//           <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//             <Download size={18} />
//             Export Report
//           </button>
//           <button className="px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
//             <Plus size={18} />
//             Add Transaction
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-8">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-6 py-3 font-medium transition-all duration-200 relative ${
//               activeTab === tab.id
//                 ? 'text-[#2c6774] border-b-2 border-[#2c6774]'
//                 : 'text-gray-600 hover:text-[#2c6774]'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Overview Tab */}
//       {activeTab === 'overview' && (
//         <>
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {/* Total Revenue */}
//             <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 rounded-2xl p-6 border border-[#2c6774]/20 shadow-lg">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-[#2c6774] font-medium">Total Revenue</p>
//                   <p className="text-3xl font-bold text-gray-800 mt-2">
//                     {formatCurrency(financialData.revenue.total)}
//                   </p>
//                   <div className="flex items-center gap-1 mt-2">
//                     {financialData.revenue.trend === 'up' ? (
//                       <TrendingUp size={16} className="text-[#2c6774]" />
//                     ) : (
//                       <TrendingDown size={16} className="text-red-500" />
//                     )}
//                     <span className={`text-sm ${financialData.revenue.trend === 'up' ? 'text-[#2c6774]' : 'text-red-500'}`}>
//                       {financialData.revenue.change > 0 ? '+' : ''}{financialData.revenue.change}% from last month
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-3 rounded-full bg-[#2c6774]/10">
//                   <DollarSign className="text-[#2c6774]" size={24} />
//                 </div>
//               </div>
//             </div>

//             {/* Total Expenses */}
//             <div className="bg-gradient-to-br from-[#5c878f]/10 to-[#9fbfc5]/20 rounded-2xl p-6 border border-[#5c878f]/20 shadow-lg">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-[#5c878f] font-medium">Total Expenses</p>
//                   <p className="text-3xl font-bold text-gray-800 mt-2">
//                     {formatCurrency(financialData.expenses.total)}
//                   </p>
//                   <div className="flex items-center gap-1 mt-2">
//                     {financialData.expenses.trend === 'down' ? (
//                       <TrendingDown size={16} className="text-green-500" />
//                     ) : (
//                       <TrendingUp size={16} className="text-red-500" />
//                     )}
//                     <span className={`text-sm ${financialData.expenses.trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
//                       {financialData.expenses.change > 0 ? '+' : ''}{financialData.expenses.change}% from last month
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-3 rounded-full bg-[#5c878f]/10">
//                   <Wallet className="text-[#5c878f]" size={24} />
//                 </div>
//               </div>
//             </div>

//             {/* Net Profit */}
//             <div className="bg-gradient-to-br from-[#174047]/10 to-[#2c6774]/10 rounded-2xl p-6 border border-[#174047]/20 shadow-lg">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-[#174047] font-medium">Net Profit</p>
//                   <p className="text-3xl font-bold text-gray-800 mt-2">
//                     {formatCurrency(financialData.profit.total)}
//                   </p>
//                   <div className="flex items-center gap-1 mt-2">
//                     <TrendingUp size={16} className="text-[#174047]" />
//                     <span className="text-sm text-[#174047]">
//                       {financialData.profit.margin}% margin
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-3 rounded-full bg-[#174047]/10">
//                   <TrendingUp className="text-[#174047]" size={24} />
//                 </div>
//               </div>
//             </div>

//             {/* Cash Flow */}
//             <div className="bg-gradient-to-br from-[#c0d3dc]/20 to-[#9fbfc5]/10 rounded-2xl p-6 border border-[#c0d3dc]/30 shadow-lg">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-[#174047] font-medium">Cash Flow</p>
//                   <p className="text-3xl font-bold text-gray-800 mt-2">
//                     {formatCurrency(financialData.revenue.total - financialData.expenses.total)}
//                   </p>
//                   <div className="flex items-center gap-1 mt-2">
//                     <ArrowUpRight size={16} className="text-[#174047]" />
//                     <span className="text-sm text-[#174047]">
//                       Positive cash flow
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-3 rounded-full bg-[#174047]/10">
//                   <CreditCard className="text-[#174047]" size={24} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             {/* Revenue Breakdown */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Breakdown</h2>
//               <div className="h-64 flex items-center">
//                 <div className="w-full">
//                   {Object.entries(financialData.revenue.breakdown).map(([key, value], index) => {
//                     const colors = [
//                       'from-[#2c6774] to-[#5c878f]',
//                       'from-[#5c878f] to-[#9fbfc5]',
//                       'from-[#174047] to-[#2c6774]'
//                     ];
//                     const percentage = (value / financialData.revenue.total) * 100;
                    
//                     return (
//                       <div key={key} className="mb-4">
//                         <div className="flex justify-between mb-1">
//                           <span className="font-medium text-gray-700 capitalize">
//                             {key}
//                           </span>
//                           <span className="text-gray-600">
//                             {formatCurrency(value)} ({percentage.toFixed(1)}%)
//                           </span>
//                         </div>
//                         <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
//                           <div 
//                             className={`h-full bg-gradient-to-r ${colors[index]} rounded-full`}
//                             style={{ width: `${percentage}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* Expense Breakdown */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Expense Breakdown</h2>
//               <div className="h-64">
//                 <div className="flex items-end h-48 gap-4">
//                   {Object.entries(financialData.expenses.breakdown).map(([key, value], index) => {
//                     const colors = [
//                       'from-[#2c6774] to-[#5c878f]',
//                       'from-[#5c878f] to-[#9fbfc5]',
//                       'from-[#174047] to-[#2c6774]',
//                       'from-[#c0d3dc] to-[#9fbfc5]'
//                     ];
//                     const maxValue = Math.max(...Object.values(financialData.expenses.breakdown));
//                     const height = (value / maxValue) * 100;
                    
//                     return (
//                       <div key={key} className="flex-1 flex flex-col items-center">
//                         <div 
//                           className={`w-12 bg-gradient-to-t ${colors[index]} rounded-t-lg mb-2`}
//                           style={{ height: `${height}%` }}
//                         ></div>
//                         <span className="text-sm text-gray-600 capitalize">
//                           {key}
//                         </span>
//                         <span className="text-xs text-[#5c878f] font-medium">
//                           {formatCurrency(value)}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Transactions Tab */}
//       {activeTab === 'transactions' && (
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
//           <div className="p-6">
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
//               <div className="flex gap-2 mt-4 md:mt-0">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     placeholder="Search transactions..."
//                     className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30"
//                   />
//                 </div>
//                 <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200 flex items-center gap-2">
//                   <Filter size={18} />
//                   Filter
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
//                     <th className="text-left py-3 px-4 text-gray-600 font-medium">Description</th>
//                     <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
//                     <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
//                     <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
//                     <th className="text-left py-3 px-4 text-gray-600 font-medium">Invoice</th>
//                     <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transactions.map((transaction) => (
//                     <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                       <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
//                       <td className="py-4 px-4">
//                         <div className="font-medium">{transaction.description}</div>
//                         <div className="text-sm text-gray-500">
//                           {transaction.vendor || transaction.customer || transaction.insurance}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className="px-3 py-1 rounded-full bg-[#c0d3dc]/30 text-gray-700 text-sm">
//                           {transaction.category}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className={`font-bold ${transaction.type === 'income' ? 'text-[#2c6774]' : 'text-red-600'}`}>
//                           {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
//                           {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className="font-medium text-[#2c6774]">{transaction.invoice}</span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex gap-2">
//                           <button className="p-2 hover:bg-[#2c6774]/10 rounded-lg transition-colors">
//                             <Eye size={18} className="text-[#2c6774]" />
//                           </button>
//                           <button className="p-2 hover:bg-[#5c878f]/10 rounded-lg transition-colors">
//                             <Printer size={18} className="text-[#5c878f]" />
//                           </button>
//                           <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                             <MoreVertical size={18} className="text-gray-600" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Table Footer */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//             <div className="flex flex-col md:flex-row md:items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 Showing {transactions.length} transactions
//               </div>
//               <div className="flex gap-2 mt-4 md:mt-0">
//                 <button className="px-4 py-2 bg-[#c0d3dc]/20 text-[#174047] rounded-xl hover:bg-[#c0d3dc]/30 transition-colors">
//                   Previous
//                 </button>
//                 <button className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:opacity-90 transition-colors">
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Bills Tab */}
//       {activeTab === 'bills' && (
//         <div className="space-y-6">
//           {/* Bills Summary */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 rounded-2xl p-6 border border-[#2c6774]/20 shadow-lg">
//               <div className="text-center">
//                 <p className="text-[#2c6774] font-medium">Total Bills Due</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">
//                   {formatCurrency(bills.reduce((sum, bill) => sum + bill.amount, 0))}
//                 </p>
//                 <p className="text-sm text-gray-600 mt-2">{bills.length} bills pending</p>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-[#5c878f]/10 to-[#9fbfc5]/20 rounded-2xl p-6 border border-[#5c878f]/20 shadow-lg">
//               <div className="text-center">
//                 <p className="text-[#5c878f] font-medium">Overdue Bills</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">
//                   {formatCurrency(bills.filter(b => b.status === 'overdue').reduce((sum, bill) => sum + bill.amount, 0))}
//                 </p>
//                 <p className="text-sm text-gray-600 mt-2">
//                   {bills.filter(b => b.status === 'overdue').length} bills overdue
//                 </p>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-[#174047]/10 to-[#2c6774]/10 rounded-2xl p-6 border border-[#174047]/20 shadow-lg">
//               <div className="text-center">
//                 <p className="text-[#174047] font-medium">Next Payment</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">
//                   {formatCurrency(bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.amount || 0)}
//                 </p>
//                 <p className="text-sm text-gray-600 mt-2">Due {bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.dueDate}</p>
//               </div>
//             </div>
//           </div>

//           {/* Bills List */}
//           <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Bills</h2>
//               <div className="space-y-4">
//                 {bills.map((bill) => (
//                   <div key={bill.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div className="p-3 rounded-lg bg-[#c0d3dc]/20">
//                         <Building className="text-[#2c6774]" size={24} />
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-gray-800">{bill.vendor}</h3>
//                         <div className="flex items-center gap-4 mt-1">
//                           <span className="text-sm text-gray-600">Due: {bill.dueDate}</span>
//                           <span className="px-3 py-1 rounded-full bg-[#c0d3dc]/30 text-gray-700 text-sm">
//                             {bill.category}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="text-right">
//                         <div className="text-xl font-bold text-gray-800">
//                           {formatCurrency(bill.amount)}
//                         </div>
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bill.status)}`}>
//                           {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
//                         </span>
//                       </div>
//                       <button className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:opacity-90 transition-colors">
//                         Pay Now
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Reports Tab */}
//       {activeTab === 'reports' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             {
//               title: 'Income Statement',
//               description: 'Revenue, expenses, and profit/loss report',
//               icon: FileText,
//               period: 'Monthly',
//               lastUpdated: '2024-01-15'
//             },
//             {
//               title: 'Balance Sheet',
//               description: 'Assets, liabilities, and equity snapshot',
//               icon: PieChart,
//               period: 'Quarterly',
//               lastUpdated: '2023-12-31'
//             },
//             {
//               title: 'Cash Flow Statement',
//               description: 'Operating, investing, and financing activities',
//               icon: LineChart,
//               period: 'Monthly',
//               lastUpdated: '2024-01-15'
//             },
//             {
//               title: 'Accounts Receivable',
//               description: 'Outstanding customer invoices and aging',
//               icon: Users,
//               period: 'Weekly',
//               lastUpdated: '2024-01-14'
//             },
//             {
//               title: 'Accounts Payable',
//               description: 'Outstanding vendor bills and payments',
//               icon: Building,
//               period: 'Weekly',
//               lastUpdated: '2024-01-14'
//             },
//             {
//               title: 'Tax Report',
//               description: 'Tax liabilities and compliance report',
//               icon: Shield,
//               period: 'Quarterly',
//               lastUpdated: '2023-12-31'
//             }
//           ].map((report, index) => {
//             const Icon = report.icon;
//             return (
//               <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="p-3 rounded-xl bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10">
//                       <Icon className="text-[#2c6774]" size={24} />
//                     </div>
//                     <span className="px-3 py-1 rounded-full bg-[#c0d3dc]/30 text-gray-700 text-sm">
//                       {report.period}
//                     </span>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#2c6774] transition-colors">
//                     {report.title}
//                   </h3>
//                   <p className="text-gray-600 mb-6">{report.description}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">
//                       Updated: {report.lastUpdated}
//                     </span>
//                     <div className="flex gap-2">
//                       <button className="p-2 hover:bg-[#2c6774]/10 rounded-lg transition-colors">
//                         <Eye size={18} className="text-[#2c6774]" />
//                       </button>
//                       <button className="p-2 hover:bg-[#5c878f]/10 rounded-lg transition-colors">
//                         <Download size={18} className="text-[#5c878f]" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FinancePage;


















//-------------Pretty Colors
import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, CreditCard,
  Building, Wallet, Download, Filter,
  Calendar, PieChart, BarChart3, LineChart,
  ArrowUpRight, ArrowDownRight, Eye, Printer,
  FileText, RefreshCw, Search, Plus,
  CheckCircle, XCircle, Clock, Shield,
  Users, Truck, Package, Award,
  ChevronDown, MoreVertical, Edit, Trash2
} from 'lucide-react';

const FinancePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');

  const financialData = {
    revenue: {
      total: 125847.50,
      change: 12.5,
      trend: 'up',
      breakdown: {
        prescriptions: 78450.25,
        otc: 32540.75,
        services: 14856.50
      }
    },
    expenses: {
      total: 89450.75,
      change: -8.2,
      trend: 'down',
      breakdown: {
        inventory: 52480.50,
        salaries: 24580.25,
        utilities: 7850.00,
        marketing: 4540.00
      }
    },
    profit: {
      total: 36396.75,
      margin: 28.9,
      change: 25.3,
      trend: 'up'
    },
    invoices: {
      pending: 12,
      overdue: 3,
      paid: 245,
      totalAmount: 78450.25
    }
  };

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Pharmaceutical Supplies',
      category: 'Inventory',
      vendor: 'MediCorp Inc.',
      amount: -12500.00,
      type: 'expense',
      status: 'completed',
      invoice: 'INV-001'
    },
    {
      id: 2,
      date: '2024-01-15',
      description: 'Customer Payment',
      category: 'Revenue',
      customer: 'John Smith',
      amount: 2450.50,
      type: 'income',
      status: 'completed',
      invoice: 'INV-002'
    },
    {
      id: 3,
      date: '2024-01-14',
      description: 'Staff Salaries',
      category: 'Salaries',
      vendor: 'Payroll',
      amount: -18500.00,
      type: 'expense',
      status: 'completed',
      invoice: 'INV-003'
    },
    {
      id: 4,
      date: '2024-01-14',
      description: 'Insurance Claim',
      category: 'Revenue',
      insurance: 'Blue Cross',
      amount: 7840.75,
      type: 'income',
      status: 'pending',
      invoice: 'INV-004'
    },
    {
      id: 5,
      date: '2024-01-13',
      description: 'Utility Bills',
      category: 'Utilities',
      vendor: 'Utility Corp',
      amount: -2450.50,
      type: 'expense',
      status: 'completed',
      invoice: 'INV-005'
    },
    {
      id: 6,
      date: '2024-01-13',
      description: 'OTC Sales',
      category: 'Revenue',
      customer: 'Retail Sales',
      amount: 9850.25,
      type: 'income',
      status: 'completed',
      invoice: 'INV-006'
    },
    {
      id: 7,
      date: '2024-01-12',
      description: 'Marketing Campaign',
      category: 'Marketing',
      vendor: 'Marketing Pro',
      amount: -3500.00,
      type: 'expense',
      status: 'pending',
      invoice: 'INV-007'
    },
    {
      id: 8,
      date: '2024-01-12',
      description: 'Consultation Services',
      category: 'Services',
      customer: 'Sarah Johnson',
      amount: 4500.00,
      type: 'income',
      status: 'completed',
      invoice: 'INV-008'
    }
  ];

  const bills = [
    {
      id: 1,
      vendor: 'MediCorp Inc.',
      amount: 12500.00,
      dueDate: '2024-01-25',
      status: 'pending',
      category: 'Inventory'
    },
    {
      id: 2,
      vendor: 'Utility Corp',
      amount: 2450.50,
      dueDate: '2024-01-20',
      status: 'overdue',
      category: 'Utilities'
    },
    {
      id: 3,
      vendor: 'Rent Management',
      amount: 8500.00,
      dueDate: '2024-02-01',
      status: 'pending',
      category: 'Rent'
    },
    {
      id: 4,
      vendor: 'Insurance Co.',
      amount: 3200.00,
      dueDate: '2024-01-30',
      status: 'pending',
      category: 'Insurance'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'bills', label: 'Bills & Payments' },
    { id: 'reports', label: 'Financial Reports' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Financial Dashboard</h1>
          <p className="text-gray-600">Track revenue, expenses, and financial performance</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
            <Download size={18} />
            Export Report
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2">
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-all duration-200 relative ${
              activeTab === tab.id
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:text-emerald-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-emerald-600 font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {formatCurrency(financialData.revenue.total)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {financialData.revenue.trend === 'up' ? (
                      <TrendingUp size={16} className="text-emerald-600" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500" />
                    )}
                    <span className={`text-sm ${financialData.revenue.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {financialData.revenue.change > 0 ? '+' : ''}{financialData.revenue.change}% from last month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <DollarSign className="text-emerald-600" size={24} />
                </div>
              </div>
            </div>

            {/* Total Expenses */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-100/50 rounded-2xl p-6 border border-teal-100 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-teal-600 font-medium">Total Expenses</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {formatCurrency(financialData.expenses.total)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {financialData.expenses.trend === 'down' ? (
                      <TrendingDown size={16} className="text-green-500" />
                    ) : (
                      <TrendingUp size={16} className="text-red-500" />
                    )}
                    <span className={`text-sm ${financialData.expenses.trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
                      {financialData.expenses.change > 0 ? '+' : ''}{financialData.expenses.change}% from last month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-teal-500/10">
                  <Wallet className="text-teal-600" size={24} />
                </div>
              </div>
            </div>

            {/* Net Profit */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-2xl p-6 border border-purple-100 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-600 font-medium">Net Profit</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {formatCurrency(financialData.profit.total)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={16} className="text-purple-600" />
                    <span className="text-sm text-purple-600">
                      {financialData.profit.margin}% margin
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-purple-500/10">
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
              </div>
            </div>

            {/* Cash Flow */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-100/50 rounded-2xl p-6 border border-pink-100 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-rose-600 font-medium">Cash Flow</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {formatCurrency(financialData.revenue.total - financialData.expenses.total)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight size={16} className="text-rose-600" />
                    <span className="text-sm text-rose-600">
                      Positive cash flow
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-rose-500/10">
                  <CreditCard className="text-rose-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Breakdown</h2>
              <div className="h-64 flex items-center">
                <div className="w-full">
                  {Object.entries(financialData.revenue.breakdown).map(([key, value], index) => {
                    const colors = [
                      'from-emerald-400 to-teal-400',
                      'from-teal-400 to-cyan-400',
                      'from-purple-400 to-violet-400'
                    ];
                    const percentage = (value / financialData.revenue.total) * 100;
                    
                    return (
                      <div key={key} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-700 capitalize">
                            {key}
                          </span>
                          <span className="text-gray-600">
                            {formatCurrency(value)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${colors[index]} rounded-full`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Expense Breakdown</h2>
              <div className="h-64">
                <div className="flex items-end h-48 gap-4">
                  {Object.entries(financialData.expenses.breakdown).map(([key, value], index) => {
                    const colors = [
                      'from-emerald-400 to-teal-400',
                      'from-teal-400 to-cyan-400',
                      'from-purple-400 to-violet-400',
                      'from-pink-400 to-rose-400'
                    ];
                    const maxValue = Math.max(...Object.values(financialData.expenses.breakdown));
                    const height = (value / maxValue) * 100;
                    
                    return (
                      <div key={key} className="flex-1 flex flex-col items-center">
                        <div 
                          className={`w-12 bg-gradient-to-t ${colors[index]} rounded-t-lg mb-2`}
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-sm text-gray-600 capitalize">
                          {key}
                        </span>
                        <span className="text-xs text-teal-600 font-medium">
                          {formatCurrency(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
              <div className="flex gap-2 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
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
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Invoice</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-500">
                          {transaction.vendor || transaction.customer || transaction.insurance}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-emerald-600">{transaction.invoice}</span>
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
                Showing {transactions.length} transactions
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
      )}

      {/* Bills Tab */}
      {activeTab === 'bills' && (
        <div className="space-y-6">
          {/* Bills Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
              <div className="text-center">
                <p className="text-emerald-600 font-medium">Total Bills Due</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {formatCurrency(bills.reduce((sum, bill) => sum + bill.amount, 0))}
                </p>
                <p className="text-sm text-gray-600 mt-2">{bills.length} bills pending</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-100/50 rounded-2xl p-6 border border-teal-100 shadow-lg">
              <div className="text-center">
                <p className="text-teal-600 font-medium">Overdue Bills</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {formatCurrency(bills.filter(b => b.status === 'overdue').reduce((sum, bill) => sum + bill.amount, 0))}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {bills.filter(b => b.status === 'overdue').length} bills overdue
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-2xl p-6 border border-purple-100 shadow-lg">
              <div className="text-center">
                <p className="text-purple-600 font-medium">Next Payment</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {formatCurrency(bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.amount || 0)}
                </p>
                <p className="text-sm text-gray-600 mt-2">Due {bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.dueDate}</p>
              </div>
            </div>
          </div>

          {/* Bills List */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Bills</h2>
              <div className="space-y-4">
                {bills.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gray-100">
                        <Building className="text-emerald-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{bill.vendor}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">Due: {bill.dueDate}</span>
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                            {bill.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-800">
                          {formatCurrency(bill.amount)}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bill.status)}`}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-colors">
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Income Statement',
              description: 'Revenue, expenses, and profit/loss report',
              icon: FileText,
              period: 'Monthly',
              lastUpdated: '2024-01-15'
            },
            {
              title: 'Balance Sheet',
              description: 'Assets, liabilities, and equity snapshot',
              icon: PieChart,
              period: 'Quarterly',
              lastUpdated: '2023-12-31'
            },
            {
              title: 'Cash Flow Statement',
              description: 'Operating, investing, and financing activities',
              icon: LineChart,
              period: 'Monthly',
              lastUpdated: '2024-01-15'
            },
            {
              title: 'Accounts Receivable',
              description: 'Outstanding customer invoices and aging',
              icon: Users,
              period: 'Weekly',
              lastUpdated: '2024-01-14'
            },
            {
              title: 'Accounts Payable',
              description: 'Outstanding vendor bills and payments',
              icon: Building,
              period: 'Weekly',
              lastUpdated: '2024-01-14'
            },
            {
              title: 'Tax Report',
              description: 'Tax liabilities and compliance report',
              icon: Shield,
              period: 'Quarterly',
              lastUpdated: '2023-12-31'
            }
          ].map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                      <Icon className="text-emerald-600" size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {report.period}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Updated: {report.lastUpdated}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Eye size={18} className="text-emerald-600" />
                      </button>
                      <button className="p-2 hover:bg-teal-50 rounded-lg transition-colors">
                        <Download size={18} className="text-teal-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FinancePage;
