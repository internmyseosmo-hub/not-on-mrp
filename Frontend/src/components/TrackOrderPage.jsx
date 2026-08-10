import { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowLeft,
  Search,
  ShieldCheck,
} from "lucide-react";

export default function TrackOrderPage({ onNavigate }) {
  const [orderQuery, setOrderQuery] = useState("");
  const [activeOrder, setActiveOrder] = useState({
    id: "NOM-894210",
    date: "August 3, 2026",
    status: "OUT FOR DELIVERY",
    eta: "Today by 6:00 PM",
    carrier: "Delhivery Express",
    trackingId: "DEL984120391",
    customerName: "Archita Sharma",
    address: "B-402, Sunshine Apartments, Sector 62, Noida - 201301",
    items: [
      { name: "Stackable Storage Crates (Set of 4)", price: 599, qty: 1 },
      { name: "Desk Pen & Pencil Organizer", price: 249, qty: 2 },
    ],
  });

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setActiveOrder({
      id: orderQuery.toUpperCase(),
      date: "Today",
      status: "PACKED & DISPATCHED",
      eta: "Tomorrow by 2:00 PM",
      carrier: "Bluedart Express",
      trackingId: "BD" + Math.floor(10000000 + Math.random() * 90000000),
      customerName: "Valued Customer",
      address: "Verified Shipping Address",
      items: [
        { name: "Everyday Laundry Basket — Pink", price: 349, qty: 1 },
      ],
    });
  };

  const steps = [
    { title: "Order Placed", desc: "Aug 3, 10:30 AM", done: true },
    { title: "Packed at Warehouse", desc: "Aug 3, 04:15 PM", done: true },
    { title: "Handed to Courier", desc: "Aug 4, 08:00 AM", done: true },
    { title: "Out for Delivery", desc: "Aug 4, 11:30 AM", active: true },
    { title: "Delivered", desc: "Expected Today", done: false },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 pt-6 text-brand-ink">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <button
            onClick={() => onNavigate?.("home")}
            className="hover:text-brand-red flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span className="font-bold text-brand-ink">Track Order</span>
        </div>

        {/* Page Title */}
        <div className="mb-8 flex flex-col justify-between gap-2 border-b border-gray-200/80 pb-4 sm:flex-row sm:items-center">
          <h1 className="font-display text-2xl font-black uppercase text-brand-ink sm:text-3xl flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-amber-400 shadow-sm">
              <Truck size={22} />
            </div>
            TRACK YOUR ORDER STATUS
          </h1>
          <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
            REAL-TIME LOGISTICS UPDATES
          </span>
        </div>

        {/* Search Bar */}
        <div className="my-6 rounded-3xl bg-white p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                required
                placeholder="Enter Order ID (e.g. NOM-894210) or Mobile Number"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-xs font-bold text-brand-ink focus:border-brand-yellow focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-black px-6 py-3 text-xs font-black uppercase text-white shadow-md hover:bg-gray-900 transition-all cursor-pointer"
            >
              TRACK
            </button>
          </form>
        </div>

        {/* Order Details Grid */}
        {activeOrder && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 max-w-5xl mx-auto">
            {/* Status Timeline */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                      ORDER #{activeOrder.id}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-black text-brand-ink">
                      {activeOrder.status}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Courier: <strong>{activeOrder.carrier}</strong> (AWB: {activeOrder.trackingId})
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-500 font-medium block">
                      Estimated Delivery
                    </span>
                    <span className="font-display text-base font-black text-emerald-600">
                      {activeOrder.eta}
                    </span>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="mt-8 relative pl-4 border-l-2 border-amber-300 space-y-8">
                  {steps.map((step, idx) => (
                    <div key={step.title} className="relative flex items-start gap-4">
                      <div
                        className={`absolute -left-[23px] top-0 flex h-6 w-6 items-center justify-center rounded-full text-white font-bold text-xs shadow-sm ${
                          step.active
                            ? "bg-[#E31E24] ring-4 ring-red-100 animate-pulse"
                            : step.done
                            ? "bg-emerald-600"
                            : "bg-gray-300"
                        }`}
                      >
                        {step.done ? "✓" : idx + 1}
                      </div>

                      <div className="ml-4">
                        <h4
                          className={`font-display text-sm font-bold ${
                            step.active
                              ? "text-[#E31E24]"
                              : step.done
                              ? "text-brand-ink"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <h4 className="font-display text-xs font-black uppercase text-brand-ink border-b border-gray-100 pb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-brand-red" />
                  DELIVERY ADDRESS
                </h4>
                <p className="mt-3 text-xs font-bold text-brand-ink">{activeOrder.customerName}</p>
                <p className="mt-1 text-xs text-gray-600 leading-relaxed font-medium">
                  {activeOrder.address}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <h4 className="font-display text-xs font-black uppercase text-brand-ink border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Package size={16} className="text-brand-yellow-dark" />
                  ITEMS IN THIS ORDER
                </h4>
                <div className="mt-3 space-y-3">
                  {activeOrder.items.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-brand-ink">{item.name}</p>
                        <span className="text-[10px] text-gray-500">Qty: {item.qty}</span>
                      </div>
                      <span className="font-mono font-bold text-brand-ink">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
