import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    rating: 5,
    quote: "Great products at unbeatable prices. Not On MRP is my go to store now!",
    author: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    rating: 5,
    quote: "Quality is top notch and delivery was super fast!",
    author: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    rating: 5,
    quote: "Love the variety! Everything I need under one roof.",
    author: "Neha Singh",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    rating: 5,
    quote: "The prices are genuinely below MRP. Amazing daily discounts too!",
    author: "Aman Gupta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    rating: 5,
    quote: "Super fast shipping and excellent customer support team!",
    author: "Ananya Roy",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
];

// Duplicate list for seamless infinite continuous running marquee loop
const infiniteReviews = [...reviews, ...reviews, ...reviews];

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 overflow-hidden">
      {/* Centered Title with Red Accents */}
      <div className="mb-8 text-center sm:mb-10">
        <div className="inline-flex items-center gap-3">
          {/* Left Red 3-Line Burst Accent */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E31E24"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="shrink-0 sm:h-6 sm:w-6"
          >
            <path d="M 9 12 L 2 9" />
            <path d="M 10 6 L 4 2" />
            <path d="M 10 18 L 4 22" />
          </svg>
          <h2 className="font-display text-xl font-black uppercase tracking-tight text-[#121820] xs:text-2xl sm:text-3xl">
            WHAT OUR CUSTOMERS SAY
          </h2>
          {/* Right Red 3-Line Burst Accent */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E31E24"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="shrink-0 sm:h-6 sm:w-6"
          >
            <path d="M 15 12 L 22 9" />
            <path d="M 14 6 L 20 2" />
            <path d="M 14 18 L 20 22" />
          </svg>
        </div>
      </div>

      {/* Infinite Continuous Marquee Wrapper */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full overflow-hidden py-2"
      >
        {/* Subtle Fade Edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />

        {/* Continuous Horizontal Running Motion */}
        <motion.div
          className="flex gap-5 sm:gap-6 w-max"
          animate={{ x: isHovered ? undefined : ["0%", "-33.333%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {infiniteReviews.map((review, idx) => (
            <motion.div
              key={`${review.id}-${idx}`}
              whileHover={{ y: -5, scale: 1.02 }}
              className="w-[260px] xs:w-[300px] sm:w-[360px] shrink-0 flex flex-col justify-between rounded-3xl border border-gray-100 bg-[#F8F9FA] p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <div>
                {/* 5 Stars Rating */}
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400 sm:size-[18px]"
                    />
                  ))}
                </div>

                {/* Quote / Review Text */}
                <p className="font-medium leading-relaxed text-[#121820] text-xs xs:text-sm sm:text-[15px]">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Info with Avatar */}
              <div className="mt-6 flex items-center gap-3 border-t border-gray-200/60 pt-4">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="h-9 w-9 rounded-full border border-gray-200 object-cover shadow-xs sm:h-10 sm:w-10"
                />
                <span className="font-display text-xs font-bold text-[#121820] sm:text-sm">
                  – {review.author}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
