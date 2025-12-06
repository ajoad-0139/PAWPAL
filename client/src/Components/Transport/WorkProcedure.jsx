import React from 'react'
import data from '@/data/TransportCard'
import SingleWorkProcedure from './SingleWorkProcedure'
const WorkProcedure = () => {
  return (
    <div className='w-full h-full flex flex-col gap-[30px] mt-[50px] items-center '>
      <p className='text-2xl gloria-hallelujah-regular font-bold'>Our working procedure</p>
      <div className="w-[80%] flex-1 shrink-0 flex ">
        {
            data.map((item)=><div className='h-auto flex-1 shrink-0'><SingleWorkProcedure item={item}/></div>)
        }
      </div>
    </div>
  )
}

export default WorkProcedure
