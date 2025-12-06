import React from 'react'
import { Outlet } from 'react-router-dom'
import StaticDataSegment from '../Adoption/StaticDataSegment'
import AdoptionNavbar from '../Adoption/AdoptionNavbar'
import Footer from '../Home/Footer'


const AdoptionLayout = () => {
  return (
    <main>
      <StaticDataSegment/>
      <AdoptionNavbar/>
      <Outlet/>
      <Footer/>
    </main>
  )
}

export default AdoptionLayout