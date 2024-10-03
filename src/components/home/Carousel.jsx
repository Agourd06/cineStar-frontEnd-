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
                headers: { 'Content-Type': 'application/json' ,
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

    
    const displayName = client.user?.name;
    
    if (error) return <h2 className="text-white text-7xl">{error}</h2>
    return (
        <>
            <TECarousel showControls showIndicators ride="carousel">
                <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                    <TECarouselItem
                        itemID={1}
                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <img
                            src="/john-wick-2-guns.jpg"
                            className="block w-full h-[85vh]"
                            alt="..."
                        />
                        <div className="absolute inset-x-[15%] bottom-40 hidden py-5 text-center text-white md:block">
                            <h5 className="text-4xl font-bold">Welcom {displayName} </h5>
                            <p className="text-2xl">
                            Welcome to CineStar! Discover the magic of movies with us.
                            </p>
                        </div>
                    </TECarouselItem>
                    <TECarouselItem
                        itemID={2}
                        className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <img
                            src="/MV5BMGQ1ZGZmNTAtM2MyYi00NmZhLTkwYmYtNTNlZDRhMzU2ZTgwXkEyXkFqcGdeQW1yb3NzZXI@._V1_.jpg"
                            className="block w-full h-[85vh]"
                            alt="..."
                        />
                        <div className="absolute inset-x-[15%] bottom-40 hidden py-5 text-center text-white md:block">
                            {/* <h5 className="text-5xl"></h5> */}
                            <p className="text-2xl">
                            Join us for a Cinematic Experience! Welcome to your favorite movie destination!
                            </p>
                        </div>
                    </TECarouselItem>
                    <TECarouselItem
                        itemID={3}
                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <img
                            src="/spider.webp"
                            className="block w-full h-[85vh]"
                            alt="..."
                        />
                        <div className="absolute inset-x-[15%] bottom-40 hidden py-5 text-center text-white md:block">
                            {/* <h5 className="text-xl">Third slide label</h5> */}
                            <p className="text-2xl">
                            Lights, Camera, Action! Welcome to the ultimate cinema experience!
                            </p>
                        </div>
                    </TECarouselItem>
                </div>
            </TECarousel>
        </>
    );
}
