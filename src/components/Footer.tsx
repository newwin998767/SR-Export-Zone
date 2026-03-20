import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Logo className="h-12 w-auto object-contain" inverted={true} />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevating everyday essentials with premium materials and minimalist design. Redefine your wardrobe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h3>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-gray-400 hover:text-red-600 text-sm transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=T-Shirts" className="text-gray-400 hover:text-red-600 text-sm transition-colors">T-Shirts</Link></li>
              <li><Link to="/shop?category=Outerwear" className="text-gray-400 hover:text-red-600 text-sm transition-colors">Outerwear</Link></li>
              <li><Link to="/shop?category=Accessories" className="text-gray-400 hover:text-red-600 text-sm transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-red-600 text-sm transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600 text-sm transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600 text-sm transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600 text-sm transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-b border-gray-600 px-0 py-2 text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SR Export Zone. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-red-600 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-red-600 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
