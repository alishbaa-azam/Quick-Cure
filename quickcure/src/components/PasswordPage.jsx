import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PasswordPage.css";
import backgroundImage from "../images/background.png";

export default function PasswordPage() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [initial, setInitial] = useState("");

  useEffect(() => {
    const userEmail = location.state?.email || "example@gmail.com";
    setEmail(userEmail);

    const firstChar = userEmail.trim().charAt(0).toUpperCase();
    setInitial(firstChar);
  }, [location.state]);

  return (
    <div
      className="password-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="password-box">
        <div className="google-header">
          <img
            src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
            alt="Google Logo"
          />
          <span>Sign in with Google</span>
        </div>

        <h2 className="welcome-text">Welcome</h2>

        <div className="user-email left-align">
          <div className="user-initial-circle small">{initial}</div>
          <span>{email}</span>
        </div>

        <p className="verify-text left-align">To continue, first verify it’s you</p>

        <input
          type="password"
          placeholder="Enter your password"
          className="password-input"
        />

        <div className="show-password">
          <input type="checkbox" id="show" />
          <label htmlFor="show">Show password</label>
        </div>

        {/* ✅ Added Privacy Policy & Terms line here */}
        <p className="policy-text">
          Before using this app, you can review QuickCure’s{" "}
          <a href="#">privacy policy</a> and <a href="#">terms of service</a>.
        </p>

        <div className="button-row">
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
          <button className="next-btn">Next</button>
        </div>
      </div>

      <div className="password-footer">
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
