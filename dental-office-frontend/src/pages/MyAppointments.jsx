import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {


    const { backendUrl, token, userData } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])


    const getUserAppointments = async () => {
        try {
            // Assuming userId is available in the userData context
            const { data } = await axios.get(`${backendUrl}/api/appointments/user/${userData.id}`, {
                headers: { Authorization: `Bearer ${token}` }, // Use Authorization header for token
            });

            setAppointments(data.reverse()); // Reverse the appointments if needed
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error || error.message);
        }
    };

    
    const cancelAppointment = async (appointmentId) => {
        try {
            // Make the DELETE request
            const response = await axios.delete(`${backendUrl}/api/appointments/${appointmentId}`, {
                headers: { Authorization: `Bearer ${token}` }, // Use Authorization header for token
            });
    
            // Extract the data from the response
            const { data } = response;
            // Check the response status and handle accordingly
            if (response.status === 200) {
                toast.success(data.message);
                getUserAppointments();
                window.location.reload();
                 // Refresh the appointments list
              
            } else {
                toast.error(data.message || 'Failed to cancel appointment');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || error.message);
        }
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
    
        // Format the date as "DD/MM/YYYY"
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    
        // Format the time as "HH:MM AM/PM"
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    
        return `${formattedDate} at ${formattedTime}`;
    };

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
            <div className=''>
                {appointments.slice(0, 2).map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
                        <div>
                            <img className='w-32 bg-indigo-50' src={item.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral-800 font-semibold'>{item.dentist_name}</p>
                            <p>{item.speciality}</p>
                            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {formatDateTime(item.appointment_date)} </p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end'>
                            {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item.id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments