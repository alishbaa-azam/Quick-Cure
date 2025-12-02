import React, { useState } from "react";
import { useParams } from "react-router-dom";
import doctorsData from "./doctorsData";
import VideoConsultation from "./VideoConsultation";
import "./SpecialityDoctors.css";

export default function SpecialityDoctors() {
  const { specialityName } = useParams();
  const speciality = doctorsData.find(
    (spec) => spec.name.toLowerCase().replace(/\s+/g, "-") === specialityName.toLowerCase()
  );

  const [modalDoctor, setModalDoctor] = useState(null);
  const [modalHospital, setModalHospital] = useState(null);

  if (!speciality) {
    return <h2 className="no-speciality">Invalid speciality</h2>;
  }

  const handleHospitalCardClick = (doctor, hospital) => { 
    setModalDoctor(doctor);
    setModalHospital(hospital);
  };

  const handleCloseModal = () => {
    setModalDoctor(null);
    setModalHospital(null);
  };

  return (
    <div className="speciality-page">
      <h1 className="page-title">
        {speciality.name} Specialists in Pakistan | Top {speciality.name}s
      </h1>

      <div className="doctor-list">
        {speciality.doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
              <div className="doctor-main">
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="pmdc">PMDC Verified</p>
                <p className="speciality-text">{speciality.name}</p>
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
              <button className="video-call-btn">Video Call</button>
              <button className="view-profile-btn">View Profile</button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Consultation Modal */}
      {modalDoctor && modalHospital && (
        <VideoConsultation
          doctor={modalDoctor}
          hospital={modalHospital}
          speciality={speciality.name}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}