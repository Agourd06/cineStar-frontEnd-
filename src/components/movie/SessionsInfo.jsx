import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function SessionsInfo({ MovieId }) {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState('');

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

    return (
        <div className="bg-black px-6 py-12 font-sans">
            <div className="lg:max-w-7xl max-w-lg mx-auto px-6 py-8 bg-white/50 rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sessions.map((session) => {
                        const formattedDate = moment(session.displayTime).format('dddd DD/MM');

                        return (
                            <div key={session._id} className="bg-white rounded-2xl p-6">
                                <i class='bx bxs-slideshow text-black/50' ></i>
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
                                        >
                                            Reserve
                                            <div className="w-11 h-11 rounded-full bg-[#EEBB07]/95 animate-pulse flex justify-center items-center">
                                            <i class='bx bxs-right-arrow-square text-black'></i>
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
