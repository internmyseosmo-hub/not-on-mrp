import React, { useState, useEffect } from "react";
import { Trash2, Store, Calendar, MapPin, Mail, Phone, Wallet, Building2, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminFranchise() {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchEnquiries = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://127.0.0.1:3000/api/franchise");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.error("Error fetching franchise enquiries", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      setIsDeleting(id);
      const res = await fetch(`http://127.0.0.1:3000/api/franchise/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete enquiry: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting", error);
      alert("Something went wrong");
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#FFD147]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Store className="text-[#FFD147]" size={28} />
            Franchise Enquiries
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and review franchise application requests.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 font-bold text-gray-700">
          Total Enquiries: <span className="text-brand-red ml-1">{enquiries.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {enquiries.map((enquiry) => (
            <motion.div
              key={enquiry._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#FFD147] flex items-center justify-center text-gray-900 font-bold">
                      {enquiry.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{enquiry.fullName}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(enquiry._id)}
                    disabled={isDeleting === enquiry._id}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isDeleting === enquiry._id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  </button>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400" /> {enquiry.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400" /> {enquiry.phoneNumber}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400" /> {enquiry.city}, {enquiry.state}
                  </div>
                </div>

                <hr className="my-4 border-gray-100" />
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Wallet size={16} className="text-gray-400 mt-0.5" /> 
                    <div><span className="font-semibold">Budget:</span> {enquiry.investmentBudget}</div>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Building2 size={16} className="text-gray-400 mt-0.5" /> 
                    <div><span className="font-semibold">Model:</span> {enquiry.franchiseModel}</div>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Store size={16} className="text-gray-400 mt-0.5" /> 
                    <div><span className="font-semibold">Space:</span> {enquiry.ownsRetailSpace}</div>
                  </div>
                </div>

                {enquiry.additionalInformation && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-600 border border-gray-100">
                    <span className="font-bold text-gray-700 block mb-1">Additional Info:</span>
                    {enquiry.additionalInformation}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {enquiries.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Store className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="font-semibold">No franchise enquiries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
