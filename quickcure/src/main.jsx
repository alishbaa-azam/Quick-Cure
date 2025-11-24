import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import App from "./components/Lab/lab.jsx"
// import App from "./components/header.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <DoctorRegistration/> */}
    {/* <MedicinesPage/> */}
  </StrictMode>,
)
