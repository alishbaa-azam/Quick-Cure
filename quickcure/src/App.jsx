// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import Header from "./components/header";
// import Home from "./components/Home/home";
// import DoctorsPage from "./components/Doctors/DoctorsPage";
// // import LoginPage from "./components/Login/LoginPage";
// // import PharmacyPage from "./components/Pharmacy/PharmacyPage";
// // import SpecialityDoctors from "./components/Doctors/SpecialityDoctors"
// // import LabsPage from "./components/Lab/lab";
// // import LabDetail from "./components/Lab/LabDetail";
// // import MedicineDetail from "./components/Pharmacy/MedicineDetail";
// // import DoctorRegistration from "./components/Doctors/doctor_registration";

// function AppContent() {
//   const location = useLocation();

//   // Define routes where the header should NOT appear
//   const hideHeaderRoutes = ["/login"];

//   // Check if header should be shown
//   const showHeader = !hideHeaderRoutes.includes(location.pathname);

//   return (
//     <div style={{ margin: 0, padding: 0 }}>
//       {showHeader && <Header />}
//       <div style={{ marginTop: showHeader ? "0" : "0", padding: 0 }}>
//         <Routes>
//           <Route path="/home" element={<Home />} />
//           <Route path="/doctors" element={<DoctorsPage />} />
//           {/* <Route path="/login" element={<LoginPage />} /> */}
//           {/* <Route path="/registration" element={<DoctorRegistration />} /> */}
//           {/* <Route path="/pharmacy" element={<PharmacyPage />} /> */}
//           {/* <Route path="/specialities/dermatologist" element={<SpecialityDoctors/>}/> */}
//           {/* <Route path="/labs" element={<LabsPage />} /> */}
//         {/* <Route path="/labs/:id" element={<LabDetail />} />  */}
//           {/* <Route path="/medicine/:id" element={<MedicineDetail />} /> */}
//         </Routes>
//        </div>
//      </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PharmacyPage from "./components/PharmacyPage";
// import MedicineDetail from "./components/MedicineDetail";
// // import AdminDashboard from "./components/AdminDashboard";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public / User-facing routes */}
//         <Route path="/" element={<PharmacyPage />} />
//         <Route path="/medicine/:id" element={<MedicineDetail />} />

//         {/* <Route path="/admin" element={<AdminDashboard />} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,

// } from "react-router-dom";
// import Header from "./components/header";
// import Home from "./components/Home/home";
// import DoctorsPage from "./components/Doctors/DoctorsPage";
// import LabsPage from "./components/Lab/lab";
// import LabDetail from "./components/Lab/LabDetail";
// import LoginPage from "./components/Login/LoginPage";
// import DoctorRegistration from "./components/Doctors/doctor_registration";

// import Footer from "./components/footer";
// const App = () => {
//   return (
//     <div>
//       <Router>
//         <Header/>
//         <Routes>
//          <Route path="/" element={<Home/>} />
//           <Route path="/doctors" element={<DoctorsPage />} />
//           <Route path="/registration" element={<DoctorRegistration />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/labs" element={<LabsPage />} />
//           <Route path="/labs/:id" element={<LabDetail />} /> 
//         </Routes>
//           <Footer/>
//       </Router>
//     </div>
//   );
// };

// export default App;


import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header/header";
import Home from "./components/Home/home";
import DoctorsPage from "./components/Doctors/DoctorsPage";
import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
import VideoConsultation from "./components/Doctors/VideoConsultation";
import HospitalAppointment from "./components/Doctors/HospitalAppointment";
import LabsPage from "./components/Lab/lab";
import LabDetail from "./components/Lab/LabDetail";
import LoginPage from "./components/Login/LoginPage";
// import DoctorRegistration from "./components/Registration/doctor_registration";
import Footer from "./components/footer";

// Helper component to handle layout conditionally
function Layout() {
  const location = useLocation();

  // List of routes where header and footer should be hidden
  const hideLayoutRoutes = ["/login"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/specialities/:specialityName" element={<SpecialityDoctors />} />
        <Route path="/video-consultation" element={<VideoConsultation />} />
        <Route path="/hospital-appointment" element={<HospitalAppointment />} />
        {/* <Route path="/registration" element={<DoctorRegistration />} />  */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/:id" element={<LabDetail />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
