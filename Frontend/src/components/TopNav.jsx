import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Products", path: "/catalog" },
  { label: "Deals & Offers", path: "/deals" },
  { label: "New Arrivals", path: "/new-arrivals" },
  { label: "Blog", path: "/blog" },
  { label: "Franchise Enquiries", path: "/franchise" },
  { label: "Contact Us", path: "/contact" },
];

export default function TopNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-brand-yellow-dark">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-2.5 sm:gap-6 sm:px-6 lg:px-10">

        <ul className="hidden items-center gap-4 text-xs font-semibold text-brand-ink lg:flex lg:text-sm xl:gap-6">
          {links.map(({ label, path }) => {
            // Special check for Home to only match exactly '/'
            const isActive = path === '/' ? currentPath === '/' : currentPath.startsWith(path);
            
            return (
              <li key={label} className="group relative py-1">
                <Link
                  to={path}
                  className={`flex items-center gap-1 transition-colors group-hover:text-white ${
                    isActive ? "text-white font-bold" : ""
                  }`}
                >
                  {label}
                </Link>
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-brand-ink transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            );
          })}
        </ul>

        <Link to="/deals" className="ml-auto">
          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-red-900/20 animate-pulseGlow sm:px-4 sm:text-sm cursor-pointer"
          >
            WOW DEALS
            <Zap size={14} className="fill-white" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
