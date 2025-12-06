import React from 'react'
import CompanyBanner from '../../data/CompanyBanner'
import AgencyCard from './AgencyCard'

const Agencies = () => {
  return (
    <div className='w-full h-full flex flex-col justify-start gap-[100px] items-start pt-[5%] mt-[100px] px-[10%]'>
      {/* <div style={{ backgroundImage: `url(${gif})` }} className={` bg-no-repeat w-[30%] h-full flex flex-col justify-center items-center `}> */}
      <div  className={` h-[100px] bg-no-repeat w-[70%]  flex  justify-end items-center `}>
        <p className=' animate-bounce text-3xl gloria-hallelujah-regular'>Pick Your Agency!</p>
      </div>
      <div className="w-full h-[50%]  flex gap-2 justify-start items-center ">
        {
            CompanyBanner.map((item)=><AgencyCard item={item}/>)
        }
      </div>
    </div>
  )
}

export default Agencies
