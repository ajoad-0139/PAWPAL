import { blogTabIndex } from '@/Store/Blog'
import React from 'react'
import { useSelector } from 'react-redux'
import data from '../../data/BlogHero'

const BlogHero = () => {
    const currentBlogTabIndex = useSelector(blogTabIndex)
  return (
    <section className='w-full flex h-[700px]  justify-center'>
            <div  className=" relative w-[70%] h-[80%] flex justify-center items-center">
                <div className="inset-0 absolute w-full h-full">
                    <img className='w-full h-full object-cover' src={data[currentBlogTabIndex-1].url} alt="" />
                </div>
                <div className="w-[45%] absolute h-[55%] bg-[#FFFDF5] bottom-[-30%] right-[-20%] p-[10px]">
                    <div className="w-full h-full border-[1px] border-yellow-700 relative flex items-end">
                        <div className="w-[300px] h-[80px] bg-[#C8AB8D] absolute top-[-20%] left-[25%] p-[7px]">
                            <div className="w-full h-full flex flex-col py-[5px] border-[1px] border-neutral-500 justify-between items-center">
                                <p className='text-sm'>CATEGORY</p>
                                <p className='tracking-widest font-semibold text-white'>{data[currentBlogTabIndex-1].title}</p>
                            </div>
                        </div>
                        <div className="w-full h-[82%]  p-[10px]">
                            <p className='h-full w-full overflow-hidden'>
                              {
                                data[currentBlogTabIndex-1].content
                              }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </section>
  )
}

export default BlogHero
