import { isShowGetStarted, setIsShowGetStarted } from '@/Store/Utils'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import CloudBox from '../Utils/CloudBox'

const GetStarted = () => {
    const modalRef = useRef(null);
    const currentGetStarted = useSelector(isShowGetStarted)
    const dispatch = useDispatch()
    useEffect(() => {
            const handleClickOutside = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                     dispatch(setIsShowGetStarted(false));
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [dispatch]);
  return (
    <div  className={` ${currentGetStarted?'flex':'hidden'} fixed z-50 top-0 bottom-0 left-0 right-0  flex flex-col  justify-center items-center gloria-hallelujah-regular`}>
      <div className="flex-1 w-full bg-neutral-950/70"></div>
      <div  className="w-full h-auto flex ">
        <div className="flex-1 h-full bg-neutral-950/70"></div>
            <div ref={modalRef} className="h-[500px] w-[1200px] p-[50px] border-2 flex justify-center items-center gap-[30px] border-neutral-300  backdrop-blur-lg">
                <CloudBox id={'Adopt'}/>
                <CloudBox id={'Make Transport'}/>
                <CloudBox id={'Create Blog'}/>
            </div>
        <div className="flex-1 h-full bg-neutral-950/70"></div>
      </div>
      <div className="flex-1 w-full bg-neutral-950/70"></div>
    </div>
  )
}

export default GetStarted
