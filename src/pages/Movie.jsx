import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieInfos from '../components/movie/MovieInfos';
import SessionsInfo from '../components/movie/SessionsInfo';
import Reservation from '../components/movie/SeatsReservation';
import { MovieProvider } from '../context/MovieContext';
import StreamingSection from '../components/movie/streaming/StreamingSection';

export default function Movie() {
    const { id: MovieId } = useParams();  
    const [session, setSession] = useState(null);
    const [backToSession, setBackToSession] = useState(false);

    const handleReserve = (data) => {
        setSession(data);
    };

    return (
        <MovieProvider MovieId={MovieId}>
            <div className='bg-dark min-h-screen'>
                <div>
                    <MovieInfos />
                    <StreamingSection />
                    {session && backToSession ? (
                        <Reservation session={session} setBackToSession={setBackToSession} />
                    ) : (
                        <SessionsInfo MovieId={MovieId} onReserve={handleReserve} setBackToSession={setBackToSession} />
                    )}
                </div>
            </div>
        </MovieProvider>
    );
}
