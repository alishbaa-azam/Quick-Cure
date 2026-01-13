// import React, { useState } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { medicines } from './medicines.js';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { pharmacyId } = useParams();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   // Sample pharmacy data - in real app, fetch by pharmacyId
//   const pharmacy = {
//     id: 1,
//     name: 'Apollo Pharmacy',
//     address: '123 Health Street, Medical City, New Delhi - 110001',
//     distance: '0.5 km',
//     rating: 4.8,
//     totalReviews: 1247,
//     deliveryTime: '15-20 mins',
//     open: true,
//     phone: '+91 98765 43210',
//     email: 'store@apollopharmacy.com',
//     openingHours: {
//       monday: '8:00 AM - 11:00 PM',
//       tuesday: '8:00 AM - 11:00 PM',
//       wednesday: '8:00 AM - 11:00 PM',
//       thursday: '8:00 AM - 11:00 PM',
//       friday: '8:00 AM - 11:00 PM',
//       saturday: '9:00 AM - 10:00 PM',
//       sunday: '9:00 AM - 9:00 PM'
//     },
//     services: [
//       '24/7 Emergency Service',
//       'Free Delivery',
//       'Doctor Consultation',
//       'Medicine Reminder',
//       'Prescription Upload'
//     ],
//     image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200',
//     bannerImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600'
//   };

//   // Categories for filtering
//   const categories = [
//     { id: 'all', name: 'All Medicines' },
//     { id: 'pain', name: 'Pain Relief' },
//     { id: 'fever', name: 'Fever & Cold' },
//     { id: 'vitamins', name: 'Vitamins & Supplements' },
//     { id: 'chronic', name: 'Chronic Care' },
//     { id: 'skin', name: 'Skin Care' },
//     { id: 'baby', name: 'Baby Care' }
//   ];

//   // Filter medicines based on search and category
//   const filteredMedicines = medicines.filter(medicine => {
//     const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || 
//                            medicine.category?.toLowerCase() === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate(-1)}
//         className="flex items-center text-gray-600 hover:text-[var(--primary-color)] mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back to Pharmacies
//       </button>

//       {/* Pharmacy Banner */}
//       <div className="relative rounded-2xl overflow-hidden mb-8">
//         <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-cyan-500">
//           <img 
//             src={pharmacy.bannerImage} 
//             alt={pharmacy.name}
//             className="w-full h-full object-cover opacity-20"
//           />
//         </div>
//         <div className="absolute inset-0 flex items-center p-8">
//           <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-3">{pharmacy.address}</p>
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="flex items-center">
//                     <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold">{pharmacy.rating}</span>
//                       <span className="text-gray-500 text-sm ml-1">({pharmacy.totalReviews} reviews)</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {pharmacy.distance} away
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Delivery: {pharmacy.deliveryTime}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pharmacy Details Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Left Column - Services & Info */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Services */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {pharmacy.services.map((service, index) => (
//                 <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                   <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-700">{service}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Opening Hours */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h2>
//             <div className="space-y-3">
//               {Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                 <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                   <span className="font-medium text-gray-700 capitalize">{day}</span>
//                   <span className="text-gray-600">{hours}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 <a href={`tel:${pharmacy.phone}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.phone}
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 <a href={`mailto:${pharmacy.email}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.email}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Quick Actions */}
//         <div className="space-y-6">
//           {/* Order Summary */}
//           <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Your Order</h3>
//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-gray-600">Items in cart:</span>
//                 <span className="font-bold">{cart.length}</span>
//               </div>
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-gray-600">Delivery to:</span>
//                 <span className="font-medium text-gray-900">{pharmacy.distance}</span>
//               </div>
//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center text-lg font-bold">
//                   <span>Total:</span>
//                   <span>₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/booking"
//               className={`w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors block ${
//                 cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//             >
//               Proceed to Checkout ({cart.length})
//             </Link>
//           </div>

//           {/* Emergency Contact */}
//           <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//             <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Contact</h3>
//             <p className="text-red-600 text-sm mb-4">Available 24/7 for emergency medicines</p>
//             <a 
//               href={`tel:${pharmacy.phone}`}
//               className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//               Call Now
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Catalog Section */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//             <p className="text-gray-600">Browse and order medicines from {pharmacy.name}</p>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             {/* Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full md:w-64"
//               />
//               <svg 
//                 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Category Filters */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {categories.map(category => (
//             <button
//               key={category.id}
//               onClick={() => setSelectedCategory(category.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                 selectedCategory === category.id
//                   ? 'bg-[var(--primary-color)] text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>

//         {/* Medicine Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//           {filteredMedicines.map(medicine => (
//             <MedicineCard
//               key={medicine.id}
//               medicine={medicine}
//               onAddToCart={addToCart}
//             />
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredMedicines.length === 0 && (
//           <div className="text-center py-12">
//             <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-gray-500 text-lg">No medicines found matching your criteria.</p>
//             <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
//           </div>
//         )}
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
//         <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a different pharmacy?</h3>
//         <p className="text-gray-600 mb-6">Browse medicines from other trusted pharmacies in your area</p>
//         <Link
//           to="/pharmacies"
//           className="inline-flex items-center bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
//         >
//           Explore Other Pharmacies
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetailPage;



//The below is the completed code with Pakistani pharmacy database
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { medicines } from './medicines.js';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { pharmacyId } = useParams();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   // Pakistani pharmacy database
//   const pakistaniPharmacies = [
//     {
//       id: 1,
//       name: 'Sehat Pharmacy',
//       address: 'G-9 Markaz, Islamabad, Pakistan',
//       distance: '0.5 km',
//       rating: 4.8,
//       totalReviews: 1247,
//       deliveryTime: '15-20 mins',
//       open: true,
//       phone: '+92 300 1234567',
//       email: 'info@sehatpharmacy.com',
//       openingHours: {
//         monday: '8:00 AM - 11:00 PM',
//         tuesday: '8:00 AM - 11:00 PM',
//         wednesday: '8:00 AM - 11:00 PM',
//         thursday: '8:00 AM - 11:00 PM',
//         friday: '8:00 AM - 11:00 PM',
//         saturday: '9:00 AM - 10:00 PM',
//         sunday: '9:00 AM - 9:00 PM'
//       },
//       services: [
//         '24/7 Emergency Service',
//         'Free Delivery',
//         'Doctor Consultation',
//         'Medicine Reminder',
//         'Prescription Upload',
//         'Home Delivery',
//         'Chronic Disease Management'
//       ],
//       image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200',
//       bannerImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600'
//     },
//     {
//       id: 2,
//       name: 'Medicam Pharmacy',
//       address: 'Defence Phase 5, Karachi, Pakistan',
//       distance: '1.2 km',
//       rating: 4.5,
//       totalReviews: 892,
//       deliveryTime: '20-25 mins',
//       open: true,
//       phone: '+92 300 2345678',
//       email: 'contact@medicampharmacy.com',
//       openingHours: {
//         monday: '9:00 AM - 10:00 PM',
//         tuesday: '9:00 AM - 10:00 PM',
//         wednesday: '9:00 AM - 10:00 PM',
//         thursday: '9:00 AM - 10:00 PM',
//         friday: '9:00 AM - 11:00 PM',
//         saturday: '10:00 AM - 10:00 PM',
//         sunday: '10:00 AM - 8:00 PM'
//       },
//       services: [
//         '24/7 Emergency Service',
//         'Free Delivery',
//         'Doctor Consultation',
//         'Vaccination Services',
//         'Health Checkups',
//         'Medical Equipment Rental'
//       ],
//       image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200',
//       bannerImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600'
//     },
//     {
//       id: 3,
//       name: 'Pharma Plus',
//       address: 'Gulberg Main Boulevard, Lahore, Pakistan',
//       distance: '0.8 km',
//       rating: 4.7,
//       totalReviews: 1543,
//       deliveryTime: '10-15 mins',
//       open: true,
//       phone: '+92 300 3456789',
//       email: 'support@pharmaplus.pk',
//       openingHours: {
//         monday: '8:00 AM - 12:00 AM',
//         tuesday: '8:00 AM - 12:00 AM',
//         wednesday: '8:00 AM - 12:00 AM',
//         thursday: '8:00 AM - 12:00 AM',
//         friday: '8:00 AM - 12:00 AM',
//         saturday: '9:00 AM - 11:00 PM',
//         sunday: '9:00 AM - 10:00 PM'
//       },
//       services: [
//         '24/7 Emergency Service',
//         'Free Delivery',
//         'Doctor Consultation',
//         'Medicine Home Delivery',
//         'Chronic Care',
//         'Senior Citizen Discount'
//       ],
//       image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200',
//       bannerImage: 'https://images.unsplash.com/photo-1516549655669-df565bc5d8b7?auto=format&fit=crop&w=1600'
//     },
//     {
//       id: 4,
//       name: 'Shifa Pharmacy',
//       address: 'University Road, Peshawar, Pakistan',
//       distance: '2.0 km',
//       rating: 4.9,
//       totalReviews: 678,
//       deliveryTime: '25-30 mins',
//       open: false,
//       phone: '+92 300 4567890',
//       email: 'pharmacy@shifa.com',
//       openingHours: {
//         monday: '9:00 AM - 9:00 PM',
//         tuesday: '9:00 AM - 9:00 PM',
//         wednesday: '9:00 AM - 9:00 PM',
//         thursday: '9:00 AM - 9:00 PM',
//         friday: '9:00 AM - 9:00 PM',
//         saturday: '10:00 AM - 8:00 PM',
//         sunday: '10:00 AM - 6:00 PM'
//       },
//       services: [
//         'Emergency Service',
//         'Home Delivery',
//         'Doctor Consultation',
//         'Prescription Management',
//         'Medical Counseling'
//       ],
//       image: 'https://images.unsplash.com/photo-1516549655669-df565bc5d8b7?auto=format&fit=crop&w=1200',
//       bannerImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1600'
//     }
//   ];

//   // Get the correct pharmacy based on pharmacyId
//   const pharmacy = pakistaniPharmacies.find(p => p.id === parseInt(pharmacyId)) || pakistaniPharmacies[0];

//   // Categories for filtering - match with medicine categories
//   const categories = [
//     { id: 'all', name: 'All Medicines' },
//     { id: 'pain relief', name: 'Pain Relief' },
//     { id: 'fever', name: 'Fever & Cold' },
//     { id: 'vitamins', name: 'Vitamins & Supplements' },
//     { id: 'chronic', name: 'Chronic Care' },
//     { id: 'skincare', name: 'Skin Care' },
//     { id: 'babycare', name: 'Baby Care' },
//     { id: 'antibiotics', name: 'Antibiotics' },
//     { id: 'cardiac', name: 'Cardiac Care' },
//     { id: 'diabetes', name: 'Diabetes Care' }
//   ];

//   // Filter medicines based on search and category
//   const filteredMedicines = medicines.filter(medicine => {
//     const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    
//     // Handle category matching - check if medicine has category property
//     let matchesCategory = true;
//     if (selectedCategory !== 'all') {
//       if (medicine.category) {
//         matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                          medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//       } else {
//         // Fallback: check if medicine name or description contains category keywords
//         const categoryKeywords = {
//           'pain relief': ['pain', 'ache', 'analgesic', 'relief'],
//           'fever': ['fever', 'cold', 'flu', 'temperature'],
//           'vitamins': ['vitamin', 'supplement', 'mineral'],
//           'chronic': ['chronic', 'long-term', 'maintenance'],
//           'skincare': ['skin', 'cream', 'ointment', 'dermatology'],
//           'babycare': ['baby', 'infant', 'pediatric'],
//           'antibiotics': ['antibiotic', 'infection', 'bacterial'],
//           'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol'],
//           'diabetes': ['diabetes', 'insulin', 'blood sugar']
//         };
        
//         const keywords = categoryKeywords[selectedCategory] || [];
//         matchesCategory = keywords.some(keyword => 
//           medicine.name.toLowerCase().includes(keyword) || 
//           medicine.description.toLowerCase().includes(keyword)
//         );
//       }
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   // Clear cart function
//   const clearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart?')) {
//       setCart([]);
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   // Update item quantity
//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate('/pharmacies')}
//         className="flex items-center text-gray-600 hover:text-[var(--primary-color)] mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back to Pharmacies
//       </button>

//       {/* Pharmacy Banner */}
//       <div className="relative rounded-2xl overflow-hidden mb-8">
//         <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-cyan-500">
//           <img 
//             src={pharmacy.bannerImage} 
//             alt={pharmacy.name}
//             className="w-full h-full object-cover opacity-20"
//           />
//         </div>
//         <div className="absolute inset-0 flex items-center p-8">
//           <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-3">{pharmacy.address}</p>
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="flex items-center">
//                     <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold">{pharmacy.rating}</span>
//                       <span className="text-gray-500 text-sm ml-1">({pharmacy.totalReviews} reviews)</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {pharmacy.distance} away
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Delivery: {pharmacy.deliveryTime}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pharmacy Details Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Left Column - Services & Info */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Services */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {pharmacy.services.map((service, index) => (
//                 <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                   <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-700">{service}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Opening Hours */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h2>
//             <div className="space-y-3">
//               {Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                 <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                   <span className="font-medium text-gray-700 capitalize">{day}</span>
//                   <span className="text-gray-600">{hours}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 <a href={`tel:${pharmacy.phone}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.phone}
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 <a href={`mailto:${pharmacy.email}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.email}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Order Summary (Fixed Position) */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-6">
//             {/* Order Summary */}
//             <div className="bg-white rounded-xl shadow-lg border p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold text-gray-900">Your Order</h3>
//                 {cart.length > 0 && (
//                   <button
//                     onClick={clearCart}
//                     className="text-sm text-red-600 hover:text-red-800 flex items-center"
//                   >
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Clear Cart
//                   </button>
//                 )}
//               </div>
              
//               {cart.length === 0 ? (
//                 <div className="text-center py-6">
//                   <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   <p className="text-gray-500">Your cart is empty</p>
//                   <p className="text-gray-400 text-sm mt-1">Add medicines to get started</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Cart Items */}
//                   <div className="max-h-60 overflow-y-auto mb-4">
//                     {cart.map((item) => (
//                       <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-800 truncate">{item.name}</p>
//                           <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">-</span>
//                           </button>
//                           <span className="w-8 text-center font-medium">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">+</span>
//                           </button>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="ml-2 text-red-500 hover:text-red-700"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Order Summary */}
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Items ({cart.length}):</span>
//                       <span className="font-medium">₹{calculateTotal()}</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Delivery:</span>
//                       <span className="font-medium">Free</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-gray-600">Delivery to:</span>
//                       <span className="font-medium text-gray-900">{pharmacy.distance}</span>
//                     </div>
//                     <div className="border-t pt-4">
//                       <div className="flex justify-between items-center text-lg font-bold">
//                         <span>Total:</span>
//                         <span>₹{calculateTotal()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
              
//               <Link
//                 to="/booking"
//                 className={`w-full mt-4 bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors block ${
//                   cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 Proceed to Checkout ({cart.length})
//               </Link>
//             </div>

//             {/* Emergency Contact */}
//             <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Contact</h3>
//               <p className="text-red-600 text-sm mb-4">Available 24/7 for emergency medicines</p>
//               <a 
//                 href={`tel:${pharmacy.phone}`}
//                 className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Call Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Catalog Section */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//             <p className="text-gray-600">Browse and order medicines from {pharmacy.name}</p>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             {/* Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full md:w-64"
//               />
//               <svg 
//                 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Category Filters - Scrollable */}
//         <div className="mb-6">
//           <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             {categories.map(category => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                   selectedCategory === category.id
//                     ? 'bg-[var(--primary-color)] text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//           {selectedCategory !== 'all' && (
//             <div className="mt-3 flex items-center">
//               <span className="text-sm text-gray-600">Filtered by: {categories.find(c => c.id === selectedCategory)?.name}</span>
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className="ml-2 text-sm text-[var(--primary-color)] hover:underline"
//               >
//                 Clear filter
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Medicine Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//           {filteredMedicines.map(medicine => (
//             <MedicineCard
//               key={medicine.id}
//               medicine={medicine}
//               onAddToCart={addToCart}
//             />
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredMedicines.length === 0 && (
//           <div className="text-center py-12">
//             <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-gray-500 text-lg">No medicines found matching your criteria.</p>
//             <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedCategory('all');
//               }}
//               className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
//         <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a different pharmacy?</h3>
//         <p className="text-gray-600 mb-6">Browse medicines from other trusted pharmacies in your area</p>
//         <Link
//           to="/pharmacies"
//           className="inline-flex items-center bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
//         >
//           Explore Other Pharmacies
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetailPage;



















//The below code has a separate data file for pharmacies and is not needed here anymore

// import React, { useState } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { medicines } from './medicines.js';
// import { pharmacies } from './pharmacyData.js'; // Changed from pakistaniPharmacies to pharmacies
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { pharmacyId } = useParams();
//   const pharmacyIdNum = parseInt(pharmacyId);
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   // Get the correct pharmacy based on pharmacyId
//   const pharmacy = pharmacies.find(p => p.id === pharmacyIdNum) || pharmacies[0]; // Changed variable name

//   // Categories for filtering
//   const categories = [
//     { id: 'all', name: 'All Medicines' },
//     { id: 'painkiller', name: 'Pain Relief' },
//     { id: 'fever', name: 'Fever & Cold' },
//     { id: 'vitamin', name: 'Vitamins & Supplements' },
//     { id: 'chronic', name: 'Chronic Care' },
//     { id: 'skincare', name: 'Skin Care' },
//     { id: 'babycare', name: 'Baby Care' },
//     { id: 'antibiotic', name: 'Antibiotics' },
//     { id: 'cardiac', name: 'Cardiac Care' },
//     { id: 'diabetes', name: 'Diabetes Care' }
//   ];

//   // Get medicines available at this specific pharmacy
//   const pharmacyMedicines = medicines.filter(medicine => 
//     medicine.availableAt && medicine.availableAt.includes(pharmacyIdNum)
//   );

//   // Filter medicines based on search, category, AND pharmacy availability
//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     // Check category
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       // Fallback keyword matching
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief'],
//         'fever': ['fever', 'cold', 'flu', 'temperature'],
//         'vitamin': ['vitamin', 'supplement', 'mineral'],
//         'chronic': ['chronic', 'long-term', 'maintenance'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology'],
//         'babycare': ['baby', 'infant', 'pediatric'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name.toLowerCase().includes(keyword) || 
//         medicine.description.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   // Clear cart function
//   const clearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart?')) {
//       setCart([]);
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   // Update item quantity
//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate('/pharmacies')}
//         className="flex items-center text-gray-600 hover:text-[var(--primary-color)] mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back to Pharmacies
//       </button>

//       {/* Pharmacy Banner */}
//       <div className="relative rounded-2xl overflow-hidden mb-8">
//         <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-cyan-500">
//           <img 
//             src={pharmacy.bannerImage} 
//             alt={pharmacy.name}
//             className="w-full h-full object-cover opacity-20"
//           />
//         </div>
//         <div className="absolute inset-0 flex items-center p-8">
//           <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-3">{pharmacy.address}</p>
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="flex items-center">
//                     <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold">{pharmacy.rating}</span>
//                       <span className="text-gray-500 text-sm ml-1">({pharmacy.totalReviews} reviews)</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {pharmacy.distance} away
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Delivery: {pharmacy.deliveryTime}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Count Summary */}
//       <div className="mb-6 p-4 bg-blue-50 rounded-xl">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h3 className="font-bold text-gray-900">{pharmacyMedicines.length} Medicines Available</h3>
//             <p className="text-gray-600 text-sm">
//               {filteredMedicines.length} match your search {selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.name}`}
//             </p>
//           </div>
//           <div className="mt-2 md:mt-0">
//             <p className="text-sm text-gray-600">
//               Showing medicines available at <span className="font-bold">{pharmacy.name}</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Pharmacy Details Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Left Column - Services & Info */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Services */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {pharmacy.services.map((service, index) => (
//                 <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                   <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-700">{service}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Opening Hours */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h2>
//             <div className="space-y-3">
//               {Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                 <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                   <span className="font-medium text-gray-700 capitalize">{day}</span>
//                   <span className="text-gray-600">{hours}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 <a href={`tel:${pharmacy.phone}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.phone}
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 <a href={`mailto:${pharmacy.email}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.email}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Order Summary (Fixed Position) */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-6">
//             {/* Order Summary */}
//             <div className="bg-white rounded-xl shadow-lg border p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold text-gray-900">Your Order</h3>
//                 {cart.length > 0 && (
//                   <button
//                     onClick={clearCart}
//                     className="text-sm text-red-600 hover:text-red-800 flex items-center"
//                   >
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Clear Cart
//                   </button>
//                 )}
//               </div>
              
//               {cart.length === 0 ? (
//                 <div className="text-center py-6">
//                   <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   <p className="text-gray-500">Your cart is empty</p>
//                   <p className="text-gray-400 text-sm mt-1">Add medicines to get started</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Cart Items */}
//                   <div className="max-h-60 overflow-y-auto mb-4">
//                     {cart.map((item) => (
//                       <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-800 truncate">{item.name}</p>
//                           <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">-</span>
//                           </button>
//                           <span className="w-8 text-center font-medium">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">+</span>
//                           </button>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="ml-2 text-red-500 hover:text-red-700"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Order Summary */}
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Items ({cart.length}):</span>
//                       <span className="font-medium">₹{calculateTotal()}</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Delivery:</span>
//                       <span className="font-medium">Free</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-gray-600">Delivery to:</span>
//                       <span className="font-medium text-gray-900">{pharmacy.distance}</span>
//                     </div>
//                     <div className="border-t pt-4">
//                       <div className="flex justify-between items-center text-lg font-bold">
//                         <span>Total:</span>
//                         <span>₹{calculateTotal()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
              
//               <Link
//                 to="/booking"
//                 className={`w-full mt-4 bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors block ${
//                   cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 Proceed to Checkout ({cart.length})
//               </Link>
//             </div>

//             {/* Emergency Contact */}
//             <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Contact</h3>
//               <p className="text-red-600 text-sm mb-4">Available 24/7 for emergency medicines</p>
//               <a 
//                 href={`tel:${pharmacy.phone}`}
//                 className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Call Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Catalog Section */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Medicines at {pharmacy.name}</h2>
//             <p className="text-gray-600">Available for delivery in {pharmacy.deliveryTime}</p>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             {/* Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full md:w-64"
//               />
//               <svg 
//                 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Category Filters - Scrollable */}
//         <div className="mb-6">
//           <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             {categories.map(category => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                   selectedCategory === category.id
//                     ? 'bg-[var(--primary-color)] text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//           {selectedCategory !== 'all' && (
//             <div className="mt-3 flex items-center">
//               <span className="text-sm text-gray-600">Filtered by: {categories.find(c => c.id === selectedCategory)?.name}</span>
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className="ml-2 text-sm text-[var(--primary-color)] hover:underline"
//               >
//                 Clear filter
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Medicine Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//           {filteredMedicines.map(medicine => (
//             <MedicineCard
//               key={medicine.id}
//               medicine={medicine}
//               onAddToCart={addToCart}
//             />
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredMedicines.length === 0 && (
//           <div className="text-center py-12">
//             <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-gray-500 text-lg">No medicines found matching your criteria.</p>
//             <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedCategory('all');
//               }}
//               className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
//         <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a different pharmacy?</h3>
//         <p className="text-gray-600 mb-6">Browse medicines from other trusted pharmacies in your area</p>
//         <Link
//           to="/pharmacies"
//           className="inline-flex items-center bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
//         >
//           Explore Other Pharmacies
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetailPage;













//This includes API
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams(); // Changed from pharmacyId to id
//   const navigate = useNavigate();
  
//   // State for pharmacy data
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   // Categories for filtering
//   const categories = [
//     { id: 'all', name: 'All Medicines' },
//     { id: 'painkiller', name: 'Pain Relief' },
//     { id: 'fever', name: 'Fever & Cold' },
//     { id: 'vitamin', name: 'Vitamins & Supplements' },
//     { id: 'chronic', name: 'Chronic Care' },
//     { id: 'skincare', name: 'Skin Care' },
//     { id: 'babycare', name: 'Baby Care' },
//     { id: 'antibiotic', name: 'Antibiotics' },
//     { id: 'cardiac', name: 'Cardiac Care' },
//     { id: 'diabetes', name: 'Diabetes Care' }
//   ];

//   // NOTE: For medicines, you need medicine backend
//   // For now, using static data or empty array
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);

//   // Fetch pharmacy details from API
//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   // Filter medicines based on search and category
//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       // Fallback keyword matching
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief'],
//         'fever': ['fever', 'cold', 'flu', 'temperature'],
//         'vitamin': ['vitamin', 'supplement', 'mineral'],
//         'chronic': ['chronic', 'long-term', 'maintenance'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology'],
//         'babycare': ['baby', 'infant', 'pediatric'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   // Clear cart function
//   const clearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart?')) {
//       setCart([]);
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   // Update item quantity
//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-600">Loading pharmacy details...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !pharmacy) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">Pharmacy Not Found</h3>
//           <p className="text-gray-500">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <button
//             onClick={() => navigate('/pharmacies')}
//             className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Back to Pharmacies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate('/pharmacies')}
//         className="flex items-center text-gray-600 hover:text-[var(--primary-color)] mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back to Pharmacies
//       </button>

//       {/* Pharmacy Banner */}
//       <div className="relative rounded-2xl overflow-hidden mb-8">
//         <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-cyan-500">
//           <img 
//             src={pharmacy.bannerImage} 
//             alt={pharmacy.name}
//             className="w-full h-full object-cover opacity-20"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600';
//             }}
//           />
//         </div>
//         <div className="absolute inset-0 flex items-center p-8">
//           <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                   }}
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-3">{pharmacy.address}</p>
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="flex items-center">
//                     <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-gray-500 text-sm ml-1">({pharmacy.totalReviews || 0} reviews)</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {pharmacy.distance} away
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Delivery: {pharmacy.deliveryTime || '15-20 mins'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Count Summary */}
//       <div className="mb-6 p-4 bg-blue-50 rounded-xl">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h3 className="font-bold text-gray-900">{pharmacyMedicines.length} Medicines Available</h3>
//             <p className="text-gray-600 text-sm">
//               {medicineLoading ? 'Loading medicines...' : `${filteredMedicines.length} match your search ${selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.name}`}`}
//             </p>
//           </div>
//           <div className="mt-2 md:mt-0">
//             <p className="text-sm text-gray-600">
//               Showing medicines available at <span className="font-bold">{pharmacy.name}</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Pharmacy Details Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Left Column - Services & Info */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Services */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {pharmacy.services && pharmacy.services.map((service, index) => (
//                 <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                   <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-700">{service}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Opening Hours */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h2>
//             <div className="space-y-3">
//               {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                 <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                   <span className="font-medium text-gray-700 capitalize">{day}</span>
//                   <span className="text-gray-600">{hours}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 <a href={`tel:${pharmacy.phone}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.phone}
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 <a href={`mailto:${pharmacy.email}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.email}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Order Summary (Fixed Position) */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-6">
//             {/* Order Summary */}
//             <div className="bg-white rounded-xl shadow-lg border p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold text-gray-900">Your Order</h3>
//                 {cart.length > 0 && (
//                   <button
//                     onClick={clearCart}
//                     className="text-sm text-red-600 hover:text-red-800 flex items-center"
//                   >
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Clear Cart
//                   </button>
//                 )}
//               </div>
              
//               {cart.length === 0 ? (
//                 <div className="text-center py-6">
//                   <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   <p className="text-gray-500">Your cart is empty</p>
//                   <p className="text-gray-400 text-sm mt-1">Add medicines to get started</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Cart Items */}
//                   <div className="max-h-60 overflow-y-auto mb-4">
//                     {cart.map((item) => (
//                       <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-800 truncate">{item.name}</p>
//                           <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">-</span>
//                           </button>
//                           <span className="w-8 text-center font-medium">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">+</span>
//                           </button>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="ml-2 text-red-500 hover:text-red-700"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Order Summary */}
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Items ({cart.length}):</span>
//                       <span className="font-medium">₹{calculateTotal()}</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Delivery:</span>
//                       <span className="font-medium">Free</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-gray-600">Delivery to:</span>
//                       <span className="font-medium text-gray-900">{pharmacy.distance}</span>
//                     </div>
//                     <div className="border-t pt-4">
//                       <div className="flex justify-between items-center text-lg font-bold">
//                         <span>Total:</span>
//                         <span>₹{calculateTotal()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
              
//               <Link
//                 to="/booking"
//                 className={`w-full mt-4 bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors block ${
//                   cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 Proceed to Checkout ({cart.length})
//               </Link>
//             </div>

//             {/* Emergency Contact */}
//             <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Contact</h3>
//               <p className="text-red-600 text-sm mb-4">Available 24/7 for emergency medicines</p>
//               <a 
//                 href={`tel:${pharmacy.phone}`}
//                 className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Call Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Catalog Section - WILL NEED MEDICINE BACKEND */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Medicines at {pharmacy.name}</h2>
//             <p className="text-gray-600">Available for delivery in {pharmacy.deliveryTime}</p>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             {/* Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full md:w-64"
//               />
//               <svg 
//                 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Category Filters - Scrollable */}
//         <div className="mb-6">
//           <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             {categories.map(category => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                   selectedCategory === category.id
//                     ? 'bg-[var(--primary-color)] text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//           {selectedCategory !== 'all' && (
//             <div className="mt-3 flex items-center">
//               <span className="text-sm text-gray-600">Filtered by: {categories.find(c => c.id === selectedCategory)?.name}</span>
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className="ml-2 text-sm text-[var(--primary-color)] hover:underline"
//               >
//                 Clear filter
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Medicine Grid - NEEDS MEDICINE BACKEND */}
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//           </svg>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">Medicine Catalog Coming Soon</h3>
//           <p className="text-gray-500">Medicine backend is required to display pharmacy medicines.</p>
//           <p className="text-gray-400 mt-2">Ask for "medicine backend" when ready to implement.</p>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
//         <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a different pharmacy?</h3>
//         <p className="text-gray-600 mb-6">Browse medicines from other trusted pharmacies in your area</p>
//         <Link
//           to="/pharmacies"
//           className="inline-flex items-center bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
//         >
//           Explore Other Pharmacies
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetailPage;












//Updated Backend Code with Medicine Integration

// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams(); // Changed from pharmacyId to id
//   const navigate = useNavigate();
  
//   // State for pharmacy data
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   // Categories for filtering
//   const categories = [
//     { id: 'all', name: 'All Medicines' },
//     { id: 'painkiller', name: 'Pain Relief' },
//     { id: 'fever', name: 'Fever & Cold' },
//     { id: 'vitamin', name: 'Vitamins & Supplements' },
//     { id: 'chronic', name: 'Chronic Care' },
//     { id: 'skincare', name: 'Skin Care' },
//     { id: 'babycare', name: 'Baby Care' },
//     { id: 'antibiotic', name: 'Antibiotics' },
//     { id: 'cardiac', name: 'Cardiac Care' },
//     { id: 'diabetes', name: 'Diabetes Care' }
//   ];

//   // Medicines state
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);

//   // Fetch pharmacy details from API
//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   // Fetch medicines for this pharmacy
//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         // Fetch all medicines
//         const response = await fetch('http://localhost:5000/api/medicines');
//         const data = await response.json();
        
//         if (data.success) {
//           // Filter medicines that include this pharmacy ID in availableAtPharmacies
//           const medicinesForPharmacy = data.data.filter(medicine => {
//             if (!medicine.availableAtPharmacies || !Array.isArray(medicine.availableAtPharmacies)) {
//               return false;
//             }
            
//             return medicine.availableAtPharmacies.some(pharmacy => {
//               // Check if pharmacy is a string ID or populated object
//               if (typeof pharmacy === 'string') {
//                 return pharmacy === id;
//               } else if (pharmacy && pharmacy._id) {
//                 return pharmacy._id === id;
//               }
//               return false;
//             });
//           });
          
//           setPharmacyMedicines(medicinesForPharmacy);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   // Filter medicines based on search and category
//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       // Fallback keyword matching
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine._id || item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === (medicine._id || medicine.id)
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { 
//         ...medicine, 
//         id: medicine._id || medicine.id, 
//         quantity: 1 
//       }];
//     });
//   };

//   // Clear cart function
//   const clearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart?')) {
//       setCart([]);
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   // Update item quantity
//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     return cart.reduce((sum, item) => sum + ((item.price || item.discountedPrice || 0) * item.quantity), 0);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-600">Loading pharmacy details...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !pharmacy) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">Pharmacy Not Found</h3>
//           <p className="text-gray-500">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <button
//             onClick={() => navigate('/pharmacies')}
//             className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Back to Pharmacies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate('/pharmacies')}
//         className="flex items-center text-gray-600 hover:text-[var(--primary-color)] mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back to Pharmacies
//       </button>

//       {/* Pharmacy Banner */}
//       <div className="relative rounded-2xl overflow-hidden mb-8">
//         <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-cyan-500">
//           <img 
//             src={pharmacy.bannerImage} 
//             alt={pharmacy.name}
//             className="w-full h-full object-cover opacity-20"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600';
//             }}
//           />
//         </div>
//         <div className="absolute inset-0 flex items-center p-8">
//           <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                   }}
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-3">{pharmacy.address}</p>
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="flex items-center">
//                     <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-gray-500 text-sm ml-1">({pharmacy.totalReviews || 0} reviews)</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {pharmacy.distance} away
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Delivery: {pharmacy.deliveryTime || '15-20 mins'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Count Summary */}
//       <div className="mb-6 p-4 bg-blue-50 rounded-xl">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h3 className="font-bold text-gray-900">{pharmacyMedicines.length} Medicines Available</h3>
//             <p className="text-gray-600 text-sm">
//               {medicineLoading ? 'Loading medicines...' : `${filteredMedicines.length} match your search ${selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.name}`}`}
//             </p>
//           </div>
//           <div className="mt-2 md:mt-0">
//             <p className="text-sm text-gray-600">
//               Showing medicines available at <span className="font-bold">{pharmacy.name}</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Pharmacy Details Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Left Column - Services & Info */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Services */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {pharmacy.services && pharmacy.services.map((service, index) => (
//                 <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                   <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-700">{service}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Opening Hours */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h2>
//             <div className="space-y-3">
//               {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                 <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                   <span className="font-medium text-gray-700 capitalize">{day}</span>
//                   <span className="text-gray-600">{hours}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 <a href={`tel:${pharmacy.phone}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.phone}
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 <a href={`mailto:${pharmacy.email}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.email}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Order Summary (Fixed Position) */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-6">
//             {/* Order Summary */}
//             <div className="bg-white rounded-xl shadow-lg border p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold text-gray-900">Your Order</h3>
//                 {cart.length > 0 && (
//                   <button
//                     onClick={clearCart}
//                     className="text-sm text-red-600 hover:text-red-800 flex items-center"
//                   >
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Clear Cart
//                   </button>
//                 )}
//               </div>
              
//               {cart.length === 0 ? (
//                 <div className="text-center py-6">
//                   <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   <p className="text-gray-500">Your cart is empty</p>
//                   <p className="text-gray-400 text-sm mt-1">Add medicines to get started</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Cart Items */}
//                   <div className="max-h-60 overflow-y-auto mb-4">
//                     {cart.map((item) => (
//                       <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-800 truncate">{item.name}</p>
//                           <p className="text-sm text-gray-500">₹{item.price || item.discountedPrice || 0} × {item.quantity}</p>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">-</span>
//                           </button>
//                           <span className="w-8 text-center font-medium">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">+</span>
//                           </button>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="ml-2 text-red-500 hover:text-red-700"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Order Summary */}
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Items ({cart.length}):</span>
//                       <span className="font-medium">₹{calculateTotal()}</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Delivery:</span>
//                       <span className="font-medium">Free</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-gray-600">Delivery to:</span>
//                       <span className="font-medium text-gray-900">{pharmacy.distance}</span>
//                     </div>
//                     <div className="border-t pt-4">
//                       <div className="flex justify-between items-center text-lg font-bold">
//                         <span>Total:</span>
//                         <span>₹{calculateTotal()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
              
//               <Link
//                 to="/booking"
//                 className={`w-full mt-4 bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors block ${
//                   cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 Proceed to Checkout ({cart.length})
//               </Link>
//             </div>

//             {/* Emergency Contact */}
//             <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Contact</h3>
//               <p className="text-red-600 text-sm mb-4">Available 24/7 for emergency medicines</p>
//               <a 
//                 href={`tel:${pharmacy.phone}`}
//                 className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Call Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Catalog Section */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Medicines at {pharmacy.name}</h2>
//             <p className="text-gray-600">Available for delivery in {pharmacy.deliveryTime}</p>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             {/* Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full md:w-64"
//               />
//               <svg 
//                 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Category Filters - Scrollable */}
//         <div className="mb-6">
//           <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             {categories.map(category => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                   selectedCategory === category.id
//                     ? 'bg-[var(--primary-color)] text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//           {selectedCategory !== 'all' && (
//             <div className="mt-3 flex items-center">
//               <span className="text-sm text-gray-600">Filtered by: {categories.find(c => c.id === selectedCategory)?.name}</span>
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className="ml-2 text-sm text-[var(--primary-color)] hover:underline"
//               >
//                 Clear filter
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Medicine Grid */}
//         {medicineLoading ? (
//           <div className="text-center py-12">
//             <div className="flex justify-center items-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
//             </div>
//             <p className="mt-4 text-gray-600">Loading medicines...</p>
//           </div>
//         ) : filteredMedicines.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredMedicines.map((medicine) => (
//               <MedicineCard
//                 key={medicine._id || medicine.id}
//                 medicine={medicine}
//                 addToCart={addToCart}
//                 cart={cart}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//             </svg>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">No Medicines Found</h3>
//             <p className="text-gray-500">
//               {searchTerm || selectedCategory !== 'all' 
//                 ? 'No medicines match your search criteria' 
//                 : 'This pharmacy currently has no medicines listed'}
//             </p>
//             {(searchTerm || selectedCategory !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   setSelectedCategory('all');
//                 }}
//                 className="mt-4 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
//         <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a different pharmacy?</h3>
//         <p className="text-gray-600 mb-6">Browse medicines from other trusted pharmacies in your area</p>
//         <Link
//           to="/pharmacies"
//           className="inline-flex items-center bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
//         >
//           Explore Other Pharmacies
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetailPage;





















//Hope this one will work perfect
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams(); // Changed from pharmacyId to id
//   const navigate = useNavigate();
  
//   // State for pharmacy data
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   // Categories for filtering
//   const categories = [
//     { id: 'all', name: 'All Medicines' },
//     { id: 'painkiller', name: 'Pain Relief' },
//     { id: 'fever', name: 'Fever & Cold' },
//     { id: 'vitamin', name: 'Vitamins & Supplements' },
//     { id: 'chronic', name: 'Chronic Care' },
//     { id: 'skincare', name: 'Skin Care' },
//     { id: 'babycare', name: 'Baby Care' },
//     { id: 'antibiotic', name: 'Antibiotics' },
//     { id: 'cardiac', name: 'Cardiac Care' },
//     { id: 'diabetes', name: 'Diabetes Care' }
//   ];

//   // Medicines state
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);

//   // Fetch pharmacy details from API
//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   // Fetch medicines for this pharmacy
//  useEffect(() => {
//   const fetchPharmacyMedicines = async () => {
//     try {
//       setMedicineLoading(true);
      
//       // Fetch medicines from THIS pharmacy only
//       const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//       const data = await response.json();
      
//       if (data.success) {
//         // Transform embedded medicines to match MedicineCard format
//         const formattedMedicines = data.data.map(med => ({
//           _id: `${id}_${med._id}`, // Create unique ID: pharmacyId_medicineId
//           name: med.name,
//           genericName: med.genericName,
//           description: med.description,
//           category: med.category,
//           price: med.price,
//           discountedPrice: med.discountedPrice,
//           discountPercentage: med.discountPercentage || 0,
//           image: med.image,
//           inStock: med.inStock,
//           stockQuantity: med.stockQuantity,
//           prescriptionRequired: med.prescriptionRequired || false,
//           // Add pharmacy info for cart
//           pharmacyId: id,
//           pharmacyName: pharmacy?.name
//         }));
        
//         setPharmacyMedicines(formattedMedicines);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacy medicines:', err);
//     } finally {
//       setMedicineLoading(false);
//     }
//   };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   // Filter medicines based on search and category
//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       // Fallback keyword matching
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   // Get cart items only for this pharmacy
//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       // If medicine has pharmacyIds array (added when adding to cart)
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       // If medicine has availableAtPharmacies array (from medicine data)
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       // For backward compatibility, include items without pharmacy info
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//  setCart(prevCart => {
//     // Create unique ID combining medicine name and pharmacy ID
//     const uniqueId = `${medicine.name}_${id}`;
//     const existingItem = prevCart.find(item => item.id === uniqueId);
    
//     if (existingItem) {
//       return prevCart.map(item =>
//         item.id === uniqueId
//           ? { 
//               ...item, 
//               quantity: item.quantity + 1
//             }
//           : item
//       );
//     }
    
//     return [...prevCart, { 
//       ...medicine, 
//       id: uniqueId, // Use unique ID
//       _id: medicine._id, // Keep original medicine ID
//       quantity: 1,
//       price: medicine.price || 0,
//       discountedPrice: medicine.discountedPrice,
//       name: medicine.name,
//       image: medicine.image,
//       pharmacyId: id, // Track pharmacy ID
//       pharmacyName: pharmacy.name
//     }];
//   });
// };

//   // Clear cart function - only clear items from this pharmacy
//   const clearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart for this pharmacy?')) {
//       setCart(prevCart => {
//         // Remove only items that belong to this pharmacy
//         return prevCart.filter(item => {
//           if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//             return false;
//           }
//           return true;
//         });
//       });
//     }
//   };

//   // Remove item from cart - only remove if from this pharmacy
//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => {
//       const updatedCart = prevCart.filter(item => {
//         if (item.id === medicineId) {
//           // Check if this item is from this pharmacy
//           if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//             return false; // Remove this item
//           }
//         }
//         return true; // Keep other items
//       });
//       return updatedCart;
//     });
//   };

//   // Update item quantity
//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   // Calculate total for this pharmacy's items only
//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-600">Loading pharmacy details...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !pharmacy) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">Pharmacy Not Found</h3>
//           <p className="text-gray-500">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <button
//             onClick={() => navigate('/pharmacies')}
//             className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Back to Pharmacies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate('/pharmacies')}
//         className="flex items-center text-gray-600 hover:text-[var(--primary-color)] mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back to Pharmacies
//       </button>

//       {/* Pharmacy Banner */}
//       <div className="relative rounded-2xl overflow-hidden mb-8">
//         <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-cyan-500">
//           <img 
//             src={pharmacy.bannerImage} 
//             alt={pharmacy.name}
//             className="w-full h-full object-cover opacity-20"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600';
//             }}
//           />
//         </div>
//         <div className="absolute inset-0 flex items-center p-8">
//           <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                   }}
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-3">{pharmacy.address}</p>
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="flex items-center">
//                     <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-gray-500 text-sm ml-1">({pharmacy.totalReviews || 0} reviews)</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {pharmacy.distance} away
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Delivery: {pharmacy.deliveryTime || '15-20 mins'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Count Summary */}
//       <div className="mb-6 p-4 bg-blue-50 rounded-xl">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h3 className="font-bold text-gray-900">{pharmacyMedicines.length} Medicines Available</h3>
//             <p className="text-gray-600 text-sm">
//               {medicineLoading ? 'Loading medicines...' : `${filteredMedicines.length} match your search ${selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.name}`}`}
//             </p>
//           </div>
//           <div className="mt-2 md:mt-0">
//             <p className="text-sm text-gray-600">
//               Showing medicines available at <span className="font-bold">{pharmacy.name}</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Pharmacy Details Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Left Column - Services & Info */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Services */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {pharmacy.services && pharmacy.services.map((service, index) => (
//                 <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                   <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-700">{service}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Opening Hours */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h2>
//             <div className="space-y-3">
//               {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                 <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                   <span className="font-medium text-gray-700 capitalize">{day}</span>
//                   <span className="text-gray-600">{hours}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 <a href={`tel:${pharmacy.phone}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.phone}
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 <a href={`mailto:${pharmacy.email}`} className="text-[var(--primary-color)] hover:underline">
//                   {pharmacy.email}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Order Summary (Fixed Position) */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-6">
//             {/* Order Summary */}
//             <div className="bg-white rounded-xl shadow-lg border p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold text-gray-900">Your Order ({getPharmacyCartItems().length})</h3>
//                 {getPharmacyCartItems().length > 0 && (
//                   <button
//                     onClick={clearCart}
//                     className="text-sm text-red-600 hover:text-red-800 flex items-center"
//                   >
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Clear Cart
//                   </button>
//                 )}
//               </div>
              
//               {getPharmacyCartItems().length === 0 ? (
//                 <div className="text-center py-6">
//                   <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   <p className="text-gray-500">Your cart is empty</p>
//                   <p className="text-gray-400 text-sm mt-1">Add medicines from {pharmacy.name} to get started</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Cart Items */}
//                   <div className="max-h-60 overflow-y-auto mb-4">
//                     {getPharmacyCartItems().map((item) => (
//                       <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-800 truncate">{item.name}</p>
//                           <p className="text-sm text-gray-500">Rs. {item.discountedPrice || item.price || 0} × {item.quantity}</p>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">-</span>
//                           </button>
//                           <span className="w-8 text-center font-medium">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                           >
//                             <span className="text-gray-600">+</span>
//                           </button>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="ml-2 text-red-500 hover:text-red-700"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Order Summary */}
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Items ({getPharmacyCartItems().length}):</span>
//                       <span className="font-medium">Rs. {calculateTotal()}</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Delivery:</span>
//                       <span className="font-medium">Free</span>
//                     </div>
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-gray-600">Delivery to:</span>
//                       <span className="font-medium text-gray-900">{pharmacy.distance}</span>
//                     </div>
//                     <div className="border-t pt-4">
//                       <div className="flex justify-between items-center text-lg font-bold">
//                         <span>Total:</span>
//                         <span>Rs. {calculateTotal()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
              
//               <Link
//                 to="/booking"
//                 className={`w-full mt-4 bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors block ${
//                   getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 Proceed to Checkout ({getPharmacyCartItems().length})
//               </Link>
//             </div>

//             {/* Emergency Contact */}
//             <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Contact</h3>
//               <p className="text-red-600 text-sm mb-4">Available 24/7 for emergency medicines</p>
//               <a 
//                 href={`tel:${pharmacy.phone}`}
//                 className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Call Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medicine Catalog Section */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Medicines at {pharmacy.name}</h2>
//             <p className="text-gray-600">Available for delivery in {pharmacy.deliveryTime}</p>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             {/* Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full md:w-64"
//               />
//               <svg 
//                 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Category Filters - Scrollable */}
//         <div className="mb-6">
//           <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             {categories.map(category => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                   selectedCategory === category.id
//                     ? 'bg-[var(--primary-color)] text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//           {selectedCategory !== 'all' && (
//             <div className="mt-3 flex items-center">
//               <span className="text-sm text-gray-600">Filtered by: {categories.find(c => c.id === selectedCategory)?.name}</span>
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className="ml-2 text-sm text-[var(--primary-color)] hover:underline"
//               >
//                 Clear filter
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Medicine Grid */}
//         {medicineLoading ? (
//           <div className="text-center py-12">
//             <div className="flex justify-center items-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
//             </div>
//             <p className="mt-4 text-gray-600">Loading medicines...</p>
//           </div>
//         ) : filteredMedicines.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredMedicines.map((medicine) => (
//               <MedicineCard
//                 key={medicine._id}
//                 medicine={medicine}
//                 onAddToCart={addToCart}
//                 context="pharmacy-detail"
//                 cart={cart}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//             </svg>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">No Medicines Found</h3>
//             <p className="text-gray-500">
//               {searchTerm || selectedCategory !== 'all' 
//                 ? 'No medicines match your search criteria' 
//                 : 'This pharmacy currently has no medicines listed'}
//             </p>
//             {(searchTerm || selectedCategory !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   setSelectedCategory('all');
//                 }}
//                 className="mt-4 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
//         <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a different pharmacy?</h3>
//         <p className="text-gray-600 mb-6">Browse medicines from other trusted pharmacies in your area</p>
//         <Link
//           to="/pharmacies"
//           className="inline-flex items-center bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
//         >
//           Explore Other Pharmacies
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetailPage;

















//---------------------New Layout check--------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [showAllCategories, setShowAllCategories] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: '💊' },
//     { id: 'painkiller', name: 'Pain Relief', icon: '🩹' },
//     { id: 'fever', name: 'Fever & Cold', icon: '🤒' },
//     { id: 'vitamin', name: 'Vitamins', icon: '💪' },
//     { id: 'chronic', name: 'Chronic Care', icon: '🫀' },
//     { id: 'skincare', name: 'Skin Care', icon: '✨' },
//     { id: 'babycare', name: 'Baby Care', icon: '👶' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: '🦠' },
//     { id: 'cardiac', name: 'Cardiac', icon: '❤️' },
//     { id: 'diabetes', name: 'Diabetes', icon: '🩸' }
//   ];

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') return matchesSearch;
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart for this pharmacy?')) {
//       setCart(prevCart => prevCart.filter(item => {
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) return false;
//         return true;
//       }));
//     }
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => {
//       if (item.id === medicineId) {
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) return false;
//       }
//       return true;
//     }));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   const visibleCategories = showAllCategories ? categories : categories.slice(0, 6);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//         <div className="container mx-auto px-4 py-12">
//           <div className="flex flex-col items-center justify-center h-64">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
//               </div>
//             </div>
//             <p className="mt-6 text-lg font-medium text-gray-700">Loading pharmacy details...</p>
//             <p className="text-sm text-gray-500">Fetching the best medicines for you</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//         <div className="container mx-auto px-4 py-12">
//           <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
//             <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
//               <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">Pharmacy Not Found</h3>
//             <p className="text-gray-600 mb-6">{error || 'The pharmacy you are looking for does not exist or has been moved.'}</p>
//             <div className="space-x-4">
//               <button
//                 onClick={() => navigate('/pharmacies')}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
//               >
//                 Browse Pharmacies
//               </button>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
//               >
//                 Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Back Button */}
//       <div className="container mx-auto px-4 pt-6">
//         <button 
//           onClick={() => navigate('/pharmacies')}
//           className="inline-flex items-center text-gray-600 hover:text-blue-600 group transition-colors"
//         >
//           <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           <span className="font-medium">Back to Pharmacies</span>
//         </button>
//       </div>

//       {/* Pharmacy Hero Section */}
//       <div className="container mx-auto px-4 py-6">
//         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 shadow-xl">
//           <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
//           <div className="relative p-8 md:p-12">
//             <div className="flex flex-col md:flex-row items-center gap-8">
//               {/* Pharmacy Logo */}
//               <div className="relative">
//                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white p-2 shadow-2xl">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover rounded-xl"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
//                 <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold ${pharmacy.open ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'}`}>
//                   {pharmacy.open ? 'OPEN' : 'CLOSED'}
//                 </div>
//               </div>

//               {/* Pharmacy Info */}
//               <div className="flex-1 text-white">
//                 <div className="flex flex-wrap items-center gap-3 mb-3">
//                   <h1 className="text-3xl md:text-4xl font-bold">{pharmacy.name}</h1>
//                   <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
//                     <svg className="w-4 h-4 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <span className="font-bold">{pharmacy.rating || '4.0'}</span>
//                     <span className="text-white/80 text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                   </div>
//                 </div>
                
//                 <p className="text-lg text-white/90 mb-6 max-w-2xl">{pharmacy.address}</p>
                
//                 <div className="flex flex-wrap gap-6">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
//                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-white/70">Distance</p>
//                       <p className="font-bold">{pharmacy.distance}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
//                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-white/70">Delivery Time</p>
//                       <p className="font-bold">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
//                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-white/70">Phone</p>
//                       <a href={`tel:${pharmacy.phone}`} className="font-bold hover:underline">{pharmacy.phone}</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Medicine Count Summary */}
//         <div className="mt-8 p-6 bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-sm border border-blue-100">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900">{pharmacyMedicines.length} Medicines Available</h3>
//                 <p className="text-gray-600">
//                   {medicineLoading ? 'Loading medicines...' : `${filteredMedicines.length} match your search`}
//                   {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg border border-green-100">
//                 <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
//                 <span className="text-sm font-medium text-green-800">Active & Delivering</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Pharmacy Details & Medicines */}
//           <div className="lg:col-span-2">
//             {/* Search and Filters */}
//             <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="flex-1">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Search Medicines</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search by name, generic name, or description..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                     <svg 
//                       className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" 
//                       fill="none" 
//                       stroke="currentColor" 
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                     {searchTerm && (
//                       <button
//                         onClick={() => setSearchTerm('')}
//                         className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="md:w-48">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
//                   <select
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
//                   >
//                     <option>Relevance</option>
//                     <option>Price: Low to High</option>
//                     <option>Price: High to Low</option>
//                     <option>Rating</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Category Filters */}
//               <div className="mt-6">
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">Browse Categories</label>
//                 <div className="flex flex-wrap gap-2">
//                   {visibleCategories.map(category => (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
//                         selectedCategory === category.id
//                           ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md transform -translate-y-0.5'
//                           : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
//                       }`}
//                     >
//                       <span className="mr-2 text-lg">{category.icon}</span>
//                       <span className="font-medium">{category.name}</span>
//                     </button>
//                   ))}
                  
//                   {categories.length > 6 && (
//                     <button
//                       onClick={() => setShowAllCategories(!showAllCategories)}
//                       className="px-4 py-2.5 text-blue-600 hover:text-blue-700 font-medium transition-colors"
//                     >
//                       {showAllCategories ? 'Show Less' : `+${categories.length - 6} More`}
//                     </button>
//                   )}
//                 </div>
                
//                 {selectedCategory !== 'all' && (
//                   <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//                     <div className="flex items-center">
//                       <span className="text-blue-700 font-medium">
//                         Filtered by: {categories.find(c => c.id === selectedCategory)?.name}
//                       </span>
//                       <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                         {filteredMedicines.length} items
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => setSelectedCategory('all')}
//                       className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
//                     >
//                       Clear filter
//                       <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Medicine Grid */}
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                   <p className="text-gray-600">Prescription and OTC medicines available</p>
//                 </div>
//                 <div className="hidden md:flex items-center space-x-2">
//                   <span className="text-sm text-gray-500">Showing</span>
//                   <span className="font-bold text-gray-900">{filteredMedicines.length}</span>
//                   <span className="text-sm text-gray-500">of {pharmacyMedicines.length} items</span>
//                 </div>
//               </div>

//               {medicineLoading ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[1, 2, 3, 4, 5, 6].map(i => (
//                     <div key={i} className="bg-white rounded-xl border p-6 animate-pulse">
//                       <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
//                       <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                       <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
//                       <div className="h-10 bg-gray-200 rounded"></div>
//                     </div>
//                   ))}
//                 </div>
//               ) : filteredMedicines.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredMedicines.map((medicine) => (
//                     <div key={medicine._id} className="transform transition-transform hover:-translate-y-1">
//                       <MedicineCard
//                         medicine={medicine}
//                         onAddToCart={addToCart}
//                         context="pharmacy-detail"
//                         cart={cart}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 shadow-sm">
//                   <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
//                     <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-3">No Medicines Found</h3>
//                   <p className="text-gray-600 max-w-md mx-auto mb-8">
//                     {searchTerm || selectedCategory !== 'all' 
//                       ? 'We couldn\'t find any medicines matching your search criteria.' 
//                       : 'This pharmacy will have medicines available soon.'}
//                   </p>
//                   {(searchTerm || selectedCategory !== 'all') && (
//                     <button
//                       onClick={() => {
//                         setSearchTerm('');
//                         setSelectedCategory('all');
//                       }}
//                       className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
//                     >
//                       Reset Filters
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Services & Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//               <div className="bg-white rounded-2xl border p-6">
//                 <div className="flex items-center mb-4">
//                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Services Offered</h3>
//                 </div>
//                 <div className="space-y-2">
//                   {pharmacy.services && pharmacy.services.slice(0, 4).map((service, index) => (
//                     <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                       <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span className="text-gray-700">{service}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl border p-6">
//                 <div className="flex items-center mb-4">
//                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Opening Hours</h3>
//                 </div>
//                 <div className="space-y-2">
//                   {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                     <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded transition-colors">
//                       <span className="font-medium text-gray-700 capitalize">{day}</span>
//                       <span className={`font-medium ${hours.toLowerCase().includes('closed') ? 'text-red-600' : 'text-green-600'}`}>
//                         {hours}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Cart & Info */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Cart Summary */}
//               <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg border overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-xl font-bold text-white">Your Cart</h3>
//                     <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
//                       <svg className="w-4 h-4 text-white mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       <span className="font-bold text-white">{getPharmacyCartItems().length}</span>
//                       <span className="text-white/80 text-sm ml-1">items</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <h4 className="text-lg font-bold text-gray-700 mb-2">Your cart is empty</h4>
//                       <p className="text-gray-500 text-sm">Add medicines from {pharmacy.name} to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="bg-white rounded-xl border p-4 hover:shadow-sm transition-shadow">
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <p className="font-bold text-gray-800 truncate">{item.name}</p>
//                                 <p className="text-sm text-gray-500 mt-1">Rs. {item.discountedPrice || item.price || 0} each</p>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <div className="flex items-center bg-gray-100 rounded-lg">
//                                   <button
//                                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                     className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-l-lg transition-colors"
//                                   >
//                                     <span className="text-gray-600 font-bold">-</span>
//                                   </button>
//                                   <span className="w-8 text-center font-bold">{item.quantity}</span>
//                                   <button
//                                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                     className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-r-lg transition-colors"
//                                   >
//                                     <span className="text-gray-600 font-bold">+</span>
//                                   </button>
//                                 </div>
//                                 <button
//                                   onClick={() => removeFromCart(item.id)}
//                                   className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                                 >
//                                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                   </svg>
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="mt-3 flex justify-between items-center pt-3 border-t border-gray-100">
//                               <span className="text-sm text-gray-600">Total</span>
//                               <span className="font-bold text-gray-900">
//                                 Rs. {(item.discountedPrice || item.price || 0) * item.quantity}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="mt-6 pt-6 border-t border-gray-200">
//                         <div className="space-y-3">
//                           <div className="flex justify-between items-center">
//                             <span className="text-gray-600">Subtotal</span>
//                             <span className="font-bold text-gray-900">Rs. {calculateTotal()}</span>
//                           </div>
//                           <div className="flex justify-between items-center">
//                             <span className="text-gray-600">Delivery Fee</span>
//                             <span className="text-green-600 font-bold">FREE</span>
//                           </div>
//                           <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200">
//                             <span>Total Amount</span>
//                             <span>Rs. {calculateTotal()}</span>
//                           </div>
//                         </div>

//                         {getPharmacyCartItems().length > 0 && (
//                           <div className="mt-6 flex gap-3">
//                             <button
//                               onClick={clearCart}
//                               className="flex-1 px-4 py-3 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center"
//                             >
//                               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                               </svg>
//                               Clear Cart
//                             </button>
//                             <Link
//                               to="/booking"
//                               className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold text-center hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
//                             >
//                               Checkout
//                             </Link>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Emergency Contact */}
//               <div className="relative overflow-hidden rounded-2xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500"></div>
//                 <div className="relative p-6">
//                   <div className="flex items-center mb-4">
//                     <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
//                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-white">24/7 Emergency</h3>
//                       <p className="text-white/90 text-sm">Available for urgent needs</p>
//                     </div>
//                   </div>
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="block w-full bg-white text-red-600 py-4 rounded-xl font-bold text-center hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                   >
//                     <div className="flex items-center justify-center">
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </div>
//                   </a>
//                 </div>
//               </div>

//               {/* Pharmacy Contact */}
//               <div className="bg-white rounded-2xl border p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Pharmacy</h3>
//                 <div className="space-y-4">
//                   <a href={`tel:${pharmacy.phone}`} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
//                       <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Phone Number</p>
//                       <p className="font-bold text-gray-900">{pharmacy.phone}</p>
//                     </div>
//                   </a>
                  
//                   <a href={`mailto:${pharmacy.email}`} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
//                       <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Email Address</p>
//                       <p className="font-bold text-gray-900 truncate">{pharmacy.email}</p>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 p-8 md:p-12 shadow-xl">
//           <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
//           <div className="relative text-center">
//             <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need a different pharmacy?</h3>
//             <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">Browse medicines from other trusted pharmacies in your area with same-day delivery</p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
//               >
//                 Explore Other Pharmacies
//                 <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//               <button
//                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                 className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all transform hover:-translate-y-0.5"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
//                 </svg>
//                 Back to Top
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetailPage;



































//       experimental layout
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
//   };

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart for this pharmacy?')) {
//       setCart(prevCart => {
//         return prevCart.filter(item => {
//           if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//             return false;
//           }
//           return true;
//         });
//       });
//     }
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => {
//       const updatedCart = prevCart.filter(item => {
//         if (item.id === medicineId) {
//           if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//             return false;
//           }
//         }
//         return true;
//       });
//       return updatedCart;
//     });
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div className="max-w-3xl">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
//               >
//                 <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-6">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
//                     <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-4">
//                     <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
//                 <div className="text-sm text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-sm text-[#c0d3dc]">Service Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Tabs */}
//         <div className="container mx-auto px-4 -mb-6 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-2xl shadow-lg">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Overview
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//                 Medicines ({pharmacyMedicines.length})
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 Services
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* Pharmacy Overview */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Address</p>
//                             <p className="text-gray-600">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Delivery Time</p>
//                             <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
//                         <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Opening Hours */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
//                   <div className="space-y-4">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774]">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-8">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines by name, generic name, or description..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
//                         />
//                         <svg 
//                           className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => {
//                           setSearchTerm('');
//                           setSelectedCategory('all');
//                         }}
//                         className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Reset
//                       </button>
//                     </div>
//                   </div>

//                   {/* Category Filters */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map(category => (
//                         <button
//                           key={category.id}
//                           onClick={() => setSelectedCategory(category.id)}
//                           className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                             selectedCategory === category.id
//                               ? 'bg-[#2c6774] text-white shadow-md'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
//                           }`}
//                         >
//                           {getCategoryIcon(category.icon)}
//                           {category.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 mt-1">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                       </svg>
//                       <span className="text-sm text-gray-600">Stock updated today</span>
//                     </div>
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-16 bg-white rounded-2xl">
//                       <div className="flex justify-center">
//                         <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-4 text-gray-600">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {filteredMedicines.map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//                       <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'No medicines match your search criteria' 
//                           : 'This pharmacy currently has no medicines listed'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
//                         >
//                           Clear Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-8">
//                 {/* Services */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                         <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Services */}
//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
//                       <p className="text-red-600">Available for urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                   <h3 className="text-lg font-bold flex items-center gap-2">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                     </svg>
//                     Your Order ({getPharmacyCartItems().length})
//                   </h3>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 mb-2">Your cart is empty</p>
//                       <p className="text-gray-500 text-sm">Add medicines to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                             <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate">{item.name}</p>
//                               <p className="text-sm text-gray-600">Rs. {item.discountedPrice || item.price || 0}</p>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
//                               >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//                                 </svg>
//                               </button>
//                               <span className="w-8 text-center font-medium">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
//                               >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                 </svg>
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="space-y-3 border-t pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {calculateTotal()}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold">
//                             <span>Total:</span>
//                             <span className="text-[#2c6774]">Rs. {calculateTotal()}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex gap-3 mt-6">
//                         <Link
//                           to="/booking"
//                           className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 ${
//                             getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                           onClick={(e) => {
//                             if (getPharmacyCartItems().length === 0) e.preventDefault();
//                           }}
//                         >
//                           Checkout
//                         </Link>
//                         <button
//                           onClick={clearCart}
//                           className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//                 <div className="space-y-3">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     Call Pharmacy
//                   </a>
                  
//                   <button className="flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors w-full">
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     Get Directions
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <svg className="w-5 h-5 text-[#2c6774] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800">Delivery Time</p>
//                       <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center">
//                     <svg className="w-5 h-5 text-[#2c6774] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800">Free Delivery</p>
//                       <p className="text-gray-600">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-8 md:p-12 overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-[#5c878f] rounded-full -translate-y-32 translate-x-16 opacity-20"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//               <div className="text-center lg:text-left">
//                 <h3 className="text-2xl font-bold text-white mb-3">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] max-w-lg">
//                   Browse our complete network of trusted pharmacies in your area
//                 </p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
//               >
//                 Explore All Pharmacies
//                 <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetailPage;
























//-----------------------Excellent Layout UI/UX--------------
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showClearCartModal, setShowClearCartModal] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
//   };

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     setCart(prevCart => {
//       return prevCart.filter(item => {
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => {
//       const updatedCart = prevCart.filter(item => {
//         if (item.id === medicineId) {
//           if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//             return false;
//           }
//         }
//         return true;
//       });
//       return updatedCart;
//     });
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   // Clear Cart Modal Component
//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-6">
//               <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <p className="text-center text-gray-700">
//                 Are you sure you want to remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-2">
//                 This will clear {getPharmacyCartItems().length} item(s) from {pharmacy.name}
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Clear Cart Modal */}
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div className="max-w-3xl">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
//               >
//                 <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-6">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
//                     <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-4">
//                     <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
//                 <div className="text-sm text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-sm text-[#c0d3dc]">Service Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Tabs */}
//         <div className="container mx-auto px-4 -mb-6 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-2xl shadow-lg">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Overview
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//                 Medicines ({pharmacyMedicines.length})
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 Services
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* Pharmacy Overview */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Address</p>
//                             <p className="text-gray-600">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Delivery Time</p>
//                             <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
//                         <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Opening Hours */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
//                   <div className="space-y-4">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774]">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-8">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines by name, generic name, or description..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
//                         />
//                         <svg 
//                           className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => {
//                           setSearchTerm('');
//                           setSelectedCategory('all');
//                         }}
//                         className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Reset
//                       </button>
//                     </div>
//                   </div>

//                   {/* Category Filters */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map(category => (
//                         <button
//                           key={category.id}
//                           onClick={() => setSelectedCategory(category.id)}
//                           className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                             selectedCategory === category.id
//                               ? 'bg-[#2c6774] text-white shadow-md'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
//                           }`}
//                         >
//                           {getCategoryIcon(category.icon)}
//                           {category.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 mt-1">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                       </svg>
//                       <span className="text-sm text-gray-600">Stock updated today</span>
//                     </div>
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-16 bg-white rounded-2xl">
//                       <div className="flex justify-center">
//                         <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-4 text-gray-600">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
//                       {filteredMedicines.map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//                       <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'No medicines match your search criteria' 
//                           : 'This pharmacy currently has no medicines listed'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
//                         >
//                           Clear Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-8">
//                 {/* Services */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                         <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Services */}
//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
//                       <p className="text-red-600">Available for urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Your Order ({getPharmacyCartItems().length})
//                     </h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 mb-2">Your cart is empty</p>
//                       <p className="text-gray-500 text-sm">Add medicines to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Cart Items - Mobile Optimized */}
//                       <div className="space-y-3 max-h-72 overflow-y-auto mb-6 pr-2">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             <div className="relative">
//                               <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//                                 {item.image && (
//                                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                                 )}
//                               </div>
//                               {/* Item quantity badge */}
//                               <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#2c6774] text-white text-xs rounded-full flex items-center justify-center font-bold">
//                                 {item.quantity}
//                               </div>
//                             </div>
//                             <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//   {/* Medicine Image without badge */}
//   <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//     {item.image && (
//       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//     )}
//   </div>
  
//   <div className="flex-1 min-w-0">
//     <p className="font-medium text-gray-800 truncate text-sm md:text-base">{item.name}</p>
//     <p className="text-sm text-gray-600">Rs. {(item.discountedPrice || item.price || 0) * item.quantity}</p>
//   </div>
  
//   <div className="flex items-center gap-1">
//     {/* quantity controls remain the same */}
//     <button
//       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//       className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
//       aria-label="Decrease quantity"
//     >
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//       </svg>
//     </button>
//     <span className="w-6 text-center font-medium text-sm md:text-base">{item.quantity}</span>
//     <button
//       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//       className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
//       aria-label="Increase quantity"
//     >
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//       </svg>
//     </button>
//     <button
//       onClick={() => removeFromCart(item.id)}
//       className="ml-1 w-7 h-7 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
//       aria-label="Remove item"
//     >
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//       </svg>
//     </button>
//   </div>
// </div>
                       

//                       {/* Order Summary */}
//                       <div className="space-y-3 border-t pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {calculateTotal()}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold">
//                             <span>Total:</span>
//                             <span className="text-[#2c6774]">Rs. {calculateTotal()}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Checkout Button - Mobile Optimized */}
//                       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                         <Link
//                           to="/booking"
//                           className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm md:text-base ${
//                             getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                           onClick={(e) => {
//                             if (getPharmacyCartItems().length === 0) e.preventDefault();
//                           }}
//                         >
//                           Proceed to Checkout
//                         </Link>
//                         <button
//                           onClick={() => setShowClearCartModal(true)}
//                           className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           <span className="hidden sm:inline">Clear</span>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//            </div>

//               {/* Quick Actions - Mobile Optimized */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center"
//                   >
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <span className="text-sm">Call Pharmacy</span>
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center">
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm">Directions</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info - Mobile Optimized */}
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Delivery Time</p>
//                       <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
//                       <p className="text-gray-600 text-sm">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner - Mobile Optimized */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 md:p-12 overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#5c878f] rounded-full -translate-y-20 md:-translate-y-32 translate-x-10 md:translate-x-16 opacity-20"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//               <div className="text-center lg:text-left">
//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-sm md:text-base max-w-lg">
//                   Browse our complete network of trusted pharmacies
//                 </p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center text-sm md:text-base"
//               >
//                 Explore All Pharmacies
//                 <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar (for mobile devices) */}
//       {getPharmacyCartItems().length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center font-bold">
//                   {getPharmacyCartItems().length}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Rs. {calculateTotal()}</p>
//                   <p className="text-xs text-gray-500">Total for {pharmacy.name}</p>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300"
//             >
//               Checkout
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         /* Mobile padding for bottom cart bar */
//         @media (max-width: 1024px) {
//           .pb-safe {
//             padding-bottom: 5rem;
//           }
//         }
//       `}</style>
      
//       {/* Add bottom padding on mobile when cart has items */}
//       {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;

































































//--------------error fixed----------------
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showClearCartModal, setShowClearCartModal] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
//   };

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     setCart(prevCart => {
//       return prevCart.filter(item => {
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   // FIXED: Simple remove from cart function
//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   // Clear Cart Modal Component
//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-6">
//               <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <p className="text-center text-gray-700">
//                 Are you sure you want to remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-2">
//                 This will clear {getPharmacyCartItems().length} item(s) from {pharmacy.name}
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Clear Cart Modal */}
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div className="max-w-3xl">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
//               >
//                 <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-6">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
//                     <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-4">
//                     <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
//                 <div className="text-sm text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-sm text-[#c0d3dc]">Service Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Tabs */}
//         <div className="container mx-auto px-4 -mb-6 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-2xl shadow-lg">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Overview
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//                 Medicines ({pharmacyMedicines.length})
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 Services
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* Pharmacy Overview */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Address</p>
//                             <p className="text-gray-600">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Delivery Time</p>
//                             <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
//                         <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Opening Hours */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
//                   <div className="space-y-4">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774]">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-8">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines by name, generic name, or description..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
//                         />
//                         <svg 
//                           className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => {
//                           setSearchTerm('');
//                           setSelectedCategory('all');
//                         }}
//                         className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Reset
//                       </button>
//                     </div>
//                   </div>

//                   {/* Category Filters */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map(category => (
//                         <button
//                           key={category.id}
//                           onClick={() => setSelectedCategory(category.id)}
//                           className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                             selectedCategory === category.id
//                               ? 'bg-[#2c6774] text-white shadow-md'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
//                           }`}
//                         >
//                           {getCategoryIcon(category.icon)}
//                           {category.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 mt-1">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                       </svg>
//                       <span className="text-sm text-gray-600">Stock updated today</span>
//                     </div>
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-16 bg-white rounded-2xl">
//                       <div className="flex justify-center">
//                         <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-4 text-gray-600">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
//                       {filteredMedicines.map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//                       <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'No medicines match your search criteria' 
//                           : 'This pharmacy currently has no medicines listed'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
//                         >
//                           Clear Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-8">
//                 {/* Services */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                         <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Services */}
//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
//                       <p className="text-red-600">Available for urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Order Summary Card - FIXED VERSION */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Your Order ({getPharmacyCartItems().length})
//                     </h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 mb-2">Your cart is empty</p>
//                       <p className="text-gray-500 text-sm">Add medicines to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Cart Items - COMPACT VERSION WITHOUT BADGE */}
//                       <div className="space-y-2 max-h-72 overflow-y-auto mb-6 pr-2">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             {/* Medicine Image - WITHOUT BADGE */}
//                             <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
                            
//                             {/* Medicine Details */}
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate text-sm">{item.name}</p>
//                               <p className="text-xs text-gray-600">Rs. {(item.discountedPrice || item.price || 0) * item.quantity}</p>
//                             </div>
                            
//                             {/* Quantity Controls */}
//                             <div className="flex items-center gap-1">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Decrease quantity"
//                               >
//                                 -
//                               </button>
//                               <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Increase quantity"
//                               >
//                                 +
//                               </button>
//                               <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-1 w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
//                                 aria-label="Remove item"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Order Summary */}
//                       <div className="space-y-3 border-t pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {calculateTotal()}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold">
//                             <span>Total:</span>
//                             <span className="text-[#2c6774]">Rs. {calculateTotal()}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Checkout Button */}
//                       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                         <Link
//                           to="/booking"
//                           className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm md:text-base ${
//                             getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                           onClick={(e) => {
//                             if (getPharmacyCartItems().length === 0) e.preventDefault();
//                           }}
//                         >
//                           Proceed to Checkout
//                         </Link>
//                         <button
//                           onClick={() => setShowClearCartModal(true)}
//                           className="px-4 py-3 border border-red-300 text-red-600 rounded-xl hover:border-red-400 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           <span>Clear Cart</span>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center"
//                   >
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <span className="text-sm">Call Pharmacy</span>
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center">
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm">Directions</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Delivery Time</p>
//                       <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
//                       <p className="text-gray-600 text-sm">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 md:p-12 overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#5c878f] rounded-full -translate-y-20 md:-translate-y-32 translate-x-10 md:translate-x-16 opacity-20"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//               <div className="text-center lg:text-left">
//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-sm md:text-base max-w-lg">
//                   Browse our complete network of trusted pharmacies
//                 </p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center text-sm md:text-base"
//               >
//                 Explore All Pharmacies
//                 <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar */}
//       {getPharmacyCartItems().length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center font-bold">
//                   {getPharmacyCartItems().length}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Rs. {calculateTotal()}</p>
//                   <p className="text-xs text-gray-500">Total for {pharmacy.name}</p>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300"
//             >
//               Checkout
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         /* Mobile padding for bottom cart bar */
//         @media (max-width: 1024px) {
//           .pb-safe {
//             padding-bottom: 5rem;
//           }
//         }
//       `}</style>
      
//       {/* Add bottom padding on mobile when cart has items */}
//       {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;






















// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showClearCartModal, setShowClearCartModal] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
//   };

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     setCart(prevCart => {
//       return prevCart.filter(item => {
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   const formatPrice = (price) => {
//     // Format price to avoid long decimal numbers
//     if (typeof price === 'number') {
//       return price.toFixed(2);
//     }
//     return '0.00';
//   };

//   // Clear Cart Modal Component
//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-6">
//               <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <p className="text-center text-gray-700">
//                 Are you sure you want to remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-2">
//                 This will clear {getPharmacyCartItems().length} item(s) from {pharmacy.name}
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#1e4e56] hover:to-[#2c6774] transition-colors"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Clear Cart Modal */}
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div className="max-w-3xl">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
//               >
//                 <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-6">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
//                     <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-4">
//                     <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
//                 <div className="text-sm text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-sm text-[#c0d3dc]">Service Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Tabs */}
//         <div className="container mx-auto px-4 -mb-6 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-2xl shadow-lg">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Overview
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//                 Medicines ({pharmacyMedicines.length})
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 Services
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* Pharmacy Overview */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Address</p>
//                             <p className="text-gray-600">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Delivery Time</p>
//                             <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
//                         <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Opening Hours */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
//                   <div className="space-y-4">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774]">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-8">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines by name, generic name, or description..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
//                         />
//                         <svg 
//                           className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => {
//                           setSearchTerm('');
//                           setSelectedCategory('all');
//                         }}
//                         className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Reset
//                       </button>
//                     </div>
//                   </div>

//                   {/* Category Filters */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map(category => (
//                         <button
//                           key={category.id}
//                           onClick={() => setSelectedCategory(category.id)}
//                           className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                             selectedCategory === category.id
//                               ? 'bg-[#2c6774] text-white shadow-md'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
//                           }`}
//                         >
//                           {getCategoryIcon(category.icon)}
//                           {category.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 mt-1">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                     {/* REMOVED: Stock updated today section */}
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-16 bg-white rounded-2xl">
//                       <div className="flex justify-center">
//                         <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-4 text-gray-600">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
//                       {filteredMedicines.map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//                       <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'No medicines match your search criteria' 
//                           : 'This pharmacy currently has no medicines listed'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
//                         >
//                           Clear Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-8">
//                 {/* Services */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                         <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Services */}
//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
//                       <p className="text-red-600">Available for urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Your Order ({getPharmacyCartItems().length})
//                     </h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 mb-2">Your cart is empty</p>
//                       <p className="text-gray-500 text-sm">Add medicines to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Cart Items */}
//                       <div className="space-y-2 max-h-72 overflow-y-auto mb-6 pr-2">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             {/* Medicine Image */}
//                             <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
                            
//                             {/* Medicine Details */}
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate text-sm">{item.name}</p>
//                               <p className="text-xs text-gray-600">Rs. {formatPrice((item.discountedPrice || item.price || 0) * item.quantity)}</p>
//                             </div>
                            
//                             {/* Quantity Controls */}
//                             <div className="flex items-center gap-1">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Decrease quantity"
//                               >
//                                 -
//                               </button>
//                               <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Increase quantity"
//                               >
//                                 +
//                               </button>
//                               <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-1 w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
//                                 aria-label="Remove item"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Order Summary */}
//                       <div className="space-y-3 border-t pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {formatPrice(calculateTotal())}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold">
//                             <span>Total:</span>
//                             <span className="text-[#2c6774]">Rs. {formatPrice(calculateTotal())}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Checkout Button */}
//                       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                         <Link
//                           to="/booking"
//                           className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm md:text-base ${
//                             getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                           onClick={(e) => {
//                             if (getPharmacyCartItems().length === 0) e.preventDefault();
//                           }}
//                         >
//                           Proceed to Checkout
//                         </Link>
//                         <button
//                           onClick={() => setShowClearCartModal(true)}
//                           className="px-4 py-3 border border-[#2c6774] text-[#2c6774] rounded-xl hover:border-[#1e4e56] hover:bg-[#2c6774]/5 transition-colors flex items-center justify-center gap-2"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           <span>Clear Cart</span>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center"
//                   >
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <span className="text-sm">Call Pharmacy</span>
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center">
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm">Directions</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Delivery Time</p>
//                       <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
//                       <p className="text-gray-600 text-sm">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 md:p-12 overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#5c878f] rounded-full -translate-y-20 md:-translate-y-32 translate-x-10 md:translate-x-16 opacity-20"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//               <div className="text-center lg:text-left">
//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-sm md:text-base max-w-lg">
//                   Browse our complete network of trusted pharmacies
//                 </p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center text-sm md:text-base"
//               >
//                 Explore All Pharmacies
//                 <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar */}
//       {getPharmacyCartItems().length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center font-bold">
//                   {getPharmacyCartItems().length}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Rs. {formatPrice(calculateTotal())}</p>
//                   <p className="text-xs text-gray-500">Total for {pharmacy.name}</p>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300"
//             >
//               Checkout
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         /* Mobile padding for bottom cart bar */
//         @media (max-width: 1024px) {
//           .pb-safe {
//             padding-bottom: 5rem;
//           }
//         }
//       `}</style>
      
//       {/* Add bottom padding on mobile when cart has items */}
//       {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;










import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MedicineCard from './MedicineCard.jsx';

const PharmacyDetailPage = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
  const [medicineLoading, setMedicineLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Medicines', icon: 'medkit' },
    { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
    { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
    { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
    { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
    { id: 'skincare', name: 'Skin Care', icon: 'skin' },
    { id: 'babycare', name: 'Baby Care', icon: 'baby' },
    { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
    { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
    { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
  ];

  const getCategoryIcon = (iconName) => {
    const icons = {
      medkit: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      bandage: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      thermometer: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      capsule: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      ),
      heart: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      skin: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      baby: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      shield: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      activity: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      blood: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    return icons[iconName] || icons.medkit;
  };

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setPharmacy(data.data);
        } else {
          setError('Pharmacy not found');
          navigate('/pharmacies');
        }
      } catch (err) {
        console.error('Error fetching pharmacy:', err);
        setError('Error loading pharmacy details');
        navigate('/pharmacies');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchPharmacyDetails();
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchPharmacyMedicines = async () => {
      try {
        setMedicineLoading(true);
        const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
        const data = await response.json();
        
        if (data.success) {
          const formattedMedicines = data.data.map(med => ({
            _id: `${id}_${med._id}`,
            name: med.name,
            genericName: med.genericName,
            description: med.description,
            category: med.category,
            price: med.price,
            discountedPrice: med.discountedPrice,
            discountPercentage: med.discountPercentage || 0,
            image: med.image,
            inStock: med.inStock,
            stockQuantity: med.stockQuantity,
            prescriptionRequired: med.prescriptionRequired || false,
            pharmacyId: id,
            pharmacyName: pharmacy?.name
          }));
          
          setPharmacyMedicines(formattedMedicines);
        }
      } catch (err) {
        console.error('Error fetching pharmacy medicines:', err);
      } finally {
        setMedicineLoading(false);
      }
    };
    
    if (id && pharmacy) {
      fetchPharmacyMedicines();
    }
  }, [id, pharmacy]);

  const filteredMedicines = pharmacyMedicines.filter(medicine => {
    if (!medicine) return false;
    
    const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') {
      return matchesSearch;
    }
    
    let matchesCategory = false;
    if (medicine.category) {
      matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
                       medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
    } else {
      const categoryKeywords = {
        'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
        'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
        'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
        'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
        'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
        'babycare': ['baby', 'infant', 'pediatric', 'child'],
        'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
        'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
        'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
      };
      
      const keywords = categoryKeywords[selectedCategory] || [];
      matchesCategory = keywords.some(keyword => 
        medicine.name?.toLowerCase().includes(keyword) || 
        medicine.description?.toLowerCase().includes(keyword) ||
        medicine.genericName?.toLowerCase().includes(keyword)
      );
    }
    
    return matchesSearch && matchesCategory;
  });

  const getPharmacyCartItems = () => {
    return cart.filter(item => {
      if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
        return item.pharmacyIds.includes(id);
      }
      
      if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
        return item.availableAtPharmacies.some(pharmacy => {
          return (typeof pharmacy === 'string' && pharmacy === id) ||
                 (pharmacy && pharmacy._id === id);
        });
      }
      
      // Check if the item has pharmacyId property that matches current pharmacy
      if (item.pharmacyId) {
        return item.pharmacyId === id;
      }
      
      // If no pharmacy-specific properties, include it
      return true;
    });
  };

  const addToCart = (medicine) => {
    setCart(prevCart => {
      const uniqueId = `${medicine.name}_${id}`;
      const existingItem = prevCart.find(item => item.id === uniqueId);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === uniqueId
            ? { 
                ...item, 
                quantity: item.quantity + 1
              }
            : item
        );
      }
      
      return [...prevCart, { 
        ...medicine, 
        id: uniqueId,
        _id: medicine._id,
        quantity: 1,
        price: medicine.price || 0,
        discountedPrice: medicine.discountedPrice,
        name: medicine.name,
        image: medicine.image,
        pharmacyId: id,
        pharmacyName: pharmacy.name
      }];
    });
  };

  // FIXED: Simplified clearCart function
  const clearCart = () => {
    setCart(prevCart => {
      // Filter out items that belong to this specific pharmacy
      return prevCart.filter(item => {
        // Check pharmacyId property
        if (item.pharmacyId === id) {
          return false;
        }
        
        // Check pharmacyIds array
        if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
          return false;
        }
        
        // Check availableAtPharmacies array
        if (item.availableAtPharmacies) {
          const hasThisPharmacy = item.availableAtPharmacies.some(pharmacy => {
            return (typeof pharmacy === 'string' && pharmacy === id) ||
                   (pharmacy && pharmacy._id === id);
          });
          if (hasThisPharmacy) {
            return false;
          }
        }
        
        return true;
      });
    });
    setShowClearCartModal(false);
  };

  const removeFromCart = (medicineId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(medicineId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === medicineId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    const pharmacyCartItems = getPharmacyCartItems();
    return pharmacyCartItems.reduce((sum, item) => {
      const price = item.discountedPrice || item.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (price) => {
    // Format price to avoid long decimal numbers
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return '0.00';
  };

  // Clear Cart Modal Component - FIXED
  const ClearCartModal = () => {
    if (!showClearCartModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Clear Cart</h3>
              <button
                onClick={() => setShowClearCartModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <p className="text-center text-gray-700">
                Are you sure you want to remove all items from your cart?
              </p>
              <p className="text-center text-sm text-gray-500 mt-2">
                This will clear {getPharmacyCartItems().length} item(s) from {pharmacy?.name}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearCartModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={clearCart}
                className="flex-1 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#1e4e56] hover:to-[#2c6774] transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
          </div>
        </div>
        <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
      </div>
    );
  }

  if (error || !pharmacy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
          <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/pharmacies')}
              className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Back to Pharmacies
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Clear Cart Modal */}
      <ClearCartModal />
      
      {/* Pharmacy Header */}
      <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
        <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="max-w-3xl">
              <button 
                onClick={() => navigate('/pharmacies')}
                className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
              >
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Pharmacies
              </button>
              
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
                  <img 
                    src={pharmacy.image} 
                    alt={pharmacy.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
                    }}
                  />
                </div>
                
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
                      {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-[#c0d3dc] mb-4">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{pharmacy.address}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
                      <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
                    </div>
                    
                    <div className="flex items-center text-[#c0d3dc]">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
                    </div>
                    
                    {pharmacy.distance && (
                      <div className="flex items-center text-[#c0d3dc]">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{pharmacy.distance} away</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
                <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
                <div className="text-sm text-[#c0d3dc]">Medicines</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
                <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
                <div className="text-sm text-[#c0d3dc]">Service Hours</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="container mx-auto px-4 -mb-6 relative z-20">
          <div className="flex overflow-x-auto bg-white rounded-t-2xl shadow-lg">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'overview' 
                  ? 'text-[#2c6774] border-[#2c6774]' 
                  : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Overview
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('medicines')}
              className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'medicines' 
                  ? 'text-[#2c6774] border-[#2c6774]' 
                  : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Medicines ({pharmacyMedicines.length})
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'services' 
                  ? 'text-[#2c6774] border-[#2c6774]' 
                  : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Services
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Pharmacy Overview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-700">Address</p>
                            <p className="text-gray-600">{pharmacy.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-700">Contact</p>
                            <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
                              {pharmacy.phone}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-700">Email</p>
                            <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
                              {pharmacy.email}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-700">Delivery Time</p>
                            <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {pharmacy.description && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
                  <div className="space-y-4">
                    {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="font-medium text-gray-700 capitalize">{day}</span>
                        <span className="font-semibold text-[#2c6774]">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medicines' && (
              <div className="space-y-8">
                {/* Medicine Search and Filter */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search medicines by name, generic name, or description..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
                        />
                        <svg 
                          className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                        }}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Category Filters */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            selectedCategory === category.id
                              ? 'bg-[#2c6774] text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                          }`}
                        >
                          {getCategoryIcon(category.icon)}
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Medicine Results */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
                      <p className="text-gray-600 mt-1">
                        {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
                        {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                      </p>
                    </div>
                  </div>

                  {medicineLoading ? (
                    <div className="text-center py-16 bg-white rounded-2xl">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
                      </div>
                      <p className="mt-4 text-gray-600">Loading medicines...</p>
                    </div>
                  ) : filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                      {filteredMedicines.map((medicine) => (
                        <MedicineCard
                          key={medicine._id}
                          medicine={medicine}
                          onAddToCart={addToCart}
                          context="pharmacy-detail"
                          cart={cart}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        {searchTerm || selectedCategory !== 'all' 
                          ? 'No medicines match your search criteria' 
                          : 'This pharmacy currently has no medicines listed'}
                      </p>
                      {(searchTerm || selectedCategory !== 'all') && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('all');
                          }}
                          className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8">
                {/* Services */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pharmacy.services && pharmacy.services.map((service, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
                          <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Services */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
                      <p className="text-red-600">Available for urgent medicine needs at any time</p>
                    </div>
                    <a 
                      href={`tel:${pharmacy.phone}`}
                      className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Emergency Line
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Cart & Quick Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Your Order ({getPharmacyCartItems().length})
                    </h3>
                  </div>
                </div>
                
                <div className="p-6">
                  {getPharmacyCartItems().length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 mb-2">Your cart is empty</p>
                      <p className="text-gray-500 text-sm">Add medicines to get started</p>
                    </div>
                  ) : (
                    <>
                      {/* Cart Items */}
                      <div className="space-y-2 max-h-72 overflow-y-auto mb-6 pr-2">
                        {getPharmacyCartItems().map((item) => (
                          <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            {/* Medicine Image */}
                            <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              )}
                            </div>
                            
                            {/* Medicine Details */}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 truncate text-sm">{item.name}</p>
                              <p className="text-xs text-gray-600">Rs. {formatPrice((item.discountedPrice || item.price || 0) * item.quantity)}</p>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-1 w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                aria-label="Remove item"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="space-y-3 border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-semibold">Rs. {formatPrice(calculateTotal())}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Delivery:</span>
                          <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-[#2c6774]">Rs. {formatPrice(calculateTotal())}</span>
                          </div>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <Link
                          to="/booking"
                          className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm md:text-base ${
                            getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={(e) => {
                            if (getPharmacyCartItems().length === 0) e.preventDefault();
                          }}
                        >
                          Proceed to Checkout
                        </Link>
                        <button
                          onClick={() => setShowClearCartModal(true)}
                          className="px-4 py-3 border border-[#2c6774] text-[#2c6774] rounded-xl hover:border-[#1e4e56] hover:bg-[#2c6774]/5 transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Clear Cart</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={`tel:${pharmacy.phone}`}
                    className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center"
                  >
                    <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">Call Pharmacy</span>
                  </a>
                  
                  <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center">
                    <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">Directions</span>
                  </button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Delivery Time</p>
                      <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 mins'}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
                      <p className="text-gray-600 text-sm">On all orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#5c878f] rounded-full -translate-y-20 md:-translate-y-32 translate-x-10 md:translate-x-16 opacity-20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Need a different pharmacy?</h3>
                <p className="text-[#c0d3dc] text-sm md:text-base max-w-lg">
                  Browse our complete network of trusted pharmacies
                </p>
              </div>
              <Link
                to="/pharmacies"
                className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center text-sm md:text-base"
              >
                Explore All Pharmacies
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Cart Bar */}
      {getPharmacyCartItems().length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center font-bold">
                  {getPharmacyCartItems().length}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rs. {formatPrice(calculateTotal())}</p>
                  <p className="text-xs text-gray-500">Total for {pharmacy.name}</p>
                </div>
              </div>
            </div>
            <Link
              to="/booking"
              className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        /* Mobile padding for bottom cart bar */
        @media (max-width: 1024px) {
          .pb-safe {
            padding-bottom: 5rem;
          }
        }
      `}</style>
      
      {/* Add bottom padding on mobile when cart has items */}
      {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-20"></div>}
    </div>
  );
};

export default PharmacyDetailPage;