import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { AlertContext } from '../App';
import { makeApiRequest } from '../components/fetchers/Fetch';

const MovieContext = createContext();

export const MovieProvider = ({ children, MovieId }) => {
    const [movie, setMovie] = useState({ data: {} });
    const [loading, setLoading] = useState(false);
    const alert = useContext(AlertContext);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchOneMovie = async () => {
            if (!MovieId) {
                alert('warning', 'No movie ID provided');
                return;
            }
            await makeApiRequest(
                `public/movie/${MovieId}`,
                setLoading,
                setMovie,
                'GET',
                null,
                alert,
                null,
                null,
                logout
            );
        };

        fetchOneMovie();
    }, [MovieId]);

    return (
        <MovieContext.Provider value={{ movie, loading }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContext;
