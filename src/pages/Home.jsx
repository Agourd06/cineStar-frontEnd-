import React from 'react'
import Navbar from '../components/navbar/navbar';
import Movies from '../components/home/Movies';
import Carousel from '../components/home/Carousel';

export default function Home() {


  return (
    <div >
      <Navbar />
      <div className='min-h-screen bg-black/90 '>
        <div className=' min-h-screen'>
          <div className='min-h-[40rem] w-full rounded-lg'>
            <Carousel />
            {/* <img className='w-full h-full' src="/john-wick-2-guns.jpg" alt="" /> */}
          </div>

          <div className='w-[90%] mx-auto pb-2 pt-8'>

            <h1 className='text-white/60 text-4xl text-center font-extrabold'>In ROOMS</h1>
          </div>
          <Movies />

        </div>
      </div>
    </div>

  )
}
