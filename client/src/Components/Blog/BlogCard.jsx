import { setBlog, setBlogUser } from '@/Store/Blog'
import { extractFirstImageUrl, extractFirstParagraph, extractHeadings } from '@/Utils/blog'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import getUserDetailsWithId from '../Profile/user/getUserDetailsWithId'

const BlogCard = ({item}) => {
    const dispatch = useDispatch()
    const imageUrl = extractFirstImageUrl(item?.content?.content)
    const headings = extractHeadings(item.content?.content?.[0] ? { type: 'doc', content: item.content.content } : { type: 'doc', content: [] })
    const title = headings[0]?.text || 'Untitled'
    const content = extractFirstParagraph(item?.content?.content)

    const handleFetchUserInfo = async(userId)=>{
        const user = await getUserDetailsWithId(userId);
        await dispatch(setBlogUser(user));
    }
    // useEffect(()=>console.log(item))
  return (
            <div className="w-[400px] h-[280px] relative">
                <img className='w-full h-full object-cover bg-black' src={imageUrl} alt="" />
                    <div className="absolute w-[350px] h-[350px] bg-[#EBDACB] right-[7%] top-[80%] p-[3%]">
                        <div className="w-full h-full  flex flex-col justify-start items-start border-[2px] p-[10px] border-neutral-100">
                            <p className='tracking-wide font-mono text-3xl h-[48%] w-full overflow-hidden text-yellow-900'>{title}</p>
                            <p className='w-[85%] h-[28%] font-sans text-neutral-600 mt-[10px] overflow-hidden text-lg'>{content}</p>
                            <button onClick={()=>{dispatch(setBlog(item?.content)); handleFetchUserInfo(item?.userId)}} className='self-center w-[150px] h-[30px] bg-[#BFA181] hover:bg-white border-[1px] border-[#BFA181] cursor-pointer mt-[7px] ml-[-10%] group'>
                                <p className='text-white tracking-widest text-sm font-semibold group-hover:text-[#BFA181]'>VIEW POST</p>
                            </button>
                            <p></p>
                        </div>
                    </div>
            </div>
  )
}

export default BlogCard
