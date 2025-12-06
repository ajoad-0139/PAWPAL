import React from 'react'
import SingleChat from './SingleChat'

const ChatList = ({ allChats, userData, postId }) => {
  console.log(allChats)
  return (
    <div className='min-h-[360px] max-h-[360px] overflow-y-scroll scrollbar-hidden'>
      {[...allChats]
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map(singleChat => (
          <SingleChat  {...singleChat} userData={userData} />
        ))}
    </div>
  )
}

export default ChatList
