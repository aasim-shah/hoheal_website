import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type Props = {
  data: any[]; // Supports images or services
  renderItem: (item: any) => JSX.Element;
  showDots?: boolean;
  multiItem?: boolean; // If true, show multiple items in one view
  itemsPerView?: number; // Number of items to show per slide (used with multiItem)
};

const MyCarousel = ({
  data,
  renderItem,
  showDots = false,
  multiItem = false,
  itemsPerView = 1,
}: Props) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const itemClass = multiItem
    ? `basis-1/${itemsPerView} px-2` // Dynamically set width based on itemsPerView
    : "w-full";

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
              <CarouselItem key={index} className={itemClass}>
                {renderItem(item)}
              </CarouselItem>
            ))}
        </CarouselContent>
        {showDots && <CarouselDots className="mt-2" />}
        {multiItem && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
