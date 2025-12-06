import React from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/footer.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { setIsShowGetStarted } from '@/Store/Utils'

const Footer = ({isTransport=false}) => {
    const dispatch = useDispatch()
      useEffect(()=>console.log('footer'))
    
  return (
    <div className={`w-full ${isTransport?'h-full':'min-h-[420px]'}  bg-gray-900 relative mt-[20%]`}>
      <div className="inset-0 absolute w-full h-full ">
        <div className="w-[70%] text-white flex justify-between h-[300px] bg-gradient-to-tr from-purple-900 via-black to-purple-900 relative top-[-33%] left-[15%] rounded-xl">
            <div className="h-full w-[60%] flex flex-col gap-[20px] pl-[10px]">
                <h1 className="text-5xl  font-extrabold">
                Safe & Stress-Free <span className="text-purple-400">Pet Adoption</span> & Travel
                </h1>
                <p className="text-lg text-gray-300">
                Connecting pets with loving homes & ensuring smooth, hassle-free travel experiences. Because every paw matters! 🐾
                </p>
                <button
                onClick={()=>dispatch(setIsShowGetStarted(true))}
                className="mt-6 self-start px-6 py-1 text-lg cursor-pointer hover:text-white font-semibold text-black bg-purple-400 hover:bg-purple-600 rounded-full shadow-lg transition"
                >
                Get Started
                </button>
            </div>
            <div className="h-full w-[30%] flex flex-col justify-end items-center">
                <div className="absolute bottom-10 right-10 w-60 h-60 object-cover flex justify-center items-center rounded-full shadow-lg border-4 border-purple-500">
                    <img className='w-[80%] h-[105%] mb-[-10px] object-cover' src={logo} alt="" />
                </div>
            </div>
        </div>
        <div className="w-full h-[200px] flex gap-[15%] relative top-[-26%] ">
        <div className="w-[50%] h-full text-white flex flex-col items-center">
            <div className="w-[50%] h-[150px]">
                <p className='gloria-hallelujah-regular'>"PawPal started with a simple mission: to ensure every pet finds a loving home and every journey is a safe adventure. From adoption to travel, we make pet parenting easier, one paw at a time!"</p>
            </div>
            <div className="w-[80%] flex-1 flex justify-end gap-[20px] self-end">
                <div className="flex-1 h-full flex justify-center gap-[20px]">
                    <p>{'Email : '}</p>
                    <p>pawpalbd@gmail.com</p>
                </div>
                <div className="flex-1 h-full flex justify-center gap-[20px]">
                    <p>{'Contact no. : '}</p>
                    <p>+8801738-099067</p>
                </div>
            </div>
        </div>
        <div className="w-[30%] h-full flex flex-col">

            <div className="w-full flex-1  flex justify-start gap-[20px] text-white text-md">
            <div className="flex-1 h-full  flex flex-col items-start gap-[5px]">
                <h1 className=' font-bold'>Quick links</h1>
                <Link className='hover:underline hover:text-lg'>Price</Link>
                <Link className='hover:underline hover:text-lg'>Resources</Link>
                <Link className='hover:underline hover:text-lg'>About</Link>
                <Link className='hover:underline hover:text-lg'>FAQ</Link>
                <Link className='hover:underline hover:text-lg'>Contact us</Link>
            </div>
            <div className="flex-1 h-full  flex flex-col items-start gap-[5px]">
                <h1 className=' font-bold'>Legal</h1>
                <Link className='hover:underline hover:text-lg'>Terms of service</Link>
                <Link className='hover:underline hover:text-lg'>Privacy policy</Link>
                <Link className='hover:underline hover:text-lg'>Cookie policy</Link>
            </div>
        </div>
        <div className="w-full h-[50px] text-white flex justify-end gap-[20px] mt-[10px]">
            <Link className='cursor-pointer hover:text-xl transition-transform duration-500'>
                    <FontAwesomeIcon icon="fa-brands fa-facebook" />
                </Link>
                <Link className='cursor-pointer hover:text-xl transition-transform duration-500'>
                    <FontAwesomeIcon icon="fa-brands fa-youtube" />
                </Link>
                <Link className='cursor-pointer hover:text-xl transition-transform duration-500'>
                    <FontAwesomeIcon icon="fa-brands fa-instagram" />
                </Link>
                <Link className='cursor-pointer hover:text-xl transition-transform duration-500'>
                    <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                </Link>
        </div>

        </div>
        
    
      </div>
        
      </div>
      
    </div>
  )
}

export default Footer
