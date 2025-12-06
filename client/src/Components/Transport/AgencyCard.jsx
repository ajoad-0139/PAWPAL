import React from 'react'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from 'react-router-dom';

const AgencyCard = ({ isRepeated,fromLeft, item}) => {
    const triggerOnce = isRepeated?false:true
    const initial = {opacity:0, x:-50}
    const { ref, inView } = useInView({ triggerOnce, threshold: 0.5 });
    const navigate = useNavigate()
    const handleService =()=>{
      navigate(`agency/${item.id}`)
    }
  return (
    <motion.div
      ref={ref}
      initial={fromLeft?initial:{ opacity: 0, y: 50 }}
      animate={inView ? fromLeft?{opacity:1,x:0}: { opacity: 1, y: 0 } : fromLeft?{opacity:0,x:-50}: { opacity: 0, y: 50 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: item.id * 0.3 }}
      className={` relative w-[15%] h-[80%] overflow-hidden group  group rounded-md hover:shadow-neutral-600 hover:shadow-xl  hover:h-[90%] transform-transition duration-300 ${item.id&1?'self-start':'self-end'}`}
    >
      <img className='w-full h-full object-cover rounded-xl group-hover:scale-125 transition-transform duration-500' src={item.img} alt="" />
      <div className="absolute bg-gray-950/30 inset-0 top-0 left-0 right-0 bottom-0 gap-2 flex flex-col text-white justify-end pb-[20%] items-center ">
        <p className='text-2xl font-bold'>{item.title}</p>
        <button onClick={handleService} className='px-6 hidden transition-colors duration-100 py-1 rounded-md cursor-pointer hover:bg-purple-800 font-semibold text-white bg-purple-600 group-hover:flex justify-center items-center'>
            <p className='text-lg '>Details</p>
        </button>
      </div>
    </motion.div>
  )
}

export default AgencyCard
