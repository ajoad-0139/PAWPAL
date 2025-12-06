import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WhatWeDo = () => {
  return (
    <>
     <section className='w-full h-[100px] mt-[50px] flex flex-col items-center justify-center'>
        <p className=' uppercase text-4xl font-montserrat font-semibold mr-[10%]'>What we do!</p>
      </section>
      <section className='w-full h-[360px] flex justify-end pr-[5%] items-center gap-[30px]'>
        <div className="w-[30%] h-[80%] hover:border-[1px] border-blue-400 rounded-sm flex flex-col items-start gap-[20px] p-[10px]">
          <FontAwesomeIcon icon="fa-solid fa-paw" className='text-5xl' />
          <p className='text-2xl font-semibold font-montserrat'>Pet Adoption</p>
          <p>We help you find your new best friend from a network of verified shelters and individuals. Filter by breed, size, and location—and meet your new companion today.</p>
        </div>
        <div className="w-[30%] h-[80%] hover:border-[1px] border-blue-400 rounded-sm flex flex-col items-start gap-[20px] p-[10px]">
          <FontAwesomeIcon icon="fa-solid fa-train-tram" className='text-5xl' />          <p className='text-2xl font-semibold font-montserrat'>Pet Transport</p>
          <p>Whether you're relocating or adopting from afar, PawPal connects you with trusted transport agencies to move pets safely, humanely, and affordably.</p>
        </div>
      </section> 
    </>
  )
}

export default WhatWeDo
