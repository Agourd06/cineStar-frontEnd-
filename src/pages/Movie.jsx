import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { useParams } from 'react-router-dom';
import MovieInfos from '../components/movie/MovieInfos';
import SessionsInfo from '../components/movie/SessionsInfo';
import Reservation from '../components/movie/Reservation';

export default function Movie() {
    const { id } = useParams();
    const [session, setSession] = useState(null);
    const [backToSession, setBackToSession] = useState(false);

    const handleReserve = (data) => {
        
        setSession(data);
    };

    return (
        <div className='bg-black/90 min-h-screen '>
            <Navbar />
            <div className='lg:mt-[5rem]'>
                <MovieInfos MovieId={id} />

                {session && backToSession ? (
                    <Reservation session={session} setBackToSession={setBackToSession} />
                ) : (
                    <SessionsInfo MovieId={id} onReserve={handleReserve} setBackToSession={setBackToSession} />
                )}
            </div>
        </div>
    );
}
