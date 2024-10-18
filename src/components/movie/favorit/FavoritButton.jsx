import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../context/AuthContext';
import { fetchData } from '../../fetchers/Fetch';
import { AlertContext } from '../../../App';

export default function FavoritButton({ movie }) {
    const { token } = useContext(AuthContext);
    const Alert = useContext(AlertContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const response = await fetchData(`client/isfavorit/${movie}`, 'GET', token);
                setIsFavorite(response.isFavorite);
            } catch (error) {
                console.error("Error details:", error);
                Alert('error', "Failed to fetch favorite status.");
            }
        };
        if (movie && token) {

            fetchFavoriteStatus();
        }

    }, [movie, token]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetchData(`client/favorit/${movie}`, 'POST', token);
            setIsFavorite(response.isFavorite);
            Alert('success', response.message);
        } catch (error) {
            Alert('info', "login for More Access");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                id="favorit-icon"
                onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit(); 
                }}
                className={`duration-500 flex items-center font-bold ${isFavorite ? 'text-[#EEBB07]' : 'text-transparent'}`}
                disabled={loading}
            >
                <i
                    style={{ textShadow: '2px 2px 2px #fff' }}
                    className={`bx ${isFavorite ? 'bxs-bookmark' : 'bx-bookmark'} text-3xl lg:text-6xl`}
                ></i>
            </button>
        </div>
    );
}
