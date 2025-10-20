import React, { useState } from "react";
import "./header.css";
import logo from "../images/logo.svg";
import {FaCaretDown} from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav>
      <section className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h3>QuickCure</h3>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={isMenuOpen ? "active" : ""}>
        <li className={`dropdown ${activeDropdown === 'doctor' ? 'active' : ''}`}>
          <a href="#!" onClick={() => toggleDropdown('doctor')}>
            Doctors <FaCaretDown/>
          </a>
          <div className="dropdown-content">
            <a href="#!" onClick={closeMenu}>Dermatologist</a>
            <a href="#!" onClick={closeMenu}>Gynecologist</a>
            <a href="#!" onClick={closeMenu}>Neurologist</a>
            <a href="#!" onClick={closeMenu}>Pychiatrist</a>
            <a href="#!" onClick={closeMenu}>Psycologist</a>
            <a href="#!" onClick={closeMenu}>Urologist</a>
            {/* <a href="#!" onClick={closeMenu}>General Physician</a>/ */}
            <a href="#!" onClick={closeMenu}>Gestroentrologist</a>
            <a href="#!" onClick={closeMenu}>Pediatrician</a>
            <a href="#!" onClick={closeMenu}>General Practitioner</a>
            <a href="#!" onClick={closeMenu}>Nutritionist</a>
            <a href="#!" onClick={closeMenu}>All specialities</a>
          </div>
        </li>

        <li className={`dropdown ${activeDropdown === 'medicines' ? 'active' : ''}`}>
          <a href="#!" onClick={() => toggleDropdown('medicines')}>
            Medicines <FaCaretDown/>
          </a>
          <div className="dropdown-content">
            <a href="#!" onClick={closeMenu}>Medicines</a>
            <a href="#!" onClick={closeMenu}>All Medicines</a>
          </div>
        </li>

        <li className={`dropdown ${activeDropdown === 'labs' ? 'active' : ''}`}>
          <a href="#!" onClick={() => toggleDropdown('labs')}>
            Labs <FaCaretDown/>
          </a>
          <div className="dropdown-content">
            <a href="#!" onClick={closeMenu}>Chughtai Lab</a>
            <a href="#!" onClick={closeMenu}>Dr. Essa's Laboratory & Diagnostic Center</a>
            <a href="#!" onClick={closeMenu}>Excel Labs</a>
            <a href="#!" onClick={closeMenu}>All Labs</a>
          </div>
        </li>

        <li><a href="#!" onClick={closeMenu}>About</a></li>
        <li className="w-30" ><a href="#!" onClick={closeMenu}>Join as doctor</a></li>
      <button className="login-btn" onClick={closeMenu}>Login</button>        
      </ul>
      </section>
    </nav>
  );
}
