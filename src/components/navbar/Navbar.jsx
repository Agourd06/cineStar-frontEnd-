import React, { useState } from 'react';
import Search from './Search';
import Menu from './Menu';
import AuthButtons from './AuthButtons';

export default function Navbar() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarVisible(prevState => !prevState);
    };
    const isHomePage = location.pathname === '/';

    return (
        <div className='font-Didot'>
            <button
                className={`lg:hidden transition-all duration-500 ease-in-out transform  py-2  flex justify-between items-center px-10 text-white bg-black  w-full ${isNavbarVisible ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}
                onClick={toggleNavbar}
            >
               <a href="/"><img className='w-7 h-7' src="/logo.png" alt="Logo" /></a> 
                <i className='bx bx-menu text-3xl'></i>
            </button>
            <nav
                className={`fixed top-0 w-full bg-darker border-b border-border
                transition-all duration-500 ease-in-out transform ${
                    isNavbarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                } lg:opacity-100 lg:translate-y-0 lg:flex
                md:justify-between flex-wrap items-center px-11 py-5 font-Didot shadow-lg shadow-black/30 z-40 gap-y-4 lg:gap-y-0`}>
                    
                <div className='flex justify-between lg:block'>
                   <a href="/"> <img className='w-12 h-12' src="/logo.png" alt="Logo" /></a>
                    <button
                        className="lg:hidden text-white rounded"
                        onClick={toggleNavbar}
                    >
                        <i className='bx bx-x text-3xl text-white hover:text-[#EEBB07] duration-500'></i>
                    </button>
                </div>
                <Menu />
                {isHomePage && <Search />}
                <AuthButtons/>
            </nav>
        </div>
    );
}
