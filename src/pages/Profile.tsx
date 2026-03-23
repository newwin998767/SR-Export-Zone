import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Package, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user, profile, logout } = useAuth();

  return (
    <div className="pt-24 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 sm:p-12 border-b border-gray-100 flex flex-col sm:flex-row items-center gap-8">
            <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt="Profile" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400 text-3xl font-bold">
                  {profile?.displayName?.charAt(0) || user?.email?.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-extrabold text-black tracking-tight mb-2">
                {profile?.displayName || 'Welcome'}
              </h1>
              <p className="text-gray-500">{user?.email}</p>
              <div className="mt-4 inline-block px-3 py-1 bg-gray-100 text-xs font-bold uppercase tracking-wider rounded-full">
                {profile?.role === 'admin' ? 'Administrator' : 'Customer'}
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-sm font-bold uppercase tracking-widest text-black hover:bg-gray-50 transition-colors rounded-lg"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <Link to="/orders" className="p-8 sm:p-12 hover:bg-gray-50 transition-colors group">
              <div className="h-12 w-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-black mb-2">Order History</h2>
              <p className="text-gray-500 font-light">View and track your previous orders.</p>
            </Link>
            <Link to="/wishlist" className="p-8 sm:p-12 hover:bg-gray-50 transition-colors group">
              <div className="h-12 w-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-black mb-2">Saved Items</h2>
              <p className="text-gray-500 font-light">View products you've saved for later.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
