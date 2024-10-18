import React, { useState, useEffect, useContext } from 'react';
import { StarIcon } from 'lucide-react';
import AuthContext from '../../../context/AuthContext';
import { fetchData } from '../../fetchers/Fetch';
import { AlertContext } from '../../../App';

export default function RatingPopUp({ movieId }) {
    const { token } = useContext(AuthContext);
    const Alert = useContext(AlertContext);
    const [movieRating, setMovieRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserRating = async () => {
            try {
                setLoading(true);
                const response = await fetchData(`client/rate/${movieId}`, 'GET', token);
                console.log(response);

                if (response.rate) {
                    setMovieRating(response.rate);
                    setHoverRating(response.rate);
                }
            } catch (error) {
                Alert('error', error.message);
            } finally {
                setLoading(false);
            }
        };
        if (movieId && token) {

            fetchUserRating();
        }
    }, [movieId, token]);

    const handleRating = async (index) => {
        if (!token) {
            Alert('info', 'You need to be logged in to rate a movie.');
            return; 
        }
        setMovieRating(index);
        setHoverRating(index);

        try {
            setLoading(true);
            const response = await fetchData(`client/rate/${movieId}`, 'POST', token, { rate: index });
            Alert('success', response.message);
        } catch (error) {
            Alert('error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const starIcons = () => {
        return Array.from({ length: 5 }, (_, index) => {
            index += 1;
            return (
                <StarIcon
                    key={index}
                    size={24}
                    className={`cursor-pointer transition-colors duration-200 ${((hoverRating || movieRating) >= index)
                        ? 'text-yellow-400'
                        : 'text-white'
                        }`}
                    onClick={() => handleRating(index)}
                    onMouseEnter={() => setHoverRating(index)}
                    onMouseLeave={() => setHoverRating(movieRating)}
                />
            );
        });
    }

    return (
        <div className="flex items-center">
            {starIcons()}
            <span className="ml-2 text-white font-bold">
                {movieRating ? `You rated this movie ${movieRating} out of 5` : 'Rate this movie'}
            </span>
            {loading && <span className="ml-2 text-white">Loading...</span>}
        </div>
    );
}
