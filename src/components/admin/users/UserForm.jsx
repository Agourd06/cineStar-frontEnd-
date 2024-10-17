import React, { useContext, useState } from 'react'
import { validateField } from '../../../validation/AuthValidation';
import { fetchData } from '../../fetchers/Fetch';
import AuthContext from '../../../context/AuthContext';
import { AlertContext } from '../../../App';
import Spinner from '../../shared/Spinner';

export default function UserForm({ setToggle , setUsers }) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
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

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetchData('admin/create', 'POST', token, formData)
            console.log(response);
            
            setUsers((prev)=>[response.user , ...prev])
            alert('success', 'User Added SuccessFully')
        } catch (error) {

            alert('error', error.message)
        } finally {
            setLoading(false)
            setToggle(false)
        }
    };


    return (
        <div className='bg-black/70 fixed h-screen top-0 right-0 left-0 z-50 flex items-center justify-center'>
            <div className=' w-1/2 relative  bg-gradient-to-r from-dark to-darker   flex flex-col p-4 rounded-lg'>
                <i onClick={() => { setToggle(false) }} class='bx bx-x absolute top-3 right-3 text-3xl cursor-pointer hover:text-white/70'></i>
                <div className="font-[sans-serif] ">
                    <div className="text-center min-h-[160px] sm:p-6 p-4">
                        <h4 className="sm:text-3xl text-2xl font-bold text-white">Add User</h4>
                    </div>

                    <div className="mx-4 mb-4 -mt-16">
                        <form className="max-w-4xl mx-auto bg-dark shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">




                            <div className="grid md:grid-cols-2    gap-8">
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Full Name</label>
                                    <input name="name" type="text" className="bg-transparent  border-border  focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all" onChange={handleChange} placeholder="Enter name" />
                                </div>
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">E-mail</label>
                                    <input name="email" type="text" className="bg-transparent  border-border  focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all" onChange={handleChange} placeholder="Enter last name" />
                                </div>

                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Password</label>
                                    <input name="password" type="password" className="bg-transparent  border-border  focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all" onChange={handleChange} placeholder="Enter password" />
                                </div>
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Role</label>
                                    <select name="role" id="" className="bg-transparent border-border focus:bg-transparent w-full text-sm text-white/60 px-4 py-3 rounded-md border-2 transition-all" onChange={handleChange}>
                                        <option value="client" className="bg-gray-900 hover:bg-white text-white">Client</option>
                                        <option value="admin" className="bg-gray-900 text-white">Admin</option>
                                    </select>
                                </div>


                            </div>
                            <div className="mt-8">
                                <button type="button" onClick={handleSubmit} className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-darker/70 border border-border hover:bg-[#EEBB07] duration-700 focus:outline-none">
                                    {loading ? <><Spinner/> creating... </> : 'create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
