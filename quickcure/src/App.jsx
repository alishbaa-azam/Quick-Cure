import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header/header";
import Footer from "./components/footer";
import Home from "./components/Home/home";
import DoctorsPage from "./components/Doctors/DoctorsPage";
import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
import VideoConsultation from "./components/Doctors/VideoConsultation";
import VideoConsultationPage from "./components/Doctors/VideoConsultationPage";
import ViewProfile from "./components/Doctors/ViewProfile";
import DoctorRegistration from "./components/Registration/doctor_registration";

import LabsPage from "./components/Lab/lab";
import LabDetail from "./components/Lab/LabDetail";
import LoginPage from "./components/Login/LoginPage";
import TestBooking from "./components/Lab/LabTestBooking";

import PharmacyPage from "./components/Pharmacy/PharmacyPage";
import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
import MedicinePage from "./components/Pharmacy/MedicinePage";
import MedicineDetail from "./components/Pharmacy/MedicineDetail";
import MedicineBooking from "./components/Pharmacy/MedicineBooking";
// import MedicinePage from './components/Pharmacy/MedicinePage';

import PharmacyDashboard from './components/Dashboard/PharmacyDashboard';

import ScrollToTop from "./ScrollToTop";  

function Layout() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
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
        <Route path="/video-consultation/:doctorId" element={<VideoConsultationPage />} />
        <Route path="/doctor/:id" element={<ViewProfile />} />
        <Route path="/registration" element={<DoctorRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/:id" element={<LabDetail />} />
        <Route path="/labs/:id/booking" element={<TestBooking />} />


        <Route path="/pharmacies" element={<PharmacyPage />} /> {/* Main pharmacy listing */}
        {/* <Route path="/pharmacies/:pharmacyId" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />  Pharmacy Detail Page */}
        <Route path="/pharmacies/:id" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />
        <Route path="/medicines" element={<MedicinePage cart={cart} setCart={setCart} />} /> {/* All Medicines Page */}
        <Route path="/medicine/:id" element={<MedicineDetail cart={cart} setCart={setCart} />} /> {/* Medicine Detail Page */}
        <Route path="/booking" element={<MedicineBooking cart={cart} setCart={setCart} />} />

        <Route path="/PharmacyDashboard" element={<PharmacyDashboard />} />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

const App = () => {
  return (
    <Router>
      <ScrollToTop />  
      <Layout />
    </Router>
  );
};

export default App;


// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
  
// } from "react-router-dom";

// import Header from "./components/Header/header";
// import Home from "./components/Home/home";
// import DoctorsPage from "./components/Doctors/DoctorsPage";
// import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
// import VideoConsultation from "./components/Doctors/VideoConsultation";
// import VideoConsultationPage from "./components/Doctors/VideoConsultationPage";
// import ViewProfile from "./components/Doctors/ViewProfile";
// import LabsPage from "./components/Lab/lab";
// import LabDetail from "./components/Lab/LabDetail";
// import LoginPage from "./components/Login/LoginPage";
// import DoctorRegistration from "./components/Registration/doctor_registration";
// import Footer from "./components/footer";
// import TestBooking from "./components/Lab/LabTestBooking";
// import PharmacyPage from "./components/Pharmacy/PharmacyPage";
// import MedicineDetail from "./components/Pharmacy/MedicineDetail";
// import MedicineBooking from "./components/Pharmacy/MedicineBooking";

// function Layout() {
//   const location = useLocation();
//   const [cart, setCart] = useState([]);
//   const hideLayoutRoutes = ["/login"];

//   const hideLayout = hideLayoutRoutes.includes(location.pathname);

//   return (
//     <>
//       {!hideLayout && <Header />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<DoctorsPage />} />
//         <Route path="/specialities/:specialityName" element={<SpecialityDoctors />} />
//         <Route path="/video-consultation" element={<VideoConsultation />} />
//         <Route path="/video-consultation/:doctorId" element={<VideoConsultationPage />} />
//         <Route path="/doctor/:id" element={<ViewProfile />} />
//         <Route path="/registration" element={<DoctorRegistration />} /> 
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/labs" element={<LabsPage />} />
//         <Route path="/labs/:id" element={<LabDetail />} />
//         <Route path="/labs/:id/booking" element={<TestBooking />} />
//         <Route path="/pharmacy" element={<PharmacyPage cart={cart} setCart={setCart} />} />
//         <Route path="/medicine/:id" element={<MedicineDetail cart={cart} setCart={setCart} />} />
//         <Route path="/booking" element={<MedicineBooking cart={cart} setCart={setCart} />} />
//       </Routes>

//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// const App = () => {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// };

// export default App;



