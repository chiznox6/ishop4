import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  return (
    <div className="container mx-auto p-6 text-center min-h-screen flex flex-col items-center justify-center">
      <div className="card bg-base-100 shadow-xl p-8 max-w-md w-full">
        <h2 className="text-4xl font-bold text-success mb-4">Order Placed!</h2>
        <p className="text-lg text-base-content mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
        <p className="text-base-content mb-8">You will receive an email confirmation shortly.</p>
        <Link to="/shop" className="btn btn-primary btn-wide">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
