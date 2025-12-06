import { setTransportFrom } from '@/Store/Transport';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Transport = ({translate}) => {
  const [sourceAddress, setSourceAddress] = useState(null);
  const [sourceCity, setSourceCity]=useState(null);
  const [sourceState, setSourceState]=useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);
  const [destinationCity, setDestinationCity]=useState(null);
  const [destinationState, setDestinationState]=useState(null);
  const [purpose ,setPurpose]=useState(null);

  const dispatch = useDispatch()

  useEffect(()=>{
    if(sourceAddress && sourceCity && sourceState && destinationAddress && destinationCity && destinationState && purpose){
      const data = {sourceAddress, sourceCity, sourceState, destinationAddress, destinationCity, destinationState, purpose}
      dispatch(setTransportFrom({data, section:'travel'}))
    }

  },[sourceAddress, sourceCity, sourceState, destinationAddress, destinationCity, destinationState, purpose])
  return (
    <section style={{transform:`translateX(${translate}%)`}} className='transition-transform duration-500 shrink-0 w-full h-full rounded-4xl flex justify-between'>
        <div className="w-[40%] h-full rounded-3xl">
        <img src={'https://i.pinimg.com/736x/5e/a4/b3/5ea4b3a1b47cb04a70f2d0ca98dd0cb3.jpg'} className='w-full h-full rounded-3xl object-cover' alt="" />
        </div>
        <div className="w-[50%] h-full flex flex-col justify-start items-center pt-[40px] gap-[15px] text-white ">
            <input  value={sourceAddress} onChange={(e)=>setSourceAddress(e.target.value)} className='w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 pl-4 text-white placeholder:text-neutral-200' placeholder='Pickup Address' type="text" />
            <input value={sourceCity} onChange={(e)=>setSourceCity(e.target.value)} className='w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 pl-4 text-white placeholder:text-neutral-200' placeholder='Origin City' type="text" />
            <input value={sourceState} onChange={(e)=>setSourceState(e.target.value)} className='w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 pl-4 text-white placeholder:text-neutral-200' placeholder='Origin State' type="text" />
            <input value={destinationAddress} onChange={(e)=>setDestinationAddress(e.target.value)} className='w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 pl-4 text-white placeholder:text-neutral-200' placeholder='Destination Address' type="text" />
            <input value={destinationCity} onChange={(e)=>setDestinationCity(e.target.value)} className='w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 pl-4 text-white placeholder:text-neutral-200' placeholder='Destination City' type="text" />
            <input value={destinationState} onChange={(e)=>setDestinationState(e.target.value)} className='w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 pl-4 text-white placeholder:text-neutral-200' placeholder='Destination State' type="text" />
            <input value={purpose} onChange={(e)=>setPurpose(e.target.value)} className='w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 pl-4 text-white placeholder:text-neutral-200' placeholder='Relocation Purpose' type="text" />
        </div>
    </section>
  )
}

export default Transport
