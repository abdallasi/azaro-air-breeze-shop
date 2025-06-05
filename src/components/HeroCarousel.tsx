
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductManagement } from "@/hooks/useProductManagement";

const HeroCarousel = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const { heroImages } = useProductManagement();

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  return (
    <div className="w-full px-6 mb-12">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="pl-2 basis-[85%] md:basis-[70%]">
              <div className="relative h-96 rounded-[28px] overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100">
                {!loadedImages.has(index) && (
                  <Skeleton className="w-full h-full absolute inset-0 rounded-[28px]" />
                )}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                    loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(index)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-xl font-light tracking-wide drop-shadow-lg">
                    Air. In motion.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20" />
        <CarouselNext className="right-2 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
