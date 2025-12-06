import BlogContainer from '@/Components/Blog/BlogContainer'
import { blogs } from '@/Store/Blog'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Blog = () => {
  const currentBlogs = useSelector(blogs)
  useEffect(()=>console.log(currentBlogs))
  return (
    <div className='w-full h-auto  flex justify-center'>
      <BlogContainer/>
    </div>
  )
}

export default Blog
