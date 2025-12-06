import React from 'react';

const SingleChat = ({
  id,
  body,
  userName,
  isAdmin,
  createdAt,
  userData,
}) => {
  // Format timestamp to 'en-GB' with Asia/Dhaka time
  const time = new Date(createdAt).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Dhaka',
  });

  const isCurrentUser = isAdmin === userData?.user?.isAdmin;

  return (
    <main
      className={`flex flex-col justify-start ${
        isCurrentUser ? 'items-end' : 'items-start'
      } gap-1 mt-2`}
    >
      <div className='flex items-center gap-2'>
        <h2 className='font-inter text-lg font-semibold'>{userName}</h2>
        <span className='text-[#565656] text-xs'>{time}</span>
      </div>
      <p
        className={`px-4 py-2 rounded-xl max-w-[80%] ${
          isCurrentUser
            ? 'bg-[#DCF8C6] text-black'
            : 'bg-[#F1F0F0] text-black'
        }`}
      >
        {body}
      </p>
    </main>
  );
};

export default SingleChat;
