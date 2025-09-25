import React, { useContext, useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../App';
import { logoutUser, fetchCart } from '../services/api';
import { Search, Heart, ShoppingCart } from 'lucide-react';

const Layout = ({ children, cartRefreshTrigger }) => { // Accept cartRefreshTrigger as prop
  const { user, logout } = useContext(AuthContext);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const getCartItemCount = async () => {
      if (user) {
        try {
          const cart = await fetchCart();
          const totalItems = cart.order_items ? cart.order_items.reduce((sum, item) => sum + item.quantity, 0) : 0;
          setCartItemCount(totalItems);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };
    getCartItemCount();
  }, [user, cartRefreshTrigger]); // Re-fetch cart count when user logs in/out or cart is refreshed

  const onLogout = async () => {
    try {
      await logoutUser();
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-200 font-display">
      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link className="flex items-center gap-3 text-white hover:text-primary transition-colors" to="/">
                {/* SVG Logo from Homepage HTML */}
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <span className="text-2xl font-bold">iShop4U</span>
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" to="/">Home</Link>
                <Link className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" to="/shop">Shop</Link>
                <Link className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" to="/dashboard">Dashboard</Link>
                <Link className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" to="/deals">Deals</Link>
                <Link className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" to="/brands">Brands</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </span>
                <input className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border-transparent focus:ring-primary focus:border-primary text-white placeholder-gray-400" placeholder="Search" type="search" />
              </div>
              <button className="p-2 rounded-lg hover:bg-primary/20 text-gray-300 hover:text-primary transition-colors">
                <Heart className="h-6 w-6" />
              </button>
              <Link to="/cart" className="relative p-2 rounded-lg hover:bg-primary/20 text-gray-300 hover:text-primary transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">{cartItemCount}</span>
                )}
              </Link>
              {user ? (
                <div className="flex items-center gap-2">
                  <img alt="User avatar" className="size-9 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg2LrLXQsZlrBHrB8fs_JmVomx9vO8BU76Iv2J6aZNKKw4LkWE1mVtymaJjbyThkv95l_5lXJBgoDXDCOoVba9paiwELJlyZLhH80pzm9Z-fOTv-q2P9In2D70Iqq-Ze50zs2v__mbPKDsbug9_Pw7yG4raDjOwfT8Pq8yv8SPn2noj04ptOiXfs6lm0fG33kGqamCCjdEfMnl5kWtvH7t7-daKS_48xUSQnfxQFYKVDdW3isQUXUubwT_19iEMWl6KRWEpUhA6is"/>
                  <button onClick={onLogout} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-900 mt-auto">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© 2025 iShop4U. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;