import React, { useState, useEffect, useContext } from "react";
import Seats from "./reservationsSeats.jsx/Seats";
import AuthContext from "../../context/AuthContext";
import { AlertContext } from "../../App";
export default function Reservation({ session, setBackToSession }) {
    const [rows, setRows] = useState([]);
    const token = localStorage.getItem("token");
    const { logout } = useContext(AuthContext)
    const alert = useContext(AlertContext)


    const fetchSeatData = async () => {

        try {

            if (!session) return
            const response = await fetch(`http://localhost:3000/api/client/session/${session._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 401) {
                alert('warrning','your session expired Please login again')
                // logout()
                return;
            }

            if (!response.ok) {
                alert('error','Problem in showing sessions please try again')
            }

            const seatData = await response.json();

            const formattedRows = Array.from({ length: seatData.data.room.capacity }, (_, index) => {
                const seatNumber = index + 1;
                return {
                    number: seatNumber,
                    isReserved: seatData.reservedSeats.includes(seatNumber),
                };
            });

            setRows(formattedRows);

        } catch (error) {
            alert('error','Problem in showing sessions please try again')
            console.error("Error fetching seat data:", error.message);
        }

    };

    useEffect(() => {

        if (session) {
            fetchSeatData();
        }
    }, [session]);



    return (
        <div className="font-Didot text-center w-4/5 mx-auto">
            <div className="bg-darker rounded-lg text-white  my-4 py-2 flex justify-between items-center px-4">

                <button className='text-white text-xl' onClick={() => setBackToSession(false)}><i className='bx bx-left-arrow-circle text-3xl' ></i></button>
                <h1 className="text-lg">Room Seats</h1>
            </div>
            <div className="bg-darker rounded-lg text-white  my-4 py-2 flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold mb-4">Reservation Status Key</h1>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-700 border border-border rounded mr-2"></div>
                        <span>Selected for Reservation</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-red-800 border border-border rounded mr-2"></div>
                        <span>Reserved</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-black border border-border rounded mr-2"></div>
                        <span>N/A</span>
                    </div>
                </div>
            </div>
            <Seats seats={rows} sessionId={session._id} />

        </div>
    );
}
