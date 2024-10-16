import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../App'
import { fetchData } from '../../fetchers/Fetch'
import AuthContext from '../../../context/AuthContext'

export default function RoomsTable({
    rooms,
    handleShowMore,
    setRooms,
    loading,
    hasMoreRooms,
    setUpdateData,
    setUpdating
}) {

    const Alert = useContext(AlertContext)
    const { token } = useContext(AuthContext)
    const [deletingId, setDeletingId] = useState(null);

    const archiveRoom = async (id) => {
        setDeletingId(id);

        try {
            await fetchData(`admin/room/delete/${id}`, 'PUT', token);

            const updatedRoom = rooms.filter((room) => room._id !== id)
            setRooms(updatedRoom);

            Alert('success', 'Room Managed Successfully');
        } catch (err) {
            Alert('error', err.message);
        } finally {
            setDeletingId(null);
        }
    };



    return (
        <div className="font-sans overflow-x-auto rounded-lg">

            <table className="min-w-full bg-darker rounded-lg">
                <thead className="bg-darker whitespace-nowrap border border-border rounded-lg">
                    <tr>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Name
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Capacity
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Type
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Created At
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Actions
                        </th>

                    </tr>
                </thead>

                <tbody className="whitespace-nowrap rounded-lg">
                    {rooms.map((room) => (
                        <tr key={room._id} className="hover:bg-black border border-border duration-700 rounded-lg">
                            <td className="p-4 text-[15px] text-gray-400 rounded-lg">
                                {room.name}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400">
                                {room.capacity}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400">
                                {room.room_type}
                            </td>

                            <td className="p-4 text-[15px] text-gray-400">
                                {new Date(room.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 pl-3 flex items-center">
                                <button onClick={() => {
                                    setUpdateData({ name: room.name, capacity: room.capacity, room_type: room.room_type , _id:room._id });
                                    setUpdating(true);
                                }}
                                    className="mr-4" title="Update">
                                    <i className='bx bx-edit-alt text-xl hover:text-blue-700 text-blue-500'></i>
                                </button>

                                <button onClick={() => archiveRoom(room._id)} className="mr-4" title="Delete">
                                    <i className='bx bx-trash text-xl hover:text-red-700 text-red-500'></i>
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMoreRooms && !loading && (
                <button onClick={handleShowMore} className="mt-4 w-full bg-[#EEBB07]/50 hover:bg-[#EEBB07] duration-700 text-white border border-border px-4 py-2" disabled={loading}>
                    {loading ? 'Loading...' : 'Load More Users'}
                </button>
            )}
        </div>
    );
}
