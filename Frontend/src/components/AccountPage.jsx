import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, MapPin, ShoppingBag, Heart, LogOut,
  ArrowLeft, Edit3, ChevronRight, Package, CheckCircle2, Truck, Clock,
} from "lucide-react";

const DEMO_ORDERS = [
  { id: "NOM-891234", date: "Aug 3, 2026", items: "Stackable Crates + Pen Organizer", total: 1097, status: "Delivered", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { id: "NOM-782311", date: "Jul 28, 2026", items: "Laundry Basket + Storage Basket", total: 849, status: "Out for Delivery", icon: Truck, color: "text-amber-700 bg-amber-50 border-amber-200" },
  { id: "NOM-674020", date: "Jul 15, 2026", items: "Kitchen Cleaning Set", total: 499, status: "Processing", icon: Clock, color: "text-blue-600 bg-blue-50 border-blue-200" },
];

export default function AccountPage({ onNavigate, user, onLogout }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleEditField = (e) => setEditForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => setEditMode(false);

  const handleLogout = () => {
    onLogout?.();
    onNavigate?.("home");
  };

  const avatar = user?.avatar || (user?.name?.[0]?.toUpperCase()) || "U";

  const menuItems = [
    { id: "overview", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart, action: () => onNavigate?.("wishlist") },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 pt-6 text-brand-ink">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <button onClick={() => onNavigate?.("home")} className="hover:text-brand-red flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span className="font-bold text-brand-ink">My Account</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">

            {/* User Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#121820] to-[#2a3444] p-6 text-white shadow-xl">
              <img src="/NOTONMRP.png" alt="NOT ON MRP" className="mb-4 h-8 w-auto object-contain" />
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-yellow text-2xl font-black text-brand-ink shadow-lg">
                  {avatar}
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-black uppercase truncate">{user?.name || "Guest User"}</h2>
                  <p className="text-xs text-gray-400 font-medium truncate">{user?.email || ""}</p>
                  {user?.phone && <p className="text-xs text-gray-400 font-medium">{user.phone}</p>}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                {[{ label: "Orders", val: "3" }, { label: "Wishlist", val: "5" }, { label: "Saved ₹", val: "2,400" }].map(({ label, val }) => (
                  <div key={label} className="text-center">
                    <p className="font-display text-base font-black text-brand-yellow">{val}</p>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav Menu */}
            <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-3 space-y-1">
              {menuItems.map(({ id, label, icon: Icon, action }) => (
                <button
                  key={id}
                  onClick={() => action ? action() : setActiveSection(id)}
                  className={`w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all cursor-pointer ${
                    activeSection === id && !action ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={activeSection === id && !action ? "text-brand-yellow" : "text-gray-500"} />
                    <span>{label}</span>
                  </div>
                  <ChevronRight size={14} className="opacity-50" />
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">

            {/* OVERVIEW / PROFILE */}
            {activeSection === "overview" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-sm font-black uppercase text-brand-ink">MY PROFILE</h3>
                  <button
                    onClick={() => editMode ? handleSave() : setEditMode(true)}
                    className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-[11px] font-black uppercase text-white hover:bg-gray-900 transition-all cursor-pointer"
                  >
                    <Edit3 size={12} />
                    {editMode ? "SAVE CHANGES" : "EDIT PROFILE"}
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "name", label: "Full Name", icon: User },
                    { name: "email", label: "Email Address", icon: Mail },
                    { name: "phone", label: "Mobile Number", icon: Phone },
                  ].map(({ name, label, icon: Icon }) => (
                    <div key={name}>
                      <label className="block text-[11px] font-extrabold uppercase text-gray-500 mb-1.5">{label}</label>
                      {editMode ? (
                        <div className="relative">
                          <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            name={name} value={editForm[name]} onChange={handleEditField}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-9 pr-4 text-xs font-semibold text-brand-ink focus:border-brand-yellow focus:bg-white focus:outline-none"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 px-4 py-2.5">
                          <Icon size={15} className="text-gray-400 shrink-0" />
                          <span className="text-xs font-semibold text-brand-ink">{editForm[name] || <span className="text-gray-400 italic">Not added</span>}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs font-bold text-amber-900">
                  🎉 Member since August 2026 · <span className="text-emerald-700">Total Savings: ₹2,400 below MRP!</span>
                </div>
              </motion.div>
            )}

            {/* ORDERS */}
            {activeSection === "orders" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-display text-sm font-black uppercase text-brand-ink mb-6 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-brand-yellow-dark" /> MY ORDERS
                </h3>
                <div className="space-y-4">
                  {DEMO_ORDERS.map((order) => {
                    const StatusIcon = order.icon;
                    return (
                      <div key={order.id} className={`rounded-2xl border p-4 ${order.color}`}>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <StatusIcon size={16} />
                            <span className="text-xs font-black">ORDER #{order.id}</span>
                          </div>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/70">
                            {order.status}
                          </span>
                        </div>
                        <p className="mt-2 text-xs font-medium text-gray-700">{order.items}</p>
                        <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-gray-600">
                          <span>{order.date}</span>
                          <span className="font-black text-brand-ink">₹{order.total}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ADDRESSES */}
            {activeSection === "addresses" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-display text-sm font-black uppercase text-brand-ink mb-6 flex items-center gap-2">
                  <MapPin size={18} className="text-brand-red" /> SAVED ADDRESSES
                </h3>
                <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
                  <MapPin size={36} className="mx-auto mb-3 opacity-30" />
                  <p className="text-xs font-bold">No saved addresses yet.</p>
                  <p className="text-[11px] mt-1 font-medium">Addresses added during checkout will appear here.</p>
                  <button
                    onClick={() => onNavigate?.("checkout")}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-[11px] font-black uppercase text-white hover:bg-gray-900 transition-all cursor-pointer"
                  >
                    SHOP NOW &amp; ADD ADDRESS
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
