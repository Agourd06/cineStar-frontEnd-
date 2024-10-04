import React, { useEffect, useState } from 'react'
import { logoutUser } from '../../../utils/AuthUtils'

export default function Seats({ totalSeats, sessionId , reservedSeats }) {
    const seats = Array.from({ length: totalSeats }, (_, index) => index + 1);
    const token = localStorage.getItem("token");

    const [reserve, setReserve] = useState([])
    const [error, setError] = useState('');

    const handleSeats = (newSeat) => {
        setReserve((prevReserve) => [...prevReserve, newSeat]);
    };

    const createReservation = async () => {

        try {
            if(!reserve.length){
                setError('Chose at least one seat')
                return
            }

            const response = await fetch(`http://localhost:3000/api/client/reservation/create/${sessionId}`, {
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

    const isReserved = (seatNumber) => reservedSeats.includes(seatNumber)
    
   


    if (error) return <h2 className='text-white'>{error}</h2>

    return (
        <div className='w-4/5 mx-auto px-10 py-4 flex flex-col gap-y-10'>
            <div className='grid grid-cols-11 gap-y-4'>
                {seats.map((seatNumber) => (
                    
                    <button onClick={() => handleSeats(seatNumber)} disabled={isReserved(seatNumber)}
                        key={seatNumber}
                        className={` w-14 h-14 flex flex-col items-center justify-center rounded shadow  transition duration-200 ${isReserved(seatNumber) ? 'bg-red-300 hover:bg-red-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}>
                        <i className='bx bx-chair text-lg text-gray-700'></i>
                        <span className='mt-1 text-sm font-medium text-gray-800'>Seat {seatNumber}</span>
                    </button>
                ))}
            </div>
            <div className=" bg-[#EEBB07] h-12 flex justify-between items-center px-10">
                <div className='flex'>

                <h1 className="text-lg ml-5"> Reserved Seats: </h1>
                <h2 className="text-lg ml-5">{reserve.length > 0 ? reserve.join(' , ') : 'None'} </h2>
                </div>
                <button onClick={createReservation} className='bg-black text-white rounded-md p-2 hover:bg-[#EEBB07] hover:text-black border-black border-solid hover:border duration-500'>Reserve</button>
            </div>

        </div>
    )
}