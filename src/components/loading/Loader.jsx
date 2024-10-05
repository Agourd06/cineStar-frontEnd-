import React from 'react'

export default function Loader() {
    return (
        <div className="flex flex-row gap-2 w-full justify-center items-center h-96">
            <div className="w-4 h-4 rounded-full bg-[#EEBB07] animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-[#EEBB07] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[#EEBB07] animate-bounce [animation-delay:-.5s]"></div>
        </div>
        )
}
