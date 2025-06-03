
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HeroCarousel = () => {
  const heroImages = [
    {
      src: "/lovable-uploads/e6be07de-56d8-47cf-9682-7bdd68c78541.png",
      alt: "Azaro Air fabric floating in nature"
    },
    {
      src: "/lovable-uploads/b6a9eab3-bece-4246-b5db-3fef71ab816c.png",
      alt: "Azaro Air fabric against blue sky"
    },
    {
      src: "/lovable-uploads/f29ddcda-8af3-4385-afbe-58412a8cdb21.png",
      alt: "Azaro Air logo with fabric"
    }
  ];

  return (
    <div className="w-full px-4 mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="pl-4">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover animate-float"
                />
                <div className="absolute inset-0 bg-black/10 flex items-end justify-center pb-8">
                  <p className="text-white text-lg font-inter font-light tracking-wide">
                    Air. In motion.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
