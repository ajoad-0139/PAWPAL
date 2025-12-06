import React from 'react'
import { useEffect } from 'react'
import TransportHero from './TransportHero'
import TransportDetailsCard from './TransportDetailsCard'
import CircularBanner from './TransportCompanyBanner'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedSection from '../Utils/AnimatedSection';

const TransportSegment = () => {
    const { ref, inView } = useInView({ triggerOnce:true, threshold: 0.5 });
      useEffect(()=>console.log('transport'))
    
  return (
    <div className="w-full h-auto flex flex-col">
        <div className='w-full h-auto flex pt-[5%] '>
            <TransportHero/>
            <div className="flex-1 h-full flex flex-col justify-start items-center pt-[10%] gloria-hallelujah-regular">
                <AnimatedSection fromLeft={true}>
                    <p className='text-2xl font-bold m-[-30px]'>Because Every Pet Deserves a Smooth Ride Home</p>
                </AnimatedSection>
                <AnimatedSection fromLeft={true}>
                    <p className='text-xl m-[-35px]'>&</p>
                </AnimatedSection>
                <AnimatedSection >
                    <p className='text-xl font-bold m-[-30px]'>Here's how we do it</p>
                </AnimatedSection>
                <motion.div 
                    ref={ref}
                    initial={{ opacity: 0, x: 100}}
                    animate={inView?{opacity:1,x:0}:{opacity:0, x:100}}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 2 * 0.3 }}>
                    <TransportDetailsCard/>
                </motion.div>
            </div>
        </div>
        <div className="w-full h-[100px] flex justify-center items-end mb-[-40px]">
            <p className='text-3xl font-bold gloria-hallelujah-regular'>Company's we offer</p>
        </div>
        <div className="w-full h-[100px]  mt-[60px] px-[5%]">
            <CircularBanner/>
        </div>
    </div>
  )
}

export default TransportSegment
