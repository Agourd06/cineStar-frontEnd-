import React, { useContext, useState } from 'react'
import { validateField } from '../../../validation/AuthValidation';
import { fetchData } from '../../fetchers/Fetch';
import AuthContext from '../../../context/AuthContext';
import { AlertContext } from '../../../App';
import Spinner from '../../shared/Spinner';

export default function SessionForm({ setToggle, setSessions, updateData, updating, setUpdating, setUpdateData, rooms, movies }) {

    const [formData, setFormData] = useState({
        price: '',
        displayTime: '',
        movie: '',
        room: '',
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
    const formatDateTimeLocal = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); 
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
            const response = await fetchData('admin/session/create', 'POST', token, formData)

            setSessions((prev) => [response.session, ...prev])
            alert('success', 'Session Created SuccessFully')
        } catch (error) {

            alert('error', error.message)
        } finally {
            setLoading(false)
            setToggle(false)
        }
    };

    const handleUpdate = async () => {
        setLoading(true)
        try {
            
            const data = {
                price: updateData.price,
                displayTime: updateData.displayTime,
                room: updateData.room,
                movie: updateData.movie
            }
            console.log(data);
            
            const response = await fetchData(`admin/session/update/${updateData._id}`, 'PUT', token, data)
            console.log("hadi res" ,response);
            setSessions((prevSessions) =>
                prevSessions.map((session) =>
                    session._id === response.session._id ? response.session : session
                )
            );

            alert('success', 'session updated SuccessFully')
        } catch (error) {

            alert('error',  error.message)
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
                    setUpdating(false);
                    setUpdateData({});
                }} class='bx bx-x absolute top-3 right-3 text-3xl cursor-pointer hover:text-white/70'></i>
                <div className="font-[sans-serif] ">
                    <div className="text-center min-h-[160px] sm:p-6 p-4">
                        <h4 className="sm:text-3xl text-2xl font-bold text-white">{updating ? 'Update Session' : 'Create Session'}</h4>
                    </div>

                    <div className="mx-4 mb-4 -mt-16">
                        <form className="max-w-4xl mx-auto bg-dark shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Price</label>
                                    <input
                                        name="price"
                                        type="number"
                                        value={updating ? updateData?.price : formData?.price}
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdateChange : handleChange}
                                        placeholder="Enter price"
                                    />
                                </div>
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Show Time</label>
                                    <input
                                        name="displayTime"
                                        type="datetime-local"
                                        value={updating ? formatDateTimeLocal(updateData?.displayTime) : formData?.displayTime}
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdateChange : handleChange}
                                        placeholder="Enter Show Time"
                                        min={new Date().toISOString().slice(0, 16)}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="text-white/60 text-sm mb-2 block">Rooms</label>
                                    <select
                                        name="room"
                                        value={updating ? updateData?.room : formData?.room}
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdateChange : handleChange}>
                                        {rooms.map((room) => (
                                            <option key={room._id} value={room._id} className="bg-gray-900 text-white">
                                                {room.name}
                                            </option>   
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-white/60 text-sm mb-2 block">Movies</label>
                                    <select
                                        name="movie"
                                        value={updating ? updateData?.movie : formData?.movie}
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdateChange : handleChange}
                                    >
                                        {movies.map((movie) => (
                                            <option key={movie._id} value={movie._id} className="bg-gray-900 text-white">
                                                {movie.name}
                                            </option>
                                        ))}
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
