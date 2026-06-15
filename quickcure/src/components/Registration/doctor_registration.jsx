import React, { useState, useEffect, useRef } from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaBriefcase,
  FaFileUpload,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner
} from "react-icons/fa";
import Select from "react-select";
import axios from "axios";

const DoctorRegistration = () => {
  const containerRef = useRef(null);
  
  const [step, setStep] = useState(1);
  const [isCheckingCNIC, setIsCheckingCNIC] = useState(false);
  const [cnicExists, setCnicExists] = useState(false);
  const [isCheckingLicense, setIsCheckingLicense] = useState(false);
  const [licenseExists, setLicenseExists] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    cnic: "",
    address: "",
    city: "",
    country: "Pakistan",
    profilePicture: null,
    qualification: "",
    specialization: "",
    institute: null,
    passingYear: "",
    otherQualification: "",
    otherSpecialization: "",
    experienceYears: "",
    currentHospital: null,
    designation: "",
    otherDesignation: "",
    licenseNumber: "",
    idCardFront: null,
    idCardBack: null,
    doctorLicense: null,
    mbbsCertificate: null,
    houseJobCertificate: null,
    specializationCertificate: null,
    fcpsCertificate: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 23, today.getMonth(), today.getDate());
    return minDate.toISOString().split('T')[0];
  };

  const getMaxPassingDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const instituteOptions = [
    // { value: "Aga Khan University (Karachi)", label: "Aga Khan University (Karachi)" },
    // { value: "Al-Nafees Medical College (Islamabad)", label: "Al-Nafees Medical College (Islamabad)" },
    // { value: "Allama Iqbal Medical College (Lahore)", label: "Allama Iqbal Medical College (Lahore)" },
    // { value: "Ayub Medical College (Abbottabad)", label: "Ayub Medical College (Abbottabad)" },
    // { value: "King Edward Medical University (Lahore)", label: "King Edward Medical University (Lahore)" },
    // { value: "Dow Medical College (Karachi)", label: "Dow Medical College (Karachi)" },
    // { value: "Fatima Jinnah Medical University (Lahore)", label: "Fatima Jinnah Medical University (Lahore)" },
    // { value: "Rawalpindi Medical University (Rawalpindi)", label: "Rawalpindi Medical University (Rawalpindi)" },
    // { value: "Khyber Medical College (Peshawar)", label: "Khyber Medical College (Peshawar)" },
    // { value: "Bolan Medical College (Quetta)", label: "Bolan Medical College (Quetta)" },
    // { value: "Nishtar Medical University (Multan)", label: "Nishtar Medical University (Multan)" },
    // { value: "Faisalabad Medical University (Faisalabad)", label: "Faisalabad Medical University (Faisalabad)" },
    // { value: "Harvard Medical School (USA)", label: "Harvard Medical School (USA)" },
    // { value: "University of Oxford Medical Sciences Division (UK)", label: "University of Oxford Medical Sciences Division (UK)" },
    // { value: "Other", label: "Other" }

{ value: "Aga Khan University (Karachi)", label: "Aga Khan University (Karachi)" },
    { value: "Al-Nafees Medical College (Islamabad)", label: "Al-Nafees Medical College (Islamabad)" },
    { value: "Allama Iqbal Medical College (Lahore)", label: "Allama Iqbal Medical College (Lahore)" },
    { value: "Avicenna Medical College (Lahore)", label: "Avicenna Medical College (Lahore)" },
    { value: "Ayub Medical College (Abbottabad)", label: "Ayub Medical College (Abbottabad)" },
    { value: "Aziz Fatimah Medical & Dental College (Faisalabad)", label: "Aziz Fatimah Medical & Dental College (Faisalabad)" },
    { value: "Bahria University Medical & Dental College (Karachi)", label: "Bahria University Medical & Dental College (Karachi)" },
    { value: "Bakhtawar Amin Medical College (Multan)", label: "Bakhtawar Amin Medical College (Multan)" },
    { value: "Bolan Medical College (Quetta)", label: "Bolan Medical College (Quetta)" },
    { value: "Central Park Medical College (Lahore)", label: "Central Park Medical College (Lahore)" },
    { value: "CMH Lahore Medical College (Lahore)", label: "CMH Lahore Medical College (Lahore)" },
    { value: "CMH Multan Institute of Medical Sciences (Multan)", label: "CMH Multan Institute of Medical Sciences (Multan)" },
    { value: "Continental Medical College (Lahore)", label: "Continental Medical College (Lahore)" },
    { value: "D.G. Khan Medical College (Dera Ghazi Khan)", label: "D.G. Khan Medical College (Dera Ghazi Khan)" },
    { value: "Dental College HITEC-IMS (Taxila)", label: "Dental College HITEC-IMS (Taxila)" },
    { value: "Dow International Medical College (Karachi)", label: "Dow International Medical College (Karachi)" },
    { value: "Dow Medical College (Karachi)", label: "Dow Medical College (Karachi)" },
    { value: "Faisalabad Medical University (Faisalabad)", label: "Faisalabad Medical University (Faisalabad)" },
    { value: "Fatima Jinnah Medical University (Lahore)", label: "Fatima Jinnah Medical University (Lahore)" },
    { value: "Foundation University Medical College (Islamabad)", label: "Foundation University Medical College (Islamabad)" },
    { value: "Ghulam Muhammad Mahar Medical College (Sukkur)", label: "Ghulam Muhammad Mahar Medical College (Sukkur)" },
    { value: "Gujranwala Medical College (Gujranwala)", label: "Gujranwala Medical College (Gujranwala)" },
    { value: "Hamdard College of Medicine & Dentistry (Karachi)", label: "Hamdard College of Medicine & Dentistry (Karachi)" },
    { value: "Independent Medical College (Faisalabad)", label: "Independent Medical College (Faisalabad)" },
    { value: "Islamic International Medical College (Rawalpindi)", label: "Islamic International Medical College (Rawalpindi)" },
    { value: "Islamabad Medical & Dental College (Islamabad)", label: "Islamabad Medical & Dental College (Islamabad)" },
    { value: "Jinnah Medical & Dental College (Karachi)", label: "Jinnah Medical & Dental College (Karachi)" },
    { value: "Jinnah Medical College (Peshawar)", label: "Jinnah Medical College (Peshawar)" },
    { value: "Jinnah Sindh Medical University (Karachi)", label: "Jinnah Sindh Medical University (Karachi)" },
    { value: "Kabir Medical College (Peshawar)", label: "Kabir Medical College (Peshawar)" },
    { value: "Khyber Girls Medical College (Peshawar)", label: "Khyber Girls Medical College (Peshawar)" },
    { value: "Khyber Medical College (Peshawar)", label: "Khyber Medical College (Peshawar)" },
    { value: "King Edward Medical University (Lahore)", label: "King Edward Medical University (Lahore)" },
    { value: "Lahore Medical & Dental College (Lahore)", label: "Lahore Medical & Dental College (Lahore)" },
    { value: "Liaquat College of Medicine & Dentistry (Karachi)", label: "Liaquat College of Medicine & Dentistry (Karachi)" },
    { value: "Liaquat University of Medical & Health Sciences (Jamshoro)", label: "Liaquat University of Medical & Health Sciences (Jamshoro)" },
    { value: "Multan Medical & Dental College (Multan)", label: "Multan Medical & Dental College (Multan)" },
    { value: "Nishtar Medical University (Multan)", label: "Nishtar Medical University (Multan)" },
    { value: "Northwest School of Medicine (Peshawar)", label: "Northwest School of Medicine (Peshawar)" },
    { value: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)", label: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)" },
    { value: "Peshawar Medical College (Peshawar)", label: "Peshawar Medical College (Peshawar)" },
    { value: "Quaid-e-Azam Medical College (Bahawalpur)", label: "Quaid-e-Azam Medical College (Bahawalpur)" },
    { value: "Rawal Institute of Health Sciences (Islamabad)", label: "Rawal Institute of Health Sciences (Islamabad)" },
    { value: "Rawalpindi Medical University (Rawalpindi)", label: "Rawalpindi Medical University (Rawalpindi)" },
    { value: "Rehman Medical College (Peshawar)", label: "Rehman Medical College (Peshawar)" },
    { value: "Saidu Medical College (Swat)", label: "Saidu Medical College (Swat)" },
    { value: "Sargodha Medical College (Sargodha)", label: "Sargodha Medical College (Sargodha)" },
    { value: "Sharif Medical & Dental College (Lahore)", label: "Sharif Medical & Dental College (Lahore)" },
    { value: "Sheikh Khalifa Bin Zayed Al-Nahyan Medical College (Lahore)", label: "Sheikh Khalifa Bin Zayed Al-Nahyan Medical College (Lahore)" },
    { value: "Sheikh Zayed Medical College (Rahim Yar Khan)", label: "Sheikh Zayed Medical College (Rahim Yar Khan)" },
    { value: "Shifa College of Medicine (Islamabad)", label: "Shifa College of Medicine (Islamabad)" },
    { value: "Sindh Medical College (Karachi)", label: "Sindh Medical College (Karachi)" },
    { value: "University Medical & Dental College Faisalabad (Faisalabad)", label: "University Medical & Dental College Faisalabad (Faisalabad)" },
    { value: "University of Balochistan (Quetta)", label: "University of Balochistan (Quetta)" },
    { value: "University of Health Sciences (Lahore)", label: "University of Health Sciences (Lahore)" },
    { value: "Wah Medical College (Wah Cantt)", label: "Wah Medical College (Wah Cantt)" },
    { value: "Women Medical College (Abbottabad)", label: "Women Medical College (Abbottabad)" },
    { value: "Ziauddin Medical College (Karachi)", label: "Ziauddin Medical College (Karachi)" },
    { value: "Boston University School of Medicine (USA)", label: "Boston University School of Medicine (USA)" },
    { value: "Columbia University Vagelos College of Physicians and Surgeons (USA)", label: "Columbia University Vagelos College of Physicians and Surgeons (USA)" },
    { value: "Duke University School of Medicine (USA)", label: "Duke University School of Medicine (USA)" },
    { value: "Harvard Medical School (USA)", label: "Harvard Medical School (USA)" },
    { value: "Imperial College London Faculty of Medicine (UK)", label: "Imperial College London Faculty of Medicine (UK)" },
    { value: "Johns Hopkins University School of Medicine (USA)", label: "Johns Hopkins University School of Medicine (USA)" },
    { value: "Karolinska Institute (Sweden)", label: "Karolinska Institute (Sweden)" },
    { value: "King's College London GKT School of Medical Education (UK)", label: "King's College London GKT School of Medical Education (UK)" },
    { value: "McGill University Faculty of Medicine (Canada)", label: "McGill University Faculty of Medicine (Canada)" },
    { value: "Monash University Faculty of Medicine (Australia)", label: "Monash University Faculty of Medicine (Australia)" },
    { value: "National University of Singapore Yong Loo Lin School of Medicine (Singapore)", label: "National University of Singapore Yong Loo Lin School of Medicine (Singapore)" },
    { value: "New York University Grossman School of Medicine (USA)", label: "New York University Grossman School of Medicine (USA)" },
    { value: "Northwestern University Feinberg School of Medicine (USA)", label: "Northwestern University Feinberg School of Medicine (USA)" },
    { value: "Stanford University School of Medicine (USA)", label: "Stanford University School of Medicine (USA)" },
    { value: "Trinity College Dublin School of Medicine (Ireland)", label: "Trinity College Dublin School of Medicine (Ireland)" },
    { value: "University College London Medical School (UK)", label: "University College London Medical School (UK)" },
    { value: "University of California, San Francisco School of Medicine (USA)", label: "University of California, San Francisco School of Medicine (USA)" },
    { value: "University of Cambridge School of Clinical Medicine (UK)", label: "University of Cambridge School of Clinical Medicine (UK)" },
    { value: "University of Edinburgh Medical School (UK)", label: "University of Edinburgh Medical School (UK)" },
    { value: "University of Melbourne Medical School (Australia)", label: "University of Melbourne Medical School (Australia)" },
    { value: "University of Michigan Medical School (USA)", label: "University of Michigan Medical School (USA)" },
    { value: "University of Oxford Medical Sciences Division (UK)", label: "University of Oxford Medical Sciences Division (UK)" },
    { value: "University of Pennsylvania Perelman School of Medicine (USA)", label: "University of Pennsylvania Perelman School of Medicine (USA)" },
    { value: "University of Sydney School of Medicine (Australia)", label: "University of Sydney School of Medicine (Australia)" },
    { value: "University of Toronto Temerty Faculty of Medicine (Canada)", label: "University of Toronto Temerty Faculty of Medicine (Canada)" },
    { value: "University of Washington School of Medicine (USA)", label: "University of Washington School of Medicine (USA)" },
    { value: "Washington University in St. Louis School of Medicine (USA)", label: "Washington University in St. Louis School of Medicine (USA)" },
    { value: "Yale School of Medicine (USA)", label: "Yale School of Medicine (USA)" }

  ];

  const hospitalOptions = [
    // { value: "Aga Khan University Hospital (Karachi)", label: "Aga Khan University Hospital (AKUH) (Karachi)" },
    // { value: "Shifa International Hospital (Islamabad)", label: "Shifa International Hospital (Islamabad)" },
    // { value: "Mayo Hospital (Lahore)", label: "Mayo Hospital (Lahore)" },
    // { value: "Jinnah Hospital Lahore", label: "Jinnah Hospital (Lahore)" },
    // { value: "Services Hospital (Lahore)", label: "Services Hospital (Lahore)" },
    // { value: "Lady Reading Hospital (Peshawar)", label: "Lady Reading Hospital (Peshawar)" },
    // { value: "Civil Hospital Karachi", label: "Civil Hospital Karachi" },
    // { value: "Jinnah Post Graduate Medical Centre (Karachi)", label: "JPMC (Karachi)" },
    // { value: "Pakistan Institute of Medical Sciences (Islamabad)", label: "PIMS (Islamabad)" },
    // { value: "Combined Military Hospital Rawalpindi", label: "CMH Rawalpindi" },
    // { value: "Combined Military Hospital Lahore", label: "CMH Lahore" },
    // { value: "Shaukat Khanum Memorial Cancer Hospital (Lahore)", label: "Shaukat Khanum Hospital (Lahore)" },
    // { value: "Doctors Hospital (Lahore)", label: "Doctors Hospital (Lahore)" },
    // { value: "Nishtar Hospital (Multan)", label: "Nishtar Hospital (Multan)" },
    // { value: "Allied Hospital (Faisalabad)", label: "Allied Hospital (Faisalabad)" },
    // { value: "Other", label: "Other" }

// Government Hospitals
    { value: "Abbas Institute of Medical Sciences (AIMS) (Muzaffarabad)", label: "Abbas Institute of Medical Sciences (AIMS) (Muzaffarabad)" },
    { value: "Abbasi Shaheed Hospital (ASH) (Karachi)", label: "Abbasi Shaheed Hospital (ASH) (Karachi)" },
    { value: "Allied Hospital (AH) (Faisalabad)", label: "Allied Hospital (AH) (Faisalabad)" },
    { value: "Ayub Teaching Hospital (ATH) (Abbottabad)", label: "Ayub Teaching Hospital (ATH) (Abbottabad)" },
    { value: "Aziz Bhatti Shaheed Hospital (ABSH) (Gujrat)", label: "Aziz Bhatti Shaheed Hospital (ABSH) (Gujrat)" },
    { value: "Bahawal Victoria Hospital (BVH) (Bahawalpur)", label: "Bahawal Victoria Hospital (BVH) (Bahawalpur)" },
    { value: "Benazir Bhutto Hospital (BBH) (Rawalpindi)", label: "Benazir Bhutto Hospital (BBH) (Rawalpindi)" },
    { value: "Bolan Medical Complex Hospital (BMCH) (Quetta)", label: "Bolan Medical Complex Hospital (BMCH) (Quetta)" },
    { value: "Civil Hospital Karachi (CHK) (Karachi)", label: "Civil Hospital Karachi (CHK) (Karachi)" },
    { value: "Civil Hospital, Larkana (CHL) (Larkana)", label: "Civil Hospital, Larkana (CHL) (Larkana)" },
    { value: "Combined Military Hospital Lahore (CMH Lahore) (Lahore)", label: "Combined Military Hospital Lahore (CMH Lahore) (Lahore)" },
    { value: "Combined Military Hospital Rawalpindi (CMH Rawalpindi) (Rawalpindi)", label: "Combined Military Hospital Rawalpindi (CMH Rawalpindi) (Rawalpindi)" },
    { value: "DHQ Hospital Faisalabad (DHQ) (Faisalabad)", label: "DHQ Hospital Faisalabad (DHQ) (Faisalabad)" },
    { value: "DHQ Hospital Gilgit (DHQ) (Gilgit)", label: "DHQ Hospital Gilgit (DHQ) (Gilgit)" },
    { value: "District Headquarter Hospital Battagram (DHQ) (Battagram)", label: "District Headquarter Hospital Battagram (DHQ) (Battagram)" },
    { value: "Gambat Institute of Medical Sciences (GIMS) (Gambat)", label: "Gambat Institute of Medical Sciences (GIMS) (Gambat)" },
    { value: "Hayatabad Medical Complex (HMC) (Peshawar)", label: "Hayatabad Medical Complex (HMC) (Peshawar)" },
    { value: "Holy Family Hospital (HFH) (Rawalpindi)", label: "Holy Family Hospital (HFH) (Rawalpindi)" },
    { value: "Institute of Infection Diseases (IID) (Karachi)", label: "Institute of Infection Diseases (IID) (Karachi)" },
    { value: "Jinnah Hospital Lahore (JHL) (Lahore)", label: "Jinnah Hospital Lahore (JHL) (Lahore)" },
    { value: "Jinnah Post Graduate Medical Centre (JPMC) (Karachi)", label: "Jinnah Post Graduate Medical Centre (JPMC) (Karachi)" },
    { value: "Khyber Teaching Hospital (KTH) (Peshawar)", label: "Khyber Teaching Hospital (KTH) (Peshawar)" },
    { value: "Lady Reading Hospital (LRH) (Peshawar)", label: "Lady Reading Hospital (LRH) (Peshawar)" },
    { value: "Lahore General Hospital (LGH) (Lahore)", label: "Lahore General Hospital (LGH) (Lahore)" },
    { value: "Liaquat University Hospital (LUH) (Hyderabad/Jamshoro)", label: "Liaquat University Hospital (LUH) (Hyderabad/Jamshoro)" },
    { value: "Mayo Hospital (MH) (Lahore)", label: "Mayo Hospital (MH) (Lahore)" },
    { value: "Mian Muhammad Trust Hospital (MMT) (Lahore)", label: "Mian Muhammad Trust Hospital (MMT) (Lahore)" },
    { value: "Military Hospital Rawalpindi (MH Rawalpindi) (Rawalpindi)", label: "Military Hospital Rawalpindi (MH Rawalpindi) (Rawalpindi)" },
    { value: "Multan Institute of Cardiology (MIC) (Multan)", label: "Multan Institute of Cardiology (MIC) (Multan)" },
    { value: "National Institute of Cardiovascular Diseases (NICVD) (Karachi)", label: "National Institute of Cardiovascular Diseases (NICVD) (Karachi)" },
    { value: "National Institute of Child Health (NICH) (Karachi)", label: "National Institute of Child Health (NICH) (Karachi)" },
    { value: "National Police Hospital (NPH) (Islamabad)", label: "National Police Hospital (NPH) (Islamabad)" },
    { value: "Nishtar Hospital (NH) (Multan)", label: "Nishtar Hospital (NH) (Multan)" },
    { value: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)", label: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)" },
    { value: "Punjab Institute of Cardiology (PIC) (Lahore)", label: "Punjab Institute of Cardiology (PIC) (Lahore)" },
    { value: "Punjab Social Security Hospital (PSSH) (Lahore)", label: "Punjab Social Security Hospital (PSSH) (Lahore)" },
    { value: "Rawalpindi Institute of Cardiology (RIC) (Rawalpindi)", label: "Rawalpindi Institute of Cardiology (RIC) (Rawalpindi)" },
    { value: "Recep Tayyip Erdoğan Hospital (RTEH) (Muzaffargarh)", label: "Recep Tayyip Erdoğan Hospital (RTEH) (Muzaffargarh)" },
    { value: "Saidu Teaching Hospital (STH) (Saidu Sharif)", label: "Saidu Teaching Hospital (STH) (Saidu Sharif)" },
    { value: "Services Hospital (SHL) (Lahore)", label: "Services Hospital (SHL) (Lahore)" },
    { value: "Shaikh Zayed Hospital (SZH) (Lahore)", label: "Shaikh Zayed Hospital (SZH) (Lahore)" },
    { value: "Sindh Institute of Urology & Transplantation (SIUT) (Karachi)", label: "Sindh Institute of Urology & Transplantation (SIUT) (Karachi)" },
    { value: "Social Security Hospital (SSH) (Lahore)", label: "Social Security Hospital (SSH) (Lahore)" },
    { value: "The Children's Hospital Lahore (CHL) (Lahore)", label: "The Children's Hospital Lahore (CHL) (Lahore)" },
    
//     // Private Hospitals
    { value: "Aga Khan University Hospital (AKUH) (Karachi)", label: "Aga Khan University Hospital (AKUH) (Karachi)" },
    { value: "Al Falah International Hospital (AFIH) (Abbottabad)", label: "Al Falah International Hospital (AFIH) (Abbottabad)" },
    { value: "Al Khidmat Hospital (AKH) (Peshawar)", label: "Al Khidmat Hospital (AKH) (Peshawar)" },
    { value: "Chiniot General Hospital (CGH) (Karachi)", label: "Chiniot General Hospital (CGH) (Karachi)" },
    { value: "Dar Ul Sehat Medical Complex (DSMC) (Malakand)", label: "Dar Ul Sehat Medical Complex (DSMC) (Malakand)" },
    { value: "Doctors Hospital (DHL) (Lahore)", label: "Doctors Hospital (DHL) (Lahore)" },
    { value: "Farooq Hospital (FH) (Lahore)", label: "Farooq Hospital (FH) (Lahore)" },
    { value: "Fatima Memorial Hospital (FMH) (Lahore)", label: "Fatima Memorial Hospital (FMH) (Lahore)" },
    { value: "Ghurki Trust & Teaching Hospital (GTTH) (Lahore)", label: "Ghurki Trust & Teaching Hospital (GTTH) (Lahore)" },
    { value: "Hameed Latif Hospital (HLH) (Lahore)", label: "Hameed Latif Hospital (HLH) (Lahore)" },
    { value: "Indus Hospital (TIH) (Karachi)", label: "Indus Hospital (TIH) (Karachi)" },
    { value: "Irfan General Hospital (IGH) (Peshawar)", label: "Irfan General Hospital (IGH) (Peshawar)" },
    { value: "Ittefaq Hospital (IH) (Lahore)", label: "Ittefaq Hospital (IH) (Lahore)" },
    { value: "Jinnah Teaching Hospital (JTH) (Peshawar)", label: "Jinnah Teaching Hospital (JTH) (Peshawar)" },
    { value: "Kuwait Teaching Hospital (KTH) (Peshawar)", label: "Kuwait Teaching Hospital (KTH) (Peshawar)" },
    { value: "Liaquat National Hospital (LNH) (Karachi)", label: "Liaquat National Hospital (LNH) (Karachi)" },
    { value: "Mid City Hospital (MCH) (Lahore)", label: "Mid City Hospital (MCH) (Lahore)" },
    { value: "National Hospital & Medical Center (NHMC) (Lahore)", label: "National Hospital & Medical Center (NHMC) (Lahore)" },
    { value: "National Medical Center (NMC) (Karachi)", label: "National Medical Center (NMC) (Karachi)" },
    { value: "Northwest General Hospital (NWGH) (Peshawar)", label: "Northwest General Hospital (NWGH) (Peshawar)" },
    { value: "Omar Hospital (OH) (Lahore)", label: "Omar Hospital (OH) (Lahore)" },
    { value: "PIMS Hospital (PIMSH) (Peshawar)", label: "PIMS Hospital (PIMSH) (Peshawar)" },
    { value: "Prime Care Hospital (PCH) (Lahore)", label: "Prime Care Hospital (PCH) (Lahore)" },
    { value: "Prime Teaching Hospital (PTH) (Peshawar)", label: "Prime Teaching Hospital (PTH) (Peshawar)" },
    { value: "Quaid-e-Azam International Hospital (QIH) (Islamabad)", label: "Quaid-e-Azam International Hospital (QIH) (Islamabad)" },
    { value: "Rehman Medical Institute (RMI) (Peshawar)", label: "Rehman Medical Institute (RMI) (Peshawar)" },
    { value: "Saifee Hospital (SHK) (Karachi)", label: "Saifee Hospital (SHK) (Karachi)" },
    { value: "Shafa International Hospital (SIH) (Islamabad)", label: "Shafa International Hospital (SIH) (Islamabad)" },
    { value: "Shalamar Hospital (SHL) (Lahore)", label: "Shalamar Hospital (SHL) (Lahore)" },
    { value: "Shaukat Khanum Memorial Cancer Hospital (SKMCH) (Lahore)", label: "Shaukat Khanum Memorial Cancer Hospital (SKMCH) (Lahore)" },
    { value: "Shifa International Hospital (SIH) (Islamabad)", label: "Shifa International Hospital (SIH) (Islamabad)" },
    { value: "South City Hospital (SCH) (Karachi)", label: "South City Hospital (SCH) (Karachi)" },
    { value: "Surgimed Hospital (SHL) (Lahore)", label: "Surgimed Hospital (SHL) (Lahore)" },
    { value: "United Christian Hospital (UCH) (Lahore)", label: "United Christian Hospital (UCH) (Lahore)" },
    
//     // International Hospitals
    { value: "King Faisal Specialist Hospital & Research Center (Saudi Arabia)", label: "King Faisal Specialist Hospital & Research Center (Saudi Arabia)" },
    { value: "Massachusetts General Hospital (USA)", label: "Massachusetts General Hospital (USA)" },
    { value: "Singapore General Hospital (Singapore)", label: "Singapore General Hospital (Singapore)" }


  ];

  const qualificationOptions = [
    { value: "MBBS", label: "MBBS" },
    { value: "MD", label: "MD" },
    { value: "FCPS", label: "FCPS" },
    { value: "FRCS", label: "FRCS" },
    { value: "MRCP", label: "MRCP" },
    { value: "MCPS", label: "MCPS" },
    { value: "MRCS", label: "MRCS" },
    { value: "Diploma in Medicine", label: "Diploma in Medicine" },
    { value: "Other", label: "Other" }
  ];

  const specializationData = {
    "Family Medicine": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Family Medicine)", duration: 4 },
    "Cardiology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Cardiology)", duration: 5 },
    "General Surgery": { priorDegree: "MBBS", mandatoryAfter: "FCPS (General Surgery)", duration: 5 },
    "Gynecology & Obstetrics": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Gynae & Obs)", duration: 5 },
    "Pediatrics": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Pediatrics)", duration: 4 },
    "Orthopedic Surgery": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Orthopedics)", duration: 5 },
    "Neurosurgery": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Neurosurgery)", duration: 6 },
    "Dermatology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Dermatology)", duration: 4 },
    "Psychiatry": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Psychiatry)", duration: 4 },
    "Radiology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Radiology)", duration: 5 },
    "Anesthesiology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Anesthesiology)", duration: 4 },
    "Ophthalmology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Ophthalmology)", duration: 4 },
    "ENT": { priorDegree: "MBBS", mandatoryAfter: "FCPS (ENT)", duration: 4 },
    "Urology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Urology)", duration: 5 },
    "Nephrology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Nephrology)", duration: 5 },
    "Gastroenterology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Gastroenterology)", duration: 5 },
    "Pulmonology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Pulmonology)", duration: 4 },
    "Neurology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Neurology)", duration: 5 },
    "Hematology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Hematology)", duration: 4 },
    "Oncology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Oncology)", duration: 5 },
    "Pediatric Surgery": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Pediatric Surgery)", duration: 5 },
    "Cardiac Surgery": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Cardiac Surgery)", duration: 6 },
    "Plastic Surgery": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Plastic Surgery)", duration: 5 },
    "Vascular Surgery": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Vascular Surgery)", duration: 5 },
    "Thoracic Surgery": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Thoracic Surgery)", duration: 5 },
    "Emergency Medicine": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Emergency Medicine)", duration: 4 },
    "Critical Care Medicine": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Critical Care)", duration: 4 },
    "Neonatology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Neonatology)", duration: 4 },
    "Rheumatology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Rheumatology)", duration: 4 },
    "Endocrinology": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Endocrinology)", duration: 4 },
    "Infectious Diseases": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Infectious Diseases)", duration: 4 },
    "Nuclear Medicine": { priorDegree: "MBBS", mandatoryAfter: "FCPS (Nuclear Medicine)", duration: 4 },
    "Clinical Pathology": { priorDegree: "MBBS", mandatoryAfter: "MCPS / FCPS (Pathology)", duration: 4 },
    "General Physician": { priorDegree: "MBBS", mandatoryAfter: null, duration: 0 },
    "Other": { priorDegree: null, mandatoryAfter: null, duration: 0 }
  };

  const specializationOptions = Object.keys(specializationData).map(key => ({
    value: key,
    label: key
  }));

  const designationOptions = [
    { value: "House Officer", label: "House Officer" },
    { value: "Medical Officer", label: "Medical Officer" },
    { value: "Senior Medical Officer", label: "Senior Medical Officer" },
    { value: "Resident Medical Officer", label: "Resident Medical Officer" },
    { value: "Registrar", label: "Registrar" },
    { value: "Senior Registrar", label: "Senior Registrar" },
    { value: "Fellow", label: "Fellow" },
    { value: "Clinical Fellow", label: "Clinical Fellow" },
    { value: "Consultant", label: "Consultant" },
    { value: "Senior Consultant", label: "Senior Consultant" },
    { value: "Surgeon", label: "Surgeon" },
    { value: "Senior Surgeon", label: "Senior Surgeon" },
    { value: "Cardiac Surgeon", label: "Cardiac Surgeon" },
    { value: "Neurosurgeon", label: "Neurosurgeon" },
    { value: "Orthopedic Surgeon", label: "Orthopedic Surgeon" },
    { value: "Plastic Surgeon", label: "Plastic Surgeon" },
    { value: "Pediatric Surgeon", label: "Pediatric Surgeon" },
    { value: "General Surgeon", label: "General Surgeon" },
    { value: "Physician", label: "Physician" },
    { value: "Specialist", label: "Specialist" },
    { value: "Head of Department", label: "Head of Department" },
    { value: "Medical Director", label: "Medical Director" },
    { value: "Assistant Professor", label: "Assistant Professor" },
    { value: "Associate Professor", label: "Associate Professor" },
    { value: "Professor", label: "Professor" },
    { value: "Other", label: "Other" }
  ];

  const steps = [
    { icon: <FaUserMd />, label: "Personal" },
    { icon: <FaGraduationCap />, label: "Education" },
    { icon: <FaBriefcase />, label: "Professional" },
    { icon: <FaFileUpload />, label: "Documents" },
    { icon: <FaEye />, label: "Review" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  useEffect(() => {
    const checkCNIC = async () => {
      if (formData.cnic && formData.cnic.length === 13 && /^\d{13}$/.test(formData.cnic)) {
        setIsCheckingCNIC(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/doctor-registration/check-cnic/${formData.cnic}`);
          setCnicExists(response.data.exists);
          if (response.data.exists) {
            setErrors(prev => ({ ...prev, cnic: "This CNIC is already registered" }));
          } else {
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.cnic;
              return newErrors;
            });
          }
        } catch (error) {
          console.error("CNIC check failed:", error);
          setCnicExists(false);
        } finally {
          setIsCheckingCNIC(false);
        }
      }
    };

    const timeoutId = setTimeout(checkCNIC, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.cnic]);

  useEffect(() => {
    const checkLicense = async () => {
      const licensePattern = /^\d{5}-[PSD]$/;
      if (formData.licenseNumber && licensePattern.test(formData.licenseNumber)) {
        setIsCheckingLicense(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/doctor-registration/check-license/${formData.licenseNumber}`);
          setLicenseExists(response.data.exists);
          if (response.data.exists) {
            setErrors(prev => ({ ...prev, licenseNumber: "This license number is already registered" }));
          } else {
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.licenseNumber;
              return newErrors;
            });
          }
        } catch (error) {
          console.error("License check failed:", error);
          setLicenseExists(false);
        } finally {
          setIsCheckingLicense(false);
        }
      }
    };

    const timeoutId = setTimeout(checkLicense, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.licenseNumber]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file && !file.type.startsWith('image/') && name !== 'doctorLicense' && name !== 'mbbsCertificate' && name !== 'houseJobCertificate' && name !== 'specializationCertificate' && name !== 'fcpsCertificate') {
        setErrors({ ...errors, [name]: "Only image files are allowed" });
        return;
      }
      
      setFormData({
        ...formData,
        [name]: file
      });
      
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    } else {
      if (name === "email") {
        setFormData({
          ...formData,
          [name]: value,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
      
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    }
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption
    });
    
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: null });
    }
  };

  const handleLicenseChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/\s/g, '');
    
    // Remove any existing hyphen
    value = value.replace(/-/g, '');
    
    // Extract numbers and letters
    let numbers = '';
    let suffix = '';
    
    for (let char of value) {
      if (/[0-9]/.test(char) && numbers.length < 5) {
        numbers += char;
      } else if (/[A-Z]/.test(char) && suffix.length < 1) {
        suffix = char;
      }
    }
    
    // Format with hyphen when both parts exist
    let formattedValue = numbers;
    if (numbers.length === 5 && suffix) {
      formattedValue = `${numbers}-${suffix}`;
    } else if (numbers.length === 5) {
      formattedValue = `${numbers}-`;
    }
    
    setFormData({
      ...formData,
      licenseNumber: formattedValue
    });
    
    setLicenseExists(false);
  };

  const validateEmail = (email) => {
    if (!email) return false;
    
    // Check for uppercase letters - reject if any uppercase
    if (/[A-Z]/.test(email)) {
      return false;
    }
    
    if (/\s/.test(email)) {
      return false;
    }
    
    const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }
    
    const domain = email.split('@')[1];
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      return false;
    }
    
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2 || tld.length > 6) {
      return false;
    }
    
    if (domain.includes('..')) {
      return false;
    }
    
    return true;
  };

  const calculateAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateYearsSincePassing = (passingYear) => {
    if (!passingYear) return 0;
    const passingDate = new Date(passingYear);
    const today = new Date();
    return today.getFullYear() - passingDate.getFullYear();
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required";
      
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (/[A-Z]/.test(formData.email)) {
        newErrors.email = "Email must be in lowercase only (no capital letters allowed)";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address (lowercase only)";
      }
      
      if (!formData.phone?.trim()) {
        newErrors.phone = "Phone number required";
      } else if (!/^03[0-9]{9}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 11 digits starting with 03";
      }
      
      if (!formData.gender) newErrors.gender = "Gender required";
      
      if (!formData.dob) {
        newErrors.dob = "Date of birth required";
      } else {
        const age = calculateAge(formData.dob);
        if (age < 23) {
          newErrors.dob = `You must be at least 23 years old to register (current age: ${age})`;
        }
      }
      
      if (!formData.cnic?.trim()) {
        newErrors.cnic = "CNIC required";
      } else if (!/^[0-9]{13}$/.test(formData.cnic)) {
        newErrors.cnic = "CNIC must be 13 digits";
      } else if (cnicExists) {
        newErrors.cnic = "This CNIC is already registered";
      }
      
      if (!formData.address?.trim()) newErrors.address = "Address required";
      if (!formData.city?.trim()) newErrors.city = "City required";
      if (!formData.country?.trim()) newErrors.country = "Country required";
      if (!formData.profilePicture) newErrors.profilePicture = "Profile picture is required";
    } 
    else if (step === 2) {
      if (!formData.qualification) newErrors.qualification = "Qualification required";
      if (formData.qualification?.value === "Other" && !formData.otherQualification?.trim()) {
        newErrors.otherQualification = "Please specify your qualification";
      }
      if (!formData.specialization) newErrors.specialization = "Specialization required";
      if (formData.specialization?.value === "Other" && !formData.otherSpecialization?.trim()) {
        newErrors.otherSpecialization = "Please specify your specialization";
      }
      if (!formData.institute) newErrors.institute = "Institute required";
      
      if (!formData.passingYear) {
        newErrors.passingYear = "Passing year required";
      } else {
        const passingDate = new Date(formData.passingYear);
        const today = new Date();
        if (passingDate > today) {
          newErrors.passingYear = "Passing date cannot be in the future";
        }
        
        // Check if passing year is after DOB
        if (formData.dob) {
          const dobDate = new Date(formData.dob);
          const minPassingDate = new Date(dobDate);
          minPassingDate.setFullYear(dobDate.getFullYear() + 17);
          
          if (passingDate < minPassingDate) {
            newErrors.passingYear = "Passing date is too early for your age (minimum 17 years after birth)";
          }
        }
      }
    } 
    else if (step === 3) {
      if (!formData.experienceYears?.trim()) {
        newErrors.experienceYears = "Experience required";
      } else if (!/^\d+$/.test(formData.experienceYears)) {
        newErrors.experienceYears = "Experience must be a number";
      } else {
        const expYears = parseInt(formData.experienceYears);
        const yearsSincePassing = calculateYearsSincePassing(formData.passingYear);
        
        if (expYears < 1) {
          newErrors.experienceYears = "Minimum experience required is 1 year";
        } else if (expYears > 60) {
          newErrors.experienceYears = "Maximum experience allowed is 60 years";
        } else if (expYears > yearsSincePassing) {
          newErrors.experienceYears = `Experience cannot exceed years since passing (${yearsSincePassing} years)`;
        }
        
        if (formData.specialization?.value && specializationData[formData.specialization.value]) {
          const requiredDuration = specializationData[formData.specialization.value].duration;
          if (expYears < requiredDuration && requiredDuration > 0) {
            newErrors.experienceYears = `This specialization requires at least ${requiredDuration} years of training`;
          }
        }
      }
      
      if (!formData.currentHospital) newErrors.currentHospital = "Current hospital required";
      
      if (!formData.designation) {
        newErrors.designation = "Designation required";
      }
      if (formData.designation?.value === "Other" && !formData.otherDesignation?.trim()) {
        newErrors.otherDesignation = "Please specify your designation";
      }
      
      if (!formData.licenseNumber?.trim()) {
        newErrors.licenseNumber = "License number required";
      } else {
        const licensePattern = /^\d{5}-[PSD]$/;
        if (!licensePattern.test(formData.licenseNumber)) {
          newErrors.licenseNumber = "License must be 5 digits followed by P, S, or D (e.g., 12345-P)";
        } else if (licenseExists) {
          newErrors.licenseNumber = "This license number is already registered";
        }
      }
    } 
    else if (step === 4) {
      if (!formData.idCardFront) newErrors.idCardFront = "ID card front image required";
      if (!formData.idCardBack) newErrors.idCardBack = "ID card back image required";
      if (!formData.doctorLicense) newErrors.doctorLicense = "Doctor license required";
      if (!formData.mbbsCertificate) newErrors.mbbsCertificate = "MBBS certificate required";
      
      if (formData.qualification?.value === "FCPS" && !formData.fcpsCertificate) {
        newErrors.fcpsCertificate = "FCPS certificate is required for FCPS qualification";
      }
      
      if (formData.specialization?.value && specializationData[formData.specialization.value]?.mandatoryAfter && !formData.specializationCertificate) {
        newErrors.specializationCertificate = `${specializationData[formData.specialization.value].mandatoryAfter} certificate is required`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };
  
  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleEditStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const showNotificationModal = (message, type = "success") => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
    
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    if (cnicExists) {
      setErrors(prev => ({ ...prev, cnic: "This CNIC is already registered" }));
      return;
    }
    
    if (licenseExists) {
      setErrors(prev => ({ ...prev, licenseNumber: "This license number is already registered" }));
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('cnic', formData.cnic);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('country', formData.country);
      
      formDataToSend.append('qualification', formData.qualification?.value === "Other" ? formData.otherQualification : formData.qualification?.value);
      formDataToSend.append('specialization', formData.specialization?.value === "Other" ? formData.otherSpecialization : formData.specialization?.value);
      formDataToSend.append('institute', formData.institute?.value === "Other" ? formData.otherInstitute : (formData.institute?.value || formData.institute));
      formDataToSend.append('passingYear', formData.passingYear);
      
      formDataToSend.append('experienceYears', formData.experienceYears);
      formDataToSend.append('currentHospital', formData.currentHospital?.value === "Other" ? formData.otherHospital : (formData.currentHospital?.value || formData.currentHospital));
      formDataToSend.append('designation', formData.designation?.value === "Other" ? formData.otherDesignation : formData.designation?.value);
      formDataToSend.append('licenseNumber', formData.licenseNumber);
      
      if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);
      if (formData.idCardFront) formDataToSend.append('idCardFront', formData.idCardFront);
      if (formData.idCardBack) formDataToSend.append('idCardBack', formData.idCardBack);
      if (formData.doctorLicense) formDataToSend.append('doctorLicense', formData.doctorLicense);
      if (formData.mbbsCertificate) formDataToSend.append('mbbsCertificate', formData.mbbsCertificate);
      if (formData.houseJobCertificate) formDataToSend.append('houseJobCertificate', formData.houseJobCertificate);
      if (formData.specializationCertificate) formDataToSend.append('specializationCertificate', formData.specializationCertificate);
      if (formData.fcpsCertificate) formDataToSend.append('fcpsCertificate', formData.fcpsCertificate);

      const response = await axios.post('http://localhost:5000/api/doctor-registration/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        setRegistrationNumber(response.data.data.registrationNumber);
        showNotificationModal(` ${response.data.message}`, "success");
        
        setFormData({
          fullName: "", email: "", phone: "", gender: "", dob: "", cnic: "",
          address: "", city: "", country: "Pakistan", profilePicture: null,
          qualification: "", specialization: "", institute: null, passingYear: "",
          otherQualification: "", otherSpecialization: "",
          experienceYears: "", currentHospital: null, designation: "", otherDesignation: "", licenseNumber: "",
          idCardFront: null, idCardBack: null, doctorLicense: null, mbbsCertificate: null,
          houseJobCertificate: null, specializationCertificate: null, fcpsCertificate: null,
        });
        setStep(1);
        setCnicExists(false);
        setLicenseExists(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setSubmitError(errorMessage);
      showNotificationModal(`${errorMessage}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ReviewSection = () => (
    <div className="space-y-6">
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
          <h3 className="text-xl font-bold text-green-700 mb-2">Registration Successful!</h3>
          <p className="text-gray-600 mb-3">Your registration number is:</p>
          <p className="text-2xl font-mono font-bold text-[#2c6774] bg-white p-3 rounded-lg border border-green-200">
            {registrationNumber}
          </p>
          <p className="text-sm text-gray-500 mt-3">Please save this number for future reference</p>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-800">
            <FaTimesCircle className="text-red-500 mr-2" />
            <span className="font-medium">Error: {submitError}</span>
          </div>
        </div>
      )}

      <div className="border border-[#c0d3dc] rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#174047] text-lg">Personal Information</h3>
          <button onClick={() => handleEditStep(1)} className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]">
            <FaEdit className="mr-1 h-3 w-3" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ReviewItem label="Full Name" value={formData.fullName} />
          <ReviewItem label="Email" value={formData.email} />
          <ReviewItem label="Phone" value={formData.phone} />
          <ReviewItem label="Gender" value={formData.gender} />
          <ReviewItem label="Date of Birth" value={formData.dob} />
          <ReviewItem label="CNIC" value={formData.cnic} />
          <ReviewItem label="Address" value={formData.address} />
          <ReviewItem label="City" value={formData.city} />
          <ReviewItem label="Country" value={formData.country} />
          <ReviewItem label="Profile Picture" value={formData.profilePicture?.name || "Uploaded"} />
        </div>
      </div>

      <div className="border border-[#c0d3dc] rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#174047] text-lg">Education Information</h3>
          <button onClick={() => handleEditStep(2)} className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]">
            <FaEdit className="mr-1 h-3 w-3" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ReviewItem label="Qualification" value={formData.qualification?.value === "Other" ? formData.otherQualification : formData.qualification?.label} />
          <ReviewItem label="Specialization" value={formData.specialization?.value === "Other" ? formData.otherSpecialization : formData.specialization?.label} />
          <ReviewItem label="Institute" value={formData.institute?.label || formData.institute} />
          <ReviewItem label="Passing Year" value={formData.passingYear} />
        </div>
      </div>

      <div className="border border-[#c0d3dc] rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#174047] text-lg">Professional Information</h3>
          <button onClick={() => handleEditStep(3)} className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]">
            <FaEdit className="mr-1 h-3 w-3" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ReviewItem label="Experience" value={`${formData.experienceYears} years`} />
          <ReviewItem label="Current Hospital" value={formData.currentHospital?.label || formData.currentHospital} />
          <ReviewItem label="Designation" value={formData.designation?.value === "Other" ? formData.otherDesignation : formData.designation?.label} />
          <ReviewItem label="License Number" value={formData.licenseNumber} />
        </div>
      </div>

      <div className="border border-[#c0d3dc] rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#174047] text-lg">Documents Uploaded</h3>
          <button onClick={() => handleEditStep(4)} className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]">
            <FaEdit className="mr-1 h-3 w-3" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DocumentStatus label="ID Card Front" file={formData.idCardFront} />
          <DocumentStatus label="ID Card Back" file={formData.idCardBack} />
          <DocumentStatus label="Doctor License" file={formData.doctorLicense} />
          <DocumentStatus label="MBBS Degree" file={formData.mbbsCertificate} />
          <DocumentStatus label="House Job" file={formData.houseJobCertificate} />
          <DocumentStatus label="Specialization" file={formData.specializationCertificate} />
          <DocumentStatus label="FCPS" file={formData.fcpsCertificate} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
        <button type="button" className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1" onClick={handlePrevious}>
          ← Previous
        </button>
        <button type="button" className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2" onClick={handleSubmit} disabled={isSubmitting || submitSuccess}>
          {isSubmitting ? (<> <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span> Submitting... </>) : submitSuccess ? ('Already Submitted') : ('Submit Registration')}
        </button>
      </div>
    </div>
  );

  const ReviewItem = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-[#174047] break-words">{value || "—"}</p>
    </div>
  );

  const DocumentStatus = ({ label, file }) => (
    <div className={`px-3 py-1 rounded text-xs font-medium ${file ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
      {label}: {file ? "✓ Uploaded" : "—"}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Full Name *</label>
                <input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" />
                {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Email Address *</label>
                <input type="email" name="email" placeholder="Enter your email (lowercase only)" value={formData.email} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" />
                <p className="text-xs text-gray-500 mt-1">Lowercase letters only (no CAPITALS allowed)</p>
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Phone Number *</label>
                <input type="tel" name="phone" placeholder="03001234567" value={formData.phone} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" maxLength="11" />
                <p className="text-xs text-gray-500 mt-1">Must start with 03</p>
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Date of Birth *</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" max={getMinDate()} />
                <p className="text-xs text-gray-500 mt-1">Minimum age: 23 years</p>
                {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">CNIC Number *</label>
                <div className="relative">
                  <input type="text" name="cnic" placeholder="1234512345678" value={formData.cnic} onChange={(e) => { const value = e.target.value.replace(/\D/g, '').slice(0, 13); setFormData({ ...formData, cnic: value }); setCnicExists(false); }} className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] w-full ${cnicExists ? 'border-red-500' : 'border-[#c0d3dc]'}`} maxLength="13" />
                  {isCheckingCNIC && <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-[#2c6774]" />}
                </div>
                {errors.cnic && <span className="text-red-500 text-sm mt-1">{errors.cnic}</span>}
                {cnicExists && !errors.cnic && <span className="text-red-500 text-sm mt-1">This CNIC is already registered</span>}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-medium text-[#174047] mb-1">Address *</label>
                <input type="text" name="address" placeholder="Street address, area" value={formData.address} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" />
                {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">City *</label>
                <input type="text" name="city" placeholder="Enter your city" value={formData.city} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" />
                {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Country *</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" />
                {errors.country && <span className="text-red-500 text-sm mt-1">{errors.country}</span>}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-medium text-[#174047] mb-1">Profile Picture *</label>
                <input type="file" name="profilePicture" onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" accept="image/*" />
                <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG (max 5MB)</p>
                {errors.profilePicture && <span className="text-red-500 text-sm mt-1">{errors.profilePicture}</span>}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button type="button" className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleNext} disabled={cnicExists}>
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Qualification *</label>
                <Select options={qualificationOptions} value={formData.qualification} onChange={(option) => handleSelectChange(option, 'qualification')} placeholder="Select qualification..." isSearchable={true} className="react-select-container" classNamePrefix="react-select" />
                {errors.qualification && <span className="text-red-500 text-sm mt-1">{errors.qualification}</span>}
              </div>

              {formData.qualification?.value === "Other" && (
                <div className="flex flex-col">
                  <label className="font-medium text-[#174047] mb-1">Specify Qualification *</label>
                  <input type="text" name="otherQualification" placeholder="Enter your qualification" value={formData.otherQualification} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" />
                  {errors.otherQualification && <span className="text-red-500 text-sm mt-1">{errors.otherQualification}</span>}
                </div>
              )}

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Specialization *</label>
                <Select options={specializationOptions} value={formData.specialization} onChange={(option) => handleSelectChange(option, 'specialization')} placeholder="Select specialization..." isSearchable={true} className="react-select-container" classNamePrefix="react-select" />
                {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
                {formData.specialization?.value && specializationData[formData.specialization.value]?.mandatoryAfter && (
                  <p className="text-xs text-[#2c6774] mt-1">
                    Required: {specializationData[formData.specialization.value].mandatoryAfter} ({specializationData[formData.specialization.value].duration} years training)
                  </p>
                )}
              </div>

              {formData.specialization?.value === "Other" && (
                <div className="flex flex-col">
                  <label className="font-medium text-[#174047] mb-1">Specify Specialization *</label>
                  <input type="text" name="otherSpecialization" placeholder="Enter your specialization" value={formData.otherSpecialization} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" />
                  {errors.otherSpecialization && <span className="text-red-500 text-sm mt-1">{errors.otherSpecialization}</span>}
                </div>
              )}

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Institute/University *</label>
                <Select options={instituteOptions} value={formData.institute} onChange={(option) => handleSelectChange(option, 'institute')} placeholder="Search institute..." isSearchable={true} className="react-select-container" classNamePrefix="react-select" styles={{ menu: (provided) => ({ ...provided, maxHeight: '300px', overflowY: 'auto' }) }} />
                {errors.institute && <span className="text-red-500 text-sm mt-1">{errors.institute}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Year of Passing *</label>
                <input type="date" name="passingYear" value={formData.passingYear} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" max={getMaxPassingDate()} />
                <p className="text-xs text-gray-500 mt-1">Cannot be a future date</p>
                {errors.passingYear && <span className="text-red-500 text-sm mt-1">{errors.passingYear}</span>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button type="button" className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto" onClick={handlePrevious}>
                ← Previous
              </button>
              <button type="button" className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto" onClick={handleNext}>
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Years of Experience *</label>
                <input type="text" name="experienceYears" placeholder="Enter years (1-60)" value={formData.experienceYears} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); setFormData({ ...formData, experienceYears: value }); }} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" maxLength="2" />
                <p className="text-xs text-gray-500 mt-1">Minimum 1 year, Maximum 60 years</p>
                {errors.experienceYears && <span className="text-red-500 text-sm mt-1">{errors.experienceYears}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Current Hospital *</label>
                <Select options={hospitalOptions} value={formData.currentHospital} onChange={(option) => handleSelectChange(option, 'currentHospital')} placeholder="Search hospital..." isSearchable={true} className="react-select-container" classNamePrefix="react-select" styles={{ menu: (provided) => ({ ...provided, maxHeight: '300px', overflowY: 'auto' }) }} />
                {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Designation *</label>
                <Select options={designationOptions} value={formData.designation} onChange={(option) => handleSelectChange(option, 'designation')} placeholder="Select designation..." isSearchable={true} className="react-select-container" classNamePrefix="react-select" />
                {errors.designation && <span className="text-red-500 text-sm mt-1">{errors.designation}</span>}
              </div>

              {formData.designation?.value === "Other" && (
                <div className="flex flex-col">
                  <label className="font-medium text-[#174047] mb-1">Specify Designation *</label>
                  <input type="text" name="otherDesignation" placeholder="Enter your designation" value={formData.otherDesignation} onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" />
                  {errors.otherDesignation && <span className="text-red-500 text-sm mt-1">{errors.otherDesignation}</span>}
                </div>
              )}

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">License Number (PM&DC) *</label>
                <div className="relative">
                  <input type="text" name="licenseNumber" placeholder="e.g., 12345-P" value={formData.licenseNumber} onChange={handleLicenseChange} className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] w-full ${licenseExists ? 'border-red-500' : 'border-[#c0d3dc]'}`} maxLength="7" />
                  {isCheckingLicense && <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-[#2c6774]" />}
                </div>
                <p className="text-xs text-gray-500 mt-1">Format: 5 digits with suffix (P, S, or D) - e.g., 12345-P</p>
                {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
                {licenseExists && !errors.licenseNumber && <span className="text-red-500 text-sm mt-1">This license number is already registered</span>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button type="button" className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto" onClick={handlePrevious}>
                ← Previous
              </button>
              <button type="button" className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto" onClick={handleNext} disabled={licenseExists}>
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 4:
        const requiresFCPS = formData.qualification?.value === "FCPS";
        const requiresSpecializationCert = formData.specialization?.value && specializationData[formData.specialization.value]?.mandatoryAfter;
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">ID Card Front *</label>
                <input type="file" name="idCardFront" onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" accept="image/*" />
                <p className="text-xs text-gray-500 mt-1">Front side of your CNIC</p>
                {errors.idCardFront && <span className="text-red-500 text-sm mt-1">{errors.idCardFront}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">ID Card Back *</label>
                <input type="file" name="idCardBack" onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" accept="image/*" />
                <p className="text-xs text-gray-500 mt-1">Back side of your CNIC</p>
                {errors.idCardBack && <span className="text-red-500 text-sm mt-1">{errors.idCardBack}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Doctor License *</label>
                <input type="file" name="doctorLicense" onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" accept="image/*,.pdf" />
                <p className="text-xs text-gray-500 mt-1">PM&DC License (Image or PDF)</p>
                {errors.doctorLicense && <span className="text-red-500 text-sm mt-1">{errors.doctorLicense}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">MBBS Degree *</label>
                <input type="file" name="mbbsCertificate" onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" accept="image/*,.pdf" />
                <p className="text-xs text-gray-500 mt-1">MBBS degree certificate</p>
                {errors.mbbsCertificate && <span className="text-red-500 text-sm mt-1">{errors.mbbsCertificate}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">House Job Certificate</label>
                <input type="file" name="houseJobCertificate" onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" accept="image/*,.pdf" />
                <p className="text-xs text-gray-500 mt-1">Optional</p>
              </div>

              {requiresFCPS && (
                <div className="flex flex-col">
                  <label className="font-medium text-[#174047] mb-1">FCPS Certificate *</label>
                  <input type="file" name="fcpsCertificate" onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" accept="image/*,.pdf" />
                  <p className="text-xs text-gray-500 mt-1">Required for FCPS qualification</p>
                  {errors.fcpsCertificate && <span className="text-red-500 text-sm mt-1">{errors.fcpsCertificate}</span>}
                </div>
              )}

              {requiresSpecializationCert && (
                <div className="flex flex-col">
                  <label className="font-medium text-[#174047] mb-1">{specializationData[formData.specialization.value].mandatoryAfter} Certificate *</label>
                  <input type="file" name="specializationCertificate" onChange={handleChange} className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]" accept="image/*,.pdf" />
                  <p className="text-xs text-gray-500 mt-1">Required for {formData.specialization.value}</p>
                  {errors.specializationCertificate && <span className="text-red-500 text-sm mt-1">{errors.specializationCertificate}</span>}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button type="button" className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto" onClick={handlePrevious}>
                ← Previous
              </button>
              <button type="button" className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto" onClick={handleNext}>
                Review Information →
              </button>
            </div>
          </div>
        );

      case 5:
        return <ReviewSection />;

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-4 md:p-6 lg:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Doctor Registration</h1>
          <p className="text-sm md:text-base text-[#174047]">Complete all steps to register</p>
        </div>

        <div className="flex justify-between items-start relative mb-8 px-2">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center relative z-10 flex-1">
              <div className={`w-10 z-100 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${step >= index + 1 ? "bg-[#2c6774] text-white scale-110" : "bg-[#c0d3dc] text-[#174047]"}`}>
                {s.icon}
              </div>
              <p className="text-xs md:text-sm font-medium text-[#174047] mt-2 text-center">{s.label}</p>
              {index < steps.length - 1 && (
                <div className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-1 transition-colors duration-300 ${step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"}`} style={{ top: '20px' }}></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-[#2c6774] text-center mb-4">
            {steps[step - 1].label} Information
          </h2>
          {renderStepContent()}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-lg p-6 max-w-sm w-full z-10 shadow-xl border-t-4" style={{ borderTopColor: modalType === "success" ? "#2c6774" : "#dc2626" }}>
            <div className="text-center">
              <div className="text-5xl mb-4" style={{ color: modalType === "success" ? "#2c6774" : "#dc2626" }}>
                {modalType === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
              </div>
              <p className="text-gray-700 text-lg font-medium mb-4">{modalMessage}</p>
              <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded-lg text-white transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: modalType === "success" ? "#2c6774" : "#dc2626" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

{/* // this was current change  */}
      {/* <style jsx>{`
        .react-select-container { width: 100%; }
        .react-select__control { border-color: #c0d3dc !important; background-color: #f8f9fa !important; min-height: 42px; }
        .react-select__control:hover { border-color: #2c6774 !important; }
        .react-select__control--is-focused { border-color: #2c6774 !important; box-shadow: 0 0 0 1px #2c6774 !important; }
        .react-select__menu { z-index: 30 !important; max-height: 300px !important; overflow-y: auto !important; }
        .react-select__option--is-focused { background-color: #e6f0f3 !important; }
        .react-select__option--is-selected { background-color: #2c6774 !important; }
        .backdrop-blur-sm { backdrop-filter: blur(4px); } */}

{/* // this was incoming change */}
      {/* Add CSS for react-select */}
      <style>{`
        .react-select-container {
          width: 100%;
        }
        .react-select__control {
          border-color: #c0d3dc !important;
          background-color: #f8f9fa !important;
          min-height: 42px;
        }
        .react-select__control:hover {
          border-color: #2c6774 !important;
        }
        .react-select__control--is-focused {
          border-color: #2c6774 !important;
          box-shadow: 0 0 0 1px #2c6774 !important;
        }
        .react-select__menu {
          z-index: 30 !important;
          max-height: 300px !important;
          overflow-y: auto !important;
        }
        .react-select__option--is-focused {
          background-color: #e6f0f3 !important;
        }
        .react-select__option--is-selected {
          background-color: #2c6774 !important;
        }
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
};

export default DoctorRegistration;