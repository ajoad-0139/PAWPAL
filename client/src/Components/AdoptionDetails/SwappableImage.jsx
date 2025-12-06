import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";


const SwappableImage = ({slides}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getImageIndexes = (len, index) => {
    if (len == 0) return null;

    const nextIndex = (index + 1) % len;
    const prevIndex = (index - 1 + len) % len;

    return {
      prevIndex,
      nextIndex,
    };
  };
  const { prevIndex, nextIndex } = getImageIndexes(slides.length, currentIndex);

  const getJsxSlides = (providedIndex) => {
    const isOnTop = providedIndex === currentIndex;
    return slides.map((slide, index) => (
      <div key={index}>
        <img
          src={slide}
          alt=""
          className={`absolute top-0 left-0 h-full w-full object-cover rounded-md transition-opacity duration-3000 ${
            providedIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
        {isOnTop && providedIndex === index ? (
          <>
            <Button
              key={`prev-btn-${index}`}
              variant="outline"
              size="icon"
              onClick={() => {
                setCurrentIndex(
                  (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
                );
              }}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-20 cursor-pointer"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              key={`next-btn-${index}`}
              variant="outline"
              size="icon"
              onClick={() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
              }}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-20 cursor-pointer"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </>
        ) : null}
      </div>
    ));
  };

  return (
    <main className="flex justify-center items-center">
      <section className="relative w-[900px] h-[600px]">
        <div className="absolute left-0 right-[55%] bottom-4 h-[550px] rounded-md">
          <div className="relative w-full h-full">
            {getJsxSlides(prevIndex)}
          </div>
          <div className="absolute z-10 inset-0 bg-black opacity-65 rounded-md"></div>
        </div>
        <div className="absolute right-0 left-[55%] bottom-4 h-[550px] rounded-md">
          <div className="relative w-full h-full">
            {getJsxSlides(nextIndex)}
          </div>
          <div className="absolute z-10 inset-0 bg-black opacity-65 rounded-md"></div>
        </div>
        <div className="absolute left-[15%] right-[15%] bottom-8 h-[550px] shadow-2xl z-20 rounded-md">
          <div className="relative w-full h-full">
            {getJsxSlides(currentIndex)}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SwappableImage;
