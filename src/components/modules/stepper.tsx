type StepperProps = {
    title: string;
    currentStep: number;
};

type Step = {
    id: number;
    name: string;
};

const Stepper = ({ title, currentStep }: StepperProps) => {
    const steps: Step[] = [
        { id: 1, name: 'سبد خرید' },
        { id: 2, name: 'اطلاعات پرداخت' },
        { id: 3, name: 'تکمیل سفارش' },
    ];

    return (
        <div className="flex w-full flex-col items-center gap-8">
            <h2 className="text-neutral-07 text-center text-3xl transition-all sm:text-4xl lg:text-[54px]">
                {title}
            </h2>

            <div className="flex w-full justify-center">
                <div className="flex w-full max-w-5xl gap-4 sm:gap-6 lg:gap-8">
                    {steps.map((step) => {
                        const isCompleted = currentStep > step.id;
                        const isCurrent = currentStep === step.id;
                        const isUpcoming = currentStep < step.id;

                        const isVisibleOnMobile =
                            step.id === currentStep || step.id === currentStep + 1;

                        return (
                            <div
                                key={step.id}
                                className={`flex flex-col pb-4 sm:flex-1 ${!isVisibleOnMobile ? 'hidden sm:flex' : 'flex'} ${isCurrent ? 'flex-1' : ''} ${isCompleted || currentStep == 3
                                        ? 'border-secondary-color-green border-b-2'
                                        : ''
                                    } ${isCurrent ? 'border-b-2 border-[#23262F]' : ''} `}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <div
                                        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${isCompleted || currentStep == 3 ? 'bg-secondary-color-green text-white' : ''} ${isCurrent ? 'bg-main text-white' : ''} ${isUpcoming ? 'bg-[#B1B5C3] text-white' : ''} `}
                                    >
                                        {isCompleted || currentStep == 3 ? (
                                            <img src="/Images/tick.svg" className="size-6" />
                                        ) : (
                                            <span className="text-base font-bold">
                                                {step.id.toLocaleString('fa-IR')}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`truncate text-center text-sm font-bold sm:text-base ${step.id !== currentStep ? 'hidden sm:block' : 'block'} ${isCompleted ? 'text-secondary-color-green' : ''} ${isCurrent && step.id !== 3 ? 'text-[#23262F]' : 'text-[#23262F]'} ${isUpcoming ? 'text-[#B1B5C3]' : ''} `}
                                    >
                                        {step.name}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Stepper;

