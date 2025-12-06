import React, { useEffect } from 'react'
import AnimatedSection from '../Utils/AnimatedSection'
import gif from '../../assets/gif01.gif'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { user } from '@/Store/Auth'

const VideoSegment = () => {
  const currentUser = useSelector(user)
  useEffect(()=>console.log('video'))
  const navigate  = useNavigate()
  return (
    <div className="w-full shrink-0 h-screen flex flex-col ">
     <div className="relative w-full flex-1"> {/* Adjust height as needed */}
      <video
        className=" absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={'https://cdn.pixabay.com/video/2021/06/13/77510-563001938_large.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="  absolute top-0 left-0 right-0 w-full h-full bg-gray-950/30 flex items-center">
        <div className=" w-[30%] h-full flex flex-col justify-center items-end">
            <AnimatedSection index={1}>
                <p className='gloria-hallelujah-regular text-4xl text-white'>Connecting paws</p>
            </AnimatedSection>
            <AnimatedSection index={4}>
                <p className='gloria-hallelujah-regular text-7xl text-white font-extrabold'>With people!</p>
            </AnimatedSection>
        </div>
      </div>
    </div>
    <div className="w-full h-[120px] flex justify-start items-center gap-[30px] px-[40px] bg-gradient-to-tr from-gray-800 via-gray-900 to-gray-800">
      {/* {
        Array.from({length:14},()=><img className='h-full w-auto' src={gif} alt="" />)
      } */}
      <button onClick={()=>navigate('/adoption')} className='gradient-shiny-button'>
        <span>Adopt a paw</span>
      </button>
      <button onClick={()=>navigate('/transport/booking')} className='gradient-shiny-button'>
        <span>Book a ride</span>
      </button>
      {
        currentUser?
        <button onClick={()=>navigate('/blog/create')} className='gradient-shiny-button'>
          <span>Create a Blog</span>
        </button>
        :null
      }
    </div>
    </div>
  )
}

export default VideoSegment
