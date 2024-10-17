import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../App'
import { fetchData } from '../../fetchers/Fetch'
import AuthContext from '../../../context/AuthContext'

export default function RoomsTable({
    rooms,
    handleShowMore,
    setUsers,
    loading,
    hasMoreUsers
}) {

    const Alert = useContext(AlertContext)
    const { token } = useContext(AuthContext)
    const [deletingId, setDeletingId] = useState(null);

    const archiveUser = async (id) => {
        setDeletingId(id);

        try {
            await fetchData(`admin/room/${id}`, 'PUT', token);

            const updatedUsers = users.filter((user)=>user._id !== id)
            setUsers(updatedUsers);

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
                            Created At
                        </th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">
                            Actions
                        </th>
                        
                    </tr>
                </thead>

                <tbody className="whitespace-nowrap rounded-lg">
                    {rooms.map((room) => (
                        <tr key={user._id} className="hover:bg-black border border-border duration-700 rounded-lg">
                            <td className="p-4 text-[15px] text-gray-400 rounded-lg">
                                {room.name}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400">
                                {room.capacity}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400 pl-8">
                                {room.subscribed ? <i className='bx bx-check text-green-700 text-2xl'></i> : <i className='bx bx-x text-red-700 text-2xl'></i>}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400">
                                {new Date(room.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-[15px] text-gray-400 pl-8">
                                {room.deleted_at ? <i className='bx bx-check text-green-700 text-2xl'></i> : <i className='bx bx-x text-red-700 text-2xl'></i>}
                            </td>
                            <td className="p-4 pl-7 flex items-center">
                                    <button onClick={() => archiveUser(room._id)} className="mr-4" title="Update">
                                    <i className='bx bx-edit-alt text-xl hover:text-blue-700 text-blue-500'></i>
                                    </button>

                                    <button onClick={() => archiveUser(room._id)} className="mr-4" title="Delete">
                                        <i className='bx bx-trash text-xl hover:text-red-700 text-red-500'></i> 
                                    </button>
                             
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMoreUsers && !loading && (
                <button onClick={handleShowMore} className="mt-4 w-full bg-[#EEBB07]/50 hover:bg-[#EEBB07] duration-700 text-white border border-border px-4 py-2" disabled={loading}>
                    {loading ? 'Loading...' : 'Load More Users'}
                </button>
            )}
        </div>
    );
}
