import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { getAllChats, sendChat } from "@/Store/Chat";

const ChatBox = ({dispatch, userData, postId,onAction}) => {
  // const onAction = async (formData) => {
  //   const { body } = Object.fromEntries(formData);
  //   console.log(body, "chat");
  //   try {
  //     const newFormData = {body, isAdmin: userData?.user?.isAdmin, userName: userData?.user?.name}
  //     console.log(newFormData)
  //     const response = await dispatch(sendChat({id:postId, formBody: newFormData}))
  //     console.log(response, 'chat response')
  //     await dispatch(getAllChats(postId))
  //   } catch (error) {
  //     toast.error('Could not send message')
  //   }
  // };
  return (
    <div className="mt-7">
      <form action={onAction} className="grid grid-cols-[16fr_2fr] gap-x-1 items-center pr-2">
        <Textarea
          id={"body"}
          name={"body"}
          className={"border-2 border-[#8C7A3F] bg-[#fffae6"}
        />
        <button
          className={
            "h-full flex justify-center items-center bg-black rounded-md"
          }
        >
          <Send size={28} color="white" />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
