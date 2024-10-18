import React, { useContext, useState } from 'react';
import { fetchData } from '../../fetchers/Fetch';
import AuthContext from '../../../context/AuthContext';
import { AlertContext } from '../../../App';
import Spinner from '../../shared/Spinner';

export default function MovieForm({ setToggle, setMovies, updateData, updating, setUpdating, setUpdateData }) {
    const [formData, setFormData] = useState({
        name: '',
        trailer: '',
        image: null,
        video: null,
        duration: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);
    const alert = useContext(AlertContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleUpdatingData = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files[0],
        }));
    };

    const handleUpdateFileChange = (e) => {
        const { name, files } = e.target;
        setUpdateData((prevState) => ({
            ...prevState,
            [name]: files[0],
        }));
    };
console.log(updateData);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const Data = new FormData();
            Data.append('name', formData.name);
            Data.append('trailer', formData.trailer);
            Data.append('description', formData.description);
            Data.append('duration', formData.duration);

            if (formData.image) Data.append('image', formData.image);
            if (formData.video) Data.append('video', formData.video);

            const response = await fetchData('admin/movie/create', 'POST', token, Data, true);
            
            setMovies((prev) => [response.movie, ...prev]);
            alert('success', 'Movie created successfully');
        } catch (error) {
            alert('error', error.message);
        } finally {
            setLoading(false);
            setToggle(false);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const Data = new FormData();
            Data.append('name', updateData.name);
            Data.append('trailer', updateData.trailer);
            Data.append('description', updateData.description);
            Data.append('duration', updateData.duration);

            if (updateData.image) Data.append('image', updateData.image);
            if (updateData.video) Data.append('video', updateData.video);

            const response = await fetchData(`admin/movie/update/${updateData._id}`, 'PUT', token, Data, true);

            setMovies((prevMovies) =>
                prevMovies.map((movie) =>
                    movie._id === response.movie._id ? response.movie : movie
                )
            );
            alert('success', 'Movie updated successfully');
        } catch (error) {
            alert('error', error.message);
        } finally {
            setLoading(false);
            setToggle(false);
            setUpdating(false);
        }
    };

    return (
        <div className="bg-black/70 fixed h-screen top-0 right-0 left-0 z-50 flex items-center justify-center">
            <div className="w-1/2 relative bg-gradient-to-r from-dark to-darker flex flex-col p-4 rounded-lg">
                <i
                    onClick={() => {
                        setToggle(false);
                        setUpdating(false);
                        setUpdateData({});
                    }}
                    className="bx bx-x absolute top-3 right-3 text-3xl cursor-pointer hover:text-white/70"
                ></i>
                <div className="font-[sans-serif]">
                    <div className="text-center min-h-[160px] sm:p-6 p-4">
                        <h4 className="sm:text-3xl text-2xl font-bold text-white">
                            {updating ? 'Update Movie' : 'Create Movie'}
                        </h4>
                    </div>

                    <div className="mx-4 mb-4 -mt-16">
                        <form className="max-w-4xl mx-auto bg-dark shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        value={updating ? updateData?.name : formData?.name}
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdatingData : handleChange}
                                        placeholder="Enter name"
                                    />
                                </div>
                             
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Trailer</label>
                                    <input
                                        name="trailer"
                                        type="text"
                                        value={updating ? updateData?.trailer : formData?.trailer}
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdatingData : handleChange}
                                        placeholder="Enter trailer"
                                    />
                                </div>
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Image</label>
                                    <input
                                        name="image"
                                        type="file"
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdateFileChange : handleFileChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Video</label>
                                    <input
                                        name="video"
                                        type="file"
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdateFileChange : handleFileChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Duration</label>
                                    <input
                                        name="duration"
                                        type="number"
                                        value={updating ? updateData?.duration : formData?.duration}
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdatingData : handleChange}
                                        placeholder="Enter duration"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-white/60 text-sm mb-2 block">Description</label>
                                    <textarea
                                        name="description"
                                        
                                        className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all"
                                        onChange={updating ? handleUpdatingData : handleChange}
                                        placeholder="Enter description"
                                    >{updating ? updateData?.description : formData?.description}</textarea>
                                </div>
                            </div>

                            <div className="mt-8">
                                {updating ? (
                                    <button
                                        type="button"
                                        onClick={handleUpdate}
                                        className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-darker/70 border border-border hover:bg-[#EEBB07] duration-700 focus:outline-none"
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner /> Updating...
                                            </>
                                        ) : (
                                            'Update'
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-darker/70 border border-border hover:bg-[#EEBB07] duration-700 focus:outline-none"
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner /> Creating...
                                            </>
                                        ) : (
                                            'Create'
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
