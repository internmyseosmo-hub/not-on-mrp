import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Share2,
  Heart,
  Tag,
  MapPin,
  Sparkles,
  ChevronRight,
  Package,
} from "lucide-react";
import { products } from "../data/products.js";

export default function ProductDetailPage({
  productId,
  onNavigate,
  onAddToCart,
}) {
  const [product, setProduct] = useState(() => {
    return products.find((p) => p.id === productId) || products[0];
  });
  const [apiProducts, setApiProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'specs' | 'reviews'
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  const [buyNowModal, setBuyNowModal] = useState(false);

  useEffect(() => {
    // 1. Check local mock products
    const local = products.find((p) => p.id === productId);
    if (local) {
      setProduct(local);
    }

    // 2. Fetch all products to populate related products & resolve API product
    fetch("http://127.0.0.1:3000/api/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setApiProducts(data.data);
          if (!local) {
            const found = data.data.find(
              (p) => p.id === productId || String(p._id) === String(productId)
            );
            if (found) setProduct(found);
          }
        }
      })
      .catch((err) => console.error("Error fetching products:", err));

    // 3. Directly fetch this specific product if not found in local products
    if (!local && productId) {
      fetch(`http://127.0.0.1:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setProduct(data.data);
          }
        })
        .catch((err) => console.error("Error fetching product by id:", err));
    }
  }, [productId]);

  const Icon = product?.icon || Package;
  const savingsAmount = Math.max((product?.mrp || 0) - (product?.price || 0), 0);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus("success");
    } else {
      setPincodeStatus("error");
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart?.(product, quantity);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3000);
  };

  const handleBuyNow = () => {
    onAddToCart?.(product, quantity);
    setBuyNowModal(true);
  };

  const relatedProducts = [...apiProducts, ...products]
    .filter((p) => p.id !== product?.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToCartToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-4 z-50 flex items-center gap-3 rounded-2xl bg-zinc-900 px-5 py-3.5 text-white shadow-2xl sm:right-8"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold sm:text-sm">Added to Cart!</p>
              <p className="text-[11px] text-zinc-400">
                {quantity} x {product.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buy Now Modal */}
      <AnimatePresence>
        {buyNowModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-brand-yellow">
                <Sparkles size={24} className="text-amber-600" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-brand-ink sm:text-2xl">
                Ready to Order!
              </h3>
              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                You are purchasing <strong>{product.name}</strong> for ₹{product.price * quantity}.
              </p>
              <div className="mt-4 rounded-2xl bg-amber-50/80 p-3.5 border border-amber-200/60">
                <div className="flex items-center justify-between text-xs font-bold text-brand-ink">
                  <span>Price ({quantity} item)</span>
                  <span>₹{product.price * quantity}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                  <span>Total Discount Below MRP</span>
                  <span>-₹{savingsAmount * quantity}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-amber-200/60 pt-2 text-sm font-black text-brand-ink">
                  <span>Grand Total</span>
                  <span className="text-brand-red font-display text-lg">₹{product.price * quantity}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setBuyNowModal(false)}
                  className="flex-1 rounded-full border border-gray-300 py-3 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    alert("Order placed successfully! Thank you for shopping with Not On MRP.");
                    setBuyNowModal(false);
                    onNavigate?.("home");
                  }}
                  className="flex-1 rounded-full bg-brand-yellow py-3 text-xs font-extrabold text-brand-ink hover:bg-amber-400 transition-transform active:scale-95 shadow-md"
                >
                  Confirm Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="mb-6 flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
            <button
              onClick={() => onNavigate?.("home")}
              className="font-medium hover:text-brand-ink transition-colors"
            >
              Home
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <button
              onClick={() => onNavigate?.("catalog")}
              className="font-medium hover:text-brand-ink transition-colors"
            >
              Products
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="font-semibold text-brand-ink line-clamp-1 max-w-[180px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <button
            onClick={() => onNavigate?.("catalog")}
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-brand-ink shadow-xs border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </button>
        </div>

        {/* Hero Section: 2 Columns */}
        <div className="grid grid-cols-1 gap-8 rounded-3xl bg-white p-5 shadow-sm border border-gray-100 sm:p-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Product Visual Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br shadow-inner border border-gray-100/80 transition-all duration-500 ${product.image ? 'p-0' : 'p-8'}`}>
              {/* Dynamic Gradient Art */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.art || "from-amber-400 via-orange-400 to-amber-500"} opacity-90`} />

              {/* Central Main Visual */}
              {!product.image && (
                <motion.div
                  key={product.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative z-0 flex h-36 w-36 items-center justify-center rounded-3xl bg-white/30 text-white backdrop-blur-lg shadow-2xl sm:h-44 sm:w-44"
                >
                  <Icon size={72} strokeWidth={1.3} className="sm:size-[88px] filter drop-shadow-md" />
                </motion.div>
              )}
              {product.image && (
                <motion.img
                  key={product.id + "-img"}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 z-0 h-full w-full object-cover rounded-3xl shadow-xl"
                />
              )}

              {/* Decorative Glass Background */}
              {!product.image && <div className="absolute inset-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-xl" />}

              {/* Discount Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1 rounded-full bg-brand-red px-3 py-1.5 text-xs font-extrabold text-white shadow-md">
                <Tag size={12} /> {product.discount}% OFF
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-md shadow-md hover:bg-white hover:text-rose-500 transition-colors"
              >
                <Heart
                  size={18}
                  className={isWishlisted ? "fill-rose-500 text-rose-500" : ""}
                />
              </button>

              {/* Low Stock Badge */}
              {product.stockCount && product.stockCount < 15 && (
                <div className="absolute bottom-4 left-4 z-20 rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                  ⚡ Only {product.stockCount} left in stock!
                </div>
              )}
            </div>


          </div>

          {/* Right Column: Product Info & Buy Box */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Verified Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-amber-100/80 px-3 py-1 text-xs font-bold text-amber-800">
                  {product.category || "General Essentials"}
                </span>
                <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  <ShieldCheck size={14} /> NOT ON MRP VERIFIED
                </span>
              </div>

              {/* Title & Tagline */}
              <h1 className="mt-3 font-display text-2xl font-black text-brand-ink sm:text-3xl lg:text-4xl leading-tight">
                {product.name}
              </h1>
              <p className="mt-1.5 text-xs text-gray-500 font-medium sm:text-sm">
                {product.tagline || "High quality daily essential priced lower than MRP."}
              </p>

              {/* Rating & Reviews Bar */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-xl bg-amber-400/20 px-2.5 py-1 text-xs font-bold text-amber-900">
                  <Star size={14} className="fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400">|</span>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className="text-xs font-semibold text-gray-600 hover:text-brand-ink underline underline-offset-4"
                >
                  {product.reviewsCount || 120} Verified Ratings & Reviews
                </button>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-5" />

              {/* Pricing Box */}
              <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-200/50">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-black text-brand-ink sm:text-4xl">
                    ₹{product.price}
                  </span>
                  <span className="text-base text-gray-400 line-through sm:text-lg">
                    ₹{product.mrp}
                  </span>
                  <span className="rounded-lg bg-brand-red px-2.5 py-1 text-xs font-black text-white shadow-xs">
                    SAVE ₹{savingsAmount} ({product.discount}% OFF)
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Sparkles size={13} /> Guaranteed price lower than MRP. Inclusive of all taxes.
                </p>
              </div>


              {/* Quantity Selector & Action Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Quantity Controls */}
                <div className="flex h-12 items-center justify-between rounded-full border border-gray-200 bg-gray-50 px-3.5 sm:w-36">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-gray-700 hover:bg-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-display font-bold text-brand-ink text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-gray-700 hover:bg-white transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCartClick}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-ink px-6 text-xs font-extrabold text-white shadow-lg transition-transform active:scale-95 hover:bg-gray-800"
                >
                  <ShoppingCart size={16} /> ADD TO CART
                </button>

                {/* Buy Now CTA */}
                <button
                  onClick={handleBuyNow}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-xs font-extrabold text-brand-ink shadow-md transition-transform active:scale-95 hover:bg-amber-400"
                >
                  <Zap size={16} /> BUY NOW
                </button>
              </div>

              {/* Pincode & Delivery Checker */}
              <div className="mt-6 rounded-2xl bg-gray-50 p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-ink">
                  <MapPin size={15} className="text-brand-red" />
                  <span>Check Delivery Speed & Pincode</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="mt-2 flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-brand-ink outline-none focus:border-brand-ink"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-black transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus === "success" && (
                  <p className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={13} /> Eligible for FREE Express Delivery in 2-3 Days!
                  </p>
                )}
                {pincodeStatus === "error" && (
                  <p className="mt-2 text-xs font-semibold text-rose-500">
                    Please enter a valid 6-digit numeric pincode.
                  </p>
                )}
              </div>
            </div>

            {/* Trust Badges Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6 sm:grid-cols-4">
              <div className="flex items-center gap-2.5 rounded-xl bg-gray-50/80 p-2.5">
                <Truck size={18} className="text-amber-600 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-brand-ink">Free Shipping</p>
                  <p className="text-gray-500 text-[10px]">Orders above ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-gray-50/80 p-2.5">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-brand-ink">100% Genuine</p>
                  <p className="text-gray-500 text-[10px]">Quality Inspected</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-gray-50/80 p-2.5">
                <RotateCcw size={18} className="text-blue-600 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-brand-ink">Easy Returns</p>
                  <p className="text-gray-500 text-[10px]">7 Days Replacement</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-gray-50/80 p-2.5">
                <Tag size={18} className="text-purple-600 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-brand-ink">Below MRP</p>
                  <p className="text-gray-500 text-[10px]">Best Price Always</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content: Overview, Specifications, Reviews */}
        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-4 text-xs font-bold sm:text-sm transition-all border-b-2 ${
                activeTab === "overview"
                  ? "border-brand-red text-brand-red"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-4 px-4 text-xs font-bold sm:text-sm transition-all border-b-2 ${
                activeTab === "specs"
                  ? "border-brand-red text-brand-red"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 px-4 text-xs font-bold sm:text-sm transition-all border-b-2 ${
                activeTab === "reviews"
                  ? "border-brand-red text-brand-red"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Customer Reviews ({product.reviewsCount || 120})
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400">
                    Product Summary
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-700 sm:text-sm font-medium max-w-4xl">
                    {product.description ||
                      "Detailed overview statement highlighting quality materials, everyday convenience, and affordable pricing guaranteed below MRP."}
                  </p>
                </div>

                {product.highlights && product.highlights.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400">
                      Key Highlights
                    </h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {product.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 rounded-2xl bg-amber-50/60 p-3.5 border border-amber-100"
                        >
                          <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                          <span className="text-xs font-bold text-brand-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400">
                      Key Highlights
                    </h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50/60 p-3.5 border border-amber-100">
                        <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-brand-ink">Guaranteed Below MRP</span>
                      </div>
                      <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50/60 p-3.5 border border-amber-100">
                        <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-brand-ink">100% Quality Inspected</span>
                      </div>
                      <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50/60 p-3.5 border border-amber-100">
                        <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-brand-ink">Fast Doorstep Delivery</span>
                      </div>
                      <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50/60 p-3.5 border border-amber-100">
                        <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-brand-ink">Easy 7 Days Returns</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-3xl">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 mb-4">
                  Technical Specifications
                </h3>
                <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  {product.specifications && product.specifications.length > 0 ? (
                    product.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-12 px-4 py-3 text-xs sm:text-sm ${
                          idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                        }`}
                      >
                        <span className="col-span-5 font-semibold text-gray-500">
                          {spec.label}
                        </span>
                        <span className="col-span-7 font-bold text-brand-ink">
                          {spec.value}
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="grid grid-cols-12 px-4 py-3 text-xs sm:text-sm bg-gray-50/50">
                        <span className="col-span-5 font-semibold text-gray-500">Category</span>
                        <span className="col-span-7 font-bold text-brand-ink">{product.category || "General Essentials"}</span>
                      </div>
                      <div className="grid grid-cols-12 px-4 py-3 text-xs sm:text-sm bg-white">
                        <span className="col-span-5 font-semibold text-gray-500">Stock Status</span>
                        <span className="col-span-7 font-bold text-emerald-600">{product.inStock !== false ? "In Stock" : "Out of Stock"}</span>
                      </div>
                      <div className="grid grid-cols-12 px-4 py-3 text-xs sm:text-sm bg-gray-50/50">
                        <span className="col-span-5 font-semibold text-gray-500">Price Guarantee</span>
                        <span className="col-span-7 font-bold text-brand-ink">Always Lower than MRP</span>
                      </div>
                      <div className="grid grid-cols-12 px-4 py-3 text-xs sm:text-sm bg-white">
                        <span className="col-span-5 font-semibold text-gray-500">Discount Offered</span>
                        <span className="col-span-7 font-bold text-brand-red">{product.discount}% OFF</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-4 rounded-2xl bg-amber-50 p-5 border border-amber-100">
                    <div className="text-center">
                      <span className="font-display text-4xl font-black text-brand-ink">
                        {product.rating ?? 4.5}
                      </span>
                      <div className="mt-1 flex justify-center text-amber-500">
                        {"★".repeat(Math.max(Math.floor(product.rating ?? 4.5), 1))}
                      </div>
                      <p className="mt-1 text-[10px] font-bold text-gray-500 uppercase">
                        Overall Rating
                      </p>
                    </div>
                    <div className="border-l border-amber-200/80 pl-4 text-xs text-gray-600">
                      <p className="font-bold text-brand-ink">100% Verified Buyers</p>
                      <p className="mt-0.5">Based on {product.reviewsCount || 120} customer ratings.</p>
                    </div>
                  </div>
                </div>

                {/* Review Cards */}
                <div className="mt-6 space-y-4">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="rounded-2xl bg-gray-50 p-4 border border-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-xs font-bold text-white">
                              {rev.author[0]}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-brand-ink">{rev.author}</p>
                              <div className="flex text-amber-500 text-[10px]">
                                {"★".repeat(rev.rating)}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                        </div>
                        <p className="mt-2 text-xs text-gray-700 leading-relaxed font-medium">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-gray-50 p-6 border border-gray-100 text-center text-xs text-gray-500">
                      Be the first verified customer to review this product!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-black text-brand-ink sm:text-2xl">
                You Might Also Like
              </h2>
              <p className="text-xs text-gray-500">
                Explore more high-demand items below MRP
              </p>
            </div>
            <button
              onClick={() => onNavigate?.("catalog")}
              className="text-xs font-bold text-brand-red hover:underline"
            >
              View All Products &rarr;
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
            {relatedProducts.map((rel) => {
              const RelIcon = rel.icon || Package;
              return (
                <div
                  key={rel.id}
                  onClick={() => onNavigate?.("product", rel.id)}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100"
                >
                  <div
                    className="relative flex aspect-square items-center justify-center rounded-xl overflow-hidden"
                  >
                    {!rel.image && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${rel.art} opacity-90`}
                      />
                    )}
                    {rel.image ? (
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="relative z-10">
                        <RelIcon size={36} className="text-white drop-shadow-sm group-hover:scale-110 transition-transform" />
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h4 className="line-clamp-1 text-xs font-bold text-brand-ink">
                      {rel.name}
                    </h4>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-sm font-black text-brand-ink">
                        ₹{rel.price}
                      </span>
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹{rel.mrp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
