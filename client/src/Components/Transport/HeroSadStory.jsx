import React from 'react'
import sad from "../../assets/sad_cat.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const HeroSadStory = ({translate, setTranslate}) => {
  return (
    <div style={{transform:`translateX(${translate}%)`}} className=" transition-transform duration-500 shrink-0 w-full h-full flex p-[10px] gap-[10px] group">
              <div className="h-full w-[40%] flex flex-col  relative items-center justify-between">
                    <div className="w-full h-[30%] flex flex-col justify-end items-center text-black">
                        <p className='text-2xl font-bold '>"Max’s Travel Nightmare"</p>
                        <p className='text-xl'>-A Journey of Stress and Uncertainty</p>
                    </div>
                    <img
                    className="w-[80%] h-auto"
                    src={sad}
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
                  Emma had finally landed her dream job in another state, but
                  there was one major problem—she had to move with her beloved
                  golden retriever, Max. She thought booking a regular flight
                  for him would be simple, but the reality was far from it.
                </p>
                <p>
                  First, she struggled to find an airline that would accept Max
                  on short notice. When she finally secured a spot, she was met
                  with a long list of requirements—specific crate dimensions,
                  health certificates, and a complicated check-in process. She
                  scrambled to get everything done but still felt unsure if she
                  had missed anything.
                </p>
                <p>
                  The day of travel was even worse. At the airport, Max was
                  terrified of the loud noises and strangers, and Emma was
                  forced to part ways with him at cargo check-in. Tears welled
                  in her eyes as she saw him being taken away, whining in fear.
                  The airline staff seemed indifferent, offering no reassurance
                  about his safety.
                </p>
                <p>
                  During the flight, Emma couldn’t focus. Was Max okay? Was he
                  scared? The layover only made things worse—her flight was
                  delayed, and she had no way to check on Max's condition. When
                  she finally arrived, she had to wait two more hours before Max
                  was brought out, looking exhausted, confused, and anxious. His
                  water bowl was empty, and his fur was damp with sweat.
                </p>
                <p>
                  Guilt ate at Emma. She wished there had been a better way to
                  transport Max—a service that actually cared for pets, provided
                  updates, and ensured a stress-free experience.
                </p>
              </div>
            </div>
  )
}

export default HeroSadStory
