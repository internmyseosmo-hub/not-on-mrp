import { motion } from "framer-motion";
import { ChevronLeft, Calendar, Share2 } from "lucide-react";
import { blogPosts } from "../data/blogPosts.js";

export default function BlogPostPage({ postId, onNavigate }) {
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf9] px-4">
        <h1 className="text-3xl font-black text-brand-ink mb-4">Post Not Found</h1>
        <button 
          onClick={() => onNavigate?.("blog")}
          className="bg-brand-yellow text-brand-ink font-bold px-6 py-2 rounded-full hover:bg-brand-yellow-dark transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const Icon = post.icon;
  const paragraphs = post.content.split('\n\n');

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      
      {/* Top Navigation Bar */}
      <div className="sticky top-[108px] z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm md:top-[128px]">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={() => onNavigate?.("blog")} 
            className="flex items-center gap-2 text-brand-ink font-bold hover:text-brand-red transition-colors group text-sm"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>
          
          <button className="flex items-center gap-2 text-gray-500 hover:text-brand-ink transition-colors font-medium text-sm">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-[800px] px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${post.iconBg} ${post.iconColor}`}>
              <Icon size={14} strokeWidth={2.5} />
              Category
            </span>
            <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
              <Calendar size={14} />
              {post.date} {post.month}, 2026
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-brand-ink leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto"
          >
            {post.description}
          </motion.p>
        </header>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-md border border-gray-100"
        >
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </motion.div>

        {/* Article Body */}
        <div className="prose prose-lg prose-amber max-w-none prose-headings:font-black prose-headings:text-brand-ink prose-p:text-gray-700 prose-p:leading-relaxed">
          {paragraphs.map((para, idx) => (
            <motion.p 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-lg font-body"
            >
              {idx === 0 ? (
                // Drop cap for the first paragraph
                <span className="float-left text-6xl font-black text-brand-ink pr-3 pt-2 leading-none">
                  {para.charAt(0)}
                </span>
              ) : null}
              {idx === 0 ? para.substring(1) : para}
            </motion.p>
          ))}
        </div>

        {/* Newsletter Promo in Article */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-amber-50 rounded-2xl p-8 text-center border border-amber-100 shadow-sm relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-yellow rounded-full opacity-10"></div>
          
          <h3 className="text-2xl font-black text-brand-ink mb-3 relative z-10">Enjoyed this read?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto relative z-10">
            Subscribe to our newsletter for more helpful insights, expert tips, and fresh content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 rounded-full border border-gray-200 px-5 py-3 text-sm focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
            />
            <button className="bg-brand-ink text-white font-bold rounded-full px-6 py-3 hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
