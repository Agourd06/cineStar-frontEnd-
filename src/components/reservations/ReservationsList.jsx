import React from 'react'
import ReservationCard from './ReservationCard'

export default function ReservationsList({ reservations }) {

    return (

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {reservations.length > 0 ? <>  {reservations.map((reservation) => (

                <ReservationCard key={reservation._id} movieName={reservation.session.movie.name} displayTime={reservation.session.displayTime} seats={reservation.seat} roomName={reservation.session.room.name} totalPrice={reservation.totalPrice} movieImg={reservation.session.movie.image} reservationId={reservation._id} status={reservation.status} />
            ))

            }</> : <><p className=' col-span-3 text-center text-4xl text-text/70'>You Have No reservation yet!</p></>}


        </div>

    )
}
