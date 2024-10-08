import React from 'react'

export default function Menu() {
    const isHomePage = location.pathname === '/';
    const isReservationsPage = location.pathname === '/reservations';

    return (
        <div className={` ${isHomePage ? 'w-1/4 lg:ml-auto' : '' } `}>
            <ul className='lg:flex gap-x-10 font-semibold uppercase'>
                <li className={`text-2xl  ${isHomePage ? 'text-[#EEBB07] hover:text-white/40' : 'hover:text-[#EEBB07]/80 text-white/60'} duration-500 `}><a href="/">Home</a></li>
                <li className={`text-2xl  ${isReservationsPage ? 'text-[#EEBB07] hover:text-white/40' : 'hover:text-[#EEBB07]/80 text-white/60'} duration-500 `}><a href="/reservations">Resevations</a></li>

            </ul>
        </div>
        )
}
