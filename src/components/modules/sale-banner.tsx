import React from 'react';
import ArrowLink from '../ui/arrow-link';

type SaleBannerProps = {
    showSaleText?: boolean;
    saleText?: string;
    title: React.ReactNode | string;
    description: React.ReactNode | string;
    withContainer?: boolean;
    descriptionClass?: string;
}

const SaleBanner: React.FC<SaleBannerProps> = ({
    showSaleText = true,
    saleText = 'حراج تا ۳۵٪ تخفیف',
    title,
    description,
    withContainer = false,
    descriptionClass = 'text-base sm:text-xl leading-6.5 sm:leading-8'
}) => {
    return (
        <section
            className={`
                w-full flex flex-col md:flex-row bg-neutral-02 rounded-xl
                ${withContainer ? 'container' : ''}
            `}
        >
            <img
                className="w-full md:w-1/2 h-[200px] md:rounded-xl rounded-t-xl shadow sm:!h-[430px] bg-cover bg-center"
                src="/Images/salebanner.png"
                alt="salebanner"
            />

            <div className="w-full md:w-1/2  flex items-center justify-start lg:!justify-center p-7 lg:!p-12">
                <div className="max-w-md">
                    {showSaleText && (
                        <p className="font-VazirBold text-base text-main mb-4 leading-none transition-all hover:drop-shadow-custom">
                            {saleText}
                        </p>
                    )}

                    <h2 className="font-VazirMedium leading-9.5 sm:leading-11 text-neutral-07 text-3xl sm:!text-[34px] sm:text-4xl mb-4 tracking-headline-5 sm:tracking-headline-4 transition-all hover:drop-shadow-custom">
                        {title}
                    </h2>

                    <p className={`font-VazirRegular text-neutral-07 mb-6 transition-all hover:drop-shadow-custom ${descriptionClass}`}>
                        {description}
                    </p>

                    <ArrowLink
                        title="مشاهده فروشگاه"
                        textColor="text-neutral-07"
                        borderColor="border-neutral-07"
                        to="/Shop"
                    />
                </div>
            </div>
        </section>
    );
};

export default SaleBanner;
