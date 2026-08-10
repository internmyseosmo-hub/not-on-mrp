import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  User,
  Mail,
  Phone,
  Tag,
  Send,
  MapPin,
  ShieldCheck,
  IndianRupee,
  RotateCcw,
  Truck,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
  CheckCircle2,
  ChevronDown
} from "lucide-react";

import shoppingCartLoop from "../assets/shopping_cart_loop.webp";

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDF5] py-8 sm:py-12 lg:py-16 selection:bg-amber-400 selection:text-black overflow-hidden">
      
      {/* Background Halftone Dots Pattern */}
      <div className="absolute top-0 right-0 h-96 w-96 opacity-30 pointer-events-none bg-[radial-gradient(#EAB308_2px,transparent_2px)] [background-size:16px_16px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 opacity-20 pointer-events-none bg-[radial-gradient(#000000_2px,transparent_2px)] [background-size:20px_20px]" />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">

        {/* ================= TOP HERO HEADER SECTION ================= */}
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 mb-12">
          
          {/* Left Column: Heading & Speech Pill */}
          <div className="flex flex-col items-start lg:col-span-7">
            
            {/* Speech Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg mb-4"
            >
              <MessageSquare size={15} className="fill-amber-400 text-amber-400" />
              <span>WE'RE HERE TO HELP!</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <h1 className="font-display text-5xl font-black uppercase tracking-tight text-black sm:text-6xl lg:text-7xl">
                CONTACT <span className="text-[#E31E24]">US</span>
              </h1>
              {/* Yellow Underline Bar */}
              <div className="h-2 w-36 rounded-full bg-amber-400 mt-1" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 font-body text-base font-semibold text-gray-700 sm:text-lg max-w-xl leading-relaxed"
            >
              Have a question, suggestion or just want to say hello? <br className="hidden sm:inline" />
              We'd love to hear from you! ❤️
            </motion.p>
          </div>

          {/* Right Column: Hero Cart Graphic & Floating Bubbles */}
          <div className="relative flex items-center justify-center lg:col-span-5 py-4">
            
            {/* Flying Paper Plane Doodle */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-2 left-6 z-20 pointer-events-none hidden sm:block"
            >
              <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
                <path d="M5 25 Q 25 5, 55 10" stroke="#000" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M45 5 L58 10 L50 22 Z" fill="#FBBF24" stroke="#000" strokeWidth="2" />
              </svg>
            </motion.div>

            {/* Speech Bubble Icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-3 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-xl ring-4 ring-white"
            >
              <Mail size={22} strokeWidth={2.5} />
            </motion.div>

            {/* Phone Circle Icon */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-4 right-10 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-xl ring-4 ring-white"
            >
              <Phone size={20} />
            </motion.div>

            {/* Animated Shopping Cart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer"
            >
              <img
                src={shoppingCartLoop}
                alt="Shopping Cart Loop"
                className="h-56 w-auto object-contain sm:h-64 lg:h-72 drop-shadow-2xl"
              />
            </motion.div>

          </div>

        </div>


        {/* ================= MAIN FORM & GET IN TOUCH GRID ================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* LEFT: SEND US A MESSAGE CARD (Column 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100/90 lg:col-span-7 relative"
          >
            <div className="mb-6">
              <h3 className="font-display text-xl font-black uppercase text-brand-ink sm:text-2xl tracking-tight">
                SEND US A MESSAGE
              </h3>
              <div className="h-1.5 w-14 rounded-full bg-amber-400 mt-1.5" />
            </div>

            {/* Success Toast Banner */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="mb-6 rounded-2xl bg-emerald-50 border-2 border-emerald-400 p-4 flex items-center gap-3 text-emerald-800 text-sm font-bold shadow-md"
                >
                  <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                  <div>
                    Thank you! Your message has been sent successfully. <br />
                    We'll respond to you within 24 hours.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                
                {/* Your Name */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50/60 py-3.5 pl-11 pr-4 text-sm font-semibold text-brand-ink placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/20"
                  />
                </div>

                {/* Your Email */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50/60 py-3.5 pl-11 pr-4 text-sm font-semibold text-brand-ink placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/20"
                  />
                </div>

              </div>

              {/* Your Phone Number */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Your Phone Number"
                  className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50/60 py-3.5 pl-11 pr-4 text-sm font-semibold text-brand-ink placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/20"
                />
              </div>

              {/* Subject Dropdown */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <Tag size={18} />
                </div>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full appearance-none rounded-2xl border-2 border-gray-200 bg-gray-50/60 py-3.5 pl-11 pr-10 text-sm font-semibold text-brand-ink outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/20 cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Status & Tracking</option>
                  <option value="Product Support">Product Support & Quality</option>
                  <option value="Feedback / Suggestion">Feedback or Suggestion</option>
                  <option value="Partnership">Partnership / Corporate Query</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  <ChevronDown size={18} />
                </div>
              </div>

              {/* Your Message */}
              <div className="relative">
                <div className="pointer-events-none absolute top-4 left-0 flex items-start pl-4 text-gray-400">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50/60 py-3.5 pl-11 pr-4 text-sm font-semibold text-brand-ink placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/20 resize-none"
                />
              </div>

              {/* Submit Action & Arrow Doodle */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-amber-400 px-8 py-3.5 font-display text-sm font-black uppercase text-black shadow-lg shadow-amber-400/30 transition-all hover:bg-amber-500 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Send size={18} strokeWidth={2.5} />
                  <span>SEND MESSAGE</span>
                </button>

                {/* Hand Drawn Arrow Line Doodle */}
                <div className="hidden sm:block text-gray-400">
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                    <path d="M5 15 C 20 25, 40 5, 55 20 M 50 15 L 55 20 L 48 24" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

            </form>
          </motion.div>


          {/* RIGHT STACK: GET IN TOUCH & CONNECT WITH US (Column 5) */}
          <div className="space-y-6 lg:col-span-5">
            
            {/* GET IN TOUCH CARD (Yellow Card) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl bg-amber-400 p-6 sm:p-8 shadow-xl text-black"
            >
              {/* Headset Customer Support Line-Art Overlay */}
              <div className="pointer-events-none absolute right-2 bottom-4 opacity-15 text-black">
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  <path d="M18 12a6 6 0 0 1-6 6h-2" />
                </svg>
              </div>

              <div className="mb-6 relative z-10">
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-black sm:text-2xl">
                  GET IN TOUCH
                </h3>
                <div className="h-1.5 w-14 rounded-full bg-black mt-1.5" />
              </div>

              {/* Details List */}
              <div className="space-y-6 relative z-10">
                
                {/* 1. Call Us */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wide text-black/70">
                      Call Us
                    </span>
                    <a href="tel:+919876543210" className="font-display text-base sm:text-lg font-black text-black hover:underline">
                      +91 98765 43210
                    </a>
                    <p className="text-xs font-semibold text-black/75">
                      Mon – Sat | 9:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-black/15" />

                {/* 2. Email Us */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-md">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wide text-black/70">
                      Email Us
                    </span>
                    <a href="mailto:support@notonmrp.com" className="font-display text-base sm:text-lg font-black text-black hover:underline">
                      support@notonmrp.com
                    </a>
                    <p className="text-xs font-semibold text-black/75">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-black/15" />

                {/* 3. Our Location */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wide text-black/70">
                      Our Location
                    </span>
                    <h4 className="font-display text-base font-black text-black">
                      Not On MRP HQ
                    </h4>
                    <p className="text-xs font-semibold text-black/75">
                      Delhi, India – 110001
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* CONNECT WITH US CARD (White Card) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl bg-white p-6 shadow-xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              {/* Left Social Links */}
              <div>
                <h4 className="font-display text-xs font-black uppercase tracking-wider text-black mb-3">
                  CONNECT WITH US
                </h4>
                <div className="flex items-center gap-2.5">
                  <a href="#facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow transition-transform hover:scale-110 active:scale-95">
                    <Facebook size={18} />
                  </a>
                  <a href="#instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow transition-transform hover:scale-110 active:scale-95">
                    <Instagram size={18} />
                  </a>
                  <a href="#youtube" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] text-white shadow transition-transform hover:scale-110 active:scale-95">
                    <Youtube size={18} />
                  </a>
                  <a href="#twitter" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2] text-white shadow transition-transform hover:scale-110 active:scale-95">
                    <Twitter size={18} />
                  </a>
                  <a href="#whatsapp" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow transition-transform hover:scale-110 active:scale-95">
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block h-12 w-px bg-gray-200" />

              {/* Right Trust Badge */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-md">
                  <ShieldCheck size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <h5 className="font-display text-xs font-black uppercase text-black leading-tight">
                    100% CUSTOMER SATISFACTION
                  </h5>
                  <p className="text-[11px] font-semibold text-gray-600 leading-tight mt-0.5 max-w-[180px]">
                    Your trust means everything to us. We're always here for you!
                  </p>
                </div>
              </div>

            </motion.div>

          </div>

        </div>


        {/* ================= BOTTOM VALUE PROPS BAR ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-3xl bg-white p-6 shadow-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* 1. QUALITY ASSURED */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-amber-400 shadow-md">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-display text-xs font-black uppercase text-black tracking-tight">
                QUALITY ASSURED
              </h4>
              <p className="text-xs font-medium text-gray-600 leading-tight mt-0.5">
                We deliver only the best quality products.
              </p>
            </div>
          </div>

          {/* 2. LOWEST PRICES */}
          <div className="flex items-center gap-3.5 sm:border-l sm:border-gray-200 sm:pl-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-md">
              <IndianRupee size={22} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-display text-xs font-black uppercase text-black tracking-tight">
                LOWEST PRICES
              </h4>
              <p className="text-xs font-medium text-gray-600 leading-tight mt-0.5">
                Best quality at prices you'll love.
              </p>
            </div>
          </div>

          {/* 3. EASY RETURNS */}
          <div className="flex items-center gap-3.5 lg:border-l lg:border-gray-200 lg:pl-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-md">
              <RotateCcw size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-display text-xs font-black uppercase text-black tracking-tight">
                EASY RETURNS
              </h4>
              <p className="text-xs font-medium text-gray-600 leading-tight mt-0.5">
                Hassle-free returns within 7 days.
              </p>
            </div>
          </div>

          {/* 4. FAST DELIVERY */}
          <div className="flex items-center gap-3.5 lg:border-l lg:border-gray-200 lg:pl-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-md">
              <Truck size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-display text-xs font-black uppercase text-black tracking-tight">
                FAST DELIVERY
              </h4>
              <p className="text-xs font-medium text-gray-600 leading-tight mt-0.5">
                Quick delivery at your doorstep.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
