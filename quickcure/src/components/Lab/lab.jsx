import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaArrowRight, FaHome, FaShieldAlt, FaClock, FaCheck, FaStethoscope, FaSearch } from "react-icons/fa";

export default function LabsPage() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/labs")
      .then((res) => {
        setLabs(res.data);
        setFilteredLabs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLabs(labs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = labs.filter(
        (lab) =>
          lab.name.toLowerCase().includes(query) ||
          (lab.branches && lab.branches.toLowerCase().includes(query))
      );
      setFilteredLabs(filtered);
    }
  }, [searchQuery, labs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--bg-light)]/10 to-white px-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[var(--bg-light)] border-t-[var(--primary-color)]"></div>
          <p className="mt-6 text-(--accent-color) font-medium">Loading trusted diagnostic labs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-light)]/10 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white">
        <div className="max-w-7xl mx-auto px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Lab Tests Delivered to Your Doorstep
              </h1>
              <p className="text-xl mb-8 text-[var(--text-light)] max-w-3xl">
                Experience the future of healthcare with <span className="font-bold text-white">FREE HOME SAMPLE COLLECTION</span> from Pakistan's most trusted diagnostic labs.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-lg">
                  <FaHome className="text-lg" />
                  <span>Home Collection</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-lg">
                  <FaClock className="text-lg" />
                  <span>Same Day Service</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-lg">
                  <FaShieldAlt className="text-lg" />
                  <span>Safe & Sterile</span>
                </div>
              </div>
            </div>
            <div className="text-8xl text-[var(--text-light)]">
              <FaStethoscope className="inline-block" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-8 -mt-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-[var(--bg-light)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">{labs.length}</div>
            <div className="text-[var(--accent-color)] font-medium">Certified Labs</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-[var(--bg-light)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">24/7</div>
            <div className="text-[var(--accent-color)] font-medium">Booking Available</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-[var(--bg-light)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">FREE</div>
            <div className="text-[var(--accent-color)] font-medium">Home Collection</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-[var(--bg-light)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">70%</div>
            <div className="text-[var(--accent-color)] font-medium">Average Savings</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--secondary-color)] mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-[var(--accent-color)] text-lg max-w-2xl mx-auto">
            Get your lab tests done easily with our streamlined process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="relative">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--bg-light)] h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-white">{step}</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">
                  {index === 0 && "Book Online"}
                  {index === 1 && "Sample Collection"}
                  {index === 2 && "Lab Processing"}
                  {index === 3 && "Get Reports"}
                </h3>
                <p className="text-[var(--accent-color)] leading-relaxed">
                  {index === 0 && "Select tests & choose convenient time slot"}
                  {index === 1 && "Expert phlebotomist visits your home"}
                  {index === 2 && "Samples analyzed at certified labs"}
                  {index === 3 && "Digital reports delivered online"}
                </p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-[var(--bg-light)]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Labs Section with Search */}
      <div className="bg-gradient-to-b from-white to-[var(--bg-light)]/20 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--secondary-color)] mb-4">
              Partner Diagnostic Labs
            </h2>
            <p className="text-[var(--accent-color)] text-lg max-w-2xl mx-auto">
              All offering <span className="font-bold text-[var(--primary-color)]">FREE home collection</span> with special discounts
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-[var(--accent-color)]" />
              </div>
              <input
                type="text"
                placeholder="Search labs by name..."
                className="w-full pl-12 pr-6 py-4 bg-white rounded-xl border border-[var(--bg-light)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-[var(--secondary-color)] placeholder-[var(--accent-color)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* {searchQuery && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <span className="text-sm text-[var(--accent-color)] bg-[var(--bg-light)] px-2 py-1 rounded">
                    {filteredLabs.length} lab{filteredLabs.length !== 1 ? 's' : ''}
                  </span>
                </div> */}
              {/* )} */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLabs.map((lab) => (
              <div
                key={lab._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-[var(--bg-light)] flex flex-col"
              >
                <div className="p-6 bg-gradient-to-r from-[var(--bg-light)]/30 to-[var(--bg-light)]/10">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg p-2 shadow-sm border border-[var(--bg-light)]">
                          <img
                            src={`http://localhost:5000/uploads/${lab.logo}`}
                            className="w-full h-full object-contain"
                            alt={lab.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://cdn-icons-png.flaticon.com/512/2965/2965358.png";
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-1 truncate" title={lab.name}>
                            {lab.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-[var(--accent-color)]">
                            <FaMapMarkerAlt className="text-[var(--primary-color)] flex-shrink-0" />
                            <span className="truncate" title={lab.branches || "Multiple locations"}>
                              {lab.branches || "Multiple locations"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {lab.discount > 0 && (
                      <div className="flex-shrink-0 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-3 py-1 rounded-lg">
                        <span className="font-bold text-sm whitespace-nowrap">{lab.discount}% OFF</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 bg-[var(--bg-light)]/30 text-[var(--secondary-color)] px-4 py-3 rounded-lg">
                      <FaHome className="text-[var(--primary-color)] flex-shrink-0" />
                      <span className="font-medium truncate">FREE Home Collection</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-[var(--accent-color)]">
                      <FaCheck className="text-[var(--primary-color)] flex-shrink-0" />
                      <span className="truncate">Certified Diagnostic Lab</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--accent-color)]">
                      <FaCheck className="text-[var(--primary-color)] flex-shrink-0" />
                      <span className="truncate">Expert Phlebotomists</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--accent-color)]">
                      <FaCheck className="text-[var(--primary-color)] flex-shrink-0" />
                      <span className="truncate">Accurate Test Results</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/labs/${lab._id}`);
                    }}
                    className="mt-auto w-full py-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] hover:from-[var(--hover-color)] hover:to-[var(--primary-color)] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                  >
                    <span>View All Tests</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredLabs.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 text-[var(--accent-color)]">🔬</div>
              <h3 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">
                {searchQuery ? "No Labs Found" : "No Labs Available"}
              </h3>
              <p className="text-[var(--accent-color)] text-lg">
                {searchQuery 
                  ? `No labs found for "${searchQuery}". Try a different search.`
                  : "We're adding more diagnostic centers soon."}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white rounded-lg hover:from-[var(--hover-color)] hover:to-[var(--primary-color)] transition-all duration-300"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--secondary-color)] mb-4">
            Why Choose Home Collection?
          </h2>
          <p className="text-[var(--accent-color)] text-lg max-w-2xl mx-auto">
            Experience healthcare convenience like never before
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-[var(--bg-light)] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl text-[var(--primary-color)]">⏰</div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">Save Time & Effort</h3>
            <p className="text-[var(--accent-color)] leading-relaxed">
              No travel, no waiting rooms. Get tested in the comfort of your home.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[var(--bg-light)] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl text-[var(--primary-color)]">🛡️</div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">Safe & Sterile</h3>
            <p className="text-[var(--accent-color)] leading-relaxed">
              Hygienic procedures with disposable equipment for maximum safety.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[var(--bg-light)] text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl text-[var(--primary-color)]">👨‍👩‍👧</div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">Family Convenience</h3>
            <p className="text-[var(--accent-color)] leading-relaxed">
              Multiple family members can be tested together at home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
