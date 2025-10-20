import React, { useState } from "react";
import "./DoctorsPage.css";
import { Search } from "lucide-react";

import dermatologistIcon from "../images/Dermatologist.png";
import gynecologistIcon from "../images/Gynecologist.png";
import urologistIcon from "../images/Urologist.png";
import gastroenterologistIcon from "../images/Gastroenterologist.png";
import generalPhysicianIcon from "../images/General Physician.png";
import psychiatristIcon from "../images/Psychiatrist.png";
import psychologistIcon from "../images/Psychologist.png";
import orthopedicSurgeonIcon from "../images/Orthopedic Surgeon.png";
import dentistIcon from "../images/Dentist.png";
import generalSurgeonIcon from "../images/General Surgeon.png";
import pediatricianIcon from "../images/Pediatrician.png";
import neurologistIcon from "../images/Neurologist.png";
import physiotherapistIcon from "../images/Physiotherapist.png";
import cardiologistIcon from "../images/Cardiologist.png";
import pulmonologistIcon from "../images/Pulmonologist.png";
import eyeSpecialistIcon from "../images/Eye Specialist.png";
import cancerSpecialistIcon from "../images/Oncologist.png";
import liverSpecialistIcon from "../images/Liver Specialist.png";
import counselorIcon from "../images/Counselor.png";
import audiologistIcon from "../images/Audiologist.png";
import immunologistIcon from "../images/Immunologist.png";
import nutritionistIcon from "../images/Nutritionist.png";
import endocrinologistIcon from "../images/Endocrinologist.png";
import hematologistIcon from "../images/Hematologist.png";
import painSpecialistIcon from "../images/Pain Specialist.png";
import sonologistIcon from "../images/Sonologist.png";
import pathologistIcon from "../images/Pathologist.png";
import fitnessTrainerIcon from "../images/Fitness Trainer.png";
import geneticistIcon from "../images/Geneticist.png";
import chiropractorIcon from "../images/Chiropractor.png";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Most Popular");

  const specialties = [
    { name: "Dermatologist", desc: "The specialists who treat skin problems are called dermatologists or skin specialists.", doctors: "1,322 Doctor(s)", icon: dermatologistIcon },
    { name: "Gynecologist", desc: "Gynecologists are those specialists that treat women reproductive issues & child birth.", doctors: "3,304 Doctor(s)", icon: gynecologistIcon },
    { name: "Urologist", desc: "Urologists are specialist who diagnose, treat and manage conditions that affect reproductive and bladder health in men.", doctors: "656 Doctor(s)", icon: urologistIcon },
    { name: "Gastroenterologist", desc: "Gastroenterologists are specialists who work in diagnosing and treating disorders related to the digestive system.", doctors: "582 Doctor(s)", icon: gastroenterologistIcon },
    { name: "General Physician", desc: "General Physician is a medical doctor who specializes in the non-surgical treatment of all types of diseases, illnesses and injuries affecting the body.", doctors: "3,414 Doctor(s)", icon: generalPhysicianIcon },
    { name: "Psychiatrist", desc: "Psychiatrist is a doctor with specialized training in the diagnosis and treatment methods of mental illnesses.", doctors: "656 Doctor(s)", icon: psychiatristIcon },
    { name: "Psychologist", desc: "Psychologists are experts in studying the normal and abnormal mental state of a person by observing and interpreting behavior.", doctors: "2,329 Doctor(s)", icon: psychologistIcon },
    { name: "Orthopedic Surgeon", desc: "Orthopedic surgeons are qualified to diagnose and manage or treat all the problems related to bones and soft tissues.", doctors: "1,267 Doctor(s)", icon: orthopedicSurgeonIcon },
    { name: "Dentist", desc: "Dentist is a doctor who specializes in the diagnosis, prevention and treatment of diseases of the teeth and oral cavity.", doctors: "3,594 Doctor(s)", icon: dentistIcon },
    { name: "General Surgeon", desc: "General surgeon is a physician who is a specialist in the diagnosis, preoperative, operative, and postoperative management of patient care.", doctors: "1,847 Doctor(s)", icon: generalSurgeonIcon },
    { name: "Pediatrician", desc: "Pediatrician deals with all childhood ailments right from birth.", doctors: "2,107 Doctor(s)", icon: pediatricianIcon },
    { name: "Neurologist", desc: "Neurologist is a medical doctor who specializes in evaluating, diagnosing, and treating diseases that affect the nervous system.", doctors: "403 Doctor(s)", icon: neurologistIcon },
    { name: "Physiotherapist", desc: "Physiotherapists are specialists who aid people with disease, disability, and pain by exercise, therapy and rehabilitation services along with ways to improve mobility and independence.", doctors: "2,461 Doctor(s)", icon: physiotherapistIcon },
    { name: "Cardiologist", desc: "Cardiologist is a specialist in diagnosing and treating diseases of the cardiovascular system.", doctors: "1,146 Doctor(s)", icon: cardiologistIcon },
    { name: "Pulmonologist / Lung Specialist", desc: "Pulmonologist is a specialist dealing with diseases and conditions affecting lungs and their functionality.", doctors: "491 Doctor(s)", icon: pulmonologistIcon },
    { name: "Eye Specialist", desc: "Eye Specialist is a doctor who specializes in the diagnosis and treatment of diseases that affect eyes, focus on regular vision care and prescribe eyeglasses and contacts.", doctors: "684 Doctor(s)", icon: eyeSpecialistIcon },
    { name: "Cancer Specialist / Oncologist", desc: "An Oncologist specializes in the diagnosis, treatment, and management of cancer. They recommend appropriate treatment and care for cancer patients.", doctors: "233 Doctor(s)", icon: cancerSpecialistIcon },
    { name: "Liver Specialist", desc: "Liver specialist or a Hepatologist is a specialist who diagnoses and treats disorders of the liver, pancreas, gallbladder and biliary tree.", doctors: "23 Doctor(s)", icon: liverSpecialistIcon },
    { name: "Counselor", desc: "A Counselor guides and supports those who are facing emotional and psychological challenges in life.", doctors: "108 Doctor(s)", icon: counselorIcon },
    { name: "Audiologist", desc: "Audiologists are professionals who are experts in the diagnosis, prevention and treatment of hearing problems and balance disorders for people of all ages.", doctors: "88 Doctor(s)", icon: audiologistIcon },
    { name: "Immunologist", desc: "An immunologist is a specialist who is an expert in treating immunology diseases.", doctors: "4 Doctor(s)", icon: immunologistIcon },
    { name: "Nutritionist", desc: "Nutritionist is an expert in the field of food and nutrition and advise people on what to eat in order to maintain a healthy lifestyle or achieve a specific health-related goal.", doctors: "1,123 Doctor(s)", icon: nutritionistIcon },
    { name: "Endocrinologist", desc: "Endocrine doctors are specialists that work on diagnosing and treating diseases affecting glands, hormones and endocrine system.", doctors: "179 Doctor(s)", icon: endocrinologistIcon },
    { name: "Hematologist", desc: "Hematologist is a specialist are experts in the diagnosis and treatment of blood disorders and malignancies, including types of hemophilia, leukemia, lymphoma and sickle-cell anemia.", doctors: "115 Doctor(s)", icon: hematologistIcon },
    { name: "Pain Specialist", desc: "The Pain Specialist makes a medical diagnosis of chronic pain conditions before treating patients through medications combined with therapies and invasive procedures to enhance their quality of life.", doctors: "77 Doctor(s)", icon: painSpecialistIcon },
    { name: "Sonologist", desc: "Sonologist uses ultrasound devices to get internal body images used for diagnosis and other medical purposes.", doctors: "332 Doctor(s)", icon: sonologistIcon },
    { name: "Pathologist", desc: "Pathologist is a physician in the medical field who studies the causes, nature, and effects of any disease.", doctors: "81 Doctor(s)", icon: pathologistIcon },
    { name: "Fitness Trainer", desc: "Fitness Trainers design customized workout strategies which they supervise to enhance their clients' physical fitness while maintaining their health.", doctors: "7 Doctor(s)", icon: fitnessTrainerIcon },
    { name: "Geneticist", desc: "A geneticist is a professional who studies genes, including how they are inherited, mutated, activated, or inactivated.", doctors: "5 Doctor(s)", icon: geneticistIcon },
    { name: "Chiropractor", desc: "A Chiropractor treats issues related to vertebrae, such as alignment and pain. They address muscular skeleton issues and provide therapies to resolve them.", doctors: "27 Doctor(s)", icon: chiropractorIcon },
  ];

  const filteredSpecialties = specialties
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (activeTab === "All Specialties") return a.name.localeCompare(b.name);
      else return 0;
    });

  return (
    <div className="doctors-page">
      <div className="header-section">
        <h1>Find The Best Doctors Near You</h1>
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search medical specialties..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveTab("All Specialties");
            }}
          />
        </div>
      </div>

      <div className="content-section">
        <div className="title-tabs-row">
          <h2 className="section-title">Most Viewed Specialities</h2>
          <div className="tabs">
            <button
              className={`tab ${activeTab === "Most Popular" ? "active" : ""}`}
              onClick={() => setActiveTab("Most Popular")}
            >
              Most Popular
            </button>
            <button
              className={`tab ${activeTab === "All Specialties" ? "active" : ""}`}
              onClick={() => setActiveTab("All Specialties")}
            >
              All Specialties (a-z)
            </button>
          </div>
        </div>

        <div className="cards-grid">
          {filteredSpecialties.map((item, index) => (
            <div key={index} className="specialty-card">
              <div className="icon-text-row">
                <div className="icon-circle">
                  <img src={item.icon} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
              </div>
              <p>{item.desc}</p>
              <div className="card-footer">
                <span>{item.doctors}</span>
                <a href="#">Learn More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
