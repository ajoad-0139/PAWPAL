import { blogTabIndex, getSpecificBlogs, setBlogTabIndex } from '@/Store/Blog';
import React, { cache } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const BlogTabs = () => {
    const dispatch = useDispatch();
    const currentBlogTabIndex = useSelector(blogTabIndex)
    const handleClick = (index)=>{
      const types = ['adoption','breeds', 'health and wellness', 'training','others']
      dispatch(setBlogTabIndex(index))
      dispatch(getSpecificBlogs({type:types[index-1]}))
    }
  return (
    <section className='w-full h-[50px] flex justify-center items-center mt-[30px] border-t-[1px] border-b-[1px] border-neutral-400 gap-[20px]'>
            <button onClick={()=>handleClick(1)} className={` ${currentBlogTabIndex===1?'text-[#F5E1A4]':'text-black'} tracking-widest cursor-pointer hover:text-[#F5E1A4]`}>ADOPTION</button>
            <button onClick={()=>handleClick(2)} className={` ${currentBlogTabIndex===2?'text-[#F5E1A4]':'text-black'} tracking-widest cursor-pointer hover:text-[#F5E1A4]`}>BREEDS</button>
            <button onClick={()=>handleClick(3)} className={` ${currentBlogTabIndex===3?'text-[#F5E1A4]':'text-black'} tracking-widest cursor-pointer hover:text-[#F5E1A4]`}>HEALTH & WELLNESS</button>
            <button onClick={()=>handleClick(4)} className={` ${currentBlogTabIndex===4?'text-[#F5E1A4]':'text-black'} tracking-widest cursor-pointer hover:text-[#F5E1A4]`}>TRAINING</button>
            <button onClick={()=>handleClick(5)} className={` ${currentBlogTabIndex===5?'text-[#F5E1A4]':'text-black'} tracking-widest cursor-pointer hover:text-[#F5E1A4]`}>OTHERS</button>
     </section>
  )
}

export default BlogTabs
