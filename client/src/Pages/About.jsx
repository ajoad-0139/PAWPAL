import Hero from '@/Components/About/Hero'
import Mission from '@/Components/About/Mission'
import WhatWeDo from '@/Components/About/WhatWeDo'
import Footer from '@/Components/Home/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const About = () => {
  return (
    <div className='w-full h-full pt-[130px] overflow-y-scroll'>
      <Hero/>
      <Mission/>
      <WhatWeDo/>
      <Footer/>
    </div>
  )
}

export default About
