import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../App';
import Spinner from '../shared/Spinner';


export default function ReservationCard({ movieName, displayTime, seats, roomName, totalPrice, movieImg, reservationId }) {
    const formattedDate = moment(displayTime).format('dddd DD/MM HH:mm');
    const [loading , setLoading] = useState(false)
    const showAlert = useContext(AlertContext)
    const token = localStorage.getItem('token')
    const cancelReservation = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/client/reservation/cancel/${reservationId}`, {
                method: 'PUT',
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
                showAlert("error", "Reservations is not Canceled Try Again")
                return
            }
            showAlert("success", "Reservations Canceled Successfully")

        } catch (error) {
            showAlert("error", "error Canceling reservation")
            console.error("error cancling", error)

        }finally{
            setLoading(false)

        }

    }

    return (
        <>
            <div className='bg-darker border border-border rounded-lg shadow-md text-text/70'>
                <div className='px-6 py-4 grid grid-cols-3 gap-4'>
                    <img src={`http://localhost:3000/images/${movieImg}`} alt="movie" />
                    <div className='col-span-2'>
                        <h1 className='text-3xl font-bold'>{movieName}</h1>
                        <div className='py-1'>
                            <p className='uppercase text-xs font-bold'>Display Time :</p>
                            <p className='text-white/90'>{formattedDate}</p>
                        </div>
                        <div className='py-1'>
                            <p className='uppercase text-xs font-bold'>Seats :</p>
                            <p className='text-white/90'>{seats.join(',')}</p>
                        </div>
                        <div className='py-1 flex justify-between'>
                            <div>
                                <p className='uppercase text-xs font-bold'>Room :</p>
                                <p className='text-white/90'>{roomName}</p>
                            </div>
                            <div className='border border-border p-2 rounded-lg'>
                                <p className='uppercase text-xs font-bold'>Price :</p>
                                <p className='text-white/90'>{totalPrice} DH</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={cancelReservation} disabled={loading} className='w-full bg-red-700/70 rounded-b-lg text-white'>{loading ? <><Spinner  size={4} color='fill-white' /> Canceling ...</> : 'Cancel'}</button>
            </div>

        </>
    );

}
