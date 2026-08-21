import React, { useState } from 'react';
import { 
  Home as HomeIcon, LayoutTemplate, Layers, Star, Sparkles, Tag, Image as ImageIcon, MessageSquare, 
  Package, Grid, Award, ShoppingBag, Users, FileText, Briefcase, Mail, Settings, 
  Shield, Menu, ExternalLink, Bell, User, ChevronDown
} from 'lucide-react';

const AdminLayout = ({ children, onNavigate, activePage = 'home' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`bg-[#0F172A] text-slate-300 w-64 flex-shrink-0 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full absolute h-full z-20'}`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 bg-[#0B1120] border-b border-slate-800/50 relative">
           <div className="text-xl font-black text-white italic tracking-tighter flex items-center gap-1">
             <span className="text-red-500">NOT</span> ON <span className="text-yellow-400">MRP</span>
           </div>
        </div>
        
        <div className="px-6 py-4">
          <h2 className="text-xs font-bold text-slate-500 tracking-wider mb-4 uppercase">Admin Panel</h2>
          
          <nav className="space-y-1">
            <button onClick={() => onNavigate('admin')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === 'dashboard' ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
              <HomeIcon size={18} />
              Dashboard
            </button>
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
          {/* WEBSITE MANAGEMENT */}
          <div className="px-6 py-3">
            <h3 className="text-[10px] font-bold text-slate-500 tracking-widest mb-3 uppercase">Website Management</h3>
            <nav className="space-y-1">
              <button onClick={() => onNavigate('admin-home')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === 'home' ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
                <LayoutTemplate size={18} />
                Hero Section
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === 'categories' ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
                <Layers size={18} />
                Categories / Features
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === 'brands' ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
                <Award size={18} />
                Top Brands
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === 'new-arrivals' ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
                <Sparkles size={18} />
                New Arrivals
              </button>
              <button onClick={() => onNavigate('admin-deals')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === 'deals' ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
                <Tag size={18} />
                Deals & Offers
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === 'banners' ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
                <ImageIcon size={18} />
                Banners
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === 'testimonials' ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`}>
                <MessageSquare size={18} />
                Testimonials
              </button>
            </nav>
          </div>

          {/* PRODUCT MANAGEMENT */}
          <div className="px-6 py-3">
            <h3 className="text-[10px] font-bold text-slate-500 tracking-widest mb-3 uppercase">Product Management</h3>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Package size={18} />
                Products
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Grid size={18} />
                Categories
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Star size={18} />
                Brands
              </button>
            </nav>
          </div>

          {/* ORDERS & CUSTOMERS */}
          <div className="px-6 py-3">
            <h3 className="text-[10px] font-bold text-slate-500 tracking-widest mb-3 uppercase">Orders & Customers</h3>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <ShoppingBag size={18} />
                Orders
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Users size={18} />
                Customers
              </button>
            </nav>
          </div>

          {/* CONTENT MANAGEMENT */}
          <div className="px-6 py-3">
            <h3 className="text-[10px] font-bold text-slate-500 tracking-widest mb-3 uppercase">Content Management</h3>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <FileText size={18} />
                Blog
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Briefcase size={18} />
                Franchise Enquiries
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Mail size={18} />
                Contact Messages
              </button>
            </nav>
          </div>

          {/* SETTINGS */}
          <div className="px-6 py-3">
            <h3 className="text-[10px] font-bold text-slate-500 tracking-widest mb-3 uppercase">Settings</h3>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Settings size={18} />
                General Settings
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Search size={18} />
                SEO Settings
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Shield size={18} />
                Users & Roles
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10 flex-shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-yellow"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => onNavigate('home')}
              className="text-sm font-medium text-gray-600 hover:text-brand-ink flex items-center gap-2 hidden sm:flex"
            >
              View Website
              <ExternalLink size={16} />
            </button>
            
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  3
                </span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4 sm:pl-6 cursor-pointer">
              <div className="bg-slate-100 p-2 rounded-full text-slate-600">
                <User size={20} />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-gray-900 leading-tight">Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Page Content passed as children */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper Search Icon Component missing from import in layout
const Search = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default AdminLayout;
