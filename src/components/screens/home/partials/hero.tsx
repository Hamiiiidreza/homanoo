import React from "react";

const Hero: React.FC = () => (
  <section className="flex flex-col lg:flex-row items-center md:!pt-13 pt-10 justify-between gap-4 md:gap-8 w-full bg-white">
    <h2 className="w-[57.5] text-xl md:text-3xl xl:text-4xl font-VazirMedium text-center tracking-hero hover:drop-shadow-custom transition-all">
      <span className="text-neutral-07 inline-block">منحصربه‌فرد و ساده</span>
      <span className="text-neutral-04 inline-block">/</span>

      <span className="text-neutral-07">به‌سادگی بهتر</span>
    </h2>

    <div className="md:!w-[42.5] w-full lg:max-w-md">
      <p className="font-VazirRegular text-base leading-1.625 text-neutral-04 hover:drop-shadow-custom text-justify transition-all">
        <span className="text-base font-InterSemiBold leading-1.625 text-neutral-05">
          ۳اِلِگِنت
        </span>{" "}
        یک فروشگاه هدایا و تزئینات مستقر در شهر هوشی‌مین، ویتنام است. از سال
        ۲۰۱۹ فعالیت خود را آغاز کرده است.
      </p>
    </div>
  </section>
);

export default Hero;
