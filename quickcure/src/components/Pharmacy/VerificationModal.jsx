import React, { useState } from "react";
import "./VerificationModal.css";

const VerificationModal = ({ medicine, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Verification request sent successfully!");
    onClose();
  };

  return (
    <div class="modal-overlay">
    <div className="verification-modal">
      <div className="verification-modal-content">
        <h2>Verify Purchase</h2>
        <p className="modal-medicine-name">{medicine.name}</p>

        <form className="verification-form" onSubmit={handleSubmit}>
          <div className="verification-form-inputs">
            <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Age"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <textarea
                  placeholder="Full Address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  pattern="[0-9]{10,15}"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

                <div className="modal-buttons">
                  <button type="submit" className="verify-btn">Submit Order</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
                </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default VerificationModal;
