import React from "react";
import Header from "../../components/templates/header/header";
import Hero from "../../components/screens/home/partials/hero";
import CategorySection from "../../components/templates/category-section/category-section";
import ProductSection from "../../components/modules/product-section/product-section";
import ServicesSection from "../../components/modules/services-section/services-section";
import SaleBanner from "../../components/modules/sale-banner/sale-banner";
import BlogSection from "../../components/modules/blog-section/blog-section";
import Container from "../../components/modules/container";

function Home() {
  return (
    <div>
      <Container>
        <Header
          images={[
            "/Images/img-placeholder-1.png",
            "/Images/img-placeholder-2.png",
            "/Images/img-placeholder-3.png",
          ]}
          isSlidable={true}
          withGradient={true}
        />
        <div className="space-y-20">
          <Hero />

          <CategorySection />
          <ProductSection
            showHeader={true}
          />
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
          <BlogSection />
          <div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
