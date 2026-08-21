import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  ChevronRight,
  Download,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Clock,
  ShoppingCart,
  Store,
  Wallet,
  Building2,
  FileText,
  Lock,
  Layers,
  Monitor,
  Camera,
  Star,
  ShoppingBag,
  Target,
  DollarSign,
  Users,
  Phone,
  Lightbulb
} from "lucide-react";
import FeaturesBar from "./FeaturesBar.jsx";

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(val) {
          setCount(Math.round(val));
        }
      });
      return () => controls.stop();
    }
  }, [value, isInView]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function FranchisePage({ onNavigate }) {
  return (
    <div className="bg-[#fcfbf9] min-h-screen font-body text-brand-ink selection:bg-brand-yellow selection:text-brand-ink overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="w-full lg:w-[55%] z-10">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-6">
            <span className="hover:text-brand-ink cursor-pointer transition-colors">Home</span>
            <ChevronRight size={14} />
            <span className="text-brand-ink font-bold">Franchise</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="mb-6 mt-4">
              <h1 className="text-5xl md:text-7xl font-black text-brand-ink mb-4 md:mb-6 relative inline-flex items-center">
                Our <span className="text-brand-red ml-3 md:ml-4 relative">
                  Franchise
                </span>
              </h1>
              <div className="text-3xl md:text-5xl font-black text-brand-ink leading-tight">
                <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-3">
                  Become a 
                  <motion.span 
                    animate={{ y: [-4, 4, -4], rotate: [-4, 0, -4] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="inline-flex bg-brand-ink rounded-xl px-4 py-2 border-b-4 border-brand-yellow-dark shadow-md"
                  >
                    <span className="text-white font-black text-2xl md:text-4xl tracking-tighter">NOT ON <span className="text-brand-yellow">MRP</span></span>
                  </motion.span>
                </div>
                <div>Franchise Partner</div>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800 max-w-xl">
              Build your own retail business with India's <span className="text-brand-red">value retail leader.</span>
            </p>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { icon: ShoppingCart, title: "20,000+", sub: "SKUs", desc: "Wide range across multiple categories" },
              { icon: Wallet, title: "₹8.5 Lakhs", sub: "Starting Investment", desc: "Mini format store from 400 sq.ft." },
              { icon: TrendingUp, title: "40%", sub: "Avg. Gross Margin", desc: "Up to 75% on private label" },
              { icon: Clock, title: "18-24 Months", sub: "Payback Period", desc: "Expected payback on FOFO model" },
            ].map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="flex flex-col group cursor-default"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-brand-yellow w-12 h-12 rounded-full flex items-center justify-center mb-3 text-brand-ink shadow-sm transition-colors group-hover:bg-brand-yellow-dark"
                >
                  <metric.icon size={24} strokeWidth={2.5} />
                </motion.div>
                <h3 className="font-black text-lg md:text-xl leading-tight">{metric.title}</h3>
                <h4 className="font-bold text-xs md:text-sm text-brand-ink mb-2">{metric.sub}</h4>
                <p className="text-xs text-gray-500 font-medium leading-tight">{metric.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.('apply-franchise')} 
              className="bg-brand-yellow text-brand-ink font-bold px-8 py-4 rounded-full shadow-sm hover:shadow-md hover:bg-brand-yellow-dark transition-all flex items-center justify-center gap-2 whitespace-nowrap text-lg"
            >
              Apply for Franchise
              <ChevronRight size={20} strokeWidth={3} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-gray-200 text-brand-ink font-bold px-8 py-4 rounded-full shadow-sm hover:border-gray-300 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-lg"
            >
              Download Brochure
              <Download size={20} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[45%] relative mt-10 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white aspect-[4/5] lg:aspect-auto lg:h-[650px] w-full z-10"
          >
            <img src="/franchise_hero.png" alt="NOT ON MRP Store Front" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.div>

          {/* Decorative Seal */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-4 -bottom-8 md:right-[-40px] md:bottom-10 z-20"
          >
            <motion.div 
              initial={{ rotate: -180, scale: 0, opacity: 0 }}
              animate={{ rotate: 12, scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="bg-brand-red text-white w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center text-center shadow-xl border-4 border-white"
            >
              <span className="text-[10px] md:text-xs font-bold tracking-widest mb-1">INDIA'S</span>
              <span className="text-sm md:text-base font-black leading-tight mb-1">VALUE RETAIL</span>
              <span className="text-xl md:text-2xl font-black text-brand-yellow leading-tight tracking-tight drop-shadow-sm mb-2">FRANCHISE<br/>OPPORTUNITY</span>
              <div className="flex gap-1 text-brand-yellow">
                <Star size={12} className="fill-brand-yellow" />
                <Star size={14} className="fill-brand-yellow" />
                <Star size={12} className="fill-brand-yellow" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Franchise Models */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.2fr] gap-8 items-stretch">
          
          {/* Title Area */}
          <div className="flex flex-col justify-center pr-8 relative">
            <span className="text-brand-yellow-dark font-black tracking-widest text-sm uppercase mb-3">Choose Your Path</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-ink leading-[1.1] mb-6">
              Two Franchise Models,<br />
              One Great <span className="text-brand-red">Opportunity!</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Choose the model that suits your investment style – active or passive.
            </p>
            {/* Simple decorative SVG path to mimic the paper plane trail */}
            <svg className="absolute bottom-0 right-10 w-24 h-24 text-gray-300 hidden lg:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
              <path d="M10,90 Q30,60 50,80 T90,10" />
            </svg>
          </div>

          {/* FOFO Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-amber-50 rounded-3xl p-8 border border-brand-yellow shadow-sm flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow rounded-bl-full opacity-20 -z-0"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="bg-brand-yellow text-brand-ink font-black text-2xl px-4 py-1.5 rounded-xl">FOFO</div>
              <div className="bg-white p-2 rounded-full text-brand-ink shadow-sm border border-amber-100"><Store size={24} /></div>
            </div>
            <h3 className="text-xl font-black text-brand-ink mb-6 relative z-10">Franchise Owned & Operated</h3>
            
            <ul className="space-y-4 mb-8 flex-1 relative z-10">
              {[
                "You invest & manage the store",
                "Complete operational control",
                "Full training & SOP support",
                "Complete store setup included",
                "Expected payback: 18–24 months"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-brand-yellow rounded-full p-1 mt-0.5 text-brand-ink shrink-0">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="font-semibold text-gray-800 leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto relative z-10 flex flex-wrap gap-2 items-center">
              <span className="bg-brand-yellow px-3 py-2 text-xs font-bold rounded-md">Starting Investment</span>
              <span className="bg-brand-ink text-white px-4 py-2 text-sm font-black rounded-md tracking-wide">₹8.5 Lakhs Onwards</span>
            </div>
          </motion.div>

          {/* FOCO Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#f5f3fa] rounded-3xl p-8 border border-indigo-200 shadow-sm flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-bl-full opacity-10 -z-0"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="bg-indigo-600 text-white font-black text-2xl px-4 py-1.5 rounded-xl shadow-sm">FOCO</div>
              <div className="bg-white p-2 rounded-full text-indigo-600 shadow-sm border border-indigo-100"><Users size={24} /></div>
            </div>
            <h3 className="text-xl font-black text-brand-ink mb-6 relative z-10">Franchise Owned, Company Operated</h3>
            
            <ul className="space-y-4 mb-6 flex-1 relative z-10">
              {[
                "You own the outlet, we run the business",
                "Staffing, inventory & operations by company",
                "Minimum Guarantee:",
                "Zero operational hassle",
                "Ideal for passive investors"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-indigo-600 rounded-full p-1 mt-0.5 text-white shrink-0">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 leading-snug">{item}</span>
                    {i === 2 && (
                       <span className="mt-2 bg-indigo-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-md shadow-sm w-fit leading-tight">
                         1.5% Monthly ROI or ₹30/sq.ft Rent*
                         <span className="block text-[10px] font-medium text-indigo-200 mt-0.5">(Whichever is higher)</span>
                       </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* 3. Flexible Store Formats */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Table Container */}
          <div className="w-full lg:w-[65%] bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-10">
            <h3 className="text-2xl font-black text-brand-ink text-center mb-8">Flexible Store Formats, Flexible Investment</h3>
            
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[600px] text-center border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="p-4 text-left font-bold text-gray-400 align-bottom w-[15%]">Format</th>
                    {[
                      { name: "Mini", icon: Store },
                      { name: "Standard", icon: Building2 },
                      { name: "Premium", icon: Building2 },
                      { name: "Mega", icon: Store },
                      { name: "Flagship", icon: Star }
                    ].map((fmt, i) => (
                      <th key={i} className="p-4 font-black text-brand-ink">
                        <div className="flex flex-col items-center gap-2">
                          <fmt.icon size={28} className="text-brand-ink" strokeWidth={1.5} />
                          <span className="text-sm md:text-base">{fmt.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-left font-bold text-gray-500 text-sm">Area</td>
                    <td className="p-4 font-bold text-brand-ink">400 sq.ft.</td>
                    <td className="p-4 font-bold text-brand-ink">1,000 sq.ft.</td>
                    <td className="p-4 font-bold text-brand-ink">1,500 sq.ft.</td>
                    <td className="p-4 font-bold text-brand-ink">2,000 sq.ft.</td>
                    <td className="p-4 font-bold text-brand-ink">2,500 sq.ft.</td>
                  </tr>
                  <tr className="border-b-2 border-gray-100">
                    <td className="p-4 text-left font-bold text-gray-500 text-sm">Approx. Investment</td>
                    <td className="p-4 font-black text-brand-ink">₹8.5 Lakhs</td>
                    <td className="p-4 font-black text-brand-ink">₹20 Lakhs</td>
                    <td className="p-4 font-black text-brand-ink">₹30 Lakhs</td>
                    <td className="p-4 font-black text-brand-ink">₹40 Lakhs</td>
                    <td className="p-4 font-black text-brand-ink">₹50 Lakhs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Tags */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 bg-amber-50 rounded-2xl p-4 md:p-6 border border-brand-yellow/30">
              {[
                { label: "Franchise Fee", val: "₹1 Lakh", icon: DollarSign },
                { label: "Security Deposit", val: "Zero", icon: Target },
                { label: "Royalty", val: "Yes", icon: Target },
                { label: "Agreement", val: "3 Years", icon: FileText },
                { label: "Lock-in Period", val: "3 Years", icon: Lock },
              ].map((tag, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-brand-yellow flex items-center justify-center mb-2 text-brand-yellow-dark">
                    <tag.icon size={14} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase leading-none mb-1">{tag.label}</span>
                  <span className="text-xs sm:text-sm font-black text-brand-ink leading-none">{tag.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[35%] rounded-[32px] overflow-hidden shadow-sm border border-gray-100 relative">
            <img src="/franchise_interior.png" alt="Store Interior" className="w-full h-full object-cover absolute inset-0" />
            {/* Added relative positioned div to force aspect ratio matching table height */}
            <div className="relative pt-[100%] lg:pt-[120%] w-full pointer-events-none"></div>
          </div>

        </div>
      </section>

      {/* 4. Details 3-Column Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr_1.8fr] gap-6 items-stretch">
          
          {/* Box 1: What's Included */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-brand-ink mb-6">What's Included<br/>in Your Investment?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-y-6 gap-x-4">
               {[
                 { title: "Interior &\nFixtures", icon: Layers },
                 { title: "Racks &\nDisplays", icon: Target },
                 { title: "Billing\nSystem", icon: Monitor },
                 { title: "CCTV\nSecurity", icon: Camera },
                 { title: "Branding &\nSignage", icon: Star },
               ].map((item, i) => (
                 <div key={i} className="flex flex-col gap-2">
                   <div className="bg-[#fcfbf9] border border-gray-100 w-10 h-10 rounded-xl flex items-center justify-center text-brand-ink shadow-sm">
                     <item.icon size={18} strokeWidth={2} />
                   </div>
                   <span className="text-xs font-bold text-gray-700 whitespace-pre-line leading-tight">{item.title}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Box 2: Prime Locations */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-brand-ink mb-6">Prime Locations. <span className="text-brand-red">Maximum Footfall.</span></h3>
              <div className="space-y-5">
                {[
                  { title: "High Street & Market Areas", desc: "Maximum visibility and footfall" },
                  { title: "Residential Hubs & Malls", desc: "Captive audience, repeat shoppers" },
                  { title: "Near Metro, Colleges & Main Roads", desc: "High-traffic corridors with 25+ ft frontage" },
                ].map((loc, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <MapPin size={20} className="text-brand-red shrink-0 mt-0.5" strokeWidth={2.5} />
                    <div>
                      <h4 className="font-bold text-sm text-brand-ink">{loc.title}</h4>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{loc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-brand-ink text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 mt-6 shadow-md text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-1.5 border-r border-gray-600 pr-3 mr-1">
                <Target size={14} />
                <span>Minimum Frontage: <span className="font-black text-brand-yellow">20 Feet</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-brand-yellow" />
                <span>Parking Availability Preferred</span>
              </div>
            </div>
          </div>

          {/* Box 3: Support Journey */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm overflow-hidden">
            <h3 className="text-xl font-black text-brand-ink mb-8 text-center sm:text-left">Our Support Journey –<br/>From <span className="text-brand-red">Start to Success</span></h3>
            
            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-6 sm:gap-2 mt-4 sm:mt-10">
              {/* Connecting dashed line - desktop only */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ transformOrigin: "left" }}
                className="hidden sm:block absolute top-5 left-8 right-8 border-t-2 border-dashed border-gray-300 -z-0"
              ></motion.div>
              
              {[
                { num: "01", title: "Enquiry &\nSite Selection", desc: "Location scouting & feasibility" },
                { num: "02", title: "Store Design\n& Setup", desc: "Interiors, fixtures, branding & CCTV" },
                { num: "03", title: "Procurement\n& Stock", desc: "Initial inventory across all categories" },
                { num: "04", title: "Training &\nLaunch", desc: "SOPs, staff training & grand opening" },
                { num: "05", title: "Ongoing\nSupport", desc: "Marketing, tech & operations" },
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.3, duration: 0.5, type: "spring", bounce: 0.4 }}
                  className="flex flex-row sm:flex-col items-center sm:items-center sm:text-center w-full sm:w-1/5 relative z-10 gap-4 sm:gap-2"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-yellow rounded-full border-4 border-white shadow-sm flex items-center justify-center font-black text-brand-ink text-sm sm:text-base shrink-0">
                    {step.num}
                  </div>
                  <div className="flex-1 sm:flex-none flex flex-col items-start sm:items-center">
                    <h4 className="font-bold text-xs sm:text-[11px] lg:text-xs text-brand-ink leading-tight whitespace-pre-line sm:h-8 mb-1">{step.title}</h4>
                    <p className="text-[10px] lg:text-[11px] font-medium text-gray-500 leading-tight">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Bottom Dark CTA Section */}
      <section className="bg-brand-ink text-white px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.2fr] gap-0 rounded-[32px] overflow-hidden border border-gray-800">
          
          {/* Black Box 1 */}
          <div className="bg-[#0f1115] p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-1">THE MARKET IS READY.</h3>
            <h2 className="text-3xl font-black text-white mb-8">THE TIME IS NOW!</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-black text-brand-yellow mb-1">
                  <AnimatedNumber value={170} prefix="$" suffix="B" />
                </div>
                <div className="text-xs font-bold text-gray-300 mb-1">India Value-Retail Market</div>
                <div className="text-[10px] text-gray-500 leading-tight">Projected size by 2026 (from ~$111B in FY23)</div>
              </div>
              <div>
                <div className="text-3xl font-black text-brand-yellow mb-1">
                  <AnimatedNumber value={15} suffix="%" />
                </div>
                <div className="text-xs font-bold text-gray-300 mb-1">Value-Retail CAGR</div>
                <div className="text-[10px] text-gray-500 leading-tight">Outpacing overall Indian retail (~11-13% CAGR)</div>
              </div>
              <div className="col-span-2">
                <div className="text-3xl font-black text-brand-yellow mb-1">
                  <AnimatedNumber value={10} suffix="M+" />
                </div>
                <div className="text-xs font-bold text-gray-300 mb-1">New Organised-Retail Shoppers by 2030</div>
                <div className="text-[10px] text-gray-500 leading-tight">Tier 2 & 3 consumers transitioning to branded retail</div>
              </div>
            </div>
            
            <div className="mt-8 text-[9px] text-gray-600 leading-relaxed">
              Source: Wazir Advisors (via Indian Retailer, 2025), IBEF Retail Industry Report (2026)<br/>
              Figures are industry estimates, not company-specific projections.
            </div>
          </div>

          {/* Dark Grey Box 2 */}
          <div className="bg-[#1a1c23] p-8 md:p-10 border-t lg:border-t-0 border-gray-800">
            <h3 className="text-white font-black text-xl mb-8">IS <span className="text-brand-yellow">NOT ON MRP</span> RIGHT FOR YOU?</h3>
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              {[
                { icon: Lightbulb, title: "Entrepreneurial\nMindset", desc: "Hands-on operation or long-term investment outlook" },
                { icon: Target, title: "Financial\nReadiness", desc: "₹8.5 Lakhs - ₹50 Lakhs depending on store format" },
                { icon: Store, title: "Retail-Ready\nSpace", desc: "400 - 2,500 sq.ft. with strong footfall potential" },
                { icon: MapPin, title: "Local Market\nKnowledge", desc: "Understanding your neighbourhood and customers" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="text-brand-yellow mb-1"><item.icon size={24} strokeWidth={2} /></div>
                  <h4 className="text-sm font-bold text-white whitespace-pre-line leading-tight">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Yellow Box 3 */}
          <div className="bg-brand-yellow text-brand-ink p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4 z-10 relative">
              READY TO BUILD YOUR RETAIL BUSINESS?
            </h2>
            <p className="text-sm font-bold mb-8 z-10 relative max-w-[280px]">
              Join NOT ON MRP and bring smarter, value-driven retail to your city.
            </p>
            
            <div className="z-10 relative">
              <button onClick={() => onNavigate?.('apply-franchise')} className="bg-brand-ink text-white font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 mb-6 shadow-lg">
                Apply for Franchise
                <ChevronRight size={18} strokeWidth={3} />
              </button>
              
              <div className="flex items-center gap-3 font-black text-xl md:text-2xl mb-2">
                <Phone size={24} />
                +91-7669900247
              </div>
              <p className="text-xs font-semibold text-gray-700">Our team will connect with you shortly!</p>
            </div>
            
            {/* Bag illustration */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-90 w-48 h-48 md:w-56 md:h-56 z-0 mix-blend-multiply">
              <ShoppingBag size={200} strokeWidth={1} className="text-amber-500 opacity-20" />
            </div>
          </div>

        </div>
      </section>

      {/* Trust Footer - Uses the existing FeaturesBar logic essentially but specific to the image */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-8">
        <FeaturesBar />
      </div>

    </div>
  );
}
