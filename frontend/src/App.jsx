import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from "./pages/BuyCredit"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const {showLogin} = useContext(AppContext);

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-gray-300 to-white'>
      <ToastContainer position='bottom-right' />
      <Navbar />
      {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-credit" element={<BuyCredit />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
