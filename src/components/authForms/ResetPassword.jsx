import React, { useContext, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { validateField } from '../../validation/AuthValidation'
import Inputs from './Inputs';
import { AlertContext } from '../../App';
import Spinner from '../shared/Spinner';
export default function ResetPassword({ setForm }) {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const alert = useContext(AlertContext)

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
        const passwordError = validateField('password', formData.password, setError);


        if (passwordError) {
            return;
        }
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    confirmPassword: formData.confirmPassword,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                alert('warnning', "warnning problem in reseting Password please Try again");
                return
            }


            alert('success', "Passwored rested Successfully")




        } catch (error) {
            alert('error', "error reseting Password");
            console.error('Reset error:', error);
        } finally {
            setLoading(false)
            navigate('/auth/login')
        }
    };

    return (
        <div className='border bg-black shadow-[#EEBB07] rounded-lg p-6 max-w-md shadow-md border-[#EEBB07] max-md:mx-auto'>
            <form onSubmit={handleSubmit}>

                <div className='w-full flex justify-center'>
                    <img src='/logo.png' className='w-40 h-40' />
                </div>
                <h3 className="text-white text-3xl font-extrabold mb-8">
                    Sign in
                </h3>

                {error && <p className='text-red-600'>{error}</p>}
                <Inputs type='password' name='password' placeholder='Password' onChange={handleChange} />
                <Inputs type='password' name='confirmPassword' placeholder='confirm Password' onChange={handleChange} />
                <div className="text-center">
                    <p className="text-sm mt-4 text-white">Do you remembre your Password ? <a href='/auth/login'
                        className="text-[#EEBB07] font-semibold hover:underline ml-1 whitespace-nowrap">Back to login</a></p>
                </div>
                <div className='flex justify-center mt-3'>
                    <button type='submit'
                        className="h-fit text-white w-fit px-[1em] py-[0.25em] hover:text-[#EEBB07] border-[1px] border-gray-700 rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-300 backdrop-blur-[12px]"
                    >
                       
                       {loading ? <><Spinner className="mr-2" size={4} /> Resting Password ...</> :
                            <>
                                <p className='duration-300'>Reset</p>
                                <i className='bx bxs-log-in-circle  group-hover:translate-x-[10%] duration-300' ></i>
                            </>}

                    </button>
                </div>

            </form>
        </div>
    )
}