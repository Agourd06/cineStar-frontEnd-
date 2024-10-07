import React, { useState, useEffect } from 'react';
import Spinner from '../shared/Spinner';
import { searchMovies } from '../fetchers/SearchSessionFetch';

export default function Search() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState({
        search: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        const { name, value } = e.target;
        setSearch((prev) => ({
            ...prev,
            [name]: value,
        }))
        searchMovies(setLoading, setError, setMovies, search.search);

    }


   


    return (
        <div className='flex justify-start lg:ml-52 max-lg:w-full text-white'>
            <div
                className='flex xl:w-80 max-xl:w-full bg-gray-100/45 px-6 py-3  rounded border border-solid border-gray-200/50 outline outline-transparent focus-within:bg-transparent'>
                <input
                    type='text'
                    placeholder='Search something...'
                    name='search'
                    onChange={handleSearch}
                    className='w-full text-sm bg-transparent rounded outline-none pr-2 text-white'
                />

                <i className='bx bx-search-alt cursor-pointer fill-gray-400'></i>
            </div>


            <div className="absolute mt-12 xl:w-80 max-xl:w-full bg-darker border border-border rounded shadow-dark shadow-lg max-h-60 overflow-auto">
                {loading ? <div className='flex justify-center p-4'>
                    <Spinner />
                </div> :
                    <>  {
                        movies.map((movie) => (

                            <div key={movie._id} className="p-3 border-b border-gray-700 hover:bg-gray-800 flex cursor-pointer gap-4">
                                <img src="/WhatIf.png" alt="" className='w-10 ' />
                                <div>
                                    <p>{movie.name}</p>
                                    <p>Thursday 23/10 12:15</p>
                                </div>
                            </div>
                        ))
                    }</>
                }

            </div>

        </div>
    );
}
