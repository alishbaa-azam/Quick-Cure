import { useState } from 'react'
import './App.css'
import Header from "./components/header.jsx";
import Home from "./components/home.jsx";
import Footer from './components/footer';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
      <Header />
      <Home />
      {/* <HeroSection/> */}
      <Footer />

    </div>
    </>
  )
}

export default App





