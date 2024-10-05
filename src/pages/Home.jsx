import React from 'react'
import Navbar from '../components/navbar/navbar';
import Movies from '../components/home/Movies';
import Carousel from '../components/home/Carousel';

export default function Home() {


  return (
    <div >
      <div className='min-h-screen  bg-dark'>
        <div className=' min-h-screen'>
          <div className='min-h-[40rem] w-full rounded-lg'>
            <Carousel />
          </div>

          <div className='w-[90%] mx-auto pb-2'>

            <h1 className='text-white/60 text-4xl text-center font-extrabold'>In ROOMS</h1>
          </div>
          <Movies />

        </div>
      </div>
    </div>

  )
}
