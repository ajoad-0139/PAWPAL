import React from 'react'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TransportHero = () => {
  const { ref, inView } = useInView({ triggerOnce:true, threshold: 0.5 });

  return (
    <div className="w-[40%] h-full flex justify-start items-start pt-[5%] pl-[10%]">
        <div className="relative">
            <motion.div 
                ref={ref}
                initial={{ opacity: 0, x: -50}}
                animate={inView?{opacity:1,x:0}:{opacity:0, x:-50}}
                transition={{ duration: 1.2, ease: "easeOut", delay: 2 * 0.3 }}
                className="w-[250px] h-[350px] bg-[url('https://i.pinimg.com/736x/31/87/e2/3187e244a65cf294cd2b8bddafea0947.jpg')]  bg-cover  absolute inset-0"

            >
                {/* <img className='w-full h-full object-cover relative' src="https://i.pinimg.com/736x/31/87/e2/3187e244a65cf294cd2b8bddafea0947.jpg" alt="" /> */}
                <motion.div 
                ref={ref}
                initial={{ opacity: 0, x: 50}}
                animate={inView?{opacity:1,x:0}:{opacity:0, x:50}}
                transition={{ duration: 1.2, ease: "easeOut", delay: 4 * 0.3 }}
                className="w-[250px] h-[350px] bg-red-600 relative top-[70%] left-[70%]"
                >
                 <img className='w-full h-full object-cover relative' src="https://i.pinimg.com/736x/88/46/3f/88463f0b75f83cd2e0617073e2fff944.jpg" alt="" />
                </motion.div>
            </motion.div>
        </div>
    </div>
  )
}

export default TransportHero
