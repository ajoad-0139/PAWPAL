import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel"
import { Card, CardContent } from '../ui/card'

const TransportCarousel = ({ image1, image2 }) => {
  const images ={image1,image2}
  const imageArray = images ? Object.values(images) : [];

  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {imageArray.map((imgUrl, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className={'bg-[#fffae6]'}>
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <img
                    src={imgUrl}
                    alt={`transport-image-${index}`}
                    className="object-contain h-full w-full rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};


export default TransportCarousel