import { motion } from "framer-motion";
import { Menu, ChevronDown, Zap } from "lucide-react";

const links = [
  { label: "Home", hasDropdown: false },
  { label: "About Us", hasDropdown: false },
  { label: "Our Products", hasDropdown: false },
  { label: "Deals & Offers", hasDropdown: false },
  { label: "New Arrivals", hasDropdown: false },
  { label: "Blog", hasDropdown: false },
  { label: "Franchise Enquiries", hasDropdown: false },
  { label: "Contact Us", hasDropdown: false },
];

export default function TopNav({ currentPage = "home", onNavigate }) {
  return (
    <div className="bg-brand-yellow-dark">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-2.5 sm:gap-6 sm:px-6 lg:px-10">

        <ul className="hidden items-center gap-4 text-xs font-semibold text-brand-ink lg:flex lg:text-sm xl:gap-6">
          {links.map(({ label, hasDropdown }) => (
            <li
              key={label}
              onClick={() => {
                if (label === "About Us") onNavigate?.("about");
                else if (label === "Home") onNavigate?.("home");
                else if (label === "New Arrivals") onNavigate?.("new-arrivals");
                else if (label === "Deals & Offers") onNavigate?.("deals");
                else if (label === "Contact Us") onNavigate?.("contact");
                else if (label === "Blog") onNavigate?.("blog");
                else if (label === "Franchise Enquiries") onNavigate?.("franchise");
                else if (label === "Our Products") {
                  onNavigate?.("catalog");
                }
              }}
              className="group relative cursor-pointer py-1"
            >
              <span
                className={`flex items-center gap-1 transition-colors group-hover:text-white ${
                  (label === "About Us" && currentPage === "about") ||
                  (label === "Home" && currentPage === "home") ||
                  (label === "Our Products" && currentPage === "catalog") ||
                  (label === "Deals & Offers" && currentPage === "deals") ||
                  (label === "Contact Us" && currentPage === "contact") ||
                  (label === "New Arrivals" && currentPage === "new-arrivals") ||
                  (label === "Blog" && currentPage === "blog") ||
                  (label === "Franchise Enquiries" && currentPage === "franchise")
                    ? "text-white font-bold"
                    : ""
                }`}
              >
                {label}
                {hasDropdown && (
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                )}
              </span>
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] bg-brand-ink transition-all duration-300 ${
                  (label === "About Us" && currentPage === "about") ||
                  (label === "Home" && currentPage === "home") ||
                  (label === "Deals & Offers" && currentPage === "deals") ||
                  (label === "Contact Us" && currentPage === "contact") ||
                  (label === "Our Products" && currentPage === "catalog") ||
                  (label === "Blog" && currentPage === "blog") ||
                  (label === "Franchise Enquiries" && currentPage === "franchise")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </li>
          ))}
        </ul>

        <motion.button
          onClick={() => onNavigate?.("deals")}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-red-900/20 animate-pulseGlow sm:px-4 sm:text-sm cursor-pointer"
        >
          WOW DEALS
          <Zap size={14} className="fill-white" />
        </motion.button>
      </div>
    </div>
  );
}
