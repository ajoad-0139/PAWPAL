import { blog, blogUser, setBlog } from '@/Store/Blog'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogShow from './BlogShow'
import test from '../../data/test'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { user } from '@/Store/Auth'

const BlogShowContainer = () => {
    const currentBlog = useSelector(blog);
    const currentBlogUser = useSelector(blogUser);
    const currentUser = useSelector(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleExit = ()=>{
        dispatch(setBlog(null));
    }
    const handleGoHome = ()=>{
        navigate('/')
        dispatch(setBlog(null));
    }
    const handleNavigate = ()=>{
        dispatch(setBlog(null));
        currentUser?.userId===currentBlogUser?.userId?navigate('/profile'):navigate(`/profile/${currentBlogUser.userId}`)
    }
  return (
    <div className={` ${currentBlog?'flex':'hidden'} fixed  top-0 bottom-0 left-0 right-0 backdrop-blur-xl z-50 `}>
        <div className={`${currentBlog?'flex':'hidden'} justify-center px-[12%] h-full w-full items-start overflow-y-scroll `}>
            <button onClick={handleExit} className=" font-extralight fixed z-[60] right-10 top-4 text-red-600 text-3xl cursor-pointer">
                <FontAwesomeIcon icon="fas fa-times" />
            </button>
            <div onClick={handleGoHome} className="fixed z-[60] left-10 top-4  cursor-pointer">
                <div className="w-[50px] h-[50px]">
                    <img src={logo} className='w-full h-full object-contain' alt="" />
                </div>
            </div>
            <div className="w-full min-h-full pt-[60px] px-[3%] bg-white/50">
                {currentBlog && <BlogShow doc={currentBlog}/>}
                <div className="w-full h-[100px] flex justify-end">
                    <div className="w-[220px] h-full flex flex-col items-start justify-start gloria-hallelujah-regular">
                        <p className='text-sm tracking-wider '>Created by ,</p>
                        <div className="w-full h-[80px] pl-[50px]">
                            <div className="w-full h-full gap-[10px] flex justify-start items-center">
                                <button onClick={handleNavigate} className="w-[30px] cursor-pointer h-[30px] bg-black rounded-full">
                                    <img className='w-full h-full rounded-full object-cover' src={currentBlogUser?.user?.profilePicture?currentBlogUser.user.profilePicture:""} alt="" />
                                </button>
                                <div className="flex-1 h-[40px] overflow-hidden flex justify-start items-center ">
                                    <button onClick={handleNavigate} className='text-sm cursor-pointer'>{currentBlogUser?.user?.name}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlogShowContainer
