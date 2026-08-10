import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { products } from "../data/products.js";

export default function CartPage({ onNavigate, cartCount = 0 }) {
  // Demo initial cart items if cartCount > 0 or default sample items
  const [cartItems, setCartItems] = useState([
    {
      ...products[0],
      quantity: 2,
    },
    {
      ...products[1],
      quantity: 1,
    },
  ]);
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalMRP = cartItems.reduce(
    (sum, item) => sum + (item.mrp || item.price * 1.3) * item.quantity,
    0
  );
  const totalSavings = totalMRP - subtotal;
  const couponDiscount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryCharge = subtotal > 499 || cartItems.length === 0 ? 0 : 49;
  const finalTotal = subtotal - couponDiscount + deliveryCharge;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "SAVE10" || couponCode.toUpperCase() === "NOTONMRP") {
      setDiscountApplied(true);
    } else {
      alert("Invalid coupon code. Try SAVE10 for 10% OFF!");
    }
  };

  const handleCheckout = () => {
    onNavigate?.("checkout");
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
          <span className="font-bold text-brand-ink">Shopping Cart</span>
        </div>

        {/* Page Title */}
        <div className="mb-8 flex flex-col justify-between gap-2 border-b border-gray-200/80 pb-4 sm:flex-row sm:items-center">
          <h1 className="font-display text-2xl font-black uppercase text-brand-ink sm:text-3xl flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-yellow text-brand-ink shadow-sm">
              <ShoppingCart size={22} />
            </div>
            YOUR SHOPPING CART
          </h1>
          <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
            {cartItems.length} DISTINCT ITEMS SELECTED
          </span>
        </div>

        {orderPlaced ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="my-12 rounded-3xl bg-white p-8 sm:p-12 text-center shadow-xl border border-emerald-100 max-w-lg mx-auto"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="font-display text-2xl font-black uppercase text-brand-ink">
              ORDER PLACED SUCCESSFULLY!
            </h2>
            <p className="mt-2 text-xs font-semibold text-gray-600">
              Thank you for shopping with <strong>NOT ON MRP</strong>! Your order #NOM-{Math.floor(100000 + Math.random() * 900000)} is being packed with love.
            </p>
            <div className="mt-6 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs font-bold text-amber-900">
              🎉 Total Savings Below MRP on this order: ₹{Math.round(totalSavings)}!
            </div>
            <p className="mt-6 text-[11px] text-gray-400">
              Redirecting to Homepage...
            </p>
          </motion.div>
        ) : cartItems.length === 0 ? (
          <div className="my-12 rounded-3xl bg-white p-12 text-center shadow-sm border border-gray-100 max-w-xl mx-auto">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-50 text-brand-yellow-dark mb-4">
              <ShoppingCart size={44} />
            </div>
            <h2 className="font-display text-xl font-black uppercase text-brand-ink">
              YOUR CART IS CURRENTLY EMPTY!
            </h2>
            <p className="mt-2 text-xs text-gray-500 max-w-sm mx-auto">
              Looks like you haven't added any products to your cart yet. Explore our bestsellers guaranteed below MRP!
            </p>
            <button
              onClick={() => onNavigate?.("catalog")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-xs font-black uppercase text-white shadow-lg transition-all hover:bg-gray-900 active:scale-95 cursor-pointer"
            >
              <span>EXPLORE PRODUCTS NOW</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Delivery Banner */}
              <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-900">
                <div className="flex items-center gap-2.5">
                  <Truck size={20} className="text-emerald-600" />
                  <span>
                    {subtotal >= 499 ? (
                      <strong className="text-emerald-700">🎉 Congratulations! You unlocked FREE Delivery!</strong>
                    ) : (
                      <span>
                        Add <strong>₹{499 - subtotal}</strong> more to unlock <strong>FREE Express Shipping!</strong>
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Items Card Grid */}
              <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100 space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4 bg-gray-50/40 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {item.image ? (
                        <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : item.art ? (
                        <div
                          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.art} shadow-inner`}
                        >
                          {item.icon && <item.icon size={32} className="text-white drop-shadow-md" />}
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 shrink-0 rounded-xl object-contain bg-white p-1"
                        />
                      )}
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          {item.discount || 20}% BELOW MRP
                        </span>
                        <h3 className="mt-1 font-display text-sm font-bold text-brand-ink line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">{item.category}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-display text-sm font-black text-brand-ink">
                            ₹{item.price}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{Math.round(item.mrp || item.price * 1.3)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                      <div className="flex items-center rounded-full border border-gray-300 bg-white shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-bold text-brand-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-display text-base font-black text-brand-ink">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-[#E31E24] transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-4 space-y-4">
              {/* Promo Coupon Box */}
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <h4 className="font-display text-xs font-extrabold uppercase tracking-wide text-gray-700 flex items-center gap-1.5 mb-3">
                  <Tag size={15} className="text-brand-yellow-dark" />
                  APPLY PROMO COUPON
                </h4>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. SAVE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-xs uppercase font-bold text-brand-ink focus:border-brand-yellow focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-brand-yellow px-4 py-2 text-xs font-black uppercase text-brand-ink shadow-2xs hover:bg-amber-400 cursor-pointer"
                  >
                    APPLY
                  </button>
                </form>
                {discountApplied && (
                  <p className="mt-2 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    ✓ SAVE10 applied! Extra 10% discount subtracted.
                  </p>
                )}
              </div>

              {/* Order Price Breakdown */}
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 space-y-3">
                <h4 className="font-display text-sm font-black uppercase text-brand-ink border-b border-gray-100 pb-3">
                  PRICE SUMMARY
                </h4>

                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>Total Original MRP</span>
                  <span className="line-through text-gray-400">₹{Math.round(totalMRP)}</span>
                </div>

                <div className="flex justify-between text-xs font-semibold text-emerald-700">
                  <span>Discount Below MRP</span>
                  <span>- ₹{Math.round(totalSavings)}</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-xs font-semibold text-emerald-700">
                    <span>Coupon Discount (SAVE10)</span>
                    <span>- ₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>Delivery Charges</span>
                  {deliveryCharge === 0 ? (
                    <span className="font-extrabold text-emerald-600">FREE</span>
                  ) : (
                    <span>₹{deliveryCharge}</span>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-display text-base font-black text-brand-ink">
                  <span>TOTAL AMOUNT</span>
                  <span className="text-xl text-[#E31E24]">₹{finalTotal}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-center text-[11px] font-extrabold text-emerald-800 border border-emerald-200">
                    💰 Total Savings on this order: ₹{Math.round(totalSavings + couponDiscount)}!
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-xs font-black uppercase text-white shadow-lg transition-all hover:bg-gray-900 active:scale-95 cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  100% Safe & Secure Checkout Guarantee
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
