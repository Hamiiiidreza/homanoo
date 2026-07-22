import React from 'react'
import Navbar from '../../components/modules/navbar';
import OrderDetails from '../../components/templates/order-details/order-details';
import Footer from '../../components/modules/footer';

function OrderComplete() {
    return (
        <div className='px-3 sm:!px-8 xl:!px-40'>
            <Navbar />
            <OrderDetails />
            <Footer />
        </div>
    )
}

export default OrderComplete;
