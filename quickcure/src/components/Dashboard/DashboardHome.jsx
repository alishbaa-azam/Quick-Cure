// components/Dashboard/DashboardHome.jsx
// import React, { useState } from 'react';
// import { 
//   Calendar, DollarSign, Filter, Plus, 
//   TrendingDown, TrendingUp, Users 
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const DashboardHome = () => {
//   const [medicines, setMedicines] = useState([
//     { id: 1, name: 'Paracetamol', category: 'Pain Relief', stock: 150, price: 5.99, status: 'In Stock' },
//     { id: 2, name: 'Amoxicillin', category: 'Antibiotic', stock: 45, price: 12.50, status: 'In Stock' },
//     { id: 3, name: 'Aspirin', category: 'Pain Relief', stock: 0, price: 8.75, status: 'Out of Stock' },
//     { id: 4, name: 'Cetirizine', category: 'Allergy', stock: 89, price: 6.25, status: 'In Stock' },
//     { id: 5, name: 'Omeprazole', category: 'Digestive', stock: 32, price: 15.99, status: 'Low Stock' },
//   ]);
  
//   const [orders, setOrders] = useState([
//     { id: 1001, customer: 'John Smith', product: 'Paracetamol', invoiceId: 'INV-001', unit: 'Tablet', quantity: 2, total: 11.98, status: 'Completed' },
//     { id: 1002, customer: 'Emma Wilson', product: 'Amoxicillin', invoiceId: 'INV-002', unit: 'Capsule', quantity: 1, total: 12.50, status: 'Pending' },
//     { id: 1003, customer: 'Robert Brown', product: 'Cetirizine', invoiceId: 'INV-003', unit: 'Tablet', quantity: 3, total: 18.75, status: 'Processing' },
//     { id: 1004, customer: 'Sarah Davis', product: 'Omeprazole', invoiceId: 'INV-004', unit: 'Capsule', quantity: 1, total: 15.99, status: 'Completed' },
//     { id: 1005, customer: 'Michael Lee', product: 'Aspirin', invoiceId: 'INV-005', unit: 'Tablet', quantity: 2, total: 17.50, status: 'Cancelled' },
//   ]);

//   const handleAddMedicine = () => {
//     const name = prompt('Enter medicine name:');
//     const category = prompt('Enter category:');
//     const stock = parseInt(prompt('Enter stock quantity:'));
//     const price = parseFloat(prompt('Enter price:'));
    
//     if (name && category && stock && price) {
//       const newMedicine = {
//         id: medicines.length + 1,
//         name,
//         category,
//         stock,
//         price,
//         status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
//       };
//       setMedicines([...medicines, newMedicine]);
//     }
//   };

//   const handleRemoveMedicine = (id) => {
//     if (window.confirm('Are you sure you want to remove this medicine?')) {
//       setMedicines(medicines.filter(medicine => medicine.id !== id));
//     }
//   };

//   const handleUpdateMedicine = (id) => {
//     const medicine = medicines.find(m => m.id === id);
//     const stock = parseInt(prompt('Enter new stock quantity:', medicine.stock));
//     const price = parseFloat(prompt('Enter new price:', medicine.price));
    
//     if (stock !== null && price !== null) {
//       const updatedMedicines = medicines.map(m => 
//         m.id === id ? {
//           ...m,
//           stock,
//           price,
//           status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
//         } : m
//       );
//       setMedicines(updatedMedicines);
//     }
//   };

//   const handleUpdateOrderStatus = (id, status) => {
//     const updatedOrders = orders.map(order => 
//       order.id === id ? { ...order, status } : order
//     );
//     setOrders(updatedOrders);
//   };

//   const statusColors = {
//     'Completed': 'bg-green-100 text-green-800',
//     'Pending': 'bg-blue-100 text-blue-800',
//     'Processing': 'bg-amber-100 text-amber-800',
//     'Cancelled': 'bg-red-100 text-red-800',
//   };

//   const stockColors = {
//     'In Stock': 'bg-green-100 text-green-800',
//     'Low Stock': 'bg-amber-100 text-amber-800',
//     'Out of Stock': 'bg-red-100 text-red-800',
//   };

//   return (
//     <>
//       {/* Top Stats Cards - Keep as is */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* ... Same stats cards from your original code ... */}
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         {/* ... Same charts from your original code ... */}
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-100 shadow-lg">
//           <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
//           <div className="space-y-3">
//             <Link 
//               to="/PharmacyDashboard/products"
//               className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors"
//             >
//               <span className="font-medium">Add New Medicine</span>
//               <Plus size={18} className="text-blue-500" />
//             </Link>
//             <Link 
//               to="/PharmacyDashboard/orders"
//               className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors"
//             >
//               <span className="font-medium">Process Orders</span>
//               <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//             </Link>
//             <Link 
//               to="/PharmacyDashboard/reports"
//               className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors"
//             >
//               <span className="font-medium">View Reports</span>
//               <BarChart3 size={18} className="text-green-500" />
//             </Link>
//           </div>
//         </div>

//         {/* Medicines Management - Simplified */}
//         <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-gray-800">Manage Medicines</h2>
//             <div className="flex space-x-2">
//               <Link 
//                 to="/PharmacyDashboard/products"
//                 className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 <span>View All</span>
//               </Link>
//               <button
//                 onClick={handleAddMedicine}
//                 className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90"
//               >
//                 <Plus size={20} />
//                 <span>Add Medicine</span>
//               </button>
//             </div>
//           </div>
//           <div className="space-y-4">
//             {medicines.slice(0, 5).map((medicine) => (
//               <div key={medicine.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
//                     <span className="text-white font-bold">{medicine.name.charAt(0)}</span>
//                   </div>
//                   <div>
//                     <h4 className="font-medium">{medicine.name}</h4>
//                     <p className="text-sm text-gray-600">{medicine.category}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-6">
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockColors[medicine.status]}`}>
//                     {medicine.status}
//                   </span>
//                   <span className="font-semibold">${medicine.price.toFixed(2)}</span>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleUpdateMedicine(medicine.id)}
//                       className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleRemoveMedicine(medicine.id)}
//                       className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
//           <div className="flex space-x-2">
//             <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
//               <Filter size={18} />
//               <span>Filter</span>
//             </button>
//             <Link 
//               to="/PharmacyDashboard/orders"
//               className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:opacity-90"
//             >
//               View All Orders
//             </Link>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             {/* ... Same orders table from your original code (simplified) ... */}
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardHome; 
















// components/Dashboard/DashboardHome.jsx ------ pretty colors
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, Calendar, DollarSign, Filter, Plus, 
  TrendingDown, TrendingUp, Users,
  ShoppingCart, Package, CheckCircle, Circle,
  Clock, FileText, Home, Menu, Settings,
  ShoppingBag, X, Building, AlertCircle
} from 'lucide-react';

const DashboardHome = () => {
  const [pharmacyOpen, setPharmacyOpen] = useState(true);
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol', category: 'Pain Relief', stock: 150, price: 5.99, status: 'In Stock' },
    { id: 2, name: 'Amoxicillin', category: 'Antibiotic', stock: 45, price: 12.50, status: 'In Stock' },
    { id: 3, name: 'Aspirin', category: 'Pain Relief', stock: 0, price: 8.75, status: 'Out of Stock' },
    { id: 4, name: 'Cetirizine', category: 'Allergy', stock: 89, price: 6.25, status: 'In Stock' },
    { id: 5, name: 'Omeprazole', category: 'Digestive', stock: 32, price: 15.99, status: 'Low Stock' },
  ]);
  
  const [orders, setOrders] = useState([
    { id: 1001, customer: 'John Smith', product: 'Paracetamol', invoiceId: 'INV-001', unit: 'Tablet', quantity: 2, total: 11.98, status: 'Completed' },
    { id: 1002, customer: 'Emma Wilson', product: 'Amoxicillin', invoiceId: 'INV-002', unit: 'Capsule', quantity: 1, total: 12.50, status: 'Pending' },
    { id: 1003, customer: 'Robert Brown', product: 'Cetirizine', invoiceId: 'INV-003', unit: 'Tablet', quantity: 3, total: 18.75, status: 'Processing' },
    { id: 1004, customer: 'Sarah Davis', product: 'Omeprazole', invoiceId: 'INV-004', unit: 'Capsule', quantity: 1, total: 15.99, status: 'Completed' },
    { id: 1005, customer: 'Michael Lee', product: 'Aspirin', invoiceId: 'INV-005', unit: 'Tablet', quantity: 2, total: 17.50, status: 'Cancelled' },
  ]);

  const [pharmacyInfo, setPharmacyInfo] = useState({
    name: 'MediCare Pharmacy',
    address: '123 Health St, Medical City',
    phone: '(555) 123-4567',
    email: 'contact@medicarepharmacy.com',
    hours: '8:00 AM - 10:00 PM',
  });

  const togglePharmacyStatus = () => setPharmacyOpen(!pharmacyOpen);

  const handleEditPharmacy = () => {
    const newName = prompt('Enter pharmacy name:', pharmacyInfo.name);
    const newAddress = prompt('Enter pharmacy address:', pharmacyInfo.address);
    const newPhone = prompt('Enter pharmacy phone:', pharmacyInfo.phone);
    
    if (newName && newAddress && newPhone) {
      setPharmacyInfo({
        ...pharmacyInfo,
        name: newName,
        address: newAddress,
        phone: newPhone,
      });
    }
  };

  const handleAddMedicine = () => {
    const name = prompt('Enter medicine name:');
    const category = prompt('Enter category:');
    const stock = parseInt(prompt('Enter stock quantity:'));
    const price = parseFloat(prompt('Enter price:'));
    
    if (name && category && stock && price) {
      const newMedicine = {
        id: medicines.length + 1,
        name,
        category,
        stock,
        price,
        status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
      };
      setMedicines([...medicines, newMedicine]);
    }
  };

  const handleRemoveMedicine = (id) => {
    if (window.confirm('Are you sure you want to remove this medicine?')) {
      setMedicines(medicines.filter(medicine => medicine.id !== id));
    }
  };

  const handleUpdateMedicine = (id) => {
    const medicine = medicines.find(m => m.id === id);
    const stock = parseInt(prompt('Enter new stock quantity:', medicine.stock));
    const price = parseFloat(prompt('Enter new price:', medicine.price));
    
    if (stock !== null && price !== null) {
      const updatedMedicines = medicines.map(m => 
        m.id === id ? {
          ...m,
          stock,
          price,
          status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
        } : m
      );
      setMedicines(updatedMedicines);
    }
  };

  const handleUpdateOrderStatus = (id, status) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  const statusColors = {
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-blue-100 text-blue-800',
    'Processing': 'bg-amber-100 text-amber-800',
    'Cancelled': 'bg-red-100 text-red-800',
  };

  const stockColors = {
    'In Stock': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-amber-100 text-amber-800',
    'Out of Stock': 'bg-red-100 text-red-800',
  };

  return (
    <>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-emerald-600 font-medium">Today's Sales</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">$95.00</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-500/10">
              <DollarSign className="text-emerald-600" size={24} />
            </div>
          </div>
          <div className="flex space-x-1 mt-4">
            {[40, 60, 80, 45, 70, 90, 65].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-lg"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-cyan-100/50 rounded-2xl p-6 border border-teal-100 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-teal-600 font-medium">Growth Rate</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">1.457%</p>
            </div>
            <div className="p-3 rounded-full bg-teal-500/10">
              <TrendingUp className="text-teal-600" size={24} />
            </div>
          </div>
          <div className="flex space-x-1 mt-4">
            {[30, 50, 40, 70, 60, 80, 90].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-teal-500 to-cyan-300 rounded-t-lg"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-100/50 rounded-2xl p-6 border border-pink-100 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-rose-600 font-medium">Returns</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">0.00%</p>
            </div>
            <div className="p-3 rounded-full bg-rose-500/10">
              <TrendingDown className="text-rose-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-2xl p-6 border border-purple-100 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-purple-600 font-medium">Customers</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">265K</p>
            </div>
            <div className="p-3 rounded-full bg-purple-500/10">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="flex space-x-1 mt-4">
            {[60, 75, 45, 90, 65, 80, 55].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-purple-500 to-violet-300 rounded-t-lg"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Total Sales Overview</h2>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
              <Calendar size={18} />
              <span>This Week</span>
            </button>
          </div>
          <div className="h-64 flex items-end space-x-4 justify-center">
            {[
              { day: 'Mon', value: 150, color: 'from-emerald-400 to-teal-400' },
              { day: 'Tue', value: 220, color: 'from-teal-400 to-cyan-400' },
              { day: 'Wed', value: 180, color: 'from-amber-400 to-orange-400' },
              { day: 'Thu', value: 298, color: 'from-purple-400 to-violet-400' },
              { day: 'Fri', value: 240, color: 'from-pink-400 to-rose-400' },
              { day: 'Sat', value: 320, color: 'from-blue-400 to-indigo-400' },
              { day: 'Sun', value: 280, color: 'from-green-400 to-emerald-400' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative">
                  <div className={`h-${item.value/10} w-12 bg-gradient-to-t ${item.color} rounded-t-lg mb-2`}></div>
                  {item.value === 298 && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg">
                      ${item.value}K
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-600">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Sales Distribution</h2>
          <div className="relative flex justify-center items-center h-48">
            <div className="relative w-40 h-40">
              {[
                { percent: 40, color: 'from-emerald-400 to-teal-400' },
                { percent: 25, color: 'from-teal-400 to-cyan-400' },
                { percent: 20, color: 'from-purple-400 to-violet-400' },
                { percent: 15, color: 'from-pink-400 to-rose-400' },
              ].map((slice, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-8 border-transparent"
                  style={{
                    clipPath: `conic-gradient(from ${i * 90}deg, transparent ${slice.percent}%, #0000 0)`,
                    background: `conic-gradient(from ${i * 90}deg, var(--tw-gradient-stops) ${slice.percent}%, #0000 0)`,
                  }}
                >
                  <div className={`bg-gradient-to-r ${slice.color}`}></div>
                </div>
              ))}
            </div>
            <div className="absolute text-center">
              <p className="text-2xl font-bold text-gray-800">755K</p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medicines Management */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Manage Medicines</h2>
          <div className="flex space-x-2">
            <Link 
              to="/PharmacyDashboard/products"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span>View All Products</span>
            </Link>
            <button
              onClick={handleAddMedicine}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200"
            >
              <Plus size={20} />
              <span>Add Medicine</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Stock</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Price</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-4 px-4">
                    <div className="font-medium">{medicine.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {medicine.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">{medicine.stock}</td>
                  <td className="py-4 px-4 font-semibold">${medicine.price.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockColors[medicine.status]}`}>
                      {medicine.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateMedicine(medicine.id)}
                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleRemoveMedicine(medicine.id)}
                        className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <Link 
              to="/PharmacyDashboard/orders"
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:opacity-90"
            >
              View All Orders
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Product</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Invoice ID</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Unit</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Quantity</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Total Price</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-4 px-4 font-medium">{order.customer}</td>
                  <td className="py-4 px-4">{order.product}</td>
                  <td className="py-4 px-4 text-blue-600 font-medium">{order.invoiceId}</td>
                  <td className="py-4 px-4">{order.unit}</td>
                  <td className="py-4 px-4">{order.quantity}</td>
                  <td className="py-4 px-4 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;










































// new theme 
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   BarChart3, Calendar, DollarSign, Filter, Plus, 
//   TrendingDown, TrendingUp, Users,
//   ShoppingCart, Package, CheckCircle, Circle,
//   Clock, FileText, Home, Menu, Settings,
//   ShoppingBag, X, Building, AlertCircle
// } from 'lucide-react';

// const DashboardHome = () => {
//   const [pharmacyOpen, setPharmacyOpen] = useState(true);
//   const [medicines, setMedicines] = useState([
//     { id: 1, name: 'Paracetamol', category: 'Pain Relief', stock: 150, price: 5.99, status: 'In Stock' },
//     { id: 2, name: 'Amoxicillin', category: 'Antibiotic', stock: 45, price: 12.50, status: 'In Stock' },
//     { id: 3, name: 'Aspirin', category: 'Pain Relief', stock: 0, price: 8.75, status: 'Out of Stock' },
//     { id: 4, name: 'Cetirizine', category: 'Allergy', stock: 89, price: 6.25, status: 'In Stock' },
//     { id: 5, name: 'Omeprazole', category: 'Digestive', stock: 32, price: 15.99, status: 'Low Stock' },
//   ]);
  
//   const [orders, setOrders] = useState([
//     { id: 1001, customer: 'John Smith', product: 'Paracetamol', invoiceId: 'INV-001', unit: 'Tablet', quantity: 2, total: 11.98, status: 'Completed' },
//     { id: 1002, customer: 'Emma Wilson', product: 'Amoxicillin', invoiceId: 'INV-002', unit: 'Capsule', quantity: 1, total: 12.50, status: 'Pending' },
//     { id: 1003, customer: 'Robert Brown', product: 'Cetirizine', invoiceId: 'INV-003', unit: 'Tablet', quantity: 3, total: 18.75, status: 'Processing' },
//     { id: 1004, customer: 'Sarah Davis', product: 'Omeprazole', invoiceId: 'INV-004', unit: 'Capsule', quantity: 1, total: 15.99, status: 'Completed' },
//     { id: 1005, customer: 'Michael Lee', product: 'Aspirin', invoiceId: 'INV-005', unit: 'Tablet', quantity: 2, total: 17.50, status: 'Cancelled' },
//   ]);

//   const [pharmacyInfo, setPharmacyInfo] = useState({
//     name: 'MediCare Pharmacy',
//     address: '123 Health St, Medical City',
//     phone: '(555) 123-4567',
//     email: 'contact@medicarepharmacy.com',
//     hours: '8:00 AM - 10:00 PM',
//   });

//   const togglePharmacyStatus = () => setPharmacyOpen(!pharmacyOpen);

//   const handleEditPharmacy = () => {
//     const newName = prompt('Enter pharmacy name:', pharmacyInfo.name);
//     const newAddress = prompt('Enter pharmacy address:', pharmacyInfo.address);
//     const newPhone = prompt('Enter pharmacy phone:', pharmacyInfo.phone);
    
//     if (newName && newAddress && newPhone) {
//       setPharmacyInfo({
//         ...pharmacyInfo,
//         name: newName,
//         address: newAddress,
//         phone: newPhone,
//       });
//     }
//   };

//   const handleAddMedicine = () => {
//     const name = prompt('Enter medicine name:');
//     const category = prompt('Enter category:');
//     const stock = parseInt(prompt('Enter stock quantity:'));
//     const price = parseFloat(prompt('Enter price:'));
    
//     if (name && category && stock && price) {
//       const newMedicine = {
//         id: medicines.length + 1,
//         name,
//         category,
//         stock,
//         price,
//         status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
//       };
//       setMedicines([...medicines, newMedicine]);
//     }
//   };

//   const handleRemoveMedicine = (id) => {
//     if (window.confirm('Are you sure you want to remove this medicine?')) {
//       setMedicines(medicines.filter(medicine => medicine.id !== id));
//     }
//   };

//   const handleUpdateMedicine = (id) => {
//     const medicine = medicines.find(m => m.id === id);
//     const stock = parseInt(prompt('Enter new stock quantity:', medicine.stock));
//     const price = parseFloat(prompt('Enter new price:', medicine.price));
    
//     if (stock !== null && price !== null) {
//       const updatedMedicines = medicines.map(m => 
//         m.id === id ? {
//           ...m,
//           stock,
//           price,
//           status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
//         } : m
//       );
//       setMedicines(updatedMedicines);
//     }
//   };

//   const handleUpdateOrderStatus = (id, status) => {
//     const updatedOrders = orders.map(order => 
//       order.id === id ? { ...order, status } : order
//     );
//     setOrders(updatedOrders);
//   };

//   const statusColors = {
//     'Completed': 'bg-[#2c6774]/10 text-[#2c6774]',
//     'Pending': 'bg-[#5c878f]/10 text-[#5c878f]',
//     'Processing': 'bg-amber-100 text-amber-800',
//     'Cancelled': 'bg-red-100 text-red-800',
//   };

//   const stockColors = {
//     'In Stock': 'bg-[#2c6774]/10 text-[#2c6774]',
//     'Low Stock': 'bg-[#5c878f]/10 text-[#5c878f]',
//     'Out of Stock': 'bg-red-100 text-red-800',
//   };

//   return (
//     <>
//       {/* Top Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Today's Sales Card */}
//         <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10 rounded-2xl p-6 border border-[#2c6774]/20 shadow-lg">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-[#2c6774] font-medium">Today's Sales</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">$95.00</p>
//             </div>
//             <div className="p-3 rounded-full bg-[#2c6774]/10">
//               <DollarSign className="text-[#2c6774]" size={24} />
//             </div>
//           </div>
//           <div className="flex space-x-1 mt-4">
//             {[40, 60, 80, 45, 70, 90, 65].map((height, i) => (
//               <div
//                 key={i}
//                 className="flex-1 bg-gradient-to-t from-[#2c6774] to-[#5c878f] rounded-t-lg"
//                 style={{ height: `${height}%` }}
//               ></div>
//             ))}
//           </div>
//         </div>

//         {/* Growth Rate Card */}
//         <div className="bg-gradient-to-br from-[#5c878f]/10 to-[#9fbfc5]/20 rounded-2xl p-6 border border-[#5c878f]/20 shadow-lg">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-[#5c878f] font-medium">Growth Rate</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">1.457%</p>
//             </div>
//             <div className="p-3 rounded-full bg-[#5c878f]/10">
//               <TrendingUp className="text-[#5c878f]" size={24} />
//             </div>
//           </div>
//           <div className="flex space-x-1 mt-4">
//             {[30, 50, 40, 70, 60, 80, 90].map((height, i) => (
//               <div
//                 key={i}
//                 className="flex-1 bg-gradient-to-t from-[#5c878f] to-[#9fbfc5] rounded-t-lg"
//                 style={{ height: `${height}%` }}
//               ></div>
//             ))}
//           </div>
//         </div>

//         {/* Returns Card */}
//         <div className="bg-gradient-to-br from-[#c0d3dc]/20 to-[#9fbfc5]/10 rounded-2xl p-6 border border-[#c0d3dc]/30 shadow-lg">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-[#174047] font-medium">Returns</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">0.00%</p>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <TrendingDown className="text-[#174047]" size={24} />
//             </div>
//           </div>
//           <div className="mt-4">
//             <div className="h-1 bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#174047] rounded-full"></div>
//           </div>
//         </div>

//         {/* Customers Card */}
//         <div className="bg-gradient-to-br from-[#2c6774]/10 to-[#174047]/10 rounded-2xl p-6 border border-[#174047]/20 shadow-lg">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <p className="text-[#174047] font-medium">Customers</p>
//               <p className="text-3xl font-bold text-gray-800 mt-2">265K</p>
//             </div>
//             <div className="p-3 rounded-full bg-[#174047]/10">
//               <Users className="text-[#174047]" size={24} />
//             </div>
//           </div>
//           <div className="flex space-x-1 mt-4">
//             {[60, 75, 45, 90, 65, 80, 55].map((height, i) => (
//               <div
//                 key={i}
//                 className="flex-1 bg-gradient-to-t from-[#174047] to-[#2c6774] rounded-t-lg"
//                 style={{ height: `${height}%` }}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         {/* Analytics Chart */}
//         <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-gray-800">Total Sales Overview</h2>
//             <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#2c6774]/10 hover:bg-[#2c6774]/20 transition-colors text-[#2c6774]">
//               <Calendar size={18} />
//               <span>This Week</span>
//             </button>
//           </div>
//           <div className="h-64 flex items-end space-x-4 justify-center">
//             {[
//               { day: 'Mon', value: 150, color: 'from-[#2c6774] to-[#5c878f]' },
//               { day: 'Tue', value: 220, color: 'from-[#5c878f] to-[#9fbfc5]' },
//               { day: 'Wed', value: 180, color: 'from-[#174047] to-[#2c6774]' },
//               { day: 'Thu', value: 298, color: 'from-[#2c6774] to-[#174047]' },
//               { day: 'Fri', value: 240, color: 'from-[#5c878f] to-[#2c6774]' },
//               { day: 'Sat', value: 320, color: 'from-[#174047] to-[#5c878f]' },
//               { day: 'Sun', value: 280, color: 'from-[#9fbfc5] to-[#2c6774]' },
//             ].map((item, i) => (
//               <div key={i} className="flex flex-col items-center">
//                 <div className="relative">
//                   <div className={`h-${item.value/10} w-12 bg-gradient-to-t ${item.color} rounded-t-lg mb-2`}></div>
//                   {item.value === 298 && (
//                     <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#174047] text-white text-xs px-2 py-1 rounded-lg">
//                       ${item.value}K
//                     </div>
//                   )}
//                 </div>
//                 <span className="text-sm text-gray-600">{item.day}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Donut Chart */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">Sales Distribution</h2>
//           <div className="relative flex justify-center items-center h-48">
//             <div className="relative w-40 h-40">
//               {[
//                 { percent: 40, color: 'from-[#2c6774] to-[#5c878f]' },
//                 { percent: 25, color: 'from-[#5c878f] to-[#9fbfc5]' },
//                 { percent: 20, color: 'from-[#174047] to-[#2c6774]' },
//                 { percent: 15, color: 'from-[#c0d3dc] to-[#9fbfc5]' },
//               ].map((slice, i) => (
//                 <div
//                   key={i}
//                   className="absolute inset-0 rounded-full border-8 border-transparent"
//                   style={{
//                     clipPath: `conic-gradient(from ${i * 90}deg, transparent ${slice.percent}%, #0000 0)`,
//                     background: `conic-gradient(from ${i * 90}deg, var(--tw-gradient-stops) ${slice.percent}%, #0000 0)`,
//                   }}
//                 >
//                   <div className={`bg-gradient-to-r ${slice.color}`}></div>
//                 </div>
//               ))}
//             </div>
//             <div className="absolute text-center">
//               <p className="text-2xl font-bold text-gray-800">755K</p>
//               <p className="text-sm text-gray-600">Total Value</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicines Management */}
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg mb-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-gray-800">Manage Medicines</h2>
//           <div className="flex space-x-2">
//             <Link 
//               to="/PharmacyDashboard/products"
//               className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#2c6774]/10 hover:bg-[#2c6774]/20 transition-colors text-[#2c6774]"
//             >
//               <span>View All Products</span>
//             </Link>
//             <button
//               onClick={handleAddMedicine}
//               className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200"
//             >
//               <Plus size={20} />
//               <span>Add Medicine</span>
//             </button>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Name</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Stock</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Price</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {medicines.map((medicine) => (
//                 <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                   <td className="py-4 px-4">
//                     <div className="font-medium">{medicine.name}</div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className="px-3 py-1 rounded-full bg-[#c0d3dc]/30 text-gray-700 text-sm">
//                       {medicine.category}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">{medicine.stock}</td>
//                   <td className="py-4 px-4 font-semibold">${medicine.price.toFixed(2)}</td>
//                   <td className="py-4 px-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockColors[medicine.status]}`}>
//                       {medicine.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleUpdateMedicine(medicine.id)}
//                         className="px-3 py-1.5 text-sm bg-[#5c878f]/10 text-[#5c878f] rounded-lg hover:bg-[#5c878f]/20 transition-colors"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={() => handleRemoveMedicine(medicine.id)}
//                         className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
//           <div className="flex space-x-2">
//             <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#2c6774]/10 hover:bg-[#2c6774]/20 transition-colors text-[#2c6774]">
//               <Filter size={18} />
//               <span>Filter</span>
//             </button>
//             <Link 
//               to="/PharmacyDashboard/orders"
//               className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90"
//             >
//               View All Orders
//             </Link>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Product</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Invoice ID</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Unit</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Quantity</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Total Price</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
//                 <th className="text-left py-3 px-4 text-gray-600 font-medium">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50">
//                   <td className="py-4 px-4 font-medium">{order.customer}</td>
//                   <td className="py-4 px-4">{order.product}</td>
//                   <td className="py-4 px-4 text-[#2c6774] font-medium">{order.invoiceId}</td>
//                   <td className="py-4 px-4">{order.unit}</td>
//                   <td className="py-4 px-4">{order.quantity}</td>
//                   <td className="py-4 px-4 font-semibold">${order.total.toFixed(2)}</td>
//                   <td className="py-4 px-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <select
//                       value={order.status}
//                       onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
//                       className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 text-[#2c6774]"
//                     >
//                       <option value="Pending" className="text-[#5c878f]">Pending</option>
//                       <option value="Processing" className="text-amber-800">Processing</option>
//                       <option value="Completed" className="text-[#2c6774]">Completed</option>
//                       <option value="Cancelled" className="text-red-800">Cancelled</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardHome;