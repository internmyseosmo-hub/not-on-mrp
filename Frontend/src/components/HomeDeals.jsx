import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ChevronRight, Copy } from "lucide-react";

import dealsStorageCrates from "../assets/deals_storage_crates.png";
import dealsAlarmClock from "../assets/deals_alarm_clock.png";
import dealsShoppingBag from "../assets/deals_shopping_bag.png";

export default function HomeDeals({ onNavigate }) {
  // Live Flash Sale Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 10,
  });

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

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    alert(`Coupon Code ${code} Copied to Clipboard!`);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 bg-[#FCFAF6]">

      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">

        {/* Left Side: Title & Subtitle */}
        <div className="flex items-start gap-3">
          {/* Custom Yellow Tag Icon */}
          <div className="flex-shrink-0 relative -mt-3 -ml-2">
            <svg width="68" height="68" viewBox="-10 -15 84 84" className="text-amber-500 fill-current drop-shadow-sm">
              <g transform="rotate(-35 32 32)">
                {/* String */}
                <path d="M32 15 C 32 0, 48 -4, 42 12" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" fill="none" />

                {/* Tag Body */}
                <path d="M32 8 L46 22 V46 A4 4 0 0 1 42 50 H22 A4 4 0 0 1 18 46 V22 Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />

                {/* Hole */}
                <circle cx="32" cy="20" r="3.5" fill="white" stroke="#1E1E1E" strokeWidth="2.5" />

                {/* Percent % */}
                <circle cx="26" cy="31" r="3.5" fill="white" />
                <circle cx="38" cy="41" r="3.5" fill="white" />
                <line x1="40" y1="28" x2="24" y2="44" stroke="white" strokeWidth="3.5" strokeLinecap="round" />

                {/* Sparks */}
                <path d="M22 0 L16 -8 M12 10 L4 6 M10 24 L2 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-black tracking-tight">
              Deals & <span className="text-amber-500 drop-shadow-sm">Offers</span>
            </h2>
            <p className="text-gray-900 mt-1 sm:text-lg font-bold">
              Save more on your <span className="text-[#E31E24] font-black">everyday</span> essentials!
            </p>
            {/* Decorative lines */}
            <div className="flex items-center gap-1 mt-3">
              <div className="h-1.5 w-10 bg-amber-500 rounded-full"></div>
              <div className="h-1.5 w-6 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: View More Button */}
        <div className="relative">
          <button
            onClick={() => onNavigate?.("deals")}
            className="group flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-gray-900 transition-colors active:scale-95 cursor-pointer"
          >
            <span>View More Deals</span>
            <div className="bg-amber-500 text-brand-ink rounded-full p-1 transition-transform group-hover:translate-x-1">
              <ChevronRight size={16} strokeWidth={3} />
            </div>
          </button>
        </div>
      </div>


      {/* ================= CARDS SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

        {/* CARD 1: DEAL OF THE DAY */}
        <motion.div
          whileHover={{ y: -5 }}
          className="relative bg-[#FFF9E6] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm border border-amber-100 cursor-pointer"
          onClick={() => onNavigate?.("deals")}
        >
          {/* Top badges */}
          <div className="flex items-start justify-between z-10 relative">
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="bg-[#FFE082] text-amber-900 text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wider origin-left"
            >
              DEAL OF THE DAY
            </motion.span>
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center w-14 h-14 bg-black rounded-full text-white text-[8px] font-black uppercase text-center leading-tight ring-2 ring-amber-500 shadow-lg transform rotate-12 origin-center"
            >
              <span>LIMITED</span>
              <span className="text-amber-500">TIME</span>
              <span>OFFER!</span>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end mt-4 relative z-10">
            {/* Text Content */}
            <div className="flex-1">
              <p className="text-xs font-black text-brand-ink uppercase tracking-wide">UP TO</p>
              <h3 className="font-display text-[3.5rem] leading-[0.85] font-black text-brand-ink -ml-1">
                60%
              </h3>
              <h3 className="font-display text-[2.5rem] leading-none font-black text-[#E31E24]">
                OFF
              </h3>
              <p className="text-xs font-bold text-gray-700 mt-2">On Bestsellers</p>

              <button className="group mt-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-gray-900 transition-colors">
                Shop Now
                <div className="bg-brand-yellow text-brand-ink rounded-full p-0.5 transition-transform group-hover:translate-x-1">
                  <ChevronRight size={14} strokeWidth={3} />
                </div>
              </button>
            </div>

            {/* Image area */}
            <div className="w-full md:w-3/5 mt-6 md:mt-0 relative flex justify-end items-end h-40 md:h-48 md:absolute md:right-0 md:bottom-6">
              <img
                src={dealsStorageCrates}
                alt="Storage Crates"
                className="object-contain h-full w-auto drop-shadow-xl"
              />
            </div>
          </div>
        </motion.div>


        {/* CARD 2: FLASH SALE */}
        <motion.div
          whileHover={{ y: -5 }}
          className="relative bg-[#FFF0F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm border border-red-100 cursor-pointer"
          onClick={() => onNavigate?.("deals")}
        >
          {/* Background Lightning bolt decoration */}
          <div className="absolute top-4 right-6 text-red-200/50 pointer-events-none">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
          </div>

          <div className="flex items-start z-10 relative">
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="bg-[#E31E24] text-white text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1 origin-left"
            >
              <Zap size={12} className="fill-white" /> FLASH SALE
            </motion.span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end mt-4 relative z-10">
            {/* Text Content */}
            <div className="flex-1">
              <p className="text-xs font-black text-brand-ink uppercase tracking-wide">UP TO</p>
              <h3 className="font-display text-[3.5rem] leading-[0.85] font-black text-[#E31E24] -ml-1">
                70%
              </h3>
              <h3 className="font-display text-[2.5rem] leading-none font-black text-brand-ink">
                OFF
              </h3>
              <p className="text-xs font-bold text-gray-700 mt-2">On Selected Items</p>
            </div>

            {/* Image area */}
            <div className="w-full md:w-3/5 mt-6 md:mt-0 relative flex justify-end items-center h-40 md:h-48 md:absolute md:right-2 md:-top-4">
              {/* Since we don't have the laundry basket, using dealsAlarmClock or deals_shopping_bag as placeholder */}
              <img
                src={dealsAlarmClock}
                alt="Flash Sale Items"
                className="object-contain h-32 w-auto drop-shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Timer Bar */}
          <div className="mt-8 bg-[#C21A20] rounded-full px-4 py-2 flex items-center justify-between text-white shadow-md z-10 relative border-b-4 border-[#9A151A]">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
              OFFER ENDS IN
            </span>
            <div className="flex items-center gap-1.5 font-mono font-black text-sm">
              <div className="bg-black text-white px-2 py-1 rounded flex flex-col items-center leading-none">
                <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[6px] text-red-500 font-sans tracking-widest mt-0.5">HRS</span>
              </div>
              <span className="text-black mb-2">:</span>
              <div className="bg-black text-white px-2 py-1 rounded flex flex-col items-center leading-none">
                <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[6px] text-red-500 font-sans tracking-widest mt-0.5">MINS</span>
              </div>
              <span className="text-black mb-2">:</span>
              <div className="bg-black text-white px-2 py-1 rounded flex flex-col items-center leading-none">
                <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[6px] text-red-500 font-sans tracking-widest mt-0.5">SECS</span>
              </div>
            </div>
          </div>
        </motion.div>


        {/* CARD 3: WEEKEND SPECIAL */}
        <motion.div
          whileHover={{ y: -5 }}
          className="relative bg-[#EAF6ED] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm border border-green-100 cursor-pointer"
          onClick={() => onNavigate?.("deals")}
        >
          <div className="flex items-start z-10 relative">
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
              className="bg-[#0B7D3F] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider origin-left"
            >
              WEEKEND SPECIAL
            </motion.span>
          </div>

          <div className="flex flex-col md:flex-row mt-4 relative z-10">
            {/* Text Content */}
            <div className="flex-1">
              <p className="text-xs font-black text-brand-ink uppercase tracking-wide">EXTRA</p>
              <h3 className="font-display text-[3.5rem] leading-[0.85] font-black text-[#0B7D3F] -ml-1">
                10%
              </h3>
              <h3 className="font-display text-[2.5rem] leading-none font-black text-brand-ink">
                OFF
              </h3>
              <p className="text-xs font-bold text-gray-700 mt-2">On Orders Above ₹999</p>

              <button
                onClick={(e) => handleCopyCode("SAVE10", e)}
                className="mt-4 inline-flex items-center gap-2 bg-white/60 border border-dashed border-[#0B7D3F] px-3 py-1.5 rounded-full text-xs font-black text-brand-ink hover:bg-white transition-colors"
              >
                USE CODE: SAVE10
                <Copy size={12} className="text-gray-500" />
              </button>

              <button className="group mt-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-gray-900 transition-colors cursor-pointer">
                Shop Now
                <div className="bg-[#0B7D3F] text-white rounded-full p-0.5 transition-transform group-hover:translate-x-1">
                  <ChevronRight size={14} strokeWidth={3} />
                </div>
              </button>
            </div>

            {/* Image area */}
            <div className="w-full md:w-3/5 mt-6 md:mt-0 relative flex justify-end items-end h-40 md:h-48 md:absolute md:-right-4 md:bottom-2">
              {/* Since we don't have the backpack, using dealsShoppingBag as placeholder */}
              <img
                src={dealsShoppingBag}
                alt="Weekend Special Items"
                className="object-contain h-full w-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
