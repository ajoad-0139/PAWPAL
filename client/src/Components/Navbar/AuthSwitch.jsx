import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthSwitch = () => {
    const navigate = useNavigate()
  return (
    <div className='flex w-[160px] h-[40px] justify-center items-center gap-[5px]  border-[2px] border-neutral-900 rounded-xl hover:border-blue-500 self-end mb-[20px]'>
        <button onClick={()=>navigate('/auth/register')} className='tracking-wide font-bold cursor-pointer hover:text-blue-500 hover:text-lg transition-transform duration-1000'>SignUp</button>
        <p className='text-2xl'>/</p>
        <button onClick={()=>navigate('/auth/login')} className='tracking-wide font-bold cursor-pointer hover:text-blue-500 hover:text-lg transition-transform duration-1000'>SignIn</button>
    </div>
  )
}

export default AuthSwitch
