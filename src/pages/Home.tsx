import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Featured Collection */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black uppercase tracking-tighter">
                Featured Collection
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl font-light">
                Curated essentials for the modern wardrobe.
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center text-sm font-bold text-black hover:text-gray-600 uppercase tracking-widest transition-colors"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 sm:hidden flex justify-center">
             <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-sm font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300 w-full"
            >
              View All Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black uppercase tracking-tighter mb-6">
                The SR Export Zone Philosophy
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                We believe that true style lies in simplicity and quality. Our garments are meticulously crafted using premium materials, designed to outlast trends and become the foundation of your personal style.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-transparent hover:text-black transition-all duration-300"
              >
                Read Our Story
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative h-96 lg:h-[600px] overflow-hidden rounded-xl">
               <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070"
                  alt="Brand Philosophy"
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
