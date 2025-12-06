import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Separator } from "../ui/separator";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { createComment as createCommentApi, updateComment as updateCommentApi, deleteComment as deleteCommentApi } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { createNewComment, eraseComment, getAllComments, selectAllComments } from "@/Store/AdoptionCommentSlice";
import { toast } from "sonner";
import { user } from "@/Store/Auth";
import { getSinglePost } from "@/Store/AdoptionPostSlice";
import { io } from 'socket.io-client';


const CommentSection = () => {
  const URL = "https://pawpalbd.com";
  const socketRef = useRef();
  // const user = localStorage.getItem('user')

  const dispatch = useDispatch()
  const allComments = useSelector(selectAllComments);
  const { postId } = useParams();
  const userData = useSelector(user)
  const currentPost = useSelector(getSinglePost)

  const [backendComments, setBackendComments] = useState(() => []);
  console.log(backendComments, 'backendComments');
  const [activeComment, setActiveComment] = useState(() => null);

  const addComment = async (comment, parentId = null) => {
    const data = await dispatch(createNewComment({ text: comment, parentId: parentId, postId, userId: userData?.userId }))
    console.log(data)
    if (data?.payload?.msg) {
      toast.success('Comment Posted Successfully', { duration: 2000 })
      dispatch(getAllComments(postId))
    }
    socketRef.current.emit("newComment", {
      postId
    });
  }

  const updateComment = async (text, commentId) => {
    await updateCommentApi(text, commentId)
    const updatedComments = backendComments.map(backendComment => backendComment.id === commentId ? { ...backendComment, body: text } : backendComment)
    setBackendComments(updatedComments)
    setActiveComment(null)
  }

  const deleteComment = async (commentId) => {
    console.log(commentId)
    const data = await dispatch(eraseComment(commentId))
    const updatedBackendComments = backendComments.filter(backendComment => backendComment.id !== commentId)
    setBackendComments(updatedBackendComments)
    console.log(data)
    if (data?.payload?.msg) {
      toast.success('Comment deleted successfully', { duration: 2000 })
      dispatch(getAllComments(postId))
    } else {
      toast.error('Something went wrong', { description: 'Please, Try again Later.', duration: 2000 })
    }
  }
  const handleKeyPress = () => {
    socketRef.current.emit("typing", {
      postId,
      name: "test"
    })
  }
  const [typing, setTyping] = useState(false);
  const [test, setTest] = useState("");
  const activityTimer = useRef(null);
  useEffect(() => {
    socketRef.current = io(URL, {
      transports: ["websocket", "polling"],
    });
    socketRef.current.emit("joinPost", postId);
    socketRef.current.on("commentAdded", (newComment) => {
      console.log("Received new comment via socket:", newComment);
      dispatch(getAllComments(postId)); // refresh comments
    });
    socketRef.current.on("userTyping", ({ name }) => {
      setTyping(true);
      setTest(name);

      if (activityTimer.current) {
        clearTimeout(activityTimer.current);
      }

      activityTimer.current = setTimeout(() => {
        setTyping(false);
        setTest("");
      }, 2000);
    });

    return () => {
      // leave room and disconnect on unmount
      socketRef.current.off("userTyping");
      if (activityTimer.current) clearTimeout(activityTimer.current);
      socketRef.current.emit("leavePost", postId);
      socketRef.current.disconnect();
    };

  }, [dispatch, postId]);

  return (
    <section className="w-ful p-6 rounded-lg shadow-xl bg-[#F2EED9] border-2 border-[#8C7A3F] flex flex-col">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-semibold">
          Discussions On {" "}
          <span className="gloria-hallelujah-regular">{currentPost?.name}</span>
          {/* <div>{typing ? `${test} is typing` : ""}</div> */}
        </h2>
      </div>
      <Separator className={"bg-[#8C7A3F] my-4"} />
      <CommentForm submitLabel={'Post'} handleSubmit={addComment} handleKeyPress={handleKeyPress} />
      <CommentList postId={postId} dispatch={dispatch} allComments={allComments} getAllComments={getAllComments} backendComments={backendComments} setBackendComments={setBackendComments} addComment={addComment} activeComment={activeComment} setActiveComment={setActiveComment} updateComment={updateComment} deleteComment={deleteComment} userData={userData} typing={typing}/>
    </section>
  );
};

export default CommentSection;
