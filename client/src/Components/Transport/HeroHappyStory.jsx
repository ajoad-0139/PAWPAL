import React from 'react'
import happy from "../../assets/happyCat.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const HeroHappyStory = ({translate, setTranslate}) => {
  return (
    <div style={{transform:`translateX(${translate}%)`}} className={` transition-transform duration-500 shrink-0 w-full h-full flex p-[10px] gap-[10px] group `}>
              <div className="h-full w-[40%] flex flex-col  relative items-center justify-between">
                 <div className="w-full h-[30%] flex flex-col justify-end items-center text-black">
                    <p className='text-2xl font-bold '>"PawPal to the Rescue"</p>
                    <p className='text-xl'>-Max’s Happy and Hassle-Free Trip</p>
                </div>
                <img
                  className="w-[80%] h-auto"
                  src={happy}
                  alt="Sad cat"
                  loading="lazy"
                />
                <div className="absolute inset-0 w-full h-full ">
                    <div className="relative w-full h-full  flex  justify-center items-center ">
                        <div className="w-full h-[80px] items-center flex mt-[-40px] justify-between  px-[5%]">
                            <button className='cursor-pointer w-[40px] h-[40px] flex justify-center items-center rounded-full border-white px-4 group-hover:border-2 ' onClick={()=>setTranslate(0)}>
                                <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                            </button>
                            <button className='cursor-pointer w-[40px] h-[40px] flex justify-center items-center rounded-full border-white px-4 group-hover:border-2 ' onClick={()=>setTranslate(-100)}>
                                <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                            </button>
                        </div>
                    </div>
                </div>
              </div>
              <div className="h-full w-[60%] pt-[20px] flex flex-col gap-3 group-hover:backdrop-blur-sm text-[#F0F0F0] text-md overflow-y-scroll scrollbar-hidden">
                <p>
                  Emma was excited about her big move, but she knew one thing for sure—she wouldn’t let Max go through a stressful journey. A friend recommended PawPal, a trusted pet transport service specializing in safe and comfortable pet travel.
                </p>
                <p>
                  She quickly downloaded the PawPal app and was amazed at how easy it was to arrange everything. The app guided her through each step—health certificates, crate guidelines, and even personalized care options. She selected a dedicated pet handler who would accompany Max throughout the journey.
                </p>
                <p>
                  On the day of the move, a professional PawPal transporter arrived at her home, greeted Max with treats, and reassured Emma that he would be in safe hands. Through the app, Emma could track Max’s journey in real time and receive updates with pictures and videos.
                </p>
                <p>
                  During the flight, she got a notification:
                 <br/>📍 Max is relaxing comfortably. His handler just gave him water and his favorite toy. 🐾
                </p>
                <p>
                  This gave her peace of mind, knowing that Max wasn’t just another piece of luggage—he was being cared for with love and attention.
                </p>
                <p>When she arrived, Max was brought directly to her, tail wagging happily. He was well-rested, hydrated, and excited to see her. Emma hugged him tightly, relieved and grateful for PawPal’s seamless experience.</p>
                <p>Thanks to PawPal, what could have been a nightmare turned into a stress-free, happy journey for both Emma and Max.</p>
              </div>
            </div>
  )
}

export default HeroHappyStory
