import SectionTitle from "../../../../ui/section-header";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { Product } from "../../../../../types/product.types";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "../../../../modules/product-card";
import ProductsSkeleton from "./products-skeleton";

const Products = ({ data }: { data?: Product[] }) => {

    return (
        <section className="w-full bg-white">
            <SectionTitle
                title="محصولات جدید"
                linkText="سایر محصولات"
                to="/shop"
            />

            {data ? (
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnFocusIn: false,
                            stopOnMouseEnter: false,
                            stopOnInteraction: false,
                            stopOnLastSnap: false,
                        }),
                    ]}
                    opts={{
                        direction: "rtl",
                        loop: true,
                        align: "start",
                        containScroll: "trimSnaps",
                    }}
                    className="w-full"
                >
                    <CarouselContent parentContentCls="py-5 px-2" className="px-4">
                        {data.map((product) => (
                            <CarouselItem
                                key={product.code}
                                className="min-w-full min-x-full xl:!min-w-[25%] xl:!max-w-[25%] lg:!min-w-[30%] lg:!max-w-[30%] md:!min-w-[45%] md:!max-w-[45%] sm:!pl-8"
                            >
                                <ProductCard data={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious
                        direction="rtl"
                        className="hidden sm:flex size-10 [&>*]:!size-6 absolute bg-main text-white left-2 top-1/2 -translate-y-1/2 z-10"
                    />

                    <CarouselNext
                        direction="rtl"
                        className="hidden sm:flex size-10 [&>*]:!size-6 absolute bg-main text-white right-2 top-1/2 -translate-y-1/2 z-10"
                    />
                </Carousel>
            ) :
                <ProductsSkeleton />}


            {/* <div className="flex justify-center mt-10">
        <ButtonCard
          title="مشاهده بیشتر"
          onClick={() => console.log("Show more clicked")}
          className="add-to-cart-btn  text-neutral-07 text-base text-center leading-7 tracking-button-s whitespace-nowrap box-border inline-flex items-center justify-center gap-2 px-10 py-1.5 rounded-full border border-neutral-07 transition-all hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        />
      </div> */}

            {/* <div className="flex justify-start mt-6 md:hidden">
        <Link
          to=""
          className="flex items-center gap-1 pb-1 mt-4 md:mt-0 transition-all hover:shadow-[0_4px_4px_rgba(0, 0, 0, 0.25)]"
        >
          <span className=" text-sm text-neutral-07">
            سایر محصولات
          </span>
          <GoArrowLeft className="size-5" />
        </Link>
      </div> */}
        </section>
    );
};

export default Products;