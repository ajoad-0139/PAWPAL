import React from 'react'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AdoptCard = ({index, isRepeated,fromLeft}) => {
  const triggerOnce = isRepeated?false:true
  const initial = {opacity:0, x:-50}
  const { ref, inView } = useInView({ triggerOnce, threshold: 0.5 });

  return (
    <motion.div 
      ref={ref}
      initial={fromLeft?initial:{ opacity: 0, y: 50 }}
      animate={inView ? fromLeft?{opacity:1,x:0}: { opacity: 1, y: 0 } : fromLeft?{opacity:0,x:-50}: { opacity: 0, y: 50 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.3 }}
      className={`w-[18%] h-[90%] sm:w-[48%] md:w-[30%] lg:w-[18%]  relative rounded-lg overflow-hidden group  ${index&1?'self-start':'self-end'}`}
      >
      <img 
        src="https://i.pinimg.com/736x/af/0a/fc/af0afc65ad3d5da33bf23c104bbae663.jpg" 
        className='w-full h-full object-cover'
        alt="Adoption candidate" 
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex flex-col justify-end p-4">
        <div className="translate-y-[82%] group-hover:translate-y-0 transition-all duration-300 text-white">
          <h3 className="text-lg font-bold">Pet Name</h3>
          <p className="text-sm">Age: 2 years</p>
          <button className="mt-2 bg-blue-500 text-white px-2 py-1 hover:cursor-pointer rounded hover:bg-blue-600 transition-colors">
            Adopt Me
          </button>
        </div>
      </div>
    </motion.div>
    )
}

export default AdoptCard
