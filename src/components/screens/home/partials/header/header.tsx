import React, { useState, useEffect, ReactNode } from "react";
import { PiArrowRight, PiArrowLeft } from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../../../../ui/carousel";
import { localAssetsUrl } from "../../../../../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import headerSkeleton from "./header-skeleton";

type HeaderProps = {
  images?: string[];
  singleImage?: string | null;
  isSlidable?: boolean;
  withGradient?: boolean;
  children?: ReactNode;
  height?: string;
};

const Header: React.FC<HeaderProps> = ({
  images = [],
  singleImage = null,
  isSlidable = true,
  withGradient = true,
  children,
  height = "md:h-[356px] sm:h-[300px] h-[200px]",
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = singleImage ? [singleImage] : images;
  const hasMultipleImages = slides.length > 1;

  useEffect(() => {
    if (!api) return;

    setActiveIndex(api.selectedScrollSnap());
    api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
      <Carousel
        setApi={setApi}
        className="relative w-full"
        opts={{
          direction: "rtl",
          align: "start",
          containScroll: "trimSnaps",
          dragFree: false,
        }}
      >
        <CarouselContent>
          {(slides.length ? slides : ["/Images/img-placeholder-1.png"]).map(
            (img, i) => (
              <CarouselItem key={i} className="basis-full">
                <section
                  className={`relative w-full ${height} rounded-md overflow-hidden bg-cover bg-center hover:drop-shadow-custom transition-all`}
                  style={{
                    backgroundImage: withGradient
                      ? `linear-gradient(180deg, rgba(52,56,57,0) 83%, rgba(52,56,57,0.4) 100%), url(${img})`
                      : `url(${img})`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <div className="pointer-events-auto">{children}</div>
                  </div>
                </section>
              </CarouselItem>
            ),
          )}
        </CarouselContent>

        {isSlidable && hasMultipleImages && (
          <>
            {/* دکمه‌های راست و چپ */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-8 -translate-y-1/2">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={activeIndex === 0}
                className={`rounded-full w-[52px] h-[52px] hidden sm:flex items-center justify-center transition-all
                  ${
                    activeIndex === 0
                      ? "bg-white text-neutral-400"
                      : "bg-white text-neutral-07 hover:drop-shadow-custom"
                  }`}
              >
                <PiArrowRight className="size-8" />
              </button>

              <button
                onClick={() => api?.scrollNext()}
                disabled={activeIndex === slides.length - 1}
                className={`rounded-full w-[52px] h-[52px] hidden sm:flex items-center justify-center transition-all
                  ${
                    activeIndex === slides.length - 1
                      ? "bg-white text-neutral-400"
                      : "bg-white text-neutral-07 hover:drop-shadow-custom"
                  }`}
              >
                <PiArrowLeft className="size-8" />
              </button>
            </div>
          </>
        )}

        {/* دات‌ها */}
        {(isSlidable || hasMultipleImages) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`transition-all drop-shadow-custom ${
                  i === activeIndex
                    ? "w-[30px] h-2 rounded-full bg-neutral-01 border border-solid border-neutral-07"
                    : "size-2 rounded-full bg-neutral-01"
                }`}
              />
            ))}
          </div>
        )}
      </Carousel> 
  );
};

export default Header;
