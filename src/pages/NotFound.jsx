import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };
    return (

        <section className="bg-white dark:bg-dark ">
            <div className='fixed top-0 transition-all duration-500 ease-in-out transform  py-2  flex justify-between items-center px-10 text-white bg-dark h-20 w-full'></div>
            <div className="container min-h-[90vh] px-6 py-12 mx-auto lg:flex lg:items-center lg:justify-center lg:gap-12">
                <div className="w-full ">
                    <p className="text-lg font-medium text-blue-500 dark:text-blue-400">404 error</p>
                    <h1 className="mt-3 text-4xl font-semibold text-gray-800 dark:text-white md:text-6xl">Page not found</h1>
                    <p className="mt-4 text-gray-500 text-xl dark:text-gray-400">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>


                            <a href="#" onClick={goBack}>Go back</a>
                            </button>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img className="w-full max-w-lg lg:mx-auto" src="/images/components/illustration.svg" alt="" />
                </div>
            </div>
        </section>



    )
}
