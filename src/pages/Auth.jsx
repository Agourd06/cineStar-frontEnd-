import React, { useEffect, useState } from 'react'
import LoginForm from '../components/authForms/LoginForm'
import image from '/backgroundLogin.png';
import RegisterForm from '../components/authForms/RegisterForm';
import { useParams } from 'react-router-dom';
import Forgot from '../components/authForms/forgot';

export default function Login() {
  const { type } = useParams()
 const [form , setForm] = useState(type ||'login')
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const forms = {
    register : <RegisterForm setForm={setForm}/> ,
    login : <LoginForm setForm={setForm}/> ,
    forgot : <Forgot setForm={setForm}/> ,
    reset : <></>,
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen font-Didot' style={{
      backgroundImage: `url(${image})`,
      backgroundSize: '100%',
    }}>
      <div className="w-full max-w-md ">
        
      
       {
        forms[form]
       }

      </div>

    </div>
  )
}
