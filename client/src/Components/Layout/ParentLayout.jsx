import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Toaster } from 'sonner'
import GetStarted from '../Modals/GetStarted'
import BlogShowContainer from '../Blog/BlogShowContainer'
import Loader from '../Utils/Loader'
import ShowTransportDetails from '../Transport/ShowTransportDetails'

const ParentLayout = () => {
    
  return (
    <div className='w-screen bg-[#EBE8DB] h-screen flex justify-center items-center'>
      <Toaster richColors expand={false} visibleToasts={3} position='bottom-center'/>
      <Loader/>
      {/* <ShowTransportDetails/> */}
      <BlogShowContainer/>
      <GetStarted/>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default ParentLayout
