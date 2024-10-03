import React from 'react'

export default function Reservation({ session, setBackToSession }) {
    return (
        <div>
            <div className="bg-black px-6 py-12 font-sans">
                <div className="lg:max-w-7xl max-w-lg mx-auto px-6 py-8 bg-white/50 rounded-lg shadow-md">
            <button className='text-white text-5xl' onClick={() => setBackToSession(false)}>back</button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        <p>{session.displayTime}</p>
                        <p>sdzfe</p>
                        <p>sdzfe</p>



                    </div>
                </div>
            </div>
        </div>
    )
}
