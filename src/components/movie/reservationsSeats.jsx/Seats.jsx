import React, { useEffect, useState } from 'react'
import { logoutUser } from '../../../utils/AuthUtils'

export default function Seats({ totalSeats, sessionId }) {
    const seats = Array.from({ length: totalSeats }, (_, index) => index + 1);
    const token = localStorage.getItem("token");

    const [reserve, setReserve] = useState([])
    const [error, setError] = useState('');

    const handleSeats = (newSeat) => {
        setReserve((prevReserve) => [...prevReserve, newSeat]);
    };

    const createReservation = async () => {

        try {
            const response = await fetch(`/reservation/create/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    seat: reserve,
                })
            });

            if (response.status === 401) {
                setError('Session Expired Please You need to login again')
                logoutUser();
                return;
            }
            if (!response.ok) {
                throw new Error('Reservation Creation failed')
            }
            const data = await response.json()
            console.log(data);
        } catch (error) {
            setError('problem in creation of reservation')
            console.error('resevation error', error)
        }


    }
    useEffect(()=>{
        if (reserve.length > 0) { 
            createReservation();
        }
    },[sessionId , reserve])

    if (error) return <h2>{error}</h2>

    return (
        <div className='w-4/5 mx-auto px-10 py-4 flex flex-col gap-y-10'>
            <div className='grid grid-cols-11 gap-y-4'>
                {seats.map((seatNumber) => (
                    <button onClick={() => handleSeats(seatNumber)}
                        key={seatNumber}
                        className='bg-gray-300 w-14 h-14 flex flex-col items-center justify-center rounded shadow hover:bg-gray-400 transition duration-200'>
                        <i className='bx bx-chair text-lg text-gray-700'></i>
                        <span className='mt-1 text-sm font-medium text-gray-800'>Seat {seatNumber}</span>
                    </button>
                ))}
            </div>
            <div className=" bg-[#EEBB07] h-12 flex justify-start items-center">
                <h1 className="text-lg ml-5"> Reserved Seats: </h1>
                <h2 className="text-lg ml-5">{reserve.length > 0 ? reserve.join(' , ') : 'None'} </h2>
            </div>

        </div>
    )
}