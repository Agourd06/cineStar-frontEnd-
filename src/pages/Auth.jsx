import React, { useContext, useEffect, useState } from 'react'
import LoginForm from '../components/authForms/LoginForm'
import image from '/backgroundLogin.png';
import RegisterForm from '../components/authForms/RegisterForm';
import { useNavigate, useParams } from 'react-router-dom';
import ForgotPassword from '../components/authForms/ForgotPassword';
import ResetPassword from '../components/authForms/ResetPassword';
import AuthContext from '../context/AuthContext';

export default function Login() {
  const { type } = useParams()
 const [form , setForm] = useState(type ||'login')
 const { isAuthenticated } = useContext(AuthContext)
 const navigate = useNavigate()

if(isAuthenticated) return navigate('/')

  const forms = {
    register : <RegisterForm setForm={setForm}/> ,
    login : <LoginForm setForm={setForm}/> ,
    forgot : <ForgotPassword setForm={setForm}/> ,
    reset : <ResetPassword setForm={setForm}/>,
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
