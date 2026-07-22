import React, { useState } from "react";
import Header from "../../components/templates/header/header";
import Breadcrumb from "../../components/modules/breadcrumb/breadcrumb";
import FilterAndSortpanel from "../../components/ui/filter-and-sortpanel";
import ProductSection from "../../components/modules/product-section/product-section";
import PageHierarchy from "../../components/modules/Page-Hierarchy/page-hierarchy";
import Container from "../../components/modules/container";

const Shop: React.FC = () => {

  return (
    <div>
      <Container>
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
      </Container>
    </div>

  );
};

export default Shop;
