import React from 'react';
import Search from './Search';
import Menu from './Menu';

export default function Navbar() {
    return (
        <div>
            <nav className='hidden fixed top-0 w-full bg-gradient-to-r from-black lg:to-black/25 md:to-black/40 to-black/60 lg:flex md:justify-between flex-wrap  items-center px-11 py-5 font-sans shadow-lg shadow-black/30 z-50 gap-y-4 lg:gap-y-0'>
                <img className='w-12 h-12' src="/WhatsApp Image 2024-03-15 at 12.02.25.jpeg" alt="Logo" />
                <Menu />
                <Search />
            </nav>
        </div>
    );
}
