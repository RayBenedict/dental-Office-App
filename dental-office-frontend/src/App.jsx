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


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
    <NavBar />
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dentist' element={<Dentist />} />
        <Route path='/dentist:speciality' element={<Dentist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointment' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
     </Routes>
    </div>
  )
}

export default App