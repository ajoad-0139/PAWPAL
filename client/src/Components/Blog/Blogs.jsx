import React, { useEffect } from 'react'
import AnimatedSection from '../Utils/AnimatedSection'
import { useDispatch, useSelector } from 'react-redux'
import { blogs, deleteBlogPost, getBlogs, setBlog } from '@/Store/Blog'
import { extractHeadings, extractFirstImageUrl } from '@/Utils/blog'
import { user } from '@/Store/Auth'

const Blogs = ({setEditorContent, setEditBlogId}) => {
  const currentBlogs = useSelector(blogs)
  const dispatch  = useDispatch()
  const currentUser = useSelector(user)

  useEffect(()=>{
    dispatch(getBlogs({userId:currentUser?.userId}));
  },[])
  return (
    <div className="fixed top-0 left-0 bottom-0 w-[28%] flex flex-col pt-[130px] pb-[30px] items-center gap-[20px] overflow-y-scroll scrollbar-hidden">
      {currentBlogs.map((item, index) => {
        const headings = extractHeadings(item.content?.content?.[0] ? { type: 'doc', content: item.content.content } : { type: 'doc', content: [] })
        const title = headings[0]?.text || 'Untitled'
        const imageUrl = extractFirstImageUrl(item.content?.content);
        return (
          <div
            key={index}
            className="w-[90%] h-[170px] relative shrink-0 border-4 border-white group hover:border-blue-500 bg-neutral-900 rounded-xl overflow-hidden"
          >
            <img
              className="w-full h-full group-hover:scale-125 transition-transform duration-700 object-cover object-top"
              src={imageUrl}
              alt=""
            />
            <div className="absolute w-full h-full inset-0">
              <div className="w-full h-full bg-neutral-950/30 group-hover:backdrop-blur-xs flex justify-between p-4">
                <div className="w-[45%] h-full hidden group-hover:flex items-center">
                  <AnimatedSection isRepeated={true}>
                    <p className="text-white font-bold text-lg leading-tight">
                      {title}
                    </p>
                  </AnimatedSection>
                </div>
                <div className="w-[40%] h-full group-hover:hidden"></div>
                <div className="w-[50%] h-full flex flex-col justify-end items-end p-5 gap-2">
                  <button onClick={()=>{setEditorContent(item.content); setEditBlogId(item._id)}} className="group/button border-2 rounded-md text-lg font-bold hover:border-blue-500 px-4 py-1 cursor-pointer border-blue-400">
                    <span className="text-blue-400 group-hover/button:text-white">V</span>
                    <span className="text-white group-hover/button:text-blue-400">ie</span>
                    <span className="text-blue-400 group-hover/button:text-white">w</span>
                  </button>
                  <button onClick={()=>dispatch(deleteBlogPost({blogId:item._id}))} className="group/button border-2 rounded-md text-lg font-bold hover:border-red-500 px-4 py-1 cursor-pointer border-red-400">
                    <span className="text-red-400 group-hover/button:text-white">De</span>
                    <span className="text-white group-hover/button:text-red-400">le</span>
                    <span className="text-red-400 group-hover/button:text-white">te</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Blogs
