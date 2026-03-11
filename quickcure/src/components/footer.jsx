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
        <a href="#">Book Appointment</a>
        <a href="#">Order Medicines</a>
        <a href="#">Book Lab Test</a>
        <a href="#">About Us</a>
        <Link to="/contact">Contact Us</Link>
        <a href="#">Terms & Policies</a>
      </div>

      {/* ===== Copyright ===== */}
      <div className="footer-bottom">
        <p>© {currentYear} QuickCure. All rights reserved. | Since 2025</p>
      </div>

      {/* ===== WhatsApp Float Button ===== */}
      {/* <a 
        href="https://wa.me/1234567890" 
        className="whatsapp-btn" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp />
      </a> */}
    </footer>
  );
}