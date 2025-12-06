import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileAdoptionNavbar = () => {
  return (
    <div className='flex justify-start items-center gap-8'>
      <NavLink className={({isActive}) => `${isActive? 'underline text-[#8C7A3F] font-semibold hover:font-bold' : 'hover:font-semibold'}`} to={'.'} end>Pending</NavLink>
      <NavLink className={({isActive}) => `${isActive? 'underline text-[#8C7A3F] font-semibold hover:font-bold' : 'hover:font-semibold'}`} to={'adopted'}>Adopted</NavLink>
      <NavLink className={({isActive}) => `${isActive? 'underline text-[#8C7A3F] font-semibold hover:font-bold' : 'hover:font-semibold'}`} to={'userAdoptions'}>My adoptions</NavLink>
    </div>
  )
}

export default ProfileAdoptionNavbar