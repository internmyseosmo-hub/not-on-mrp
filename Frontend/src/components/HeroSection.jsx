import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  ArrowRight,
  Shield,
  Percent,
  RotateCcw,
  Headphones,
} from "lucide-react";
import heroShoppers from "../assets/hero_shoppers.png?v=6";
import floatWaterBottle from "../assets/float_water_bottle.png";
import floatHeadphones from "../assets/float_headphones.png";
import floatCardboardBox from "../assets/float_cardboard_box.png";
import floatShoppingBasket from "../assets/float_shopping_basket.png";
import floatBlueMug from "../assets/float_blue_mug.png";

const slides = [
  {
    theme: "amber",
    heading1: "SMART SHOPPING,",
    heading2: "LOWER PRICES!",
    subtext: "Everything you need, Always at",
    badgeTop: "ALWAYS",
    badgeLines: ["LOW", "PRICES"],
    badgeSub: "ON EVERYTHING!",
    features: [
      { title: "WIDE RANGE", desc: "Products for every need", icon: ShoppingBag },
      { title: "BEST QUALITY", desc: "Trusted quality, Always", icon: ShieldCheck },
      { title: "LOWEST PRICES", desc: "Get more for less", icon: Tag },
    ],
  },
  {
    theme: "blue",
    heading1: "SPECIAL OFFERS,",
    heading2: "BIGGER SAVINGS!",
    subtext: "Stock up your home with essentials at",
    badgeTop: "FLAT",
    badgeLines: ["30%", "OFF"],
    badgeSub: "LIMITED TIME",
    features: [
      { title: "BEST RATES", desc: "Guaranteed lowest prices", icon: ShoppingBag },
      { title: "MEGA DISCOUNTS", desc: "Save more on every item", icon: ShieldCheck },
      { title: "DOORSTEP DELIVERY", desc: "Fast & safe transport", icon: Tag },
    ],
  },
  {
    theme: "green",
    heading1: "NEW ARRIVALS,",
    heading2: "FRESH EVERY WEEK!",
    subtext: "Handpicked essentials, added weekly at",
    badgeTop: "EVERY",
    badgeLines: ["NEW", "DROPS"],
    badgeSub: "EVERY FRIDAY",
    features: [
      { title: "FRESH DROPS", desc: "New items every Friday", icon: ShoppingBag },
      { title: "TOP BRANDS", desc: "100% genuine products", icon: ShieldCheck },
      { title: "BEST VALUE", desc: "Lower than MRP", icon: Tag },
    ],
  },
];

const bottomBarItems = [
  { label: "SAFE & SECURE", sub: "SHOPPING", icon: Shield },
  { label: "AMAZING DEALS", sub: "EVERYDAY", icon: Percent },
  { label: "EASY RETURNS", sub: "& REFUNDS", icon: RotateCcw },
  { label: "24/7 CUSTOMER", sub: "SUPPORT", icon: Headphones },
];

const AUTO_SLIDE_MS = 3500;

export default function HeroSection({ onNavigate }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const goTo = (i, dir = 1) => {
    setDirection(dir);
    setIndex(((i % slides.length) + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      goTo(index + 1, 1);
    } else if (diff < -50) {
      goTo(index - 1, -1);
    }
  };

  const slide = slides[index];

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden"
    >
      {/* Full-width Main Banner Outer Box */}
      <div className="relative overflow-hidden bg-[#FFBF1A] shadow-md">
        {/* Organic Background Shape: Left Cream Arc + Right Gold Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Right Gold Pattern Fill */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFC82C] via-[#FFB800] to-[#F5A300]" />

          {/* Dotted texture on yellow background */}
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-25 dot-pattern" />

          {/* Large Left Off-White Organic Arc Shape (Slides in from the left side) */}
          <motion.div
            key={index}
            initial={{ x: "-100%", opacity: 0.2 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 h-full w-full lg:w-[62%] text-[#FFFBF0]"
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 700 500"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,0 L620,0 C540,180 570,340 430,500 L0,500 Z" />
            </svg>
          </motion.div>
        </div>

        {/* Floating Background Doodles (Paper plane, halftone dots, sparkles, squiggles) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Halftone dots grid top left */}
          <div className="absolute left-8 top-6 grid grid-cols-6 gap-1.5 opacity-30 sm:left-14">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#E59800]" />
            ))}
          </div>

          {/* Floating Paper Airplane Line Art */}
          <motion.div
            animate={{ y: [0, -8, 0], x: [0, 6, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/3 top-8 hidden text-brand-ink/40 lg:block"
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </motion.div>

          {/* Decorative Plus / Cross sparkles & Squiggle lines */}
          <span className="absolute left-6 top-1/2 text-lg text-amber-400 font-bold opacity-60 sm:left-12">+</span>
          <span className="absolute left-2/5 bottom-20 text-xl text-amber-500 font-bold opacity-50">×</span>
          <span className="absolute right-1/3 top-12 text-sm text-white font-bold opacity-70">×</span>
          <span className="absolute right-12 bottom-1/3 text-lg text-white font-bold opacity-60">+</span>

          {/* White Squiggle wave lines under headphones */}
          <div className="absolute right-20 bottom-16 opacity-70 hidden sm:block">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M 0,10 Q 7.5,0 15,10 T 30,10 T 45,10 T 60,10" />
            </svg>
          </div>
        </div>

        {/* Banner Content Container */}
        <div className="relative z-10 mx-auto max-w-[1440px]">          {/* Carousel Arrow Controls (Visible on sm/lg, swipe handles mobile) */}
          <button
            aria-label="Previous slide"
            onClick={() => goTo(index - 1, -1)}
            className="group absolute left-2 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#121820] text-white shadow-lg transition-all active:scale-95 sm:flex lg:left-3 hover:bg-black hover:scale-110"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => goTo(index + 1, 1)}
            className="group absolute right-2 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#121820] text-white shadow-lg transition-all active:scale-95 sm:flex lg:right-3 hover:bg-black hover:scale-110"
          >
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Banner Content Grid */}
          <div className="grid grid-cols-1 items-end px-4 pt-6 pb-0 sm:px-12 lg:grid-cols-12 lg:gap-6 lg:px-16 lg:pt-10">
            {/* Left Column: Heading + Subtitle + 3 Features + CTA Button */}
            <div className="order-1 py-2 sm:py-4 lg:order-1 lg:col-span-6 lg:py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Headline */}
                  <h1 className="font-display text-2xl font-black leading-tight sm:leading-[1.2] lg:leading-[1.22] tracking-normal text-[#1E1E1E] xs:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.2rem]">
                    {slide.heading1}
                    <br />
                    <span className="relative mt-1 inline-block text-[#F5A300] sm:mt-1.5">
                      {slide.heading2}
                      {/* Small yellow underline accent */}
                      <span className="absolute -bottom-2 left-0 h-1.5 w-24 rounded-full bg-[#F5A300] sm:-bottom-2.5 sm:w-32" />
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="mt-4 max-w-md text-xs font-semibold text-[#3A3A3A] xs:text-sm sm:mt-5 sm:text-base lg:text-lg">
                    {slide.subtext}{" "}
                    <span className="font-bold text-[#E31E24]">Not On MRP!</span>
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* 3 Feature Columns with Vertical Line Dividers */}
              <div className="mt-5 grid grid-cols-3 divide-x divide-amber-200/80 border-t border-amber-100/60 pt-4 sm:mt-8">
                {slide.features.map(({ title, desc, icon: Icon }, idx) => (
                  <motion.div
                    key={`${index}-${title}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.15 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className={`group flex flex-col items-start cursor-pointer transition-colors ${
                      idx === 0 ? "pr-1.5 sm:pr-3" : idx === 1 ? "px-1.5 sm:px-3" : "pl-1.5 sm:pl-3"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F5A300] bg-white text-[#F5A300] shadow-xs transition-colors group-hover:border-[#E31E24] group-hover:text-[#E31E24] sm:h-11 sm:w-11"
                    >
                      <Icon size={16} strokeWidth={2.2} className="sm:size-5" />
                    </motion.div>
                    <h4 className="font-display text-[10px] font-extrabold text-[#1E1E1E] transition-colors group-hover:text-[#E31E24] xs:text-[11px] sm:text-xs">
                      {title}
                    </h4>
                    <p className="mt-0.5 text-[9px] font-medium leading-tight text-[#666666] xs:text-[10px] sm:text-[11px]">
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button: Dark Pill with Yellow Arrow Icon */}
              <div className="mt-6 sm:mt-8">
                <motion.button
                  onClick={() => onNavigate?.("catalog")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#121820] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-black sm:px-7 sm:py-3 sm:text-sm cursor-pointer"
                >
                  SHOP NOW
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5A300] text-[#121820] transition-transform group-hover:translate-x-1 sm:h-7 sm:w-7">
                    <ArrowRight size={14} strokeWidth={3} />
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Right Column: Shoppers Photo + 3D Tilted Badge + Transparent Floating Products */}
            <div className="relative order-2 mx-auto flex w-full items-end justify-center lg:order-2 lg:col-span-6 mt-4 lg:mt-0">
              {/* Central Shoppers Photo */}
              <div className="relative mx-auto flex w-full max-w-sm items-end justify-center overflow-hidden xs:max-w-md sm:max-w-lg lg:max-w-xl">
                <motion.div
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-end justify-center -mb-4 xs:-mb-8 sm:-mb-14 lg:-mb-18"
                >
                  <img
                    src={heroShoppers}
                    alt="Excited Indian Shoppers holding stationery and household items basket"
                    className="h-auto max-h-[260px] w-full object-contain xs:max-h-[320px] sm:max-h-[440px] lg:max-h-[520px]"
                  />
                </motion.div>
              </div>

              {/* Top Right 3D Tilted Discount Badge */}
              <motion.div
                initial={{ opacity: 0, rotate: 6, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 6, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute right-0 top-0 z-25 w-28 select-none xs:w-32 sm:-right-4 sm:top-2 sm:w-40 lg:-right-12 lg:w-48"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative rounded-2xl border-2 border-white/40 bg-[#121820] p-2 text-center shadow-2xl sm:p-3.5"
                >
                  <span className="inline-block rounded-md bg-[#E31E24] px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white sm:text-[10px]">
                    {slide.badgeTop}
                  </span>
                  <div className="font-display mt-0.5 text-lg font-black leading-none text-white xs:text-xl sm:mt-1.5 sm:text-3xl">
                    {slide.badgeLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                  <span className="mt-0.5 inline-block rounded-md bg-[#E31E24] px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wide text-white sm:text-[10px]">
                    {slide.badgeSub}
                  </span>
                </motion.div>
              </motion.div>

              {/* ---------------- PURE TRANSPARENT CUTOUT FLOATING PRODUCTS (Visible on Desktop / Large Tablets) ---------------- */}

              {/* 1. Floating Yellow Water Bottle */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute left-2 top-2 z-20 hidden w-16 md:block lg:left-10 lg:top-5 lg:w-[7.5rem]"
              >
                <img
                  src={floatWaterBottle}
                  alt="Floating Yellow Water Bottle"
                  className="h-auto w-full object-contain filter drop-shadow-2xl"
                />
              </motion.div>

              {/* 2. Floating Cardboard Box */}
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="pointer-events-none absolute right-0 top-32 z-20 hidden w-14 md:block lg:-right-2 lg:top-44 lg:w-22"
              >
                <img
                  src={floatCardboardBox}
                  alt="Floating Cardboard Delivery Box"
                  className="h-auto w-full object-contain filter drop-shadow-2xl"
                />
              </motion.div>

              {/* 3. Floating Yellow & Black Wireless Headphones */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="pointer-events-none absolute -right-2 bottom-2 z-20 hidden w-20 md:block lg:-right-8 lg:bottom-4 lg:w-32"
              >
                <img
                  src={floatHeadphones}
                  alt="Floating Wireless Headphones"
                  className="h-auto w-full object-contain filter drop-shadow-2xl"
                />
              </motion.div>

              {/* 4. Floating Red Shopping Basket */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="pointer-events-none absolute left-0 bottom-16 z-20 hidden w-16 md:block lg:left-1 lg:bottom-40 lg:w-36"
              >
                <img
                  src={floatShoppingBasket}
                  alt="Floating Red Shopping Basket"
                  className="h-auto w-full object-contain filter drop-shadow-2xl"
                />
              </motion.div>

              {/* 5. Floating Blue Ceramic Coffee Mug */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="pointer-events-none absolute left-2 bottom-2 z-20 hidden w-10 md:block lg:left-8 lg:bottom-3 lg:w-20"
              >
                <img
                  src={floatBlueMug}
                  alt="Floating Blue Coffee Mug"
                  className="h-auto w-full object-contain filter drop-shadow-2xl"
                />
              </motion.div>

            </div>
          </div>

          {/* Carousel Dots Overlay */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i, i >= index ? 1 : -1)}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-[#121820]" : "w-2 bg-[#121820]/30 hover:bg-[#121820]/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Full-width Bottom Feature Bar (Continuous Running Marquee Ticker) */}
        <div className="relative z-10 overflow-hidden border-t border-white/10 bg-[#121820] py-3.5 text-white shadow-inner">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
            className="flex w-max items-center gap-8 sm:gap-12"
          >
            {[...bottomBarItems, ...bottomBarItems, ...bottomBarItems, ...bottomBarItems].map(
              ({ label, sub, icon: Icon }, idx) => (
                <div
                  key={`${label}-${idx}`}
                  className="flex shrink-0 items-center gap-3 pr-8 sm:pr-12 border-r border-white/15"
                >
                  {/* Yellow Hexagon / Badge Icon Container */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5A300] text-[#121820] shadow-sm sm:h-9 sm:w-9">
                    <Icon size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h5 className="font-display text-[10px] font-extrabold uppercase leading-tight tracking-wide text-white sm:text-xs">
                      {label}
                    </h5>
                    <p className="text-[9px] font-bold uppercase leading-tight text-[#F5A300] sm:text-[10px]">
                      {sub}
                    </p>
                  </div>
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
