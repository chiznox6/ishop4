import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu } from "lucide-react"; // Changed MagnifyingGlass to Search, added Menu

const ShopNavbar = ({ onSearch, onLogout, user }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    onLogout(); // Use the onLogout prop from AuthContext
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <nav className="navbar bg-base-100 text-base-content px-6 py-3 shadow-lg sticky top-0 z-50">
      {/* Navbar Start - Logo and Navigation */}
      <div className="navbar-start flex items-center">
        {/* Logo / Brand */}
        <Link
          to="/shop"
          className="text-3xl font-extrabold tracking-wide hover:text-primary transition-colors duration-300 mr-6"
        >
          iShop4U
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/dashboard"
            className="btn btn-ghost hover:text-primary transition-colors duration-300 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/shop"
            className="btn btn-ghost hover:text-primary transition-colors duration-300 font-medium"
          >
            Shop
          </Link>
        </div>
      </div>

      {/* Navbar Center - Search Bar */}
      <div className="navbar-center hidden lg:flex flex-grow justify-center">
        <form
          onSubmit={handleSearch}
          className="form-control flex-row w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered input-primary w-full rounded-full pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-full -ml-10 z-10 w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
          >
            <Search size={20} strokeWidth={2.5} className="text-white" />
          </button>
        </form>
      </div>

      {/* Navbar End - Navigation Links & Logout */}
      <div className="navbar-end space-x-2">
        <Link
          to="/shop"
          className="btn btn-ghost hover:text-primary transition-colors duration-300 font-medium"
        >
          Shop
        </Link>
        {user && (
          <>
            <Link
              to="/cart"
              className="btn btn-ghost hover:text-primary transition-colors duration-300 font-medium"
            >
              Cart
            </Link>
            <Link
              to="/checkout"
              className="btn btn-ghost hover:text-primary transition-colors duration-300 font-medium"
            >
              Checkout
            </Link>
          </>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-error ml-2"
            aria-label="Logout"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary ml-2"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default ShopNavbar;