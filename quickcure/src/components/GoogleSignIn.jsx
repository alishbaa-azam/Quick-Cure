import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoogleSignIn.css";
import googleLogo from "../images/google.png";
import backgroundImage from "../images/background.png";

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (email.trim() !== "") {
      navigate("/password", { state: { email } });
    } else {
      alert("Please enter your email");
    }
  };

  return (
    <div
      className="google-signin-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="overlay"></div>

      <div className="google-signin-box">
        <div className="google-header">
          <img src={googleLogo} alt="Google Logo" />
          <span>Sign in with Google</span>
        </div>

        <div className="signin-content">
          <h2>Sign in</h2>
          <p>
            to continue to <span className="brand">QuickCure</span>
          </p>

          <input
            type="email"
            placeholder="Email or phone"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <a href="#" className="forgot-email">Forgot email?</a>

          <p className="policy-text">
            Before using this app, you can review QuickCure’s{" "}
            <a href="#">privacy policy</a> and terms of service.
          </p>

          <div className="button-row">
            <a href="#" className="create-account">Create account</a>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>

      <div className="google-footer">
        <select>
          <option>English (United States)</option>
          <option>Urdu</option>
          <option>العربية</option>
        </select>
        <div className="footer-links">
          <a href="#">Help</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  );
}
