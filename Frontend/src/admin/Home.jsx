import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Image as ImageIcon, GripVertical, Plus, ChevronDown } from 'lucide-react';

const AdminHome = ({ onNavigate }) => {
  // Form states
  const [badgeText, setBadgeText] = useState('EVERY');
  const [badgeColor, setBadgeColor] = useState('#FF1E1E');
  const [titleLine1, setTitleLine1] = useState('NEW ARRIVALS,');
  const [titleLine2, setTitleLine2] = useState('FRESH EVERY WEEK!');
  const [description, setDescription] = useState('Handpicked essentials, added weekly at Not On MRP!');
  const [bgColor, setBgColor] = useState('#FFC107');
  const [buttonText, setButtonText] = useState('SHOP NOW');
  const [buttonLink, setButtonLink] = useState('/shop');
  const [buttonBgColor, setButtonBgColor] = useState('#111111');
  const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF');
  
  const features = [
    { id: 1, title: 'FRESH DROPS', subtitle: 'New items every Friday', icon: <div className="w-4 h-4 text-center leading-none">📦</div> },
    { id: 2, title: 'TOP BRANDS', subtitle: '100% genuine products', icon: <div className="w-4 h-4 text-center leading-none">🛡️</div> },
    { id: 3, title: 'BEST VALUE', subtitle: 'Lower than MRP', icon: <div className="w-4 h-4 text-center leading-none">🏷️</div> },
  ];

  return (
    <AdminLayout onNavigate={onNavigate} activePage="home">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage - Hero / Slider Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your homepage hero section content and appearance</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          Save Changes
        </button>
      </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              
              {/* Left Column - Form */}
              <div className="xl:col-span-5 space-y-6">
                
                {/* Hero Content Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
                    <h3 className="text-sm font-bold text-gray-800">Hero Content</h3>
                  </div>
                  
                  <div className="p-4 sm:p-5 space-y-5">
                    {/* Badge */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Badge</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Badge Text</label>
                          <input 
                            type="text" 
                            value={badgeText}
                            onChange={(e) => setBadgeText(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Badge Style</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color" 
                              value={badgeColor}
                              onChange={(e) => setBadgeColor(e.target.value)}
                              className="h-9 w-10 p-1 bg-white border border-gray-300 rounded cursor-pointer"
                            />
                            <input 
                              type="text" 
                              value={badgeColor}
                              onChange={(e) => setBadgeColor(e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 uppercase"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Title</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Main Title (Line 1)</label>
                          <input 
                            type="text" 
                            value={titleLine1}
                            onChange={(e) => setTitleLine1(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Main Title (Line 2)</label>
                          <input 
                            type="text" 
                            value={titleLine2}
                            onChange={(e) => setTitleLine2(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Description</label>
                      <textarea 
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      ></textarea>
                    </div>

                    {/* Visuals */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Right Side Image / Visuals</h4>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Background Type</label>
                          <div className="relative">
                            <select className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
                              <option>Color</option>
                              <option>Image</option>
                              <option>Gradient</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Background Color</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color" 
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="h-9 w-10 p-1 bg-white border border-gray-300 rounded cursor-pointer"
                            />
                            <input 
                              type="text" 
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 uppercase"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Right Image</label>
                        <div className="flex items-start gap-4 mt-2">
                          <div className="h-16 w-24 bg-gray-100 rounded border border-gray-200 overflow-hidden flex items-center justify-center">
                            {/* Placeholder for uploaded image */}
                            <div className="text-[8px] text-gray-400 text-center px-2">Image Preview</div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors">
                                Change Image
                              </button>
                              <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 text-xs font-medium rounded hover:bg-red-50 transition-colors">
                                Remove
                              </button>
                            </div>
                            <span className="text-[10px] text-gray-500">Recommended size: 1920 x 800px</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Features (Below Text)</h4>
                      <div className="space-y-2">
                        {features.map((feature, index) => (
                          <div key={feature.id} className="flex items-center gap-3 p-2 border border-gray-200 rounded-md bg-white">
                            <span className="text-xs font-bold text-gray-400 w-4 text-center">{index + 1}.</span>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-gray-900">{feature.title}</div>
                              <div className="text-[10px] text-gray-500">{feature.subtitle}</div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 cursor-grab">
                              <GripVertical size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded hover:bg-gray-700 transition-colors">
                        <Plus size={14} />
                        Add Feature
                      </button>
                    </div>

                    {/* CTA Button */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">CTA Button</h4>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Button Text</label>
                          <input 
                            type="text" 
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Button Link</label>
                          <input 
                            type="text" 
                            value={buttonLink}
                            onChange={(e) => setButtonLink(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      
                      <label className="block text-xs text-gray-500 mb-1">Button Style</label>
                      <div className="grid grid-cols-3 gap-3">
                         <div>
                          <label className="block text-[10px] text-gray-400 mb-1">Background Color</label>
                          <div className="flex items-center gap-1.5 border border-gray-300 rounded-md px-2 py-1.5">
                            <input type="color" value={buttonBgColor} onChange={e=>setButtonBgColor(e.target.value)} className="w-4 h-4 rounded-sm border-0 p-0 cursor-pointer" />
                            <input type="text" value={buttonBgColor} onChange={e=>setButtonBgColor(e.target.value)} className="w-full text-xs outline-none uppercase" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 mb-1">Text Color</label>
                          <div className="flex items-center gap-1.5 border border-gray-300 rounded-md px-2 py-1.5">
                            <input type="color" value={buttonTextColor} onChange={e=>setButtonTextColor(e.target.value)} className="w-4 h-4 rounded-sm border-0 p-0 cursor-pointer" />
                            <input type="text" value={buttonTextColor} onChange={e=>setButtonTextColor(e.target.value)} className="w-full text-xs outline-none uppercase" />
                          </div>
                        </div>
                        <div>
                           <label className="block text-[10px] text-gray-400 mb-1">Icon</label>
                           <div className="relative">
                            <select className="w-full pl-2 pr-6 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                              <option>Arrow Right</option>
                              <option>Shopping Cart</option>
                              <option>None</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Right Column - Preview & Settings */}
              <div className="xl:col-span-7 space-y-6">
                
                {/* Live Preview Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
                    <h3 className="text-sm font-bold text-gray-800">Live Preview</h3>
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    {/* Simulated Hero Preview */}
                    <div className="relative w-full rounded-xl overflow-hidden bg-white border border-gray-100 flex shadow-sm min-h-[300px]">
                      {/* Left Content Area */}
                      <div className="w-1/2 p-6 sm:p-8 flex flex-col justify-center z-10">
                        {badgeText && (
                          <div className="mb-4">
                            <span 
                              className="inline-block px-3 py-1 text-[10px] font-bold text-white rounded-sm uppercase tracking-wider"
                              style={{ backgroundColor: badgeColor }}
                            >
                              {badgeText}
                            </span>
                          </div>
                        )}
                        
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                          {titleLine1} <br/>
                          <span style={{ color: badgeColor }}>{titleLine2}</span>
                        </h2>
                        
                        <p className="text-sm text-gray-600 mb-6 max-w-sm" dangerouslySetInnerHTML={{ __html: description.replace('Not On MRP!', '<span class="font-bold text-red-500">Not On MRP!</span>') }}></p>
                        
                        <div className="flex gap-4 sm:gap-6 mb-8">
                          {features.map(f => (
                            <div key={f.id} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                              <div className="w-8 h-8 rounded-full border border-yellow-400 text-yellow-500 flex items-center justify-center mb-2">
                                {f.icon}
                              </div>
                              <div className="text-[10px] font-bold text-gray-900 leading-tight">{f.title}</div>
                              <div className="text-[9px] text-gray-500 hidden sm:block">{f.subtitle}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div>
                          <button 
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-transform"
                            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                          >
                            {buttonText}
                            <div className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      {/* Right Visual Area */}
                      <div 
                        className="w-1/2 absolute top-0 bottom-0 right-0"
                        style={{ 
                          backgroundColor: bgColor,
                          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)'
                        }}
                      >
                         {/* Placeholder for people image in preview */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <ImageIcon size={64} className="text-black" />
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manage Slides */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center rounded-t-lg">
                    <h3 className="text-sm font-bold text-gray-800">Manage Hero Slides (If Multiple)</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Slider Autoplay</span>
                      <button className="w-8 h-4 bg-emerald-500 rounded-full relative transition-colors focus:outline-none">
                        <span className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex gap-4 overflow-x-auto">
                    {/* Active Slide Thumbnail */}
                    <div className="w-48 h-24 rounded border-2 border-blue-500 overflow-hidden relative flex-shrink-0 cursor-pointer">
                      <div className="absolute inset-0 bg-gray-100 flex">
                         <div className="w-1/2 p-2 flex flex-col justify-center">
                           <div className="w-8 h-2 bg-red-500 mb-1 rounded-sm"></div>
                           <div className="w-16 h-3 bg-gray-800 mb-0.5 rounded-sm"></div>
                           <div className="w-20 h-3 bg-gray-800 mb-1 rounded-sm"></div>
                           <div className="w-12 h-1 bg-gray-400 mb-2 rounded-sm"></div>
                           <div className="w-16 h-4 bg-black rounded-full"></div>
                         </div>
                         <div className="w-1/2 bg-yellow-400" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                      </div>
                    </div>
                    
                    {/* Add Slide Button */}
                    <button className="w-48 h-24 rounded border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors flex-shrink-0">
                      <Plus size={16} />
                      <span className="text-xs font-medium">Add New Slide</span>
                    </button>
                  </div>
                </div>

                {/* Display Settings */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
                    <h3 className="text-sm font-bold text-gray-800">Display Settings</h3>
                  </div>
                  <div className="p-4 sm:p-5 flex gap-12">
                    <div>
                      <span className="block text-xs text-gray-500 mb-2">Show on Homepage</span>
                      <button className="w-8 h-4 bg-emerald-500 rounded-full relative transition-colors focus:outline-none">
                        <span className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></span>
                      </button>
                    </div>
                    <div className="flex-1 max-w-xs">
                      <label className="block text-xs text-gray-500 mb-1">Display Order</label>
                      <input 
                        type="number" 
                        value="1" 
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                
                {/* Last Updated */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Last Updated</h3>
                  <div className="flex gap-16 border-t border-gray-100 pt-3">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Updated By</div>
                      <div className="text-sm text-gray-800">Admin</div>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Updated On</div>
                       <div className="text-sm text-gray-800">20 May 2025, 11:30 AM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </AdminLayout>
  );
};

export default AdminHome;
