import React, { useState } from "react";
import { useParams } from "react-router-dom";
import labs from "./LabData";
import labTests from "./LabTestsData";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function LabDetail() {
  const { id } = useParams();
  const lab = labs.find((l) => l.id === Number(id));
  const tests = labTests[id] || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);

  if (!lab) {
    return <div className="flex justify-center items-center h-64 text-[var(--secondary-color)]">Lab not found</div>;
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

  // Calculate discounted price - FIXED
  const calculateDiscountedPrice = (originalPrice, discount) => {
    // Ensure discount is a number
    const discountPercent = typeof discount === 'number' ? discount : parseInt(discount);
    const discountAmount = (originalPrice * discountPercent) / 100;
    return Math.round(originalPrice - discountAmount);
  };

  // Calculate total amounts - FIXED
  const calculateTotal = () => {
    const selectedTestDetails = tests.filter(t => selectedTests.includes(t.id));
    
    let totalOriginal = 0;
    let totalDiscount = 0;

    selectedTestDetails.forEach(test => {
      totalOriginal += test.price;
      const discountPercent = typeof test.discount === 'number' ? test.discount : parseInt(test.discount);
      totalDiscount += (test.price * discountPercent) / 100;
    });

    const totalFinal = totalOriginal - totalDiscount;

    return {
      original: Math.round(totalOriginal),
      discount: Math.round(totalDiscount),
      final: Math.round(totalFinal),
      count: selectedTests.length
    };
  };

  const totals = calculateTotal();

  // Handle booking appointment
  const navigate = useNavigate();

  // const handleBookAppointment = () => {
  //   if (selectedTests.length === 0) {
  //     alert("Please select at least one test before booking an appointment!");
  //     return;
  //   }

  //   const bookedTests = tests
  //     .filter((t) => selectedTests.includes(t.id))
  //     .map((t) => t.name)
  //     .join(", ");

  //   alert(`Appointment booked for ${bookedTests} at ${lab.name}\nTotal Amount: Rs. ${totals.final}`);
  // };
const handleBookAppointment = () => {
  if (selectedTests.length === 0) {
    alert("Please select at least one test before booking an appointment!");
    return;
  }

  // Navigate to booking page and pass selected tests and lab id as state
  navigate(`/labs/${lab.id}/booking`, { state: { selectedTests } });
};

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* ====== Header Section ====== */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-[var(--bg-light)] rounded-xl shadow-sm border border-[var(--text-light)]">
        <img 
          src={lab.logo} 
          alt={lab.name} 
          className="w-24 h-24 md:w-32 md:h-32 object-contain bg-[var(--white)] rounded-lg p-3 shadow-sm"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary-color)] mb-2">
            {lab.name}
          </h1>
          <p className="text-[var(--primary-color)] mb-4">{lab.branches}</p>
          <button className="bg-[var(--primary-color)] text-[var(--white)] px-6 py-2 rounded-lg hover:bg-[var(--hover-color)] transition-colors font-medium">
            Get {lab.discount} Discount
          </button>
        </div>
      </div>

      {/* ====== Search & Tests Section ====== */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--secondary-color)] mb-6">
          Lab Tests & Prices
        </h2>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--accent-color)] text-lg" />
          <input
            type="text"
            placeholder="Search Test Here..."
            className="w-full pl-12 pr-4 py-3 border border-[var(--accent-color)] rounded-lg focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 text-[var(--secondary-color)] bg-[var(--white)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Total Summary Bar */}
        {selectedTests.length > 0 && (
          <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] text-[var(--white)] p-4 rounded-lg mb-6">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h3 className="font-semibold">Selected {totals.count} {totals.count === 1 ? 'Test' : 'Tests'}</h3>
                <p className="text-sm opacity-90">Total savings: Rs. {totals.discount}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-sm line-through opacity-80">Rs. {totals.original}</span>
                  <span className="text-lg font-bold">Rs. {totals.final}</span>
                </div>
                <p className="text-sm opacity-90">After discount</p>
              </div>
            </div>
          </div>
        )}

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => {
              const discountedPrice = calculateDiscountedPrice(test.price, test.discount);
              
              return (
                <div
                  key={test.id}
                  className={`
                    relative bg-[var(--white)] border rounded-xl p-4 cursor-pointer transition-all duration-300
                    ${selectedTests.includes(test.id) 
                      ? 'border-[var(--primary-color)] border-2 bg-[#f0f8f8] shadow-lg' 
                      : 'border-[var(--bg-light)] hover:border-[var(--accent-color)] hover:shadow-md'
                    }
                  `}
                  onClick={() => handleCheckboxChange(test.id)}
                >
                  {/* Checkbox in top-right corner */}
                  <input
                    type="checkbox"
                    className="absolute top-3 right-3 w-5 h-5 accent-[var(--primary-color)] cursor-pointer"
                    checked={selectedTests.includes(test.id)}
                    onChange={() => handleCheckboxChange(test.id)}
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="pr-6">
                    <div className="mb-3">
                      <h3 className="font-semibold text-[var(--secondary-color)] text-lg">
                        {test.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {test.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--primary-color)] font-bold text-lg">
                            Rs. {discountedPrice}
                          </span>
                          <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                            {test.discount}% OFF
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm line-through">
                          Rs. {test.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No tests found.
            </div>
          )}
        </div>

        {/* Book Appointment Button */}
        <div className="text-center mt-8">
          <button 
            className={`
              px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300
              ${selectedTests.length > 0
                ? 'bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-[var(--white)] shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
            onClick={handleBookAppointment}
            disabled={selectedTests.length === 0}
          >
            {selectedTests.length > 0
              ? `Book ${selectedTests.length} ${selectedTests.length === 1 ? 'Test' : 'Tests'} - Rs. ${totals.final}`
              : "Book Appointment"}
          </button>
          
          {selectedTests.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              You save Rs. {totals.discount} with discount
            </p>
          )}
        </div>
      </div>
    </div>
  );
}