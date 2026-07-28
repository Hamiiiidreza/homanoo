import { useState } from 'react';
import useFeedback from '../../../../endpoints/useFeedback';
import StarRating from './star-rating';
import { useUser } from '../../../../endpoints/useUser';
import { Button } from '../../../ui/button';
import AuthoritarianSteps from '../../../modules/authoritarian/authoritarian-steps';
import { toast } from 'sonner';

const ReviewInput = ({ productCode }: { productCode: number }) => {
    const { createMutation } = useFeedback()
    const [comment, setComment] = useState('')
    const [rate, setRate] = useState<null | number>(null)
    const { data: user } = useUser();
    const [showLoginForm, setShowLoginForm] = useState(false);
    return (
        <>
            <div className="flex flex-col w-full items-end justify-center gap-10 pt-4">
                <form className="flex md:!flex-row flex-col w-full items-start justify-between pl-6 pr-4 py-4 relative bg-white rounded-2xl border-2 border-neutral-03">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="نظر خود را بنویسید"
                        className="relative md:!w-fit ml-6 text-neutral-05 text-base tracking-normal leading-relaxed bg-transparent border-0 outline-0 flex-1 transition-all w-full md:!min-h-auto min-h-[150px]"
                        aria-label="نوشتن نظر"
                    />
                    <div className='flex md:!flex-row justify-center md:!w-max w-full flex-col gap-4 pt-2 md:!border-t-0 border-t-2 border-neutral-03'>
                        <StarRating rate={rate} setRate={setRate} />

                        <Button
                            onClick={(e) => {
                                e.preventDefault()
                                if (!rate || !comment) {
                                    return toast.error("لطفا امتیاز و نظر خود را درج کرده و سپس  اقدام به ثبت نظر کنید")
                                }
                                if (!user) {
                                    setShowLoginForm(true);
                                } else {
                                    createMutation.mutate({ data: { comment: comment, rating: Number(rate) }, productCode }, {
                                        onSuccess: () => {
                                            setRate(0)
                                            setComment("")
                                        }
                                    });
                                };
                            }}
                            variant={"main"}
                        >
                            ثبت نظر
                        </Button>
                    </div>
                </form>
            </div>
            {showLoginForm ? (
                <AuthoritarianSteps
                    setIsOpen={setShowLoginForm}
                    endFunction={() => {
                        createMutation.mutate({ data: { comment: comment, rating: Number(rate) }, productCode });
                        setShowLoginForm(false);
                        setRate(0)
                        setComment("")
                    }}
                    isOpen={true}
                />
            ) : (
                ''
            )}
        </>
    )
}
export default ReviewInput;
