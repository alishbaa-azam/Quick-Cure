import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import googleLogo from "../images/google.png";
import backgroundImage from "../images/background.png";
import siteLogo from "../images/logo.png";   

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    console.log("✅ Google button clicked");
    navigate("/google-signin");
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay"></div>

      <div className="login-box">
        <div className="welcome-row">
          <img src={siteLogo} alt="Logo" className="welcome-logo" />
          <h1>Welcome</h1>
        </div>

        <p className="subtitle">Please enter your details</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <div className="remember-row">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="signin-btn">
            Sign in
          </button>
        </form>

        <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
          <img src={googleLogo} alt="Google Logo" />
          Sign in with Google
        </button>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
