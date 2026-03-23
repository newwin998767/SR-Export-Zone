/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { About } from './pages/About';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { Wishlist } from './pages/Wishlist';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col font-sans bg-white text-black selection:bg-black selection:text-white">
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}
