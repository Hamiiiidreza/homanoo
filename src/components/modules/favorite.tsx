import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../../endpoints/useUser';
import AuthoritarianSteps from './authoritarian/authoritarian-steps';
import useFavorite from '../../endpoints/useFavorite';

const Favorite = ({
    isFave,
    productCode,
}: {
    isFave: boolean;
    productCode: number;
}) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const { data: user } = useUser();
    const { mutation } = useFavorite();
    const [favorite, setFavorite] = useState(isFave)
    return (
        <>
            <div
                onClick={() => {
                    if (!user) {
                        setShowLoginForm(true);
                    } else {
                        setFavorite(p => !p)
                        mutation.mutate(productCode)
                    };
                }}
                className="cursor-pointer rounded-xl bg-white p-2 sm:shadow-xl transition-colors hover:[&>*]:fill-red-600"
            >
                {favorite ? <Heart size={20} className="stroke-red-600 fill-red-600 transition-colors" /> : <Heart size={20} className="stroke-red-600 transition-colors" />}

            </div>

            {showLoginForm ? (
                <AuthoritarianSteps
                    setIsOpen={setShowLoginForm}
                    endFunction={() => {
                        mutation.mutate(productCode);
                        setShowLoginForm(false);
                        setFavorite(p => !p)
                    }}
                    isOpen={true}
                />
            ) : (
                ''
            )}
        </>
    );
};

export default Favorite;
