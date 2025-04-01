import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Greeth – Your Trusted Dentist Appointment Platform.</p>
          <p>At Greeth, we make dental care easy, convenient, and stress-free. We understand the challenges of finding the right dentist and managing appointments, so we’ve built a platform that connects you with trusted dental professionals in just a few clicks.</p>
          <b className='text-gray-800'>Our Commitment</b>
          <p>Greeth is dedicated to improving your dental care experience through seamless technology. Whether you're booking your first visit or maintaining regular checkups, we’re here to ensure a smooth and hassle-free process.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>We aim to bridge the gap between patients and dental professionals, making quality oral healthcare accessible anytime, anywhere. Our goal is to provide a seamless experience that prioritizes both efficiency and convenience.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Fast and easy appointment scheduling that fits your busy schedule.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE: </b>
          <p> Access a network of trusted dentists in your area with a few clicks.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p >Get tailored reminders and recommendations to maintain your dental health.</p>
        </div>
      </div>

    </div>
  )
}

export default About
