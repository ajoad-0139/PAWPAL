import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsShowGetStarted } from '@/Store/Utils';
import tran from '../../assets/tran.png'
import apt from '../../assets/apt.png'
import blog from '../../assets/blog.png'

const CloudBox = ({id}) => {
    const [url, setUrl] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleNavigate = ()=>{
        dispatch(setIsShowGetStarted(false))
        if(id==='Make Transport') navigate('/transport/booking')
        if(id==='Adopt')navigate('adoption/request')
        else if(id==='Create Blog') navigate('/blog/create')
    }
    useEffect(()=>{
        if(id==='Adopt') setUrl(apt)
        else if(id==='Make Transport') setUrl(tran)
        else setUrl(blog)
    },[])
  return (
    <button onClick={handleNavigate} className="h-[180px] rounded-xl border-2 group border-neutral-200 hover:border-blue-700 w-[280px] group cursor-pointer relative flex bg-gray-800 justify-start items-center p-[20px] gap-[30px]">
        
        <div className="w-[100px] h-[100px] p-[10px] border-2 group-hover:border-blue-700 border-neutral-200 rounded-full">
            <img className='w-full h-full rounded-full object-cover' src={url} alt="" />
        </div>
        <div className="w-[40%] h-full flex justify-center items-center">
            <p className='text-white'>{id}</p>
        </div>
        
    </button>
  );
};

export default CloudBox;
