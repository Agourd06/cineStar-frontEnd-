import React from 'react'
import Navbar from '../components/navbar/navbar'
import { useParams } from 'react-router-dom'
import MovieInfos from '../components/movie/MovieInfos'

export default function Movie() {
   const {id} = useParams()
  return (
    <div>
        <Navbar/>
        <MovieInfos MovieId={id} />
    </div>
  )
}
