import React, { useState } from "react";
import Topbar from "../../components/modules/topbar/topbar";
import Navbar from "../../components/modules/navbar/navbar";
import Header from "../../components/templates/header/header";
import Breadcrumb from "../../components/modules/breadcrumb/breadcrumb";
import FilterAndSortpanel from "../../components/ui/filter-and-sortpanel";
import ProductSection from "../../components/modules/product-section/product-section";
import PageHierarchy from "../../components/modules/Page-Hierarchy/page-hierarchy";
import Footer from "../../components/modules/footer/footer";

const Shop: React.FC = () => {
  
  return (
    <div>
      <Topbar />
      <div className="px-3 sm:!px-8 xl:!px-40">
        <Navbar />
          
        <PageHierarchy
        items={[
          "خانه",
          "فروشگاه",
        ]}
        />
          <FilterAndSortpanel mode="shop" />
        
        <ProductSection
          showHeader={false}
          isSlider={false}
        />
        <div>
          <Footer />
        </div>
      </div>
    </div>

  );
};

export default Shop;
