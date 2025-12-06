import React, { useEffect, useState } from 'react'
import AnimatedSection from '../Utils/AnimatedSection'

const CreateBlogCard = ({index}) => {
    const [width, setWidth]=useState(33);
    useEffect(()=>{
        const temp =(Math.floor(index/3))%3;
        if(temp===index%3) {
            setWidth(25)
        }
        console.log(width, temp, index%3);
    },[])
  return (
    <div style={{width:`${width}%`}} className={`h-[240px] relative shrink-0 border-4 border-white group hover:border-blue-500 bg-neutral-900 rounded-xl overflow-hidden group`}>
            <img className='w-full h-full group-hover:scale-125 transition-transform duration-700 object-cover object-top' src="https://c4.wallpaperflare.com/wallpaper/530/621/150/slam-dunk-basketball-comic-art-hd-wallpaper-preview.jpg" alt="" />
            <div className="absolute w-full h-full inset-0">
              <div className="w-full h-full bg-neutral-950/30 group-hover:backdrop-blur-xs  flex justify-between p-[10px] ">
                <div className="w-[45%] h-full  hidden group-hover:flex">
                  <AnimatedSection isRepeated={true}>
                    <p className='text-white font-bold w-full h-full overflow-hidden'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur similique illo 
                        inventore ex illum voluptatum excepturi! Illum dolorem, cupiditate blanditiis assumenda 
                        deserunt quibusdam expedita atque recusandae reiciendis quae sapiente nam.
                    </p> 
                  </AnimatedSection>
                </div>
                <div className="w-[40%] h-full group-hover:hidden"></div>
                <div className="w-[50%] h-full  flex flex-col justify-end items-end p-[20px] gap-[10px]">
                  <button className="group/button border-2 rounded-md text-lg font-bold hover:border-blue-500 px-4 py-1 cursor-pointer border-blue-400">
                    <span className="text-blue-400 group-hover/button:text-white">V</span>
                    <span className="text-white group-hover/button:text-blue-400">ie</span>
                    <span className="text-blue-400 group-hover/button:text-white">w</span>
                  </button>
                  <button className="group/button border-2 rounded-md text-lg font-bold hover:border-red-500 px-4 py-1 cursor-pointer border-red-400">
                    <span className="text-red-400 group-hover/button:text-white">De</span>
                    <span className="text-white group-hover/button:text-red-400">le</span>
                    <span className="text-red-400 group-hover/button:text-white">te</span>
                  </button>
                </div>
              </div>
            </div>
        </div>
  )
}

export default CreateBlogCard
