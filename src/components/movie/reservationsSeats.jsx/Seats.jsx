import React, { useContext, useState } from 'react';
import { AlertContext } from '../../../App';
import Spinner from '../../shared/Spinner';
import AuthContext from '../../../context/AuthContext';

export default function Seats({ seats, sessionId }) {
    const token = localStorage.getItem("token");

    const [reserve, setReserve] = useState([]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { logout } = useContext(AuthContext);
    const showAlert = useContext(AlertContext);

    const handleSeats = (newSeat) => {
        if (isUserReserved(newSeat)) {
            setReserve(reserve.filter((reservedSeat) => reservedSeat !== newSeat));
        } else {
            setReserve((prevReserve) => [...prevReserve, newSeat]);
        }
    };

    const isUserReserved = (seatNumber) => {
        return reserve.includes(seatNumber);
    };

    const createReservation = async () => {
        setLoading(true);
        try {
            if (!reserve.length) {
                showAlert("warning", "Choose at least one seat");
                return;
            }

            const response = await fetch(`http://localhost:3000/api/client/reservation/create/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ seat: reserve })
            });

            if (response.status === 401) {
                showAlert("error", "Session Expired. Please log in again.");
                // logout();
                return;
            }
            if (!response.ok) {
                showAlert("error", "Reservation Failed. Try Again");
                return;
            }

            showAlert("success", "Reservation Created");
            setSuccess(true);
        } catch (error) {
            showAlert("error", "Problem in Creation Of Reservation");
            console.error('Reservation error', error);
        } finally {
            setLoading(false);
        }
    };

    if (success) return (
        <div className='text-white my-5 flex-col flex gap-y-4'>
            <i className={`bx bx-check-circle text-9xl`}></i>
            <p>Your reservation has been successfully created! Check your email for more information.</p>
            <a href="/reservations" className='underline'>See all your reservations</a>
        </div>
    );

    return (
        <div className='py-4'>
            <div className='grid lg:grid-cols-12 grid-cols-5 gap-4 pb-5'>
                {seats.map(({ number, isReserved }) => (
                    <button
                        onClick={() => handleSeats(number)}
                        disabled={isReserved}
                        key={number}
                        className={`relative w-full h-16 flex flex-col items-center justify-center rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl 
                        ${isReserved ? 'bg-red-800 hover:cursor-not-allowed' :
                                (isUserReserved(number) ? 'bg-green-700' :
                                    'bg-darker/50 hover:bg-darker hover:cursor-pointer')}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon cinema-chair-icon"
                            width="48"
                            height="48"
                        >
                            <rect x="6" y="8" width="12" height="12" rx="3" ry="3" fill="#C62828" stroke="#B71C1C" />
                            <rect x="5" y="6" width="14" height="2" fill="#B71C1C" />
                            <rect x="4" y="20" width="16" height="2" fill="#B71C1C" />
                            <path d="M8 18v2M16 18v2" stroke="#B71C1C" />
                            <path d="M2 8h20" stroke="#B71C1C" />
                            <path d="M8 8v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#B71C1C" />
                        </svg>

                        <span className="absolute top-2 right-2 mt-1 text-sm font-extrabold text-text/70">
                            {number}
                        </span>
                    </button>
                ))}
            </div>
            <div className="bg-darker border border-border text-text min-h-12 flex justify-between rounded-lg items-center px-6 py-8">
                <div className='flex'>
                    <h1 className="text-lg">Reserved Seats:</h1>
                    <h2 className="text-lg ml-5">{reserve.length > 0 ? reserve.join(' , ') : 'None'}</h2>
                </div>
                <button onClick={createReservation} disabled={loading} className='bg-dark border-border border text-white rounded-md py-2 px-4 flex items-center hover:bg-[#EEBB07] hover:text-black border-solid hover:border duration-500'>
                    {loading ? <><Spinner className="mr-2" size={4} /> Reserving...</> : 'Reserve'}
                </button>
            </div>
        </div>
    );
}
