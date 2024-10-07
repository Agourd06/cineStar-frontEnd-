import React, { useContext, useEffect, useState } from 'react'
import ReservationCard from '../components/reservations/ReservationCard'
import Loader from '../components/loading/Loader'
import { userId } from '../utils/userId'
import { logoutUser } from '../utils/AuthUtils'
import { AlertContext } from '../App'
import ReservationsList from '../components/reservations/ReservationsList'

export default function Reservation() {
    const [loading, setLoading] = useState(false)
    const [reservations, setReservations] = useState([])
    const token = localStorage.getItem('token')

    const showAlert = useContext(AlertContext)

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
                logoutUser();
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
        
    }, [])


    return (

        <div className='bg-dark min-h-screen '>

            <div className='lg:max-w-7xl max-w-lg mx-auto h-full  pt-10 pb-5'>
                
                {loading ? <Loader /> : <ReservationsList reservations={reservations} />}



            </div>
        </div>
    )
}
