import React, { createContext, useContext, useEffect, useState } from 'react'
import Loader from '../components/loading/Loader'
import { AlertContext } from '../App'
import ReservationsList from '../components/reservations/ReservationsList'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
export const Canceling = createContext()

export default function Reservation() {
    const [loading, setLoading] = useState(false)
    const [reservations, setReservations] = useState([])
    const [isCancled, setIsCancled] = useState(false)
    const token = localStorage.getItem('token');

    const showAlert = useContext(AlertContext)
    const { isAuthenticated, logout  } = useContext(AuthContext)
    const navigate = useNavigate()
    const showRsetvations = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/client/reservations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 401) {
                showAlert("error", "Session Expired Please You need to login again")
                logout();
                return;
            }
            if (!response.ok) {
                showAlert("error", "Reservations Not Fetched Try Again")
                return
            }
            const data = await response.json()
            console.log(data.reservations);
            setReservations(data.reservations)
        } catch (error) {
            showAlert("error", "resevation fetching error")
            console.error('resevation error', error)
            
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        
        showRsetvations()
        
    }, [isCancled])
    
    if (!isAuthenticated) return navigate('/auth/login')

    return (
        <Canceling.Provider value={setIsCancled}>
            <div className='bg-dark min-h-screen '>

                <div className='lg:max-w-7xl max-w-lg mx-auto h-full  pt-10 pb-5'>

                    {loading ? <Loader /> : <ReservationsList reservations={reservations} />}



                </div>
            </div>
        </Canceling.Provider>
    )
}
