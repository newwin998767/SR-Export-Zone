import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 xl:aspect-w-7 xl:aspect-h-8 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300 grayscale hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-extrabold text-black">৳{product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
