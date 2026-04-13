
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
// import AboutContactPage from './components/AboutContactPage';
// import Contact from './components/ContactPage.jsx';
import MyOrders from './components/UserDashboard/MyOrders.jsx';

//------------Doctor Module---------------------------------------//

import DoctorsPage from "./components/Doctors/DoctorsPage";
import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
import BookAppointment from './components/Doctors/appointmentBooking';
import ViewProfile from "./components/Doctors/ViewProfile";
import DoctorRegistration from "./components/Registration/doctor_registration";
import AllReviews from './components/Doctors/AllReviews';

// import LabDashboard from "./components/LabDashboards/LabDashboard";
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';

//---------------------Lab Module----------------------------------//

import LabsPage from "./components/Lab/lab";
import LabDetail from "./components/Lab/LabDetail";
import LoginPage from "./components/Login/LoginPage";
import TestBooking from "./components/Lab/LabTestBooking";
import LabRegistration from "./components/Registration/labRegistration";
import LabUserDashboard from './components/LabDashboards/LabDashboard';

//---------------------Lab Dashboard Components----------------------------------//
// import LabLayout from './components/LabDashboards/LabLayout';
// // import LabSidebar from './components/LabDashboards/LabSidebar';
// import ManageTests from './components/LabDashboards/ManageTests';
// import LabBookings from './components/LabDashboards/LabBookings';
// // import LabProfile from './components/LabDashboards/LabProfile';

//---------------------Pharmacy Module----------------------------------//

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
import CategoriesPage from './components/Dashboard/CategoriesPage.jsx';
import ProductsPage from './components/Dashboard/ProductsPage.jsx';
import SalesPage from './components/Dashboard/SalesPage.jsx';
import OrdersPage from './components/Dashboard/OrdersPage.jsx';
import ReportsPage from './components/Dashboard/ReportsPage.jsx';
import SettingsPage from './components/Dashboard/SettingsPage.jsx';
import AddMedicinePage from './components/Dashboard/AddMedicinePage';
import EditMedicinePage from './components/Dashboard/EditMedicinePage';
import AboutPage from './components/AboutUs.jsx';




// import SupportPage from '../../../Unused files/F/SupportPage.jsx';
// import CustomersPage from '../../../Unused files/F/CustomersPage.jsx';
// import FinancePage from '../../../Unused files/F/FinancePage.jsx';
// import FeaturesPage from '../../../Unused files/F/FeaturesPage.jsx';
// import ProfilePage from './components/Dashboard/ProfilePage.jsx';
//context
// import { AuthProvider } from './Context/authContext.jsx';


import ScrollToTop from "./ScrollToTop";

function Layout() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const hideLayoutRoutes = ["/login", "/lab/dashboard/:id", "/PharmacyDashboard", "/DoctorDashboard","/reg","/regis","/registration","/userdashboard"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  const shouldHideLayout =
  hideLayoutRoutes.includes(location.pathname) ||
  location.pathname.startsWith("/lab/dashboard") ||
  location.pathname.startsWith("/pharmacy/dashboard");
  return (
    <>
      {!shouldHideLayout && <Header />}
      {/* {!hideLayout && <Header />} */}


      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<AboutContactPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
{/* //-------------------------Doctor Module---------------------------------------// */}

        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/specialities/:specialityName" element={<SpecialityDoctors />} />
        <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
        <Route path="/doctor/:id" element={<ViewProfile />} />
        <Route path="/registration" element={<DoctorRegistration />} />
        <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/doctor-reviews/:id" element={<AllReviews />} />

{/* //-------------------------Lab Module---------------------------------------// */}

        <Route path='/lab/dashboard/:id' element={<LabUserDashboard />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/:id" element={<LabDetail />} />
        <Route path="/labs/:id/booking" element={<TestBooking />} />
        <Route path="/regis" element={<LabRegistration />} />
        <Route path="/about" element={<AboutPage />} />
{/* //-------------------------Lab Dashboard Module---------------------------------------// */}

        {/* <Route path="/lab/dashboard/:labId" element={<LabUserDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="tests" element={<ManageTests />} />
          <Route path="bookings" element={<LabBookings />} />
          {/* <Route path="profile" element={<LabProfile />} /> */}
        {/* </Route>  */}

{/* //-------------------------Pharmacy Module---------------------------------------// */}

        <Route path="/reg" element={<PharmacyRegistration />} />
        <Route path="/pharmacies" element={<PharmacyPage />} />
        <Route path="/pharmacies/:id" element={<PharmacyDetailPage cart={cart} setCart={setCart} />} />
        <Route path="/medicines" element={<MedicinePage cart={cart} setCart={setCart} />} />
        <Route path="/medicine/:id" element={<MedicineDetail cart={cart} setCart={setCart} />} />
        <Route path="/booking" element={<MedicineBooking cart={cart} setCart={setCart} />} />
        <Route path="/reg" element={<PharmacyRegistration />} />
        {/* <Route path="/orders" element={<OrderHistory />} /> */}

        <Route path="/pharmacy/dashboard/:pharmacyId" element={<PharmacyDashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="products" element={<ProductsPage />} />
  <Route path="products/add" element={<AddMedicinePage />} />
  <Route path="products/edit/:id" element={<EditMedicinePage />} />
  <Route path="orders" element={<OrdersPage />} />
  <Route path="sales" element={<SalesPage />} />
  <Route path="categories" element={<CategoriesPage />} />
  <Route path="reports" element={<ReportsPage />} />
  <Route path="settings" element={<SettingsPage />} />
  </Route>
  <Route path="/orders" element={<MyOrders />} />

        {/* NEW: Dashboard Routes with Layout */}
        {/* <Route path="/PharmacyDashboard" element={<PharmacyDashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddMedicinePage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} /> */}
          {/* <Route path="features" element={<FeaturesPage />} /> */}
          {/* <Route path="support" element={<SupportPage />} />  */}
          {/* <Route path="customers" element={<CustomersPage />} /> */}
          {/* <Route path="finance" element={<FinancePage />} /> */}
          {/* <Route path="profile" element={<ProfilePage />} /> */}
        {/* </Route> */}

      </Routes>

      {/* {!hideLayout && <Footer />} */}
      {!shouldHideLayout && <Footer />}
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















// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// import { CartProvider } from './contexts/CartContext.jsx'; // ✅ ADD THIS

// import Header from "./components/Header/header";
// import Footer from "./components/footer";
// import Home from "./components/Home/home";
// import MyOrders from './components/UserDashboard/MyOrders.jsx';

// //------------Doctor Module---------------------------------------//
// import DoctorsPage from "./components/Doctors/DoctorsPage";
// import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
// import BookAppointment from './components/Doctors/appointmentBooking';
// import ViewProfile from "./components/Doctors/ViewProfile";
// import DoctorRegistration from "./components/Registration/doctor_registration";
// import AllReviews from './components/Doctors/AllReviews';
// import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
// import UserDashboard from './components/UserDashboard/UserDashboard';

// //---------------------Lab Module----------------------------------//
// import LabsPage from "./components/Lab/lab";
// import LabDetail from "./components/Lab/LabDetail";
// import LoginPage from "./components/Login/LoginPage";
// import TestBooking from "./components/Lab/LabTestBooking";
// import LabRegistration from "./components/Registration/labRegistration";
// import LabUserDashboard from './components/LabDashboards/LabDashboard';

// //---------------------Pharmacy Module----------------------------------//
// import PharmacyPage from "./components/Pharmacy/PharmacyPage";
// import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
// import MedicinePage from "./components/Pharmacy/MedicinePage";
// import MedicineDetail from "./components/Pharmacy/MedicineDetail";
// import MedicineBooking from "./components/Pharmacy/MedicineBooking";
// import PharmacyRegistration from "./components/Registration/PharmacyRegistration";

// // Dashboard Components
// import PharmacyDashboardLayout from './components/Dashboard/PharmacyDashboardLayout.jsx';
// import DashboardHome from './components/Dashboard/DashboardHome.jsx';
// import CategoriesPage from './components/Dashboard/CategoriesPage.jsx';
// import ProductsPage from './components/Dashboard/ProductsPage.jsx';
// import SalesPage from './components/Dashboard/SalesPage.jsx';
// import OrdersPage from './components/Dashboard/OrdersPage.jsx';
// import ReportsPage from './components/Dashboard/ReportsPage.jsx';
// import SettingsPage from './components/Dashboard/SettingsPage.jsx';
// import AddMedicinePage from './components/Dashboard/AddMedicinePage';
// import EditMedicinePage from './components/Dashboard/EditMedicinePage';

// import ScrollToTop from "./ScrollToTop";

// function Layout() {
//   const location = useLocation();
//   // ✅ Cart state is now managed by CartProvider, no need for useState here
  
//   const hideLayoutRoutes = ["/login", "/lab/dashboard/:id", "/PharmacyDashboard", "/DoctorDashboard","/reg","/regis","/registration"];

//   const shouldHideLayout =
//     hideLayoutRoutes.includes(location.pathname) ||
//     location.pathname.startsWith("/lab/dashboard") ||
//     location.pathname.startsWith("/pharmacy/dashboard");

//   return (
//     <>
//       {!shouldHideLayout && <Header />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginPage />} />
        
//         {/* Doctor Module */}
//         <Route path="/doctors" element={<DoctorsPage />} />
//         <Route path="/specialities/:specialityName" element={<SpecialityDoctors />} />
//         <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
//         <Route path="/doctor/:id" element={<ViewProfile />} />
//         <Route path="/registration" element={<DoctorRegistration />} />
//         <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
//         <Route path="/userdashboard" element={<UserDashboard />} />
//         <Route path="/doctor-reviews/:id" element={<AllReviews />} />

//         {/* Lab Module */}
//         <Route path='/lab/dashboard/:id' element={<LabUserDashboard />} />
//         <Route path="/labs" element={<LabsPage />} />
//         <Route path="/labs/:id" element={<LabDetail />} />
//         <Route path="/labs/:id/booking" element={<TestBooking />} />
//         <Route path="/regis" element={<LabRegistration />} />

//         {/* Pharmacy Module - ✅ NO cart prop needed anymore */}
//         <Route path="/reg" element={<PharmacyRegistration />} />
//         <Route path="/pharmacies" element={<PharmacyPage />} />
//         <Route path="/pharmacies/:id" element={<PharmacyDetailPage />} />
//         <Route path="/medicines" element={<MedicinePage />} />
//         <Route path="/medicine/:id" element={<MedicineDetail />} />
//         <Route path="/booking" element={<MedicineBooking />} />

//         {/* Dashboard Routes */}
//         <Route path="/pharmacy/dashboard/:pharmacyId" element={<PharmacyDashboardLayout />}>
//           <Route index element={<DashboardHome />} />
//           <Route path="products" element={<ProductsPage />} />
//           <Route path="products/add" element={<AddMedicinePage />} />
//           <Route path="products/edit/:id" element={<EditMedicinePage />} />
//           <Route path="orders" element={<OrdersPage />} />
//           <Route path="sales" element={<SalesPage />} />
//           <Route path="categories" element={<CategoriesPage />} />
//           <Route path="reports" element={<ReportsPage />} />
//           <Route path="settings" element={<SettingsPage />} />
//         </Route>
        
//         <Route path="/orders" element={<MyOrders />} />
//       </Routes>

//       {!shouldHideLayout && <Footer />}
//     </>
//   );
// }

// const App = () => {
//   return (
//     <Router>
//       <CartProvider>  {/* ✅ WRAP EVERYTHING WITH CartProvider */}
//         <ScrollToTop />
//         <Layout />
//       </CartProvider>
//     </Router>
//   );
// };

// export default App;


























// uper wala biilkul thk hai
// src/App.jsx
// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// // import { CartProvider } from './contexts/CartContext.jsx';
// // import { PharmacyProvider } from './contexts/PharmacyContext.jsx'; 

// import Header from "./components/Header/header";
// import Footer from "./components/footer";
// import Home from "./components/Home/home";
// import MyOrders from './components/UserDashboard/MyOrders.jsx';
// import AboutUs from "./components/AboutUs";

// //------------Doctor Module---------------------------------------//
// import DoctorsPage from "./components/Doctors/DoctorsPage";
// import SpecialityDoctors from "./components/Doctors/SpecialityDoctors";
// import BookAppointment from './components/Doctors/appointmentBooking';
// import ViewProfile from "./components/Doctors/ViewProfile";
// import DoctorRegistration from "./components/Registration/doctor_registration";
// import AllReviews from './components/Doctors/AllReviews';
// import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
// import UserDashboard from './components/UserDashboard/UserDashboard';

// //---------------------Lab Module----------------------------------//
// import LabsPage from "./components/Lab/lab";
// import LabDetail from "./components/Lab/LabDetail";
// import LoginPage from "./components/Login/LoginPage";
// import TestBooking from "./components/Lab/LabTestBooking";
// import LabRegistration from "./components/Registration/labRegistration";
// import LabUserDashboard from './components/LabDashboards/LabDashboard';

// //---------------------Pharmacy Module----------------------------------//
// import PharmacyPage from "./components/Pharmacy/PharmacyPage";
// import PharmacyDetailPage from "./components/Pharmacy/PharmacyDetailPage";
// import MedicinePage from "./components/Pharmacy/MedicinePage";
// import MedicineDetail from "./components/Pharmacy/MedicineDetail";
// import MedicineBooking from "./components/Pharmacy/MedicineBooking";
// import PharmacyRegistration from "./components/Registration/PharmacyRegistration";

// // Dashboard Components
// import PharmacyDashboardLayout from './components/Dashboard/PharmacyDashboardLayout.jsx';
// import DashboardHome from './components/Dashboard/DashboardHome.jsx';
// import CategoriesPage from './components/Dashboard/CategoriesPage.jsx';
// import ProductsPage from './components/Dashboard/ProductsPage.jsx';
// import SalesPage from './components/Dashboard/SalesPage.jsx';
// import OrdersPage from './components/Dashboard/OrdersPage.jsx';
// import ReportsPage from './components/Dashboard/ReportsPage.jsx';
// import SettingsPage from './components/Dashboard/SettingsPage.jsx';
// import AddMedicinePage from './components/Dashboard/AddMedicinePage';
// import EditMedicinePage from './components/Dashboard/EditMedicinePage';
// // import ViewMedicinePage from './components/Dashboard/ViewMedicinePage.jsx';

// import ScrollToTop from "./ScrollToTop";

// function Layout() {
//   const location = useLocation();
  
//   const hideLayoutRoutes = ["/login", "/lab/dashboard/:id", "/PharmacyDashboard", "/DoctorDashboard","/reg","/regis","/registration"];

//   const shouldHideLayout =
//     hideLayoutRoutes.includes(location.pathname) ||
//     location.pathname.startsWith("/lab/dashboard") ||
//     location.pathname.startsWith("/pharmacy/dashboard");

//   return (
//     <>
//       {!shouldHideLayout && <Header />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/about" element={<AboutContactPage />} /> */}
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/login" element={<LoginPage />} />
        
//         {/* Doctor Module */}
//         <Route path="/doctors" element={<DoctorsPage />} />
//         <Route path="/specialities/:specialityName" element={<SpecialityDoctors />} />
//         <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
//         <Route path="/doctor/:id" element={<ViewProfile />} />
//         <Route path="/registration" element={<DoctorRegistration />} />
//         <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
//         <Route path="/userdashboard" element={<UserDashboard />} />
//         <Route path="/doctor-reviews/:id" element={<AllReviews />} />

//         {/* Lab Module */}
//         <Route path='/lab/dashboard/:id' element={<LabUserDashboard />} />
//         <Route path="/labs" element={<LabsPage />} />
//         <Route path="/labs/:id" element={<LabDetail />} />
//         <Route path="/labs/:id/booking" element={<TestBooking />} />
//         <Route path="/regis" element={<LabRegistration />} />

//         {/* Pharmacy Module */}
//         <Route path="/reg" element={<PharmacyRegistration />} />
//         <Route path="/pharmacies" element={<PharmacyPage />} />
//         <Route path="/pharmacies/:id" element={<PharmacyDetailPage />} />
//         <Route path="/medicines" element={<MedicinePage />} />
//         <Route path="/medicine/:id" element={<MedicineDetail />} />
//         <Route path="/booking" element={<MedicineBooking />} />

//         {/* Dashboard Routes - Wrapped with PharmacyProvider */}
//         <Route path="/pharmacy/dashboard/:pharmacyId" element={
//           <PharmacyProvider>
//             <PharmacyDashboardLayout />
//           </PharmacyProvider>
//         }>
//           <Route index element={<DashboardHome />} />
//           <Route path="products" element={<ProductsPage />} />
//           <Route path="products/add" element={<AddMedicinePage />} />
//           <Route path="products/edit/:id" element={<EditMedicinePage />} />
//           <Route path="products/view/:id" element={<ViewMedicinePage />} />
//           <Route path="orders" element={<OrdersPage />} />
//           <Route path="sales" element={<SalesPage />} />
//           <Route path="categories" element={<CategoriesPage />} />
//           <Route path="reports" element={<ReportsPage />} />
//           <Route path="settings" element={<SettingsPage />} />
//         </Route>
        
//         <Route path="/orders" element={<MyOrders />} />
//       </Routes>

//       {!shouldHideLayout && <Footer />}
//     </>
//   );
// }

// const App = () => {
//   return (
//     <Router>
//       {/* <CartProvider> */}
//         <ScrollToTop />
//         <Layout />
//       {/* </CartProvider> */}
//     </Router>
//   );
// };

// export default App;