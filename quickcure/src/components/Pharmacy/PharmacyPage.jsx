// import React, { useState } from 'react';
// import Header from '../components/header';
// import './PharmacyPage.css';
// import { medicines, categories } from "../data/medicines";

// import { Link } from 'react-router-dom';


// export default function PharmacyPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [showVerification, setShowVerification] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     city: '',
//     address: '',
//     phone: ''
//   });

//   // ✅ Filtering logic (unchanged)
//   const filteredMedicines = medicines.filter((medicine) => {
//     const nameLower = medicine.name.toLowerCase();
//     const matchesCategory =
//       selectedCategory === 'All' || medicine.category === selectedCategory;

//     // If searchTerm is a single letter, show medicines starting with it
//     const matchesSearch =
//       searchTerm.length === 1
//         ? nameLower.startsWith(searchTerm.toLowerCase())
//         : nameLower.includes(searchTerm.toLowerCase());

//     return matchesSearch && matchesCategory;
//   });

//   // ✅ Handle Buy Button
//   const handleBuyClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowVerification(true);
//   };

//   // ✅ Handle Form Submit
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (formData.age < 18) {
//       alert("You must be 18 or older to purchase medicines.");
//     } else {
//       alert(
//         `✅ ${formData.name}, your order for ${selectedMedicine.name} has been placed successfully!\n\nDelivery Info:\n📍 ${formData.address}, ${formData.city}\n📞 ${formData.phone}`
//       );
//       setShowVerification(false);
//       setFormData({
//         name: '',
//         age: '',
//         city: '',
//         address: '',
//         phone: ''
//       });
//       setSelectedMedicine(null);
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className="pharmacy-container">
//         {/* 🏥 Simple Search Section */}
//         <h1 className="pharmacy-title">QuickCure Pharmacy</h1>

//         <div className="controls">
//           <input
//             type="text"
//             placeholder="Search medicine..."
//             className="search-bar"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <select
//             className="category-dropdown"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             {categories.map((category) => (
//               <option key={category}>{category}</option>
//             ))}
//           </select>
//         </div>

//         {/* 🔤 Alphabet Filter */}
//         <div className="alphabet-filter">
//           {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
//             <button
//               key={letter}
//               className={`alphabet-btn ${searchTerm === letter ? 'active' : ''}`}
//               onClick={() => setSearchTerm(letter)}
//             >
//               {letter}
//             </button>
//           ))}
//           {/* <button
//             className={`alphabet-btn clear ${searchTerm === '' ? 'active' : ''}`}
//             onClick={() => setSearchTerm('')}
//           >
//             all
//           </button> */}
//         </div>

//         {/* 💊 Medicine Grid */}
//         <div className="medicine-grid">
//           {filteredMedicines.length > 0 ? (
//             filteredMedicines.map((medicine) => (
//               <div key={medicine.id} className="medicine-card">
//                 <img
//                   src={medicine.image}
//                   alt={medicine.name}
//                   className="medicine-image"
//                 />
//                 <h3>{medicine.name}</h3>
//                 {/* <p className="manufacturer">{medicine.manufacturer}</p> */}
//                 <p className="desc">{medicine.description}</p>

//                 <div className="price">
//                   {medicine.discountPrice ? (
//                     <>
//                       <span className="discount">${medicine.discountPrice}</span>
//                       <span className="original">${medicine.price}</span>
//                     </>
//                   ) : (
//                     <span className="discount">${medicine.price}</span>
//                   )}
//                 </div>

//                 <div className="button-row">
//                   <Link to={`/medicine/${medicine.id}`} className="learn-btn">
//                     Learn More
//                   </Link>


//                   <button
//                     className="buy-btn"
//                     disabled={!medicine.inStock}
//                     onClick={() => handleBuyClick(medicine)}
//                   >
//                     {medicine.inStock ? 'Buy Now 💊' : 'Out of Stock ❌'}
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="no-results">No medicines found.</p>
//           )}
//         </div>

//         {/* 🧾 Customer Verification + Order Form */}
//         {showVerification && (
//           <div className="modal-overlay">
//             <div className="verification-modal">
//               <h3>Customer Verification</h3>
//               <p>Fill out this quick form to order <strong>{selectedMedicine?.name}</strong>.</p>
              
//               <form onSubmit={handleFormSubmit}>
//                <div className="verification-form-inputs">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Age"
//                   required
//                   value={formData.age}
//                   onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="City"
//                   required
//                   value={formData.city}
//                   onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                 />
//                 <textarea
//                   placeholder="Full Address"
//                   required
//                   value={formData.address}
//                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   required
//                   pattern="[0-9]{10,15}"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 />

//                 <div className="modal-buttons">
//                   <button type="submit" className="verify-btn">Submit Order</button>
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => setShowVerification(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


import React, { useState } from 'react';
import Header from '../header';
import './PharmacyPage.css';
import { medicines, categories } from "./medicines";
import { Link } from 'react-router-dom';
import VerificationModal from "./VerificationModal";

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showVerification, setShowVerification] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // ✅ Filter Medicines
  const filteredMedicines = medicines.filter((medicine) => {
    const nameLower = medicine.name.toLowerCase();
    const matchesCategory =
      selectedCategory === 'All' || medicine.category === selectedCategory;
    const matchesSearch =
      searchTerm.length === 1
        ? nameLower.startsWith(searchTerm.toLowerCase())
        : nameLower.includes(searchTerm.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // ✅ When user clicks Buy Now
  const handleBuyClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowVerification(true);
  };

  return (
    <>
      <Header />

      <div className="pharmacy-container">
        <h1 className="pharmacy-title">QuickCure Pharmacy</h1>

        <div className="controls">
          <input
            type="text"
            placeholder="Search medicine..."
            className="search-bar3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="category-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* 🔤 Alphabet Filter */}
        <div className="alphabet-filter">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <button
              key={letter}
              className={`alphabet-btn ${searchTerm === letter ? 'active' : ''}`}
              onClick={() => setSearchTerm(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Medicine Grid */}
        <div className="medicine-grid">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <div key={medicine.id} className="medicine-card">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="medicine-image"
                />
                <div className="desc">
                <h3>{medicine.name}</h3>
                <p>{medicine.description}</p>
                </div>
                <div className="price">
                  {medicine.discountPrice ? (
                    <>
                      <span className="discount">PKR {medicine.discountPrice}</span>
                      <span className="original">PKR {medicine.price}</span>
                    </>
                  ) : (
                    <span className="discount">PKR {medicine.price}</span>
                  )}
                </div>

                <div className="button-row">
                  <Link to={`/medicine/${medicine.id}`} className="learn-btn">
                    Learn More
                  </Link>

                  <button
                    className="buy-btn"
                    disabled={!medicine.inStock}
                    onClick={() => handleBuyClick(medicine)}
                  >
                    {medicine.inStock ? 'Buy Now ' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No medicines found.</p>
          )}
        </div>

        {/* 🧾 Modal Component */}
        {showVerification && (
          <VerificationModal
            medicine={selectedMedicine}
            onClose={() => setShowVerification(false)}
          />
        )}
      </div>
    </>
  );
}
