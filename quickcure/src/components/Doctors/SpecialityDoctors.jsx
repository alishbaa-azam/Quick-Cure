// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import doctorsData from "./doctorsData";
// import VideoConsultation from "./VideoConsultation";
// import "./SpecialityDoctors.css";

// export default function SpecialityDoctors() {
//   const { specialityName } = useParams();
//   const navigate = useNavigate();
//   const speciality = doctorsData.find(
//     (spec) => spec.name.toLowerCase().replace(/\s+/g, "-") === specialityName.toLowerCase()
//   );

//   const [modalDoctor, setModalDoctor] = useState(null);
//   const [modalHospital, setModalHospital] = useState(null);

//   if (!speciality) {
//     return <h2 className="no-speciality">Invalid speciality</h2>;
//   }

//   const handleHospitalCardClick = (doctor, hospital) => { 
//     setModalDoctor(doctor);
//     setModalHospital(hospital);
//   };

//   const handleCloseModal = () => {
//     setModalDoctor(null);
//     setModalHospital(null);
//   };

//   return (
//     <div className="speciality-page">
//       <h1 className="page-title">
//         {speciality.name} Specialists in Pakistan | Top {speciality.name}s
//       </h1>

//       <div className="doctor-list">
//         {speciality.doctors.map((doctor) => (
//           <div key={doctor.id} className="doctor-card">
//             <div className="doctor-header">
//               <img src={doctor.image} alt={doctor.name} className="doctor-image" />
//               <div className="doctor-main">
//                 <h2 className="doctor-name">{doctor.name}</h2>
//                 <p className="pmdc">PMDC Verified</p>
//                 <p className="speciality-text">{speciality.name}</p>
//                 <p className="qualification">{doctor.qualification}</p>
//                 <div className="doctor-stats">
//                   <div>
//                     <p className="stat-title">Experience</p>
//                     <p className="stat-value">{doctor.experience}</p>
//                   </div>
//                   <div>
//                     <p className="stat-title">Satisfaction</p>
//                     <p className="stat-value">{doctor.satisfaction}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Services */}
//             <div className="doctor-services">
//               {doctor.services?.map((service, index) => (
//                 <span key={index} className="service-tag">{service}</span>
//               ))}
//             </div>

//             {/* Hospitals - Only Video Consultation */}
//             <div className="doctor-hospitals">
//               {doctor.hospitals
//                 ?.filter(hospital => hospital.name.toLowerCase().includes("video consultation"))
//                 .map((hospital, index) => (
//                   <div
//                     key={index}
//                     className="hospital-card video-consultation-card"
//                     onClick={() => handleHospitalCardClick(doctor, hospital)}
//                   >
//                     <h4>{hospital.name}</h4>
//                     <p>{hospital.availability}</p>
//                     <p className="fee">Rs. {hospital.fee}</p>
//                   </div>
//                 ))}
//             </div>

//             {/* Buttons */}
//             <div className="doctor-buttons">
//               {/* <button className="video-call-btn">Video Call</button> */}
//               <button className="video-call-btn" onClick={() => navigate(`/video-consultation/${doctor.id}`)}>
//                Video Call
//                </button>
//                {/* <button className="view-profile-btn">View Profile</button> */}
//               <button className="view-profile-btn" onClick={() => navigate(`/doctor/${doctor.id}`)}>
//               View Profile
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Video Consultation Modal */}
//       {modalDoctor && modalHospital && (
//         <VideoConsultation
//           doctor={modalDoctor}
//           hospital={modalHospital}
//           speciality={speciality.name}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoConsultation from "./VideoConsultation";
import "./SpecialityDoctors.css";
// Capitalize first letter of a word
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


export default function SpecialityDoctors() {
  const { specialityName } = useParams();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalDoctor, setModalDoctor] = useState(null);
  const [modalHospital, setModalHospital] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/doctors/speciality/${specialityName}`
        );
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialityName]);

  const handleHospitalCardClick = (doctor, hospital) => {
    setModalDoctor(doctor);
    setModalHospital(hospital);
  };

  const handleCloseModal = () => {
    setModalDoctor(null);
    setModalHospital(null);
  };

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>{error}</p>;
  if (!doctors.length) return <h2 className="no-speciality">No doctors found for this speciality</h2>;

  return (
    <div className="speciality-page">
      <h1 className="page-title">
        {capitalize(specialityName.replace(/-/g, " "))} Specialists in Pakistan | Top {capitalize(specialityName.replace(/-/g, " "))}s
      </h1>

      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-header">
              {/* <img src={doctor.image} alt={doctor.name} className="doctor-image" /> */}
              <img src={`http://localhost:5000${doctor.image}`} alt={doctor.name} className="doctor-image" />
              <div className="doctor-main">
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="pmdc">PMDC Verified</p>
                <p className="speciality-text">{doctor.speciality}</p>
                <p className="qualification">{doctor.qualification}</p>
                <div className="doctor-stats">
                  <div>
                    <p className="stat-title">Experience</p>
                    <p className="stat-value">{doctor.experience}</p>
                  </div>
                  <div>
                    <p className="stat-title">Satisfaction</p>
                    <p className="stat-value">{doctor.satisfaction}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="doctor-services">
              {doctor.services?.map((service, index) => (
                <span key={index} className="service-tag">{service}</span>
              ))}
            </div>

            {/* Hospitals - Only Video Consultation */}
            <div className="doctor-hospitals">
              {doctor.hospitals
                ?.filter(hospital => hospital.name.toLowerCase().includes("video consultation"))
                .map((hospital, index) => (
                  <div
                    key={index}
                    className="hospital-card video-consultation-card"
                    onClick={() => handleHospitalCardClick(doctor, hospital)}
                  >
                    <h4>{hospital.name}</h4>
                    <p>{hospital.availability}</p>
                    <p className="fee">Rs. {hospital.fee}</p>
                  </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="doctor-buttons">
              <button className="video-call-btn" onClick={() => navigate(`/video-consultation/${doctor._id}`)}>
                Video Call
              </button>
              <button className="view-profile-btn" onClick={() => navigate(`/doctor/${doctor.id}`)}>View Profile</button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Consultation Modal */}
      {modalDoctor && modalHospital && (
        <VideoConsultation
          doctor={modalDoctor}
          hospital={modalHospital}
          speciality={specialityName.replace(/-/g, " ")}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}


