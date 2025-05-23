import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dentist from './pages/Dentist'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
    <ToastContainer />
    <NavBar />
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dentists' element={<Dentist />} />
        <Route path='/dentists/:speciality' element={<Dentist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
     </Routes>
     <Footer />
    </div>
  )
}

export default App