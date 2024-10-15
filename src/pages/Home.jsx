import React, { useContext } from 'react'
import Movies from '../components/home/Movies';
import Carousel from '../components/home/Carousel';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

export default function Home() {


  return (
    <>
      <Navbar />

      <div className='lg:mt-[5rem]'>
        <div className='min-h-screen  bg-dark md:pb-14 pb-28 '>

          <div className=' min-h-screen'>
            <div className='min-h-[40rem] w-full rounded-lg md:px-10 py-4 border border-border overflow-hidden'>
              <Carousel />
            </div>

            <div className='w-[90%] mx-auto pb-2 pt-10'>
              <div>
                <h1 className='text-text md:text-6xl text-2xl font-extrabold'>Now Showing   </h1>
                <span className='text-text text-lg'> In Your Cinema | <span className='text-[#EEBB07]'>CineStar</span> </span>
              </div>

            </div>
            <Movies />

          </div>
        </div>

      </div>
      <Footer/>
    </>
  )
}
