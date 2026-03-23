import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { LoginModal } from './LoginModal';

export const Navbar = () => {
  const { items, setIsCartOpen } = useCart();
  const { user, profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-black/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black hover:text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-14 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-black hover:text-red-600 uppercase tracking-widest transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium text-black hover:text-red-600 uppercase tracking-widest transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-sm font-medium text-black hover:text-red-600 uppercase tracking-widest transition-colors">
              About
            </Link>
          </div>

          {/* Cart & User Icons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <Link
                to={profile?.role === 'admin' ? '/admin' : '/profile'}
                className="relative p-2 text-black hover:text-red-600 transition-colors"
              >
                <UserIcon size={24} />
              </Link>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="relative p-2 text-black hover:text-red-600 transition-colors"
              >
                <UserIcon size={24} />
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-black hover:text-red-600 transition-colors"
            >
              <ShoppingBag size={24} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 uppercase tracking-widest"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 uppercase tracking-widest"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 uppercase tracking-widest"
            >
              About
            </Link>
            {user ? (
              <Link
                to={profile?.role === 'admin' ? '/admin' : '/profile'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 uppercase tracking-widest"
              >
                {profile?.role === 'admin' ? 'Admin Panel' : 'Profile'}
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-gray-50 uppercase tracking-widest"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
};
