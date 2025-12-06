import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FeatureSingleCard from './FeatureSingleCard'


const FeaturePostContainer = ({featuredBlogs}) => {
    const [translate, setTranslate] = useState(0)
    const arrayLen = 9;
    const handleMoveLeft = ()=>{
        if(translate-4>=0) setTranslate(translate-4);
    }
    const handleMoveRight = ()=>{
        if(translate+4<=arrayLen){setTranslate(translate+4)}  
    }
    useEffect(()=>console.log(featuredBlogs, 'featuredBlogs'))
  return (
    <div className='w-full h-[700px] flex justify-center mt-[70px] pt-[3%]'>
      <div className="flex max-w-[1400px] min-[1400px]:max-w-[1050px] min-[1600px]:max-w-[1400px]  h-[420px] overflow-x-scroll scrollbar-hidden cursor-grab relative">
      <button onClick={handleMoveLeft} className='absolute left-0 top-[35%] translate-y-[-50%] w-[30px] h-[80px] hover:bg-white cursor-pointer bg-white/80 z-10'>
        <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
      </button>        
      <button onClick={handleMoveRight} className='absolute right-0 top-[35%] translate-y-[-50%] w-[30px] h-[80px] bg-white/80 cursor-pointer hover:bg-white z-10 flex items-center justify-center'>
        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
      </button> 
      {
        featuredBlogs.map((item)=><FeatureSingleCard translate={translate} item={item}/>)
      }       
      </div>
    </div>
  )
}

export default FeaturePostContainer 
