import React, { useEffect, useState } from 'react'
import LoginForm from '../components/authForms/LoginForm'
import image from '/backgroundLogin.png';
import RegisterForm from '../components/authForms/RegisterForm';

export default function Login() {
 const [form , setForm] = useState(true)
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className='flex justify-center items-center h-screen w-screen font-sans' style={{
      backgroundImage: `url(${image})`,
      backgroundSize: '100%',
    }}>
      <div className="w-full max-w-md ">
        
      
        {form ? <LoginForm setForm={setForm}/> : <RegisterForm setForm={setForm}/>}

      </div>

    </div>
  )
}
