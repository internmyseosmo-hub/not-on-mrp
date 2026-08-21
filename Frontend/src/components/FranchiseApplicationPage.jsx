import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle2, Building2, User, Mail, Phone, MapPin, Target, Wallet, Store, FileText } from "lucide-react";

export default function FranchiseApplicationPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    investmentBudget: "",
    preferredModel: "",
    ownRetailSpace: "",
    experience: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen font-body text-brand-ink selection:bg-brand-yellow selection:text-brand-ink relative">
      
      {/* Background styling elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-12 relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={() => onNavigate?.('franchise')}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-ink font-semibold mb-8 transition-colors group"
        >
          <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:shadow border border-gray-100 transition-all">
            <ChevronLeft size={16} />
          </div>
          Back to Franchise Info
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex bg-brand-yellow px-4 py-1.5 rounded-full text-sm font-black mb-4 shadow-sm"
          >
            NOT ON MRP
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
          >
            Franchise <span className="text-brand-red">Application</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 font-medium max-w-xl mx-auto"
          >
            Take the first step towards building your own successful retail business. Fill out the details below and our team will get in touch.
          </motion.p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 md:p-10 lg:p-12"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-black border-b-2 border-brand-yellow pb-2 inline-flex mb-6 flex items-center gap-2">
                      <User size={20} className="text-brand-ink" />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Full Name *</label>
                        <div className="relative">
                          <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium" placeholder="Enter your full name" />
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Email Address *</label>
                        <div className="relative">
                          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium" placeholder="your@email.com" />
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Phone Number *</label>
                        <div className="relative">
                          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium" placeholder="+91 00000 00000" />
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">City *</label>
                          <div className="relative">
                            <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium" placeholder="City" />
                            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                         <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">State *</label>
                          <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium" placeholder="State" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business & Investment */}
                  <div>
                    <h2 className="text-xl font-black border-b-2 border-brand-yellow pb-2 inline-flex mb-6 flex items-center gap-2">
                      <Target size={20} className="text-brand-ink" />
                      Business & Investment
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Investment Budget *</label>
                        <div className="relative">
                          <select required name="investmentBudget" value={formData.investmentBudget} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium appearance-none">
                            <option value="" disabled>Select Budget Range</option>
                            <option value="8.5L - 20L">₹8.5 Lakhs - ₹20 Lakhs</option>
                            <option value="20L - 40L">₹20 Lakhs - ₹40 Lakhs</option>
                            <option value="40L - 50L+">₹40 Lakhs - ₹50 Lakhs+</option>
                          </select>
                          <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <ChevronLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 -rotate-90 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Preferred Franchise Model *</label>
                        <div className="relative">
                          <select required name="preferredModel" value={formData.preferredModel} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium appearance-none">
                            <option value="" disabled>Select a Model</option>
                            <option value="FOFO">FOFO (Franchise Owned & Operated)</option>
                            <option value="FOCO">FOCO (Franchise Owned, Company Operated)</option>
                            <option value="Undecided">Not sure yet / Need guidance</option>
                          </select>
                          <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <ChevronLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 -rotate-90 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Do you currently own a retail space? *</label>
                        <div className="relative">
                          <select required name="ownRetailSpace" value={formData.ownRetailSpace} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium appearance-none">
                            <option value="" disabled>Select Option</option>
                            <option value="Yes - Ready">Yes, I have a ready space</option>
                            <option value="Yes - Under Construction">Yes, but under construction</option>
                            <option value="No - Looking">No, currently looking</option>
                            <option value="No - Need Help">No, need help finding one</option>
                          </select>
                          <Store size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <ChevronLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 -rotate-90 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <h2 className="text-xl font-black border-b-2 border-brand-yellow pb-2 inline-flex mb-6 flex items-center gap-2">
                      <FileText size={20} className="text-brand-ink" />
                      Additional Information
                    </h2>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Briefly describe your business background/experience (Optional)</label>
                      <textarea 
                        name="experience" 
                        value={formData.experience} 
                        onChange={handleChange} 
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium resize-y" 
                        placeholder="Tell us about any past retail or business experience..." 
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">
                      By submitting, you agree to our Terms of Service & Privacy Policy.
                    </p>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-brand-ink text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-brand-yellow rounded-full" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ChevronLeft size={20} strokeWidth={3} className="rotate-180" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white"
              >
                <div className="relative w-24 h-24 mb-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, delay: 0.1 }}
                    className="absolute inset-0 bg-green-100 rounded-full"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center text-green-600"
                  >
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                  </motion.div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-brand-ink mb-4">Application Received!</h2>
                <p className="text-lg text-gray-600 font-medium max-w-md mx-auto mb-8">
                  Thank you for your interest, <span className="font-bold text-brand-ink">{formData.fullName}</span>. Our franchise team will review your details and contact you at {formData.phone} shortly.
                </p>

                <button 
                  onClick={() => onNavigate?.('home')}
                  className="bg-brand-yellow text-brand-ink font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md hover:bg-brand-yellow-dark transition-all"
                >
                  Return to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
