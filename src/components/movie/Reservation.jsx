import React, { useState, useEffect } from "react";
import Seats from "./reservationsSeats.jsx/Seats";
import { logoutUser } from '../../utils/AuthUtils'
export default function Reservation({ session, setBackToSession }) {
    const [rows, setRows] = useState([]);
    const token = localStorage.getItem("token");


    const fetchSeatData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/client/room/${session.room._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            });
    
            if (response.status === 401) {
                alert("Session expired or invalid token. You will be logged out.");
                logoutUser(); 
                return; 
            }
    
            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || 'Failed to fetch seat data');
            }
    
            const seatData = await response.json();
    
            const formattedRows = Array.from({ length: seatData.data.capacity }, (_, index) => {
                const seatNumber = index + 1;
                return {
                    number: seatNumber,
                    isReserved: seatData.reservedSeats.includes(seatNumber),
                };
            });
    
            console.log(formattedRows);
    
            setRows(formattedRows);
    
        } catch (error) {
            console.error("Error fetching seat data:", error.message);
        }
    };
    
    useEffect(() => {
        if (session) {
            fetchSeatData();
        }
    }, [session]);
    


    return (
        <div className="font-sans text-center p-4">
            <button className='text-white text-5xl' onClick={() => setBackToSession(false)}>back</button>
            <h1 className="bg-black text-white w-4/5 mx-auto my-4 py-2">SCREEN</h1>
            <Seats totalSeats={rows.length} sessionId={session._id} />
          
        </div>
    );
}
