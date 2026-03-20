import React from 'react';

export const About = () => {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-black uppercase tracking-tighter mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Founded on the principles of minimalist design and uncompromising quality, SR Export Zone is more than a clothing brand. It's a commitment to elevating the everyday.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="h-96 md:h-[600px] rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2071"
              alt="Our Workshop"
              className="w-full h-full object-cover transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-black uppercase tracking-tighter mb-6">
              Craftsmanship First
            </h2>
            <p className="text-gray-600 mb-6 font-light leading-relaxed text-lg">
              We source the finest materials from around the globe, partnering with artisans who share our dedication to excellence. Every stitch, every seam, every detail is considered.
            </p>
            <p className="text-gray-600 font-light leading-relaxed text-lg">
              Our garments are not designed for a single season, but for a lifetime of wear. We reject the fast-fashion cycle in favor of timeless pieces that form the foundation of a modern wardrobe.
            </p>
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl p-12 md:p-24 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tighter mb-8">
            Join the Movement
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Experience the difference of true quality. Explore our latest collection and discover your new essentials.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-5 border-2 border-red-600 text-lg font-bold uppercase tracking-widest text-white bg-red-600 hover:bg-transparent hover:text-red-600 transition-all duration-300"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};
