// const doctorsData = [
//  {
//     name: "Dermatologist",
//     doctors: [
//       {
//         id: 1,
//         name: "Assoc. Prof. Dr. Zareen Saqib Suleri",
//         // image: "/images/doctor1.jpg",
//         // image: require("../images/doctor1.jpg"),
//         qualification: "MBBS, FCPS (Dermatology)",
//         experience: "13 Yrs",
//         satisfaction: "97%",
//         services: ["PRP", "Laser For Hair Removal", "Acne And Acne Scars", "Vampire Facelift"],
//         hospitals: [
//           {
//             name: "Video Consultation",
//             availability: "Available from Oct 27",
//             fee: 1500,
//           },
//           {
//             name: "Suleri Children and General Hospital, Sialkot",
//             availability: "Available Tomorrow",
//             fee: 1500,
//           },
//         ],
//       },
//     ],
//   },

//   {
//     id: 2,
//     name: "Gynecologist",
//     description: "Expert in women's reproductive health and pregnancy.",
//     link: "/specialities/gynecologist",
//     doctors: [
//       {
//         id: "g1",
//         name: "Dr. Ayesha Noor",
//         qualification: "MBBS, FCPS (Gynecology)",
//         experience: "9 years",
//         hospital: "Mother & Child Care Hospital",
//         contact: "0302-9988775",
//         // image: "/images/doctor2.jpg",
//         image: require("../images/doctor2.jpg")
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Urologist",
//     description: "Specialist in urinary tract and male reproductive organs.",
//     link: "/specialities/urologist",
//     doctors: [
//       {
//         id: "u1",
//         name: "Dr. Bilal Qureshi",
//         qualification: "MBBS, FCPS (Urology)",
//         experience: "9 years",
//         hospital: "Kidney Care Hospital",
//         contact: "0301-2223344",
//         // image: "/images/doctor3.webp",
//         // image: require("../images/doctor3.webp")
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Gastroenterologist",
//     description: "Expert in digestive system and liver disorders.",
//     link: "/specialities/gastroenterologist",
//     doctors: [
//       {
//         id: "ga1",
//         name: "Dr. Taha Malik",
//         qualification: "MBBS, FCPS (Gastroenterology)",
//         experience: "10 years",
//         hospital: "Digestive Health Center",
//         contact: "0311-6677880",
//         // image: "/images/doctor4.jpg",
//         image: require("../images/doctor4.jpg")
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "General Physician",
//     description: "Provides general medical care for all age groups.",
//     link: "/specialities/general-physician",
//     doctors: [
//       {
//         id: "gp1",
//         name: "Dr. Usman Rafiq",
//         qualification: "MBBS, FCPS (Medicine)",
//         experience: "14 years",
//         hospital: "City Medical Complex",
//         contact: "0305-6655442",
//         // image: "/images/doctor5.jpg",
//         image: require("../images/doctor5.jpg")
//       },
//     ],
//   },
//   {
//     id: 6,
//     name: "Psychiatrist",
//     description: "Deals with mental health and emotional disorders.",
//     link: "/specialities/psychiatrist",
//     doctors: [
//       {
//         id: "ps1",
//         name: "Dr. Nadeem Ahmed",
//         qualification: "MBBS, FCPS (Psychiatry)",
//         experience: "12 years",
//         hospital: "Mind Care Hospital",
//         contact: "0322-5566778",
//         // image: "/images/doctor6.jpg",
//         image: require("../images/doctor6.jpg")
//       },
//     ],
//   },
//   {
//     id: 7,
//     name: "Psychologist",
//     description: "Helps patients with behavior and mental health issues.",
//     link: "/specialities/psychologist",
//     doctors: [
//       {
//         id: "psyc1",
//         name: "Dr. Huma Naz",
//         qualification: "PhD (Clinical Psychology)",
//         experience: "11 years",
//         hospital: "Hope Psychology Center",
//         contact: "0343-6677880",
//         // image: "/images/doctor7.jpg",
//         image: require("../images/doctor7.jpg")
//       },
//     ],
//   },
//   {
//     id: 8,
//     name: "Orthopedic Surgeon",
//     description: "Specialist in bone, joint, and spine surgery.",
//     link: "/specialities/orthopedic-surgeon",
//     doctors: [
//       {
//         id: "o1",
//         name: "Dr. Saad Javed",
//         qualification: "MBBS, FCPS (Orthopedics)",
//         experience: "13 years",
//         hospital: "Bone & Joint Hospital",
//         contact: "0321-9876543",
//         // image: "/images/doctor8.jpg",
//         image: require("../images/doctor8.jpg")
//       },
//     ],
//   },
//   {
//     id: 9,
//     name: "Dentist",
//     description: "Specializes in diagnosis, prevention, and treatment of oral diseases.",
//     link: "/specialities/dentist",
//     doctors: [
//       {
//         id: "de1",
//         name: "Dr. Ayesha Malik",
//         qualification: "BDS, FCPS (Operative Dentistry)",
//         experience: "10 years",
//         hospital: "Smile Care Dental Clinic",
//         contact: "0321-5566778",
//         // image: "/images/doctor9.jpg",
//         image: require("../images/doctor9.jpg")
//       },
//     ],
//   },
//   {
//     id: 10,
//     name: "General Surgeon",
//     description: "Performs general surgeries including abdomen, breast, and skin.",
//     link: "/specialities/general-surgeon",
//     doctors: [
//       {
//         id: "gs1",
//         name: "Dr. Zafar Iqbal",
//         qualification: "MBBS, FCPS (Surgery)",
//         experience: "15 years",
//         hospital: "Surgical Care Hospital",
//         contact: "0308-9988776",
//         // image: "/images/doctor10.jpg",
//         image: require("../images/doctor10.jpg")
//       },
//     ],
//   },
//   {
//     id: 11,
//     name: "Pediatrician",
//     description: "Specializes in medical care of infants, children, and adolescents.",
//     link: "/specialities/pediatrician",
//     doctors: [
//       {
//         id: "pe1",
//         name: "Dr. Maria Zahid",
//         qualification: "MBBS, FCPS (Pediatrics)",
//         experience: "9 years",
//         hospital: "Children’s Health Center",
//         contact: "0331-4455667",
//         // image: "/images/doctor11.jpg",
//         image: require("../images/doctor11.jpg")
//       },
//     ],
//   },
//   {
//     id: 12,
//     name: "Neurologist",
//     description: "Specialist in brain, spinal cord, and nerve disorders.",
//     link: "/specialities/neurologist",
//     doctors: [
//       {
//         id: "n1",
//         name: "Dr. Imran Zia",
//         qualification: "MBBS, FCPS (Neurology)",
//         experience: "11 years",
//         hospital: "Brain & Spine Hospital",
//         contact: "0323-8877665",
//         // image: "/images/doctor12.jpg",
//         image: require("../images/doctor12.jpg")
//       },
//     ],
//   },
//   {
//     id: 13,
//     name: "Physiotherapist",
//     description: "Helps patients recover physical mobility after injury or illness.",
//     link: "/specialities/physiotherapist",
//     doctors: [
//       {
//         id: "ph1",
//         name: "Dr. Alina Saeed",
//         qualification: "DPT, MSPT",
//         experience: "6 years",
//         hospital: "Rehab & Recovery Clinic",
//         contact: "0309-9988772",
//         // image: "/images/doctor13.jpg",
//         image: require("../images/doctor13.jpg")
//       },
//     ],
//   },
//   {
//     id: 14,
//     name: "Cardiologist",
//     description: "Specializes in diagnosing and treating heart and blood vessel disorders.",
//     link: "/specialities/cardiologist",
//     doctors: [
//       {
//         id: "c1",
//         name: "Dr. Ali Raza",
//         qualification: "MBBS, FCPS (Cardiology)",
//         experience: "12 years",
//         hospital: "Punjab Institute of Cardiology, Lahore",
//         contact: "0321-5678901",
//         // image: "/images/doctor14.jpg",
//         image: require("../images/doctor14.jpg")
//       },
//     ],
//   },
//   {
//     id: 15,
//     name: "Pulmonologist / Lung Specialist",
//     description: "Treats diseases of the lungs and respiratory tract.",
//     link: "/specialities/pulmonologist",
//     doctors: [
//       {
//         id: "pl1",
//         name: "Dr. Hina Abbas",
//         qualification: "MBBS, FCPS (Pulmonology)",
//         experience: "10 years",
//         hospital: "BreatheWell Hospital",
//         contact: "0314-4455667",
//         // image: "/images/doctor15.jpg",
//         image: require("../images/doctor15.jpg")
//       },
//     ],
//   },
//   {
//     id: 16,
//     name: "Eye Specialist",
//     description: "Treats vision problems and eye diseases.",
//     link: "/specialities/eye-specialist",
//     doctors: [
//       {
//         id: "e1",
//         name: "Dr. Maham Tariq",
//         qualification: "MBBS, FCPS (Ophthalmology)",
//         experience: "9 years",
//         hospital: "Vision Care Hospital",
//         contact: "0322-4455667",
//         // image: "/images/doctor16.jpeg",
//         image: require("../images/doctor16.jpeg")
//       },
//     ],
//   },
//   {
//     id: 17,
//     name: "Oncologist",
//     description: "Specializes in diagnosing and treating cancer.",
//     link: "/specialities/oncologist",
//     doctors: [
//       {
//         id: "o3",
//         name: "Dr. Bilquis Rehman",
//         qualification: "MBBS, FCPS (Oncology)",
//         experience: "15 years",
//         hospital: "Hope Cancer Hospital",
//         contact: "0312-8899776",
//         // image: "/images/doctor17.jpeg",
//         image: require("../images/doctor17.jpeg")
//       },
//     ],
//   },
//   {
//     id: 18,
//     name: "Liver Specialist",
//     description: "Focuses on liver diseases such as hepatitis and cirrhosis.",
//     link: "/specialities/liver-specialist",
//     doctors: [
//       {
//         id: "l1",
//         name: "Dr. Adeel Mirza",
//         qualification: "MBBS, FCPS (Gastroenterology)",
//         experience: "14 years",
//         hospital: "Liver Care Clinic",
//         contact: "0336-9988772",
//         // image: "/images/doctor18.jpeg",
//         image: require("../images/doctor18.jpeg")
//       },
//     ],
//   },
//   {
//     id: 19,
//     name: "Counselor",
//     description: "Provides psychological and emotional support.",
//     link: "/specialities/counselor",
//     doctors: [
//       {
//         id: "co1",
//         name: "Dr. Mehwish Tariq",
//         qualification: "MS Clinical Psychology, Counselor",
//         experience: "6 years",
//         hospital: "Mind Relief Center",
//         contact: "0331-6677885",
//         // image: "/images/doctor19.jpeg",
//         image: require("../images/doctor19.jpeg")
//       },
//     ],
//   },
//   {
//     id: 20,
//     name: "Audiologist",
//     description: "Diagnoses and treats hearing and balance disorders.",
//     link: "/specialities/audiologist",
//     doctors: [
//       {
//         id: "a1",
//         name: "Dr. Noor Fatima",
//         qualification: "MS (Audiology)",
//         experience: "5 years",
//         hospital: "Hearing Plus Center",
//         contact: "0322-4455668",
//         // image: "/images/doctor20.jpeg",
//         image: require("../images/doctor20.jpeg")
//       },
//     ],
//   },
//   {
//     id: 21,
//     name: "Immunologist",
//     description: "Deals with immune system disorders and allergies.",
//     link: "/specialities/immunologist",
//     doctors: [
//       {
//         id: "im1",
//         name: "Dr. Sameer Aftab",
//         qualification: "MBBS, FCPS (Immunology)",
//         experience: "11 years",
//         hospital: "Allergy & Immune Clinic",
//         contact: "0341-6655447",
//         // image: "/images/doctor21.jpeg",
//         image: require("../images/doctor21.jpeg")
//       },
//     ],
//   },
//   {
//     id: 22,
//     name: "Nutritionist",
//     description: "Advises on food, diet, and nutrition plans.",
//     link: "/specialities/nutritionist",
//     doctors: [
//       {
//         id: "nu1",
//         name: "Dr. Misha Khan",
//         qualification: "BS (Human Nutrition), MS (Food Science)",
//         experience: "6 years",
//         hospital: "FitLife Nutrition Center",
//         contact: "0340-9988772",
//         // image: "/images/doctor22.jpeg",
//         image: require("../images/doctor22.jpeg")
//       },
//     ],
//   },
//   {
//     id: 23,
//     name: "Endocrinologist",
//     description: "Treats hormone-related disorders like diabetes and thyroid.",
//     link: "/specialities/endocrinologist",
//     doctors: [
//       {
//         id: "en1",
//         name: "Dr. Bilal Arif",
//         qualification: "MBBS, FCPS (Endocrinology)",
//         experience: "12 years",
//         hospital: "Hormone Health Center",
//         contact: "0320-6677885",
//         // image: "/images/doctor23.jpeg",
//         image: require("../images/doctor23.jpeg")
//       },
//     ],
//   },
//   {
//     id: 24,
//     name: "Hematologist",
//     description: "Specialist in blood and bone marrow disorders.",
//     link: "/specialities/hematologist",
//     doctors: [
//       {
//         id: "h1",
//         name: "Dr. Nida Iqbal",
//         qualification: "MBBS, FCPS (Hematology)",
//         experience: "9 years",
//         hospital: "Blood Care Center",
//         contact: "0315-4455667",
//         // image: "/images/doctor24.jpg",
//         image: require("../images/doctor24.jpg")
//       },
//     ],
//   },
//   {
//     id: 25,
//     name: "Pain Specialist",
//     description: "Focuses on managing chronic and nerve pain.",
//     link: "/specialities/pain-specialist",
//     doctors: [
//       {
//         id: "pa1",
//         name: "Dr. Amna Tariq",
//         qualification: "MBBS, MD (Pain Management)",
//         experience: "8 years",
//         hospital: "Pain Relief Center",
//         contact: "0345-8899776",
//         // image: "/images/doctor25.jpg",
//         image: require("../images/doctor25.jpg")
//       },
//     ],
//   },
//   {
//     id: 26,
//     name: "Sonologist",
//     description: "Performs ultrasound imaging for diagnosis.",
//     link: "/specialities/sonologist",
//     doctors: [
//       {
//         id: "so1",
//         name: "Dr. Rimsha Tariq",
//         qualification: "MBBS, Diploma in Ultrasonography",
//         experience: "7 years",
//         hospital: "UltraScan Center",
//         contact: "0330-4455662",
//         // image: "/images/doctor26.webp",
//         image: require("../images/doctor26.webp")
//       },
//     ],
//   },
//   {
//     id: 27,
//     name: "Pathologist",
//     description: "Examines tissues, cells, and blood for diagnosis.",
//     link: "/specialities/pathologist",
//     doctors: [
//       {
//         id: "pa2",
//         name: "Dr. Rukhsar Khan",
//         qualification: "MBBS, FCPS (Pathology)",
//         experience: "11 years",
//         hospital: "LabPro Diagnostics",
//         contact: "0321-5566774",
//         // image: "/images/doctor27.jpg",
//         image: require("../images/doctor27.jpg")
//       },
//     ],
//   },
//   {
//     id: 28,
//     name: "Fitness Trainer",
//     description: "Helps clients improve their physical fitness through exercise, nutrition, and lifestyle guidance.",
//     link: "/specialities/fitness-trainer",
//     doctors: [
//       {
//         id: "f2",
//         name: "Adeel Khan",
//         qualification: "Certified Personal Trainer (ACE, ISSA)",
//         experience: "8 years",
//         hospital: "ShapeUp Fitness Center, Lahore",
//         contact: "0323-9988776",
//         // image: "/images/doctor28.webp",
//         image: require("../images/doctor28.webp")
//       },
//     ],
//   },
//   {
//     id: 29,
//     name: "Geneticist",
//     description: "Studies genes and inherited diseases to diagnose and manage genetic disorders.",
//     link: "/specialities/geneticist",
//     doctors: [
//       {
//         id: "ge1",
//         name: "Dr. Saira Nadeem",
//         qualification: "PhD (Medical Genetics)",
//         experience: "10 years",
//         hospital: "Genome Research Center",
//         contact: "0333-4455669",
//         // image: "/images/doctor29.jpeg",
//         image: require("../images/doctor29.jpeg")
//       },
//     ],
//   },
//   {
//     id: 30,
//     name: "Chiropractor",
//     description: "Specializes in spinal adjustment and musculoskeletal health.",
//     link: "/specialities/chiropractor",
//     doctors: [
//       {
//         id: "ch1",
//         name: "Dr. Hammad Zafar",
//         qualification: "Doctor of Chiropractic (DC)",
//         experience: "9 years",
//         hospital: "Spine Care Clinic",
//         contact: "0321-7788996",
//         // image: "/images/doctor30.webp",
//         image: require("../images/doctor30.webp")
//       },
//     ],
//   },
// ];

// export default doctorsData;