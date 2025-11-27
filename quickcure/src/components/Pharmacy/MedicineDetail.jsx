// // components/MedicineDetail.jsx
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { medicines } from "./medicines";
// // import Header from "../header";
// import Header from '../Header/header.jsx';
// import VerificationModal from "./VerificationModal";
// import "./MedicineDetail.css";

// export default function MedicineDetail() {
//   const { id } = useParams();
//   const medicine = medicines.find((m) => m.id === parseInt(id));
//   const [activeTab, setActiveTab] = useState("about");

//   if (!medicine) return <h2>Medicine not found</h2>;


  
//   const tabs = [
//     { key: "about", label: "About" },
//     { key: "uses", label: "Uses" },
//     { key: "dosage", label: "Dosage" },
//     { key: "warnings", label: "Warnings" },
//     { key: "precautions", label: "Precautions" },
//     { key: "sideEffects", label: "Side Effects" },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="medicine-detail-container">
//         {/* 🧭 Tabs Navigation */}
//         <div className="tabs">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               className={activeTab === tab.key ? "tab active" : "tab"}
//               onClick={() => setActiveTab(tab.key)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* 🧴 Medicine Header */}
//         <div className="medicine-header">
//           <img src={medicine.image} alt={medicine.name} />
//           <div className="medicine-info">
//             <h1>{medicine.name}</h1>
//             <p>
//               <strong>Manufacturer:</strong> {medicine.manufacturer}
//             </p>
//             <p>
//               <strong>Category:</strong> {medicine.category}
//             </p>
//             <p>
//               <strong>Form:</strong> {medicine.form || "Tablet"}
//             </p>
//             <p>
//               <strong>Price:</strong>{" "}
//               {medicine.discountPrice ? (
//                 <>
//                   <span className="discount">${medicine.discountPrice}</span>{" "}
//                   <span className="original">${medicine.price}</span>
//                 </>
//               ) : (
//                 <span>${medicine.price}</span>
//               )}
//             </p>
//           </div>
//         </div>

//         {/* 💊 Tab Content */}
//         <div className="tab-content">
//           {activeTab === "about" && (
//             <div>
//               <h2>About {medicine.name}</h2>
//               <p>{medicine.description}</p>
//             </div>
//           )}

//           {activeTab === "uses" && medicine.uses && (
//             <div>
//               <h2>Uses of {medicine.name}</h2>
//               <ul>
//                 {medicine.uses.map((use, i) => (
//                   <li key={i}>{use}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {activeTab === "dosage" && medicine.dosage && (
//             <div>
//               <h2>Dosage and Administration</h2>
//               <p>{medicine.dosage}</p>
//             </div>
//           )}

//           {activeTab === "warnings" && medicine.warnings && (
//             <div>
//               <h2>Warnings</h2>
//               <ul>
//                 {medicine.warnings.map((warn, i) => (
//                   <li key={i}>{warn}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {activeTab === "precautions" && medicine.precautions && (
//             <div>
//               <h2>Precautions</h2>
//               <ul>
//                 {medicine.precautions.map((prec, i) => (
//                   <li key={i}>{prec}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {activeTab === "sideEffects" && medicine.sideEffects && (
//             <div>
//               <h2>Possible Side Effects</h2>
//               <ul>
//                 {medicine.sideEffects.map((effect, i) => (
//                   <li key={i}>{effect}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* 🛒 Buttons */}
//         <div className="detail-buttons">
//           <button className="buy-btn">Buy Now</button>
//           <button className="back-btn" onClick={() => window.history.back()}>
//             Go Back
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { medicines } from './medicines';

const MedicineDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const medicine = medicines.find(med => med.id === parseInt(id));

  if (!medicine) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Medicine not found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Pharmacy
        </Link>
      </div>
    );
  }

  const addToCart = () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === medicine.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Pharmacy
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Medicine Image */}
          <div className="md:w-1/3">
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          
          {/* Medicine Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {medicine.name}
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              {medicine.detailedDescription}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-700">Category</h3>
                <p className="text-gray-600">{medicine.category}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Dosage</h3>
                <p className="text-gray-600">{medicine.dosage}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Price</h3>
                <p className="text-2xl font-bold text-green-600">${medicine.price}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Uses</h3>
              <ul className="list-disc list-inside text-gray-600">
                {medicine.uses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Possible Side Effects</h3>
              <ul className="list-disc list-inside text-gray-600">
                {medicine.sideEffects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Add to Cart - ${medicine.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;