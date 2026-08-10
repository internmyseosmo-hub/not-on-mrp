import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Filter,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  ArrowLeft,
  Package,
} from "lucide-react";
import { products } from "../data/products.js";

export default function NewArrivalsPage({ onNavigate, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("All"); // 'All' | 'Under ₹499' | 'Top Rated' | 'Big Discounts'
  const [sortBy, setSortBy] = useState("newest");

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (activeFilter === "Under ₹499") return product.price < 500;
    if (activeFilter === "Top Rated") return product.rating >= 4.5;
    if (activeFilter === "Big Discounts") return product.discount >= 25;
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.id - a.id; // newest (highest id first)
  });

  const filterOptions = ["All", "Under ₹499", "Top Rated", "Big Discounts"];

  return (
    <div className="min-h-screen bg-slate-50/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Navigation & Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <button
              onClick={() => onNavigate?.("home")}
              className="hover:text-brand-ink transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-brand-ink font-bold">New Arrivals</span>
          </div>

          <button
            onClick={() => onNavigate?.("home")}
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-brand-ink shadow-xs border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-brand-red p-6 text-white shadow-xl sm:p-10">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3.5 py-1 text-xs font-extrabold backdrop-blur-md uppercase tracking-wider">
              <Sparkles size={14} /> Fresh Additions
            </span>
            <h1 className="mt-3 font-display text-2xl font-black sm:text-4xl">
              NEW ARRIVALS — Always Below MRP
            </h1>
            <p className="mt-2 text-xs text-amber-100 sm:text-sm font-medium">
              Handpicked everyday essentials, home organization must-haves, and lifestyle accessories at guaranteed low prices.
            </p>
          </div>

          <div className="absolute right-[-20px] bottom-[-20px] opacity-15 sm:opacity-25">
            <Sparkles size={200} />
          </div>
        </div>

        {/* Filters and Sorting Bar */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-xs border border-gray-100 sm:flex-row sm:items-center sm:justify-between">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="flex items-center gap-1 text-xs font-bold text-gray-500 shrink-0 pr-1">
              <Filter size={14} /> Filter:
            </span>
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-brand-ink text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal size={15} className="text-gray-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer"
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {sortedProducts.map((product) => {
            const Icon = product.icon || Package;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-3.5 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-5"
              >
                <div>
                  {/* Image/Art Box */}
                  <div
                    onClick={() => onNavigate?.("product", product.id)}
                    className="relative cursor-pointer flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br transition-transform duration-300"
                  >
                    {!product.image && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${product.art} opacity-90`}
                      />
                    )}

                    {product.image ? (
                      <img src={product.image} alt={product.name} className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/25 text-white backdrop-blur-xs transition-transform group-hover:scale-110 sm:h-24 sm:w-24">
                        <Icon size={44} strokeWidth={1.4} />
                      </div>
                    )}

                    {/* Discount Badge */}
                    <div className="absolute top-2.5 left-2.5 z-20 rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
                      {product.discount}% OFF
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      {product.category || "Essentials"}
                    </span>
                    <h3
                      onClick={() => onNavigate?.("product", product.id)}
                      className="mt-1.5 line-clamp-2 cursor-pointer font-semibold text-xs text-brand-ink hover:text-brand-red transition-colors sm:text-sm"
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-gray-600">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400">({product.reviewsCount})</span>
                    </div>

                    {/* Price */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-base font-black text-brand-ink sm:text-lg">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.mrp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-3 pt-2 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => onNavigate?.("product", product.id)}
                    className="flex-1 rounded-full bg-gray-100 py-2 text-[11px] font-bold text-brand-ink hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onAddToCart?.(product, 1)}
                    className="flex items-center justify-center rounded-full bg-brand-ink px-3 py-2 text-white hover:bg-gray-800 transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {sortedProducts.length === 0 && (
          <div className="mt-12 text-center py-12 bg-white rounded-3xl border border-gray-100">
            <Package size={48} className="mx-auto text-gray-300" />
            <h3 className="mt-3 text-lg font-bold text-gray-700">
              No products found for this filter
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Try selecting "All" to view all new arrivals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
