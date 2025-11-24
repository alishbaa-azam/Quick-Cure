// // import React from "react";
// import { useParams } from "react-router-dom";
// import  labs from "./LabData";

// export default function LabDetail() {
//   const { id } = useParams();
//   const lab = labs.find((l) => l.id === Number(id));

//   if (!lab) {
//     return <div className="p-10 text-center text-red-500">Lab not found</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex items-center gap-6 mb-6">
//         <img src={lab.logo} alt={lab.name} className="w-32 h-32" />
//         <div>
//           <h1 className="text-3xl font-bold">{lab.name}</h1>
//           <p className="text-gray-600">{lab.branches}</p>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
//             Get {lab.discount} Discount
//           </button>
//         </div>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-2">About</h2>
//         <p className="text-gray-700">{lab.description}</p>
//       </div>

//       <div>
//         <h2 className="text-2xl font-semibold mb-4">Lab Tests & Prices</h2>
//         <input
//           type="text"
//           placeholder="Search Test Here"
//           className="w-full border p-2 rounded mb-4"
//         />
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {/* You can replace this with real test data */}
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className="border rounded-xl p-3 shadow-sm hover:shadow-md"
//             >
//               <p className="text-green-600 font-medium">20% Discount</p>
//               <h3 className="font-semibold mt-2">Test Name {i + 1}</h3>
//               <p className="text-gray-500">Rs. {500 + i * 100}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useParams } from "react-router-dom";
// import labs from "./LabData";
// import "./LabDetail.css"; // ✅ Import external stylesheet

// export default function LabDetail() {
//   const { id } = useParams();
//   const lab = labs.find((l) => l.id === Number(id));

//   if (!lab) {
//     return <div className="lab-not-found">Lab not found</div>;
//   }

//   return (
//     <div className="lab-detail-container">
//       {/* ====== Header Section ====== */}
//       <div className="lab-header">
//         <img src={lab.logo} alt={lab.name} />
//         <div className="lab-header-info">
//           <h1>{lab.name}</h1>
//           <p>{lab.branches}</p>
//           <button className="lab-discount-btn">
//             Get {lab.discount} Discount
//           </button>
//         </div>
//       </div>

//       {/* ====== About Section ====== */}
//       <div className="lab-about">
//         <h2>About</h2>
//         <p>{lab.description}</p>
//       </div>

//       {/* ====== Tests Section ====== */}
//       <div className="lab-tests-section">
//         <h2>Lab Tests & Prices</h2>
//         <input
//           type="text"
//           placeholder="Search Test Here"
//           className="lab-search-input"
//         />
//         <div className="lab-tests-grid">
//           {[...Array(12)].map((_, i) => (
//             <div key={i} className="lab-test-card">
//               <span className="discount">20% Discount</span>
//               <h3>Test Name {i + 1}</h3>
//               <p>Rs. {500 + i * 100}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useParams } from "react-router-dom";
import labs from "./LabData";
import labTests from "./LabTestsData";
import "./LabDetail.css";
import { FaSearch } from "react-icons/fa";

export default function LabDetail() {
  const { id } = useParams();
  const lab = labs.find((l) => l.id === Number(id));
  const tests = labTests[id] || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);

  if (!lab) {
    return <div className="lab-not-found">Lab not found</div>;
  }

  // Filter tests based on search input
  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle checkbox selection for multiple tests
  const handleCheckboxChange = (testId) => {
    setSelectedTests((prevSelected) =>
      prevSelected.includes(testId)
        ? prevSelected.filter((id) => id !== testId)
        : [...prevSelected, testId]
    );
  };

  // Handle booking appointment
  const handleBookAppointment = () => {
    if (selectedTests.length === 0) {
      alert("Please select at least one test before booking an appointment!");
      return;
    }

    const bookedTests = tests
      .filter((t) => selectedTests.includes(t.id))
      .map((t) => t.name)
      .join(", ");

    alert(`Appointment booked for ${bookedTests} at ${lab.name}`);
  };

  return (
    <div className="lab-detail-container">
      {/* ====== Header Section ====== */}
      <div className="lab-header">
        <img src={lab.logo} alt={lab.name} />
        <div className="lab-header-info">
          <h1>{lab.name}</h1>
          <p>{lab.branches}</p>
          <button className="lab-discount-btn">
            Get {lab.discount} Discount
          </button>
        </div>
      </div>

      {/* ====== Search & Tests Section ====== */}
      <div className="lab-tests-section">
        <h2>Lab Tests & Prices</h2>

        {/* Search Input */}
        <div className="lab-search-container">
          <FaSearch className="lab-search-icon" />
          <input
            type="text"
            placeholder="Search Test Here..."
            className="lab-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Test Cards */}
        <div className="lab-tests-grid">
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => (
              <div
                key={test.id}
                className={`lab-test-card ${
                  selectedTests.includes(test.id) ? "selected" : ""
                }`}
              >
                {/* Checkbox in top-right corner */}
                <input
                  type="checkbox"
                  className="test-checkbox"
                  checked={selectedTests.includes(test.id)}
                  onChange={() => handleCheckboxChange(test.id)}
                />

                <div className="test-header">
                  <h3>{test.name}</h3>
                </div>
                <p className="test-description">{test.description}</p>
                <div className="test-meta">
                  <span className="price">Rs. {test.price}</span>
                  <span className="discount">{test.discount} OFF</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-tests">No tests found.</p>
          )}
        </div>

        {/* Book Appointment Button */}
        <div className="book-btn-container">
          <button className="book-btn" onClick={handleBookAppointment}>
            {selectedTests.length > 0
              ? `Book ${selectedTests.length} ${
                  selectedTests.length === 1 ? "Test" : "Tests"
                }`
              : "Book Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}
