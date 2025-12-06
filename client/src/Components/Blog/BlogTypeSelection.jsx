import { setIsShowBlogTypeModal } from '@/Store/Blog'
import React, { useRef , useEffect} from 'react'
import { useDispatch } from 'react-redux'

const BlogTypeSelection = ({blogIndex, setBlogIndex, postBlog}) => {
    const modalRef = useRef(null)
    const dispatch = useDispatch()
    const handlePostBlog = ()=>{
        postBlog();
        setBlogIndex(4);
        dispatch(setIsShowBlogTypeModal(false));
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                    dispatch(setIsShowBlogTypeModal(false));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur-md z-[60] flex justify-center items-center'>
      <div ref={modalRef} className="w-[20%]  bg-neutral-800 text-neutral-200 flex flex-col items-center justify-between pt-[15px] gap-[30px] rounded-lg">
        <div className="w-full flex flex-col items-center">
            <p className='text-2xl tracking-wider font-semibold mb-[30px] gloria-hallelujah-regular text-green-500'>Pick your blog type</p>
            <button onClick={()=>setBlogIndex(0)} className={` cursor-pointer w-full h-[50px] hover:bg-neutral-700 ${blogIndex===0?'bg-neutral-700':''} border-y-[1px] border-neutral-600 flex justify-center items-center`}>
                <p className='text-lg '>Adoption</p>
            </button>
            <button onClick={()=>setBlogIndex(1)} className={` cursor-pointer w-full h-[50px] hover:bg-neutral-700 ${blogIndex===1?'bg-neutral-700':''} border-y-[1px] border-neutral-600 flex justify-center items-center`}>
                <p className='text-lg '>Breeds</p>
            </button>
            <button onClick={()=>setBlogIndex(2)} className={` cursor-pointer w-full h-[50px] hover:bg-neutral-700 ${blogIndex===2?'bg-neutral-700':''} border-y-[1px] border-neutral-600 flex justify-center items-center`}>
                <p className='text-lg '>Training</p>
            </button>
            <button onClick={()=>setBlogIndex(3)} className={` cursor-pointer w-full h-[50px] hover:bg-neutral-700 ${blogIndex===3?'bg-neutral-700':''} border-y-[1px] border-neutral-600 flex justify-center items-center`}>
                <p className='text-lg '>Health and Wellness</p>
            </button>
            <button onClick={()=>setBlogIndex(4)} className={` cursor-pointer w-full h-[50px] hover:bg-neutral-700 ${blogIndex===4?'bg-neutral-700':''} border-y-[1px] border-neutral-600 flex justify-center items-center`}>
                <p className='text-lg '>Others</p>
            </button>
        </div>
        <button onClick={handlePostBlog} className='font-bold text-blue-400 w-full h-[65px] rounded-b-lg cursor-pointer hover:bg-neutral-700'>Post Blog</button>
      </div>
    </div>
  )
}

export default BlogTypeSelection 
