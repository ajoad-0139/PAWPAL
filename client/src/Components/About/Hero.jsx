import React from 'react';

const Hero = () => {
  return (
    <div className='w-full h-[500px] flex justify-center'>
      <div className="w-[70%] relative h-full rounded-xl overflow-hidden cherry-bomb-one-regular">
        <img className='w-full h-full object-bottom object-cover rounded-xl' src="https://i.pinimg.com/736x/1b/f9/6b/1bf96ba92ef48a201138221e37ff5e79.jpg" alt="hero" />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col pt-[12%] pl-[12%] text-white">
          <p className='text-4xl'>ABOUT</p>
          <p className='text-8xl'>PawPal</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
