import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar/SideBar'
import SideBarContext from '../../context/SideBarContext';
import AuthContext from '../../context/AuthContext';
import { AlertContext } from '../../App';
import { fetchData } from '../../components/fetchers/Fetch';
import MoviesTable from '../../components/admin/movies/MoviesTable';
import MovieForm from '../../components/admin/movies/MovieForm';

export default function MoviesManage() {
    const { isSideBarVisible } = useContext(SideBarContext);
    const { client } = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)
    const [movies, setMovies] = useState([])
    const Alert = useContext(AlertContext)
    const { token } = useContext(AuthContext)
    const [page, setPage] = useState(1);
    const [hasMoreMovies, setHasMoreMovies] = useState(true);
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [updateData, setUpdateData] = useState({
        name: '',
        trailer: '',
        media: '',
        video: '',
        duration: '',
        description: '',
    });

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetchData(`admin/movies?page=${page}`, 'GET', token);

                if (response.data.length === 0) {
                    setHasMoreMovies(false);
                } else {
                    setMovies((prevUsers) => [...prevUsers, ...response.data]);
                }

            } catch (error) {
                Alert('error', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchMovies();
        }
    }, [token, page]);
console.log(movies);

    const handleShowMore = () => {
        if (hasMoreMovies) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    return (

        <div className='bg-dark min-h-screen flex'>
            <SideBar />
            <div
                className={`transition-all duration-300 text-white lg:ml-auto w-[89%] ml-auto sm:w-[94%] md:[95%] py-4  pr-4
                    ${isSideBarVisible ? 'xl:w-[84%] xl:opacity-100 xl:translate-x-0' : 'xl:w-[95%] xl:opacity-100 xl:-translate-x-1/5'}`}
            >
                <div className=" flex justify-between  pr-2">
                    <div className='flex items-center gap-8'>
                        <h1 className=' text-text md:text-5xl text-2xl font-extrabold py-1  pb-4'>Movie Manage</h1>
                        <button onClick={() => { setToggle(true) }} className='px-5 py-3 rounded-lg border border-border bg-darker hover:bg-[#EEBB07] duration-700'>Create Movie</button>
                    </div>
                    <h1 className=' text-text md:text-4xl text-xl font-extrabold py-1'> {client.name}</h1>
                </div>
                <MoviesTable setUpdating={setUpdating} setUpdateData={setUpdateData} movies={movies} handleShowMore={handleShowMore} setMovies={setMovies} loading={loading} hasMoreMovies={hasMoreMovies} />
                {(toggle || updating) && <MovieForm setToggle={setToggle} setMovies={setMovies} updateData={updateData} updating={updating} setUpdating={setUpdating} setUpdateData={setUpdateData} />}

            </div>
        </div>
    )
}
