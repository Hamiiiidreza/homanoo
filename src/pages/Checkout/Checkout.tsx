import React from 'react'
import Navbar from '../../components/modules/navbar';
import Footer from '../../components/modules/footer';
import PaymentDetails from '../../components/templates/checkout/payment-details';

function Checkout() {
    return (
        <div className='px-3 sm:!px-8 xl:!px-40'>
            <Navbar />
            <PaymentDetails />
            <Footer />
        </div>
    )
}

export default Checkout;
