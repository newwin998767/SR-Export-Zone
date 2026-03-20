import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative bg-black text-white h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070"
          alt="Fashion Background"
          className="w-full h-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter uppercase mb-6 drop-shadow-lg">
          Redefine Your <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Wardrobe</span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide mb-10">
          Premium quality. Minimalist design. Uncompromising style. Discover the new collection at SR Export Zone.
        </p>
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-bold uppercase tracking-widest text-black bg-white hover:bg-transparent hover:text-white transition-all duration-300"
          >
            Shop Collection
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Our Story
          </Link>
        </div>
      </div>
    </div>
  );
};
