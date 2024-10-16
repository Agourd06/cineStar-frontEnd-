import React, { useState } from 'react'

export default function Statistiques() {
    const [statistics , setStatistics] = useState({})
    return (

        <div className="bg-darker px-4 text-white w-[95%] mx-auto py-12 rounded-xl relative border border-border">
            <div className="text-center">
                <h1 className="text-3xl font-bold ">Our Statistics</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-10 relative -bottom-24">
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">260+</h2>
                    <p className="text-sm text-white mt-2">Expert Consultants</p>
                </div>
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">975+</h2>
                    <p className="text-sm text-white mt-2">Active Clients</p>
                </div>
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">724+</h2>
                    <p className="text-sm text-white mt-2">Projects Delivered</p>
                </div>
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">89+</h2>
                    <p className="text-sm text-white mt-2">Orders in Queue</p>
                </div>
                <div className="bg-white/40 text-center p-6 rounded-lg shadow-lg w-full ">
                    <h2 className="text-4xl font-bold text-darker">95%</h2>
                    <p className="text-sm text-white mt-2">Issue Resolved</p>
                </div>
            </div>
        </div>




    )
}
