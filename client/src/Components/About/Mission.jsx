import React, { useRef, useState } from 'react'

const Mission = () => {
    const videoRef = useRef(null);

    return (
        <>
            <section className='w-full h-[150px] flex flex-col items-center justify-center'>
                <p className='uppercase text-4xl font-montserrat font-semibold'>
                    PawPal makes every tail wag and every journey count
                </p>
            </section>
            <section className='w-full h-[500px] flex justify-center items-center gap-[30px]'>
                <div className="w-[30%] h-[80%]">
                    <blockquote className="text-sm md:text-base leading-relaxed italic space-y-4 font-semibold">
                        <p>
                            "At PawPal, we believe that every pet—no matter their size, story, or starting point—deserves a life filled with love, safety, and a forever home they can truly call their own.
                        </p>
                        <p>
                            From helping hopeful adopters find their perfect furry companions to ensuring that pets travel safely across cities, states, or even countries, we’re more than just a platform—we're a movement of care, connection, and compassion.
                        </p>
                        <p>
                            Every journey matters. Every tail wag counts. And at every step of the way, we’re there—bringing families together, one paw at a time."
                        </p>
                    </blockquote>
                </div>
                <div className="w-[30%] h-[80%]">
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            loop
                            autoPlay
                            controls
                            defaultMuted
                            playsInline
                        >
                            <source src={'https://cdn.pixabay.com/video/2022/08/12/127644-739144690_large.mp4'} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Mission