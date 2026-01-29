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
        <div class="eco">
          <h2>
            Why Choose <span>QuickCure?</span>
          </h2>
          At QuickCure, we blend expert medical care with compassion, offering
          personalized treatment to ensure every patient feels supported and
          valued throughout their healing journey.
        </div>

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

// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import bgImage from "../../hospital.webp";
// import heart from "../../images/heart-organ.png";
// import dentist from "../../images/clean.png";
// import bones from "../../images/bones.png";
// import gynecology from "../../images/gynecology.png";
// import kidney from "../../images/kidney.png";
// import liver from "../../images/liver.png";
// import neuro from "../../images/neuroscience.png";
// import paediatric from "../../images/pediatrics.png";
// import stomach from "../../images/stomach.png";
// import TestimonialCarousel from './TestimonialCarousel';

// export default function Home() {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching for:", query);
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <section 
//         className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-[#5c878f] via-[#5c878f]/10 to-[#ff9e15]/5 opacity-90"></div>
        
//         <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//           <div className="max-w-4xl w-full text-white text-left px-4 py-12 md:py-20">
//             <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-3 text-[#ff9e15]">
//               Welcome to QuickCure!
//             </h3>
            
//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
//               Your <span className="text-[#ff9e15]">Health</span>, Our <span className="text-[#ff9e15]">Priority</span> <br /> 
//               Expert <span className="text-[#ff9e15]">Care</span> You Can <span className="text-[#ff9e15]">Trust!</span>
//             </h1>
            
//             <p className="text-base sm:text-lg md:text-xl font-semibold mb-6 md:mb-8 text-[#ff9e15]">
//               QuickCure connects you with certified doctors, reliable labs, and trusted pharmacies anytime, anywhere.
//             </p>
            
//             <form onSubmit={handleSearch} className="w-full max-w-md">
//               <div className="relative flex items-center bg-white rounded-full shadow-lg border-2 border-[#ff9e15] overflow-hidden">
//                 <input
//                   type="text"
//                   placeholder="Search for doctors..."
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-gray-900 bg-transparent outline-none text-sm sm:text-base"
//                 />
//                 <button 
//                   type="submit" 
//                   className="bg-[#ff9e15] text-white p-3 sm:p-4 rounded-full hover:bg-[#2c6774] transition-colors duration-300 m-1"
//                 >
//                   <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Specialties Section */}
//       <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
//         <div className="mb-8 sm:mb-12 lg:mb-16 lg:max-w-3xl lg:mr-auto">
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-[#2c6774]">
//             An Ecosystem for Online Healthcare Excellence
//           </h2>
//           <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
//             Discover world-class healthcare at QuickCure's specialized centre of medical innovation. 
//             Our advanced facilities offer unmatched expertise in key specialties and super specialties, 
//             setting new global standards in clinical excellence and patient care.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//           {/* Specialty Cards */}
//           {[
//             { img: heart, title: "Cardiac Care", desc: "Heart health treatment", path: "/specialities/cardiologist" },
//             { img: dentist, title: "Dentistry", desc: "Dental care solution", path: "/specialities/dentist" },
//             { img: bones, title: "Orthopaedics", desc: "Bones and joints care", path: null },
//             { img: stomach, title: "Gestrosciences", desc: "Digestive health care", path: "/specialities/gastroenterologist" },
//             { img: neuro, title: "Neurosciences", desc: "Brain and nerve Care", path: "/specialities/neurologist" },
//             { img: kidney, title: "Renal Care", desc: "Kidney health treatment", path: "/specialities/sonologist" },
//             { img: liver, title: "Liver Care", desc: "Liver health and transplant", path: null },
//             { img: gynecology, title: "Gynecology", desc: "Gynecological care solution", path: "/specialities/gynecologist" },
//             { img: paediatric, title: "Paediatric Care", desc: "Child health services", path: "/specialities/pediatrician" },
//           ].map((specialty, index) => (
//             <div 
//               key={index}
//               className="border-2 border-[#9fbfc5] rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-md"
//               onClick={() => specialty.path && navigate(specialty.path)}
//             >
//               <div className="p-2 sm:p-3">
//                 <img src={specialty.img} alt={specialty.title} className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" />
//               </div>
//               <div>
//                 <p className="text-sm sm:text-base">
//                   <span className="font-bold text-[#2c6774]">{specialty.title}</span>
//                   <br />
//                   <span className="text-gray-600">{specialty.desc}</span>
//                 </p>
//               </div>
//             </div>
//           ))}

//           {/* View All Button */}
//           <button
//             type="button"
//             onClick={() => navigate("/doctors")}
//             className="col-span-1 sm:col-span-2 lg:col-span-3 justify-self-start bg-[#2c6774] text-white text-sm sm:text-base lg:text-lg font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-[#1a4d57] hover:-translate-y-1 transition-all duration-300 shadow-md mt-4 sm:mt-6 lg:mt-8"
//           >
//             View All Specialties <span className="ml-2">→</span>
//           </button>
//         </div>
//       </section>

//       {/* Why Choose Section */}
//       <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8 sm:mb-12 lg:mb-16 lg:max-w-3xl">
//             <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
//               Why Choose <span className="text-[#2c6774]">QuickCure?</span>
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
//               At QuickCure, we blend expert medical care with compassion, offering personalized treatment 
//               to ensure every patient feels supported and valued throughout their healing journey.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//             {[
//               { title: "60+ Years of Excellence", desc: "Decades of trusted care, prioritizing your health and well-being" },
//               { title: "1000+ Expert Medical Care", desc: "A team of professionals committed to your Health and well-being" },
//               { title: "Advanced Medical Technology", desc: "Medical technology for accurate diagnosis and effective treatment." },
//               { title: "98% Happy Patients", desc: "We take pride in creating a positive experience for every patient." },
//               { title: "40+ Years Trusted Pharmacy", desc: "We trusted pharmacy solutions, delivering quality care and reliability." },
//               { title: "Smart Lab Services", desc: "Fast, accurate, and reliable diagnostics." },
//             ].map((item, index) => (
//               <div 
//                 key={index}
//                 className={`rounded-xl p-5 sm:p-6 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
//                   index % 2 === 0 ? 'bg-[#2c6774]' : 'bg-[#ff9e15]'
//                 }`}
//               >
//                 <h3 className="text-lg sm:text-xl font-bold mb-3">{item.title}</h3>
//                 <p className="text-sm sm:text-base">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <TestimonialCarousel />
//     </>
//   );
// }