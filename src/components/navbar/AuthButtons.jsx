import React, { useEffect, useState } from 'react';

export default function AuthButtons() {
    const token = localStorage.getItem('token');
    const [isLoged, setIsLoged] = useState(false);
    const [toggle, setToggle] = useState(false);

    const handleConnection = () => {
        setIsLoged(!!token); // Set isLoged based on the presence of the token
    };

    const handleToggle = () => {
        setToggle((prev) => !prev); 
    };

    useEffect(() => {
        handleConnection(); 
    }, [token]);

    useEffect(() => {
        setToggle(false); 
    }, []);

    return (
        <div className='flex justify-center items-center pl-6 relative'>
            <button onClick={handleToggle} className='text-white'>
                <i className='bx bxs-user-circle text-4xl'></i>
            </button>
            <div className={`absolute transition-transform  ease-in-out -bottom-[2.2rem] z-50 py-2 ${toggle ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} duration-500 -left-16 text-white border border-border rounded-lg bg-darker shadow-sm shadow-white/40`}>
                {!isLoged ? (
                    <>
                        <a href='/auth/login' className='py-1 px-10 w-full '>Login</a>
                    </>
                ) : (
                    <a href='/auth/login' className='py-1 px-8 w-full '>Log Out</a>
                )}
            </div>
        </div>
    );
}
