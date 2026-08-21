import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Truck, Heart, ShoppingCart, Menu, User, LogOut, Settings } from "lucide-react";

const utilityIcons = [
  { label: "Store Locator", icon: MapPin },
  { label: "Track Order", icon: Truck },
  { label: "Wishlist", icon: Heart },
];

export default function Header({
  cartCount = 0,
  onOpenDrawer,
  isSearchOpen,
  setIsSearchOpen,
  onNavigateToHome,
  onNavigate,
  isLoggedIn = false,
  currentUser = null,
  onLogout,
}) {
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showMobileSearch = isSearchOpen !== undefined ? isSearchOpen : internalSearchOpen;
  const toggleMobileSearch = () => {
    if (setIsSearchOpen) {
      setIsSearchOpen(!showMobileSearch);
    } else {
      setInternalSearchOpen(!showMobileSearch);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const nav = onNavigate || onNavigateToHome;
    if (searchTerm.trim()) {
      nav?.("catalog", searchTerm.trim());
      if (setIsSearchOpen) setIsSearchOpen(false);
      setInternalSearchOpen(false);
    } else {
      nav?.("catalog", "All");
    }
  };

  const handleUtilityClick = (label) => {
    const nav = onNavigate || onNavigateToHome;
    if (label === "Store Locator") {
      nav?.("contact");
    } else if (label === "Track Order") {
      nav?.("track-order");
    } else if (label === "Wishlist") {
      nav?.("wishlist");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-xs">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-2 sm:gap-6 sm:px-6 lg:px-10">
        {/* Mobile Menu Hamburger Button */}
        <button
          onClick={onOpenDrawer}
          aria-label="Open menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-brand-ink transition-transform active:scale-95 lg:hidden"
        >
          <Menu size={22} strokeWidth={2} />
        </button>

        {/* Logo */}
        <button onClick={() => onNavigateToHome?.("home")} className="flex shrink-0 items-center cursor-pointer">
          <img
            src="/NOTONMRP.png"
            alt="NOT ON MRP - Everyday Essentials, Always Low Prices!"
            className="h-12 w-auto max-w-[160px] object-contain transition-transform hover:scale-105 xs:h-14 sm:h-18 md:h-20 md:max-w-none lg:h-24"
          />
        </button>

        {/* Desktop Search bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden flex-1 max-w-xl lg:max-w-2xl md:flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products, categories..."
            className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-2.5 pl-5 pr-14 text-sm text-brand-ink placeholder:text-gray-400 transition-all focus:border-brand-yellow focus:bg-white focus:shadow-md focus:outline-none"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Search"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow-dark text-brand-ink shadow-sm transition-colors hover:bg-brand-ink hover:text-brand-yellow cursor-pointer"
            >
              <Search size={16} strokeWidth={2.5} />
            </motion.button>
          </div>
        </form>

        {/* Utility icons */}
        <nav className="flex items-center gap-3 sm:gap-6 shrink-0">
          {/* Mobile Search Toggle Icon */}
          <button
            onClick={toggleMobileSearch}
            aria-label="Toggle mobile search"
            className="flex flex-col items-center gap-1 text-brand-ink/80 transition-colors hover:text-brand-red md:hidden"
          >
            <Search size={20} strokeWidth={2} />
            <span className="text-[10px] font-medium">Search</span>
          </button>

          {utilityIcons.map(({ label, icon: Icon }) => (
            <motion.button
              key={label}
              onClick={() => handleUtilityClick(label)}
              whileHover={{ y: -3 }}
              className="group hidden flex-col items-center gap-1 text-brand-ink/80 transition-colors hover:text-brand-red sm:flex cursor-pointer"
            >
              <Icon size={20} strokeWidth={1.8} className="transition-transform group-hover:scale-110" />
              <span className="text-[11px] font-medium">{label}</span>
            </motion.button>
          ))}

          <motion.button
            onClick={() => (onNavigate || onNavigateToHome)?.("cart")}
            whileHover={{ y: -3 }}
            className="group relative flex flex-col items-center gap-1 text-brand-ink/80 transition-colors hover:text-brand-red cursor-pointer"
          >
            <span className="relative">
              <ShoppingCart size={20} strokeWidth={1.8} className="transition-transform group-hover:scale-110" />
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[9px] font-bold text-white"
              >
                {cartCount}
              </motion.span>
            </span>
            <span className="text-[11px] font-medium">Cart</span>
          </motion.button>

          {/* User Account / Login */}
          {isLoggedIn && currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="group hidden sm:flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-brand-ink text-xs font-black shadow-sm border-2 border-transparent group-hover:border-brand-yellow-dark transition-all">
                  {currentUser.avatar || currentUser.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-[11px] font-medium text-brand-ink/80 max-w-[60px] truncate">
                  {currentUser.name?.split(" ")[0]}
                </span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-xs font-black text-brand-ink truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); (onNavigate || onNavigateToHome)?.("account"); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-brand-ink hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Settings size={14} className="text-gray-500" /> My Account
                    </button>
                    <button
                      onClick={() => { setUserMenuOpen(false); onLogout?.(); (onNavigate || onNavigateToHome)?.("home"); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer border-t border-gray-100"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              onClick={() => (onNavigate || onNavigateToHome)?.("login")}
              whileHover={{ y: -3 }}
              className="group hidden sm:flex flex-col items-center gap-1 text-brand-ink/80 transition-colors hover:text-brand-red cursor-pointer"
            >
              <User size={20} strokeWidth={1.8} className="transition-transform group-hover:scale-110" />
              <span className="text-[11px] font-medium">Login</span>
            </motion.button>
          )}
        </nav>
      </div>

      {/* Mobile Expandable Search Bar */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-gray-100 bg-amber-50/50 px-4 py-3 md:hidden"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products, categories..."
                className="w-full rounded-full border border-amber-300 bg-white py-2 pl-4 pr-10 text-sm text-brand-ink placeholder:text-gray-400 focus:border-brand-yellow focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search action"
                className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow text-brand-ink cursor-pointer"
              >
                <Search size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
