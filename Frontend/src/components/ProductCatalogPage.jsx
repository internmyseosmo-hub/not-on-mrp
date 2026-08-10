import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  Package,
  ArrowRight,
  ArrowLeft,
  X,
  Filter,
  Layers,
  Sparkles,
  CheckCircle2,
  Home,
  PenTool,
  ShoppingBasket,
  Droplets,
  Backpack,
  Zap,
  Lamp,
  Utensils,
} from "lucide-react";
import { products } from "../data/products.js";

// Category Meta Mapping with Lucide icons and vibrant gradient styling
const CATEGORY_META = {
  "Home & Organization": {
    icon: Home,
    tagline: "Declutter closets, desks, and rooms with modular strength.",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    colorBg: "bg-sky-50 text-sky-800 border-sky-200",
  },
  "Office & Stationery": {
    icon: PenTool,
    tagline: "Sleek desk organizers, accessories, and writing tools.",
    gradient: "from-slate-600 via-zinc-700 to-slate-900",
    colorBg: "bg-purple-50 text-purple-800 border-purple-200",
  },
  "Laundry & Houseware": {
    icon: ShoppingBasket,
    tagline: "Breathable hampers, heavy-duty baskets, and daily houseware.",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    colorBg: "bg-rose-50 text-rose-800 border-rose-200",
  },
  "Drinkware & Hydration": {
    icon: Droplets,
    tagline: "Stainless steel bottles, insulated mugs, and tumblers.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    colorBg: "bg-teal-50 text-teal-800 border-teal-200",
  },
  "Bags & Accessories": {
    icon: Backpack,
    tagline: "Ergonomic laptop backpacks, travel totes, and pouches.",
    gradient: "from-amber-500 via-orange-600 to-rose-600",
    colorBg: "bg-amber-50 text-amber-800 border-amber-200",
  },
  "Home & Comfort": {
    icon: Sparkles,
    tagline: "Memory foam cushions, ergonomic seating, and relaxation.",
    gradient: "from-purple-500 via-indigo-600 to-violet-700",
    colorBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
  },
  "Kitchen & Appliances": {
    icon: Zap,
    tagline: "USB blenders, electronic tools, and modern kitchen tech.",
    gradient: "from-teal-400 via-emerald-500 to-green-600",
    colorBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  "Tech & Lighting": {
    icon: Lamp,
    tagline: "Smart LED desk lamps, dimmable lights, and gadgets.",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    colorBg: "bg-amber-50 text-amber-900 border-amber-200",
  },
  "Kitchen & Dining": {
    icon: Utensils,
    tagline: "Non-stick granite pans, cookware, and dining essentials.",
    gradient: "from-rose-500 via-red-600 to-orange-600",
    colorBg: "bg-red-50 text-red-800 border-red-200",
  },
  "Home & Bath": {
    icon: Sparkles,
    tagline: "Hotel-quality 600 GSM towels, bath linens, and sets.",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    colorBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
  },
};

export default function ProductCatalogPage({
  onNavigate,
  onAddToCart,
  initialCategory = "All",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory); // 'All' or specific category name
  const [priceFilter, setPriceFilter] = useState("all"); // 'all' | 'under500' | '500to1000' | 'above1000'
  const [minRating, setMinRating] = useState(0); // 0 | 4.5
  const [sortBy, setSortBy] = useState("popular"); // 'popular' | 'priceLow' | 'priceHigh' | 'rating'

  useEffect(() => {
    if (initialCategory && initialCategory !== "All") {
      const isKnownCategory =
        CATEGORY_META[initialCategory] ||
        [
          "60%+ Off",
          "70%+ Off",
          "Weekend Special",
          "Home Essentials",
          "Kitchenware",
          "Storage & Organizers",
          "Beauty & Personal Care",
          "Toys & Games",
          "Stationery",
          "Cleaning Essentials",
          "Electricals",
          "Hardware & Tools",
          "Car & Bike",
          "Garden & Outdoor",
        ].includes(initialCategory);

      if (isKnownCategory) {
        setSelectedCategory(initialCategory);
        setSearchQuery("");
      } else {
        setSearchQuery(initialCategory);
        setSelectedCategory("All");
      }
    } else {
      setSelectedCategory("All");
      setSearchQuery("");
    }
  }, [initialCategory]);

  // Extract unique category names
  const allCategories = Object.keys(CATEGORY_META).filter((cat) =>
    products.some((p) => (p.category || "General Essentials") === cat)
  );

  // Filter products based on search, category, price, and rating
  const filteredProducts = products.filter((product) => {
    const prodCategory = product.category || "General Essentials";

    // Category or Deal Offer match
    let matchesCategory = true;
    if (selectedCategory !== "All") {
      if (
        selectedCategory === "60%+ Off" ||
        selectedCategory === "60% OFF" ||
        selectedCategory === "Deal of the Day"
      ) {
        matchesCategory = product.discount >= 20;
      } else if (
        selectedCategory === "70%+ Off" ||
        selectedCategory === "70% OFF" ||
        selectedCategory === "Flash Sale"
      ) {
        matchesCategory = product.discount >= 20;
      } else if (
        selectedCategory === "Weekend Special" ||
        selectedCategory === "10% OFF"
      ) {
        matchesCategory = product.discount >= 15;
      } else if (
        selectedCategory === "Home Essentials" ||
        selectedCategory === "Home & Living"
      ) {
        matchesCategory =
          prodCategory === "Home & Organization" ||
          prodCategory === "Home & Living" ||
          prodCategory === "Home & Comfort" ||
          prodCategory === "Laundry & Houseware";
      } else if (
        selectedCategory === "Kitchenware" ||
        selectedCategory === "Kitchen & Dining"
      ) {
        matchesCategory =
          prodCategory === "Kitchenware" ||
          prodCategory === "Kitchen & Appliances" ||
          prodCategory === "Drinkware & Hydration";
      } else if (selectedCategory === "Storage & Organizers") {
        matchesCategory =
          prodCategory === "Storage & Organizers" ||
          prodCategory === "Home & Organization" ||
          product.name.toLowerCase().includes("crates") ||
          product.name.toLowerCase().includes("organizer");
      } else if (
        selectedCategory === "Beauty & Personal Care" ||
        selectedCategory === "Personal Care"
      ) {
        matchesCategory =
          prodCategory === "Personal Care" ||
          prodCategory === "Beauty & Personal Care" ||
          prodCategory === "Laundry & Houseware";
      } else if (selectedCategory === "Toys & Games") {
        matchesCategory =
          prodCategory === "Toys & Games";
      } else if (
        selectedCategory === "Stationery" ||
        selectedCategory === "Stationery & Office" ||
        selectedCategory === "Office & Stationery"
      ) {
        matchesCategory =
          prodCategory === "Office & Stationery" ||
          prodCategory === "Stationery" ||
          product.name.toLowerCase().includes("pen") ||
          product.name.toLowerCase().includes("desk");
      } else if (selectedCategory === "Cleaning Essentials") {
        matchesCategory =
          prodCategory === "Cleaning Essentials" ||
          prodCategory === "Laundry & Houseware" ||
          product.name.toLowerCase().includes("laundry") ||
          product.name.toLowerCase().includes("basket");
      } else if (selectedCategory === "Electricals") {
        matchesCategory =
          prodCategory === "Electricals" ||
          prodCategory === "Tech & Lighting" ||
          product.name.toLowerCase().includes("lamp") ||
          product.name.toLowerCase().includes("led");
      } else if (selectedCategory === "Hardware & Tools") {
        matchesCategory =
          prodCategory === "Hardware & Tools" ||
          prodCategory === "Home & Organization";
      } else if (selectedCategory === "Car & Bike") {
        matchesCategory =
          prodCategory === "Car & Bike" ||
          prodCategory === "Bags & Accessories";
      } else if (selectedCategory === "Garden & Outdoor") {
        matchesCategory =
          prodCategory === "Garden & Outdoor" ||
          prodCategory === "Drinkware & Hydration" ||
          product.name.toLowerCase().includes("bottle");
      } else {
        matchesCategory = prodCategory === selectedCategory;
      }
    }

    // Search query match
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prodCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.tagline &&
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.highlights &&
        product.highlights.some((h) =>
          h.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    // Price filter match
    let matchesPrice = true;
    if (priceFilter === "under500") matchesPrice = product.price < 500;
    if (priceFilter === "500to1000")
      matchesPrice = product.price >= 500 && product.price <= 1000;
    if (priceFilter === "above1000") matchesPrice = product.price > 1000;

    // Rating match
    const matchesRating = minRating === 0 || product.rating >= minRating;

    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return (b.reviewsCount || 0) - (a.reviewsCount || 0); // popular default
  });

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    onNavigate?.("catalog", catName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceFilter("all");
    setMinRating(0);
    setSortBy("popular");
    onNavigate?.("catalog", "All");
  };

  const activeCategoryMeta = CATEGORY_META[selectedCategory];

  return (
    <div className="min-h-screen bg-slate-50/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 sm:text-sm">
            <button
              onClick={() => onNavigate?.("home")}
              className="hover:text-brand-ink transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => handleSelectCategory("All")}
              className="hover:text-brand-ink transition-colors"
            >
              Our Products
            </button>
            {selectedCategory !== "All" && (
              <>
                <span>/</span>
                <span className="font-bold text-brand-ink">
                  {selectedCategory}
                </span>
              </>
            )}
          </div>

          {selectedCategory !== "All" && (
            <button
              onClick={() => handleSelectCategory("All")}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-ink shadow-xs border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={14} /> Back to All Categories
            </button>
          )}
        </div>

        {/* Banner Header: Dynamic depending on selected category */}
        {selectedCategory === "All" ? (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-brand-ink p-6 text-white shadow-xl sm:p-10">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3.5 py-1 text-xs font-extrabold text-brand-ink uppercase tracking-wider">
                <Layers size={14} /> Our Product Collection
              </span>
              <h1 className="mt-3 font-display text-2xl font-black sm:text-4xl">
                Explore Categories & Products
              </h1>
              <p className="mt-2 text-xs text-zinc-300 sm:text-sm font-medium">
                Choose a category below or search directly. Every product is guaranteed to be priced below MRP!
              </p>
            </div>
            <div className="absolute right-[-30px] bottom-[-30px] opacity-15 sm:opacity-25">
              <Package size={220} />
            </div>
          </div>
        ) : (
          <div
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${
              activeCategoryMeta?.gradient || "from-zinc-900 to-brand-ink"
            } p-6 text-white shadow-xl sm:p-10`}
          >
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-extrabold backdrop-blur-md uppercase tracking-wider">
                  Category
                </span>
                <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-bold">
                  {sortedProducts.length} Items Available
                </span>
              </div>
              <h1 className="mt-3 font-display text-2xl font-black sm:text-4xl">
                {selectedCategory}
              </h1>
              <p className="mt-2 text-xs text-white/90 sm:text-sm font-medium">
                {activeCategoryMeta?.tagline ||
                  "Quality essentials carefully selected and priced lower than MRP."}
              </p>
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* LEFT SIDEBAR - Filters */}
          <div className="w-full lg:w-[280px] shrink-0">
            <div className="sticky top-24 rounded-3xl bg-white p-5 shadow-sm border border-gray-100/90 space-y-5">
              <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-3">
                <Filter size={16} className="text-brand-ink" />
                <h3 className="font-display font-black text-brand-ink text-sm uppercase tracking-wider">Filters & Sort</h3>
              </div>
              
              {/* Prominent Search Bar */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 py-2.5 pl-10 pr-9 text-xs text-brand-ink placeholder:text-gray-400 outline-none transition-all focus:border-brand-ink focus:bg-white focus:shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-brand-ink"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 pt-1">
                {/* 1. Category Dropdown */}
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                    Select Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleSelectCategory(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-brand-ink outline-none cursor-pointer hover:border-gray-300 focus:border-brand-ink"
                  >
                    <option value="All">All Categories ({products.length})</option>
                    {allCategories.map((cat) => {
                      const count = products.filter(
                        (p) => (p.category || "General Essentials") === cat
                      ).length;
                      return (
                        <option key={cat} value={cat}>
                          {cat} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* 2. Price Range Dropdown */}
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                    Price Range
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-gray-300 focus:border-brand-ink"
                  >
                    <option value="all">All Prices</option>
                    <option value="under500">Under ₹499</option>
                    <option value="500to1000">₹500 - ₹1000</option>
                    <option value="above1000">Above ₹1000</option>
                  </select>
                </div>

                {/* 3. Rating Filter */}
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                    Customer Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-gray-300 focus:border-brand-ink"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={4.5}>4.5★ & Above</option>
                  </select>
                </div>

                {/* 4. Sort Options */}
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-gray-300 focus:border-brand-ink"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Badges */}
              {(searchQuery ||
                selectedCategory !== "All" ||
                priceFilter !== "all" ||
                minRating !== 0) && (
                <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 mt-2">
                  <span className="w-full text-[11px] font-bold text-gray-400 mb-1">
                    Active Filters:
                  </span>
                  {selectedCategory !== "All" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-900">
                      {selectedCategory}
                      <button onClick={() => handleSelectCategory("All")}>
                        <X size={10} />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-900">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery("")}>
                        <X size={10} />
                      </button>
                    </span>
                  )}
                  {priceFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-900">
                      Price: {priceFilter}
                      <button onClick={() => setPriceFilter("all")}>
                        <X size={10} />
                      </button>
                    </span>
                  )}
                  {minRating !== 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-[10px] font-bold text-purple-900">
                      Rating: {minRating}★+
                      <button onClick={() => setMinRating(0)}>
                        <X size={10} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={handleResetFilters}
                    className="w-full mt-3 rounded-xl bg-gray-100 py-2 text-xs font-bold text-brand-ink hover:bg-gray-200 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            {/* 1. CATEGORY CARDS GRID (Displayed when 'All' categories is active) */}
        {selectedCategory === "All" && !searchQuery && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl font-black text-brand-ink sm:text-2xl">
                  Shop by Category
                </h2>
                <p className="text-xs text-gray-500">
                  Select a category to view its dedicated products
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {allCategories.map((catName) => {
                const meta = CATEGORY_META[catName] || {};
                const Icon = meta.icon || Package;
                const catProducts = products.filter(
                  (p) => (p.category || "General Essentials") === catName
                );

                return (
                  <motion.div
                    key={catName}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectCategory(catName)}
                    className="group cursor-pointer overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${
                            meta.gradient || "from-gray-700 to-gray-900"
                          } text-white shadow-md`}
                        >
                          <Icon size={24} />
                        </div>
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-800 border border-amber-200/60">
                          {catProducts.length} Items
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-base font-black text-brand-ink group-hover:text-brand-red transition-colors sm:text-lg">
                        {catName}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500 font-medium">
                        {meta.tagline || "High quality essentials below MRP."}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-1 text-xs font-extrabold text-brand-ink group-hover:text-brand-red transition-colors">
                      <span>Explore Category</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. DEDICATED PRODUCTS GRID */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-xl font-black text-brand-ink sm:text-2xl">
                {selectedCategory === "All"
                  ? "All Products"
                  : `${selectedCategory} Products`}
              </h2>
              <p className="text-xs text-gray-500">
                Showing {sortedProducts.length} products
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
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
                    {/* Visual Card */}
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

                    {/* Product Metadata */}
                    <div className="mt-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
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
                        <span className="text-gray-400">
                          ({product.reviewsCount})
                        </span>
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

                  {/* Actions */}
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
                No products match your active filters
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Try searching with another keyword or reset active filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 rounded-full bg-brand-ink px-5 py-2 text-xs font-bold text-white hover:bg-gray-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
        </div> {/* End of Right Main Content */}
        </div> {/* End of Main Content Layout */}
      </div>
    </div>
  );
}
