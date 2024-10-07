import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function AuthButtons() {
    const [toggle, setToggle] = useState(false);
    const { isAuthenticated, logout } = useContext(AuthContext); 

    const handleToggle = () => {
        setToggle((prev) => !prev); 
    };

    useEffect(() => {
        setToggle(false); 
    }, []);

    return (
        <div className='flex justify-center items-center pl-6 relative'>
            <button onClick={handleToggle} className='text-white'>
                <i className='bx bxs-user-circle text-4xl'></i>
            </button>
            <div className={`absolute transition-transform ease-in-out -bottom-[2.2rem] z-50 py-2 ${toggle ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} duration-500 -left-16 text-white border border-border rounded-lg bg-darker shadow-sm shadow-white/40`}>
                {!isAuthenticated ? (
                    <a href='/auth/login' className='py-1 px-10 w-full '>Login</a>
                ) : (
                    <button
                        onClick={() => {
                            logout(); 
                        }}
                        className='py-1 px-8 w-full'
                    >
                        Log Out
                    </button>
                )}
            </div>
        </div>
    );
}
