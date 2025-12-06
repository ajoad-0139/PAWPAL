import React from 'react'
import { Outlet } from 'react-router-dom'

const BlogLayout = () => {
  return (
    <div className='w-full h-auto'>
      {<Outlet/>}
    </div>
  )
}

export default BlogLayout
