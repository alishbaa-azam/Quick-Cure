
//.................................
import React, { useState, useEffect } from 'react';
import {
  FileText, Download, Printer, Filter,
  Calendar, Search, BarChart3, PieChart,
  TrendingUp, Users, Package,
  DollarSign, Clock, CheckCircle, XCircle,
  Eye, Share2, RefreshCw, Plus,
  Shield, Truck, CreditCard, ShoppingCart,
  ChevronDown, MoreVertical, ArrowDownToLine,
  Trash2
} from 'lucide-react';
import { message } from 'antd';
// ✅ FIXED: Import only pharmacyAPI (dashboardAPI, ordersAPI, medicinesAPI remove kar diye)
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { Link } from 'react-router-dom';

const ReportsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [generatingReport, setGeneratingReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const categories = [
    { id: 'all', name: 'All Reports', icon: FileText },
    { id: 'sales', name: 'Sales', icon: DollarSign },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'revenue', name: 'Revenue', icon: TrendingUp }
  ];

  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  // Get pharmacy ID from localStorage
  useEffect(() => {
    const storedPharmacyId = localStorage.getItem('pharmacyId');
    if (storedPharmacyId) {
      setPharmacyId(storedPharmacyId);
      fetchDashboardData(storedPharmacyId);
    } else {
      message.error('Pharmacy ID not found. Please login again.');
      setLoading(false);
    }
  }, []);

  // Fetch real data from API
  const fetchDashboardData = async (id) => {
    try {
      setLoading(true);
      
      // Parallel data fetching - REAL API CALLS
      const [statsRes, ordersRes, medicinesRes] = await Promise.allSettled([
        pharmacyAPI.getStats(id),
        pharmacyAPI.getOrders(id),
        pharmacyAPI.getInventory(id)
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value?.data?.success) {
        setStats(statsRes.value.data.data);
      }

      if (ordersRes.status === 'fulfilled' && ordersRes.value?.data?.success) {
        setOrders(ordersRes.value.data.data || []);
      }

      if (medicinesRes.status === 'fulfilled' && medicinesRes.value?.data?.success) {
        setMedicines(medicinesRes.value.data.data || []);
      }

      // Load saved reports from localStorage (user-generated reports)
      const savedReports = localStorage.getItem(`pharmacyReports_${id}`);
      if (savedReports) {
        setReports(JSON.parse(savedReports));
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load data for reports');
    } finally {
      setLoading(false);
    }
  };

  // Generate Sales Report - using REAL DATA
  const generateSalesReport = async () => {
    try {
      setGeneratingReport('sales');
      
      if (!stats || !orders) {
        message.error('Sales data not available');
        return;
      }

      // Calculate real sales data
      const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const totalOrders = orders.length;
      
      // Calculate top products from real orders
      const productMap = {};
      orders.forEach(order => {
        order.products?.forEach(product => {
          if (!productMap[product.name]) {
            productMap[product.name] = { name: product.name, sales: 0, quantity: 0 };
          }
          productMap[product.name].sales += product.total || 0;
          productMap[product.name].quantity += product.quantity || 0;
        });
      });

      const topProducts = Object.values(productMap)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

      // Create report with REAL data
      const report = {
        id: Date.now(),
        title: 'Sales Performance Report',
        description: `Sales analysis for ${dateRanges.find(d => d.id === dateRange)?.label || 'selected period'}`,
        category: 'sales',
        type: 'pdf',
        generatedAt: new Date().toISOString(),
        size: '1.2 MB',
        data: {
          totalSales,
          totalOrders,
          averageOrderValue: totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : 0,
          topProducts
        }
      };
      
      const updatedReports = [report, ...reports];
      setReports(updatedReports);
      localStorage.setItem(`pharmacyReports_${pharmacyId}`, JSON.stringify(updatedReports));
      
      message.success('Sales report generated successfully');
    } catch (error) {
      console.error('Error generating sales report:', error);
      message.error('Failed to generate sales report');
    } finally {
      setTimeout(() => setGeneratingReport(null), 1000);
    }
  };

  // Generate Inventory Report - using REAL DATA
  const generateInventoryReport = async () => {
    try {
      setGeneratingReport('inventory');
      
      if (!medicines || medicines.length === 0) {
        message.error('Inventory data not available');
        return;
      }

      // Calculate real inventory stats
      const totalProducts = medicines.length;
      const totalValue = medicines.reduce((sum, med) => sum + ((med.price || 0) * (med.stock || 0)), 0);
      
      const lowStock = medicines.filter(m => (m.stock || 0) <= (m.reorderLevel || 10)).length;
      const outOfStock = medicines.filter(m => (m.stock || 0) === 0).length;
      
      // Calculate category distribution
      const categoryMap = {};
      medicines.forEach(med => {
        const cat = med.category || 'Other';
        if (!categoryMap[cat]) {
          categoryMap[cat] = { count: 0, value: 0 };
        }
        categoryMap[cat].count += 1;
        categoryMap[cat].value += (med.price || 0) * (med.stock || 0);
      });

      const categories = Object.entries(categoryMap).map(([name, data]) => ({
        name,
        count: data.count,
        value: data.value
      }));

      const report = {
        id: Date.now() + 1,
        title: 'Inventory Analysis Report',
        description: 'Current stock levels and inventory status',
        category: 'inventory',
        type: 'excel',
        generatedAt: new Date().toISOString(),
        size: '0.8 MB',
        data: {
          totalProducts,
          totalValue,
          lowStock,
          outOfStock,
          categories
        }
      };
      
      const updatedReports = [report, ...reports];
      setReports(updatedReports);
      localStorage.setItem(`pharmacyReports_${pharmacyId}`, JSON.stringify(updatedReports));
      
      message.success('Inventory report generated successfully');
    } catch (error) {
      console.error('Error generating inventory report:', error);
      message.error('Failed to generate inventory report');
    } finally {
      setTimeout(() => setGeneratingReport(null), 1000);
    }
  };

  // Generate Orders Report - using REAL DATA
  const generateOrdersReport = async () => {
    try {
      setGeneratingReport('orders');
      
      if (!orders || orders.length === 0) {
        message.error('Orders data not available');
        return;
      }

      const pending = orders.filter(o => o.status === 'pending').length;
      const processing = orders.filter(o => o.status === 'processing').length;
      const delivered = orders.filter(o => o.status === 'delivered').length;
      const cancelled = orders.filter(o => o.status === 'cancelled').length;

      // Monthly orders data
      const monthlyMap = {};
      orders.forEach(order => {
        const date = new Date(order.createdAt || order.date);
        const month = date.toLocaleString('default', { month: 'short' });
        if (!monthlyMap[month]) {
          monthlyMap[month] = 0;
        }
        monthlyMap[month] += 1;
      });

      const monthlyOrders = Object.entries(monthlyMap).map(([month, count]) => ({
        month,
        orders: count
      }));

      const report = {
        id: Date.now() + 2,
        title: 'Orders Summary Report',
        description: 'Orders status and performance metrics',
        category: 'orders',
        type: 'pdf',
        generatedAt: new Date().toISOString(),
        size: '1.5 MB',
        data: {
          totalOrders: orders.length,
          pending,
          processing,
          delivered,
          cancelled,
          monthlyOrders
        }
      };
      
      const updatedReports = [report, ...reports];
      setReports(updatedReports);
      localStorage.setItem(`pharmacyReports_${pharmacyId}`, JSON.stringify(updatedReports));
      
      message.success('Orders report generated successfully');
    } catch (error) {
      console.error('Error generating orders report:', error);
      message.error('Failed to generate orders report');
    } finally {
      setTimeout(() => setGeneratingReport(null), 1000);
    }
  };

  // Generate Revenue Report - using REAL DATA
  const generateRevenueReport = async () => {
    try {
      setGeneratingReport('revenue');
      
      if (!orders || orders.length === 0) {
        message.error('Revenue data not available');
        return;
      }

      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      
      // Monthly revenue data
      const monthlyMap = {};
      orders.forEach(order => {
        const date = new Date(order.createdAt || order.date);
        const month = date.toLocaleString('default', { month: 'short' });
        if (!monthlyMap[month]) {
          monthlyMap[month] = 0;
        }
        monthlyMap[month] += order.total || 0;
      });

      const monthlyRevenue = Object.entries(monthlyMap).map(([month, revenue]) => ({
        month,
        revenue,
        profit: revenue * 0.4 // Assuming 40% profit margin
      }));

      // Revenue by category (from medicines)
      const categoryRevenue = {};
      medicines.forEach(med => {
        const cat = med.category || 'Other';
        if (!categoryRevenue[cat]) {
          categoryRevenue[cat] = 0;
        }
        categoryRevenue[cat] += (med.price || 0) * (med.stock || 0);
      });

      const revenueByCategory = Object.entries(categoryRevenue).map(([category, revenue]) => ({
        category,
        revenue,
        percentage: Math.round((revenue / totalRevenue) * 100) || 0
      }));

      const report = {
        id: Date.now() + 3,
        title: 'Revenue Analytics Report',
        description: 'Revenue trends and financial performance',
        category: 'revenue',
        type: 'pdf',
        generatedAt: new Date().toISOString(),
        size: '1.1 MB',
        data: {
          totalRevenue,
          monthlyRevenue,
          revenueByCategory
        }
      };
      
      const updatedReports = [report, ...reports];
      setReports(updatedReports);
      localStorage.setItem(`pharmacyReports_${pharmacyId}`, JSON.stringify(updatedReports));
      
      message.success('Revenue report generated successfully');
    } catch (error) {
      console.error('Error generating revenue report:', error);
      message.error('Failed to generate revenue report');
    } finally {
      setTimeout(() => setGeneratingReport(null), 1000);
    }
  };

  const handleDownloadReport = (report) => {
    // Create a download with the REAL data
    const blob = new Blob([JSON.stringify(report.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    message.success('Report download started');
  };

  const handlePrintReport = (report) => {
    const printWindow = window.open('', '_blank');
    const reportData = report.data;
    
    let htmlContent = `
      <html>
        <head>
          <title>${report.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { color: #666; margin-bottom: 20px; }
            .content { margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
            .stat-card { background: #f8f9fa; padding: 15px; border-radius: 8px; }
            .stat-value { font-size: 24px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${report.title}</div>
            <div class="subtitle">${report.description}</div>
            <div>Generated on: ${new Date(report.generatedAt).toLocaleDateString()}</div>
          </div>
          <div class="content">
            <pre>${JSON.stringify(reportData, null, 2)}</pre>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleDeleteReport = (reportId) => {
    const updatedReports = reports.filter(report => report.id !== reportId);
    setReports(updatedReports);
    localStorage.setItem(`pharmacyReports_${pharmacyId}`, JSON.stringify(updatedReports));
    message.success('Report deleted successfully');
  };

  const filteredReports = activeCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === activeCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'sales': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inventory': return 'bg-green-100 text-green-800 border-green-200';
      case 'orders': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'revenue': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'pdf': return FileText;
      case 'excel': return ArrowDownToLine;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'pdf': return 'text-red-500';
      case 'excel': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and download pharmacy reports</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link
            to="/PharmacyDashboard/products"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Package size={18} />
            <span>View Products</span>
          </Link>
          <Link
            to="/PharmacyDashboard/orders"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <ShoppingCart size={18} />
            <span>View Orders</span>
          </Link>
        </div>
      </div>

      {/* Quick Generate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button
          onClick={generateSalesReport}
          disabled={generatingReport === 'sales'}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sales Report</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {generatingReport === 'sales' ? 'Generating...' : 'Generate'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </button>

        <button
          onClick={generateInventoryReport}
          disabled={generatingReport === 'inventory'}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Report</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {generatingReport === 'inventory' ? 'Generating...' : 'Generate'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <Package className="text-green-600" size={24} />
            </div>
          </div>
        </button>

        <button
          onClick={generateOrdersReport}
          disabled={generatingReport === 'orders'}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders Report</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {generatingReport === 'orders' ? 'Generating...' : 'Generate'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <ShoppingCart className="text-purple-600" size={24} />
            </div>
          </div>
        </button>

        <button
          onClick={generateRevenueReport}
          disabled={generatingReport === 'revenue'}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Report</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {generatingReport === 'revenue' ? 'Generating...' : 'Generate'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
          </div>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-[#2c6774] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
          <div className="md:ml-auto flex gap-2">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
            >
              {dateRanges.map(range => (
                <option key={range.id} value={range.id}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Generated Reports</h2>
              <p className="text-sm text-gray-600">All your generated reports</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">
                {reports.length} report{reports.length !== 1 ? 's' : ''} generated
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading reports...</p>
              </div>
            </div>
          ) : filteredReports.length > 0 ? (
            filteredReports.map((report) => {
              const TypeIcon = getTypeIcon(report.type);
              return (
                <div key={report.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(report.category)}`}>
                          {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{report.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(report.generatedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <TypeIcon size={14} className={getTypeColor(report.type)} />
                          {report.type.toUpperCase()} • {report.size}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadReport(report)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors text-sm font-medium"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => handlePrintReport(report)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        <Printer size={16} />
                        <span>Print</span>
                      </button>
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Report"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <FileText className="text-gray-300 mx-auto mb-3" size={48} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No reports generated yet</h3>
              <p className="text-gray-600 mb-4">Generate your first report using the buttons above</p>
              <button
                onClick={generateSalesReport}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors font-medium"
              >
                <Plus size={20} />
                <span>Generate Sales Report</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;