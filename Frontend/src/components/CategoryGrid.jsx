import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  ChevronRight,
  Home,
  UtensilsCrossed,
  SprayCan,
  PenTool,
  Droplets,
  Gamepad2,
  Zap,
  Wrench,
  Car,
  Sprout,
  LayoutGrid,
} from "lucide-react";
import { categories } from "../data/categories.js";

const allCategoriesDetailed = [
  {
    name: "Home & Living",
    icon: Home,
    count: "450+ Items",
    subcategories: ["Storage Crates", "Decor & Lighting", "Bedding & Linen", "Curtains & Rugs"],
    color: "bg-[#FFF8E7] text-amber-800 border-amber-200/80",
  },
  {
    name: "Kitchen & Dining",
    icon: UtensilsCrossed,
    count: "620+ Items",
    subcategories: ["Cookware & Pans", "Water Bottles", "Tea & Coffee Mugs", "Storage Containers"],
    color: "bg-rose-50 text-rose-800 border-rose-200/80",
  },
  {
    name: "Cleaning Essentials",
    icon: SprayCan,
    count: "280+ Items",
    subcategories: ["Laundry Baskets", "Floor Cleaners", "Mops & Brooms", "Dishwashers"],
    color: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  },
  {
    name: "Stationery & Office",
    icon: PenTool,
    count: "310+ Items",
    subcategories: ["Pen Organizers", "Notebooks & Diaries", "Desk Accessories", "Files & Folders"],
    color: "bg-purple-50 text-purple-800 border-purple-200/80",
  },
  {
    name: "Personal Care",
    icon: Droplets,
    count: "390+ Items",
    subcategories: ["Skincare", "Haircare Essentials", "Bath & Body", "Grooming Kits"],
    color: "bg-sky-50 text-sky-800 border-sky-200/80",
  },
  {
    name: "Toys & Games",
    icon: Gamepad2,
    count: "240+ Items",
    subcategories: ["Board Games", "Educational Toys", "Action Figures", "Puzzles"],
    color: "bg-amber-50 text-amber-800 border-amber-200/80",
  },
  {
    name: "Electricals",
    icon: Zap,
    count: "190+ Items",
    subcategories: ["Extension Cords", "LED Desk Lamps", "Smart Plugs", "Chargers & Cables"],
    color: "bg-yellow-50 text-yellow-800 border-yellow-200/80",
  },
  {
    name: "Hardware & Tools",
    icon: Wrench,
    count: "150+ Items",
    subcategories: ["Toolkits", "Screwdriver Sets", "Measuring Tapes", "Adhesive Tapes"],
    color: "bg-gray-100 text-gray-800 border-gray-200/80",
  },
  {
    name: "Car & Bike",
    icon: Car,
    count: "170+ Items",
    subcategories: ["Car Wash Care", "Phone Mounts", "Helmets & Safety", "Seat Cushions"],
    color: "bg-indigo-50 text-indigo-800 border-indigo-200/80",
  },
  {
    name: "Garden & Outdoor",
    icon: Sprout,
    count: "210+ Items",
    subcategories: ["Planters & Pots", "Watering Cans", "Garden Tools", "Seeds & Soil"],
    color: "bg-green-50 text-green-800 border-green-200/80",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function CategoryGrid({ onNavigate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = allCategoriesDetailed.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.subcategories.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCategoryClick = (categoryName, isViewAll) => {
    if (isViewAll) {
      setIsModalOpen(true);
    } else {
      onNavigate?.("catalog", categoryName);
    }
  };

  return (
    <section className="mx-auto max-w-[1440px] px-3 py-4 sm:px-6 sm:py-6 lg:px-10">
      {/* Category Horizontal Strip */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="no-scrollbar flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-4 sm:gap-3 sm:pb-0 md:grid-cols-6 lg:grid-cols-11"
      >
        {categories.map(({ name, icon: Icon, image, isViewAll }) => (
          <motion.button
            key={name}
            onClick={() => handleCategoryClick(name, isViewAll)}
            variants={item}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group snap-start flex w-22 shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-blue-200 bg-blue-100 p-2.5 text-center shadow-xs transition-all hover:border-blue-300 hover:shadow-md sm:w-auto sm:p-3"
          >
            <motion.span
              whileHover={{ rotate: -8, scale: 1.08 }}
              className={`mb-2 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-sm transition-transform duration-300 sm:mb-2.5 sm:h-[76px] sm:w-[76px] ${
                isViewAll ? "bg-rose-50 text-brand-red" : "bg-brand-yellow text-brand-ink"
              }`}
            >
              {image ? (
                <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <Icon size={20} strokeWidth={2} className="sm:size-[22px]" />
              )}
            </motion.span>
            <span className="font-display text-[11px] font-black leading-tight text-brand-ink transition-colors group-hover:text-brand-red sm:text-xs">
              {name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* ALL CATEGORIES MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
                <div>
                  <h3 className="font-display text-xl font-black text-[#121820] sm:text-2xl">
                    Explore All Categories
                  </h3>
                  <p className="text-xs text-gray-500">
                    Browse all product categories and sub-collections below MRP
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Bar Inside Modal */}
              <div className="bg-gray-50 px-6 py-3.5 sm:px-8">
                <div className="relative flex items-center">
                  <Search size={18} className="absolute left-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search category or sub-collection..."
                    className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs text-gray-800 placeholder-gray-400 outline-hidden transition-all focus:border-[#121820] sm:text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 text-xs text-gray-400 hover:text-gray-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Category Grid List */}
              <div className="no-scrollbar overflow-y-auto p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {filteredCategories.map(({ name, icon: Icon, count, subcategories, color }) => (
                    <div
                      key={name}
                      onClick={() => {
                        setIsModalOpen(false);
                        onNavigate?.("catalog", name);
                      }}
                      className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 hover:shadow-md ${color}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-xs">
                            <Icon size={22} strokeWidth={2} />
                          </span>
                          <div>
                            <h4 className="font-display text-sm font-bold text-gray-900 sm:text-base">
                              {name}
                            </h4>
                            <span className="text-[11px] font-semibold text-gray-500">
                              {count}
                            </span>
                          </div>
                        </div>
                        <ChevronRight
                          size={18}
                          className="text-gray-400 transition-transform group-hover:translate-x-1"
                        />
                      </div>

                      {/* Subcategory Pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-black/5 pt-3">
                        {subcategories.map((sub) => (
                          <span
                            key={sub}
                            className="rounded-md bg-white/80 px-2.5 py-1 text-[11px] font-medium text-gray-700 shadow-2xs"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredCategories.length === 0 && (
                  <div className="py-12 text-center text-gray-500">
                    <p className="text-sm font-medium">No categories found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
