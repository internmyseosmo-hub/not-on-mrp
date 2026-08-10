import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage({ onNavigate, onLogin }) {
  const [tab, setTab] = useState("login"); // "login" | "signup"
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });

  const handleLoginField = (e) => setLoginForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSignupField = (e) => setSignupForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!loginForm.email || !loginForm.password) return setError("Please fill all fields.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin?.({
        name: loginForm.email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: loginForm.email,
        phone: "",
        avatar: loginForm.email[0].toUpperCase(),
      });
      onNavigate?.("account");
    }, 1200);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    if (!signupForm.name || !signupForm.email || !signupForm.password) return setError("Please fill all fields.");
    if (signupForm.password !== signupForm.confirm) return setError("Passwords do not match!");
    if (signupForm.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin?.({
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        avatar: signupForm.name[0].toUpperCase(),
      });
      onNavigate?.("account");
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Back */}
        <button
          onClick={() => onNavigate?.("home")}
          className="mb-6 flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-red cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-[#121820] to-[#2a3444] p-8 text-center">
            <img
              src="/NOTONMRP.png"
              alt="NOT ON MRP Logo"
              className="mx-auto mb-4 h-14 w-auto object-contain"
            />
            <h1 className="font-display text-xl font-black uppercase text-white">
              {tab === "login" ? "WELCOME BACK!" : "JOIN NOT ON MRP"}
            </h1>
            <p className="mt-1 text-xs text-gray-400 font-medium">
              {tab === "login" ? "Sign in to access your account" : "Create your account — it's free!"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-gray-100">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 py-3.5 text-xs font-black uppercase tracking-wide transition-colors cursor-pointer ${
                  tab === t ? "border-b-2 border-black text-brand-ink" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {tab === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-600 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        name="email" type="email" value={loginForm.email} onChange={handleLoginField}
                        placeholder="you@example.com" required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-9 pr-4 text-xs font-semibold text-brand-ink placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-600 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        name="password" type={showPass ? "text" : "password"} value={loginForm.password} onChange={handleLoginField}
                        placeholder="Enter your password" required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-9 pr-10 text-xs font-semibold text-brand-ink placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:outline-none"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {error && <p className="text-[11px] font-bold text-red-500">{error}</p>}

                  <button
                    type="submit" disabled={loading}
                    className="w-full rounded-full bg-black py-3.5 text-xs font-black uppercase text-white shadow-lg hover:bg-gray-900 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {loading ? "SIGNING IN..." : "SIGN IN →"}
                  </button>

                  <p className="text-center text-[11px] text-gray-500 font-medium">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setTab("signup")} className="font-black text-brand-ink hover:text-brand-red cursor-pointer">
                      Create one free
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "Your full name", icon: User },
                    { name: "phone", label: "Mobile Number", type: "tel", placeholder: "10-digit mobile (optional)", icon: Phone },
                    { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com", icon: Mail },
                  ].map(({ name, label, type, placeholder, icon: Icon }) => (
                    <div key={name}>
                      <label className="block text-[11px] font-extrabold uppercase text-gray-600 mb-1.5">{label}</label>
                      <div className="relative">
                        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          name={name} type={type} value={signupForm[name]} onChange={handleSignupField}
                          placeholder={placeholder} maxLength={name === "phone" ? 10 : undefined}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-9 pr-4 text-xs font-semibold text-brand-ink placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-600 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        name="password" type={showPass ? "text" : "password"} value={signupForm.password} onChange={handleSignupField}
                        placeholder="Min. 6 characters"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-9 pr-10 text-xs font-semibold text-brand-ink placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:outline-none"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-600 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        name="confirm" type={showConfirm ? "text" : "password"} value={signupForm.confirm} onChange={handleSignupField}
                        placeholder="Re-enter your password"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-9 pr-10 text-xs font-semibold text-brand-ink placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:outline-none"
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {error && <p className="text-[11px] font-bold text-red-500">{error}</p>}

                  <button
                    type="submit" disabled={loading}
                    className="w-full rounded-full bg-black py-3.5 text-xs font-black uppercase text-white shadow-lg hover:bg-gray-900 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT →"}
                  </button>

                  <p className="text-center text-[11px] text-gray-500 font-medium">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setTab("login")} className="font-black text-brand-ink hover:text-brand-red cursor-pointer">
                      Sign in
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
              <ShieldCheck size={13} className="text-emerald-500" />
              Your data is safe with us. No spam ever.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
