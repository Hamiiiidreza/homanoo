import { Link } from "react-router-dom";
import Newsletter from "./news-letter";

const Footer = () => (
    <footer>
        <Newsletter />
        <div className="w-full bg-neutral-07 px-8 md:px-40 pt-12 lg:px-40 pb-7">
            <div className="flex flex-col md:!gap-10 gap-6 justify-between items-center mb-16">
                <div className="flex flex-col md:flex-row lg:flex-row items-center gap-4 md:gap-8 lg:gap-12 mb-6 md:mb-0 text-center md:text-left">
                    <Link to={'/'}>
                        <img
                            className='h-24 mix-blend-exclusion grayscale-100' src="/Images/logo-black.jpg" alt="" />
                    </Link>
                    <div className="w-6 h-px md:w-px md:h-6 bg-neutral-04 my-2 md:my-0"></div>
                    <p className="font-VazirRegular text-base text-right text-neutral-03">
                        فروشگاه هدیه و دکوراسیون
                    </p>
                </div>

                <nav className="flex flex-col md:flex-row lg:flex-row items-center gap-4 md:gap-10 lg:gap-12">

                    <Link
                        to="/"
                        className="font-VazirRegular text-base text-neutral-01"
                    >
                        خانه
                    </Link>
                    <Link
                        to="/shop"
                        className="font-VazirRegular text-base text-neutral-01"
                    >
                        فروشگاه
                    </Link>
                    <Link
                        to="/blogs"
                        className="font-VazirRegular text-base text-neutral-01"
                    >
                        مقالات
                    </Link>
                    <Link
                        to="/rules"
                        className="font-VazirRegular text-base text-neutral-01"
                    >
                        قوانین
                    </Link>
                    <Link
                        to="/contact-us"
                        className="font-VazirRegular text-base text-neutral-01"
                    >
                        تماس با ما
                    </Link>
                </nav>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-6 pt-4 pb-5 lg:pt-6 lg:pb-6 border-t border-neutral-04">
                <div className="flex gap-6 order-1 md:order-2">
                    <Link to="" aria-label="Instagram">
                        <img
                            className="size-6 lg:size-7"
                            src="/Images/instagram.svg"
                            alt="Instagram"
                        />
                    </Link>
                    <Link to="" aria-label="Facebook">
                        <img
                            className="size-6 lg:size-7"
                            src="/Images/facebook.svg"
                            alt="Facebook"
                        />
                    </Link>
                    <Link to="" aria-label="YouTube">
                        <img
                            className="size-6 lg:size-7"
                            src="/Images/youtube.svg"
                            alt="YouTube"
                        />
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row items-center gap-3 md:gap-7 lg:gap-10 order-2 md:order-1 text-center md:text-left">
                    <p className="font-VazirRegular text-xs lg:text-sm text-neutral-03 order-2 md:order-1">
                        © 2026 هومانو. تمامی حقوق محفوظ است
                    </p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;

