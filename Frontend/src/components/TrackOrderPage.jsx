import React, { useState } from 'react';
import { ChevronRight, Search, Navigation, Package, CheckCircle, Truck, MapPin, ChevronDown, Check, Clock, Info, Phone, Mail, MessageSquare } from 'lucide-react';

const TrackOrderPage = ({ onNavigate }) => {
  const [searchMethod, setSearchMethod] = useState('Order ID');
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [showResult, setShowResult] = useState(true); // Default true to show the design immediately

  const handleTrack = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setIsTracking(true);
    // Simulate API call
    setTimeout(() => {
      setIsTracking(false);
      setShowResult(true);
    }, 1000);
  };

  return (
    <div className="bg-orange-50/30 min-h-screen py-10 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-yellow-300 opacity-50">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor"><path d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20zm8 0a12 12 0 1024 0 12 12 0 00-24 0z"/></svg>
      </div>
      <div className="absolute top-20 right-20 text-yellow-400 opacity-80">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><polygon points="7.5,0 9.5,5 15,6 11,10 12,15 7.5,12 3,15 4,10 0,6 5.5,5"/></svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 mt-4 relative">
           <div className="flex justify-center items-center mb-2 gap-4">
               <h1 className="text-4xl md:text-5xl font-black text-[#111] uppercase tracking-tight">
                  Track <span className="text-brand-yellow">Your Order</span>
               </h1>
           </div>
           <p className="text-gray-600">
             Stay updated with your order status in real-time. We deliver happiness, <span className="text-red-500 font-bold">on time!</span>
           </p>
        </div>

        {/* Input Form Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
           <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Enter Your Order Details</h2>
           
           <form onSubmit={handleTrack} className="flex flex-col md:flex-row items-center gap-4">
              
              {/* Dropdown */}
              <div className="relative w-full md:w-64">
                <button 
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-brand-yellow" />
                    {searchMethod}
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    {['Order ID', 'Phone Number', 'Email ID'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => {
                          setSearchMethod(method);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
                      >
                        {method}
                        {searchMethod === method && <Check size={16} className="text-brand-yellow" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex-1 w-full relative">
                <input 
                  type="text" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={`Enter your ${searchMethod}`}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isTracking}
                className="w-full md:w-auto px-8 py-3 bg-[#111] hover:bg-black text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isTracking ? 'TRACKING...' : 'TRACK ORDER'}
                {!isTracking && <div className="w-5 h-5 rounded-full bg-brand-yellow flex items-center justify-center"><ChevronRight size={14} className="text-black" /></div>}
              </button>
           </form>
           <p className="text-xs text-gray-400 mt-3">
             You can find your Order ID in the order confirmation email or in your account.
           </p>
        </div>

        {/* Results Section */}
        {showResult && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Tracking Timeline Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Order ID: #BBC123456789</h2>
                    <p className="text-sm text-gray-500 mt-1">Placed on: 20 May 2025, 10:30 AM</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md text-xs font-bold border border-green-100">
                    <Truck size={14} />
                    IN TRANSIT
                  </div>
               </div>

               {/* Timeline */}
               <div className="relative py-8">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full hidden md:block"></div>
                  {/* Active Progress Line */}
                  <div className="absolute top-1/2 left-0 w-[50%] h-1 bg-brand-yellow -translate-y-1/2 rounded-full hidden md:block transition-all duration-1000"></div>

                  <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                     
                     {/* Step 1 */}
                     <div className="flex flex-col items-center flex-1 relative group">
                        {/* Mobile active line indicator */}
                        <div className="absolute left-6 top-8 bottom-[-2rem] w-1 bg-brand-yellow md:hidden"></div>

                        <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center shadow-md mb-3 z-10 ring-4 ring-white transition-transform group-hover:scale-110">
                           <Clock size={20} className="text-black" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 text-center uppercase">Order Placed</h4>
                        <p className="text-[10px] text-gray-500 text-center mt-1">20 May 2025, 10:30 AM</p>
                     </div>

                     {/* Step 2 */}
                     <div className="flex flex-col items-center flex-1 relative group">
                        {/* Mobile active line indicator */}
                        <div className="absolute left-6 top-8 bottom-[-2rem] w-1 bg-brand-yellow md:hidden"></div>

                        <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center shadow-md mb-3 z-10 ring-4 ring-white transition-transform group-hover:scale-110">
                           <Package size={20} className="text-black" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 text-center uppercase">Order Confirmed</h4>
                        <p className="text-[10px] text-gray-500 text-center mt-1">20 May 2025, 11:15 AM</p>
                     </div>

                     {/* Step 3 */}
                     <div className="flex flex-col items-center flex-1 relative group">
                        {/* Mobile inactive line indicator */}
                        <div className="absolute left-6 top-8 bottom-[-2rem] w-1 bg-gray-200 md:hidden"></div>

                        <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center shadow-md mb-3 z-10 ring-4 ring-white transition-transform group-hover:scale-110">
                           <Truck size={20} className="text-black" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 text-center uppercase">Dispatched</h4>
                        <p className="text-[10px] text-gray-500 text-center mt-1">21 May 2025, 09:45 AM</p>
                     </div>

                     {/* Step 4 */}
                     <div className="flex flex-col items-center flex-1 relative group opacity-50">
                        {/* Mobile inactive line indicator */}
                        <div className="absolute left-6 top-8 bottom-[-2rem] w-1 bg-gray-200 md:hidden"></div>

                        <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-3 z-10 ring-4 ring-white transition-transform group-hover:scale-110">
                           <MapPin size={20} className="text-gray-400" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-500 text-center uppercase">Out For Delivery</h4>
                        <p className="text-[10px] text-gray-400 text-center mt-1">Expected: 22 May 2025</p>
                     </div>

                     {/* Step 5 */}
                     <div className="flex flex-col items-center flex-1 relative group opacity-50">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-3 z-10 ring-4 ring-white transition-transform group-hover:scale-110">
                           <CheckCircle size={20} className="text-gray-400" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-500 text-center uppercase">Delivered</h4>
                        <p className="text-[10px] text-gray-400 text-center mt-1">Expected: 22 May 2025</p>
                     </div>

                  </div>
               </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
               
               {/* Order Summary */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Order Summary</h3>
                  
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                     <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                       <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100&h=100" alt="Product" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">Daily Essentials Basket</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Qty: 1 • ₹599.00</p>
                     </div>
                     <div className="text-sm font-bold text-gray-900">₹599.00</div>
                  </div>

                  <div className="space-y-3 mt-auto">
                     <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">₹599.00</span>
                     </div>
                     <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping Charges</span>
                        <span className="font-bold text-green-600">FREE</span>
                     </div>
                     <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-100">
                        <span>Total Amount</span>
                        <span>₹599.00</span>
                     </div>
                  </div>
               </div>

               {/* Delivery Address */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Delivery Address</h3>
                  
                  <div className="flex gap-3">
                     <div className="mt-0.5">
                       <MapPin size={18} className="text-gray-400" />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">Rahul Sharma</h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          123, Green Park, Near Metro Station,<br />
                          Malviya Nagar, New Delhi - 110017
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                           <Phone size={14} className="text-gray-400" />
                           +91 98765 43210
                        </p>
                     </div>
                  </div>
               </div>

               {/* Order Details */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Order Details</h3>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-sm text-gray-500">Payment Method</span>
                        <span className="text-sm font-medium text-gray-900">UPI</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-sm text-gray-500">Payment Status</span>
                        <span className="text-sm font-bold text-green-600">Paid</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-sm text-gray-500">Order Type</span>
                        <span className="text-sm font-medium text-gray-900">Standard Delivery</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Estimated Delivery</span>
                        <span className="text-sm font-medium text-gray-900">22 May 2025</span>
                     </div>
                  </div>
               </div>

            </div>

            {/* Need Help Section */}
            <div className="bg-[#FFF8E7] rounded-xl border border-yellow-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center shrink-0">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                  </div>
                  <div>
                     <h3 className="text-base font-bold text-gray-900 mb-0.5">Need Help?</h3>
                     <p className="text-sm text-gray-600">We are here for you!</p>
                  </div>
               </div>
               
               <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 w-full md:w-auto">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                     <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center shrink-0">
                        <Phone size={14} className="text-yellow-800" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Call Us</p>
                        <p className="text-sm font-bold text-gray-900">+91 1800 123 4567</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                     <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center shrink-0">
                        <Mail size={14} className="text-yellow-800" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Email Us</p>
                        <p className="text-sm font-bold text-gray-900">support@buybuycart.com</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                     <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center shrink-0">
                        <MessageSquare size={14} className="text-yellow-800" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Live Chat</p>
                        <p className="text-sm font-bold text-gray-900">Chat with us</p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        )}
        
      </div>
    </div>
  );
};

export default TrackOrderPage;
