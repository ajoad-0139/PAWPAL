import React, { useEffect , useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isNavBgWhite, scrollY, setIsNavBgWhite, setScrollY } from '../Store/Utils'
import myImage from '../assets/blogSide.png'
import { Button } from '@/Components/ui/button'
import StaticDataSegment from '@/Components/Adoption/StaticDataSegment'
import AdoptionNavbar from '@/Components/Adoption/AdoptionNavbar'
import AdoptionLayout from '@/Components/Layout/AdoptionLayout'

const Adoption = () => {
  const scrollRef =useRef(null)
    const dispatch = useDispatch();
    const currentScrollY = useSelector(scrollY);

    const handleScroll = ()=>{
      const scrollY = scrollRef.current.scrollTop;
      if(scrollY>currentScrollY ) dispatch(setIsNavBgWhite(true))
      else if(scrollY<currentScrollY) dispatch(setIsNavBgWhite(false))
      dispatch(setScrollY(scrollY))
    }
  return (
    <div className="flex flex-col h-full w-full overflow-y-scroll scrollbar-hidden bg-[#EBE8DB] px-14">
      <AdoptionLayout/>
    </div>
  )
}

export default Adoption