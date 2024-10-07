import React from 'react'

export async function fetchMovies(setLoading , setError , setMovies) {
    try {
      setLoading(true); 
      const response = await fetch(`http://localhost:3000/api/public/sessions`, {
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
      setMovies(moviesData);
      setLoading(false); 
    } catch (error) {
      console.error('Fetch Error:', error);
      setError(error.message || 'An error occurred while fetching movies');
      setLoading(false); 
    }
  }