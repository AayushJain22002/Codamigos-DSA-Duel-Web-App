import React from "react";
import { Button } from "../../components/ui/button";
import { motion } from "motion/react";
import FakeCodeEditor from "../../components/ui/code-editor";
import BentoGrid from "../../components/ui/bento-grid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider";
import { Code2, Trophy, History, Zap, Users, Globe } from "lucide-react"; 

const Home = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();

  // Variant for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen w-full overflow-x-hidden">
      {/* ==================== HERO SECTION (UNCHANGED) ==================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute top-50 left-20 w-72 h-72 bg-yellow-500 rounded-full blur-[120px] opacity-20 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute bottom-10 right-20 w-80 h-50 bg-yellow-400 rounded-full blur-[150px] opacity-20 pointer-events-none"
        />

        <div className="flex flex-col md:flex-row items-center justify-around w-full max-w-7xl px-8 z-10">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-center md:text-left w-full md:w-1/2"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500 leading-tight">
                Two Coders. One Arena.
              </h1>
              <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-500 leading-tight">
                Infinite Replay.
              </h2>
            </div>

            <p className="text-neutral-400 text-base md:text-lg max-w-md mx-auto md:mx-0">
              Real-time head-to-head DSA battles - create rooms, join instantly,
              and relive every code move.
            </p>

            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-6 py-3 rounded-xl transition-all cursor-pointer"
                onClick={() => navigate("/room")}
              >
                CREATE ROOM
              </Button>
              <Button
                className="border border-yellow-400 bg-transparent hover:bg-yellow-400/10 text-yellow-400 font-semibold text-lg px-6 py-3 rounded-xl transition-all cursor-pointer"
                onClick={() => navigate("/room")}
              >
                JOIN ROOM
              </Button>
            </div>
          </motion.div>

          {/* Right Fake Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full flex justify-center items-center md:px-10 mt-10 md:mt-0"
          >
            <div className="w-full max-w-3xl md:ml-40">
              <FakeCodeEditor />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== UPDATED: HOW IT WORKS (PROCESS STYLE) ==================== */}
      <section className="w-full py-32 bg-[#0d0d0d] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              The Path to <span className="text-yellow-500">Victory</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              No setup required. Just pure algorithmic competition.
            </p>
          </motion.div>

          <div className="relative">
             {/* Desktop Connecting Line */}
             <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[2px] bg-neutral-800">
                <motion.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-yellow-500/0 via-yellow-500 to-yellow-500/0 opacity-50"
                />
             </div>

             {/* Steps Grid */}
             <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
             >
                <ProcessStep 
                  number="01"
                  icon={<Users size={28} />}
                  title="Create Lobby"
                  desc="Generate a secure room code instantly. Invite a rival and select your difficulty."
                />
                <ProcessStep 
                  number="02"
                  icon={<Code2 size={28} />}
                  title="Code Live"
                  desc="Real-time synchronized editor. Run test cases and debug before the clock runs out."
                />
                <ProcessStep 
                  number="03"
                  icon={<Trophy size={28} />}
                  title="Rank Up"
                  desc="Pass all test cases first to win. Gain Elo and climb the global leaderboard."
                />
             </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS TICKER (UNCHANGED) ==================== */}
      <section className="w-full py-12 border-y border-[#222] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-8">
          <StatItem icon={<Globe />} value="Global" label="Server Region" />
          <StatItem icon={<Zap />} value="50ms" label="Avg Latency" />
          <StatItem icon={<History />} value="24/7" label="Uptime" />
          <StatItem icon={<Code2 />} value="100+" label="DSA Problems" />
        </div>
      </section>

      {/* ==================== FOOTER CTA (UNCHANGED) ==================== */}
      <section className="relative w-full py-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to <span className="text-yellow-500">Compete?</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
            Stop coding in isolation. Step into the arena, challenge your peers,
            and master Data Structures & Algorithms the hard way.
          </p>
          <Button
            onClick={() => navigate("/room")}
            className="bg-yellow-500 text-black font-bold text-xl px-10 py-6 rounded-2xl hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(234,179,8,0.5)] cursor-pointer"
          >
            ENTER THE ARENA
          </Button>
        </motion.div>
      </section>
    </main>
  );
};

// --- Helper Components ---

// New Process Step Component
const ProcessStep = ({ number, icon, title, desc }) => {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Icon Circle */}
      <div className="w-[120px] h-[120px] bg-[#0a0a0a] border-4 border-[#1a1a1a] rounded-full flex items-center justify-center relative z-10 mb-6 group-hover:border-yellow-500 transition-colors duration-300">
        <div className="w-[100px] h-[100px] bg-[#111] rounded-full flex items-center justify-center">
           <div className="text-neutral-400 group-hover:text-yellow-400 transition-colors duration-300 transform group-hover:scale-110">
             {icon}
           </div>
        </div>
        
        {/* Number Badge */}
        <div className="absolute -top-2 -right-2 bg-neutral-800 text-white font-mono text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0a0a0a] group-hover:bg-yellow-500 group-hover:text-black transition-colors">
          {number}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-400 leading-relaxed max-w-[280px]">
        {desc}
      </p>
    </motion.div>
  )
}

// Existing Stat Component
const StatItem = ({ icon, value, label }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="flex items-center gap-4 text-neutral-300"
  >
    <div className="text-yellow-500">{icon}</div>
    <div className="text-left">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-neutral-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  </motion.div>
);

export default Home;