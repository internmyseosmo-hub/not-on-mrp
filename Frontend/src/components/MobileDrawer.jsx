import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Truck,
  Heart,
  ShoppingCart,
  Zap,
  ChevronRight,
  Home,
  Info,
  Package,
  Sparkles,
  Phone,
  Grid,
  FileText,
} from "lucide-react";
import { categories } from "../data/categories.js";

const navLinks = [
  { label: "Home", icon: Home },
  { label: "Our Products", icon: Package },
  { label: "New Arrivals", icon: Sparkles },
  { label: "Deals & Offers", icon: Zap },
  { label: "About Us", icon: Info },
  { label: "Blog", icon: FileText },
  { label: "Contact Us", icon: Phone },
  { label: "Franchise Enquiries", icon: Grid },
];

function TagIcon(props) {
  return <Zap {...props} />;
}

export default function MobileDrawer({ isOpen, onClose, cartCount = 0, onNavigate }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Side Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 left-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-2xl xs:max-w-sm"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-brand-yellow px-5 py-4">
              <div className="flex items-center gap-2">
                <img
                  src="/NOTONMRP.png"
                  alt="Not On MRP"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-brand-ink transition-transform active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            {/* WOW Deals Highlight */}
            <div className="p-4">
              <button
                onClick={() => {
                  onClose();
                  onNavigate?.("deals");
                }}
                className="w-full flex items-center justify-between rounded-xl bg-brand-red p-3.5 text-white shadow-md animate-pulseGlow cursor-pointer"
              >
                <div className="flex items-center gap-2.5 font-display text-sm font-black">
                  <Zap size={18} className="fill-white" />
                  <span>WOW DEALS — UP TO 70% OFF</span>
                </div>
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-2">
              {/* Quick Navigation Links */}
              <div className="mb-6">
                <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Navigation
                </p>
                <ul className="mt-2 space-y-1">
                  {navLinks.map(({ label, icon: Icon }) => (
                    <li key={label}>
                      <button
                        onClick={() => {
                          onClose();
                          if (label === "Franchise Enquiries") return;
                          if (label === "Home") onNavigate?.("home");
                          if (label === "Our Products") onNavigate?.("catalog");
                          if (label === "Deals & Offers") onNavigate?.("deals");
                          if (label === "Contact Us") onNavigate?.("contact");
                          if (label === "New Arrivals") onNavigate?.("new-arrivals");
                          if (label === "About Us") onNavigate?.("about");
                          if (label === "Blog") onNavigate?.("blog");
                        }}
                        className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-amber-50 active:bg-amber-100 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100/60 text-brand-ink">
                            <Icon size={16} />
                          </span>
                          {label}
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Categories */}
              <div className="mb-6">
                <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Shop By Category
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {categories.slice(0, 8).map(({ name, icon: CatIcon, image }) => (
                    <button
                      key={name}
                      onClick={() => {
                        onClose();
                        onNavigate("catalog", name);
                      }}
                      className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/50 p-2.5 transition-colors hover:border-amber-200 hover:bg-white cursor-pointer text-left"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-yellow text-brand-ink">
                        {image ? (
                          <img src={image} alt={name} className="h-full w-full object-cover" />
                        ) : (
                          <CatIcon size={14} />
                        )}
                      </span>
                      <span className="truncate text-xs font-bold text-brand-ink">
                        {name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Utilities & Help */}
              <div className="mb-6">
                <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Services & Info
                </p>
                <div className="mt-2 space-y-1">
                  <a
                    href="#"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <MapPin size={16} className="text-brand-red" />
                    <span>Store Locator</span>
                  </a>
                  <a
                    href="#"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Truck size={16} className="text-brand-gold" />
                    <span>Track Order</span>
                  </a>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate("wishlist");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <Heart size={16} className="text-brand-red" />
                    <span>Wishlist</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Customer Helpline</span>
                <span className="font-bold text-brand-ink">1800-123-NOTMRP</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
