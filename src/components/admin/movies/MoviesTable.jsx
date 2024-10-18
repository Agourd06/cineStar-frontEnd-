import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../App'
import { fetchData } from '../../fetchers/Fetch'
import AuthContext from '../../../context/AuthContext'
import { config } from '../../../config'

export default function MoviesTable({
    setUpdating,
    setUpdateData,
    movies,
    handleShowMore,
    setMovies,
    loading,
    hasMoreMovies
}) {

    const Alert = useContext(AlertContext)
    const { token } = useContext(AuthContext)
    const [deletingId, setDeletingId] = useState(null);

    const archiveMovie = async (id) => {
        setDeletingId(id);

        try {
            await fetchData(`admin/movie/delete/${id}`, 'PUT', token);

            const updatedMovie = movies.filter((movie) => movie._id !== id)
            setMovies(updatedMovie);

            Alert('success', 'Movie Managed Successfully');
        } catch (err) {
            Alert('error', err.message);
        } finally {
            setDeletingId(null);
        }
    };


    return (
        <div className="font-sans overflow-x-auto rounded-lg">

            <table className="min-w-full bg-darker rounded-lg">
                <thead className="bg-darker whitespace-nowrap border border-border rounded-lg">
                    <tr>

                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Name
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Author
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            duration
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            description
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Created At
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Actions
                        </th>

                    </tr>
                </thead>

                <tbody className="whitespace-nowrap rounded-lg">
                    {movies.map((movie) => (
                        <tr key={movie._id} className="hover:bg-black border border-border duration-700 rounded-lg">
                            <td className="p-4 text-[15px] text-gray-400 rounded-lg">
                            <img src={`${config.MinIo_URL}${movie.image}`} alt="movie" className='w-14' />
                            {movie.name}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400">
                                {movie.autor}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400">
                                {movie.duration}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400">
                                {movie.description}
                            </td>

                            <td className="p-4 text-[15px] text-gray-400">
                                {new Date(movie.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 pl-3 flex items-center pt-12">
                                <button onClick={() => {
                                    setUpdateData({ name: movie.name,  trailer: movie.trailer, media: movie.media, video: movie.video, duration: movie.duration, description: movie.description, _id: movie._id });
                                    setUpdating(true);
                                }}
                                    className="mr-4" title="Update">
                                    <i className='bx bx-edit-alt text-xl hover:text-blue-700 text-blue-500'></i>
                                </button>

                                <button onClick={() => archiveMovie(movie._id)} className="mr-4" title="Delete">
                                    <i className='bx bx-trash text-xl hover:text-red-700 text-red-500'></i>
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMoreMovies && !loading && (
                <button onClick={handleShowMore} className="mt-4 w-full bg-[#EEBB07]/50 hover:bg-[#EEBB07] duration-700 text-white border border-border px-4 py-2" disabled={loading}>
                    {loading ? 'Loading...' : 'Load More Users'}
                </button>
            )}
        </div>
    );
}
