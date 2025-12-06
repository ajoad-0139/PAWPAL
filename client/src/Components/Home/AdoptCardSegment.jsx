import React from 'react'
import { useEffect } from 'react';
import AdoptCard from './AdoptCard';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrollAnimatedCurve from '../Utils/ScrollAnimatedCurve';

const AdoptCardSegment = () => {
  const triggerOnce = true
  const { ref, inView } = useInView({ triggerOnce, threshold: 0.5 });
    useEffect(()=>console.log('adopt'))
  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center pt-[5%] gap-[50px]'>
      <div className="w-[65%] h-[35%] flex gap-[10px] justify-center">
        {
          Array.from({length:5}).map((_,index)=><AdoptCard index={index}/>)
        }
        <motion.div 
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } :{ opacity: 0, y: 50 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 3 * 0.3 }}
              className={`w-[18%] h-[90%] sm:w-[48%] md:w-[30%] lg:w-[18%]  relative rounded-lg overflow-hidden group self-end cursor-pointer`}
        >
          <div className="absolute inset-0 group">
            <div className="w-full h-full relative rounded-xl flex bg-neutral-950/30 justify-center items-end border-[#ff3b94] border-[1px] hover:border-[3px] transition-colors duration-500">
              <p className='font-mono font-semibold text-2xl mb-[5px] text-white group-hover:font-bold group-hover:tracking-wide transition-all duration-500 group-hover:text-[#ff3b94]'>View More</p>
            </div>
          </div>
          <img src="https://i.pinimg.com/736x/47/87/41/478741b46adba9b9a52a702687619b2f.jpg" className='w-full h-full rounded-xl' alt="" />
        </motion.div>
      </div>
      <div className="w-full h-auto flex justify-end items-center ">
        <ScrollAnimatedCurve/>
        <motion.div 
                ref={ref}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } :{ opacity: 0, x: 50 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 2 * 0.3 }}
                className="w-[30%] flex justify-end items-center h-auto pr-[5%] ml-[-10%]"
        >
              <div className="w-full h-auto">
                  <img className='w-full h-full object-cover' src="https://media.tenor.com/IhOTw9cvsTIAAAAi/adopt-adoption.gif" alt="" />
                </div> 
        </motion.div>
      </div>
      {/* <div className="w-full flex justify-end items-center h-auto pr-[5%]">
        <div className="w-[30%] h-auto">
          <img className='w-full h-full object-cover' src="https://media.tenor.com/IhOTw9cvsTIAAAAi/adopt-adoption.gif" alt="" />
        </div>
      </div> */}
    </div>
  )
}

export default AdoptCardSegment;
