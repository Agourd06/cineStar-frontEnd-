import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';

export default function FooterMenu() {
    const { isAuthenticated, logout } = useContext(AuthContext); 

    return (
        <div className="flex flex-wrap items-center sm:justify-between max-sm:flex-col gap-6 md:px-10">
            <div>
                <a href='/'><img src="/logo.png" alt="logo" className='w-16' /></a>
            </div>

            <ul className="flex items-center justify-center flex-wrap gap-y-2 md:justify-end space-x-6">
                <li><a href="/" className="text-gray-300 hover:underline text-base">Home</a></li>
                <li><a href="/reservations" className="text-gray-300 hover:underline text-base">Reservations</a></li>
                {isAuthenticated ? <li className='text-gray-300 hover:underline text-base cursor-pointer'><a onClick={()=> logout()}>logout</a></li> : <li className='text-gray-300 hover:underline text-base cursor-pointer '><a href="/auth/login">Login</a></li>}
            </ul>
        </div>)
}
