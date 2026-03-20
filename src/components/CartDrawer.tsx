import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, total } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out">
          <div className="h-full flex flex-col bg-white shadow-2xl border-l border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-extrabold text-black uppercase tracking-widest flex items-center gap-3">
                <ShoppingBag className="h-6 w-6" />
                Your Bag
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <span className="sr-only">Close panel</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-12 w-12 text-gray-300" />
                  </div>
                  <p className="text-xl font-medium text-gray-900">Your bag is empty</p>
                  <p className="text-gray-500 max-w-xs">Looks like you haven't added anything to your bag yet.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-8 px-8 py-3 border-2 border-black text-sm font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-center object-cover grayscale hover:grayscale-0 transition-all"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-base font-bold text-gray-900">
                              <h3 className="truncate max-w-[180px]">
                                {item.name}
                              </h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 uppercase tracking-wider">{item.category}</p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-md bg-white">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors rounded-l-md"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-1 text-sm font-medium text-gray-900 min-w-[2.5rem] text-center border-x border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors rounded-r-md"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-sm text-red-600 hover:text-red-500 transition-colors uppercase tracking-wider"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
                <div className="flex justify-between text-lg font-extrabold text-gray-900 mb-6">
                  <p className="uppercase tracking-widest">Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button
                    className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase tracking-widest transition-colors"
                  >
                    Checkout
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or{' '}
                    <button
                      type="button"
                      className="text-black font-bold hover:text-gray-700 uppercase tracking-wider"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
