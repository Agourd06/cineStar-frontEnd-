import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { AlertContext } from '../App';
import { fetchData } from '../components/fetchers/Fetch';

const MovieContext = createContext();

export const MovieProvider = ({ children, MovieId }) => {
    const [movie, setMovie] = useState({ data: {} });
    const [loading, setLoading] = useState(false);
    const alert = useContext(AlertContext);


    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await fetchData(`public/movie/${MovieId}`, 'GET');
                setMovie(response);
            } catch (err) {
                if (err.message === 'Unauthorized') {
                    alert('warnning','Your session has expired. Please log in again.');
                } else {
                    alert('error', err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [MovieId]);

    return (
        <MovieContext.Provider value={{ movie, loading }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContext;
