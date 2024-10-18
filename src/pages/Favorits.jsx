import React, { createContext, useContext, useEffect, useState } from 'react'
import Loader from '../components/loading/Loader'
import { AlertContext } from '../App'
import ReservationsList from '../components/reservations/ReservationsList'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import FavoritMovies from '../components/movie/favorit/FavoritMovie'
import { fetchData } from '../components/fetchers/Fetch'

export default function Favorits() {
    const [loading, setLoading] = useState(false)
    const [favorits, setFavorits] = useState([])
    const token = localStorage.getItem('token');
    const Alert = useContext(AlertContext)
    const { isAuthenticated, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const FavoritMovie = async () => {
        setLoading(true)
        try {
            const response = await fetchData(`client/favorites`, 'GET', token);
            console.log("response" , response);
            
            setFavorits(response.data)
            // if (response.data.length === 0) {
            //     setHasMoreMovies(false);
            // } else {
            //     setMovies((prevUsers) => [...prevUsers, ...response.data]);
            // }

        } catch (error) {
            Alert('error', error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {

        FavoritMovie()

    }, [token])


    return (
        <>
            <Navbar />
            <div className='lg:mt-[5rem]'>
                <div className='bg-dark min-h-screen '>

                    <div className=' mx-auto h-full  pt-10 pb-5'>
                        <FavoritMovies favorits={favorits} loading={loading} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
