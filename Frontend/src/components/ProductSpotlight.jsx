import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Flame,
  Droplets,
  Award,
  Headphones,
  Zap,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import spotlightBottle from "../assets/spotlight_bottle.png";
import spotlightHeadphones from "../assets/spotlight_headphones.png";
import spotlightKettle from "../assets/spotlight_kettle.png";
import spotlightPan from "../assets/spotlight_pan.png";
import {
  Coffee,
  Thermometer,
  Sparkles,
  Utensils,
} from "lucide-react";

const spotlightProducts = [
  {
    id: 1,
    badge: "BEST SELLER",
    tag: "PRODUCT SPOTLIGHT ✨",
    title: "Steel Insulated Water Bottle",
    subtitle: "Keep it cool. Keep it stylish.",
    image: spotlightBottle,
    price: 299,
    mrp: 499,
    features: [
      {
        title: "Double Wall Insulation",
        desc: "Keeps your drinks hot or cold for hours.",
        icon: Flame,
      },
      {
        title: "Leak Proof",
        desc: "100% leak proof and easy to carry.",
        icon: Droplets,
      },
      {
        title: "Premium Quality",
        desc: "Made with high grade stainless steel.",
        icon: Award,
      },
    ],
  },
  {
    id: 2,
    badge: "HOT DEAL",
    tag: "PRODUCT SPOTLIGHT ✨",
    title: "Wireless ANC Headphones",
    subtitle: "Immersive sound. Zero noise.",
    image: spotlightHeadphones,
    price: 1299,
    mrp: 2499,
    features: [
      {
        title: "Active Noise Cancellation",
        desc: "Block out background noise instantly.",
        icon: Headphones,
      },
      {
        title: "40 Hours Playtime",
        desc: "All-day battery life with fast charging.",
        icon: Zap,
      },
      {
        title: "1 Year Warranty",
        desc: "Official brand warranty & easy replacement.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: 3,
    badge: "LIMITED DROP",
    tag: "PRODUCT SPOTLIGHT ✨",
    title: "Smart Electric Ceramic Kettle",
    subtitle: "Quick boil. Elegant design.",
    image: spotlightKettle,
    price: 899,
    mrp: 1499,
    features: [
      {
        title: "Auto Shut-Off Safety",
        desc: "Built-in boil-dry protection sensor.",
        icon: Thermometer,
      },
      {
        title: "Rapid 1500W Boiling",
        desc: "Boils water in under 3 minutes.",
        icon: Zap,
      },
      {
        title: "Cool Touch Ceramic",
        desc: "Ergonomic heat-resistant ceramic body.",
        icon: Sparkles,
      },
    ],
  },
  {
    id: 4,
    badge: "TOP RATED",
    tag: "PRODUCT SPOTLIGHT ✨",
    title: "Granite Non-Stick Frying Pan",
    subtitle: "Healthy cooking. Zero stick.",
    image: spotlightPan,
    price: 449,
    mrp: 899,
    features: [
      {
        title: "5-Layer Granite Coating",
        desc: "100% PFOA free non-stick surface.",
        icon: ShieldCheck,
      },
      {
        title: "Even Heat Distribution",
        desc: "Heavy gauge aluminum induction base.",
        icon: Flame,
      },
      {
        title: "Easy Soft Sponge Clean",
        desc: "Wipe clean effortlessly in seconds.",
        icon: Award,
      },
    ],
  },
];

export default function ProductSpotlight({ onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (newIndex, dir = 1) => {
    setDirection(dir);
    setCurrentIndex(
      ((newIndex % spotlightProducts.length) + spotlightProducts.length) %
        spotlightProducts.length
    );
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      goTo(currentIndex + 1, 1);
    } else if (diff < -50) {
      goTo(currentIndex - 1, -1);
    }
  };

  const product = spotlightProducts[currentIndex];

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      {/* Spotlight Outer Wrapper with Arrow Controls */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex items-center justify-center"
      >
        {/* Left Arrow Button (Visible on sm/lg tablets & desktops) */}
        <motion.button
          aria-label="Previous spotlight product"
          onClick={() => goTo(currentIndex - 1, -1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -left-3 sm:-left-5 z-30 hidden sm:flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FFC530] text-[#121820] shadow-lg transition-transform hover:bg-[#F5A300]"
        >
          <ChevronLeft size={22} strokeWidth={2.8} />
        </motion.button>

        {/* Right Arrow Button (Visible on sm/lg tablets & desktops) */}
        <motion.button
          aria-label="Next spotlight product"
          onClick={() => goTo(currentIndex + 1, 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -right-3 sm:-right-5 z-30 hidden sm:flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FFC530] text-[#121820] shadow-lg transition-transform hover:bg-[#F5A300]"
        >
          <ChevronRight size={22} strokeWidth={2.8} />
        </motion.button>

        {/* Main Spotlight Card Container */}
        <div className="w-full overflow-hidden rounded-3xl border border-amber-200/70 bg-white p-5 shadow-xl sm:p-7 lg:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10"
            >
              {/* Left Column: Product Photo + Badge */}
              <div className="relative flex aspect-4/3 sm:aspect-4/3 lg:aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-[#F8F9FA] lg:col-span-6">
                {/* Badge (BEST SELLER / HOT DEAL) */}
                <span className="absolute left-4 top-4 z-10 rounded-md bg-[#E31E24] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm sm:left-5 sm:top-5 sm:text-xs">
                  {product.badge}
                </span>

                <motion.img
                  key={product.image}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: 1,
                  }}
                  transition={{
                    scale: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    opacity: { duration: 0.5 },
                  }}
                  whileHover={{ scale: 1.14 }}
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 cursor-pointer"
                />
              </div>

              {/* Right Column: Spotlight Info + Features + Price CTA */}
              <div className="flex flex-col justify-between py-2 lg:col-span-6 lg:py-4">
                <div>
                  {/* Tag Pill */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FFC530] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#121820] shadow-xs">
                    {product.tag}
                  </span>

                  {/* Title & Subtitle */}
                  <h2 className="font-display mt-3 text-2xl font-black tracking-tight text-[#121820] sm:text-3xl lg:text-4xl">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-gray-500 sm:text-base">
                    {product.subtitle}
                  </p>

                  {/* 3 Features Bullet Points */}
                  <div className="mt-6 flex flex-col gap-4 sm:mt-7">
                    {product.features.map(({ title, desc, icon: Icon }) => (
                      <div key={title} className="flex items-start gap-3.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFC530] text-[#121820] shadow-xs sm:h-10 sm:w-10">
                          <Icon size={18} strokeWidth={2.4} />
                        </div>
                        <div>
                          <h4 className="font-display text-xs font-black text-[#121820] sm:text-sm">
                            {title}
                          </h4>
                          <p className="mt-0.5 text-[11px] font-medium text-gray-500 sm:text-xs">
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Block & SHOP NOW CTA Button */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:mt-9">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Special Price
                    </span>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      <span className="font-display text-3xl font-black text-[#E31E24] sm:text-4xl">
                        ₹{product.price}
                      </span>
                      <span className="text-sm font-semibold text-gray-400 line-through sm:text-base">
                        ₹{product.mrp}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => onNavigate?.("catalog")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#121820] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-black sm:px-7 sm:py-3.5 sm:text-sm"
                  >
                    <ShoppingCart size={16} /> SHOP NOW
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFC530] text-[#121820] sm:h-7 sm:w-7">
                      <ArrowRight size={14} strokeWidth={3} />
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Dots Indicator */}
      <div className="mt-4 flex justify-center gap-2">
        {spotlightProducts.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to spotlight slide ${idx + 1}`}
            onClick={() => goTo(idx, idx > currentIndex ? 1 : -1)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-7 bg-[#FFC530]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
