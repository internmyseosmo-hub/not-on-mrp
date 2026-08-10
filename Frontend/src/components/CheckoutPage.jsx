import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Wallet,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Mail,
  Lock,
} from "lucide-react";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI / QR Code", icon: Smartphone, desc: "PhonePe, Google Pay, Paytm, BHIM" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when your order arrives" },
];

const STEPS = ["Delivery Address", "Payment", "Review & Place Order"];

export default function CheckoutPage({ onNavigate, cartItems = [], finalTotal = 0, totalSavings = 0 }) {
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState("NOM-" + Math.floor(100000 + Math.random() * 900000));

  const items = cartItems.length > 0 ? cartItems : [
    { id: 1, name: "Stackable Storage Crates (Set of 4)", price: 599, quantity: 1, category: "Home & Living" },
    { id: 2, name: "Desk Pen & Pencil Organizer", price: 249, quantity: 2, category: "Stationery & Office" },
  ];
  const total = finalTotal || items.reduce((s, i) => s + i.price * i.quantity, 0);
  const savings = totalSavings || Math.round(total * 0.22);

  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", pincode: "", state: "" });
  const handleForm = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const isAddressValid = form.name && form.phone.length >= 10 && form.address && form.city && form.pincode.length === 6;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => onNavigate?.("home"), 5000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="max-w-lg w-full rounded-3xl bg-white p-8 sm:p-12 text-center shadow-2xl border border-emerald-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6"
          >
            <CheckCircle2 size={52} />
          </motion.div>
          <h2 className="font-display text-2xl font-black uppercase text-brand-ink">ORDER PLACED! 🎉</h2>
          <p className="mt-3 text-sm text-gray-600 font-medium">
            Thank you for shopping with <strong>NOT ON MRP</strong>!
          </p>
          <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm font-black text-amber-900">
            Order ID: <span className="text-brand-ink">{orderId}</span>
          </div>
          <div className="mt-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-extrabold text-emerald-800">
            💰 You saved ₹{savings} below MRP on this order!
          </div>
          <p className="mt-6 text-[11px] text-gray-400 font-medium">
            Estimated delivery in 3–5 business days. Redirecting to home...
          </p>
          <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full rounded-full bg-emerald-500"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 pt-6 text-brand-ink">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">

        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <button onClick={() => onNavigate?.("cart")} className="hover:text-brand-red flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Back to Cart
          </button>
          <span>/</span>
          <span className="font-bold text-brand-ink">Checkout</span>
        </div>

        <div className="mb-8 border-b border-gray-200/80 pb-4">
          <h1 className="font-display text-2xl font-black uppercase text-brand-ink sm:text-3xl flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-brand-yellow shadow-sm">
              <Lock size={20} />
            </div>
            SECURE CHECKOUT
          </h1>
          <p className="mt-1 text-xs text-gray-500 flex items-center gap-1.5 font-semibold">
            <ShieldCheck size={13} className="text-emerald-500" />
            100% Safe &amp; Secure Payments — Always Below MRP
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-black uppercase transition-all cursor-pointer ${
                  i === step ? "bg-black text-white shadow-lg" : i < step ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                  i < step ? "bg-white text-emerald-600" : i === step ? "bg-white text-black" : "bg-gray-300 text-gray-500"
                }`}>
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-8 sm:w-12 mx-1 rounded ${i < step ? "bg-emerald-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">

            {step === 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-display text-sm font-black uppercase text-brand-ink flex items-center gap-2 mb-6">
                  <MapPin size={18} className="text-brand-red" /> DELIVERY ADDRESS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "Full Name", placeholder: "Your full name", icon: User, full: false },
                    { name: "phone", label: "Mobile Number", placeholder: "10-digit mobile", icon: Phone, full: false },
                    { name: "email", label: "Email Address", placeholder: "you@email.com", icon: Mail, full: true },
                    { name: "address", label: "Full Address", placeholder: "House / Flat No., Street, Area", icon: MapPin, full: true },
                    { name: "city", label: "City", placeholder: "City", icon: null, full: false },
                    { name: "pincode", label: "PIN Code", placeholder: "6-digit PIN code", icon: null, full: false },
                    { name: "state", label: "State", placeholder: "State", icon: null, full: true },
                  ].map(({ name, label, placeholder, icon: Icon, full }) => (
                    <div key={name} className={full ? "sm:col-span-2" : ""}>
                      <label className="block text-[11px] font-extrabold uppercase text-gray-600 mb-1.5">{label}</label>
                      <div className="relative">
                        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />}
                        <input
                          type={name === "phone" || name === "pincode" ? "tel" : name === "email" ? "email" : "text"}
                          name={name} value={form[name]} onChange={handleForm} placeholder={placeholder}
                          maxLength={name === "phone" ? 10 : name === "pincode" ? 6 : undefined}
                          className={`w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 text-xs font-semibold text-brand-ink placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:outline-none ${Icon ? "pl-9 pr-4" : "px-4"}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => isAddressValid && setStep(1)}
                  disabled={!isAddressValid}
                  className={`mt-6 w-full rounded-full py-3.5 text-xs font-black uppercase text-white shadow-lg transition-all active:scale-95 ${isAddressValid ? "bg-black hover:bg-gray-900 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                  CONTINUE TO PAYMENT →
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-display text-sm font-black uppercase text-brand-ink flex items-center gap-2 mb-6">
                  <CreditCard size={18} className="text-brand-yellow-dark" /> CHOOSE PAYMENT METHOD
                </h3>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(({ id, label, icon: Icon, desc }) => (
                    <button key={id} onClick={() => setPaymentMethod(id)}
                      className={`w-full flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all cursor-pointer ${paymentMethod === id ? "border-brand-yellow bg-amber-50" : "border-gray-200 bg-gray-50/50 hover:border-amber-200 hover:bg-white"}`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${paymentMethod === id ? "bg-brand-yellow text-brand-ink" : "bg-gray-200 text-gray-600"}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-brand-ink">{label}</p>
                        <p className="text-[11px] text-gray-500 font-medium">{desc}</p>
                      </div>
                      <div className={`ml-auto h-4 w-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === id ? "border-brand-yellow bg-brand-yellow" : "border-gray-300"}`}>
                        {paymentMethod === id && <div className="h-2 w-2 rounded-full bg-brand-ink" />}
                      </div>
                    </button>
                  ))}
                </div>
                {paymentMethod === "upi" && (
                  <div className="mt-4 rounded-2xl bg-gray-50 border border-gray-200 p-4">
                    <label className="block text-[11px] font-extrabold uppercase text-gray-600 mb-1.5">UPI ID</label>
                    <input type="text" placeholder="yourname@upi" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-brand-ink focus:border-brand-yellow focus:outline-none" />
                  </div>
                )}
                {paymentMethod === "card" && (
                  <div className="mt-4 rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-3">
                    <input type="text" placeholder="Card Number" maxLength={16} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-brand-ink focus:border-brand-yellow focus:outline-none" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM / YY" maxLength={5} className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-brand-ink focus:border-brand-yellow focus:outline-none" />
                      <input type="text" placeholder="CVV" maxLength={3} className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-brand-ink focus:border-brand-yellow focus:outline-none" />
                    </div>
                  </div>
                )}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 rounded-full border-2 border-gray-200 py-3.5 text-xs font-black uppercase text-gray-700 hover:border-gray-400 transition-all cursor-pointer">← BACK</button>
                  <button onClick={() => setStep(2)} className="flex-[2] rounded-full bg-black py-3.5 text-xs font-black uppercase text-white shadow-lg hover:bg-gray-900 transition-all active:scale-95 cursor-pointer">REVIEW ORDER →</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
                <h3 className="font-display text-sm font-black uppercase text-brand-ink mb-2">📋 REVIEW YOUR ORDER</h3>
                <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-xs">
                  <p className="font-extrabold text-gray-500 uppercase text-[10px] mb-1">Delivering To</p>
                  <p className="font-bold text-brand-ink">{form.name}</p>
                  <p className="text-gray-600 font-medium">{form.address}, {form.city} — {form.pincode}</p>
                  <p className="text-gray-600 font-medium">{form.phone}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-xs">
                  <p className="font-extrabold text-gray-500 uppercase text-[10px] mb-1">Payment Method</p>
                  <p className="font-bold text-brand-ink">{PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-xs space-y-2">
                  <p className="font-extrabold text-gray-500 uppercase text-[10px] mb-2">Items ({items.length})</p>
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="font-semibold text-brand-ink truncate max-w-[65%]">{item.name} x{item.quantity}</span>
                      <span className="font-black text-brand-ink">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 rounded-full border-2 border-gray-200 py-3.5 text-xs font-black uppercase text-gray-700 hover:border-gray-400 transition-all cursor-pointer">← BACK</button>
                  <button onClick={handlePlaceOrder} className="flex-[2] rounded-full bg-[#E31E24] py-3.5 text-xs font-black uppercase text-white shadow-lg hover:bg-red-700 transition-all active:scale-95 cursor-pointer">PLACE ORDER 🎉</button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
              <h4 className="font-display text-sm font-black uppercase text-brand-ink border-b border-gray-100 pb-3">ORDER SUMMARY</h4>
              <div className="space-y-2.5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="font-semibold text-gray-700 truncate max-w-[65%]">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                    <span className="font-black text-brand-ink">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-gray-200 pt-3 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-gray-600"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="flex justify-between font-bold text-emerald-700"><span>Savings Below MRP</span><span>- ₹{savings}</span></div>
                <div className="flex justify-between font-bold text-emerald-600"><span>Delivery</span><span>FREE</span></div>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-display text-base font-black text-brand-ink">
                <span>TOTAL</span>
                <span className="text-xl text-[#E31E24]">₹{total}</span>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center text-[11px] font-extrabold text-emerald-800">
                💰 You save ₹{savings} vs MRP on this order!
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase pt-1">
                <ShieldCheck size={13} className="text-emerald-500" />
                Secured by 256-bit SSL Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
