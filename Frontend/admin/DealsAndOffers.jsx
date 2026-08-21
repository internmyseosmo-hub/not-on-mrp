import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Tag, Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

const DealsAndOffers = ({ onNavigate }) => {
  const [deals, setDeals] = useState([
    { id: 1, title: 'Summer Clearance Sale', discount: '50% OFF', code: 'SUMMER50', status: 'Active', validUntil: '2025-08-31' },
    { id: 2, title: 'First Order Discount', discount: 'Flat ₹500', code: 'WELCOME500', status: 'Active', validUntil: 'Never' },
    { id: 3, title: 'Diwali Special', discount: '20% OFF', code: 'DIWALI20', status: 'Inactive', validUntil: '2024-11-15' },
  ]);

  return (
    <AdminLayout onNavigate={onNavigate} activePage="deals">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals & Offers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage active discounts, coupons, and promotional banners</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm transition-colors">
          <Plus size={16} />
          Create New Deal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column - Active Deals List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Tag size={16} className="text-blue-500" />
                All Deals & Coupons
              </h3>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search deals..." 
                    className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
                  />
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button className="p-1.5 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                  <Filter size={14} />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Deal Title</th>
                    <th className="px-4 py-3">Discount</th>
                    <th className="px-4 py-3">Coupon Code</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {deals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{deal.title}</td>
                      <td className="px-4 py-3 text-emerald-600 font-bold">{deal.discount}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-xs font-mono rounded">
                          {deal.code}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          deal.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {deal.status}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-1">Valid till: {deal.validUntil}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                            <Edit2 size={14} />
                          </button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {deals.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No deals found. Create a new deal to get started.
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Quick Create / Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
             <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
              <h3 className="text-sm font-bold text-gray-800">Quick Create Coupon</h3>
            </div>
            
            <div className="p-4 sm:p-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Coupon Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. SAVE20"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono uppercase"
                  />
                  <button className="px-3 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded border border-gray-200 hover:bg-gray-200">
                    Generate
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Discount Type</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                    <option>Percentage (%)</option>
                    <option>Fixed Amount (₹)</option>
                    <option>Free Shipping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Discount Value</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 20"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Expiry Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <button className="w-full py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                Save Coupon
              </button>
            </div>
          </div>
          
          {/* Banner Settings Promo */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-sm border border-indigo-100 p-5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Tag size={64} />
             </div>
             <h3 className="text-sm font-bold text-indigo-900 mb-2 relative z-10">Manage Promotional Banners</h3>
             <p className="text-xs text-indigo-700/80 mb-4 relative z-10">Update site-wide top banners, popup offers, and category specific promotional images.</p>
             <button className="text-xs font-bold text-indigo-600 bg-white px-4 py-2 rounded shadow-sm hover:shadow relative z-10 flex items-center gap-1">
               Go to Banners <span aria-hidden="true">&rarr;</span>
             </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DealsAndOffers;
