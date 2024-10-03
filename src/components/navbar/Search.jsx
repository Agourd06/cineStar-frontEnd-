import React from 'react'

export default function Search() {
    return (
        <div className='flex justify-start lg:ml-auto max-lg:w-full text-white'>

            <div
                className='flex xl:w-80 max-xl:w-full bg-gray-100/45 px-6 py-3 rounded border border-solid border-gray-200/50 outline outline-transparent  focus-within:bg-transparent'>
                <input type='text' placeholder='Search something...'
                    className='w-full text-sm bg-transparent rounded outline-none pr-2' />

                <i className='bx bx-search-alt cursor-pointer fill-gray-400'></i>
            </div>

        </div>
    )
}
