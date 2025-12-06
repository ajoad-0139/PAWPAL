import { setTransportFrom } from '@/Store/Transport';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Pet = ({translate}) => {
    const [amount, setAmount]=useState(null);
    const [type, setType]=useState(null);
    const [gender, setGender]=useState(null);
    const [length, setLength]=useState(null);
    const [age, setAge]=useState(null);
    const [width, setWidth]=useState(null);
    const [height, setHeight]=useState(null);
    const [breed, setBreed] = useState(null);

    const dispatch = useDispatch();

    useEffect(()=>{
     if(amount && type && gender && length && age && width && height && breed){
        const data = {amount, type ,gender, length, age, width, height, breed}
        dispatch(setTransportFrom({data, section:'pet'}))
     }
    },[amount, type, gender, length, age, width, height, breed])
  return (
    <section style={{transform:`translateX(${translate}%)`}} className='transition-transform duration-500 shrink-0 w-full h-full rounded-4xl flex justify-between'>
        <div className="w-[40%] h-full rounded-3xl">
        <img src={'https://i.pinimg.com/736x/ad/e6/0f/ade60f7acf4880af7bcb2e8452a188bf.jpg'} className='w-full h-full rounded-3xl object-cover' alt="" />
        </div>
        <div className="w-[50%] h-full flex flex-col justify-start items-center pt-[20px]  gap-[15px] text-white ">
            <select value={amount} onChange={(e)=>setAmount(e.target.value)}  className=' shrink-0 w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 px-4 text-white placeholder:text-neutral-200' placeholder='email' type="text">
                <option disabled selected hidden value="">Number of Pets</option>
                <option className='text-black' value="1">1</option>
                <option className='text-black'  value="2">2</option>
            </select>
            <select value={type} onChange={(e)=>setType(e.target.value)}  className='shrink-0 w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 px-4 text-white placeholder:text-neutral-200' placeholder='email' type="text">
                <option disabled selected hidden value="">Pet Type</option>
                <option className='text-black' value="Cat">Cat</option>
                <option className='text-black'  value="Dog">Dog</option>
                <option className='text-black'  value="Rabbit">Rabbit</option>
                <option className='text-black'  value="Bird">Bird</option>
                <option className='text-black'  value="others">others</option>
            </select>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}  className='shrink-0 w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 px-4 text-white placeholder:text-neutral-200' placeholder='email' type="text">
                <option disabled selected hidden value="">Pet's Gender</option>
                <option className='text-black' value="Male">Male</option>
                <option className='text-black'  value="Female">Female</option>
            </select>
            <input value={breed} onChange={(e)=>setBreed(e.target.value)} className='shrink-0 w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 pl-4 text-white placeholder:text-neutral-200' placeholder='Pet Breed' type="text" />
            <select value={length} onChange={(e)=>setLength(e.target.value)}  className='shrink-0 w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 px-4 text-white placeholder:text-neutral-200' placeholder='email' type="text">
                <option disabled selected hidden value="">Pet's Length</option>
                {
                    Array.from({length:60}).map((_, index)=><option className='text-black' value={`${index+1}`}>{index+1}</option>)
                }
            </select>            
            <select value={age} onChange={(e)=>setAge(e.target.value)} className='shrink-0 w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 px-4 text-white placeholder:text-neutral-200' placeholder='email' type="text">
                <option disabled selected hidden value="">Pet's Age</option>
                {
                    Array.from({length:30}).map((_, index)=><option className='text-black' value={`${index+1}`}>{index+1}</option>)
                }
            </select>            
            <select value={width} onChange={(e)=>setWidth(e.target.value)} className='shrink-0 w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 px-4 text-white placeholder:text-neutral-200' placeholder='email' type="text">
                <option disabled selected hidden value="">Pet's Width</option>
                {
                    Array.from({length:60}).map((_, index)=><option className='text-black' value={`${index+1}`}>{index+1}</option>)
                }
            </select>            
            <select value={height} onChange={(e)=>setHeight(e.target.value)} className='shrink-0 w-[80%] h-[40px] rounded-lg border-[1px] outline-blue-600 border-neutral-300 px-4 text-white placeholder:text-neutral-200' placeholder='email' type="text">
                <option disabled selected hidden value="">Pet's Height</option>
                {
                    Array.from({length:60}).map((_, index)=><option className='text-black' value={`${index+1}`}>{index+1}</option>)
                }
            </select>            
           
        </div>
    </section>
  )
}

export default Pet
