import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar/SideBar'
import SideBarContext from '../../context/SideBarContext';
import AuthContext from '../../context/AuthContext';
import { AlertContext } from '../../App';
import { fetchData } from '../../components/fetchers/Fetch';
import SessionsTable from '../../components/admin/sessions/SessionsTable';
import SessionForm from '../../components/admin/sessions/SessionsForm';


export default function SessionsManage() {
    const { isSideBarVisible } = useContext(SideBarContext);
    const { client } = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)
    const [sessions, setSessions] = useState([])
    const [movies, setMovies] = useState([])
    const [rooms, setRooms] = useState([])
    const Alert = useContext(AlertContext)
    const { token } = useContext(AuthContext)
    const [page, setPage] = useState(1);
    const [hasMoreSessions, setHasMoreSessions] = useState(true);
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [updateData, setUpdateData] = useState({
        price: '',
        displayTime: null,
        movie: '',
        room: '',
    });
console.log(sessions);

    useEffect(() => {
        const fetchSessions = async () => {
            setLoading(true);
            try {
                const response = await fetchData(`admin/sessions?page=${page}`, 'GET', token);
                
                if (response.sessions.length === 0) {
                    setHasMoreSessions(false);
                } else {
                    setSessions((prevUsers) => [...prevUsers, ...response.sessions]);
                }
                setMovies(response.movies);
                setRooms(response.rooms);

            } catch (error) {
                Alert('error', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchSessions();
        }
    }, [token, page]);
    

    const handleShowMore = () => {
        if (hasMoreSessions) {
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
                        <h1 className=' text-text md:text-5xl text-2xl font-extrabold py-1  pb-4'>Sessions Manage</h1>
                        <button onClick={() => { setToggle(true) }} className='px-5 py-3 rounded-lg border border-border bg-darker hover:bg-[#EEBB07] duration-700'>Create Session</button>
                    </div>
                    <h1 className=' text-text md:text-4xl text-xl font-extrabold py-1'> {client.name}</h1>
                </div>
                <SessionsTable setUpdating={setUpdating} setUpdateData={setUpdateData} sessions={sessions} handleShowMore={handleShowMore} setSessions={setSessions} loading={loading} hasMoreSessions={hasMoreSessions} movies={movies} rooms={rooms} />
                {(toggle || updating) && <SessionForm setToggle={setToggle} setSessions={setSessions} updateData={updateData} updating={updating} setUpdating={setUpdating} setUpdateData={setUpdateData} movies={movies} rooms={rooms} />}

            </div>
        </div>
    )
}
