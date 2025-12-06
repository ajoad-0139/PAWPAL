import React, { useState } from 'react'
import Tiptap from './Tiptap'
import Blogs from './Blogs'
import BlogTypeSelection from './BlogTypeSelection'
import { useDispatch, useSelector } from 'react-redux'
import { isShowBlogTypeModal, saveBlogPost } from '@/Store/Blog'
import { user } from '@/Store/Auth'

const CreateBlog = () => {
  const blogTypes = ['adoption','breeds', 'training', 'health and wellness', 'others']
  const dispatch =useDispatch()

  const [blogIndex, setBlogIndex] = useState(4);
  const [blogContent, setBlogContent] =useState(null);
  const currentIsShowBlogType = useSelector(isShowBlogTypeModal)
  const currentUser = useSelector(user)

  const [editorContent, setEditorContent] = useState(null);
  const [editBlogId, setEditBlogId] =useState(null);

  const postBlog = ()=>{
    dispatch(saveBlogPost({contentJson:blogContent, type:blogTypes[blogIndex], userId:currentUser.userId}))
  }
  return (
    <div className=' w-full h-screen overflow-y-scroll pt-[80px] flex gap-[5%] pr-[5%] justify-end items-start'>
                <Blogs setEditBlogId={setEditBlogId} setEditorContent={setEditorContent}/>
                {currentIsShowBlogType?<BlogTypeSelection postBlog={postBlog} blogIndex={blogIndex} setBlogIndex={setBlogIndex}/>:null}
        <div className="w-[65%]  pt-[50px]  h-auto gap-4  pb-8 flex justify-start items-center ">
                <Tiptap editBlogId={editBlogId} editorContent={editorContent} setBlogContent={setBlogContent} />
        </div> 
    </div>
  )
}

export default CreateBlog
