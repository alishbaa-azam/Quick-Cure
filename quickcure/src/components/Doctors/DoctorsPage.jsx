import React, { useState, useEffect } from "react";
import "./DoctorsPage.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Most Popular");
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // FETCH SPECIALTIES FROM API
  // =========================
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/specialties");
        setSpecialties(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load specialties");
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  // =========================
  // LOADING + ERROR HANDLERS
  // =========================
  if (loading) return <h2 className="loading">Loading specialties...</h2>;
  if (error) return <h2 className="error">{error}</h2>;

  // =========================
  // FILTER + SORT
  // =========================
  
  const filteredSpecialties = specialties
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (activeTab === "All Specialties") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="doctors-page">
      <div className="header-section">
        <h1>Find The Best Doctors Near You</h1>

        <div className="search-bar2">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search medical specialties..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveTab("All Specialties");
            }}
          />
        </div>
      </div>

      <div className="content-section">
        <div className="title-tabs-row">
          <h2 className="section-title">Most Viewed Specialities</h2>

          {/* <div className="tabs">
            <button
              className={`tab ${
                activeTab === "Most Popular" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Most Popular")}
            >
              Most Popular
            </button>

            <button
              className={`tab ${
                activeTab === "All Specialties" ? "active" : ""
              }`}
              onClick={() => setActiveTab("All Specialties")}
            >
              All Specialties (a-z)
            </button>
          </div> */}
        </div>

        <div className="cards-grid">
          {filteredSpecialties.map((item, index) => (
            <div key={index} className="specialty-card">
              <div className="icon-text-row">
                <div className="icon-circle">
                  {/* Icon from backend uploads folder */}
                  <img src={`http://localhost:5000${item.icon}`} alt={item.name} />
                </div>

                <h3>{item.name}</h3>
              </div>

              <p>{item.desc}</p>

              <div className="card-footer">
                {/* <span>{item.doctors} doctor(s)</span> */}
                <Link to={item.link}>doctor(s)</Link>
                <Link to={item.link}>Learn More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
