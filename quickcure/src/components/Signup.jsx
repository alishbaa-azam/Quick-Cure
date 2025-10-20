import React from "react";
import "./Signup.css";
import backgroundImage from "../images/background.png";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}

    >
      <div className="overlay"></div>

      <div className="signup-box">
        <h1>Create an Account</h1>
        <p className="subtitle">Please fill in your details</p>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <label>Date of Birth</label>
          <input type="date" required />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="terms-text">
          By signing up, I agree to QuickCure <a href="#">Terms of Use</a> &{" "}
          <a href="#">Privacy Policy</a>. I understand that I may opt out of
          QuickCure subscriptions at any time.
        </p>

        <p className="login-text">
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
}