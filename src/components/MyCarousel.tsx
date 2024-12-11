import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "./ui/carousel";

type Props = {
  data: [];
  renderItem: (item: any) => JSX.Element;
  showDots?: boolean;
};

const MyCarousel = ({ data, renderItem, showDots = false }: Props) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full rounded-lg overflow-hidden"
      >
        <CarouselContent className="gap-4">
          {data?.length > 0 &&
            data.map((item, index) => (
              <CarouselItem key={index}>{renderItem(item)}</CarouselItem>
            ))}
        </CarouselContent>
        {showDots && <CarouselDots className="mt-2" />}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
