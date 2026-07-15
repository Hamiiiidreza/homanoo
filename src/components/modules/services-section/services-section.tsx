import React from "react";
import ServiceCard from "./service-card";

export type ServicesSectionProps = {
  withBackground?: boolean;
  withPaddingBottom?: boolean;
};

const ServicesSection: React.FC<ServicesSectionProps> = ({
  withBackground = false,
  withPaddingBottom = true,
}) => {
  const Cards = (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 lg:!gap-6">
      <ServiceCard
        icon="/Images/service-1.svg"
        title="ارسال رایگان"
        description="برای سفارش‌های بالای ۲۰۰ دلار"
      />
      <ServiceCard
        icon="/Images/service-2.svg"
        title="بازگشت وجه"
        description="ضمانت بازگشت تا ۳۰ روز"
      />
      <ServiceCard
        icon="/Images/service-3.svg"
        title="پرداخت امن"
        description="پرداخت امن توسط Stripe"
      />
      <ServiceCard
        icon="/Images/service-4.svg"
        title="پشتیبانی ۲۴/۷"
        description="پشتیبانی از طریق تلفن و ایمیل"
      />
    </div>
  );

  return (
    <section className='w-full bg-white transition-all mt-20'>
      <h2 className="font-VazirMedium pb-15 text-xl sm:text-4.5xl text-black leading-none tracking-headline-7 transition-all hover:drop-shadow-custom">
        {" "}
        چرا هومانو رو انتخاب کنیم؟
      </h2>
      {withBackground ? (
        <div className="w-full bg-neutral-02 rounded-xl py-12">
           {Cards} 
        </div>
      ) : (
         Cards  
      )}
    </section>
  );
};

export default ServicesSection;
