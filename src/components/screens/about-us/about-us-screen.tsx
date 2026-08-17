import React from 'react'
import Breadcrumb from '../../modules/breadcrumb';
import SaleBanner from '../../modules/sale-banner';
import ServicesSection from '../../../components/modules/services-section/services-section';
import Container from '../../modules/container';

function AboutUs() {
    return (
        < >
            <Container>
                <Breadcrumb className="pt-5" title="درباره ما" />
                <div className="container flex flex-col w-full items-start gap-6 mt-10 mb-12">
                    <h1
                        className="max-w-[834px] font-VazirMedium text-neutral-07 text-[28px] md:text-[54px] tracking-headline-6 md:tracking-headline-3 leading-8.5 md:leading-14.5 transition-all hover:drop-shadow-custom"
                    >
                        ما به دکوراسیون پایدار باور داریم و به زندگی در خانه علاقه‌مندیم.
                    </h1>
                    <p
                        className="max-w-[834px] font-VazirRegular text-neutral-07 text-base tracking-[0] leading-6.5 transition-all hover:drop-shadow-custom"
                    >
                        محصولات ما شامل مبلمان ماندگار با پارچه‌های طبیعی، خطوط منحنی، آینه‌های متعدد و طراحی کلاسیک است
                        که می‌تواند در هر پروژه دکوراسیونی استفاده شود. این قطعات با سادگی و اصالت خود
                        برای ماندگاری در نسل‌ها طراحی شده‌اند و در عین وفاداری به سبک‌های هر دوره،
                        لمس ظریفی از طراحی مدرن را نیز در خود دارند.
                    </p>
                </div>
                <SaleBanner
                    withContainer
                    showSaleText={false}
                    title="درباره ما"
                    description={
                        <>
                            گالری <span className="text-base font-VazirBold leading-1.625 text-main">
                                هومانو
                            </span>{" "}، مرجع تخصصی دکوراسیون داخلی و اکسسوری‌های خاص منزل.
                            <br />
                            تعهد ما از زمان تاسیس، ارائه محصولات باکیفیت و طراحی‌های منحصر به فرد بوده است.
                            <br />
                            تیم پشتیبانی هومانو در تمامی مراحل انتخاب و خرید، در کنار شماست تا فضایی رویایی بسازید.
                        </>
                    }
                    descriptionClass='text-base leading-6.5'
                />
                <div className="mb-10">
                    <ServicesSection
                        withBackground
                        withPaddingBottom={false}
                    />
                </div>
            </Container>
        </>
    )
}

export default AboutUs;