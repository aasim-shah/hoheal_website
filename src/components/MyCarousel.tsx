import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "./ui/carousel";
import MyImage from "./MyImage";
import { useRef, useState } from "react";

type Props = {
  images: string[];
};

const MyCarousel = ({ images }: Props) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const [currentBanner, setCurrentBanner] = useState(0);
  const handleCurrentBanner = (index: number) => {
    setCurrentBanner(index);
  };

  const renderImage = (src: any) => {
    // handleCurrentBanner(banner.id);
    return (
      <MyImage
        width={1000}
        height={1000}
        className="w-full h-[30vh] md:h-[50vh] object-cover rounded-lg"
        src={src}
        alt={"Image"}
      />
    );
  };
  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full rounded-lg overflow-hidden"
      >
        <CarouselContent className="gap-4">
          {images?.length > 0 &&
            images.map((src, index) => (
              <CarouselItem key={index}>{renderImage(src)}</CarouselItem>
            ))}
        </CarouselContent>
        <CarouselDots className="mt-2" />
      </Carousel>
    </div>
  );
};

export default MyCarousel;
