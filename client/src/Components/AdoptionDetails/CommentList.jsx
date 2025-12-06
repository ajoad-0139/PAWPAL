import React, { useEffect, useState } from "react";
import { getComments, updateComment } from "./api";
import SingleComment from "./SingleComment";

const CommentList = ({
  addComment,
  activeComment,
  setActiveComment,
  updateComment,
  deleteComment,
  dispatch,
  getAllComments,
  postId,
  allComments,
  userData,
  typing
}) => {
  const rootComments = allComments
    .filter((allComment) => allComment?.parentId === null)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log(allComments, "allcomments");
  const getReplies = (commentId) =>
    allComments
      .filter((allComment) => allComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  useEffect(() => {
    const fetchComments = async () => {
      try {
        dispatch(getAllComments(postId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [dispatch, getAllComments, postId]);
  return (
    <section className="mt-1">
      <h4 className="text-sm font-semibold text-[#565656]">
        {allComments.length || "0"} Comments
      </h4>
      <h4 className="text-md font-semibold text-[#565656] mt-2">{typing? "Someone is typing...": "" }</h4>
      <div className="flex flex-col justify-start gap-4 mt-8 max-h-[63vh] overflow-y-auto scrollbar-hidden">
        {rootComments.map((rootComment) => (
          <SingleComment
            key={rootComment._id}
            rootComment={rootComment}
            currentUserId={userData?.userId}
            replies={getReplies(rootComment._id)}
            addComment={addComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            updateComment={updateComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentList;
