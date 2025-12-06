import React from 'react'
import BlogCard from './BlogCard'
import { useSelector } from 'react-redux'
import { specificBlogs } from '@/Store/Blog'

const BlogCardContainer = () => {
  const currentSpecificBlogs = useSelector(specificBlogs)
  return (
    <div className='w-full flex flex-wrap justify-center gap-x-[10px] gap-y-[310px]  mt-[70px] mb-[350px]'>
      {
        currentSpecificBlogs.map((item)=><BlogCard key={item.id} item={item}/>)
      }
    </div>
  )
}

export default BlogCardContainer
