import React from 'react'
import AnimatedSection from '../Utils/AnimatedSection'
import { extractFirstImageUrl, extractHeadings } from '@/Utils/blog'
import { useDispatch } from 'react-redux'
import { setBlog } from '@/Store/Blog'

const BlogCard = ({item}) => {
  const headings = extractHeadings(item.content?.content?.[0] ? { type: 'doc', content: item.content.content } : { type: 'doc', content: [] })
  const title = headings[0]?.text || 'Untitled'
  const imageUrl = extractFirstImageUrl(item.content?.content);
  const dispatch = useDispatch()
  const showBlog = ()=>{
    dispatch(setBlog(item.content))
  }
  return (
    <div onClick={showBlog} className="relative group w-[48%] h-[49%] overflow-hidden  cursor-pointer">
        <img className=' group-hover:scale-110 transition-transform duration-500 ease-in-out absolute w-full h-full object-cover' src={imageUrl} alt="" />
        <div className=" absolute group-hover:flex flex-col justify-center  hidden w-full h-full bg-neutral-950/30 items-center">
            <AnimatedSection isRepeated={true}>
                <p className='text-white w-full h-full overflow-hidden'>
                    {title}
                </p>                
            </AnimatedSection>
        </div>
    </div>
  )
}
export default BlogCard
