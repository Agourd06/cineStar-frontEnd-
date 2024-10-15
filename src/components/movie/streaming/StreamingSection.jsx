import React, { useContext, useEffect, useRef, useState } from 'react';
import StreamingVideo from './StreamingVideo';
import { fetchData } from '../../fetchers/Fetch';
import AuthContext from '../../../context/AuthContext';
import { AlertContext } from '../../../App';
import StreamingSubscrib from './StreamingSubscrib';

export default function StreamingSection() {
    const [toggle, setToggle] = useState(false);
    const videoRef = useRef(null);
    const [client, setClient] = useState({ data: {} });
    const [loading, setLoading] = useState(false);
    const alert = useContext(AlertContext)
    const { token } = useContext(AuthContext)

    const isSubscribed = client?.user?.subscribed;



    const handleToggle = () => {

        if (toggle && videoRef.current) {
            videoRef.current.pause();
        }
        setToggle(prev => !prev);
    };



    useEffect(() => {
        const fetchClient = async () => {
            setLoading(true);
            try {
                const response = await fetchData(`client`, 'GET', token);
                setClient(response);
            } catch (err) {
              
                    alert('info', 'Login Now for more Options');
             
            } finally {
                setLoading(false);
            }
        };
        if (token) {

            fetchClient();
        }
    }, [token]);







    return (
        <>
            <div className="bg-dark px-6  font-Didot  overflow-hidden">
                <div className=' xl:max-w-7xl lg:max-w-5xl max-w-lg md:max-w-3xl mx-auto'>
                    <h1 className='text-text md:text-5xl text-2xl font-extrabold'>Stream </h1>
                    <h2 className='text-text text-lg'> Not Subscribed ? <a href='#' className='text-[#EEBB07]'>Subscribe</a> </h2>
                </div>
                <div
                    className=" xl:max-w-7xl lg:max-w-5xl max-w-lg md:max-w-3xl mx-auto bg-darker border border-border rounded-lg shadow-md h-[120px]"
                    style={{
                        backgroundImage: "url('https://media.giphy.com/media/u05ioklv7lGrePPKNh/giphy.gif')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div onClick={handleToggle} className='cursor-pointer w-full h-full flex items-center justify-center bg-black/70 rounded-lg'>
                        <button className='text-6xl text-white flex items-center gap-5 rounded-lg'><i className='bx bx-play-circle'></i> </button>
                    </div>
                </div>
            </div>
            {isSubscribed ? toggle && <StreamingVideo videoRef={videoRef} handleToggle={handleToggle} /> : toggle && <StreamingSubscrib handleToggle={handleToggle} />}


        </>
    );
}
