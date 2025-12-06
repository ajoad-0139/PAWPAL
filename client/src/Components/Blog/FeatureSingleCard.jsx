import React, { useEffect } from 'react'
import { extractFirstImageUrl, extractHeadings } from '@/Utils/blog'
import { useDispatch } from 'react-redux'
import { setBlog } from '@/Store/Blog'

const FeatureSingleCard = ({translate, item}) => {
  useEffect(()=>console.log(item, 'item'))
  const headings = extractHeadings(item.content?.content?.[0] ? { type: 'doc', content: item.content.content } : { type: 'doc', content: [] })
  const title = headings[0]?.text || 'Untitled'
  const imageUrl = extractFirstImageUrl(item.content?.content);
  const dispatch = useDispatch()
  const handleShowBlog = ()=>{
    dispatch(setBlog(item.content))
  }
  return (
    <div style={{transform: `translateX(${-translate*100}%)`}} className="w-[350px] h-[280px] shrink-0 relative transition-transform duration-1000">
        <img className='w-full h-full object-cover bg-black' src={imageUrl} alt="" />
            <div className="absolute w-[320px] h-[180px] bg-[#EBDACB] right-[4%] top-[80%] p-[3%]">
                <div className="w-full h-full  flex flex-col justify-start items-start">
                    <p className='tracking-wide font-mono text-md mb-[10px] w-full overflow-hidden text-yellow-900'>FEATURE POST</p>
                    <p className='tracking-wide font-mono text-xl h-[39%] w-full overflow-hidden text-yellow-900'>{title}</p>
                    <button onClick={handleShowBlog} className='self-center w-[150px] h-[30px] bg-[#BFA181] hover:bg-white border-[1px] border-[#BFA181] cursor-pointer mt-[20px] ml-[-10%] group'>
                        <p className='text-white tracking-widest text-sm font-semibold group-hover:text-[#BFA181]'>VIEW POST</p>
                    </button>
                </div>
            </div>
    </div>
  )
}

export default FeatureSingleCard
