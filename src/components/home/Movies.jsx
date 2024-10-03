import React, { useEffect, useState } from 'react';


export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/public/sessions')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response is not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[90%] mx-auto grid xl:grid-cols-5 grid-cols-2 items-end mt-10 gap-x-5 gap-y-8 md:gap-y-20 h-fit pb-5">
      {movies.map((movie) => (
        <a key={movie._id}  href={`/movie/${movie.movie._id}`} className="md:h-[29rem] h-[20rem] text-white xl:mb-4 md:mb-10">
          <div
            className="shadow-lg h-[240px] md:h-full group bg-no-repeat bg-cover cursor-pointer"
            style={{ backgroundImage: `url(http://localhost:3000/images/${movie.movie.media})` }}
          >
            <div className="hidden bg-black/50 group-hover:flex flex-col justify-between h-[80%] p-4 lg:px-1 transition duration-500 ease-in-out">
              <div className="text-center">
                <h1 className="text-lg md:text-3xl font-bold">Summary</h1>
                <p className="text-xs md:text-sm">{movie.movie.description}</p>
              </div>
            </div>
            <div className="bg-black/50 pt-4 flex justify-evenly items-center shadow-2xl gap-3 px-3 py-1">
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
      ))}
    </div>
  );
}
