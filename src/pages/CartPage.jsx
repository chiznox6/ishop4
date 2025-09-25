import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';

function CartPage() {
  return (
    <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
        <div className="lg:col-span-2 bg-background-light dark:bg-background-dark rounded-lg shadow-sm">
          <div className="px-6 py-5 border-b border-border-light dark:border-border-dark">
            <h1 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark">Shopping Cart</h1>
            <p className="text-sm text-subtle-light dark:text-subtle-dark">You have 3 items in your cart</p>
          </div>
          <div className="divide-y divide-border-light dark:divide-border-dark">
            <div className="flex items-center gap-4 p-6">
              <img alt="Cozy Knit Sweater" className="size-20 rounded object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6oM5fjyK2c_WajtuO4xJHaVcGE_EOSr6N1pUY9UQnnsxVmfzSU3J3te6fNI20Sxg2ihTiZWoNR5sa1bIm-1u5nTa2fOVhcNW4ruXCwClgOE4LUVLu0ylTNWhOYJDxEqBE3c3mvH8LtYG0C8f1Yd1jFf-5DEFqAsp7WJIv5qrFwTjxGIfBfW-JM7tnUjY5wsUOQYAsR6SOaAHolplYB0djP_LYSJCQW4CMo3e65imTWOLTzt5OhR0DdwA51qfvF4qE3RROcG0AFSA"/>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground-light dark:text-foreground-dark">Cozy Knit Sweater</h3>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Size: M, Color: Cream</p>
                <p className="text-sm font-medium text-foreground-light dark:text-foreground-dark mt-1">$49.99</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center size-8 rounded-full border border-border-light dark:border-border-dark hover:bg-primary/20 text-subtle-light dark:text-subtle-dark transition-colors"><Minus size={16} /></button>
                <span className="w-8 text-center font-medium text-foreground-light dark:text-foreground-dark">1</span>
                <button className="flex items-center justify-center size-8 rounded-full border border-border-light dark:border-border-dark hover:bg-primary/20 text-subtle-light dark:text-subtle-dark transition-colors"><Plus size={16} /></button>
              </div>
              <button className="text-subtle-light dark:text-subtle-dark hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
            <div className="flex items-center gap-4 p-6">
              <img alt="Classic Leather Boots" className="size-20 rounded object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqsB9GqnbtgF6bJgz5vBCdFvUci96Sqh7qvHW8ye5TAxVOXdu1XRSJq5__YcxUAdrsccYZVZ_ZjrdrNE_rQ6bSVfEhs-1KwVLAVyUCD-tKBa_-aDQnyicxWxy3dSNM1EKB-eAsZIuwsGDi9UisT0Y3vxDMFhWu2DILi7BtGdc0pKFsthn1je045KxbYPmylWr0hjYb8uaKqe27PmWlnLwq2e75FPCSu5KDSt7oWT5HJIYJ4CihCGlhlDLv7oPGMzCA8aBeMufAf4Q"/>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground-light dark:text-foreground-dark">Classic Leather Boots</h3>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Size: 8, Color: Black</p>
                <p className="text-sm font-medium text-foreground-light dark:text-foreground-dark mt-1">$120.00</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center size-8 rounded-full border border-border-light dark:border-border-dark hover:bg-primary/20 text-subtle-light dark:text-subtle-dark transition-colors"><Minus size={16} /></button>
                <span className="w-8 text-center font-medium text-foreground-light dark:text-foreground-dark">1</span>
                <button className="flex items-center justify-center size-8 rounded-full border border-border-light dark:border-border-dark hover:bg-primary/20 text-subtle-light dark:text-subtle-dark transition-colors"><Plus size={16} /></button>
              </div>
              <button className="text-subtle-light dark:text-subtle-dark hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
            <div className="flex items-center gap-4 p-6">
              <img alt="Flowy Summer Dress" className="size-20 rounded object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD-gzXtGbtKbEGLSqWdEzMiulMfMsU3Ejkeck7UK-SOqQ2dcmLfkwXDfHqJyUTjndsmDk8fz8p-FCHwgK65mMlM04a08eML2ursY49lDr30b0CgiWilvphngHLtNOW29saENppbbEf6OXkx_fU6n88uIww08nEfQy9iQ0ID_FL_Lbs3x91C6q8mS9SruhUMAfndALlIajmuVP74nI9-G0MRWbxk60XDLJp2_ZVYoasx00h6xph7zOX2U7DhzCpNeOSp5w91agQseQ"/>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground-light dark:text-foreground-dark">Flowy Summer Dress</h3>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Size: S, Color: Floral Print</p>
                <p className="text-sm font-medium text-foreground-light dark:text-foreground-dark mt-1">$65.50</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center size-8 rounded-full border border-border-light dark:border-border-dark hover:bg-primary/20 text-subtle-light dark:text-subtle-dark transition-colors"><Minus size={16} /></button>
                <span className="w-8 text-center font-medium text-foreground-light dark:text-foreground-dark">1</span>
                <button className="flex items-center justify-center size-8 rounded-full border border-border-light dark:border-border-dark hover:bg-primary/20 text-subtle-light dark:text-subtle-dark transition-colors"><Plus size={16} /></button>
              </div>
              <button className="text-subtle-light dark:text-subtle-dark hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-background-light dark:bg-background-dark rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-foreground-light dark:text-foreground-dark border-b border-border-light dark:border-border-dark pb-4 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-subtle-light dark:text-subtle-dark">Subtotal</span>
                <span className="font-medium text-foreground-light dark:text-foreground-dark">$235.49</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-subtle-light dark:text-subtle-dark">Shipping</span>
                <span className="font-medium text-foreground-light dark:text-foreground-dark">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-subtle-light dark:text-subtle-dark">Taxes</span>
                <span className="font-medium text-foreground-light dark:text-foreground-dark">$18.84</span>
              </div>
            </div>
            <div className="border-t border-border-light dark:border-border-dark mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span className="text-foreground-light dark:text-foreground-dark">Total</span>
                <span className="text-foreground-light dark:text-foreground-dark">$254.33</span>
              </div>
            </div>
          </div>
          <div className="bg-background-light dark:bg-background-dark rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-foreground-light dark:text-foreground-dark mb-4">Promo Code</h2>
            <div className="flex space-x-2">
              <input className="flex-1 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground-light dark:text-foreground-dark placeholder-subtle-light dark:placeholder-subtle-dark" placeholder="Enter code" type="text"/>
              <button className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg text-sm hover:bg-primary/30 transition-colors">Apply</button>
            </div>
          </div>
          <Link to="/checkout" className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <span>Proceed to Checkout</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
