import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { products } from "../data/products.js";

export default function WishlistPage({ onNavigate, onAddToCart }) {
  // Initial demo wishlist products
  const [wishlistItems, setWishlistItems] = useState([
    products[0],
    products[2] || products[1],
    products[4] || products[0],
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (product) => {
    onAddToCart?.(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 pt-6 text-brand-ink">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <button
            onClick={() => onNavigate?.("home")}
            className="hover:text-brand-red flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span className="font-bold text-brand-ink">My Wishlist</span>
        </div>

        {/* Page Title */}
        <div className="mb-8 flex flex-col justify-between gap-2 border-b border-gray-200/80 pb-4 sm:flex-row sm:items-center">
          <h1 className="font-display text-2xl font-black uppercase text-brand-ink sm:text-3xl flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-brand-red shadow-sm">
              <Heart size={22} className="fill-brand-red" />
            </div>
            MY WISHLIST ({wishlistItems.length})
          </h1>
          <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
            SAVED FAVORITES & PRICE DROPS
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="my-12 rounded-3xl bg-white p-12 text-center shadow-sm border border-gray-100 max-w-xl mx-auto">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 text-brand-red mb-4">
              <Heart size={44} />
            </div>
            <h2 className="font-display text-xl font-black uppercase text-brand-ink">
              YOUR WISHLIST IS EMPTY!
            </h2>
            <p className="mt-2 text-xs text-gray-500 max-w-sm mx-auto">
              Save your favorite items here to track discounts below MRP and buy them whenever you're ready.
            </p>
            <button
              onClick={() => onNavigate?.("catalog")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-xs font-black uppercase text-white shadow-lg transition-all hover:bg-gray-900 active:scale-95 cursor-pointer"
            >
              <span>EXPLORE CATALOG NOW</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
              >
                {/* Remove Wishlist Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-rose-50 hover:text-brand-red transition-colors cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 rounded-full bg-[#E31E24] px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-white shadow-sm">
                  {product.discount || 20}% OFF
                </div>

                {/* Product Image */}
                <div
                  onClick={() => onNavigate?.("product", product.id)}
                  className="relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl mt-4"
                >
                  {!product.image && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.art} opacity-90`}
                    />
                  )}
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-xs transition-transform group-hover:scale-105">
                      {product.icon && <product.icon size={56} className="text-white drop-shadow-md" />}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mt-4 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => onNavigate?.("product", product.id)}
                    className="font-display text-sm font-bold text-brand-ink line-clamp-1 hover:text-brand-red cursor-pointer mt-0.5"
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-base font-black text-brand-ink">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{Math.round(product.mrp || product.price * 1.3)}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Save ₹{Math.round((product.mrp || product.price * 1.3) - product.price)}
                    </span>
                  </div>
                </div>

                {/* Move to Cart CTA */}
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow py-3 text-xs font-black uppercase text-brand-ink shadow-md transition-all hover:bg-amber-400 active:scale-95 cursor-pointer"
                >
                  <ShoppingCart size={15} />
                  <span>MOVE TO CART</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
