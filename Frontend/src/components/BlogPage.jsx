import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then(res => res.json())
      .then(data => { setBlogPosts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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
          <button onClick={() => navigate("/")} className="hover:text-brand-ink transition-colors">Home</button>
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
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                {/* Image area */}
                <div className="relative w-full aspect-[4/3] mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-amber-50 text-brand-yellow">
                      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  {/* Date Badge */}
                  <div className="absolute top-2 left-2 bg-white rounded-xl py-1.5 px-3 shadow-sm text-center z-10 border border-gray-50 flex flex-col items-center">
                    <span className="block text-lg font-black text-brand-ink leading-none">
                      {new Date(post.createdAt).getDate()}
                    </span>
                    <span className="block text-[10px] font-bold text-gray-500 mt-0.5">
                      {new Date(post.createdAt).toLocaleString('default', { month: 'short' }).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col pt-1">
                  <h3 className="font-bold text-brand-ink text-base md:text-lg leading-snug mb-1 group-hover:text-brand-red transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.subtitle && (
                    <p className="text-xs font-semibold text-brand-yellow-dark mb-2 line-clamp-1">{post.subtitle}</p>
                  )}
                  <p className="text-gray-500 text-xs md:text-sm mb-5 line-clamp-3 flex-1 font-medium">
                    {post.description}
                  </p>
                  
                  <button
                    onClick={() => navigate(`/blog/${post._id}`)}
                    className="flex items-center gap-2 text-brand-ink font-extrabold text-sm hover:text-brand-red transition-colors w-fit mt-auto cursor-pointer"
                  >
                    Read More
                    <span className="flex h-6 w-6 items-center justify-center rounded-full shadow-sm bg-brand-yellow">
                      <ChevronRightIcon size={14} className="text-brand-ink" strokeWidth={3} />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 mb-16 shadow-sm">
            <Search size={48} className="text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-brand-ink mb-2">
              {searchTerm ? `No blogs found for "${searchTerm}"` : "No blog posts yet"}
            </h3>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="mt-6 text-brand-red font-bold hover:underline">
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

