import React, { useContext, useState } from 'react'
import { validateField } from '../../validation/AuthValidation';
import Inputs from './Inputs';
import { AlertContext } from '../../App';

export default function Forgot({setForm}) {
    const [formData, setFormData] = useState({
        email: '',
    });

    const alert = useContext(AlertContext)
    // const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setError('')
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailError = validateField('email', formData.email, setError);


        if (emailError) {
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                }),
            });

            if (!response.ok) {
                throw new Error('Invalid email');
            }
            alert('success' , "in a While You can Check you email for Reset Password")
        } catch (error) {
            setError('Invalid email');
            console.error('Login error:', error);
        }
    };
    return (
        <div className='border bg-black shadow-[#EEBB07] rounded-lg p-6 max-w-md shadow-md border-[#EEBB07] max-md:mx-auto'>
            <form onSubmit={handleSubmit}>

                <div className='w-full flex justify-center'>
                    <img src='/logo.png' className='w-36 h-36' />
                </div>
                <h3 className="text-white text-center text-3xl font-extrabold mb-8 mt-4">
                    Forgot Password
                </h3>

                {error && <p className='text-red-600'>{error}</p>}
                <Inputs type='text' name='email' placeholder='Email' onChange={handleChange} />
                <div className="text-center">
                    <p className="text-sm mt-4 text-white">Do you remembre you Password ? <a href='/auth/login'
                        className="text-[#EEBB07] font-semibold hover:underline ml-1 whitespace-nowrap">Back to login</a></p>
                </div>
                <div className='flex justify-center mt-3'>
                    <button type='submit'
                        className="h-fit text-white w-fit px-[1em] py-[0.25em] hover:text-[#EEBB07] border-[1px] border-gray-700 rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-300 backdrop-blur-[12px]"
                    >
                        <p className='duration-300'>Login</p>
                        <i className='bx bxs-log-in-circle  group-hover:translate-x-[10%] duration-300' ></i>

                    </button>
                </div>

            </form>
        </div>)
}
