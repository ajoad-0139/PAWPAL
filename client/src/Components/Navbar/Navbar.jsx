import React, { useEffect, useState } from 'react'
import { getSpecificBlogs, setBlogTabIndex } from '@/Store/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { isNavBgWhite, isOnHoverNavLink, setIsNavBgWhite, setIsOnHoverNavLink } from '../../Store/Utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser, setUser, user } from '@/Store/Auth'
import AuthSwitch from './AuthSwitch'
import data from '../../data/hoverCard'
import { LogOut } from 'lucide-react'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentIsOnHoverNavLink = useSelector(isOnHoverNavLink)
    
    const currentUser = useSelector(user);
    
    const handleLogout = async ()=>{
      // localStorage.removeItem('user')
      // dispatch(setUser(null))
      const data = await dispatch(logoutUser())
      console.log(data)
    }
    const handleClick = (index)=>{
            const types = ['adoption','breeds', 'health and wellness', 'training','others']
            dispatch(setBlogTabIndex(index))
            dispatch(getSpecificBlogs({type:types[index-1]}))
            navigate('/blogs')
          }
    const handleSubmit = (e)=>{
      e.preventDefault()
      console.log('submitting..')
    }
    useEffect(()=>console.log(currentUser))
  return (
    <div className={`z-40 fixed flex top-0 left-0 right-0 h-[50px] bg-[#F5F5F5] hover:bg-transparent`}>
      <div 
        className={` z-50 relative h-[100px] w-full hover:bg-[#F5F5F5] backdrop-blur-xl transition-colors duration-900 flex items-center justify-between px-[5%]`}>
          <Link to={'/'} className="w-[100px] h-full flex flex-col justify-center items-center">
            <img className='w-[150px] h-[60%] object-contain' src={logo} alt="" />
            <p className='font-extrabold cherry-bomb-one-regular text-2xl text-orange-500'>Paw Pal</p>
          </Link>
          <div className="w-[60%] h-full flex justify-between items-center">
            <div className="w-[55%] h-full flex justify-between items-end pb-[20px]">
              <Link to={currentUser?.user?.isAdmin? '/admin/adoption':'/adoption'} className='relative group text-black hover:text-red-700 hover:underline text-lg font-semibold cursor-pointer'>
                <p>Adopt</p>

                <div className={`cursor-default w-[500px] h-[300px] bg-gray-900 absolute group-hover:flex hidden`}>
                  <div className="w-[40%] h-full  flex flex-col">
                      <Link to={'/adoption?animalType=cat'} className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                        <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Cats & Kittens</p>
                      </Link>
                      <Link to={'/adoption?animalType=dog'} className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                        <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Dogs & Puppies</p>
                      </Link>
                      <Link to={'/adoption?animalType=bird,rabbit'} className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                        <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Other type of Pets</p>
                      </Link>
                  </div>
                  <div className="w-[60%] h-full bg-neutral-800">
                    <img className='w-full h-full object-cover' src={data[0].url} alt="" />
                  </div>
                </div>
              </Link>
              <Link to={'/transport'}
              className='relative group text-black hover:text-red-700 hover:underline text-lg font-semibold cursor-pointer'>
                <p>Transport</p>
                <div className={`cursor-default w-[500px] h-[300px] bg-gray-900 absolute group-hover:flex hidden`}>
                  <div className="w-[40%] h-full flex flex-col">
                          <Link to={'/transport#work'}   className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                            <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Work Procedure</p>
                          </Link>
                          <Link to={'/transport#services'}   className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                            <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Services</p>
                          </Link>
                          <Link to={'/transport#agencies'}   className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                            <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Agencies</p>
                          </Link>
                          <Link to={'/transport#agencies'}   className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                            <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Pricing</p>
                          </Link>
                          <Link to={'/transport#book'}   className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                            <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Booking</p>
                          </Link>
                          <Link to={'/transport#book'}   className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                            <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>FAQs</p>
                          </Link>
                      </div>
                  <div className="w-[60%] h-full bg-neutral-800">
                    <img className='w-full h-full object-cover' src={data[1].url} alt="" />
                  </div>
                </div>
              </Link>
              <Link to={'/blog'}
              className='relative group text-black hover:text-red-700 hover:underline text-lg font-semibold cursor-pointer'>
                <p>Blogs</p>
                <div className={`cursor-default w-[500px] h-[300px] bg-gray-900 absolute group-hover:flex hidden`}>
                <div className="w-[40%] h-full  flex flex-col">
                    <button onClick={()=>handleClick(1)} className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                        <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Adoption</p>
                      </button>
                      <button onClick={()=>handleClick(2)} className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                        <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Breeds</p>
                      </button>
                      <button onClick={()=>handleClick(3)} className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                        <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Health and Wellness</p>
                      </button>
                      <button onClick={()=>handleClick(4)} className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                        <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Training</p>
                      </button>
                      <button onClick={()=>handleClick(5)} className='cursor-pointer group/nested w-full h-[40px] hover:bg-neutral-700 text-white text-sm flex items-center px-2 font-semibold'>
                        <p className='group-hover/nested:translate-x-2 transition-transform duration-300'>Other information</p>
                      </button>
                  </div>
                  <div className="w-[60%] h-full bg-neutral-800">
                    <img className='w-full h-full object-cover' src={data[2].url} alt="" />
                  </div>
                </div>
              </Link>
              <Link to={'/about'}
              className='relative text-black hover:text-red-700 hover:underline text-lg font-semibold cursor-pointer'>
                <p>AboutUs</p>
              </Link>
            </div>
    
          </div>
          {
            currentUser?
              <div className=" relative group w-[300px] h-full  flex justify-start items-end pb-[20px] gap-[10px]">
              <div className="w-[55px] h-[55px] rounded-full bg-gradient-to-b  from-orange-400 to-red-700 flex justify-center  items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-black  cursor-pointer">
                  <img src={currentUser?.user?.profilePicture} className='w-full h-full rounded-full  object-cover' alt="" />
                </div>
              </div>
              <p className=' font-semibold text-lg mb-[10px] cursor-pointer'>{currentUser?.user?.name}</p>
              <section className='group-hover:flex shadow-lg shadow-gray-600 hidden absolute top-[90%] rounded-tr-3xl rounded-bl-3xl left-[10%] w-[220px] h-[100px] bg-gray-800 flex-col items-start pt-[20px] pl-[20px]'>
                <Link to={'/profile'} className="w-full h-[30px] hover:translate-x-2 transition-transform duration-300 flex items-start cursor-pointer">
                  <p className='text-lg text-white  hover:text-green-600 font-semi-bold tracking-wider'>View Profile</p>
                </Link>
                <button onClick={handleLogout} className="w-full h-[30px] hover:translate-x-2 transition-transform duration-300 group-nested flex items-start cursor-pointer ">
                <p className='text-lg text-red-500 hover:text-red-700 font-semibold tracking-wider'>
                  <span className='flex gap-1 justify-center items-center'><LogOut />Logout</span>
                </p>
                </button>
              </section>
            </div>:
            <AuthSwitch/>
          }
      </div>
    </div>
  )
}

export default Navbar
