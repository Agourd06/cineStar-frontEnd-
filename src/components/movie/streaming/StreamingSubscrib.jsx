import React, { useContext, useEffect, useState } from 'react';
import { makeApiRequest } from '../../fetchers/Fetch';
import AuthContext from '../../../context/AuthContext';
import { AlertContext } from '../../../App';
import Spinner from '../../shared/Spinner';

export default function StreamingSubscrib({ handleToggle }) {
    const [loading, setLoading] = useState(false);
    const alert = useContext(AlertContext);
    const { logout, token } = useContext(AuthContext);

    const subscribClient = async () => {
        await makeApiRequest(
            'client/subscribe',
            setLoading,
            null,
            'PUT',
            token,
            alert,
            null,
            null,
            logout
        );
    };

    return (
        <div
            onClick={handleToggle}
            className="bg-black/70 fixed h-screen top-0 right-0 left-0 z-50 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()}
                className="max-w-6xl max-lg:max-w-xl mx-auto font-[sans-serif] bg-dark p-10 rounded-lg ">
                <div className="text-center py-2">
                    <h2 className="text-white text-4xl font-bold mb-4">Pricing</h2>
                </div>
                <div className="bg-[#EEBB07] h-max rounded-lg p-6">
                    <h3 className="text-gray-800 text-lg font-bold">Stream Plan</h3>
                    <div className="mt-6 flex items-center">
                        <h2 className="text-4xl border-b-4 border-gray-800 pb-2">$79</h2>
                        <div className="ml-4">
                            <h6 className="text-gray-800 text-sm font-bold">Per Month</h6>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-800 text-xs">Are you a movie lover looking to enhance your cinematic journey? Join our exclusive plan designed just for you!</p>
                        <button
                            type="button"
                            onClick={subscribClient}
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white mt-8 px-5 py-2.5 text-sm outline-none rounded-lg">
                            {loading ? <><Spinner className="mr-2" size={4} /> Processing...</> : 'Choose Plan'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
