import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { CartProvider } from './contexts/CartContext.jsx';
import { PharmacyProvider } from './contexts/PharmacyContext.jsx'; 

import Header from "./components/Header/header";
import Footer from "./components/footer";
import Home from "./components/Home/home";
import AboutUs from "./components/AboutUs";
import Contact from './components/ContactPage.jsx';
import TermsPolicyPage from './components/TermsPolicyPage.jsx';


//------------Doctor Module---------------------------------------//

import DoctorsPage from "./components/Doctors/DoctorsPage";
import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
import BookAppointment from './components/Doctors/appointmentBooking';
import ViewProfile from "./components/Doctors/ViewProfile";
import DoctorRegistration from "./components/Registration/doctor_registration";
import AllReviews from './components/Doctors/AllReviews';

import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';
import MyOrders from './components/UserDashboard/MyOrders.jsx';

//---------------------Lab Module----------------------------------//
import LabDashboard from "./components/LabDashboards/LabDashboard";
import LabsPage from "./components/Lab/lab";
import LabDetail from "./components/Lab/LabDetail";
import LoginPage from "./components/Login/LoginPage";
import TestBooking from "./components/Lab/LabTestBooking";
import LabRegistration from "./components/Registration/labRegistration";
import LabUserDashboard from './components/LabDashboards/LabDashboard';

//---------------------Pharmacy Module----------------------------------//

import PharmacyPage from "./components/Pharmacy/PharmacyPage";
import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
import MedicinePage from "./components/Pharmacy/MedicinePage";
import MedicineDetail from "./components/Pharmacy/MedicineDetail";
import MedicineBooking from "./components/Pharmacy/MedicineBooking";
import PharmacyRegistration from "./components/Registration/PharmacyRegistration";
// import OrderHistory from './components/Pharmacy/OrderHistory';

// Dashboard Components (NEW STRUCTURE) - ACTIVATED
import PharmacyDashboardLayout from './components/PharmacyDashboard/PharmacyDashboardLayout.jsx';
import DashboardHome from './components/PharmacyDashboard/DashboardHome.jsx';
import CategoriesPage from './components/PharmacyDashboard/CategoriesPage.jsx';
import ProductsPage from './components/PharmacyDashboard/ProductsPage.jsx';
import SalesPage from './components/PharmacyDashboard/SalesPage.jsx';
import OrdersPage from './components/PharmacyDashboard/OrdersPage.jsx';
import SettingsPage from './components/PharmacyDashboard/SettingsPage.jsx';
import AddMedicinePage from './components/PharmacyDashboard/AddMedicinePage';
import EditMedicinePage from './components/PharmacyDashboard/EditMedicinePage';
import ViewMedicinePage from './components/PharmacyDashboard/ViewMedicinePage.jsx';
import AboutPage from './components/AboutUs.jsx';
import PaymentPage from './components/Payment/PaymentPage';

// Admin Dashboard
import AdminLayout from './components/AdminDashboard/AdminLayout';
import AdminDashboardHome from './components/AdminDashboard/AdminDashboardHome';
import UsersPage from './components/AdminDashboard/UsersPage';
import AdminDoctorsPage from './components/AdminDashboard/DoctorsPage';
import AdminLabsPage from './components/AdminDashboard/LabsPage';
import AdminPharmaciesPage from './components/AdminDashboard/PharmaciesPage';
import AdminOrdersPage from './components/AdminDashboard/OrdersPage';
import AdminPaymentsPage from './components/AdminDashboard/PaymentsPage';
import AdminReportsPage from './components/AdminDashboard/ReportsPage';
import AdminSettingsPage from './components/AdminDashboard/SettingsPage';
import RegistrationRequestsPage from './components/AdminDashboard/RegistrationRequestsPage';

// Technician Dashboard
import TechnicianLayout from './components/TechnicianDashboard/TechnicianLayout';
import TechnicianDashboardHome from './components/TechnicianDashboard/TechnicianDashboardHome';
import TodaysTasks from './components/TechnicianDashboard/TodaysTasks';
import UpcomingTasks from './components/TechnicianDashboard/UpcomingTasks';
import CompletedTasks from './components/TechnicianDashboard/CompletedTasks';
import TechnicianProfile from './components/TechnicianDashboard/TechnicianProfile';

import ScrollToTop from "./ScrollToTop";
import ContactPage from './components/ContactPage.jsx';

function Layout() {
  const location = useLocation();
  // const [cart, setCart] = useState([]);
  const hideLayoutRoutes = ["/login", "/lab/dashboard/:id", "/PharmacyDashboard", "/DoctorDashboard/dashboard/:id","/reg","/regis","/registration","/userdashboard"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  const shouldHideLayout =
  hideLayoutRoutes.includes(location.pathname) ||
  location.pathname.startsWith("/lab/dashboard") ||
  location.pathname.startsWith("/DoctorDashboard/dashboard") ||
  location.pathname.startsWith("/pharmacy/dashboard") ||
  location.pathname.startsWith("/admin");
  return (
    <>
      {!shouldHideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/termspolicies" element={<TermsPolicyPage />} />
        
        {/* Technician Routes - Uses existing login page */}
        <Route path="/technician" element={<TechnicianLayout />}>
          <Route index element={<TechnicianDashboardHome />} />
          <Route path="dashboard" element={<TechnicianDashboardHome />} />
          <Route path="today" element={<TodaysTasks />} />
          <Route path="upcoming" element={<UpcomingTasks />} />
          <Route path="completed" element={<CompletedTasks />} />
          <Route path="profile" element={<TechnicianProfile />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardHome />} />
        <Route path="dashboard" element={<AdminDashboardHome />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="registrations" element={<RegistrationRequestsPage />} />
        <Route path="doctors" element={<AdminDoctorsPage />} />
        <Route path="labs" element={<AdminLabsPage />} />
        <Route path="pharmacies" element={<AdminPharmaciesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
{/* //-------------------------Doctor Module---------------------------------------// */}

        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/specialities/:specialityName" element={<SpecialityDoctors />} />
        <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
        <Route path="/doctor/:id" element={<ViewProfile />} />
        <Route path="/registration" element={<DoctorRegistration />} />
        <Route path="/DoctorDashboard/dashboard/:id" element={<DoctorDashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/doctor-reviews/:id" element={<AllReviews />} />

{/* //-------------------------Lab Module---------------------------------------// */}

        <Route path='/lab/dashboard/:id' element={<LabUserDashboard />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/:id" element={<LabDetail />} />
        <Route path="/labs/:id/booking" element={<TestBooking />} />
        <Route path="/regis" element={<LabRegistration />} />
        <Route path="/about" element={<AboutPage />} />

{/* //-------------------------Pharmacy Module---------------------------------------// */}

       <Route path="/reg" element={<PharmacyRegistration />} />
       <Route path="/pharmacies" element={<PharmacyPage />} />
       <Route path="/pharmacies/:id" element={<PharmacyDetailPage />} />
       <Route path="/medicines" element={<MedicinePage />} />
       <Route path="/medicine/:id" element={<MedicineDetail />} />
       {/* <Route path="/orders" element={<OrderHistory />} /> */}
       <Route path="/booking" element={<MedicineBooking />} />

        <Route path="/payment" element={<PaymentPage />} />

        <Route path="/pharmacy/dashboard/:id" element={
          <PharmacyProvider>
            <PharmacyDashboardLayout />
          </PharmacyProvider>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddMedicinePage />} /> // No change here
          <Route path="products/edit/:medicineId" element={<EditMedicinePage />} />
          <Route path="products/view/:medicineId" element={<ViewMedicinePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

     

      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

const App = () => {
  return (
    <Router>
     <CartProvider>
             <ScrollToTop />
             <Layout />
    </CartProvider>
    </Router>
  );
};

export default App;
