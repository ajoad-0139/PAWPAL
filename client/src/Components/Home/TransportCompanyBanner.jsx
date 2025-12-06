import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import banners from "@/data/CompanyBanner";


const CircularBanner = () => {
  const [positions, setPositions] = useState(
    banners.map((_, index) => index * 400) // Initial positions spaced apart
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((pos) => (pos >= window.innerWidth ? -400 : pos + 2)) // Move & Reset
      );
    }, 15); // Speed control

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[120px] overflow-hidden  flex items-center">
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          animate={{ x: positions[index] }}
          transition={{ ease: "linear", duration: 0 }}
          className="absolute w-[250px] h-[100px]  rounded-lg flex justify-between items-center overflow-hidden"
        >
          <img
            src={banner.img}
            alt={`Company ${banner.id}`}
            className="w-[60px] h-[60px] object-cover rounded-full bg-red-600 mr-[30px]"
          />
          <p>{banner.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CircularBanner;
