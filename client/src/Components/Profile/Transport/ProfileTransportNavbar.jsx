import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileTransportNavbar = () => {
  return (
    <div className='flex justify-start items-center gap-8'>
      <NavLink className={({isActive}) => `${isActive? 'underline text-[#8C7A3F] font-semibold hover:font-bold' : 'hover:font-semibold'}`} to={'.'} end>Pending</NavLink>
      <NavLink className={({isActive}) => `${isActive? 'underline text-[#8C7A3F] font-semibold hover:font-bold' : 'hover:font-semibold'}`} to={'approved'} end>Approved</NavLink>
      <NavLink className={({isActive}) => `${isActive? 'underline text-[#8C7A3F] font-semibold hover:font-bold' : 'hover:font-semibold'}`} to={'completed'}>Completed</NavLink>
    </div>
  )
}

export default ProfileTransportNavbar