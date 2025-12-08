import doctor1 from "../../images/doctor1.jpg";
import doctor2 from "../../images/doctor2.jpg";
import doctor3 from "../../images/doctor3.webp";
import doctor4 from "../../images/doctor4.jpg";
import doctor5 from "../../images/doctor5.jpg";
import doctor6 from "../../images/doctor6.jpg";
import doctor7 from "../../images/doctor7.jpg";
import doctor8 from "../../images/doctor8.jpg";
import doctor9 from "../../images/doctor9.jpg";
import doctor10 from "../../images/doctor10.jpg";
import doctor11 from "../../images/doctor11.jpg";
import doctor12 from "../../images/doctor12.jpg";
import doctor13 from "../../images/doctor13.jpg";
import doctor14 from "../../images/doctor14.jpg";
import doctor15 from "../../images/doctor15.jpg";
import doctor16 from "../../images/doctor16.jpeg";
import doctor17 from "../../images/doctor17.jpeg";
import doctor18 from "../../images/doctor18.jpeg";
import doctor19 from "../../images/doctor19.jpeg";
import doctor20 from "../../images/doctor20.jpeg";
import doctor21 from "../../images/doctor21.jpeg";
import doctor22 from "../../images/doctor22.jpeg";
import doctor23 from "../../images/doctor23.jpeg";
import doctor24 from "../../images/doctor24.jpg";
import doctor25 from "../../images/doctor25.jpg";
import doctor26 from "../../images/doctor26.webp";
import doctor27 from "../../images/doctor27.jpg";
import doctor28 from "../../images/doctor28.jpg";
import doctor29 from "../../images/doctor29.jpeg";
import doctor30 from "../../images/doctor30.jpg";

const doctorsData = [
 {
    name: "Dermatologist",
    doctors: [
      {
        id: 1,
        name: "Dr. Zareen Saqib Suleri",
        // image: "/images/doctor1.jpg",
        // image: require("../images/doctor1.jpg"),
        image:doctor1,
        qualification: "MBBS, FCPS (Dermatology)",
        experience: "13 Yrs",
        satisfaction: "97%",
        services: ["PRP", "Laser For Hair Removal", "Acne And Acne Scars", "Vampire Facelift"],
        hospitals: [
          {
            name: "Video Consultation",
            availability: "Available from Oct 27",
            fee: 1500,
          },
        ],
      },
    ],
  },

  {
  name: "Gynecologist",
  doctors: [
    {
      id: 2,
      name: "Dr. Sana Khalid",
      // image: require("../images/doctor2.jpg"),
      image:doctor2,
      qualification: "MBBS, FCPS (Gynecology & Obstetrics)",
      experience: "12 Yrs",
      satisfaction: "95%",
      services: [
        "Pregnancy Care",
        "Normal Delivery",
        "C-Section",
        "Infertility Treatment",
        "Polycystic Ovary Syndrome (PCOS)",
        "Menstrual Disorders"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Oct 28",
          fee: 2000,
        },
      ],
    },
  ],
},

  {
  name: "Urologist",
  doctors: [
    {
      id: 3,
      name: "Dr. Hassan Raza",
      // image: require("../images/doctor3.webp"),
      image:doctor3,
      qualification: "MBBS, FCPS (Urology)",
      experience: "10 Yrs",
      satisfaction: "96%",
      services: [
        "Kidney Stone Treatment",
        "Urinary Tract Infection (UTI)",
        "Male Infertility",
        "Prostate Enlargement",
        "Bladder Problems",
        "Kidney and Bladder Tumors"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Oct 28",
          fee: 1800,
        },
      ],
    },
  ],
},
  {
  name: "Gastroenterologist",
  doctors: [
    {
      id: 4,
      name: "Dr. Ahmed Shehzad",
      // image: require("../images/doctor4.jpg"),
      image:doctor4,
      qualification: "MBBS, FCPS (Gastroenterology)",
      experience: "14 Yrs",
      satisfaction: "98%",
      services: [
        "Stomach Pain Treatment",
        "Liver Diseases",
        "Hepatitis B & C",
        "Endoscopy",
        "Acid Reflux (GERD)",
        "Irritable Bowel Syndrome (IBS)"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Oct 29",
          fee: 2200,
        },
      ],
    },
  ],
},
 {
  name: "General Physician",
  doctors: [
    {
      id: 5,
      name: "Dr. Iqbal Ahmad",
      // image: require("../images/doctor5.jpg"),
      image:doctor5,
      qualification: "MBBS, FCPS (Medicine)",
      experience: "11 Yrs",
      satisfaction: "96%",
      services: [
        "Fever & Viral Infections",
        "Blood Pressure Management",
        "Diabetes Management",
        "Flu, Cough & Cold",
        "General Health Checkup",
        "Stomach & Digestive Issues"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Oct 29",
          fee: 1500,
        },
      ],
    },
  ],
},
  {
  name: "Psychiatrist",
  doctors: [
    {
      id: 6,
      name: "Dr. Mansoor Ali",
      // image: require("../images/doctor6.jpg"),
      image:doctor6,
      qualification: "MBBS, FCPS (Psychiatry)",
      experience: "9 Yrs",
      satisfaction: "97%",
      services: [
        "Depression Treatment",
        "Anxiety Disorders",
        "Stress Management",
        "Bipolar Disorder",
        "Schizophrenia",
        "Sleep Disorders"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Oct 29",
          fee: 2500,
        },
      ],
    },
  ],
},
  {
  name: "Psychologist",
  doctors: [
    {
      id: 7,
      name: "Dr. Nadia Iqbal",
      // image: require("../images/doctor7.jpg"),
      image:doctor7,
      qualification: "M.A Clinical Psychology, Certified Psychologist",
      experience: "8 Yrs",
      satisfaction: "97%",
      services: [
        "Depression & Anxiety Counseling",
        "Stress Management",
        "Behavioral Therapy",
        "Cognitive Behavioral Therapy (CBT)",
        "Relationship & Family Counseling",
        "Personal Development & Self-esteem Coaching"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 10",
          fee: 1500,
        },
      ],
    },
  ],
},
  {
  name: "Orthopedic Surgeon",
  doctors: [
    {
      id: 8,
      name: "Dr. Usman Tariq",
      // image: require("../images/doctor8.jpg"),
      image:doctor8,
      qualification: "MBBS, FCPS (Orthopedic Surgery)",
      experience: "15 Yrs",
      satisfaction: "96%",
      services: [
        "Bone & Joint Pain Treatment",
        "Fracture Management",
        "Knee Replacement",
        "Hip Replacement",
        "Arthritis Treatment",
        "Sports Injuries"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Oct 30",
          fee: 2000,
        },
      ],
    },
  ],
},
  {
  name: "Dentist",
  doctors: [
    {
      id: 9,
      name: "Dr. Ayesha Rehman",
      // image: require("../images/doctor9.jpg"),
      image:doctor9,
      qualification: "BDS, FCPS (Prosthodontics)",
      experience: "8 Yrs",
      satisfaction: "98%",
      services: [
        "Teeth Cleaning & Scaling",
        "Root Canal Treatment",
        "Braces (Orthodontics)",
        "Tooth Extraction",
        "Dental Implants",
        "Teeth Whitening"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Oct 30",
          fee: 1200,
        },
      ],
    },
  ],
},
  {
  name: "General Surgeon",
  doctors: [
    {
      id: 10,
      name: "Dr. Khalid Mehmood",
      // image: require("../images/doctor10.jpg"),
      image:doctor10,
      qualification: "MBBS, FCPS (General Surgery)",
      experience: "16 Yrs",
      satisfaction: "97%",
      services: [
        "Appendix Surgery",
        "Gallbladder Surgery",
        "Hernia Repair",
        "Piles (Hemorrhoids) Treatment",
        "Thyroid Surgery",
        "Breast Lump Removal"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Oct 31",
          fee: 2500,
        },
      ],
    },
  ],
},
  {
  name: "Pediatrician",
  doctors: [
    {
      id: 11,
      name: "Dr. Rabia Nadeem",
      // image: require("../images/doctor11.jpg"),
      image:doctor11,
      qualification: "MBBS, FCPS (Pediatrics)",
      experience: "10 Yrs",
      satisfaction: "98%",
      services: [
        "Newborn Checkup",
        "Child Growth & Development",
        "Vaccination & Immunization",
        "Fever & Infections",
        "Asthma & Allergies",
        "Stomach & Digestive Issues in Children"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 1",
          fee: 1500,
        },
      ],
    },
  ],
},
  {
  name: "Neurologist",
  doctors: [
    {
      id: 12,
      name: "Dr. Farhan Javed",
      // image: require("../images/doctor12.jpg"),
      image:doctor12,
      qualification: "MBBS, FCPS (Neurology)",
      experience: "14 Yrs",
      satisfaction: "97%",
      services: [
        "Migraine & Headache Treatment",
        "Stroke Management",
        "Epilepsy (Fits)",
        "Nerve & Muscle Disorders",
        "Parkinson’s Disease",
        "Memory Problems & Dementia"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 1",
          fee: 3000,
        },
      ],
    },
  ],
},
  {
  name: "Physiotherapist",
  doctors: [
    {
      id: 13,
      name: "Dr. Aliya Khan",
      // image: require("../images/doctor13.jpg"),
      image:doctor13,
      qualification: "BPT, MPT (Physiotherapy)",
      experience: "9 Yrs",
      satisfaction: "95%",
      services: [
        "Back & Neck Pain Treatment",
        "Sports Injury Rehabilitation",
        "Post-Surgery Rehabilitation",
        "Joint & Muscle Pain Management",
        "Stroke Rehabilitation",
        "Arthritis Pain Relief"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 2",
          fee: 1200,
        },
      ],
    },
  ],
},
  {
  name: "Cardiologist",
  doctors: [
    {
      id: 14,
      name: "Dr. Asad Iqbal",
      // image: require("../images/doctor14.jpg"),
      image:doctor14,
      qualification: "MBBS, FCPS (Cardiology)",
      experience: "15 Yrs",
      satisfaction: "97%",
      services: [
        "Heart Disease Treatment",
        "Hypertension Management",
        "Arrhythmia Treatment",
        "Heart Failure Management",
        "Cholesterol & Lipid Disorders",
        "ECG & Echocardiography"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 2",
          fee: 3000,
        },
      ],
    },
  ],
},
 {
  name: "Pulmonologist",
  doctors: [
    {
      id: 15,
      name: "Dr. Samina Tariq",
      // image: require("../images/doctor15.jpg"),
      image:doctor15,
      qualification: "MBBS, FCPS (Pulmonology)",
      experience: "12 Yrs",
      satisfaction: "96%",
      services: [
        "Asthma Treatment",
        "Chronic Obstructive Pulmonary Disease (COPD)",
        "Pneumonia & Lung Infections",
        "Sleep Apnea Management",
        "Tuberculosis (TB) Treatment",
        "Lung Function Testing"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 3",
          fee: 2000,
        },
      ],
    },
  ],
},
  {
  name: "Eye Specialist",
  doctors: [
    {
      id: 16,
      name: "Dr. Sana Anwar",
      // image: require("../images/doctor16.jpeg"),
      image:doctor16,
      qualification: "MBBS, FCPS (Ophthalmology)",
      experience: "11 Yrs",
      satisfaction: "97%",
      services: [
        "Cataract Surgery",
        "Glaucoma Treatment",
        "Laser Vision Correction",
        "Diabetic Retinopathy Management",
        "Eye Infection Treatment",
        "Routine Eye Checkup"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 3",
          fee: 1800,
        },
      ],
    },
  ],
},
  {
  name: "Oncologist",
  doctors: [
    {
      id: 17,
      name: "Dr. Sarah Mahmood",
      // image: require("../images/doctor17.jpeg"),
      image:doctor17,
      qualification: "MBBS, FCPS (Medical Oncology)",
      experience: "13 Yrs",
      satisfaction: "95%",
      services: [
        "Chemotherapy",
        "Radiation Therapy Guidance",
        "Cancer Screening & Diagnosis",
        "Palliative Care",
        "Breast & Lung Cancer Treatment",
        "Follow-up & Survivorship Care"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 4",
          fee: 3500,
        },
      ],
    },
  ],
},
  {
  name: "Liver Specialist",
  doctors: [
    {
      id: 18,
      name: "Dr. Khalid Akhtar",
      // image: require("../images/doctor18.jpeg"),
      image:doctor18,
      qualification: "MBBS, FCPS (Hepatology & Gastroenterology)",
      experience: "12 Yrs",
      satisfaction: "96%",
      services: [
        "Hepatitis B & C Treatment",
        "Fatty Liver Management",
        "Cirrhosis Care",
        "Liver Function Testing",
        "Liver Fibrosis Assessment",
        "Liver Disease Consultation & Follow-up"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 4",
          fee: 2500,
        },
      ],
    },
  ],
},
  {
  name: "Counselor",
  doctors: [
    {
      id: 19,
      name: "Ms. Hina Riaz",
      // image: require("../images/doctor19.jpeg"),
      image:doctor19,
      qualification: "M.A Psychology, Certified Counselor",
      experience: "8 Yrs",
      satisfaction: "97%",
      services: [
        "Stress Management",
        "Anxiety & Depression Counseling",
        "Relationship & Marital Counseling",
        "Career Guidance",
        "Behavioral Therapy",
        "Personal Growth & Self-esteem Coaching"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 5",
          fee: 1500,
        },
      ],
    },
  ],
},
  {
  name: "Audiologist",
  doctors: [
    {
      id: 20,
      name: "Dr. Faiza Ahmed",
      // image: require("../images/doctor20.jpeg"),
      image:doctor20,
      qualification: "M.Sc Audiology, Certified Audiologist",
      experience: "7 Yrs",
      satisfaction: "95%",
      services: [
        "Hearing Assessment",
        "Hearing Aid Fitting & Counseling",
        "Tinnitus Management",
        "Balance & Vertigo Evaluation",
        "Speech & Language Therapy Support",
        "Pediatric Hearing Evaluation"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 26",
          fee: 1800,
        },
      ],
    },
  ],
},
  {
  name: "Immunologist",
  doctors: [
    {
      id: 21,
      name: "Dr. Usman Qureshi",
      // image: require("../images/doctor21.jpeg"),
      image:doctor21,
      qualification: "MBBS, FCPS (Allergy & Immunology)",
      experience: "10 Yrs",
      satisfaction: "96%",
      services: [
        "Allergy Testing & Management",
        "Autoimmune Disease Treatment",
        "Immunodeficiency Disorders",
        "Vaccination & Immunotherapy",
        "Asthma & Respiratory Allergies",
        "Chronic Inflammatory Conditions"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 6",
          fee: 2000,
        },
      ],
    },
  ],
},
  {
  name: "Nutritionist",
  doctors: [
    {
      id: 22,
      name: "Ms. Sana Akhtar",
      // image: require("../images/doctor22.jpeg"),
      image:doctor22,
      qualification: "M.Sc Nutrition & Dietetics, Certified Nutritionist",
      experience: "8 Yrs",
      satisfaction: "97%",
      services: [
        "Weight Management",
        "Diet Planning & Consultation",
        "Diabetes & Hypertension Diet",
        "Sports Nutrition",
        "Child & Maternal Nutrition",
        "Nutritional Counseling for Lifestyle Diseases"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 6",
          fee: 1200,
        },
      ],
    },
  ],
},
  {
  name: "Endocrinologist",
  doctors: [
    {
      id: 23,
      name: "Dr. Sameer Malik",
      // image: require("../images/doctor23.jpeg"),
      image:doctor23,
      qualification: "MBBS, FCPS (Endocrinology)",
      experience: "12 Yrs",
      satisfaction: "96%",
      services: [
        "Diabetes Management",
        "Thyroid Disorders Treatment",
        "Hormonal Imbalance Management",
        "Polycystic Ovary Syndrome (PCOS)",
        "Osteoporosis Management",
        "Pituitary & Adrenal Disorders"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 7",
          fee: 2000,
        },
      ],
    },
  ],
},
  {
  name: "Hematologist",
  doctors: [
    {
      id: 24,
      name: "Dr. Aiman Riaz",
      // image: require("../images/doctor24.jpg"),
      image:doctor24,
      qualification: "MBBS, FCPS (Hematology)",
      experience: "11 Yrs",
      satisfaction: "95%",
      services: [
        "Anemia Management",
        "Blood Disorder Diagnosis",
        "Leukemia & Lymphoma Care",
        "Coagulation Disorders",
        "Bone Marrow Testing",
        "Follow-up & Monitoring of Blood Diseases"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 7",
          fee: 2500,
        },
      ],
    },
  ],
},
 {
  name: "Pain Specialist",
  doctors: [
    {
      id: 25,
      name: "Dr. Farah Naveed",
      // image: require("../images/doctor25.jpg"),
      image:doctor25, 
      qualification: "MBBS, FCPS (Anesthesiology & Pain Management)",
      experience: "10 Yrs",
      satisfaction: "96%",
      services: [
        "Chronic Back & Neck Pain Management",
        "Arthritis Pain Relief",
        "Migraine & Headache Management",
        "Post-Surgical Pain Care",
        "Joint Pain & Sports Injuries",
        "Neuropathic Pain Treatment"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 8",
          fee: 2000,
        },
      ],
    },
  ],
},
  {
  name: "Sonologist",
  doctors: [
    {
      id: 26,
      name: "Dr. Sana Iftikhar",
      // image: require("../images/doctor26.webp"),
      image:doctor26,
      qualification: "MBBS, FCPS (Radiology & Sonology)",
      experience: "9 Yrs",
      satisfaction: "97%",
      services: [
        "Abdominal Ultrasound",
        "Pelvic Ultrasound",
        "Pregnancy Ultrasound & Fetal Monitoring",
        "Thyroid & Neck Ultrasound",
        "Breast Ultrasound",
        "Doppler & Vascular Ultrasound"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 8",
          fee: 1800,
        },
      ],
    },
  ],
},
  {
  name: "Pathologist",
  doctors: [
    {
      id: 27,
      name: "Dr. Asma Qadir",
      // image: require("../images/doctor27.jpg"),
      image:doctor27,
      qualification: "MBBS, FCPS (Pathology)",
      experience: "12 Yrs",
      satisfaction: "96%",
      services: [
        "Blood Tests & Analysis",
        "Urine & Stool Tests",
        "Histopathology",
        "Cytology",
        "Microbiology Testing",
        "Biopsy & Lab Diagnostics"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 9",
          fee: 1500,
        },
      ],
    },
  ],
},
  {
  name: "Fitness Trainer",
  doctors: [
    {
      id: 28,
      name: "Mr. Ali Hassan",
      // image: require("../images/doctor28.jpg"),
      image:doctor28,
      qualification: "Certified Personal Trainer (CPT), Nutrition Specialist",
      experience: "7 Yrs",
      satisfaction: "98%",
      services: [
        "Personal Fitness Training",
        "Weight Loss & Muscle Gain Programs",
        "Strength & Conditioning",
        "Cardio & Endurance Training",
        "Flexibility & Mobility Training",
        "Customized Diet & Workout Plans"
      ],
      hospitals: [
        {
          name: "Online/Video Consultation",
          availability: "Available from Nov 9",
          fee: 1000,
        },
      ],
    },
  ],
},
  {
  name: "Geneticist",
  doctors: [
    {
      id: 29,
      name: "Dr. Samina Khalid",
      // image: require("../images/doctor29.jpeg"),
      image:doctor29,
      qualification: "MBBS, FCPS (Medical Genetics)",
      experience: "10 Yrs",
      satisfaction: "95%",
      services: [
        "Genetic Counseling",
        "Prenatal Genetic Screening",
        "Inherited Disorder Diagnosis",
        "Carrier Testing",
        "Molecular & Chromosomal Testing",
        "Family Risk Assessment"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 10",
          fee: 2500,
        },
      ],
    },
  ],
},
  {
  name: "Chiropractor",
  doctors: [
    {
      id: 30,
      name: "Dr. Asif Riaz",
      // image: require("../images/doctor30.jpg"),
      image:doctor30,
      qualification: "Doctor of Chiropractic (DC), Certified Manual Therapist",
      experience: "9 Yrs",
      satisfaction: "96%",
      services: [
        "Spinal Adjustment & Alignment",
        "Back & Neck Pain Relief",
        "Posture Correction",
        "Sports Injury Rehabilitation",
        "Joint & Muscle Pain Management",
        "Chronic Pain Therapy"
      ],
      hospitals: [
        {
          name: "Video Consultation",
          availability: "Available from Nov 10",
          fee: 1800,
        },
      ],
    },
  ],
},
];

export default doctorsData;