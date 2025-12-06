import React, { useRef, useEffect, useState } from "react";
import { getChats } from "./api";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats, selectAllChats, sendChat } from "@/Store/Chat";
import { io } from 'socket.io-client';
import { toast } from "sonner";
import { Button } from "../ui/button";

const TransportChatComponent = ({ postId, userData }) => {
  const URL = "https://pawpalbd.com";
  const socketRef = useRef();
  // const [allChats, setAllChats] = useState({});
  const allChats = useSelector(selectAllChats);
  const dispatch = useDispatch();
  const onAction = async (formData) => {
    const { body } = Object.fromEntries(formData);
    console.log(body, "chat");
    try {
      const newFormData = { body, isAdmin: userData?.user?.isAdmin, userName: userData?.user?.name }
      console.log(newFormData)
      const response = await dispatch(sendChat({ id: postId, formBody: newFormData }))
      console.log(response)
      // toast.success('Comment Posted Successfully', { duration: 2000 })
      dispatch(getAllChats(postId))
      socketRef.current.emit("newChat", {
        postId
      });
      console.log('socket')
    } catch (error) {
      toast.error('Could not send message')
      console.log(error)
    }
  };

  useEffect(() => {
    const getChats = async () => {
      const response = await dispatch(getAllChats(postId));
      console.log(response);
    };
    getChats();
  }, [dispatch, postId]);


  //Socket configuration

  useEffect(() => {
    socketRef.current = io(URL, {
      transports: ["websocket", "polling"],
    });
    socketRef.current.emit("joinPost", postId);
    socketRef.current.on("chatAdded", (newChat) => {
      console.log("Received new chat via socket:", newChat);
      dispatch(getAllChats(postId)); // refresh chats
    });
    // socketRef.current.on("userTyping", ({ name }) => {
    //   setTyping(true);
    //   setTest(name);

    //   if (activityTimer.current) {
    //     clearTimeout(activityTimer.current);
    //   }

    //   activityTimer.current = setTimeout(() => {
    //     setTyping(false);
    //     setTest("");
    //   }, 2000);
    // });

    return () => {
      // leave room and disconnect on unmount
      // socketRef.current.off("userTyping");
      // if (activityTimer.current) clearTimeout(activityTimer.current);
      socketRef.current.emit("leavePost", postId);
      socketRef.current.disconnect();
    };

  }, [dispatch, postId]);

  console.log(allChats, "chats");

  return (
    <section className="w-ful p-6 rounded-lg shadow-xl bg-[#F2EED9] border-2 border-[#8C7A3F] flex flex-col justify-between">
      {allChats?.length ? (
        <div>
          <ChatList allChats={allChats} postId={postId} userData={userData} />
        </div>
      ) : (
        <h3>No chat with admin found</h3>
      )}
      {/* <div>{typing ? `${test} is typing` : ""}</div> */}
      <ChatBox dispatch={dispatch} postId={postId} userData={userData} onAction={onAction} />
    </section>
  );
};

export default TransportChatComponent;
