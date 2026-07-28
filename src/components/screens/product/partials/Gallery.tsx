import { useEffect, useState } from "react";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../../../ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { localAssetsUrl } from "../../../../utils/constants";

const Gallery = ({
    images
}: {
    images: string[];
}) => {
    const [api, setApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);


    useEffect(() => {
        if (!api) return;
        setActiveIndex(api.selectedScrollSnap());
        api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
    }, [api]);

    return (
        <div className="flex flex-col gap-6 md:!w-[300px] w-full relative xl:!w-[350px]">
            <Carousel
                className="xl:!w-[350px] md:!w-[300px] w-full md:!h-auto h-[240px]"
                setApi={setApi}
                opts={{
                    direction: "rtl",
                    align: "start",
                    containScroll: "trimSnaps",
                    dragFree: false,
                    loop: true
                }}
            >
                <CarouselContent>
                    {images.map((src, i) => (
                        <CarouselItem key={i}>
                            <div className="relative w-full overflow-hidden rounded-lg transition-all">
                                <div className="w-full h-full">
                                    <img
                                        src={localAssetsUrl + src}
                                        alt={`product-${i}`}
                                        className="rounded-md h-[240px] md:!h-max xl:!h-[300px] object-cover w-full mx-auto"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="absolute inset-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <button
                    onClick={() => api?.scrollPrev()}
                    disabled={activeIndex === 0}
                    className={`size-10 rounded-full flex items-center justify-center transition-all pointer-events-auto
                        ${activeIndex === 0 ? "bg-white text-neutral-400" : "bg-white text-neutral-07"}
                    `}
                >
                    <ChevronRight className="size-6" />
                </button>

                <button
                    onClick={() => api?.scrollNext()}
                    disabled={activeIndex === images.length - 1}
                    className={`size-10 rounded-full flex items-center justify-center transition-all pointer-events-auto
                        ${activeIndex === images.length - 1 ? "bg-white text-neutral-400" : "bg-white text-neutral-07"}
                    `}
                >
                    <ChevronLeft className="size-6" />
                </button>
            </div>

            <div className="hidden md:flex justify-center gap-4 w-full">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => api?.scrollTo(i)}
                        className={`flex-1 cursor-pointer aspect-square max-w-[56px] size-[56px] bg-cover bg-center rounded-md transition-all 
                    ${activeIndex === i ? "ring-2 ring-neutral-07" : ""}  
                `}
                        style={{ backgroundImage: `url(${localAssetsUrl + img})` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
