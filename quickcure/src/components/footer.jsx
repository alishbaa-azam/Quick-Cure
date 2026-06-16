import React from "react";
import "./footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHeadset,
  FaLock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaWhatsapp
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* ===== Social Section ===== */}
      
      <div className="footer-social">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="#!" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#!" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#!" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#!" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>
      

      {/* ===== Service Section ===== */}
      <div className="service">
      <div className="footer-services">
        <div className="service-item">
          <FaShieldAlt className="icon" />
          <div className="service-item-content">
            <h3>PMC Verified Doctors</h3>
            <p>Authentic & updated information</p>
          </div>
        </div>
        <div className="service-item">
          <FaMoneyBillWave className="icon" />
          <div className="service-item-content">
            <h3>Money back guarantee</h3>
            <p>Refund within 48 hours</p>
          </div>
        </div>
        <div className="service-item">
          <FaHeadset className="icon" />
          <div className="service-item-content">
            <h3>24/7 Customer Support</h3>
            <p>Well-trained & friendly team</p>
          </div>
        </div>
        <div className="service-item">
          <FaLock className="icon" />
          <div className="service-item-content">
            <h3>Secure Online Payment</h3>
            <p>SSL / Secure certificate</p>
          </div>
        </div>
      </div>
      </div>

      {/* ===== Quick Links ===== */}
      <div className="footer-links">
        <Link to="/doctors">Book Appointment</Link>
        <Link to="/medicines">Order Medicines</Link>
        <Link to="/labs">Book Lab Test</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/termspolicies">Terms & Policies</Link>
      </div>

      {/* ===== Copyright ===== */}
      <div className="footer-bottom">
        <p>© {currentYear} QuickCure. All rights reserved. | Since 2025</p>
      </div>
    </footer>
  );
}