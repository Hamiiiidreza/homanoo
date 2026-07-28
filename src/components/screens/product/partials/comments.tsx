import { Star } from 'lucide-react';
import { Review } from '../../../../types/review.types';
import { toJalaliDate } from '../../../../utils/helpers';

const Comments = ({ review }: { review: Review }) => {
    return (
        <div className="shadow-m border-neutral-03 relative w-full items-start gap-10 rounded-xl border-b border-solid p-4">
            <div className="flex items-center gap-3">
                <img
                    className="xs:!size-18 relative size-12 rounded-full bg-cover bg-[50%_50%]"
                    src={(review as any).avatar ?? '/Images/User.svg'}
                    alt={`${review.user?.name} تصویر پروفایل`}
                />
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <p className="font-VazirMedium xs:!text-base text-sm">
                            {review.user?.name}
                        </p>
                        <p className="font-VazirRegular text-xs whitespace-nowrap">
                            {toJalaliDate(review.createdAt)}
                        </p>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(review.rating)].map(() => (
                            <Star className="xs:!size-5 size-4 fill-orange-500 stroke-orange-500" />
                        ))}
                    </div>
                </div>
            </div>
            <p className="font-VazirRegular w-full pt-3 text-base leading-[26px] tracking-[0] text-[#353945]">
                {review.comment}
            </p>
        </div>
    );
};

export default Comments;
