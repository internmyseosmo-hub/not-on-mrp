import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ChevronRight, ChevronUp, ShoppingCart, Filter, Package } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

function ProductCard({ product, onNavigate, onAddToCart }) {
  const [wished, setWished] = useState(false);
  const Icon = product.icon || Package;

  const handleCardClick = () => {
    onNavigate?.("product", product.id);
  };

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover cursor-pointer border border-gray-100"
    >
      <div
        onClick={handleCardClick}
        className={`relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br ${product.art || "from-amber-400 to-orange-500"} ${product.image ? 'p-0' : 'p-6 sm:p-8'}`}
      >
        {!product.image && (
          <motion.div
            whileHover={{ scale: 1.12, rotate: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
            className="flex h-full w-full items-center justify-center rounded-xl bg-white/25 text-white backdrop-blur-sm"
          >
            <Icon size={48} strokeWidth={1.4} className="sm:size-[56px]" />
          </motion.div>
        )}
        {product.image && (
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
            className="absolute inset-0 z-0 h-full w-full object-contain"
          />
        )}
      </div>

      <span className="absolute left-2.5 top-2.5 z-20 rounded-md bg-brand-red px-2 py-0.5 text-[10px] font-bold text-white shadow-sm sm:left-3 sm:top-3 sm:py-1 sm:text-[11px]">
        {product.discount}% OFF
      </span>

      <motion.button
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={(e) => {
          e.stopPropagation();
          setWished((w) => !w);
        }}
        whileTap={{ scale: 0.8 }}
        className="absolute right-2.5 top-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white sm:right-3 sm:top-3 sm:h-8 sm:w-8"
      >
        <motion.span animate={wished ? { scale: [1, 1.4, 1] } : { scale: 1 }} transition={{ duration: 0.35 }}>
          <Heart
            size={15}
            className={wished ? "fill-brand-red text-brand-red" : "text-brand-ink/50"}
          />
        </motion.span>
      </motion.button>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-1.5 sm:p-4">
        <h3
          onClick={handleCardClick}
          className="line-clamp-2 min-h-[2.2rem] text-xs font-semibold text-brand-ink hover:text-brand-red transition-colors sm:min-h-[2.5rem] sm:text-sm"
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1 text-[11px] text-brand-ink/60 sm:text-xs">
          <Star size={12} className="fill-amber-400 text-amber-400 sm:size-[13px]" />
          {product.rating ?? 4.5}
        </div>

        <div className="mt-0.5 flex items-baseline gap-1.5 sm:mt-1 sm:gap-2">
          <span className="font-display text-base font-bold text-brand-ink sm:text-lg">₹{product.price}</span>
          <span className="text-[10px] text-brand-ink/40 line-through sm:text-xs">₹{product.mrp}</span>
        </div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product, 1);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-brand-ink py-2 text-[11px] font-bold text-white shadow-sm transition-all duration-300 sm:text-xs hover:bg-gray-800"
        >
          <ShoppingCart size={13} /> ADD TO CART
        </motion.button>
      </div>
    </motion.div>
  );
}

const filterOptions = ["All", "Under ₹499", "Top Rated", "Big Discounts"];

export default function TopPicks({ onNavigate, onAddToCart }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setApiProducts(data.data);
        }
      })
      .catch((err) => console.error("Error fetching top picks:", err));
  }, []);

  const handleViewAll = () => {
    onNavigate?.("new-arrivals");
  };

  const allNewArrivalProducts = apiProducts;

  // Determine which products to display
  let displayedProducts = isExpanded ? allNewArrivalProducts : allNewArrivalProducts.slice(0, 6);

  if (isExpanded) {
    if (activeFilter === "Under ₹499") {
      displayedProducts = allNewArrivalProducts.filter((p) => p.price <= 499);
    } else if (activeFilter === "Top Rated") {
      displayedProducts = allNewArrivalProducts.filter((p) => (p.rating ?? 4.5) >= 4.5);
    } else if (activeFilter === "Big Discounts") {
      displayedProducts = allNewArrivalProducts.filter((p) => p.discount >= 25);
    }
  }

  return (
    <section id="top-picks" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      {/* Header Row */}
      <div className="mb-4 flex items-end justify-between sm:mb-6">
        <div>
          <h2 className="font-display text-xl font-black tracking-tight text-brand-ink xs:text-2xl sm:text-3xl">
            NEW ARRIVALS
          </h2>
          <span className="mt-1 block h-1 w-12 rounded-full bg-brand-gold sm:w-14" />
        </div>

        {/* View All Button */}
        <motion.button
          onClick={handleViewAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="flex cursor-pointer shrink-0 items-center gap-1.5 rounded-full bg-brand-yellow px-4 py-2 text-xs font-bold text-brand-ink shadow-sm transition-all hover:bg-amber-300 sm:px-5 sm:text-sm"
        >
          View All <ChevronRight size={16} />
        </motion.button>
      </div>

      {/* Product Cards Grid */}
      <motion.div
        key={isExpanded ? `expanded-${activeFilter}` : "collapsed"}
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6"
      >
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onNavigate={onNavigate} onAddToCart={onAddToCart} />
        ))}
      </motion.div>
    </section>
  );
}
