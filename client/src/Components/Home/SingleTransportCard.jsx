import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SingleTransportCard = ({item, setTranslate, translate}) => {
    useEffect(()=>console.log(translate))
  return (
    <div style={{transform: `translateX(${translate}px)`}} className={` transition-transform duration-500 shrink-0 w-full h-full group relative rounded-2xl flex flex-col`}>
        <div className="h-[60%] w-full  p-[15px] rounded-t-2xl">
            <div className="w-full h-full rounded-2xl bg-amber-300 relative">
                <div className="absolute inset-0 w-full h-full ">
                    <div className="relative w-[50px] h-[50px] rounded-full bg-red-600 top-[87%] left-[43%] flex justify-center items-center">
                        <p className='font-mono font-bold text-2xl text-white'>{item.id}</p>
                    </div>
                </div>
                <img className='w-full h-full object-cover rounded-2xl' src={item.url}  alt="" />
            </div>
        </div>
        <div className=" flex-1 w-full  p-[15px] flex flex-col gap-[20px] justify-start items-center font-mono">
            <p className='font-bold text-lg'>{item.title}</p>
            <p className='w-full h-auto flex justify-center items-center'>{item.content}</p>
        </div>
        <div className=" absolute inset-0 ">
            <div className="relative w-full h-full hidden group-hover:flex justify-center items-end pb-[5%]">
                <div className="w-[80%] h-[40px] flex justify-between items-center">
                    
                    {
                        item.id===1?
                        <div>

                        </div>
                        : <button onClick={()=>setTranslate(translate+340)} className='cursor-pointer'>
                        <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                    </button>
                    }
                    {
                        item.id===4?
                        <div>

                        </div>
                        : <button onClick={()=>setTranslate(translate-340)} className='cursor-pointer'>
                            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                        </button>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleTransportCard
