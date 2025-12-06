import { user } from "@/Store/Auth";
import {
  blogs,
  deleteBlogPost,
  everyBlog,
  getBlogs,
  getEverySingleBlogs,
  getSpecificBlogs,
  toggleFeaturedBlog,
} from "@/Store/Blog";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProfileBlogCard from "./ProfileBlogCard";
import { useParams } from "react-router-dom";

const ProfileBlogList = () => {
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const {userId} = useParams() 
  const everySingleBlog = useSelector(everyBlog)

  const reqId = userId? userId : userData?.userId;


  const allBlogs = useSelector(blogs);
  useEffect(() => {
    const getSpecificBlogs = async () => {
      try {
        const data = await dispatch(
          getBlogs({ userId: reqId })
        );
        await dispatch(getEverySingleBlogs())
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    getSpecificBlogs();
  }, [dispatch, reqId, userData]);

  const handleBlogDelete = async (postId, id) => {
    try {
      await dispatch(deleteBlogPost({ blogId: postId }));
      toast.success('Post deleted successfully')
      await dispatch(getBlogs({userId: id}))
      await dispatch(getEverySingleBlogs())
    } catch (error) {
      toast.error('Something went wrong')
    }
  };
  const showDelete = !userId || userData?.user?.isAdmin

  const toggleFeature = async (blogId) => {
    try {
      console.log(blogId, 'toggle Feature')
      const response = await dispatch(toggleFeaturedBlog({blogId}))
      console.log(response, 'toggle')
      toast.success('Updated status successfully')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  const blogsSelectedForList = !userId && userData?.user?.isAdmin? everySingleBlog : allBlogs;
  return (
    <main className="p-10 pt-2 font-inter w-full max-h-[68vh] overflow-y-auto scrollbar-hidden">
      <div className="flex flex-col justify-start gap-6 mt-4">
        <div className="flex w-full justify-start items-center">
          <h6 className="text-[#565656] font-montserrat text-sm">
            {blogsSelectedForList?.length || "0"} blog written so far...
          </h6>
        </div>
        {blogsSelectedForList?.length
          ? blogsSelectedForList?.map((post) => (
              <ProfileBlogCard
                key={post._id}
                {...post}
                showDelete={showDelete}
                item={post}
                dispatch={dispatch}
                handleBlogDelete={handleBlogDelete}
                userData={userData}
                reqId={reqId}
                toggleFeature={toggleFeature}
              />
            ))
          : null}
      </div>
    </main>
  );
};

export default ProfileBlogList;
