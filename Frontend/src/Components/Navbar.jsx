import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, Heart } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/Shop" },
    { name: "Categories", to: "/Categories" },
    { name: "About", to: "/About" },

  ];

  return (
    <header className="w-full bg-white text-black border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + nav */}
          <div className="flex items-center gap-6">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-3 text-lg font-semibold tracking-tight"
              onClick={() => setMobileOpen(false)}
            >
              <span className="inline-block w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                E
              </span>
              <span className="hidden sm:inline">Eclipse</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-black hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/wishlist"
              className="p-2 rounded-full hover:bg-black hover:text-white transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              to="/Cartpage"
              className="relative p-2 rounded-full hover:bg-black hover:text-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none rounded-full bg-black text-white">
                3
              </span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Account</span>
              </button>

              {/* Account dropdown */}
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-100 z-20">
                  <div className="py-1">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setAccountOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/Account"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setAccountOpen(false)}
                    >
                      My account
                    </Link>
                    <Link
                      to="/Order"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setAccountOpen(false)}
                    >
                      Orders
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-3 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black hover:text-white transition"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium hover:bg-black hover:text-white rounded-md"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-base font-medium hover:bg-black hover:text-white rounded-md"
              onClick={() => setMobileOpen(false)}
            >
              View cart
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
