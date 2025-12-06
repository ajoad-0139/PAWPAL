import React, { useEffect } from 'react'
import { extractHeadings, extractFirstImageUrl } from '@/Utils/blog'
import AnimatedSection from '../Utils/AnimatedSection'
import { useDispatch } from 'react-redux'
import { setBlog } from '@/Store/Blog'

const BlogFeaturedPost = ({featuredBlogs}) => {
    const blog = featuredBlogs[0]?featuredBlogs[0]:null
    const headings = extractHeadings(blog?.content?.content?.[0] ? { type: 'doc', content: blog?.content.content } : { type: 'doc', content: [] })
    const title = headings[0]?.text || 'Untitled'
    const imageUrl = extractFirstImageUrl(blog?.content?.content || [])||'';
    const dispatch = useDispatch()
    const handleShowBlog = ()=>{
        dispatch(setBlog(blog?.content))
    }
    useEffect(()=>console.log(blog, 'blog'))
  return (
    <section className='w-full h-[500px] bg-[#FFFDEB]  flex justify-center items-center'>
            <div className="w-[35%] h-[85%] relative">
                <img className='w-full h-full object-cover bg-black' src={imageUrl}  alt="" />
                    <div className="absolute w-[70%] h-[80%] bg-[#FFFDF5] right-[-55%] top-[10%]  px-[7%] py-[5%]">
                        <div className="w-full h-full  flex flex-col justify-start items-start ">
                            <p className=' font-semibold tracking-wider text-yellow-900 text-sm'>FEATURED POST</p>
                            <p className='mt-[14px] tracking-wide font-mono text-3xl h-[40%] w-full overflow-hidden text-yellow-900'>{title}</p>
                            <p className='w-[85%] h-[30%] font-sans text-neutral-600 mt-[10px] overflow-hidden text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam expedita ab quaerat illo quia consequatur nostrum corporis vero odio rem. At ducimus numquam nisi fugit earum, sunt cum fuga itaque?</p>
                            <button onClick={handleShowBlog} className='self-center w-[150px] h-[30px] bg-[#BFA181] hover:bg-white border-[1px] border-[#BFA181] cursor-pointer mt-[7px] ml-[-10%] group'>
                                <p className='text-white tracking-widest text-sm font-semibold group-hover:text-[#BFA181]'>VIEW POST</p>
                            </button>
                        </div>
                    </div>
            </div>
        </section>
  )
}

export default BlogFeaturedPost
