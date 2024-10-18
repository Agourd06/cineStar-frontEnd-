import React, { useContext } from 'react';
import MovieContext from '../../context/MovieContext';
import { config } from '../../config';
import FavoritButton from './favorit/FavoritButton';
import RatingPopUp from './rating/RatingPopUp';

export default function MovieInfos() {
    const { movie, loading } = useContext(MovieContext);

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="bg-dark px-6 py-12 font-Didot">
            <div className=" xl:max-w-7xl lg:max-w-5xl max-w-lg md:max-w-3xl mx-auto  pt -8 bg-darker rounded-lg shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-6 px-6 py-4">
                    <div className="h-auto">
                        <img
                            src={`${config.MinIo_URL}${movie.data.image}`}
                            alt="Image"
                            className="rounded-md object-cover"
                        />
                    </div>

                    <div className='lg:col-span-3 pl-6'>
                        <h2 className="text-4xl font-extrabold bg-gradient-to-bl from-black to-[#EEBB07] bg-clip-text text-transparent leading-normal">
                            {movie.data.name}
                        </h2>

                        <div className='flex flex-col gap-y-4 text-white'>
                            <p className="text-sm leading-6">
                                {movie.data.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero sunt excepturi deleniti quos molestiae, modi ea delectus. Minus nesciunt saepe dolor non eligendi, excepturi quis quia ipsum dolores delectus accusamus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, assumenda, est soluta eum odit possimus nostrum facere saepe, fuga officiis doloremque corporis! Rem obcaecati porro officia fugit ullam facere natus.
                            </p>
                            <div className='flex justify-between pr-20'>
                                <h3 className='text-[#EEBB07]'>Duration:</h3>
                                <p>{movie.data.duration} Minutes</p>
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-end pl-5 rounded-lg lg:col-span-2">
                        <iframe className='w-full rounded-lg'
                            src={`https://www.youtube.com/embed/${movie.data.trailer}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className='border border-border flex justify-between py-2 px-7 rounded-lg items-center'>
                    <FavoritButton movie={movie.data._id}/>
                    {/* <div><p className='hover:text-[#EEBB07] text-white duration-500 cursor-pointer font-bold'>Review</p></div> */}
                    <RatingPopUp movieId={movie.data._id}/>
                </div>
            </div>
        </div>
    );
}
