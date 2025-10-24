// import { useState } from 'react'
// import './App.css'
// import Header from "./components/header.jsx";
// import Home from "./components/home.jsx";
// import Footer from './components/footer';
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div className="App">
//       <Header />
//       <Home />
//       {/* <HeroSection/> */}
//       <Footer />

//     </div>
//     </>
//   )
// }

// export default App





// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/header";
// import Home from "./components/home";
// import DoctorsPage from "./components/DoctorsPage";
// import LoginPage from "./components/LoginPage";

// export default function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<DoctorsPage />} />
//         <Route path="/login" element={<LoginPage/>}/>
//       </Routes>
//     </Router>
//   );
// }

// import React from 'react';
// import MedicinesPage from './components/MedicinesPage';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <MedicinesPage />
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import DoctorsPage from "./components/DoctorsPage";
import LoginPage from "./components/LoginPage";

function AppContent() {
  const location = useLocation();

  // Define routes where the header should NOT appear
  const hideHeaderRoutes = ["/login"];

  // Check if header should be shown
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {showHeader && <Header />}
      <div style={{ marginTop: showHeader ? "0" : "0", padding: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
