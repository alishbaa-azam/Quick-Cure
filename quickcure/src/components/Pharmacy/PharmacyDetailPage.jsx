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



// The below is the completed code with Pakistani pharmacy database
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













// This includes API
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
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MedicineCard from './MedicineCard.jsx';

const PharmacyDetailPage = ({ cart, setCart }) => {
  const { id } = useParams(); // Changed from pharmacyId to id
  const navigate = useNavigate();
  
  // State for pharmacy data
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Medicines' },
    { id: 'painkiller', name: 'Pain Relief' },
    { id: 'fever', name: 'Fever & Cold' },
    { id: 'vitamin', name: 'Vitamins & Supplements' },
    { id: 'chronic', name: 'Chronic Care' },
    { id: 'skincare', name: 'Skin Care' },
    { id: 'babycare', name: 'Baby Care' },
    { id: 'antibiotic', name: 'Antibiotics' },
    { id: 'cardiac', name: 'Cardiac Care' },
    { id: 'diabetes', name: 'Diabetes Care' }
  ];

  // Medicines state
  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
  const [medicineLoading, setMedicineLoading] = useState(false);

  // Fetch pharmacy details from API
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

  // Fetch medicines for this pharmacy
  useEffect(() => {
    const fetchPharmacyMedicines = async () => {
      try {
        setMedicineLoading(true);
        // Fetch all medicines
        const response = await fetch('http://localhost:5000/api/medicines');
        const data = await response.json();
        
        if (data.success) {
          // Filter medicines that include this pharmacy ID in availableAtPharmacies
          const medicinesForPharmacy = data.data.filter(medicine => {
            if (!medicine.availableAtPharmacies || !Array.isArray(medicine.availableAtPharmacies)) {
              return false;
            }
            
            return medicine.availableAtPharmacies.some(pharmacy => {
              // Check if pharmacy is a string ID or populated object
              if (typeof pharmacy === 'string') {
                return pharmacy === id;
              } else if (pharmacy && pharmacy._id) {
                return pharmacy._id === id;
              }
              return false;
            });
          });
          
          setPharmacyMedicines(medicinesForPharmacy);
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

  // Filter medicines based on search and category
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
      // Fallback keyword matching
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

  // Get cart items only for this pharmacy
  const getPharmacyCartItems = () => {
    return cart.filter(item => {
      // If medicine has pharmacyIds array (added when adding to cart)
      if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
        return item.pharmacyIds.includes(id);
      }
      
      // If medicine has availableAtPharmacies array (from medicine data)
      if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
        return item.availableAtPharmacies.some(pharmacy => {
          return (typeof pharmacy === 'string' && pharmacy === id) ||
                 (pharmacy && pharmacy._id === id);
        });
      }
      
      // For backward compatibility, include items without pharmacy info
      return true;
    });
  };

  const addToCart = (medicine) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === medicine._id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === medicine._id
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                // Ensure pharmacyId is tracked
                pharmacyIds: [...(item.pharmacyIds || []), id].filter((v, i, a) => a.indexOf(v) === i)
              }
            : item
        );
      }
      return [...prevCart, { 
        ...medicine, 
        id: medicine._id, 
        quantity: 1,
        price: medicine.price || 0,
        discountedPrice: medicine.discountedPrice,
        name: medicine.name,
        image: medicine.image,
        pharmacyIds: [id] // Track which pharmacy this item belongs to
      }];
    });
  };

  // Clear cart function - only clear items from this pharmacy
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart for this pharmacy?')) {
      setCart(prevCart => {
        // Remove only items that belong to this pharmacy
        return prevCart.filter(item => {
          if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
            return false;
          }
          return true;
        });
      });
    }
  };

  // Remove item from cart - only remove if from this pharmacy
  const removeFromCart = (medicineId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => {
        if (item.id === medicineId) {
          // Check if this item is from this pharmacy
          if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
            return false; // Remove this item
          }
        }
        return true; // Keep other items
      });
      return updatedCart;
    });
  };

  // Update item quantity
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

  // Calculate total for this pharmacy's items only
  const calculateTotal = () => {
    const pharmacyCartItems = getPharmacyCartItems();
    return pharmacyCartItems.reduce((sum, item) => {
      const price = item.discountedPrice || item.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading pharmacy details...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !pharmacy) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Pharmacy Not Found</h3>
          <p className="text-gray-500">{error || 'The pharmacy you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/pharmacies')}
            className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Pharmacies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/pharmacies')}
        className="flex items-center text-gray-600 hover:text-[var(--primary-color)] mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Pharmacies
      </button>

      {/* Pharmacy Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-cyan-500">
          <img 
            src={pharmacy.bannerImage} 
            alt={pharmacy.name}
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600';
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center p-8">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md">
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
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{pharmacy.address}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold">{pharmacy.rating || '4.0'}</span>
                      <span className="text-gray-500 text-sm ml-1">({pharmacy.totalReviews || 0} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {pharmacy.distance} away
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Delivery: {pharmacy.deliveryTime || '15-20 mins'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medicine Count Summary */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900">{pharmacyMedicines.length} Medicines Available</h3>
            <p className="text-gray-600 text-sm">
              {medicineLoading ? 'Loading medicines...' : `${filteredMedicines.length} match your search ${selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.name}`}`}
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="text-sm text-gray-600">
              Showing medicines available at <span className="font-bold">{pharmacy.name}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Pharmacy Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Services & Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Services */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pharmacy.services && pharmacy.services.map((service, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h2>
            <div className="space-y-3">
              {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-gray-700 capitalize">{day}</span>
                  <span className="text-gray-600">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${pharmacy.phone}`} className="text-[var(--primary-color)] hover:underline">
                  {pharmacy.phone}
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${pharmacy.email}`} className="text-[var(--primary-color)] hover:underline">
                  {pharmacy.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary (Fixed Position) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Your Order ({getPharmacyCartItems().length})</h3>
                {getPharmacyCartItems().length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear Cart
                  </button>
                )}
              </div>
              
              {getPharmacyCartItems().length === 0 ? (
                <div className="text-center py-6">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-1">Add medicines from {pharmacy.name} to get started</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="max-h-60 overflow-y-auto mb-4">
                    {getPharmacyCartItems().map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 truncate">{item.name}</p>
                          <p className="text-sm text-gray-500">Rs. {item.discountedPrice || item.price || 0} × {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <span className="text-gray-600">-</span>
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <span className="text-gray-600">+</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Items ({getPharmacyCartItems().length}):</span>
                      <span className="font-medium">Rs. {calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Delivery to:</span>
                      <span className="font-medium text-gray-900">{pharmacy.distance}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>Rs. {calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              <Link
                to="/booking"
                className={`w-full mt-4 bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors block ${
                  getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Proceed to Checkout ({getPharmacyCartItems().length})
              </Link>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Contact</h3>
              <p className="text-red-600 text-sm mb-4">Available 24/7 for emergency medicines</p>
              <a 
                href={`tel:${pharmacy.phone}`}
                className="flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Medicine Catalog Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Medicines at {pharmacy.name}</h2>
            <p className="text-gray-600">Available for delivery in {pharmacy.deliveryTime}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full md:w-64"
              />
              <svg 
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filters - Scrollable */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          {selectedCategory !== 'all' && (
            <div className="mt-3 flex items-center">
              <span className="text-sm text-gray-600">Filtered by: {categories.find(c => c.id === selectedCategory)?.name}</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="ml-2 text-sm text-[var(--primary-color)] hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Medicine Grid */}
        {medicineLoading ? (
          <div className="text-center py-12">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading medicines...</p>
          </div>
        ) : filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine._id}
                medicine={medicine}
                onAddToCart={addToCart}
                cart={cart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Medicines Found</h3>
            <p className="text-gray-500">
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
                className="mt-4 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a different pharmacy?</h3>
        <p className="text-gray-600 mb-6">Browse medicines from other trusted pharmacies in your area</p>
        <Link
          to="/pharmacies"
          className="inline-flex items-center bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          Explore Other Pharmacies
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PharmacyDetailPage;