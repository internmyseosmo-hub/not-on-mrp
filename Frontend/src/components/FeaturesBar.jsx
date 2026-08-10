import { motion } from "framer-motion";
import { Percent, ShieldCheck, PackageCheck, MapPinned } from "lucide-react";

const features = [
  {
    title: "Lowest Prices",
    subtitle: "We guarantee the lowest prices",
    icon: Percent,
    bg: "bg-rose-100 group-hover:bg-rose-500 group-hover:text-white",
    fg: "text-brand-red",
  },
  {
    title: "Quality Assured",
    subtitle: "Best quality products for you",
    icon: ShieldCheck,
    bg: "bg-emerald-100 group-hover:bg-emerald-500 group-hover:text-white",
    fg: "text-emerald-600",
  },
  {
    title: "Easy Returns",
    subtitle: "Hassle free returns",
    icon: PackageCheck,
    bg: "bg-amber-100 group-hover:bg-amber-500 group-hover:text-white",
    fg: "text-brand-gold",
  },
  {
    title: "Store Locator",
    subtitle: "Find our nearest store",
    icon: MapPinned,
    bg: "bg-rose-100 group-hover:bg-rose-500 group-hover:text-white",
    fg: "text-brand-red",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturesBar() {
  return (
    <section className="mx-auto max-w-[1440px] px-3 py-6 sm:px-6 lg:px-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4 lg:gap-5"
      >
        {features.map(({ title, subtitle, icon: Icon, bg, fg }, idx) => {
          // Add custom gradients based on the fg color index
          const gradients = [
            "from-rose-50 to-rose-100 border-rose-200",
            "from-emerald-50 to-emerald-100 border-emerald-200",
            "from-amber-50 to-amber-100 border-amber-200",
            "from-indigo-50 to-indigo-100 border-indigo-200",
          ];
          const textColors = [
            "text-rose-600",
            "text-emerald-600",
            "text-amber-600",
            "text-indigo-600",
          ];

          return (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex cursor-pointer flex-col items-center gap-3 rounded-3xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-200 sm:flex-row sm:text-left sm:p-6"
            >
              <motion.span
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br border shadow-xs transition-colors duration-300 sm:h-14 sm:w-14 ${gradients[idx]} ${textColors[idx]}`}
              >
                <Icon size={24} strokeWidth={2} className="sm:size-6" />
              </motion.span>
              <div>
                <p className="font-display text-xs font-black text-brand-ink transition-colors group-hover:text-brand-red sm:text-sm md:text-base">
                  {title}
                </p>
                <p className="mt-0.5 text-[10px] font-medium leading-tight text-gray-500 transition-colors sm:text-xs">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
