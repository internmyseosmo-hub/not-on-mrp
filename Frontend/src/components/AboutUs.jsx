import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Truck,
  PackageCheck,
  Tag,
  Headphones,
  ArrowRight,
  X,
  ShoppingBag,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import storeInterior from "../assets/store_interior.png";

export default function AboutUs({ onNavigateToHome }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const features = [
    {
      title: "Huge Variety",
      desc: "10,000+ products across multiple categories.",
      icon: ShoppingBag,
    },
    {
      title: "Lowest Prices",
      desc: "Best quality products at prices you'll love.",
      icon: IndianRupee,
    },
    {
      title: "Quality Assured",
      desc: "Carefully selected products you can trust.",
      icon: ShieldCheck,
    },
    {
      title: "Easy Returns",
      desc: "Hassle-free returns within 7 days.",
      icon: PackageCheck,
    },
  ];

  const bottomHighlights = [
    {
      title: "Fast & Reliable Delivery",
      desc: "Pan India delivery at your doorstep.",
      icon: Truck,
    },
    {
      title: "7-Day Easy Returns",
      desc: "Not satisfied? Return easily within 7 days.",
      icon: PackageCheck,
    },
    {
      title: "Everyday Low Prices",
      desc: "We ensure the lowest prices every single day.",
      icon: Tag,
    },
    {
      title: "Customer Support",
      desc: "We're here to help you anytime, anywhere.",
      icon: Headphones,
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFFDF9] pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20">
      {/* 1. Top-Left Golden Dot Matrix Pattern */}
      <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 bg-[radial-gradient(#F5B82E_2.2px,transparent_2.2px)] [background-size:18px_18px] opacity-70" />

      {/* 2. Bottom-Right Golden Dot Matrix Pattern */}
      <div className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 bg-[radial-gradient(#F5B82E_2.2px,transparent_2.2px)] [background-size:18px_18px] opacity-70" />

      {/* 3. Top Floating Doodles */}
      <div className="pointer-events-none absolute left-[26%] top-6 opacity-35">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#D9A01C" strokeWidth="1.6">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>

      <div className="pointer-events-none absolute left-[44%] top-8 opacity-35">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D9A01C" strokeWidth="1.6">
          <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l7.59-7.59a1 1 0 0 0 0-1.41L12 2z" />
          <circle cx="7" cy="7" r="1.5" fill="#D9A01C" />
        </svg>
      </div>

      {/* 4. Top-Right Sparkles */}
      <div className="pointer-events-none absolute right-10 top-8 opacity-40">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D9A01C" strokeWidth="1.5">
          <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" opacity="0.3" />
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" fill="#F5B82E" opacity="0.2" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 relative z-10 pt-2">
        {/* Main Grid: Left Video Frame & Right Copy */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Store Video Player Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-6"
          >
            {/* Top-Left Yellow Rays Accent */}
            <div className="absolute -top-6 left-28 z-10 flex gap-1">
              <span className="h-4 w-1 rotate-[-25deg] rounded-full bg-[#FFC530]" />
              <span className="h-5 w-1 rotate-[0deg] rounded-full bg-[#FFC530]" />
              <span className="h-4 w-1 rotate-[25deg] rounded-full bg-[#FFC530]" />
            </div>

            {/* Tilted Tag Badge: LOW PRICES EVERYDAY! */}
            <div className="absolute -left-3 -top-5 z-20 flex items-center sm:-left-5 sm:-top-6">
              <div className="relative -mr-2.5 z-20 h-5 w-5 rounded-full border-2 border-[#121820] bg-white shadow-xs" />
              <div className="-rotate-12 rounded-2xl bg-[#E31E24] px-4 py-2 text-center text-[11px] font-black uppercase tracking-wider text-white shadow-xl sm:px-5 sm:py-2.5 sm:text-xs">
                LOW PRICES <br /> EVERYDAY!
              </div>
            </div>

            {/* Video Container Frame */}
            <div className="relative overflow-hidden rounded-[2.2rem] border-[3.5px] border-[#FFC530] bg-black shadow-xl">
              <video
                ref={videoRef}
                poster={storeInterior}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="aspect-[1.75/1] w-full object-cover max-h-[390px] sm:max-h-[420px]"
                playsInline
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
                Your browser does not support video.
              </video>

              {/* Center Play Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                  <motion.button
                    aria-label="Play Video"
                    onClick={togglePlay}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex h-18 w-18 items-center justify-center rounded-full bg-white text-[#FFC530] shadow-2xl transition-transform sm:h-22 sm:w-22 cursor-pointer"
                  >
                    <Play size={36} className="ml-1.5 fill-[#FFC530] text-[#FFC530]" />
                  </motion.button>
                </div>
              )}

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 bg-[#181818]/90 px-4 py-2.5 text-white backdrop-blur-xs">
                <button onClick={togglePlay} className="hover:text-[#FFC530] transition-colors cursor-pointer">
                  {isPlaying ? <Pause size={17} /> : <Play size={17} className="fill-white" />}
                </button>

                <span className="text-[11px] font-semibold text-gray-200">
                  0:00 / 1:32
                </span>

                <div className="relative flex h-1.5 flex-1 items-center overflow-hidden rounded-full bg-white/30">
                  <div
                    className={`h-full rounded-full bg-[#FFC530] transition-all duration-300 ${
                      isPlaying ? "w-full" : "w-1/4"
                    }`}
                  />
                  <div className="h-3 w-3 rounded-full bg-[#FFC530] shadow-xs" />
                </div>

                <div className="flex items-center gap-2.5 text-white">
                  <button onClick={toggleMute} className="hover:text-[#FFC530] cursor-pointer">
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                  <Settings size={15} className="cursor-pointer hover:text-[#FFC530]" />
                  <button onClick={() => setIsVideoModalOpen(true)} className="hover:text-[#FFC530] cursor-pointer">
                    <Maximize size={15} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-start pt-1 lg:col-span-6 lg:pt-2"
          >
            {/* Tag Pill: ABOUT US */}
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="rounded-xl bg-[#FFC530] px-5 py-2 text-sm font-black uppercase tracking-wider text-[#121820] shadow-xs sm:px-6 sm:py-2.5 sm:text-base">
                ABOUT US
              </span>
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E31E24"
                strokeWidth="3.8"
                strokeLinecap="round"
                className="shrink-0 sm:h-8 sm:w-8"
              >
                <path d="M 15 12 L 22 9" />
                <path d="M 14 6 L 20 2" />
                <path d="M 14 18 L 20 22" />
              </svg>
            </div>

            {/* Headline */}
            <h1 className="font-display text-2xl font-black leading-tight tracking-tight text-[#121820] sm:text-3xl lg:text-4xl">
              Bringing Quality, Affordability & Convenience{" "}
              <span className="text-[#E31E24]">Together.</span>
            </h1>

            <div className="mt-1.5 mb-5 h-1 w-32 rounded-full bg-[#FFC530] sm:w-40" />

            {/* Paragraph 1 */}
            <p className="text-xs leading-relaxed font-medium text-gray-700 sm:text-sm lg:text-[15px]">
              At Not On MRP, we believe that shopping should be simple, smart, and satisfying.
              That's why we bring you a wide selection of everyday essentials and lifestyle must-haves,
              carefully selected to match your needs and your budget.
            </p>

            {/* Paragraph 2 */}
            <p className="mt-4 text-xs leading-relaxed font-medium text-gray-700 sm:text-sm lg:text-[15px]">
              From home and kitchen to beauty, stationery, toys and more, we combine quality,
              functionality, and style at prices you'll love. Our mission is to make great
              products accessible to everyone, every day.
            </p>
          </motion.div>
        </div>

        {/* Feature Pill Cards Grid with Stagger & Hover Animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, duration: 0.5 },
            },
          }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {features.map(({ title, desc, icon: Icon }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -6, scale: 1.02, backgroundColor: "#FFFBF0" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex cursor-pointer items-center gap-3.5 rounded-2xl border border-amber-200/60 bg-white/90 p-4.5 shadow-2xs transition-all duration-300 hover:shadow-md"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.18 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFC530] text-[#121820] shadow-2xs transition-colors group-hover:bg-[#E31E24] group-hover:text-white sm:h-12 sm:w-12"
              >
                <Icon size={20} strokeWidth={2.4} />
              </motion.div>
              <div>
                <h4 className="font-display text-xs font-black text-[#121820] transition-colors group-hover:text-[#E31E24] sm:text-sm">
                  {title}
                </h4>
                <p className="mt-0.5 text-[10px] font-medium leading-tight text-gray-600 sm:text-[11px]">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Action CTA Buttons with Micro Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Watch Our Story Button */}
          <motion.button
            onClick={() => setIsVideoModalOpen(true)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#FFC530] px-8 py-3.5 text-xs font-black uppercase tracking-wider text-[#121820] shadow-md transition-all hover:bg-[#F5A300] hover:shadow-xl sm:text-sm"
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#121820] text-white"
            >
              <Play size={12} className="ml-0.5 fill-white" />
            </motion.span>
            Watch Our Story
          </motion.button>

          {/* Explore Products Button */}
          <motion.button
            onClick={onNavigateToHome}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full border-2 border-[#121820] bg-white px-8 py-3.5 text-xs font-black uppercase tracking-wider text-[#121820] shadow-xs transition-all hover:bg-[#121820] hover:text-white hover:shadow-xl sm:text-sm"
          >
            Explore Products
            <ArrowRight size={16} strokeWidth={2.8} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.button>
        </motion.div>

        {/* End of About Us: Highlights Banner Bar with Rich Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 overflow-hidden rounded-3xl border border-amber-200/80 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="grid grid-cols-1 gap-6 divide-y divide-dashed divide-amber-200/80 sm:grid-cols-2 lg:grid-cols-4 sm:divide-y-0 sm:gap-4 lg:divide-x">
            {bottomHighlights.map(({ title, desc, icon: Icon }, idx) => (
              <motion.div
                key={title}
                whileHover={{ y: -3, backgroundColor: "#FFFBF0" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-colors duration-300 ${
                  idx !== 0 ? "lg:pl-6" : ""
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.18 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-200/70 bg-[#FFF8E7] text-[#121820] shadow-2xs transition-colors group-hover:bg-[#FFC530] sm:h-13 sm:w-13"
                >
                  <Icon size={24} strokeWidth={2.2} className="text-[#121820]" />
                </motion.div>
                <div>
                  <h4 className="font-display text-xs font-black text-[#121820] transition-colors group-hover:text-[#E31E24] sm:text-sm">
                    {title}
                  </h4>
                  <p className="mt-0.5 text-[10px] font-medium leading-tight text-gray-500 sm:text-[11px]">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-2xl"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
              >
                <X size={20} />
              </button>

              <div className="aspect-video w-full bg-black">
                <video
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
