import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₱'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dentists, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

 

    // Getting Doctors using API
    const getDoctosData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/dentists');
            const { data } = response;
    
            if (response.status === 200) {
                setDoctors(data);
            } else {
                toast.error(data.message || 'Failed to fetch dentists');
            }
        } catch (error) {
            if (error.response) {
                toast.error(`Error ${error.response.status}: ${error.response.data.message}`);
            } else {
                toast.error(error.message);
            }
        }
    };

    const loadUserProfileData = async () => {
        try {
            const response = await axios.post(
                backendUrl + '/api/users/getById', // Use POST method
                {}, // Empty body since no data is required
                {
                    headers: {
                        'Content-Type': 'application/json', // Explicitly set Content-Type
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }
            );
    
            const { data } = response; // Extract data from the response

    
            if (response.status === 200) {
                setUserData(data.user); // Assuming the user data is in `data.user`
            } else {
                toast.error(data.message || 'Failed to load user profile');
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
            if (error.response) {
                toast.error(`Error ${error.response.status}: ${error.response.data.message}`);
            } else {
                toast.error(error.message);
            }
        }
    };

 
   

    useEffect(() => {
        getDoctosData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        dentists,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider