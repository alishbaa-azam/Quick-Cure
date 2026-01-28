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
import BookAppointment from './components/Doctors/appointmentBooking';
import ViewProfile from "./components/Doctors/ViewProfile";
import DoctorRegistration from "./components/Registration/doctor_registration";
import PharmacyRegistration from "./components/Registration/PharmacyRegistration";

import LabDashboard from "./components/LabDashboards/LabDashboard";
import LabsPage from "./components/Lab/lab";
import LabDetail from "./components/Lab/LabDetail";
import LoginPage from "./components/Login/LoginPage";
import TestBooking from "./components/Lab/LabTestBooking";

import PharmacyPage from "./components/Pharmacy/PharmacyPage";
import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
import MedicinePage from "./components/Pharmacy/MedicinePage";
import MedicineDetail from "./components/Pharmacy/MedicineDetail";
import MedicineBooking from "./components/Pharmacy/MedicineBooking";
// import OrderHistory from './components/Pharmacy/OrderHistory';


// Dashboard Components (NEW STRUCTURE)
import PharmacyDashboardLayout from './components/Dashboard/PharmacyDashboardLayout.jsx';
import DashboardHome from './components/Dashboard/DashboardHome.jsx';
// import FeaturesPage from '../../../Unused files/F/FeaturesPage.jsx';
import CategoriesPage from './components/Dashboard/CategoriesPage.jsx';
import ProductsPage from './components/Dashboard/ProductsPage.jsx';
import SalesPage from './components/Dashboard/SalesPage.jsx';
import OrdersPage from './components/Dashboard/OrdersPage.jsx';
// import CustomersPage from '../../../Unused files/F/CustomersPage.jsx';
// import FinancePage from '../../../Unused files/F/FinancePage.jsx';
import ReportsPage from './components/Dashboard/ReportsPage.jsx';
// import SupportPage from '../../../Unused files/F/SupportPage.jsx';
import SettingsPage from './components/Dashboard/SettingsPage.jsx';
import ProfilePage from './components/Dashboard/ProfilePage.jsx';

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
       <Route path="/doctor/:id" element={<ViewProfile />} />
        <Route path="/book-appointment/:doctorId" element={<BookAppointment doctorId={location.pathname.split('/')[2]} />} />
        <Route path="/registration" element={<DoctorRegistration />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path='/lab/dashboard' element={<LabDashboard />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/:id" element={<LabDetail />} />
        <Route path="/labs/:id/booking" element={<TestBooking />} />

<Route path="/pharmacies" element={<PharmacyPage cart={cart} setCart={setCart} />} /> {/* All Pharmacies Page */}
        <Route path="/pharmacies/:id" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />
        <Route path="/medicines" element={<MedicinePage cart={cart} setCart={setCart} />} /> {/* All Medicines Page */}
        <Route path="/medicine/:id" element={<MedicineDetail cart={cart} setCart={setCart} />} /> {/* Medicine Detail Page */}
        <Route path="/booking" element={<MedicineBooking cart={cart} setCart={setCart} />} />
        {/* <Route path="/orders" element={<OrderHistory />} /> */}
        <Route path="/pharmacyRegistration" element={<PharmacyRegistration />} />

      {/* NEW: Dashboard Routes with Layout */}
        <Route path="/PharmacyDashboard" element={<PharmacyDashboardLayout />}>
          <Route index element={<DashboardHome />} />
          {/* <Route path="features" element={<FeaturesPage />} /> */}
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          {/* <Route path="customers" element={<CustomersPage />} /> */}
          {/* <Route path="finance" element={<FinancePage />} /> */}
          <Route path="reports" element={<ReportsPage />} />
          {/* <Route path="support" element={<SupportPage />} />  */}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

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


// above woorking well
































// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// import Header from "./components/Header/header";
// import Footer from "./components/footer";
// import Home from "./components/Home/home";
// import DoctorsPage from "./components/Doctors/DoctorsPage";
// import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
// import VideoConsultation from "./components/Doctors/VideoConsultation";
// import VideoConsultationPage from "./components/Doctors/VideoConsultationPage";
// import ViewProfile from "./components/Doctors/ViewProfile";
// import DoctorRegistration from "./components/Registration/doctor_registration";

// import LabsPage from "./components/Lab/lab";
// import LabDetail from "./components/Lab/LabDetail";
// import LoginPage from "./components/Login/LoginPage";
// import TestBooking from "./components/Lab/LabTestBooking";

// import PharmacyPage from "./components/Pharmacy/PharmacyPage";
// import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
// import MedicinePage from "./components/Pharmacy/MedicinePage";
// import MedicineDetail from "./components/Pharmacy/MedicineDetail";
// import MedicineBooking from "./components/Pharmacy/MedicineBooking";



// import ScrollToTop from "./ScrollToTop";  

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


//         <Route path="/pharmacies" element={<PharmacyPage />} /> {/* Main pharmacy listing */}
//         {/* <Route path="/pharmacies/:pharmacyId" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />  Pharmacy Detail Page */}
//         <Route path="/pharmacies/:id" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />
//         <Route path="/medicines" element={<MedicinePage cart={cart} setCart={setCart} />} /> {/* All Medicines Page */}
//         <Route path="/medicine/:id" element={<MedicineDetail cart={cart} setCart={setCart} />} /> {/* Medicine Detail Page */}
//         <Route path="/booking" element={<MedicineBooking cart={cart} setCart={setCart} />} />




//       </Routes>

//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// const App = () => {
//   return (
//     <Router>
//       <ScrollToTop />  
//       <Layout />
//     </Router>
//   );
// };

// export default App;





//  import React, { useState } from 'react';
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










// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// import Header from "./components/Header/header";
// import Footer from "./components/footer";
// import Home from "./components/Home/home";

// import AboutContactPage from './components/AboutContactPage';

// import DoctorsPage from "./components/Doctors/DoctorsPage";
// import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
// import VideoConsultation from "./components/Doctors/VideoConsultation";
// import VideoConsultationPage from "./components/Doctors/VideoConsultationPage";
// import ViewProfile from "./components/Doctors/ViewProfile";
// import DoctorRegistration from "./components/Registration/doctor_registration";

// import LabsPage from "./components/Lab/lab";
// import LabDetail from "./components/Lab/LabDetail";
// import LoginPage from "./components/Login/LoginPage";
// import TestBooking from "./components/Lab/LabTestBooking";

// import PharmacyPage from "./components/Pharmacy/PharmacyPage";
// import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
// import MedicinePage from "./components/Pharmacy/MedicinePage";
// import MedicineDetail from "./components/Pharmacy/MedicineDetail";
// import MedicineBooking from "./components/Pharmacy/MedicineBooking";


// // Dashboard Components (NEW STRUCTURE)
// import PharmacyDashboardLayout from './components/Dashboard/PharmacyDashboardLayout';
// import DashboardHome from './components/Dashboard/DashboardHome';
// import FeaturesPage from './components/Dashboard/FeaturesPage';
// import CategoriesPage from './components/Dashboard/CategoriesPage';
// import ProductsPage from './components/Dashboard/ProductsPage';
// import SalesPage from './components/Dashboard/SalesPage';
// import OrdersPage from './components/Dashboard/OrdersPage';
// import CustomersPage from './components/Dashboard/CustomersPage';
// import FinancePage from './components/Dashboard/FinancePage';
// import ReportsPage from './components/Dashboard/ReportsPage';
// import SupportPage from './components/Dashboard/SupportPage';
// import SettingsPage from './components/Dashboard/SettingsPage';



// import ScrollToTop from "./ScrollToTop";  

// function Layout() {
//   const location = useLocation();
//   const [cart, setCart] = useState([]);
//   const hideLayoutRoutes = ["/login"];

//   // const hideLayout = hideLayoutRoutes.includes(location.pathname);

//    const isDashboardRoute = location.pathname.startsWith('/PharmacyDashboard');
//   const hideLayout = hideLayoutRoutes.includes(location.pathname) || isDashboardRoute;

//   return (
//     <>
//       {!hideLayout && <Header />}

//       <Routes>
//         <Route path="/" element={<Home />} />

//         <Route path="/about" element={<AboutContactPage />} />

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


//         <Route path="/pharmacies" element={<PharmacyPage />} /> {/* Main pharmacy listing */}
//         {/* <Route path="/pharmacies/:pharmacyId" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />  Pharmacy Detail Page */}
//         <Route path="/pharmacies/:id" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />
//         <Route path="/medicines" element={<MedicinePage cart={cart} setCart={setCart} />} /> {/* All Medicines Page */}
//         <Route path="/medicine/:id" element={<MedicineDetail cart={cart} setCart={setCart} />} /> {/* Medicine Detail Page */}
//         <Route path="/booking" element={<MedicineBooking cart={cart} setCart={setCart} />} />


//       {/* NEW: Dashboard Routes with Layout */}
//         <Route path="/PharmacyDashboard" element={<PharmacyDashboardLayout />}>
//           <Route index element={<DashboardHome />} />
//           <Route path="features" element={<FeaturesPage />} />
//           <Route path="categories" element={<CategoriesPage />} />
//           <Route path="products" element={<ProductsPage />} />
//           <Route path="sales" element={<SalesPage />} />
//           <Route path="orders" element={<OrdersPage />} />
//           <Route path="customers" element={<CustomersPage />} />
//           <Route path="finance" element={<FinancePage />} />
//           <Route path="reports" element={<ReportsPage />} />
//           <Route path="support" element={<SupportPage />} /> 
//           <Route path="settings" element={<SettingsPage />} />
//         </Route>



//       </Routes>

//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// const App = () => {
//   return (
//     <Router>
//       <ScrollToTop />  
//       <Layout />
//     </Router>
//   );
// };

// export default App;

















//   if this works then replace first above code with that
// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// import Header from "./components/Header/header";
// import Footer from "./components/footer";
// import Home from "./components/Home/home";
// import DoctorsPage from "./components/Doctors/DoctorsPage";
// import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
// import ViewProfile from "./components/Doctors/ViewProfile";
// import DoctorRegistration from "./components/Registration/doctor_registration";

// import LabsPage from "./components/Lab/lab";
// import LabDetail from "./components/Lab/LabDetail";
// import LoginPage from "./components/Login/LoginPage";
// import TestBooking from "./components/Lab/LabTestBooking";

// import PharmacyPage from "./components/Pharmacy/PharmacyPage";
// import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
// import MedicinePage from "./components/Pharmacy/MedicinePage";
// import MedicineDetail from "./components/Pharmacy/MedicineDetail";
// import MedicineBooking from "./components/Pharmacy/MedicineBooking";

// // Pharmacy Dashboard Components (NEW STRUCTURE)
// import PharmacyDashboardLayout from './components/PharmacyDashboard/PharmacyLayout';
// import PharmacyDashboardHome from './components/PharmacyDashboard/PharmacyDashboard';
// import ProductsPage from './components/PharmacyDashboard/ProductsPage';
// import SalesPage from './components/PharmacyDashboard/SalesPage';
// import OrdersPage from './components/PharmacyDashboard/OrdersPage';
// import CategoriesPage from './components/PharmacyDashboard/CategoriesPage';
// import CustomersPage from './components/PharmacyDashboard/CustomersPage';
// import FinancePage from './components/PharmacyDashboard/FinancePage';
// import ReportsPage from './components/PharmacyDashboard/ReportsPage';
// import SettingsPage from './components/PharmacyDashboard/SettingsPage';

// import PharmacyLogin from './components/PharmacyDashboard/PharmacyLogin';

// import ScrollToTop from "./ScrollToTop";  

// function Layout() {
//   const location = useLocation();
//   const [cart, setCart] = useState([]);
//   const hideLayoutRoutes = ["/login", "/pharmacy/login"];

//   const hideLayout = hideLayoutRoutes.includes(location.pathname);

//   return (
//     <>
//       {!hideLayout && !location.pathname.startsWith('/pharmacy/dashboard') && <Header />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<DoctorsPage />} />
//         <Route path="/specialities/:specialityName" element={<SpecialityDoctors />} />
//         <Route path="/doctor/:id" element={<ViewProfile />} />
//         <Route path="/registration" element={<DoctorRegistration />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/labs" element={<LabsPage />} />
//         <Route path="/labs/:id" element={<LabDetail />} />
//         <Route path="/labs/:id/booking" element={<TestBooking />} />

//         <Route path="/pharmacies" element={<PharmacyPage />} />
//         <Route path="/pharmacies/:id" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />
//         <Route path="/medicines" element={<MedicinePage cart={cart} setCart={setCart} />} />
//         <Route path="/medicine/:id" element={<MedicineDetail cart={cart} setCart={setCart} />} />
//         <Route path="/booking" element={<MedicineBooking cart={cart} setCart={setCart} />} />

//         {/* Pharmacy Login Route */}
//         <Route path="/pharmacy/login" element={<PharmacyLogin />} />

//          {/* FIXED: Pharmacy Dashboard Routes */}
//         <Route 
//           path="/pharmacy/dashboard/*" 
//           element={
//             <PharmacyProtectedRoute>
//               <PharmacyDashboardLayout />
//             </PharmacyProtectedRoute>
//           }
//         >
//           <Route index element={<PharmacyDashboardHome />} />
//           <Route path="products" element={<ProductsPage />} />
//           <Route path="sales" element={<SalesPage />} />
//           <Route path="orders" element={<OrdersPage />} />
//           <Route path="categories" element={<CategoriesPage />} />
//           <Route path="customers" element={<CustomersPage />} />
//           <Route path="finance" element={<FinancePage />} />
//           <Route path="reports" element={<ReportsPage />} />
//           <Route path="settings" element={<SettingsPage />} />
//         </Route>

//         {/* Catch-all route for dashboard */}
//         <Route path="/pharmacy/dashboard" element={<Navigate to="/pharmacy/dashboard/" />} />

//       </Routes>

//       {!hideLayout && !location.pathname.startsWith('/pharmacy/dashboard') && <Footer />}
//     </>
//   );
// }

// const App = () => {
//   return (
//     <Router>
//       <ScrollToTop />  
//       <Layout />
//     </Router>
//   );
// };

// export default App;