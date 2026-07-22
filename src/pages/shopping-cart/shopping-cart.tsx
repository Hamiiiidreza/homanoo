import React from 'react'
import Navbar from '../../components/modules/navbar';
import Footer from '../../components/modules/footer';
import ShoppingTable from '../../components/templates/shopping-table/shopping-table';

function ShoppingCart() {
  return (
    <div className='px-3 sm:!px-8 xl:!px-40'>
      <Navbar />
      <ShoppingTable />
      <Footer />
    </div>
  )
}

export default ShoppingCart;
