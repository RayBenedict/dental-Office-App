import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState } from 'react'

const NavBar = () => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);
    
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
        <img className='w-15 cursor-pointer' src={logo} alt=""/>
        <ul className='hidden md:flex item-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
            </NavLink>
            
            <NavLink to='/dentist'>
                <li className='py-1'>ALL DENTIST</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
            </NavLink>
            
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden' />
            </NavLink>
            
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
            </NavLink>
        </ul>
        <div className='flex item-center gap-4'>
            <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-ligh hidden md:block '>Create Account</button>
        </div>
    </div>
  )
}

export default NavBar