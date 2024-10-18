import React, { createContext, useContext, useEffect, useState } from 'react'
import Loader from '../components/loading/Loader'
import { AlertContext } from '../App'
import ReservationsList from '../components/reservations/ReservationsList'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
export const Canceling = createContext()

export default function Reservation() {
    const [loading, setLoading] = useState(false)
    const [reservations, setReservations] = useState([])
    const [isCancled, setIsCancled] = useState(false)
    const token = localStorage.getItem('token');

    const showAlert = useContext(AlertContext)
    const { isAuthenticated, logout } = useContext(AuthContext)
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
                showAlert("info", "Session Expired Please You need to login again")
                logout();
                return;
            }
            if (!response.ok) {
                showAlert("error", "Reservations Not Fetched Try Again")
                return
            }
            const data = await response.json()
            setReservations(data.reservations)
        } catch (error) {
            showAlert("error", "resevation fetching error")
            console.error('resevation error', error)

        } finally {
            setLoading(false)
        }

    }
    console.log(reservations);

    useEffect(() => {

        showRsetvations()

    }, [isCancled])


    return (
        <Canceling.Provider value={setIsCancled}>
            <Navbar />

            <div className='lg:mt-[5rem]'>
                <div className='bg-dark min-h-screen '>

                    <div className='max-w-[95%] lg:max-w-[85%]  mx-auto h-full  pt-10 pb-5'>

                        {loading ? <Loader /> : <ReservationsList reservations={reservations} />}



                    </div>
                </div>
            </div>
            <Footer/>
        </Canceling.Provider>
    )
}
