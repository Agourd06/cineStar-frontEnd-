import React from 'react'

export default function Menu() {
    const isHomePage = location.pathname === '/';

    return (
        <div className={` ${isHomePage ? 'lg:ml-auto' : '' } `}>
            <ul className='lg:flex gap-x-10 font-semibold uppercase'>
                <li className='text-2xl hover:text-[#EEBB07] text-white/60 duration-500 '><a href="/">Home</a></li>
                <li className='text-2xl hover:text-[#EEBB07] text-white/60 duration-500 '><a href="/reservations">My Resevations</a></li>
                <li className='text-2xl hover:text-[#EEBB07] text-white/60 duration-500 '><a href="javaScripit:void(0)">Contact</a></li>

            </ul>
        </div>
        )
}
