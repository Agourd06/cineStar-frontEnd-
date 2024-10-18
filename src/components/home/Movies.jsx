import React, { useEffect, useState } from 'react';
import Loader from '../loading/Loader';
import { fetchMovies } from '../fetchers/SessionsFetch';
import { config } from '../../config';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    fetchMovies(setLoading, setError, setMovies);
  }, []);


  if (loading) return <Loader />




  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-[90%] mx-auto min-h-20 grid xl:grid-cols-5 md:grid-cols-3  grid-cols-1 items-end mt-10 gap-x-5 gap-y-20 md:gap-y-20 h-fit pb-5 border border-border p-2 m-2 bg-darker">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <a key={movie._id} href={`/movie/${movie.movie._id}`} className="md:h-[29rem] h-[20rem] text-white xl:mb-4 md:mb-10 ">
            <div
              className="shadow-lg min-h-full group bg-no-repeat md:mb-0 mb-10 bg-cover cursor-pointer rounded-lg"
              style={{ backgroundImage: `url(${config.MinIo_URL}${movie.movie.image})` }} 
            >
             
              <div className="hidden bg-black/50 rounded-lg group-hover:flex flex-col justify-between h-[80%] p-4 lg:px-1 transition duration-500 ease-in-out">
                <div className="text-center">
                  <h1 className="text-lg md:text-3xl font-bold">Summary</h1>
                  <p className="text-xs md:text-sm">{movie.movie.description}</p>
                </div>
              </div>
              <div className="bg-black/50 rounded-lg pt-4 flex justify-evenly items-center shadow-2xl gap-3 px-3 py-1">
                <div className="bg-[#EEBB07] text-black rounded-md font-bold text-sm lg:text-md flex px-2 py-1">
                  cS
                </div>
                <p className="text-sm md:text-md flex items-center gap-1">
                  <i className="bx bx-time"></i> {movie.movie.duration} Minutes
                </p>
              </div>
              <div className="text-center text-md md:text-lg font-semibold bg-black/50 pb-4">
                <p>{movie.movie.name}</p>
              </div>
            </div>
          </a>
        ))
      ) : (
        <><p className=' col-span-5 text-center text-4xl text-text/70'>There is No Movie available yet!</p></>
      )}

    </div>
  );
}
