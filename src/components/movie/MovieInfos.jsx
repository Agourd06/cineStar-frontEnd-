import React, { useEffect, useState } from 'react'

export default function MovieInfos({ MovieId }) {

    const [movie, setMovie] = useState({ data: {} })
    const [error, setError] = useState('')



    async function fetchOneMovie() {
        try {
            const response = await fetch(`http://localhost:3000/api/public/movie/${MovieId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });


            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch movie data');
                return;
            }

            const movieData = await response.json();
            
            setMovie(movieData);
        } catch (error) {
            console.error('Fetch Error:', error);
            setError(error.message || 'An error occurred while fetching movie data');
        }
    }




    useEffect(() => {
        fetchOneMovie()
    }, [MovieId])



    if (error) return <h2>{error}</h2>
    return (
        <div className="bg-dark px-6 py-12 font-sans">


            <div className="lg:max-w-7xl max-w-lg mx-auto px-6 py-8 bg-darker rounded-lg shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-6">
                    <div className="h-auto ">
                        <img src={`http://localhost:3000/images/${movie.data.media}`} alt="Image" className="rounded-md object-cover" />
                    </div>


                    <div className='lg:col-span-3 pl-6'>
                        <h2 className="text-4xl font-extrabold bg-gradient-to-bl from-black to-[#EEBB07] bg-clip-text text-transparent leading-normal">{movie.data.name}</h2>

                        <div className='flex flex-col gap-y-4 text-white'>
                            <p className=" text-sm leading-6">
                                {movie.data.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero sunt excepturi deleniti quos molestiae, modi ea delectus. Minus nesciunt saepe dolor non eligendi, excepturi quis quia ipsum dolores delectus accusamus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, assumenda, est soluta eum odit possimus nostrum facere saepe, fuga officiis doloremque corporis! Rem obcaecati porro officia fugit ullam facere natus.</p>
                            <div className='flex justify-between pr-20'>
                                <h3 className='text-[#EEBB07] '>Duration :</h3>
                                <p>{movie.data.duration} Minutes</p>
                            </div>
                            <div className='flex justify-between pr-20'>
                                <h3 className='text-[#EEBB07]'>Autor :</h3>
                                <p>{movie.data.autor}</p>
                            </div>
                        </div>

                        {/* 
                        <div className="mt-6">
                            <a href="javascript:void(0);" className="text-purple-600 text-sm font-semibold hover:underline">Get Started</a>
                        </div> */}
                    </div>
                    <div className="flex justify-end  pl-5 rounded-lg lg:col-span-2">
                        <iframe className='w-full rounded-lg'
                            src={`https://www.youtube.com/embed/${movie.data.trailer}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
