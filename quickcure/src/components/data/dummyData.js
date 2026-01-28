// export const appointments = [
//   { 
//     id: 1, 
//     patientName: "Ibrahim Kadri", 
//     contact: "03225243677",
//     email: "ibrahim@email.com",
//     date: "2024-02-13", 
//     time: "05:00 PM", 
//     status: "Approved", 
//   },
//   { 
//     id: 2, 
//     patientName: "Miquel Aben Asvad", 
//     contact: "03331234567",
//     email: "miquel@email.com",
//     date: "2024-02-14", 
//     time: "05:30 PM", 
//     status: "Pending", 
//   },
//   { 
//     id: 3, 
//     patientName: "Sa'd ibn Abi Waqqas", 
//     contact: "03445678901",
//     email: "sad@email.com",
//     date: "2024-02-15", 
//     time: "06:00 PM", 
//     status: "Completed", 
//   },
//   { 
//     id: 4, 
//     patientName: "Abu Talha al-Ansari", 
//     contact: "03111222333",
//     email: "abutalha@email.com",
//     date: "2024-02-16", 
//     time: "06:30 PM", 
//     status: "Approved", 
//   },
//   { 
//     id: 5, 
//     patientName: "Abdullah ibn Masud", 
//     contact: "03004455667",
//     email: "abdullah@email.com",
//     date: "2024-02-17", 
//     time: "07:00 PM", 
//     status: "Pending",
//   },
// ];

// export const patients = [
//   { 
//     id: 1, 
//     name: "John Smith", 
//     age: 35, 
//     gender: "Male", 
//     contact: "03225243677", 
//     email: "john@email.com",
//     lastVisit: "2024-02-10" 
//   },
//   { 
//     id: 2, 
//     name: "Sarah Johnson", 
//     age: 28, 
//     gender: "Female", 
//     contact: "03331234567", 
//     email: "sarah@email.com",
//     lastVisit: "2024-02-12" 
//   },
//   { 
//     id: 3, 
//     name: "Michael Brown", 
//     age: 45, 
//     gender: "Male", 
//     contact: "03445678901", 
//     email: "michael@email.com",
//     lastVisit: "2024-02-08" 
//   },
//   { 
//     id: 4, 
//     name: "Emily Davis", 
//     age: 32, 
//     gender: "Female", 
//     contact: "03111222333", 
//     email: "emily@email.com",
//     lastVisit: "2024-02-14" 
//   },
//   { 
//     id: 5, 
//     name: "David Wilson", 
//     age: 50, 
//     gender: "Male", 
//     contact: "03004455667", 
//     email: "david@email.com",
//     lastVisit: "2024-02-13" 
//   },
// ];

// export const medicalHistory = [
//   { id: 1, date: "2024-01-15", diagnosis: "Hypertension", treatment: "Lisinopril 10mg daily",doctor:'Dr. Sarah Chen',
//     notes: 'Blood pressure: 145/92 mmHg. Advised lifestyle changes.',
//     followUp: '2024-04-15' },
//   { id: 2, date: "2023-11-20", diagnosis: "Type 2 Diabetes", treatment: "Metformin 500mg twice daily" },
//   { id: 3, date: "2023-09-10", diagnosis: "Migraine", treatment: "Sumatriptan 50mg as needed" },
// ];

// export const prescriptions = [
//   { id: 1, medicine: "Lisinopril", dosage: "10mg", frequency: "Once daily", instructions: "Take with water" },
//   { id: 2, medicine: "Metformin", dosage: "500mg", frequency: "Twice daily", instructions: "Take with meals" },
//   { id: 3, medicine: "Atorvastatin", dosage: "20mg", frequency: "Once daily", instructions: "Take at bedtime" },
// ];

// export const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
// export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export const summaryStats = {
//   totalPatients: 150,
//   todayAppointments: 8,
//   pendingAppointments: 12,
//   completedAppointments: 45
// };

// export const getStatusColor = (status) => {
//   switch(status) {
//     case 'Approved': return 'bg-green-100 text-green-800';
//     case 'Pending': return 'bg-yellow-100 text-yellow-800';
//     case 'Completed': return 'bg-blue-100 text-blue-800';
//     default: return 'bg-gray-100 text-gray-800';
//   }
// };


// components/data/dummyData.js
export const appointments = [
  { 
    id: 1, 
    patientName: "Ibrahim Kadri", 
    contact: "03225243677",
    email: "ibrahim@email.com",
    date: "2024-02-13", 
    time: "05:00 PM", 
    status: "Approved", 
  },
  { 
    id: 2, 
    patientName: "Miquel Aben Asvad", 
    contact: "03331234567",
    email: "miquel@email.com",
    date: "2024-02-14", 
    time: "05:30 PM", 
    status: "Pending", 
  },
  { 
    id: 3, 
    patientName: "Sa'd ibn Abi Waqqas", 
    contact: "03445678901",
    email: "sad@email.com",
    date: "2024-02-15", 
    time: "06:00 PM", 
    status: "Completed", 
  },
  { 
    id: 4, 
    patientName: "Abu Talha al-Ansari", 
    contact: "03111222333",
    email: "abutalha@email.com",
    date: "2024-02-16", 
    time: "06:30 PM", 
    status: "Approved", 
  },
  { 
    id: 5, 
    patientName: "Abdullah ibn Masud", 
    contact: "03004455667",
    email: "abdullah@email.com",
    date: "2024-02-17", 
    time: "07:00 PM", 
    status: "Pending",
  },
];

export const patients = [
  { 
    id: 1, 
    name: "John Smith", 
    age: 35, 
    gender: "Male", 
    contact: "03225243677", 
    email: "john@email.com",
    lastVisit: "2024-02-10" 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    age: 28, 
    gender: "Female", 
    contact: "03331234567", 
    email: "sarah@email.com",
    lastVisit: "2024-02-12" 
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    age: 45, 
    gender: "Male", 
    contact: "03445678901", 
    email: "michael@email.com",
    lastVisit: "2024-02-08" 
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    age: 32, 
    gender: "Female", 
    contact: "03111222333", 
    email: "emily@email.com",
    lastVisit: "2024-02-14" 
  },
  { 
    id: 5, 
    name: "David Wilson", 
    age: 50, 
    gender: "Male", 
    contact: "03004455667", 
    email: "david@email.com",
    lastVisit: "2024-02-13" 
  },
];

export const medicalHistory = [
  { id: 1, date: "2024-01-15", diagnosis: "Hypertension", treatment: "Lisinopril 10mg daily", doctor:'Dr. Sarah Chen', notes: 'Blood pressure: 145/92 mmHg. Advised lifestyle changes.',followUp: '2024-04-15' },
  { id: 2, date: "2023-11-20", diagnosis: "Type 2 Diabetes", treatment: "Metformin 500mg twice daily" , doctor:'Dr. Sarah Chen', notes: 'Blood pressure: 145/92 mmHg. Advised lifestyle changes.',followUp: '2024-04-15' },
  { id: 3, date: "2023-09-10", diagnosis: "Migraine", treatment: "Sumatriptan 50mg as needed", doctor:'Dr. Sarah Chen', notes: 'Blood pressure: 145/92 mmHg. Advised lifestyle changes.',followUp: '2024-04-15' },
];

export const patientDetails = {
  name: 'John Smith',
  age: 45,
  gender: 'Male',
  contact: '+1 (555) 123-4567',
  email: 'john.smith@email.com',
  address: '123 Main St, New York, NY 10001',
  bloodType: 'O+',
  height: '5\'11"',
  weight: '185 lbs',
  emergencyContact: 'Mary Smith (+1-555-987-6543)',
  insurance: 'Aetna Premier Plan',
  policyNumber: 'AET-789456123',
  primaryPhysician: 'Dr. Sarah Chen'
};

export const prescriptions = [
  { id: 1, medicine: "Lisinopril", dosage: "10mg", frequency: "Once daily", instructions: "Take with water" },
  { id: 2, medicine: "Metformin", dosage: "500mg", frequency: "Twice daily", instructions: "Take with meals" },
  { id: 3, medicine: "Atorvastatin", dosage: "20mg", frequency: "Once daily", instructions: "Take at bedtime" },
];

export const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const summaryStats = {
  totalPatients: 150,
  todayAppointments: 8,
  pendingAppointments: 12,
  completedAppointments: 45
};

export const getStatusColor = (status) => {
  switch(status) {
    case 'Approved': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Completed': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};