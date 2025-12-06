import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmojiPicker from 'emoji-picker-react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { appendMessage, chatId, getChatId, getMessagesByChat, messages, uploadMessagesByChat } from '@/Store/Transport'
import { user } from '@/Store/Auth'
import { data } from 'react-router-dom'
import SingleMessageComponent from './SingleMessageComponent'

const Chat = ({agency}) => {
    const [isShowEmoji, setIsShowEmoji]=useState(false)
    const [message, setMessage]=useState('')
    const ENDPOINT ="http://localhost:3000"
    const [socket, setSocket]=useState(null);
    const [flag, setFlag]=useState(true)
    const dispatch = useDispatch()
    const currentUser = useSelector(user)
    const currentChatMessages = useSelector(messages)
    const id = useSelector(chatId)
    const scrollRef = useRef(null)
    
    useEffect(()=>{
        dispatch(getChatId({userId:currentUser?.userId,agencyId:agency?.id})) // thunk to get the chat id 
    },[])
    useEffect(()=>{
        setSocket(io(ENDPOINT));
        
      },[])
    useEffect(()=>{
        if(flag && socket && id){
            socket.emit('user', currentUser)
            socket.emit('join room',id);
            console.log('user room joining ')
            dispatch(getMessagesByChat({id}));
            setFlag(false);
        }
    },[flag, socket, id])
    const handleMessageUpload = ()=>{
        const newContent = {message,chatID:id, senderID:currentUser.id}
        socket.emit('new message',newContent)
        dispatch(uploadMessagesByChat({data:message, id}));
        setMessage('')
      }
      
      useEffect(()=>{
          if(socket){
            socket.on('message received',(newMessage)=>{
                dispatch(appendMessage({
                    content:newMessage.message,
                    chatRef:newMessage.chatID,
                    _id:newMessage._id,
                    sender:newMessage.senderID
                }))
            })
          } 
          return ()=>{
            if(socket)socket.off('message received');
          }
      })
      useEffect(()=>{
        scrollRef?.current.scrollIntoView({behavior:'smooth'});
      },[currentChatMessages.length])
  return (
    <div className='w-full h-[500px] flex flex-col justify-start items-center border-[1px] border-neutral-800 pt-4'>
      <div className="pb-5 w-full h-[85%] flex flex-col gap-4 px-6 overflow-y-scroll scrollbar-hidden  ">

      <div  className="w-full h-auto flex justify-end items-start ">
        <div  className="w-[60%] h-auto flex justify-end">
            <p  className='w-auto h-auto flex justify-end bg-blue-400 p-2 rounded-3xl'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi ab quibusdam vel laborum qui voluptatem, ad tenetur at nobis possimus libero amet deserunt quo et facere soluta excepturi natus dolorem!
            </p>
        </div>
    </div>

      <div  className="w-full h-auto flex justify-start items-start ">
        <div  className="w-[60%] h-auto flex justify-start">
            <p  className='w-auto h-auto flex justify-start bg-blue-400 p-2 rounded-3xl'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad consectetur quidem culpa odio velit soluta, maiores, quis rerum esse ratione molestias modi sint tenetur repellat vitae quam ipsa, beatae praesentium?
            </p>
        </div>
    </div>

        {
          currentChatMessages.length?
            currentChatMessages.map((item)=><SingleMessageComponent key={item._id} item={item}/>)
          :null
        }
        <div ref={scrollRef}/>
      </div>
      <div className="w-full h-auto bg-transparent flex justify-start pl-5">
        <div className=" relative overflow-y-scroll">
          {isShowEmoji?<EmojiPicker className='absolute' style={{width:'300px', height:'350px'}}/>:null}
        </div>
        </div>
      <div className=" px-4 relative gap-2 flex justify-center items-center w-[98%] h-12 rounded-full bg-transparent border-[1px] border-neutral-800">
          <FontAwesomeIcon onClick={()=>setIsShowEmoji(!isShowEmoji)} className=' cursor-pointer text-xl' icon="fa-regular fa-face-smile" />
          <input 
            className='pl-4 h-full rounded-full bg-transparent text-black outline-none flex-1' 
            placeholder='Message...'
            type="text"
            value={message}
            onChange={(e)=>setMessage(e.target.value)} 
            />
            {
              message?
                <button onClick={handleMessageUpload} className='text-blue-600 font-semibold'>Send</button>
              :<div className='flex w-20 justify-between'>
                  <FontAwesomeIcon className=' cursor-pointer text-xl' icon="fa-solid fa-microphone" />
                  <FontAwesomeIcon className=' cursor-pointer text-xl' icon="fa-regular fa-image" />
                  <FontAwesomeIcon className='cursor-pointer text-xl' icon="fa-regular fa-heart" />
              </div>
            }
      </div>
      
    </div>
  )
}

export default Chat
