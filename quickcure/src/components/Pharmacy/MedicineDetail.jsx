// components/MedicineDetail.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { medicines } from "./medicines";
import Header from "../header";
import VerificationModal from "./VerificationModal";
import "./MedicineDetail.css";

export default function MedicineDetail() {
  const { id } = useParams();
  const medicine = medicines.find((m) => m.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("about");

  if (!medicine) return <h2>Medicine not found</h2>;


  
  const tabs = [
    { key: "about", label: "About" },
    { key: "uses", label: "Uses" },
    { key: "dosage", label: "Dosage" },
    { key: "warnings", label: "Warnings" },
    { key: "precautions", label: "Precautions" },
    { key: "sideEffects", label: "Side Effects" },
  ];

  return (
    <>
      <Header />
      <div className="medicine-detail-container">
        {/* 🧭 Tabs Navigation */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🧴 Medicine Header */}
        <div className="medicine-header">
          <img src={medicine.image} alt={medicine.name} />
          <div className="medicine-info">
            <h1>{medicine.name}</h1>
            <p>
              <strong>Manufacturer:</strong> {medicine.manufacturer}
            </p>
            <p>
              <strong>Category:</strong> {medicine.category}
            </p>
            <p>
              <strong>Form:</strong> {medicine.form || "Tablet"}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {medicine.discountPrice ? (
                <>
                  <span className="discount">${medicine.discountPrice}</span>{" "}
                  <span className="original">${medicine.price}</span>
                </>
              ) : (
                <span>${medicine.price}</span>
              )}
            </p>
          </div>
        </div>

        {/* 💊 Tab Content */}
        <div className="tab-content">
          {activeTab === "about" && (
            <div>
              <h2>About {medicine.name}</h2>
              <p>{medicine.description}</p>
            </div>
          )}

          {activeTab === "uses" && medicine.uses && (
            <div>
              <h2>Uses of {medicine.name}</h2>
              <ul>
                {medicine.uses.map((use, i) => (
                  <li key={i}>{use}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "dosage" && medicine.dosage && (
            <div>
              <h2>Dosage and Administration</h2>
              <p>{medicine.dosage}</p>
            </div>
          )}

          {activeTab === "warnings" && medicine.warnings && (
            <div>
              <h2>Warnings</h2>
              <ul>
                {medicine.warnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "precautions" && medicine.precautions && (
            <div>
              <h2>Precautions</h2>
              <ul>
                {medicine.precautions.map((prec, i) => (
                  <li key={i}>{prec}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "sideEffects" && medicine.sideEffects && (
            <div>
              <h2>Possible Side Effects</h2>
              <ul>
                {medicine.sideEffects.map((effect, i) => (
                  <li key={i}>{effect}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 🛒 Buttons */}
        <div className="detail-buttons">
          <button className="buy-btn">Buy Now</button>
          <button className="back-btn" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}
