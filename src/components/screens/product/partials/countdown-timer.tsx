import React from 'react'

type TimeItem = {
    value: string;
    label: string;
}

const CountdownTimer = () => {

    const timeItems: TimeItem[] = [
        { value: "۰۲", label: "روز" },
        { value: "۱۲", label: "ساعت" },
        { value: "۴۵", label: "دقیقه" },
        { value: "۰۵", label: "ثانیه" }
    ];

    return (

        <div className="flex flex-col items-start w-full gap-3 px-0 py-6 border-b border-solid border-neutral-03">
            <div className="font-VazirRegular text-base text-neutral-05 leading-[26px] transition-all  ">
                پایان پیشنهاد در:
            </div>
            <div className="inline-flex items-start gap-4 relative">
                {timeItems.map((item) => (
                    <div key={item.label} className="relative w-[60px] h-20">
                        <div className="absolute top-0 left-0 w-[60px] h-[60px] flex items-center justify-center bg-neutral-02 transition-all  ">
                            <div className=" text-neutral-07 text-[34px] tracking-headline-5 leading-[38px] transition-all  ">
                                {item.value}
                            </div>
                        </div>
                        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 font-VazirRegular text-neutral-04 text-xs text-center tracking-[0] leading-5 whitespace-nowrap transition-all  ">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CountdownTimer;