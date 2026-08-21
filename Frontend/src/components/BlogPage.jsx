import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  Lightbulb,
  Star,
  BookOpen,
  Heart,
  PenTool
} from "lucide-react";
import { blogPosts } from "../data/blogPosts.js";

export default function BlogPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-16">
      
      {/* Header Section */}
      <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:px-10 lg:pt-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-6">
          <button onClick={() => onNavigate?.("home")} className="hover:text-brand-ink transition-colors">Home</button>
          <ChevronRight size={14} />
          <span className="text-brand-red font-bold">Blog</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          {/* Title Area */}
          <div className="relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-ink tracking-tight mb-3">
              Our <span className="text-brand-yellow">Blog</span>
            </h1>
            <p className="text-gray-600 font-medium md:text-lg">
              Tips, ideas & inspiration to make <span className="text-brand-red font-bold underline decoration-brand-red decoration-2 underline-offset-4">everyday living</span> better.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:max-w-md relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search blogs..."
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-6 pr-14 text-sm text-brand-ink shadow-sm focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/20 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-ink rounded-full p-2.5 transition-colors shadow-sm">
              <Search size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Blog Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredPosts.map((post, index) => {
              const Icon = post.icon;
              return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                {/* Image Placeholder area */}
                <div className={`relative w-full aspect-[4/3] mb-6 flex items-center justify-center`}>
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-2xl" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-2 left-2 bg-white rounded-xl py-1.5 px-3 shadow-sm text-center z-10 border border-gray-50 flex flex-col items-center">
                    <span className="block text-lg font-black text-brand-ink leading-none">{post.date}</span>
                    <span className="block text-[10px] font-bold text-gray-500 mt-0.5">{post.month}</span>
                  </div>
                  
                  {/* Floating Icon */}
                  <div className={`absolute -bottom-4 left-4 h-11 w-11 rounded-xl flex items-center justify-center shadow-sm ${post.iconBg} border-[3px] border-white z-10`}>
                    <Icon size={20} className={post.iconColor} strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex-1 flex flex-col pt-1">
                  <h3 className="font-bold text-brand-ink text-base md:text-lg leading-snug mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm mb-5 line-clamp-3 flex-1 font-medium">
                    {post.description}
                  </p>
                  
                  <button 
                    onClick={() => onNavigate?.("blog-post", post.id)}
                    className="flex items-center gap-2 text-brand-ink font-extrabold text-sm hover:text-brand-red transition-colors w-fit mt-auto cursor-pointer"
                  >
                    Read More
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full shadow-sm ${post.iconBg}`}>
                      <ChevronRightIcon size={14} className={post.iconColor} strokeWidth={3} />
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 mb-16 shadow-sm">
            <Search size={48} className="text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-brand-ink mb-2">No blogs found</h3>
            <p className="text-gray-500 font-medium">We couldn't find any articles matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-6 text-brand-red font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#fff7e6] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative overflow-hidden shadow-sm"
        >
          {/* Decorative dashes */}
          <div className="absolute top-4 left-1/2 text-brand-yellow opacity-30 tracking-widest hidden md:block font-black">
             - - - - -
          </div>
          
          <div className="flex-1 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-medium italic text-gray-600">Stay Updated!</h2>
              <span className="text-brand-yellow font-black">✨</span>
            </div>
            <h3 className="text-3xl md:text-[34px] font-black text-brand-ink mb-3 leading-tight">
              Never Miss a <span className="text-brand-yellow">Helpful Post</span>
            </h3>
            <p className="text-gray-700 font-medium max-w-md text-sm md:text-base">
              Explore our latest tips, guides and ideas to make your everyday life easier.
            </p>
          </div>
          
          <div className="flex-shrink-0 relative z-10 w-full md:w-auto flex flex-col sm:flex-row items-center gap-6 md:gap-12 lg:pr-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-white text-brand-ink font-bold px-7 py-3.5 rounded-full shadow-sm flex items-center justify-center gap-3 w-full sm:w-auto hover:shadow-md transition-shadow border border-gray-100 whitespace-nowrap cursor-pointer"
            >
              Explore All Blogs
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow text-brand-ink">
                <ChevronRightIcon size={16} strokeWidth={3} />
              </span>
            </motion.button>
            
            {/* Newsletter image from generation */}
            <div className="hidden md:block w-32 h-32 rounded-2xl overflow-hidden shadow-md transform rotate-3">
              <img src="/newsletter_img.png" alt="Newsletter" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Bottom Features Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
          {[
            { title: "Helpful Insights", desc: "Practical tips for everyday living", icon: Lightbulb, iconColor: "text-brand-yellow", bgColor: "bg-amber-100" },
            { title: "Expert Tips", desc: "Well researched & easy to follow", icon: Star, iconColor: "text-brand-red", bgColor: "bg-red-100" },
            { title: "Fresh Content", desc: "New blogs added regularly", icon: BookOpen, iconColor: "text-emerald-500", bgColor: "bg-emerald-100" },
            { title: "For You", desc: "Ideas that simplify your life", icon: Heart, iconColor: "text-purple-500", bgColor: "bg-purple-100" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${feature.bgColor} ${feature.iconColor}`}>
                <feature.icon size={24} strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-bold text-brand-ink text-sm">{feature.title}</h4>
                <p className="text-xs font-medium text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
