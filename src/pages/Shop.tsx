import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data';
import { Filter } from 'lucide-react';

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-black uppercase tracking-tighter mb-4">
              Shop All
            </h1>
            <p className="text-lg text-gray-500 font-light max-w-2xl">
              Discover our complete collection of premium essentials. Designed for longevity and style.
            </p>
          </div>
          
          {/* Filters */}
          <div className="mt-8 md:mt-0 flex items-center gap-4">
            <div className="flex items-center text-sm font-bold uppercase tracking-widest text-black mr-4">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
