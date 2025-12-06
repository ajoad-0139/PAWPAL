import { setTransportFrom } from '@/Store/Transport'
import React, { useEffect, useRef , useState} from 'react'
import { useDispatch } from 'react-redux'

const Documents = ({translate}) => {
    const fileInputRef1 = useRef(null)
    const fileInputRef2 = useRef(null)
    const fileInputRef3 = useRef(null)
    const fileInputRef4 = useRef(null)

    const [vacBookFront, setVacBookFront]=useState(null)
    const [vacBookBack, setVacBookBack]=useState(null)
    const [petPhotoStanding, setPetPhotoStanding]=useState(null)
    const [petPhotoSitting, setPetPhotoSitting]=useState(null)

    const handleVacBookFrontChange = (e)=>{
        const file = e.target?.files[0]
        if(file){
            setVacBookFront(file)
        }
    }
    const handleVacBookBackChange = (e)=>{
        const file = e.target?.files[0]
        if(file){
            setVacBookBack(file)
        }
    }
    const handleStanding = (e)=>{
        const file = e.target?.files[0]
        if(file){
            setPetPhotoStanding(file)
        }
    }
    const handleSitting = (e)=>{
        const file = e.target?.files[0]
        if(file){
            setPetPhotoSitting(file)
        }
    }
    const dispatch = useDispatch()
  useEffect(()=>{
    if(vacBookFront && vacBookBack && petPhotoStanding && petPhotoSitting){
        
        const data ={
            vacFront:vacBookFront,
            vacBack:vacBookBack,
            standing:petPhotoStanding,
            sitting:petPhotoSitting
        }

        dispatch(setTransportFrom({data, section:'document'}))
    }
  },[vacBookFront, vacBookBack, petPhotoStanding, petPhotoSitting])
  return (
    <section style={{transform:`translateX(${translate}%)`}} className=' transition-transform duration-500 shrink-0 w-full h-full rounded-4xl flex justify-between'>
        <div className="w-[40%] h-full rounded-3xl">
        <img src={'https://i.pinimg.com/736x/a2/35/a5/a235a5496fd915d05e52e8d5f130ba31.jpg'} className='w-full h-full rounded-3xl object-cover' alt="" />
        </div>
        <div className="w-[50%] h-full flex flex-col justify-start items-center pt-[40px] gap-[15px] text-white ">
            <div className="flex items-center border border-neutral-300 rounded-lg w-[80%] h-[40px] pl-4 bg-white text-black">
                <input
                    type="file"
                    ref={fileInputRef1}
                    className="hidden"
                    onChange={handleVacBookFrontChange}
                />
                <span className="flex-1 text-neutral-500 truncate">{vacBookFront?vacBookFront.name:'upload file'}</span>
                <button
                    type="button"
                    onClick={()=>fileInputRef1.current?.click()}
                    className="flex flex-1 items-center justify-center px-4 h-full bg-blue-700 hover:bg-blue-500 cursor-pointer text-white rounded-r-lg"
                >
                    Vaccination Book (Front)
                </button>
            </div>
            <div className="flex items-center border border-neutral-300 rounded-lg w-[80%] h-[40px] pl-4 bg-white text-black">
                <input
                    type="file"
                    ref={fileInputRef2}
                    className="hidden"
                    onChange={handleVacBookBackChange}
                />
                <span className="flex-1 text-neutral-500 truncate">{vacBookBack?vacBookBack.name:'upload file'}</span>
                <button
                    type="button"
                    onClick={()=>fileInputRef2.current?.click()}
                    className="flex flex-1 items-center justify-center px-4 h-full bg-blue-700 hover:bg-blue-500 cursor-pointer text-white rounded-r-lg"
                >
                    Vaccination Book (Back)
                </button>
            </div>
            <div className="flex items-center border border-neutral-300 rounded-lg w-[80%] h-[40px] pl-4 bg-white text-black">
                <input
                    type="file"
                    ref={fileInputRef3}
                    className="hidden"
                    onChange={handleStanding}
                />
                <span className="flex-1 text-neutral-500 truncate">{petPhotoStanding?petPhotoStanding.name:'upload file'}</span>
                <button
                    type="button"
                    onClick={()=>fileInputRef3.current?.click()}
                    className="flex flex-1 items-center justify-center px-4 h-full bg-blue-700  hover:bg-blue-500 cursor-pointer text-white rounded-r-lg"
                >
                    Pet Photo (Standing)
                </button>
            </div>
            <div className="flex items-center border border-neutral-300 rounded-lg w-[80%] h-[40px] pl-4 bg-white text-black">
                <input
                    type="file"
                    ref={fileInputRef4}
                    className="hidden"
                    onChange={handleSitting}
                />
                <span className="flex-1 text-neutral-500 truncate">{petPhotoSitting?petPhotoSitting.name:'upload file'}</span>
                <button
                    type="button"
                    onClick={()=>fileInputRef4.current?.click()}
                    className="flex flex-1 items-center justify-center px-4 h-full bg-blue-700 hover:bg-blue-500 cursor-pointer text-white rounded-r-lg"
                >
                    Pet Photo (Sitting)
                </button>
            </div>
        </div>
    </section>
  )
}

export default Documents
