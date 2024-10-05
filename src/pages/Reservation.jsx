import React, { useState } from 'react'
import ReservationCards from '../components/reservations/ReservationCards'
import Loader from '../components/loading/Loader'

export default function Reservation() {
    const [loading, setLoading] = useState(false)



    return (

        <div className='bg-dark min-h-screen '>
            <div className='lg:max-w-7xl max-w-lg mx-auto h-full  pt-10 pb-5'>
                {loading ? <Loader /> : <div className='grid grid-cols-3 gap-5'>
                    <ReservationCards />
                    <ReservationCards />
                    <ReservationCards />
                    <ReservationCards />
                </div>}



            </div>
        </div>
    )
}
