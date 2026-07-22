import React from 'react'
import PageHierarchy from '../../components/modules/Page-Hierarchy/page-hierarchy';
import ProductDetails from '../../components/templates/product-details/product-details';
import type { Product } from '../../types/product.types';
import { useParams } from "react-router-dom";
import Container from '../../components/modules/container';

type ProductProps = {
  product: Product;
}

const Product: React.FC<ProductProps> = ({ product }) => {

  const { id } = useParams();

  return (
    <div>
      <Container>
        <PageHierarchy
          items={["خانه", "فروشگاه", "اتاق نشیمن", "محصول"]}
        />
        <ProductDetails />
      </Container>
    </div>
  )
}

export default Product;
