import { Calendar, ChevronLeft, UserCircle } from 'lucide-react';
import Container from '../../modules/container';
import { BlogItem } from '../../../types/blog.types';
import BlogCard from '../../../components/modules/blog-section/blog-card';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '../../ui/carousel';
import useBlog from '../../../ednpionts/useBlog';
import { toJalaliDate } from '../../../utils/helpers';
import { localAssetsUrl } from '../../../utils/constants';
import { Skeleton } from '../../ui/skeleton';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';

const BlogScreen = () => {
    const { data, isPending } = useBlog();
    if (!isPending && data.success == false) {
        return (
            <Container>
                <div className="space-y-4 py-40">
                    <p className="text-center text-2xl">مقاله ای یافت نشد</p>
                    <Link to={'/blogs'} className="mx-auto block w-max">
                        <Button variant={'mainShaded'}>
                            برگشت به مقالات <ChevronLeft />
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }
    return (
        <Container>
            <div className="mx-auto flex flex-col gap-y-8 bg-white px-4 pt-4 pb-20">
                <div className="flex w-full flex-col gap-6 pt-6">
                    <h1 className="text-xl font-semibold sm:!text-3xl md:!text-4xl">
                        {isPending ? (
                            <Skeleton className="h-9 w-28 sm:w-48" />
                        ) : (
                            data?.article.name
                        )}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                            <UserCircle className="stroke-neutral-04" />
                            <span className="font-VazirRegular xs:text-base text-sm text-black">
                                {isPending ? (
                                    <Skeleton className="h-8 w-24 sm:!w-28" />
                                ) : data?.article.user?.name ? (
                                    data?.article.user?.name
                                ) : (
                                    'حمیدرضا بختیار'
                                )}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="stroke-neutral-04" />
                            <time className="font-VazirRegular xs:text-base text-sm text-black">
                                {isPending ? (
                                    <Skeleton className="h-8 w-24 sm:!w-28" />
                                ) : (
                                    toJalaliDate(data?.article.createdAt)
                                )}
                            </time>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-6">
                    {isPending ? (
                        <Skeleton className="xs:h-[300px] h-[200px] w-full max-w-full rounded-xl md:!h-[400px]" />
                    ) : (
                        <img
                            className="xs:h-[300px] h-[200px] w-full max-w-full rounded-xl object-cover md:!h-[400px]"
                            src={localAssetsUrl + data?.article.image}
                            alt="Modern bathroom"
                        />
                    )}

                    <div className="flex w-full flex-col gap-3">
                        <p className="font-VazirRegular text-justify text-base leading-7 text-black">
                            {isPending ? (
                                <Skeleton className="xs:h-[300px] h-[200px] w-full max-w-full rounded-xl md:!h-[400px]" />
                            ) : (
                                data?.article.body
                            )}
                        </p>
                    </div>
                </div>
            </div>
            {data?.articles ? (
                <div className="pr-2 pl-4 sm:!p-6">
                    <h2 className="pr-2 pb-3 text-xl font-semibold sm:!text-3xl md:!text-4xl">
                        سایر مقالات
                    </h2>
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
                            direction: 'rtl',
                            loop: true,
                            align: 'start',
                            containScroll: 'trimSnaps',
                        }}
                        className="mb-12 w-full"
                    >
                        <CarouselContent parentContentCls="py-5 px-2" className="px-4">
                            {data.articles.map((article: BlogItem) => (
                                <CarouselItem
                                    key={article._id}
                                    className="min-x-full min-w-full sm:!pl-4 md:!max-w-[45%] md:!min-w-[45%] lg:!max-w-[30%] lg:!min-w-[30%] xl:!max-w-[25%] xl:!min-w-[25%]"
                                >
                                    <BlogCard key={article._id} {...article} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious
                            direction="rtl"
                            className="bg-main absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 text-white sm:flex"
                        />

                        <CarouselNext
                            direction="rtl"
                            className="bg-main absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 text-white sm:flex"
                        />
                    </Carousel>
                </div>
            ) : (
                ''
            )}
        </Container>
    );
};

export default BlogScreen;