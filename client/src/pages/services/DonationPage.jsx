import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, Zap, Coffee, Server, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button"; // Adjust path as needed
import { Input } from "../../../components/ui/input";   // Adjust path as needed
import { Label } from "../../../components/ui/label";   // Adjust path as needed
import { Badge } from "../../../components/ui/badge";   // Adjust path as needed

const PRESET_AMOUNTS = [
  { value: 100, label: "₹100", icon: "☕" },
  { value: 500, label: "₹500", icon: "🚀" },
  { value: 1000, label: "₹1000", icon: "💎" },
];

const Donation = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(500);
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handlePresetClick = (val) => {
    setAmount(val);
    setIsCustom(false);
  };

  const handleCustomChange = (e) => {
    setAmount(e.target.value);
    setIsCustom(true);
  };

  const handleDonate = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Thank you ${formData.name} for donating ₹${amount}!`);
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen w-full relative overflow-hidden selection:bg-yellow-500/30 flex items-center justify-center py-20 px-4">

      {/* --- Background Blobs (Consistent with Home) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* ================= LEFT COLUMN: INFO & CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 pt-4"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="w-fit pl-0 text-neutral-400 hover:text-yellow-400 hover:bg-transparent -ml-2 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Arena
          </Button>

          <div>
            <Badge variant="outline" className="mb-4 bg-yellow-500/10 text-yellow-500 border-yellow-500/20 px-3 py-1">
              Support the Project
            </Badge>
            <h1 className="text-5xl font-black text-white leading-tight mb-4">
              Fuel the <span className="text-yellow-500">Engine.</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Running real-time code execution servers isn't cheap. Your contribution keeps the lights on, the latency low, and the battles fierce.
            </p>
          </div>

          {/* Impact Stats / Features */}
          <div className="grid gap-6 mt-4">
            <FeatureItem
              icon={<Server className="text-yellow-500" />}
              title="Paying the Bills"
              desc="Your support pays for our Hostinger servers so the website stays fast and online 24/7."
            />
            <FeatureItem
              icon={<Zap className="text-yellow-500" />}
              title="New Features"
              desc="Donations help us build new coding challenges and game modes much faster."
            />
            <FeatureItem
              icon={<Heart className="text-yellow-500" />}
              title="100% to the Project"
              desc="We are a small team, not a corporation. Every contribution helps us stay independent and focused on building great tools." />
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: DONATION FORM ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <div className="rounded-3xl border border-neutral-800 bg-[#0f0f0f]/80 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0" />

            <form onSubmit={handleDonate} className="flex flex-col gap-6">

              {/* Amount Selection */}
              <div className="space-y-3">
                <Label className="text-neutral-300 text-sm font-medium">Select Amount</Label>
                <div className="grid grid-cols-3 gap-3">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => handlePresetClick(preset.value)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${!isCustom && amount === preset.value
                        ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-800"
                        }`}
                    >
                      <span className="text-xl mb-1">{preset.icon}</span>
                      <span className="font-bold">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={amount}
                    onChange={handleCustomChange}
                    className={`pl-8 bg-neutral-900 border-neutral-800 text-white h-12 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all ${isCustom ? "border-yellow-500/50 ring-2 ring-yellow-500/10" : ""
                      }`}
                  />
                </div>
              </div>

              <div className="h-px bg-neutral-800 my-2" />

              {/* Personal Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-neutral-300">Name</Label>
                  <Input
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-neutral-900 border-neutral-800 text-white h-11 focus:border-yellow-500 focus:ring-yellow-500/20 placeholder:text-neutral-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-300">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-neutral-900 border-neutral-800 text-white h-11 focus:border-yellow-500 focus:ring-yellow-500/20 placeholder:text-neutral-600"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-12 text-lg rounded-xl mt-2 shadow-[0_0_20px_-5px_rgba(234,179,8,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Donate ₹{amount} <ShieldCheck size={18} />
                  </span>
                )}
              </Button>

              <p className="text-center text-xs text-neutral-500 mt-2">
                Secure payment powered by Razorpay. No card details are stored on our servers.
              </p>

            </form>
          </div>
        </motion.div>

      </div>
    </main>
  );
};

// Helper Component for the Left Column features
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-neutral-800 hover:bg-white/5 transition-colors">
    <div className="mt-1 p-2 bg-neutral-900 rounded-lg border border-neutral-800">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Donation;