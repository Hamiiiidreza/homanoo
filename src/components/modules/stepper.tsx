import React from "react";

type StepperProps = {
    title: string;
    currentStep: number;
}

type Step = {
    id: number;
    name: string;
};

const Stepper: React.FC<StepperProps> = ({ title, currentStep }) => {
    const steps: Step[] = [
        { id: 1, name: "سبد خرید" },
        { id: 2, name: "اطلاعات پرداخت " },
        { id: 3, name: "تکمیل سفارش" },
    ];

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <h2 className="font-VazirMedium text-neutral-07 text-3xl sm:text-4xl lg:text-[54px] text-center transition-all hover:drop-shadow-custom">
                {title}
            </h2>

            <div className="w-[80%] flex justify-center">
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
                                className={`
                  flex flex-col pb-4
                  sm:flex-1

                  ${!isVisibleOnMobile
                                        ? "hidden sm:flex"
                                        : "flex"
                                    }

                  ${isCurrent
                                        ? "flex-1"
                                        : ""
                                    }

                  ${isCompleted
                                        ? "border-b-2 border-secondary-color-green"
                                        : ""
                                    }

                  ${isCurrent
                                        ? "border-b-2 border-[#23262F]"
                                        : ""
                                    }
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`
                      flex items-center justify-center rounded-full size-10 shrink-0
                      ${isCompleted ? "bg-secondary-color-green text-white" : ""}
                      ${isCurrent ? "bg-main text-white" : ""}
                      ${isUpcoming ? "bg-[#B1B5C3] text-white" : ""}
                    `}
                                    >
                                        {isCompleted ? (
                                            <img src="/Images/tick.svg" className="size-6" />
                                        ) : (
                                            <span className="font-VazirBold text-base">
                                                {step.id.toLocaleString('fa-IR')}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`
                      font-VazirBold text-sm sm:text-base truncate
                      ${step.id !== currentStep ? "hidden sm:block" : "block"}

                      ${isCompleted ? "text-secondary-color-green" : ""}
                      ${isCurrent ? "text-[#23262F]" : ""}
                      ${isUpcoming ? "text-[#B1B5C3]" : ""}
                    `}
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
}

export default Stepper;

