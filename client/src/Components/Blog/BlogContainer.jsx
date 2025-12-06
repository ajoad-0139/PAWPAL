import React, { useEffect } from 'react'
import BlogCard from './BlogCard'
import BlogHero from './BlogHero'
import BlogFeaturedPost from './BlogFeaturedPost'
import BlogTabs from './BlogTabs'
import BlogHeading from './BlogHeading'
import ScrollTriggeredCurve from '../Utils/ScrollAnimatedCurve'
import { useDispatch, useSelector } from 'react-redux'
import { blogTabIndex, featuredBlogs, getFeaturedBlogs } from '@/Store/Blog'
import BlogCardContainer from './BlogCardContainer'
import FeaturePostContainer from './FeaturePostContainer'
import { user } from '@/Store/Auth'

const BlogContainer = () => {
  const currentBlogTabIndex = useSelector(blogTabIndex)
  const currentFeaturedBlogs = useSelector(featuredBlogs)
  const currentUser = useSelector(user)
  const dispatch = useDispatch()
  useEffect(()=>console.log(currentFeaturedBlogs, 'currentblog featured'))
  useEffect(()=>{
    dispatch(getFeaturedBlogs({userId:currentUser?.userId}));
  },[])
  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#FFFDF5] pt-[130px]">
        {/* Heading */}
        <BlogHeading/>
        {/* tabs */}
        <BlogTabs/>
        {/* featured blog */}
        {currentBlogTabIndex===6?<BlogFeaturedPost featuredBlogs={currentFeaturedBlogs}/>:<BlogHero/>}
        <div className="w-full h-[200px] overflow-hidden flex justify-between mt-[70px] px-[2%] min-[1600px]:px-[10%] ">
          <ScrollTriggeredCurve/>
          <ScrollTriggeredCurve/>
        </div>
        {currentBlogTabIndex===6?<FeaturePostContainer featuredBlogs={currentFeaturedBlogs}/>:<BlogCardContainer/>}
    </div>
  )
}

export default BlogContainer
