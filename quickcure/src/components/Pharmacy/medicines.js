// // ✅ Dynamically import all medicine images in Vite
// const medImages = import.meta.glob('../../assets/medImages/*.{png,jpg,jpeg,svg,webp}', {
//   eager: true,
//   import: 'default',
// });

// // Helper function to get an image by filename
// const getImage = (fileName) => {
//   const path = `../assets/medImages/${fileName}`;
//   return medImages[path] || '/medicine-placeholder.jpg';
// };

// // ✅ Medicine data
// export const medicines = [
//   {
//     id: 1,
//     name: "Paracetamol 500mg",
//     manufacturer: "MediCare",
//     price: 5.99,
//     discountPrice: 4.99,
//     description: "Effective pain reliever and fever reducer.",
//     category: "Pain Relief",
//     inStock: true,
//     image: getImage('paracetamol.jpg'),
//     uses: ["Headache", "Fever", "Muscle pain"],
//   dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
//   warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
//   precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
//   sideEffects: ["Nausea", "Allergic reaction (rare)"]
//   },
//   {
//     id: 2,
//     name: "Amoxicillin 250mg",
//     manufacturer: "PharmaPlus",
//     price: 12.99,
//     description: "Antibiotic for bacterial infections.",
//     category: "Antibiotics",
//     inStock: true,
//     image: getImage('amoxicillin.jpg'),
//      uses: ["Headache", "Fever", "Muscle pain"],
//   dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
//   warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
//   precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
//   sideEffects: ["Nausea", "Allergic reaction (rare)"]
//   },
//   {
//     id: 3,
//     name: "Vitamin C 1000mg",
//     manufacturer: "HealthFirst",
//     price: 8.49,
//     discountPrice: 6.99,
//     description: "Immune system support and antioxidant.",
//     category: "Vitamins",
//     inStock: true,
//     image: getImage('vitamin-c.png'),
//      uses: ["Headache", "Fever", "Muscle pain"],
//   dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
//   warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
//   precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
//   sideEffects: ["Nausea", "Allergic reaction (rare)"]
//   },
//   {
//     id: 4,
//     name: "Ibuprofen 400mg",
//     manufacturer: "PainAway",
//     price: 7.99,
//     description: "Anti-inflammatory pain reliever.",
//     category: "Pain Relief",
//     inStock: false,
//     image: getImage('ibuprofen.jpg'),
//      uses: ["Headache", "Fever", "Muscle pain"],
//   dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
//   warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
//   precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
//   sideEffects: ["Nausea", "Allergic reaction (rare)"]
//   },
//   {
//     id: 5,
//     name: "Panadol 500mg",
//     manufacturer: "AllerFree",
//     price: 6.49,
//     discountPrice: 4.99,
//     description: "12-hour Pain relief.",
//     category: "Pain Relief",
//     inStock: true,
//     image: getImage('panadol.jpg'),
//      uses: ["Headache", "Fever", "Muscle pain"],
//   dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
//   warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
//   precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
//   sideEffects: ["Nausea", "Allergic reaction (rare)"]
//   },
//   {
//     id: 6,
//     name: "Acefyl Cough Syrup 125ml",
//     manufacturer: "NABIQASIM INDUSTRIES (PVT) LTD",
//     price: 15.99,
//     description: "Cough and Cold  Treatment.",
//     category: "Cough & Cold",
//     inStock: true,
//     image: getImage('acefyl-syrup.webp'),
//      uses: ["Chronic bronchitis", "Cough with mucus", "Postnasal drip", "Chest congestion"],
//   dosage: "Take one table spoon every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
//   warnings: ["Consult a doctor if cough persists.", "Not recommended for children under 12 without supervision."],
//   precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
//   sideEffects: ["Nausea", "Allergic reaction (rare)"]
//   },
//   {
//     id: 7,
//     name: "Nuberol Forte Tablet 50mg",
//     manufacturer: "Muscle Relaxant + Analgesic",
//     price: 15.99,
//     description: "Nuberol forte is an analgesic and antipyretic.",
//     category: "Pain Relief",
//     inStock: true,
//     image: getImage('nuberol-forte-tablet.webp'),
//      uses: ["Headache", "Fever", "Muscle pain"],
//   dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
//   warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
//   precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
//   sideEffects: ["Nausea", "Allergic reaction (rare)"]
//   },
//   {
//     id: 8,
//     name: "Ansaid Tablet 100mg",
//     manufacturer: "Muscle Relaxant + Analgesic",
//     price: 15.99,
//     description: "Ansaid is used to relieve pain and inflammation.",
//     category: "Teeth Pain Relief",
//     inStock: true,
//     image: getImage('ansaid-tablet.jpg'),
//      uses: ["Toothache", "Gum Inflamation", "Swallowing pain"],
//   dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
//   warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
//   precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
//   sideEffects: ["Nausea", "Allergic reaction (rare)"]
//   },
// ];

// // ✅ Categories
// export const categories = [
//   "All",
//   "Pain Relief",
//   "Antibiotics",
//   "Vitamins",
//   "Allergy",
//   "Digestive Health",
//   "Cough & Cold",
//   "Teeth Pain Relief",
// ];


export const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    description: "Pain reliever and fever reducer",
    detailedDescription: "Paracetamol is a common pain reliever and fever reducer. It's used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400",
    category: "Pain Relief",
    dosage: "500mg",
    sideEffects: ["Nausea", "Headache", "Insomnia"],
    uses: ["Fever", "Headache", "Body pain"]
  },
  {
    id: 2,
    name: "Amoxicillin",
    description: "Antibiotic for bacterial infections",
    detailedDescription: "Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
    category: "Antibiotic",
    dosage: "250mg",
    sideEffects: ["Nausea", "Diarrhea", "Skin rash"],
    uses: ["Bacterial infections", "Respiratory infections"]
  },
  {
    id: 3,
    name: "Ibuprofen",
    description: "Anti-inflammatory pain reliever",
    detailedDescription: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) that is used to treat mild to moderate pain, and helps to relieve symptoms of arthritis, dysmenorrhea, fever, and gout.",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1558645836-8916d8d9e8ae?w=400",
    category: "Pain Relief",
    dosage: "400mg",
    sideEffects: ["Stomach pain", "Heartburn", "Dizziness"],
    uses: ["Pain relief", "Inflammation", "Fever"]
  },
  {
    id: 4,
    name: "Vitamin C",
    description: "Immune system booster",
    detailedDescription: "Vitamin C is a vital nutrient for health. It helps form and maintain bones, skin, and blood vessels. It is also an antioxidant and helps support the immune system.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1584302179602-e4819bb92daa?w=400",
    category: "Supplements",
    dosage: "1000mg",
    sideEffects: ["Diarrhea", "Nausea", "Stomach cramps"],
    uses: ["Immune support", "Antioxidant"]
  },
  {
    id: 5,
    name: "Cetirizine",
    description: "Antihistamine for allergies",
    detailedDescription: "Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching.",
    price: 7.25,
    image: "https://images.unsplash.com/photo-1599045118108-bb99546c16ed?w=400",
    category: "Allergy",
    dosage: "10mg",
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
    uses: ["Allergy relief", "Hay fever", "Hives"]
  },
  {
    id: 6,
    name: "Omeprazole",
    description: "Acid reflux medication",
    detailedDescription: "Omeprazole is used to treat certain stomach and esophagus problems such as acid reflux, ulcers, and heartburn. It works by decreasing the amount of acid your stomach makes.",
    price: 18.75,
    image: "https://images.unsplash.com/photo-1550572017-eb101ade1d0a?w=400",
    category: "Gastrointestinal",
    dosage: "20mg",
    sideEffects: ["Headache", "Abdominal pain", "Nausea"],
    uses: ["Acid reflux", "Heartburn", "Ulcers"]
  }
];