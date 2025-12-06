import { user } from '@/Store/Auth';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'



const SingleMessageComponent = ({item}) => {
    const currentUser = useSelector(user);

  return (
    <div style={currentUser.id===item.sender?{justifyContent:'end'}:{justifyContent:'start'}} className="w-full h-auto flex justify-end items-start ">
        <div style={currentUser.id===item.sender?{justifyContent:'end'}:{justifyContent:'start'}} className="w-[60%] h-auto flex justify-end">
            <p style={currentUser.id===item.sender?{justifyContent:'end'}:{justifyContent:'start',backgroundColor:'#262626'}} className='w-auto h-auto flex justify-end bg-blue-400 p-2 rounded-3xl'>
                {item.content}
            </p>
        </div>
    </div>
  )
}

export default SingleMessageComponent
