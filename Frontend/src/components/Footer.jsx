import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FBE5A1] pb-20 md:pb-12 text-brand-ink">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="flex items-center text-left">
              <img
                src="/notonmrp.png"
                alt="NOT ON MRP Logo"
                className="h-20 w-auto max-w-[250px] object-contain transition-transform hover:scale-105 sm:h-24 md:h-28"
              />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-brand-ink/80 sm:text-sm">
              Your one-stop destination for high-quality everyday essentials, kitchenware,
              stationery, and lifestyle items — always priced below MRP.
            </p>
            <div className="flex flex-col gap-2 text-xs font-semibold text-brand-ink">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-brand-red" />
                120+ Stores Nationwide
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-brand-red" />
                1800-123-NOTMRP
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-ink">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-xs font-medium text-brand-ink/80">
              <li>
                <Link
                  to="/about"
                  className="cursor-pointer transition-colors hover:text-brand-red"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="cursor-pointer transition-colors hover:text-brand-red font-semibold text-brand-red"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-brand-red">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="transition-colors hover:text-brand-red cursor-pointer text-left"
                >
                  Exclusive Offers
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="text-gray-600 hover:text-brand-red transition-colors cursor-pointer">
                  Franchise Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-ink">
              Popular Categories
            </h3>
            <ul className="mt-4 space-y-2 text-xs font-medium text-brand-ink/80">
              <li>
                <Link
                  to="/catalog/Home%20%26%20Living"
                  className="cursor-pointer transition-colors hover:text-brand-red block"
                >
                  Home & Living
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/Kitchen%20%26%20Dining"
                  className="cursor-pointer transition-colors hover:text-brand-red block"
                >
                  Kitchen & Dining
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/Cleaning%20Essentials"
                  className="cursor-pointer transition-colors hover:text-brand-red block"
                >
                  Cleaning Essentials
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/Stationery%20%26%20Office"
                  className="cursor-pointer transition-colors hover:text-brand-red block"
                >
                  Stationery & Office
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/Personal%20Care"
                  className="cursor-pointer transition-colors hover:text-brand-red block"
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/Toys%20%26%20Games"
                  className="cursor-pointer transition-colors hover:text-brand-red block"
                >
                  Toys & Games
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/Electricals"
                  className="cursor-pointer transition-colors hover:text-brand-red block"
                >
                  Electricals & Hardware
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-ink">
              Never Miss A Deal!
            </h3>
            <p className="mt-4 text-xs text-brand-ink/80">
              Subscribe to get exclusive discount codes & weekly price drops.
            </p>
            <div className="relative mt-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border border-amber-300 bg-white py-2.5 pl-4 pr-10 text-xs text-brand-ink placeholder:text-gray-400 focus:border-brand-red focus:outline-none"
              />
              <button
                aria-label="Subscribe"
                className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand-red text-white transition-transform active:scale-90"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 border-t border-amber-300/50 pt-6 text-center text-xs font-medium text-brand-ink/70 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Not On MRP Retail Ltd. All rights reserved.</p>
          <div className="mt-3 flex justify-center gap-4 sm:mt-0">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:underline">
              Terms of Service
            </Link>
            <a href="#" className="hover:underline">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
