import React from "react";
import Topbar from "../../components/modules/topbar/topbar";
import Navbar from "../../components/modules/navbar/navbar";
import Header from "../../components/templates/header/header";
import Hero from "../../components/templates/hero/hero";
import CategorySection from "../../components/templates/category-section/category-section";
import ProductSection from "../../components/modules/product-section/product-section";
import ServicesSection from "../../components/modules/services-section/services-section";
import SaleBanner from "../../components/modules/sale-banner/sale-banner";
import BlogSection from "../../components/modules/blog-section/blog-section";
import Footer from "../../components/modules/footer/footer";

function Home() {
  return (
    <div>
      <Topbar />
      <div className="px-3 sm:!px-8 xl:!px-40">
        <Navbar />
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
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
