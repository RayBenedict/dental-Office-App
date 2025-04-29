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
    const [loading, setLoading] = useState(true);


    const getUserAppointments = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/appointments/user/${userData.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAppointments(data.reverse()); 
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setAppointments([]);
            } else {
                toast.error(error.response?.data?.error || error.message);
            }
        } finally {
            setLoading(false);
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
        if (token && userData?.id) {
            getUserAppointments()
        } else if (!token) {
            setLoading(false); 
        }
    }, [token, userData?.id])

    return (
        <div className='my-12 px-4 md:px-12'> 
            <p className='pb-3 font-medium text-zinc-700 border-b'>My appointments</p>
            <div className='mt-4'> 
                {loading ? (
                    <p className='text-center text-zinc-500 mt-8'>Loading appointments...</p>
                ) : appointments.length > 0 ? (
                    appointments.map((item, index) => ( 
                        <div key={index} className='grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] gap-4 items-center py-4 border-b'>
                            <div>
                                <div className='w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl'>
                                    { item.dentist_name.substring(0, 1)}
                                </div>
                            </div>
                            <div className='text-sm text-zinc-600'>
                                <p className='text-neutral-800 font-semibold text-base'>{item.dentist_name}</p> 
                                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {formatDateTime(item.appointment_date)} </p>
                                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Status:</span> <span className={`font-medium ${item.status === 'Cancelled' ? 'text-red-500' : item.status === 'Completed' ? 'text-green-500' : 'text-blue-500'}`}>{item.status || 'Scheduled'}</span></p> {/* Display status */}
                            </div>
                            <div className='flex flex-col gap-2 justify-end items-end'> 
                                {item.status !== 'Cancelled' && item.status !== 'Completed' && (
                                     <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to cancel this appointment?')) {
                                                cancelAppointment(item.id);
                                            }
                                        }}
                                        className='text-xs sm:text-sm text-red-600 sm:min-w-32 py-1 px-3 border border-red-300 rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-zinc-500 mt-8'>You have no appointments scheduled.</p>
                )}
            </div>
        </div>
    )
}

export default MyAppointments