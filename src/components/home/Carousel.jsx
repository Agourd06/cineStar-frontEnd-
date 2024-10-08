import React, { useState, useEffect } from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export default function Carousel() {
    const [client, setClient] = useState({ user: {} });
    const token = localStorage.getItem("token");
    const [error, setError] = useState('')



    async function fetchOneMUser() {
        try {
            const response = await fetch(`http://localhost:3000/api/client`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }

            });


            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch user data');
                return;
            }

            const userData = await response.json();
            console.log('user data' + userData);

            setClient(userData);

        } catch (error) {
            console.error('Fetch Error:', error);
            setError(error.message || 'An error occurred while fetching user data');
        }
    }




    useEffect(() => {
        fetchOneMUser()

    }, [])


    const displayName = client.user?.name || 'client';

    return (
        <>
            <TECarousel showControls showIndicators ride="carousel">
                <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] shadow-darker shadow-2xl">
                    <TECarouselItem
                        itemID={1}
                        className="relative float-left -mr-[100%]  w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <div className="bg-darker/50 absolute top-0 bottom-0 left-0 right-0">

                        </div>
                        <img
                            src="/HomeCarousel1.jpg"
                            className="block w-full h-[85vh]"
                            alt="..."
                        />
                        <div className="absolute inset-x-[15%] bottom-1/3  py-5 text-center md:flex md:flex-col md:gap-y-10 gap-y-20 text-white ">
                            <h5 className="md:text-5xl text-3xl font-extrabold mb-4">Welcom <span className="text-[#EEBB07] uppercase">{displayName}</span>  </h5>
                            <p className="md:text-3xl text-xl font-bold">
                                Welcome to CineStar! Discover the magic of movies with us.
                            </p>
                        </div>
                    </TECarouselItem>
                    <TECarouselItem
                        itemID={2}
                        className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <div className="bg-darker/50 absolute top-0 bottom-0 left-0 right-0">

                        </div>
                        <img
                            src="/HomeCarousel2.jpg"
                            className="block w-full h-[85vh]"
                            alt="..."
                        />
                        <div className="absolute inset-x-[15%] bottom-1/3  py-5 text-center md:flex md:flex-col gap-y-10 text-white ">
                            <p className="md:text-3xl text-xl font-bold">
                                Join us for a Cinematic Experience! Welcome to your favorite movie destination!
                            </p>
                        </div>
                    </TECarouselItem>
                    <TECarouselItem
                        itemID={3}
                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <div className="bg-darker/50 absolute top-0 bottom-0 left-0 right-0">

                        </div>
                        <img
                            src="/HomeCarousel3.jpg"
                            className="block w-full h-[85vh]"
                            alt="..."
                        />
                        <div className="absolute inset-x-[15%] bottom-1/3 hidden py-5 text-center md:flex md:flex-col gap-y-10 text-white ">
                            <p className="md:text-3xl text-xl font-bold">
                                Lights, Camera, Action! Welcome to the ultimate cinema experience!
                            </p>
                        </div>
                    </TECarouselItem>
                </div>
            </TECarousel>
        </>
    );
}
