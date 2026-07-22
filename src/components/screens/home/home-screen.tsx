import Hero from "./partials/hero";
import Categories from "./partials/categories/categories";
import Products from "./partials/products/products";
import ServicesSection from "../../../components/modules/services-section/services-section";
import SaleBanner from "../../modules/sale-banner";
import Container from "../../modules/container";
import Blogs from "./partials/blogs/blogs";
import useLanding from "../../../endpoints/useLanding";
import Banners from "./partials/banners/banners";
import Search from "./partials/search";

const HomeScreen = () => {
    const { data } = useLanding()

    return (
        <Container>
            <Search />
            <div className="space-y-20 pb-20 pt-12">
                <Products data={data?.products} />

                <Categories data={data?.categories} />
                <ServicesSection />
                <SaleBanner
                    showSaleText
                    title={
                        <>
                            صدها <br /> قیمت جدید و پایین‌تر!
                        </>
                    }
                    description="حالا بیش از هر زمان دیگری مقرون‌به‌صرفه است که به هر اتاق خانه‌تان ظاهری شیک و تازه بدهید."
                />
                <Banners
                    data={data?.banner}
                />
                <Blogs data={data?.articles} />
            </div>
        </Container>
    );
};

export default HomeScreen;
