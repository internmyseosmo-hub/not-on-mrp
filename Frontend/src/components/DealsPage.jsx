import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Zap,
  Clock,
  Sparkles,
  CheckCircle,
  Copy,
  ArrowRight,
  IndianRupee,
  Gift,
  ShieldCheck,
  RotateCcw,
  Truck,
  Headphones,
  ShoppingCart,
  Star,
} from "lucide-react";
import { products } from "../data/products.js";

// Import generated deal images
import dealsHeroCart from "../assets/deals_hero_cart.png";
import shoppingCartLoop from "../assets/shopping_cart_loop.webp";
import dealsAlarmClock from "../assets/deals_alarm_clock.png";
import dealsShoppingBag from "../assets/deals_shopping_bag.png";
import dealsHomeChair from "../assets/deals_home_chair.png";
import dealsStorageCrates from "../assets/deals_storage_crates.png";
import dealsBeautyBottles from "../assets/deals_beauty_bottles.png";
import dealsToysBear from "../assets/deals_toys_bear.png";
import dealsStationeryStand from "../assets/deals_stationery_stand.png";
import spotlightPan from "../assets/spotlight_pan.png";

export default function DealsPage({ onNavigate, onAddToCart }) {
  // Live Flash Sale Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 36,
  });

  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [addedProductId, setAddedProductId] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: 59, seconds: 59, hours: prev.hours };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleAddProduct = (product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const scrollToDealsSection = (tabName) => {
    if (tabName) setActiveTab(tabName);
    const dealsElem = document.getElementById("hot-deals-section");
    if (dealsElem) {
      dealsElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter products for the deals section
  const dealProducts = products.filter((p) => {
    if (activeTab === "Under ₹99") return p.price <= 199;
    if (activeTab === "50%+ Off" || activeTab === "60%+ Off") return p.discount >= 20;
    if (activeTab === "Kitchenware" || activeTab === "Kitchen")
      return (
        p.category === "Kitchenware" ||
        p.category === "Kitchen & Appliances" ||
        p.category === "Drinkware & Hydration"
      );
    if (activeTab === "Storage & Organizers" || activeTab === "Storage")
      return (
        p.category === "Storage & Organizers" ||
        p.category === "Home & Organization" ||
        p.name.toLowerCase().includes("crates") ||
        p.name.toLowerCase().includes("organizer")
      );
    if (activeTab === "Home Essentials")
      return (
        p.category === "Home & Organization" ||
        p.category === "Home & Living" ||
        p.category === "Home & Comfort" ||
        p.category === "Laundry & Houseware"
      );
    if (activeTab === "Beauty & Personal Care")
      return (
        p.category === "Personal Care" ||
        p.category === "Beauty & Personal Care" ||
        p.category === "Laundry & Houseware"
      );
    if (activeTab === "Toys & Games")
      return p.category === "Toys & Games" || p.id % 2 === 0;
    if (activeTab === "Stationery")
      return (
        p.category === "Office & Stationery" ||
        p.category === "Stationery" ||
        p.name.toLowerCase().includes("pen") ||
        p.name.toLowerCase().includes("desk")
      );
    return true;
  });

  const categories = [
    {
      title: "HOME ESSENTIALS",
      discount: "UP TO 50% OFF",
      bg: "bg-[#EBF7EE] border-[#C2E8CC]",
      btn: "bg-[#1E7E34] hover:bg-[#155D27]",
      image: dealsHomeChair,
      catName: "Home Essentials",
    },
    {
      title: "KITCHENWARE",
      discount: "UP TO 40% OFF",
      bg: "bg-[#FDF2F2] border-[#F8D0D0]",
      btn: "bg-[#E31E24] hover:bg-[#B30E15]",
      image: spotlightPan,
      catName: "Kitchenware",
    },
    {
      title: "STORAGE & ORGANIZERS",
      discount: "UP TO 45% OFF",
      bg: "bg-[#EDF5FF] border-[#C5E0FF]",
      btn: "bg-[#1D63B8] hover:bg-[#13498B]",
      image: dealsStorageCrates,
      catName: "Storage & Organizers",
    },
    {
      title: "BEAUTY & PERSONAL CARE",
      discount: "UP TO 35% OFF",
      bg: "bg-[#F7F2FA] border-[#E4D5EE]",
      btn: "bg-[#6B3BA7] hover:bg-[#4E277E]",
      image: dealsBeautyBottles,
      catName: "Beauty & Personal Care",
    },
    {
      title: "TOYS & GAMES",
      discount: "UP TO 30% OFF",
      bg: "bg-[#FFF5EB] border-[#FEDBBD]",
      btn: "bg-[#D96B00] hover:bg-[#A85100]",
      image: dealsToysBear,
      catName: "Toys & Games",
    },
    {
      title: "STATIONERY",
      discount: "UP TO 40% OFF",
      bg: "bg-[#F0FAF4] border-[#C8EBD6]",
      btn: "bg-[#258547] hover:bg-[#195E31]",
      image: dealsStationeryStand,
      catName: "Stationery",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-16 pt-4 text-brand-ink">
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedCode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-brand-ink px-6 py-2.5 text-sm font-bold text-white shadow-2xl flex items-center gap-2 border border-amber-400"
          >
            <CheckCircle size={18} className="text-emerald-400" />
            Coupon Code <span className="text-brand-yellow font-mono">SAVE10</span> Copied to Clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        
        {/* ================= HERO BANNER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFCC00] via-[#FDB813] to-[#F5A600] p-6 shadow-2xl sm:p-8 lg:px-10 lg:py-8 border-2 border-amber-400/60">
          
          {/* Sunburst Radial Rays Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100 via-transparent to-transparent" />
          
          {/* Dot Matrix Corner Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:14px_14px] pointer-events-none" />

          {/* Floating Confetti Graphics (Triangles & Sparkles) */}
          <div className="absolute top-4 left-6 h-3 w-3 rotate-12 bg-black clip-path-triangle pointer-events-none" />
          <div className="absolute top-12 left-1/4 h-3.5 w-3.5 -rotate-45 bg-[#E31E24] clip-path-triangle pointer-events-none" />
          <div className="absolute bottom-6 left-1/3 h-3 w-3 rotate-45 bg-white clip-path-triangle pointer-events-none" />
          <div className="absolute top-6 left-1/2 h-2.5 w-2.5 bg-black rounded-full pointer-events-none" />
          <div className="absolute bottom-8 right-1/3 h-3.5 w-3.5 -rotate-12 bg-[#E31E24] clip-path-triangle pointer-events-none" />
          <div className="absolute top-8 right-1/4 h-3 w-3 rotate-45 bg-black clip-path-triangle pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            
            {/* LEFT SECTION: Bold Angled Typography Badges */}
            <div className="flex flex-col items-start justify-center pl-4 sm:pl-8 lg:pl-14 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative space-y-1.5"
              >
                {/* Floating confetti around badges */}
                <div className="absolute -top-4 -left-4 text-xs font-black text-[#E31E24]">▲</div>
                <div className="absolute -top-3 right-2 text-sm font-black text-black">▲</div>

                {/* Black Angled DEALS & Badge */}
                <div className="inline-block rounded-xl bg-black px-6 py-2.5 font-display text-3xl font-black uppercase text-white shadow-2xl transform -rotate-3 border-2 border-white/10 sm:text-4xl lg:text-5xl tracking-wide">
                  DEALS &
                </div>

                {/* Red Angled OFFERS Badge */}
                <div>
                  <div className="inline-block rounded-2xl bg-[#E31E24] px-8 py-3 font-display text-4xl font-black uppercase text-white shadow-2xl transform -rotate-1 border-2 border-white/20 sm:text-5xl lg:text-6xl tracking-tight -mt-2">
                    OFFERS
                  </div>
                </div>

                {/* Black SAVE MORE, SHOP MORE! Ribbon */}
                <div className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-2 font-display text-xs font-extrabold uppercase tracking-widest text-white shadow-xl transform rotate-1 border-t-2 border-amber-400 sm:text-sm mt-2">
                  <Zap size={16} className="fill-brand-yellow text-brand-yellow animate-pulse" />
                  <span>SAVE MORE, SHOP MORE!</span>
                </div>
              </motion.div>
            </div>


            {/* CENTER SECTION: User's Animated Transparent Shopping Cart GIF */}
            <div className="relative flex items-center justify-center lg:col-span-4 py-2 lg:-translate-x-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.06 }}
                className="relative cursor-pointer"
              >
                <img
                  src={shoppingCartLoop}
                  alt="Animated Shopping Cart Loop"
                  className="h-48 w-auto object-contain sm:h-56 lg:h-64 drop-shadow-2xl transition-transform duration-300"
                />
              </motion.div>
            </div>


            {/* RIGHT SECTION: 3 Perfectly Level Feature Columns with Staggered Animations */}
            <div className="grid grid-cols-3 gap-2 border-t border-black/15 pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0 items-stretch lg:-translate-x-12">
              
              {/* Feature 1: BEST PRICES */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center justify-start text-center px-1 sm:px-2 h-full cursor-pointer group"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black text-brand-yellow shadow-xl ring-2 ring-amber-300 transition-all duration-300 group-hover:scale-110 group-hover:ring-amber-400 group-hover:shadow-amber-400/30"
                >
                  <IndianRupee size={22} strokeWidth={3} className="transition-transform group-hover:rotate-6 sm:size-6" />
                </motion.div>

                {/* Fixed height title container for exact 100% same level alignment */}
                <div className="mt-3 flex h-8 sm:h-9 items-center justify-center text-center">
                  <h4 className="font-display text-xs sm:text-sm font-black text-brand-ink uppercase tracking-tight leading-tight">
                    BEST PRICES
                  </h4>
                </div>

                <p className="mt-1 text-[10px] sm:text-xs font-medium text-gray-800 leading-tight">
                  Unbeatable prices on everything
                </p>
              </motion.div>

              {/* Feature 2: EXCLUSIVE OFFERS */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center justify-start text-center px-1 sm:px-2 h-full border-l border-black/20 cursor-pointer group"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.4 }}
                  className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black text-brand-yellow shadow-xl ring-2 ring-amber-300 transition-all duration-300 group-hover:scale-110 group-hover:ring-amber-400 group-hover:shadow-amber-400/30"
                >
                  <Tag size={22} strokeWidth={2.5} className="transition-transform group-hover:-rotate-6 sm:size-6" />
                </motion.div>

                {/* Fixed height title container for exact 100% same level alignment */}
                <div className="mt-3 flex h-8 sm:h-9 items-center justify-center text-center">
                  <h4 className="font-display text-xs sm:text-sm font-black text-brand-ink uppercase tracking-tight leading-tight">
                    EXCLUSIVE OFFERS
                  </h4>
                </div>

                <p className="mt-1 text-[10px] sm:text-xs font-medium text-gray-800 leading-tight">
                  Exciting offers every single day
                </p>
              </motion.div>

              {/* Feature 3: MORE SAVINGS */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center justify-start text-center px-1 sm:px-2 h-full border-l border-black/20 cursor-pointer group"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.8 }}
                  className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black text-brand-yellow shadow-xl ring-2 ring-amber-300 transition-all duration-300 group-hover:scale-110 group-hover:ring-amber-400 group-hover:shadow-amber-400/30"
                >
                  <Gift size={22} strokeWidth={2.5} className="transition-transform group-hover:rotate-6 sm:size-6" />
                </motion.div>

                {/* Fixed height title container for exact 100% same level alignment */}
                <div className="mt-3 flex h-8 sm:h-9 items-center justify-center text-center">
                  <h4 className="font-display text-xs sm:text-sm font-black text-brand-ink uppercase tracking-tight leading-tight">
                    MORE SAVINGS
                  </h4>
                </div>

                <p className="mt-1 text-[10px] sm:text-xs font-medium text-gray-800 leading-tight">
                  More value for every penny
                </p>
              </motion.div>

            </div>

          </div>
        </div>


        {/* ================= SECTION TITLE ================= */}
        <div className="my-10 text-center">
          <div className="inline-flex items-center gap-3">
            <span className="text-2xl font-black text-[#E31E24]">\\</span>
            <h2 className="font-display text-2xl font-black uppercase tracking-wider text-brand-ink sm:text-3xl lg:text-4xl">
              EXPLORE TOP DEALS
            </h2>
            <span className="text-2xl font-black text-[#E31E24]">//</span>
          </div>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-brand-yellow" />
        </div>


        {/* ================= TOP DEALS GRID (3 MAIN CARDS) ================= */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* CARD 1: DEAL OF THE DAY */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF5CC] via-[#FFDF6B] to-[#FFC526] p-6 shadow-lg border border-amber-300/80"
          >
            <div>
              {/* Header Pill & Limited Badge */}
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-[#E31E24] px-4 py-1.5 font-display text-xs font-black uppercase text-white shadow-md">
                  DEAL OF THE DAY
                </span>
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full bg-black p-1 text-center font-display text-[9px] font-extrabold uppercase leading-tight text-white shadow-xl ring-2 ring-amber-400">
                  <span>LIMITED</span>
                  <span className="text-brand-yellow font-black">TIME</span>
                  <span>OFFER!</span>
                </div>
              </div>

              {/* Offer Text */}
              <div className="mt-4">
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#E31E24]">UP TO</span>
                <h3 className="font-display text-4xl font-black leading-none text-[#E31E24] sm:text-5xl">
                  60% OFF
                </h3>
                <p className="mt-1 text-xs font-bold text-gray-800">On Bestsellers</p>
              </div>
            </div>

            {/* Product Visual */}
            <div className="my-4 flex items-center justify-center py-2">
              <img
                src={dealsHeroCart}
                alt="Deal of the day items"
                className="h-36 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onNavigate?.("catalog", "60%+ Off")}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-extrabold text-white shadow-lg transition-all hover:bg-gray-900 hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>


          {/* CARD 2: FLASH SALE (LIVE COUNTDOWN) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF5E6C] via-[#E31E24] to-[#B30E15] p-6 text-white shadow-lg border border-red-400/80"
          >
            <div>
              {/* Header Pill */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 rounded-full bg-[#FFD700] px-4 py-1.5 font-display text-xs font-black uppercase text-brand-ink shadow-md">
                  <Zap size={14} className="fill-brand-ink" />
                  FLASH SALE
                </span>
              </div>

              {/* Offer Text */}
              <div className="mt-4">
                <span className="text-xs font-extrabold uppercase tracking-wide text-amber-200">UP TO</span>
                <h3 className="font-display text-4xl font-black leading-none text-white drop-shadow-md sm:text-5xl">
                  70% OFF
                </h3>
                <p className="mt-1 text-xs font-medium text-white/90">On Selected Items</p>
              </div>
            </div>

            {/* Clock Visual & Countdown Display */}
            <div className="my-4 flex items-center gap-4 rounded-2xl bg-white/10 p-3.5 backdrop-blur-md border border-white/20">
              <img
                src={dealsAlarmClock}
                alt="Flash Sale Alarm Clock"
                className="h-20 w-auto object-contain drop-shadow-lg"
              />
              
              <div className="flex-1 text-center">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200">
                  HURRY! OFFER ENDS IN
                </p>
                <div className="mt-1.5 flex items-center justify-center gap-1.5 font-mono text-lg font-black text-white">
                  <span className="rounded-md bg-black/80 px-2 py-1 shadow-inner">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className="rounded-md bg-black/80 px-2 py-1 shadow-inner">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className="rounded-md bg-black/80 px-2 py-1 text-amber-300 shadow-inner">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-1 grid grid-cols-3 text-[9px] font-bold text-white/70">
                  <span>HRS</span>
                  <span>MINS</span>
                  <span>SECS</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onNavigate?.("catalog", "70%+ Off")}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-extrabold text-white shadow-lg transition-all hover:bg-gray-900 hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>


          {/* CARD 3: WEEKEND SPECIAL (COUPON CODE) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF9E8] via-[#FFF0B8] to-[#FFE085] p-6 shadow-lg border border-amber-200/90"
          >
            <div>
              {/* Header Pill */}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FFC107] px-4 py-1.5 font-display text-xs font-black uppercase text-brand-ink shadow-md">
                  WEEKEND SPECIAL
                </span>
              </div>

              {/* Offer Text */}
              <div className="mt-4">
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#E31E24]">EXTRA</span>
                <h3 className="font-display text-4xl font-black leading-none text-[#E31E24] sm:text-5xl">
                  10% OFF
                </h3>
                <p className="mt-1 text-xs font-bold text-gray-800">On Orders Above ₹999</p>
              </div>
            </div>

            {/* Coupon Code & Shopping Bag Visual */}
            <div className="my-3 flex items-center justify-between gap-2">
              {/* Click-to-Copy Coupon Box */}
              <button
                onClick={() => handleCopyCode("SAVE10")}
                className="group flex flex-col items-start rounded-xl border-2 border-dashed border-[#E31E24] bg-white/90 p-2.5 transition-all hover:bg-white active:scale-95 text-left cursor-pointer"
              >
                <span className="text-[10px] font-extrabold uppercase text-gray-500">CLICK TO COPY CODE</span>
                <span className="flex items-center gap-1.5 font-mono text-sm font-black text-[#E31E24]">
                  USE CODE: SAVE10
                  <Copy size={13} className="text-gray-600 group-hover:text-[#E31E24]" />
                </span>
              </button>

              <img
                src={dealsShoppingBag}
                alt="Weekend Special Shopping Bag"
                className="h-28 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onNavigate?.("catalog", "Weekend Special")}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-extrabold text-white shadow-lg transition-all hover:bg-gray-900 hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>

        </div>


        {/* ================= CATEGORY DISCOUNT GRID (6 CARDS) ================= */}
        <div className="my-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className={`flex flex-col justify-between rounded-2xl ${cat.bg} p-3.5 border shadow-sm transition-shadow hover:shadow-md cursor-pointer`}
                onClick={() => onNavigate?.("catalog", cat.catName)}
              >
                <div>
                  <span className="inline-block rounded-md bg-white/80 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-tight text-gray-800 shadow-2xs">
                    {cat.title}
                  </span>
                  <div className="mt-1.5 flex items-center">
                    <p className="font-display text-lg font-black leading-none text-[#E31E24] drop-shadow-sm">
                      {cat.discount}
                    </p>
                  </div>
                </div>

                <div className="my-3 flex items-center justify-center h-20">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="max-h-20 w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-sm"
                  />
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate?.("catalog", cat.catName);
                  }}
                  className={`mt-1 flex w-full items-center justify-center gap-1 rounded-lg ${cat.btn} py-1.5 text-[11px] font-bold text-white shadow-xs transition-colors cursor-pointer`}
                >
                  <span>SHOP NOW</span>
                  <ArrowRight size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ================= DISCOUNTED PRODUCTS CATALOG ================= */}
        <div id="hot-deals-section" className="my-12 rounded-3xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8 scroll-mt-24">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-xl font-black uppercase text-brand-ink sm:text-2xl flex items-center gap-2">
                <Sparkles size={22} className="text-brand-yellow fill-brand-yellow" />
                HANDPICKED HOT DEALS
              </h3>
              <p className="mt-0.5 text-xs text-gray-600">
                Products guaranteed at maximum discount below MRP
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                "All",
                "Home Essentials",
                "Kitchenware",
                "Storage & Organizers",
                "Beauty & Personal Care",
                "Toys & Games",
                "Stationery",
                "Under ₹99",
                "50%+ Off",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-brand-yellow text-brand-ink shadow-sm ring-2 ring-amber-400"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Banner Notification */}
          {activeTab !== "All" && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-amber-50 px-4 py-2.5 border border-amber-200 text-xs font-bold text-amber-900">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#E31E24] animate-ping" />
                <span>
                  Showing Deals For:{" "}
                  <strong className="text-[#E31E24] font-black uppercase tracking-wider">
                    {activeTab}
                  </strong>{" "}
                  ({dealProducts.length} items found)
                </span>
              </div>
              <button
                onClick={() => setActiveTab("All")}
                className="cursor-pointer text-brand-ink underline hover:text-[#E31E24]"
              >
                Clear Filter (Show All Deals)
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dealProducts.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
              >
                {/* Product Image */}
                <div
                  onClick={() => onNavigate?.("product", product.id)}
                  className="relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-t-2xl border-b border-gray-100"
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

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-20 rounded-full bg-[#E31E24] px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-white shadow-sm">
                  {product.discount}% OFF
                </div>

                {/* Content */}
                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">
                      {product.category}
                    </span>
                    <h4
                      onClick={() => onNavigate?.("product", product.id)}
                      className="line-clamp-2 text-xs font-bold text-brand-ink transition-colors hover:text-[#E31E24] cursor-pointer"
                    >
                      {product.title || product.name}
                    </h4>

                    {/* Rating */}
                    <div className="mt-1 flex items-center gap-1 text-xs text-amber-500">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-700">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviewsCount || product.reviews || 42})</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div>
                      <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                      <div className="font-display text-base font-black text-brand-ink">
                        ₹{product.price}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddProduct(product)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-all cursor-pointer ${
                        addedProductId === product.id
                          ? "bg-emerald-600 text-white"
                          : "bg-brand-yellow text-brand-ink hover:bg-amber-400 active:scale-90"
                      }`}
                    >
                      {addedProductId === product.id ? (
                        <CheckCircle size={18} />
                      ) : (
                        <ShoppingCart size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ================= BOTTOM FEATURE TRUST BAR ================= */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3 pt-4 md:pt-0 md:px-4 first:pt-0 first:px-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-brand-ink">
                <Tag size={20} className="text-[#E31E24]" />
              </div>
              <div>
                <h5 className="font-display text-xs font-extrabold text-brand-ink">Lowest Prices</h5>
                <p className="text-[11px] text-gray-500">We ensure the lowest prices every day</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3 pt-4 md:pt-0 md:px-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-brand-ink">
                <ShieldCheck size={20} className="text-[#E31E24]" />
              </div>
              <div>
                <h5 className="font-display text-xs font-extrabold text-brand-ink">Quality Assured</h5>
                <p className="text-[11px] text-gray-500">Best quality products you can trust</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3 pt-4 md:pt-0 md:px-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-brand-ink">
                <RotateCcw size={20} className="text-[#E31E24]" />
              </div>
              <div>
                <h5 className="font-display text-xs font-extrabold text-brand-ink">Easy Returns</h5>
                <p className="text-[11px] text-gray-500">Hassle-free returns within 7 days</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3 pt-4 md:pt-0 md:px-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-brand-ink">
                <Truck size={20} className="text-[#E31E24]" />
              </div>
              <div>
                <h5 className="font-display text-xs font-extrabold text-brand-ink">Fast Delivery</h5>
                <p className="text-[11px] text-gray-500">Quick delivery at your doorstep</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex items-center gap-3 pt-4 md:pt-0 md:px-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-brand-ink">
                <Headphones size={20} className="text-[#E31E24]" />
              </div>
              <div>
                <h5 className="font-display text-xs font-extrabold text-brand-ink">Customer Support</h5>
                <p className="text-[11px] text-gray-500">We're here to help you anytime</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
