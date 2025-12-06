import React from 'react'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ isRepeated,fromLeft, item}) => {
    const triggerOnce = isRepeated?false:true
    const initial = {opacity:0, x:-50}
    const { ref, inView } = useInView({ triggerOnce, threshold: 0.5 });
    const navigate = useNavigate()
    const handleService =()=>{
      navigate(`service/${item.id}`)
    }
  return (
    <motion.div
      ref={ref}
      initial={fromLeft?initial:{ opacity: 0, y: 50 }}
      animate={inView ? fromLeft?{opacity:1,x:0}: { opacity: 1, y: 0 } : fromLeft?{opacity:0,x:-50}: { opacity: 0, y: 50 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: item.id * 0.3 }}
      className={` relative w-[32%] overflow-hidden group h-[43%] rounded-xl ${item.id===1 || item.id===5?'mt-[5%]':''}`}
    >
      <img className='w-full h-full object-cover rounded-xl group-hover:scale-125 transition-transform duration-500' src={item.url} alt="" />
      <div className="absolute bg-gray-950/30 inset-0 top-0 left-0 right-0 bottom-0 gap-2 flex flex-col text-white justify-center items-center ">
        <p className='text-2xl font-bold'>{item.title}</p>
        <button onClick={handleService} className='gradient-shiny-button py-[2px] px-[3px] hidden group-hover:flex '>
            <p className='bg-black rounded-full w-full h-full px-4 pb-1'>view more</p>
        </button>
      </div>
    </motion.div>
  )
}

export default ServiceCard
