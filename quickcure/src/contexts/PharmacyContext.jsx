// src/contexts/PharmacyContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { pharmacyAPI } from '../services/pharmacyAPI';
import { message } from 'antd';

const PharmacyContext = createContext();

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacy must be used within PharmacyProvider');
  }
  return context;
};

export const PharmacyProvider = ({ children }) => {
  const [pharmacyId, setPharmacyId] = useState(null);
  const [pharmacy, setPharmacy] = useState(null);
  const [stats, setStats] = useState({
    totalMedicines: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    lowStockCount: 0,
    totalOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0
  });
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderStatusDistribution, setOrderStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize pharmacy ID from localStorage
  useEffect(() => {
    const storedPharmacyId = localStorage.getItem('pharmacyId');
    if (storedPharmacyId) {
      setPharmacyId(storedPharmacyId);
    }
  }, []);

  // Transform orders with proper tablet calculations
  const transformOrders = (ordersData) => {
    return ordersData.map(order => {
      // Get products with proper tablet calculation
      const products = (order.products || order.cart || order.medicines || order.items || []).map(item => {
        // Check if item is tablet/capsule
        const isTablet = item.form?.toLowerCase().includes('tablet') || 
                        item.form?.toLowerCase().includes('capsule') ||
                        item.isTablet ||
                        item.type?.toLowerCase().includes('tablet');
        
        // Get tablets per unit from product table or default
        const tabletsPerUnit = item.tabletsPerUnit || item.packSize || 10;
        
        // Calculate tablet quantity
        const tabletQuantity = isTablet ? (item.quantity * tabletsPerUnit) : 0;
        
        // Calculate total price
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const total = item.total || item.itemTotal || (price * quantity);
        
        return {
          id: item._id || item.id || item.medicineId,
          medicineId: item.medicineId || item._id || item.id,
          name: item.name || 'Medicine',
          quantity: quantity,
          price: price,
          total: total,
          form: item.form || 'tablet',
          isTablet: isTablet,
          tabletQuantity: tabletQuantity,
          tabletsPerUnit: tabletsPerUnit,
          unit: item.unit || (isTablet ? 'strip' : 'unit')
        };
      });
      
      // Calculate totals
      const orderTotal = products.reduce((sum, p) => sum + (p.total || 0), 0);
      const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
      const totalTablets = products.reduce((sum, p) => sum + (p.tabletQuantity || 0), 0);
      
      // Map status
      let mappedStatus = (order.status || 'pending').toLowerCase();
      if (mappedStatus === 'shipped') mappedStatus = 'delivered';
      
      // Format date
      const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();
      const formattedDate = orderDate.toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const dayName = orderDate.toLocaleDateString('en-PK', { weekday: 'short' });
      
      return {
        ...order,
        id: order._id || order.id,
        _id: order._id || order.id,
        orderNumber: order.orderNumber || order.orderId || `ORD-${(order._id || '').slice(-6)}`,
        products: products,
        total: orderTotal,
        subtotal: order.subtotal || orderTotal,
        deliveryFee: order.deliveryFee || order.deliveryCharge || 0,
        totalItems: totalItems,
        totalTablets: totalTablets,
        status: mappedStatus,
        date: formattedDate,
        day: dayName,
        fullDate: `${dayName}, ${formattedDate}`,
        customer: {
          name: order.customer?.name || order.patientInfo?.name || order.patient?.name || 'Customer',
          email: order.customer?.email || order.patientInfo?.email || '',
          phone: order.customer?.phone || order.patientInfo?.phone || order.patient?.phone || 'N/A',
          address: order.deliveryAddress || order.customer?.address || order.patientInfo?.address || 'N/A'
        },
        deliveryAddress: order.deliveryAddress || order.customer?.address || order.patientInfo?.address || 'N/A',
        paymentMethod: order.paymentMethod || 'cod',
        paymentStatus: order.paymentStatus || 'pending',
        notes: order.notes || '',
        createdAt: order.createdAt
      };
    });
  };

  // Calculate order status distribution
  const calculateOrderStatusDistribution = (ordersList) => {
    const statusCounts = {
      pending: 0,
      processing: 0,
      delivered: 0,
      cancelled: 0
    };
    
    ordersList.forEach(order => {
      if (statusCounts.hasOwnProperty(order.status)) {
        statusCounts[order.status]++;
      }
    });
    
    return Object.entries(statusCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: value
    }));
  };

  // Fetch all dashboard data
  const fetchAllData = useCallback(async () => {
    if (!pharmacyId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch pharmacy details first
      const pharmacyRes = await pharmacyAPI.getMyPharmacy();
      if (pharmacyRes.success) {
        setPharmacy(pharmacyRes.data);
        localStorage.setItem('pharmacyId', pharmacyRes.data._id);
        setPharmacyId(pharmacyRes.data._id);
      }

      // Parallel fetch all data
      const [statsRes, ordersRes, inventoryRes, categoriesRes] = await Promise.allSettled([
        pharmacyAPI.getStats(pharmacyId),
        pharmacyAPI.getOrders(pharmacyId),
        pharmacyAPI.getInventory(pharmacyId),
        pharmacyAPI.getCategoryDistribution(pharmacyId)
      ]);

      // Process stats
      if (statsRes.status === 'fulfilled' && statsRes.value?.data?.success) {
        const statsData = statsRes.value.data.data;
        setStats({
          totalMedicines: statsData?.totalMedicines || 0,
          pendingOrders: statsData?.pendingOrders || 0,
          todayRevenue: statsData?.todayRevenue || 0,
          lowStockCount: statsData?.lowStockCount || 0,
          totalOrders: statsData?.totalOrders || 0,
          deliveredOrders: statsData?.deliveredOrders || 0,
          totalRevenue: statsData?.totalRevenue || 0
        });
      }

      // Process orders
      if (ordersRes.status === 'fulfilled' && ordersRes.value?.data?.success) {
        const ordersData = ordersRes.value.data.data || [];
        const transformedOrders = transformOrders(ordersData);
        setOrders(transformedOrders);
        setOrderStatusDistribution(calculateOrderStatusDistribution(transformedOrders));
      } else {
        setOrders([]);
        setOrderStatusDistribution([]);
      }

      // Process inventory
      if (inventoryRes.status === 'fulfilled' && inventoryRes.value?.data?.success) {
        const inventoryData = inventoryRes.value.data.data || [];
        
        // Transform inventory with proper tablet calculation
        const transformedInventory = inventoryData.map(item => {
          const isTablet = item.form?.toLowerCase().includes('tablet') || 
                          item.form?.toLowerCase().includes('capsule') ||
                          item.type?.toLowerCase().includes('tablet');
          
          const tabletsPerUnit = item.tabletsPerUnit || item.packSize || 10;
          const stockQuantity = Number(item.stock) || 0;
          const pricePerUnit = Number(item.price) || 0;
          
          return {
            ...item,
            isTablet: isTablet,
            tabletsPerUnit: tabletsPerUnit,
            totalTablets: isTablet ? (stockQuantity * tabletsPerUnit) : 0,
            pricePerTablet: isTablet ? (pricePerUnit / tabletsPerUnit) : pricePerUnit,
            displayUnit: isTablet ? 'strip' : item.unit || 'unit'
          };
        });
        
        setInventory(transformedInventory);
      }

      // Process categories
      if (categoriesRes.status === 'fulfilled' && categoriesRes.value?.data?.success) {
        setCategories(categoriesRes.value.data.data || []);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [pharmacyId]);

  // Fetch sales data separately (can be called with different time ranges)
  const fetchSalesData = useCallback(async (period = 'week') => {
    if (!pharmacyId) return [];
    
    try {
      const response = await pharmacyAPI.getSalesData(pharmacyId, period);
      if (response.data?.success) {
        return response.data.data || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching sales data:', error);
      return [];
    }
  }, [pharmacyId]);

  // Refresh orders
  const refreshOrders = useCallback(async () => {
    if (!pharmacyId) return;
    try {
      const response = await pharmacyAPI.getOrders(pharmacyId);
      if (response.data?.success) {
        const ordersData = response.data.data || [];
        const transformedOrders = transformOrders(ordersData);
        setOrders(transformedOrders);
        setOrderStatusDistribution(calculateOrderStatusDistribution(transformedOrders));
      }
    } catch (error) {
      console.error('Error refreshing orders:', error);
    }
  }, [pharmacyId]);

  // Refresh stats
  const refreshStats = useCallback(async () => {
    if (!pharmacyId) return;
    try {
      const response = await pharmacyAPI.getStats(pharmacyId);
      if (response.data?.success) {
        const statsData = response.data.data;
        setStats({
          totalMedicines: statsData?.totalMedicines || 0,
          pendingOrders: statsData?.pendingOrders || 0,
          todayRevenue: statsData?.todayRevenue || 0,
          lowStockCount: statsData?.lowStockCount || 0,
          totalOrders: statsData?.totalOrders || 0,
          deliveredOrders: statsData?.deliveredOrders || 0,
          totalRevenue: statsData?.totalRevenue || 0
        });
      }
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  }, [pharmacyId]);

  // Update order status
  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    if (!pharmacyId) {
      message.error('Pharmacy ID not found');
      return false;
    }
    
    try {
      const response = await pharmacyAPI.updateOrderStatus(pharmacyId, orderId, newStatus);
      if (response.data?.success) {
        message.success(`Order status updated to ${newStatus}`);
        await refreshOrders();
        await refreshStats();
        return true;
      } else {
        message.error(response.data?.message || 'Failed to update order status');
        return false;
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error('Failed to update order status');
      return false;
    }
  }, [pharmacyId, refreshOrders, refreshStats]);

  // Initial data fetch
  useEffect(() => {
    if (pharmacyId) {
      fetchAllData();
    }
  }, [pharmacyId, fetchAllData]);

  const value = {
    pharmacyId,
    pharmacy,
    stats,
    orders,
    inventory,
    categories,
    orderStatusDistribution,
    loading,
    error,
    fetchAllData,
    fetchSalesData,
    refreshOrders,
    refreshStats,
    updateOrderStatus,
    setPharmacyId
  };

  return (
    <PharmacyContext.Provider value={value}>
      {children}
    </PharmacyContext.Provider>
  );
};