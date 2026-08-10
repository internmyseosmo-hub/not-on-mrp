import { motion } from "framer-motion";
import { Home, Search, Grid, Heart, ShoppingCart } from "lucide-react";

export default function MobileBottomNav({
  cartCount = 0,
  onOpenDrawer,
  onToggleSearch,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-3 py-2 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around">
        <a
          href="#"
          className="flex flex-col items-center gap-1 text-brand-ink transition-colors hover:text-brand-red active:scale-95"
        >
          <Home size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </a>

        <button
          onClick={onToggleSearch}
          className="flex flex-col items-center gap-1 text-brand-ink/70 transition-colors hover:text-brand-red active:scale-95"
        >
          <Search size={20} />
          <span className="text-[10px] font-bold">Search</span>
        </button>

        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center gap-1 text-brand-ink/70 transition-colors hover:text-brand-red active:scale-95"
        >
          <Grid size={20} />
          <span className="text-[10px] font-bold">Categories</span>
        </button>

        <a
          href="#"
          className="flex flex-col items-center gap-1 text-brand-ink/70 transition-colors hover:text-brand-red active:scale-95"
        >
          <Heart size={20} />
          <span className="text-[10px] font-bold">Wishlist</span>
        </a>

        <a
          href="#"
          className="relative flex flex-col items-center gap-1 text-brand-ink/70 transition-colors hover:text-brand-red active:scale-95"
        >
          <div className="relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[9px] font-bold text-white"
              >
                {cartCount}
              </motion.span>
            )}
          </div>
          <span className="text-[10px] font-bold">Cart</span>
        </a>
      </div>
    </div>
  );
}
