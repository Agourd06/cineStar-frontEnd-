import React, { useContext, useState } from 'react';
import { AlertContext } from '../../../App';
import { logoutUser } from '../../../utils/AuthUtils';
import Spinner from '../../shared/Spinner';
import { Link } from 'react-router-dom';

export default function Seats({ seats, sessionId }) {

    const token = localStorage.getItem("token");

    const [reserve, setReserve] = useState([])
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSeats = (newSeat) => {
        if (isUserReserved(newSeat)) {
            setReserve(reserve.filter((reservedSeat) => { return reservedSeat !== newSeat }))
        } else {

            setReserve((prevReserve) => [...prevReserve, newSeat]);
        }
    };

    const showAlert = useContext(AlertContext)

    const isUserReserved = (seatNumber) => {
        return reserve.includes(seatNumber)
    }

    const createReservation = async () => {

        setLoading(true)    
        try {
            if (!reserve.length) {
                showAlert("warnning", "Chose at least one seat")

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
                showAlert("error", "Session Expired Please You need to login again")
                logoutUser();
                return;
            }
            if (!response.ok) {
                showAlert("error", "Reservation Failed Try Again")
                return
            }

            showAlert("success", "resevation Created")
            setSuccess(true)
        } catch (error) {
            showAlert("error", "Problem in Creation Of Resarvation")

            console.error('resevation error', error)

        } finally {
            setLoading(false)
        }


    }



    if (success) return <div className='text-white my-5 flex-col flex gap-y-4'>
        <i className={`bx bx-check-circle  text-9xl`}></i>
        <p>Your reservation has been successfully created ! Check your E-mail for more information</p>
        <a href="/reservations" className='underline'>See all your reservations</a>
    </div>

    return (
        <div className='py-4 '>
            <div className='grid grid-cols-12 gap-4 pb-5'>
                {seats.map(({ number, isReserved }) => (

                    <button onClick={() => handleSeats(number)} disabled={isReserved}
                        key={number}
                        className={`  w-full h-14 flex flex-col items-center justify-center rounded shadow  transition duration-200 ${isReserved ? 'bg-red-300 hover:bg-red-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'} ${isUserReserved(number) && 'bg-green-300 hover:bg-green-400'}`}>
                        <i className='bx bx-chair text-lg text-gray-700'></i>
                        <span className='mt-1 text-sm font-medium text-gray-800'>Seat {number}</span>
                    </button>
                ))}
            </div>
            <div className=" bg-darker border border-border text-text h-12 flex justify-between rounded-lg items-center px-6 py-8">
                <div className='flex'>

                    <h1 className="text-lg "> Reserved Seats: </h1>
                    <h2 className="text-lg ml-5">{reserve.length > 0 ? reserve.join(' , ') : 'None'} </h2>
                </div>
                <button onClick={createReservation} disabled={loading} className='bg-dark border-border border text-white rounded-md py-2 px-4 flex items-center hover:bg-[#EEBB07] hover:text-black  border-solid hover:border duration-500'>{loading ? <><Spinner className="mr-2" size={4} /> Resereving ...</> : 'Reserve'}</button>
            </div>

        </div>
    )
}