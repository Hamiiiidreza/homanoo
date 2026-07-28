import { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ setRate, rate }: { rate: number | null, setRate: (val: number) => void }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center mx-auto md:!mx-0 gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRate(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110"
                >
                    <Star
                        size={24}
                        className={`transition-colors ${(hover || Number(rate)) >= star
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default StarRating;