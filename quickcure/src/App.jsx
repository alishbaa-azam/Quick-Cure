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
import AboutContactPage from './components/AboutContactPage';
import DoctorsPage from "./components/Doctors/DoctorsPage";
import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
import BookAppointment from './components/Doctors/appointmentBooking';
import ViewProfile from "./components/Doctors/ViewProfile";
import DoctorRegistration from "./components/Registration/doctor_registration";

import LabDashboard from "./components/LabDashboards/LabDashboard";
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';

import LabsPage from "./components/Lab/lab";
import LabDetail from "./components/Lab/LabDetail";
import LoginPage from "./components/Login/LoginPage";
import TestBooking from "./components/Lab/LabTestBooking";

import PharmacyPage from "./components/Pharmacy/PharmacyPage";
import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
import MedicinePage from "./components/Pharmacy/MedicinePage";
import MedicineDetail from "./components/Pharmacy/MedicineDetail";
import MedicineBooking from "./components/Pharmacy/MedicineBooking";
import PharmacyRegistration from "./components/Registration/PharmacyRegistration";
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
// import ProfilePage from './components/Dashboard/ProfilePage.jsx';
//context
// import { AuthProvider } from './Context/authContext.jsx';


import ScrollToTop from "./ScrollToTop";  
import LabRegistrationForm from './components/Registration/labRegistration.jsx';

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
        <Route path="/about" element={<AboutContactPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/specialities/:specialityName" element={<SpecialityDoctors />} />
      <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
        <Route path="/doctor/:id" element={<ViewProfile />} />
        <Route path="/registration" element={<DoctorRegistration />} />
        <Route path="/DoctorDashboard" element={<DoctorDashboard />} />

        
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/labs/692b638f52ab6641e190e85e" element={<LabDetail />} /> */}
        <Route path='/lab/dashboard' element={<LabDashboard />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/:id" element={<LabDetail />} />
        <Route path="/labs/:id/booking" element={<TestBooking />} />
        <Route path="/regis" element={<LabRegistrationForm />} />



        <Route path="/reg" element={<PharmacyRegistration/>}/>
        <Route path="/pharmacies" element={<PharmacyPage />} /> {/* Main pharmacy listing */}
        {/* <Route path="/pharmacies/:pharmacyId" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} /> */}
        <Route path="/pharmacies/:id" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />
        <Route path="/medicines" element={<MedicinePage cart={cart} setCart={setCart} />} /> {/* All Medicines Page */}
        <Route path="/medicine/:id" element={<MedicineDetail cart={cart} setCart={setCart} />} /> {/* Medicine Detail Page */}
        <Route path="/booking" element={<MedicineBooking cart={cart} setCart={setCart} />} />
        <Route path="/reg" element={<PharmacyRegistration />} />
        {/* <Route path="/orders" element={<OrderHistory />} /> */}

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
          {/* <Route path="profile" element={<ProfilePage />} /> */}
        </Route>

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

const App = () => {
  return (
  
    <Router>
        {/* <AuthProvider> */}
      <ScrollToTop />  
      <Layout />
         {/* </AuthProvider> */}
    </Router>
 
  );
};

export default App;


// above woorking well