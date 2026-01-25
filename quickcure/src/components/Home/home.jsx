import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./home.css";
import bgImage from "../../hospital.webp"; // ← replace with your background image path
import heart from "../../images/heart-organ.png";
import dentist from "../../images/clean.png";
import bones from "../../images/bones.png";
import gynecology from "../../images/gynecology.png";
import kidney from "../../images/kidney.png";
import liver from "../../images/liver.png";
import neuro from "../../images/neuroscience.png";
import paediatric from "../../images/pediatrics.png";
import stomach from "../../images/stomach.png";
import TestimonialCarousel from './TestimonialCarousel';
// import {FaSearch} from 'react-icons/fa';

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay">
          <div className="hero-content">
            <h3>Welcome to QuickCure!</h3>
            <h1>
              Your <span>Health</span>, Our <span>Priority</span> <br /> Expert{" "}
              <span>Care</span> You Can <span>Trust!</span>
            </h1>
            <p>
              QuickCure connects you with certified doctors, reliable labs, and
              trusted pharmacies anytime, anywhere.
            </p>

            <form className="search1" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for doctors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <FaSearch  />
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section className="why-choose">
        <div className="eco">
          <h2>An Ecosystem for Online Healthcare Excellence</h2>
          <p>
            Discover world-class healthcare at QuickCure's specialized centre of
            medical innovation. Our advanced facilities offer unmatched
            expertise in key specialties and super specialties, setting new
            global standards in clinical excellence and patient care.{" "}
          </p>
        </div>
        <div className="c1">
          {/* card */}
          <div className="speciality">
            <img src={heart} alt="" />
            <div className="card-text">
              <p onClick={() => navigate("/specialities/cardiologist")}>
                <span>Cardiac Care</span>
                <br></br>
                Heart health treatment
              </p>
            </div>
          </div>

          <div className="speciality">
            <img src={dentist} alt="" />
            <div className="card-text">
              <p onClick={() => navigate("/specialities/dentist")}>
                <span>Dentistry</span>
                <br></br>
                Dental care solution
              </p>
            </div>
          </div>

          <div className="speciality">
            <img src={bones} alt="" />
            <div className="card-text">
              <p>
                <span>Orthopaedics</span>
                <br></br>
                Bones and joints care
              </p>
            </div>
          </div>

          <div className="speciality">
            <img src={stomach} alt="" />
            <div className="card-text">
              <p onClick={() => navigate("/specialities/gastroenterologist")}>
                <span>Gestrosciences</span>
                <br></br>
                Digestive health care
              </p>
            </div>
          </div>

          <div className="speciality">
            <img src={neuro} alt="" />
            <div className="card-text">
              <p onClick={() => navigate("/specialities/neurologist")}>
                <span>Neurosciences</span>
                <br></br>
                Brain and nerve Care
              </p>
            </div>
          </div>

          <div className="speciality">
            <img src={kidney} alt="" />
            <div className="card-text">
              <p onClick={() => navigate("/specialities/sonologist")}>
                <span>Renal Care</span>
                <br></br>
                Kidney health treatment
              </p>
            </div>
          </div>

          <div className="speciality">
            <img src={liver} alt="" />
            <div className="card-text">
              <p>
                <span>Liver Care</span>
                <br></br>
                Liver health and transplant
              </p>
            </div>
          </div>

          <div className="speciality">
            <img src={gynecology} alt="" />
            <div className="card-text">
              <p onClick={() => navigate("/specialities/gynecologist")}>
                <span>Gynecology</span>
                <br></br>
                Gynecological care solution
              </p>
            </div>
          </div>

          <div className="speciality">
            <img src={paediatric} alt="" />
            <div className="card-text">
              <p onClick={() => navigate("/specialities/pediatrician")}>
                <span>Paediatric Care</span>
                <br></br>
                Child health services
              </p>
            </div>
          </div>
          <button type="button" onClick={() => navigate("/doctors")}>
            {" "}
            View All Specialties <span>→</span>
          </button>
        </div>
      </section>

      <section class="why-choose">
        <p class="eco">
          <h2>
            Why Choose <span>QuickCure?</span>
          </h2>
          At QuickCure, we blend expert medical care with compassion, offering
          personalized treatment to ensure every patient feels supported and
          valued throughout their healing journey.
        </p>

        <div class="c1">
          <div class="c">
            <h3>60+ Years of Excellence</h3>
            <p>
              Decades of trusted care, prioritizing your health and well-being
            </p>
          </div>

          <div class="c">
            <h3>1000+ Expert Medical Care</h3>
            <p>
              A team of professionals committed to your Health and well-being
            </p>
          </div>

          <div class="c">
            <h3>Advanced Medical Technology</h3>
            <p>
              Medical technology for accurate diagnosis and effective treatment.
            </p>
          </div>

          <div class="c">
            <h3>98% Happy Patients</h3>
            <p>
              We take pride in creating a positive experience for every patient.
            </p>
          </div>

          <div class="c">
            <h3>40+ Years Trusted Pharmacy</h3>
            <p>
              We trusted pharmacy solutions, delivering quality care and
              reliability.
            </p>
          </div>

          <div class="c">
            <h3>Smart Lab Services</h3>
            <p>Fast, accurate, and reliable diagnostics.</p>
          </div>
        </div>
      </section>
      <TestimonialCarousel/>

    </>
  );
}

