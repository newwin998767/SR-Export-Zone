import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'wishlists', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIsSaved(data.productIds?.includes(product.id) || false);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };
    checkSavedStatus();
  }, [user, product.id]);

  const toggleSave = async () => {
    if (!user) {
      alert("Please log in to save items.");
      return;
    }
    
    try {
      const docRef = doc(db, 'wishlists', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        await setDoc(docRef, { userId: user.uid, productIds: [product.id] });
        setIsSaved(true);
      } else {
        if (isSaved) {
          await updateDoc(docRef, { productIds: arrayRemove(product.id) });
          setIsSaved(false);
        } else {
          await updateDoc(docRef, { productIds: arrayUnion(product.id) });
          setIsSaved(true);
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 xl:aspect-w-7 xl:aspect-h-8 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleSave}
            className={`p-2 rounded-full shadow-sm transition-colors ${
              isSaved ? 'bg-red-50 text-red-600' : 'bg-white text-gray-400 hover:text-red-600'
            }`}
          >
            <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-extrabold text-black">৳{product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-white bg-black hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
