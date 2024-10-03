import React from 'react'
import Navbar from '../components/navbar/navbar'
import { useParams } from 'react-router-dom'
import MovieInfos from '../components/movie/MovieInfos'
import SessionsInfo from '../components/movie/SessionsInfo'

export default function Movie() {
   const {id} = useParams()
  return (
    <div className='bg-black/90 min-h-screen '>
        <Navbar/>
        <div className='lg:mt-[5rem]'>

        <MovieInfos MovieId={id} />
     <SessionsInfo MovieId={id}/>
        </div>
    </div>
  )
}
