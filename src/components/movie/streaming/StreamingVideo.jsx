import React, { useContext, useEffect } from 'react';
import MovieContext from '../../../context/MovieContext';
import { config } from '../../../config';

export default function StreamingVideo({ videoRef, handleToggle }) {
    const { movie, loading } = useContext(MovieContext);
    useEffect(() => {
        if (movie && movie.data.videoToken) {
            const signedUrl = `${movie.data.video}`;
            videoRef.current.src = `${config.MinIo_URL}${signedUrl}`;
        }
    }, [movie]);
    return (
        <div
            onClick={handleToggle}
            className="bg-black/70 fixed h-screen top-0 right-0 left-0 z-50 flex items-center justify-center"
        >
            <video
                ref={videoRef}
                className='h-[90%] w-auto max-w-full border-none'
                controls
                onClick={(e) => e.stopPropagation()}
                loop

            />
        </div>
    );
}
