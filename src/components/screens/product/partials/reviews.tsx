import { LoaderCircle } from "lucide-react";
import useFeedback from "../../../../endpoints/useFeedback";
import { Product } from "../../../../types/product.types";
import { Review } from "../../../../types/review.types";
import Comments from "./comments";
import ReviewInput from "./review-input";
import { useEffect, useState } from "react";
import { Button } from "../../../ui/button";


const Reviews = ({ data }: { data: Product }) => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPage] = useState<null | number>(null)
    const { data: comments } = useFeedback(data.code, page)

    const [commentsData, setCommentsData] = useState<Review[]>([])

    useEffect(() => {
        if (comments && comments.feedbacks) {
            setCommentsData((prev) => [...prev, ...comments?.feedbacks])
            setTotalPage(comments.pages || 1)
        }
    }, [comments])

    return (
        <section id="comments" className="flex flex-col items-start gap-12 bg-white w-full px-4 py-12">
            <div className="relative w-full">
                <h2 className="self-stretch  text-[#23262F] text-2xl tracking-headline-6 leading-[34px] transition-all  ">
                    نظر شما
                </h2>
                <ReviewInput productCode={data.code} />
            </div>

            <div className="flex flex-col items-start gap-10 w-full">
                {totalPages ?
                    commentsData.length > 0 ?
                        <>
                            <div className="grid md:!grid-cols-2 items-center gap-6 relative w-full">
                                {commentsData.map((review: Review, index: number) => (
                                    <Comments key={index + 1} review={review} />
                                ))}
                            </div>
                            {totalPages > 1 && totalPages !== page ? (
                                <Button
                                    onClick={() => setPage(p => p + 1)}
                                    className="mx-auto py-1.5 mt-4 px-4 h-11"
                                    variant={"mainShaded"}
                                >
                                    مشاهده بیشتر
                                </Button>
                            ) : ""}

                        </> : <p className="text-2xl w-full text-center">نظری یافت نشد</p>
                    : <LoaderCircle className="animate-spin mx-auto block" />}

            </div>
        </section >
    );
};

export default Reviews;