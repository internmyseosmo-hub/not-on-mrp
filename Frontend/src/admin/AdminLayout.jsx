import React, { useState } from 'react';
import { 
  Home, FileText, Package, ChevronDown, MessageSquare, Users, Settings, LogOut, Menu, Tag, Sparkles, Store
} from 'lucide-react';

const AdminLayout = ({ children, onNavigate, activePage = 'dashboard', onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'about', label: 'About', icon: FileText },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'products', label: 'Our Products', icon: Package, hasDropdown: false },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
    { id: 'franchise', label: 'Franchise Enquiries', icon: Store },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 w-64 flex-shrink-0 flex flex-col transition-all duration-300 z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full absolute h-full'}`}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center bg-[#1E1E1E]">
           <img src="/NOTONMRP.png" alt="NOT ON MRP Logo" className="h-8 w-auto object-contain" />
        </div>
        
        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col justify-between">
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              if (item.hasDropdown) {
                const isParentActive = activePage === item.id;
                return (
                  <div key={item.id} className="space-y-1">
                    <button 
                      onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-all ${
                        isParentActive ? 'bg-[#FFD147] text-black' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className={isParentActive ? 'text-black' : 'text-gray-500'} />
                        {item.label}
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${isParentActive ? 'text-black' : 'text-gray-400'} ${
                          isProductsDropdownOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {isProductsDropdownOpen && (
                      <div className="pl-4 space-y-1 py-1">
                        {item.subItems.map((sub) => {
                          const isSubActive = activePage === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => onNavigate('admin', sub.id)}
                              className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                                isSubActive 
                                  ? 'bg-amber-100 text-black font-bold' 
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                            >
                              <sub.icon size={15} className={isSubActive ? 'text-black' : 'text-gray-500'} />
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activePage === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => onNavigate('admin', item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-all ${
                    isActive ? 'bg-[#FFD147] text-black' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isActive ? 'text-black' : 'text-gray-500'} />
                    {item.label}
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 space-y-1 pt-4 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50 transition-all">
               <Settings size={18} className="text-gray-500" />
               Settings
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50 transition-all">
               <LogOut size={18} className="text-gray-500" />
               Logout
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FA] relative">
        
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-[#FFD147] flex items-center justify-center text-black font-bold text-sm">
                <Users size={16} />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-gray-900 leading-none">Admin</p>
                <p className="text-[11px] font-medium text-gray-500 mt-0.5">Administrator</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 ml-1 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
