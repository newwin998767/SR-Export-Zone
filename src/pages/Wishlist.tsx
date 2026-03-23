import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { ProductCard } from '../components/ProductCard';
import { products as localProducts } from '../data';
import { Heart } from 'lucide-react';

export const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllProducts(fetchedProducts.length > 0 ? fetchedProducts : localProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts(localProducts);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, 'wishlists', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setWishlistIds(docSnap.data().productIds || []);
      } else {
        setWishlistIds([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const savedProducts = allProducts.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="pt-24 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-black uppercase tracking-tighter mb-8">
          Saved Items
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : savedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm max-w-2xl mx-auto">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 font-light">Explore our collection and save your favorite items.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
