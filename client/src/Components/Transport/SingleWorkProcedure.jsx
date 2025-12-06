import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SingleWorkProcedure = ({item}) => {
  return (
    <div className={` transition-transform duration-500 shrink-0 w-full h-auto group relative rounded-2xl flex flex-col `}>
        <div className="h-auto w-full  p-[15px] rounded-t-2xl">
            <div className="w-full h-auto rounded-2xl bg-amber-300 relative">
                <div className="absolute inset-0 w-full h-full ">
                    <div className="relative w-[50px] h-[50px] rounded-full bg-red-600 top-[87%] left-[43%] flex justify-center items-center">
                        <p className='font-mono font-bold text-2xl text-white'>{item.id}</p>
                    </div>
                </div>
                <img className='w-full h-auto object-cover rounded-2xl' src={item.url}  alt="" />
            </div>
        </div>
        <div className=" flex-1 w-full  p-[15px] flex flex-col gap-[20px] justify-start items-center font-mono">
            <p className='font-bold text-lg'>{item.title}</p>
            <p className='w-full h-auto flex justify-center items-center'>{item.content}</p>
        </div>
    </div>
  )
}

export default SingleWorkProcedure
