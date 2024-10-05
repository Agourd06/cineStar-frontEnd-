import React from 'react'

export default function ReservationCards() {



    return (
        <div className=' bg-darker border border-border rounded-lg shadow-md text-text/70'>
            <div className='px-6 py-4 grid grid-cols-3 gap-4'>
                <img src="/WhatIf.png" alt="movie" />
                <div className='col-span-2'>
                    <h1 className='text-3xl font-bold'>What If ...?</h1>
                    <div className='  py-1 '>
                        <p className='uppercase text-xs font-bold'>Display Time :</p>
                        <p className='text-white/90'> Thursday 23/01 at 12:30</p>

                    </div>
                    <div className='  py-1 '>
                        <p className='uppercase text-xs font-bold'>Seats :</p>
                        <p className='text-white/90'> 15 , 25</p>

                    </div>
                    <div className='  py-1  flex justify-between'>
                        <div>
                        <p className='uppercase text-xs font-bold'>Room :</p>
                        <p className='text-white/90'> AQua Room</p>
                        </div>
                        <div className='border border-border p-2 rounded-lg'>
                        <p className='uppercase text-xs font-bold'>Price :</p>
                        <p className='text-white/90'> 800 DH</p>
                        </div>
                       

                    </div>
                  
                   
                    
                </div>

            </div>
            <button className='w-full bg-red-700/70 rounded-b-lg text-white'>Cancel</button>
        </div>
    )
}
