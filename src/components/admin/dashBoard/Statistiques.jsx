import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/AuthContext';
import { AlertContext } from '../../../App';
import { fetchData } from '../../fetchers/Fetch';

export default function Statistiques() {
    const [statistics, setStatistics] = useState({
        sessionsCount: '',
        reservationsCount: '',
        clientsCount: '',
        adminsCount: '',
        moviesCount: ''
    })
    const { token } = useContext(AuthContext)
    const Alert = useContext(AlertContext)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const response = await fetchData(`admin/stats`, 'GET', token);

                console.log('hahya', response);

                setStatistics((prevStats) => ({
                    ...prevStats,
                    ...response.data
                }));

            } catch (error) {
                Alert('error', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchStats();
        }
    }, [token]);
    return (

        <div className="bg-darker px-4 text-white w-[95%] mx-auto py-12 rounded-xl relative border border-border">
            <div className="text-center">
                <h1 className="text-3xl font-bold ">Our Statistics</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-10 relative -bottom-24">
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">{statistics.sessionsCount}</h2>
                    <p className="text-sm text-white mt-2">Disponible Sessions</p>
                </div>
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">{statistics.reservationsCount}</h2>
                    <p className="text-sm text-white mt-2">Total Reservations</p>
                </div>
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">{statistics.moviesCount}</h2>
                    <p className="text-sm text-white mt-2">Disponible Movies</p>
                </div>
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">{statistics.clientsCount}</h2>
                    <p className="text-sm text-white mt-2">Our Clients</p>
                </div>
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">{statistics.adminsCount}</h2>
                    <p className="text-sm text-white mt-2">Our Admins</p>
                </div>
            </div>
        </div>




    )
}
