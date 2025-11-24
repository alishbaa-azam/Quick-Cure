// ✅ Dynamically import all medicine images in Vite
const medImages = import.meta.glob('../../assets/medImages/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
});

// Helper function to get an image by filename
const getImage = (fileName) => {
  const path = `../assets/medImages/${fileName}`;
  return medImages[path] || '/medicine-placeholder.jpg';
};

// ✅ Medicine data
export const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    manufacturer: "MediCare",
    price: 5.99,
    discountPrice: 4.99,
    description: "Effective pain reliever and fever reducer.",
    category: "Pain Relief",
    inStock: true,
    image: getImage('paracetamol.jpg'),
    uses: ["Headache", "Fever", "Muscle pain"],
  dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
  warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
  precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
  sideEffects: ["Nausea", "Allergic reaction (rare)"]
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    manufacturer: "PharmaPlus",
    price: 12.99,
    description: "Antibiotic for bacterial infections.",
    category: "Antibiotics",
    inStock: true,
    image: getImage('amoxicillin.jpg'),
     uses: ["Headache", "Fever", "Muscle pain"],
  dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
  warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
  precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
  sideEffects: ["Nausea", "Allergic reaction (rare)"]
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    manufacturer: "HealthFirst",
    price: 8.49,
    discountPrice: 6.99,
    description: "Immune system support and antioxidant.",
    category: "Vitamins",
    inStock: true,
    image: getImage('vitamin-c.png'),
     uses: ["Headache", "Fever", "Muscle pain"],
  dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
  warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
  precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
  sideEffects: ["Nausea", "Allergic reaction (rare)"]
  },
  {
    id: 4,
    name: "Ibuprofen 400mg",
    manufacturer: "PainAway",
    price: 7.99,
    description: "Anti-inflammatory pain reliever.",
    category: "Pain Relief",
    inStock: false,
    image: getImage('ibuprofen.jpg'),
     uses: ["Headache", "Fever", "Muscle pain"],
  dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
  warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
  precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
  sideEffects: ["Nausea", "Allergic reaction (rare)"]
  },
  {
    id: 5,
    name: "Panadol 500mg",
    manufacturer: "AllerFree",
    price: 6.49,
    discountPrice: 4.99,
    description: "12-hour Pain relief.",
    category: "Pain Relief",
    inStock: true,
    image: getImage('panadol.jpg'),
     uses: ["Headache", "Fever", "Muscle pain"],
  dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
  warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
  precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
  sideEffects: ["Nausea", "Allergic reaction (rare)"]
  },
  {
    id: 6,
    name: "Acefyl Cough Syrup 125ml",
    manufacturer: "NABIQASIM INDUSTRIES (PVT) LTD",
    price: 15.99,
    description: "Cough and Cold  Treatment.",
    category: "Cough & Cold",
    inStock: true,
    image: getImage('acefyl-syrup.webp'),
     uses: ["Chronic bronchitis", "Cough with mucus", "Postnasal drip", "Chest congestion"],
  dosage: "Take one table spoon every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
  warnings: ["Consult a doctor if cough persists.", "Not recommended for children under 12 without supervision."],
  precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
  sideEffects: ["Nausea", "Allergic reaction (rare)"]
  },
  {
    id: 7,
    name: "Nuberol Forte Tablet 50mg",
    manufacturer: "Muscle Relaxant + Analgesic",
    price: 15.99,
    description: "Nuberol forte is an analgesic and antipyretic.",
    category: "Pain Relief",
    inStock: true,
    image: getImage('nuberol-forte-tablet.webp'),
     uses: ["Headache", "Fever", "Muscle pain"],
  dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
  warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
  precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
  sideEffects: ["Nausea", "Allergic reaction (rare)"]
  },
  {
    id: 8,
    name: "Ansaid Tablet 100mg",
    manufacturer: "Muscle Relaxant + Analgesic",
    price: 15.99,
    description: "Ansaid is used to relieve pain and inflammation.",
    category: "Teeth Pain Relief",
    inStock: true,
    image: getImage('ansaid-tablet.jpg'),
     uses: ["Toothache", "Gum Inflamation", "Swallowing pain"],
  dosage: "Take one tablet every 6 hours as needed. Do not exceed 4 tablets in 24 hours.",
  warnings: ["Consult a doctor if pain persists.", "Not recommended for children under 12 without supervision."],
  precautions: ["Avoid alcohol.", "Store in a cool, dry place."],
  sideEffects: ["Nausea", "Allergic reaction (rare)"]
  },
];

// ✅ Categories
export const categories = [
  "All",
  "Pain Relief",
  "Antibiotics",
  "Vitamins",
  "Allergy",
  "Digestive Health",
  "Cough & Cold",
  "Teeth Pain Relief",
];
