import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
} from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#FBE5A1] pb-20 md:pb-12 text-brand-ink">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-2">
            <button onClick={() => onNavigate?.("home")} className="flex items-center text-left">
              <img
                src="/NOTONMRP.png"
                alt="NOT ON MRP Logo"
                className="h-12 w-auto max-w-[160px] object-contain transition-transform hover:scale-105 sm:h-14 md:h-16"
              />
            </button>
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
                <button
                  onClick={() => onNavigate?.("about")}
                  className="cursor-pointer transition-colors hover:text-brand-red"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("contact")}
                  className="cursor-pointer transition-colors hover:text-brand-red font-semibold text-brand-red"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-red">
                  Store Locator
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("deals")}
                  className="transition-colors hover:text-brand-red cursor-pointer text-left"
                >
                  Exclusive Offers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.("franchise")} className="text-gray-400 hover:text-brand-yellow transition-colors cursor-pointer">
                  Franchise Enquiries
                </button>
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
                <button
                  onClick={() => onNavigate?.("catalog", "Home & Living")}
                  className="cursor-pointer transition-colors hover:text-brand-red text-left"
                >
                  Home & Living
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("catalog", "Kitchen & Dining")}
                  className="cursor-pointer transition-colors hover:text-brand-red text-left"
                >
                  Kitchen & Dining
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("catalog", "Cleaning Essentials")}
                  className="cursor-pointer transition-colors hover:text-brand-red text-left"
                >
                  Cleaning Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("catalog", "Stationery & Office")}
                  className="cursor-pointer transition-colors hover:text-brand-red text-left"
                >
                  Stationery & Office
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("catalog", "Personal Care")}
                  className="cursor-pointer transition-colors hover:text-brand-red text-left"
                >
                  Personal Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("catalog", "Toys & Games")}
                  className="cursor-pointer transition-colors hover:text-brand-red text-left"
                >
                  Toys & Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("catalog", "Electricals")}
                  className="cursor-pointer transition-colors hover:text-brand-red text-left"
                >
                  Electricals & Hardware
                </button>
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
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
