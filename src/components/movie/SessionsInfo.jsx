import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function SessionsInfo({ MovieId, onReserve, setBackToSession }) {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem("token");
    const [connection, setConnection] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            setConnection(true);
        } else {
            setConnection(false);
        }
    }, [token, navigate]);

    async function fetchSessions() {
        try {
            const response = await fetch(`http://localhost:3000/api/public/movie/sessions/${MovieId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch sessions data');
                return;
            }

            const movieSessions = await response.json();
            
            setSessions(movieSessions);
        } catch (error) {
            console.error('Fetch Error:', error);
            setError(error.message || 'An error occurred while fetching sessions data');
        }
    }

    useEffect(() => {
        fetchSessions();
    }, [MovieId]);

    if (error) return <h2>{error}</h2>;

    const handleReserveClick = (session) => {
        if (connection) {
            
            onReserve(session);
            setBackToSession(true); 
        } else {
            navigate('/auth/login');
        }
    };

    return (
        <div className="bg-dark px-6 py-12 font-Didot">
            <div className="lg:max-w-7xl max-w-lg mx-auto px-6 py-8 bg-darker border border-border rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sessions.map((session) => {
                        const formattedDate = moment(session.displayTime).format('dddd DD/MM');

                        return (
                            <div key={session._id} className="bg-dark rounded-2xl p-6 text-text border border-border">
                                <i className='bx bxs-slideshow text-text'></i>
                                <div className="mt-4">
                                    <div className='flex justify-between pr-20'>
                                        <h1 className='text-[#EEBB07] font-bold'>Show Time :</h1>
                                        <h2 className='font-semibold'>{formattedDate}</h2>
                                    </div>
                                    <div className='flex justify-between pr-20'>
                                        <h1 className='text-[#EEBB07] font-bold'>Room :</h1>
                                        <h2 className='font-semibold'>{session.room.name}</h2>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="flex items-center flex-wrap justify-between gap-2 border rounded-3xl pl-5 pr-3 h-14 w-full hover:bg-[#EEBB07]/30 transition-all duration-300"
                                            onClick={() => handleReserveClick(session)} 
                                        >
                                            Reserve
                                            <div className="w-11 h-11 rounded-full bg-[#EEBB07]/95 animate-pulse flex justify-center items-center">
                                            <i className='text-xl font-bold bx bx-right-arrow-alt'></i>   
                                                                                     </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
