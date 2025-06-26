
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductManagement } from "@/hooks/useProductManagement";

const HeroCarousel = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());
  const { heroImages } = useProductManagement();

  const handleImageLoad = (index: number) => {
    console.log('Hero image loaded:', index, heroImages[index]?.src);
    setLoadedImages(prev => new Set([...prev, index]));
  };

  const handleImageError = (index: number) => {
    console.error('Hero image failed to load:', index, heroImages[index]?.src);
    setErrorImages(prev => new Set([...prev, index]));
    setLoadedImages(prev => new Set([...prev, index])); // Still mark as "loaded" to hide skeleton
  };

  if (!heroImages.length) {
    return (
      <div className="w-full px-6 mb-12">
        <div className="w-full h-96 rounded-[28px] overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 mb-12">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2">
          {heroImages.map((image, index) => (
            <CarouselItem key={image.id || index} className="pl-2 basis-[85%] md:basis-[70%]">
              <div className="relative h-96 rounded-[28px] overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100">
                {!loadedImages.has(index) && (
                  <Skeleton className="w-full h-full absolute inset-0 rounded-[28px]" />
                )}
                
                {errorImages.has(index) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center p-4">
                      <p className="text-gray-500 mb-2">Image not available</p>
                      <p className="text-sm text-gray-400">{image.alt}</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                      loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                )}
                
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
