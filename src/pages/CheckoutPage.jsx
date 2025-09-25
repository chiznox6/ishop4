import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CheckoutPage() {
  return (
    <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-sm">
            <Link className="text-subtle-light dark:text-subtle-dark hover:text-primary" to="/cart">Shopping Cart</Link>
            <span>/</span>
            <span className="font-medium text-foreground-light dark:text-foreground-dark">Checkout</span>
          </div>
          <h2 className="text-3xl font-bold">Checkout</h2>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Shipping Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="fullName">Full Name</label>
                <input className="form-input w-full bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark rounded-lg placeholder:text-subtle-light dark:placeholder:text-subtle-dark" id="fullName" type="text"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
                <input className="form-input w-full bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark rounded-lg placeholder:text-subtle-light dark:placeholder:text-subtle-dark" id="address" type="text"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                <input className="form-input w-full bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark rounded-lg placeholder:text-subtle-light dark:placeholder:text-subtle-dark" id="city" type="text"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                  <input className="form-input w-full bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark rounded-lg placeholder:text-subtle-light dark:placeholder:text-subtle-dark" id="state" type="text"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="zip">Zip Code</label>
                  <input className="form-input w-full bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark rounded-lg placeholder:text-subtle-light dark:placeholder:text-subtle-dark" id="zip" type="text"/>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">Card Number</label>
                <input className="form-input w-full bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark rounded-lg placeholder:text-subtle-light dark:placeholder:text-subtle-dark" id="cardNumber" type="text"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                  <input className="form-input w-full bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark rounded-lg placeholder:text-subtle-light dark:placeholder:text-subtle-dark" id="expiryDate" type="text"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cvv">CVV</label>
                  <input className="form-input w-full bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark rounded-lg placeholder:text-subtle-light dark:placeholder:text-subtle-dark" id="cvv" type="text"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-xl space-y-6 self-start">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhvtRzHgXdRCmN6DpfHc9LV3uNn73U0e2v0_gwWrwqCnZgng4QDmfSEQcbh2UwmvnBHUpQ2EDrLJ75iQv9IhUeLfrqHnnVhhm6KoopH1HFwNm2FMpNRAdXNNc8ofSPt6acLc7auN0Z0kzyS0QpzLu2k-mkSZx4fLm3p2dNEV1mKX55ElM-QudC5kQq95Rr5zE-xK9ozI6G4WNCbMclwi4aUSuQZc9eyyfdpsOCG8sdmtYrO8LdzDZZFM5e58xgHNLQ-6RpSzvdO1o")' }}></div>
              <div className="flex-grow">
                <p className="font-medium">Product A</p>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Quantity: 1</p>
              </div>
              <p className="font-medium">$20.00</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLiIsN52mknvtnhJSQjhRednppsj5DVJxxM-kgGWqszWEIMmuceZmUrwJDoi4kwfB011joOOG1C8odvHvge_x5sa00Cmnz1pYs-n6q_bnZ3rY3tzY0KbnX2w4VqTg38bOijkEMsYbx7WBMNsl8Yhf4Sz-NfQHkGIpgFSWSt7lfIvbb4z0XnYEKNGMsBxq7tddKUfcf0O2hms88-_B2F2aYPz16z-4A7cs53R5hZMOnYB4shtd8p008DmHk5DYff7PHL2WyAX_W_7M")' }}></div>
              <div className="flex-grow">
                <p className="font-medium">Product B</p>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Quantity: 2</p>
              </div>
              <p className="font-medium">$30.00</p>
            </div>
          </div>
          <div className="border-t border-border-light dark:border-border-dark pt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <p className="text-subtle-light dark:text-subtle-dark">Subtotal</p>
              <p>$50.00</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-subtle-light dark:text-subtle-dark">Shipping</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-subtle-light dark:text-subtle-dark">Tax</p>
              <p>$2.50</p>
            </div>
            <div className="border-t border-border-light dark:border-border-dark my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>$57.50</p>
            </div>
          </div>
          <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
