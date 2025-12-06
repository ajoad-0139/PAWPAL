import React, { useEffect, useState } from "react";
import RollingElement from "../Utils/RollingElement";
import bg from "../../assets/transportHero.jpg";
import HeroSadStory from "./HeroSadStory";
import HeroHappyStory from "./HeroHappyStory";


const HeroSegment = () => {
  const [translate, setTranslate]=useState(0)
  useEffect(()=>{
    const time = setInterval(() => {
      setTranslate((prev) => (prev === 0 ? -100 : 0));
    }, 300000);

    return () => clearInterval(time);
  },[])
  useEffect(()=>console.log('hero segment test'))
  return (
    <div className="w-full h-full flex">
      <RollingElement>
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="pt-[110px] flex justify-center items-start w-full h-[100vh] bg-no-repeat bg-cover bg-center"
        >
          <div className=" relative overflow-hidden border-[1px] flex border-white h-[90%] w-[60%]">
            <HeroSadStory translate={translate} setTranslate={setTranslate}/>
            <HeroHappyStory translate={translate} setTranslate={setTranslate}/>
          </div>
        </div>
      </RollingElement>
    </div>
  );
};

export default HeroSegment;
