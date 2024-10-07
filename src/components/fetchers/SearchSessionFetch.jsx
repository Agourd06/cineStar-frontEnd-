import React from 'react'

export async function searchMovies(setLoading, setError, setMovies, search) {
    try {
        setLoading(true);
        console.log("search" ,search);
        
        if (!search || search.trim() === '') {
            setMovies([]); 
            setLoading(false);
            return; 
        }

        const response = await fetch(`http://localhost:3000/api/public/search?movieName=${search}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || 'Failed to fetch movies');
            setLoading(false);
            return;
        }

        const moviesData = await response.json();

        if (moviesData.length === 0) {
            setError('No matching movies found.');
        } else {
            setError('');
        }

        setMovies(moviesData);
    } catch (error) {
        console.error('Fetch Error:', error);
        setError(error.message || 'An error occurred while fetching movies');
    } finally {
        setLoading(false);
    }
}
