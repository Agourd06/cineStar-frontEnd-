import React, { useContext, useState } from 'react'
import { validateField } from '../../../validation/AuthValidation';
import { fetchData } from '../../fetchers/Fetch';
import AuthContext from '../../../context/AuthContext';
import { AlertContext } from '../../../App';
import Spinner from '../../shared/Spinner';

export default function RoomForm({ setToggle, setRooms, updateData, updating, setUpdating, setUpdateData }) {

    const [formData, setFormData] = useState({
        name: '',
        capacity: '',
        room_type: ''
    });

    const [loading, setLoading] = useState(false)
    const { token } = useContext(AuthContext)
    const alert = useContext(AlertContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    };
    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetchData('admin/room/create', 'POST', token, formData)

            setRooms((prev) => [response.room, ...prev])
            alert('success', 'Room updated SuccessFully')
        } catch (error) {

            alert('error', error.message)
        } finally {
            setLoading(false)
            setToggle(false)
        }
    };
console.log(updateData);

    const handleUpdate = async () => {
        setLoading(true)
        try {
         const   data = {
                name : updateData.name,
                capacity : updateData.capacity,
                room_type : updateData.room_type
            }
            const response = await fetchData(`admin/room/update/${updateData._id}`, 'PUT', token, data)

            setRooms((prevRooms) =>
                prevRooms.map((room) =>
                    room._id === response.room._id ? response.room : room
                )
            );
            alert('success', 'Room Added SuccessFully')
        } catch (error) {

            alert('error', error.message)
        } finally {
            setLoading(false)
            setToggle(false)
            setUpdating(false)

        }
    };


    return (
        <div className='bg-black/70 fixed h-screen top-0 right-0 left-0 z-50 flex items-center justify-center'>
            <div className=' w-1/2 relative  bg-gradient-to-r from-dark to-darker   flex flex-col p-4 rounded-lg'>
                <i onClick={() => {
                    setToggle(false);
                    setUpdating(false); setUpdateData({})
                }} class='bx bx-x absolute top-3 right-3 text-3xl cursor-pointer hover:text-white/70'></i>
                <div className="font-[sans-serif] ">
                    <div className="text-center min-h-[160px] sm:p-6 p-4">
                        <h4 className="sm:text-3xl text-2xl font-bold text-white">{updating ? 'Update Room' : 'Create Room'}</h4>
                    </div>

                    <div className="mx-4 mb-4 -mt-16">
                        <form className="max-w-4xl mx-auto bg-dark shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">

                            <div className="grid md:grid-cols-2    gap-8">
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Name</label>
                                    <input name="name" type="text" value={updateData?.name || formData?.name} className="bg-transparent  border-border  focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all" onChange={updating ? handleUpdateChange : handleChange} placeholder="Enter name" />
                                </div>
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">capacity</label>
                                    <input name="capacity" type="number" value={updateData?.capacity || formData?.capacity} className="bg-transparent  border-border  focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all" onChange={updating ? handleUpdateChange : handleChange} placeholder="Enter Capacity" />
                                </div>
                                <div className='col-span-2'>
                                    <label className="text-white/60 text-sm mb-2 block">Type</label>
                                    <select name="room_type" value={updateData?.room_type || formData?.room_type} id="" className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all" onChange={updating ? handleUpdateChange : handleChange}  >
                                        <option value="VIP" className="bg-gray-900 hover:bg-white text-white">VIP</option>
                                        <option value="Classic" className="bg-gray-900 text-white">Classic</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8">
                                {updating ?
                                    <button type="button" onClick={handleUpdate} className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-darker/70 border border-border hover:bg-[#EEBB07] duration-700 focus:outline-none">
                                        {loading ? <><Spinner /> updation... </> : 'update'}
                                    </button>
                                    :
                                    <button type="button" onClick={handleSubmit} className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-darker/70 border border-border hover:bg-[#EEBB07] duration-700 focus:outline-none">
                                        {loading ? <><Spinner /> creating... </> : 'create'}
                                    </button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
