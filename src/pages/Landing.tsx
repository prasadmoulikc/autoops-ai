import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, Shield, Activity, ArrowRight, Loader2 } from "lucide-react";

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center max-w-2xl w-full relative z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="w-24 h-24 bg-gradient-to-br from-primary via-accent to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-[0_0_60px_rgba(59,130,246,0.4)] relative group"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Zap size={48} className="text-white relative z-10" />
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-white leading-none"
        >
          AutoOps <span className="text-primary">AI</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl font-medium text-white/40 mb-12 max-w-lg mx-auto leading-relaxed"
        >
          The world's first <span className="text-white font-bold">autonomous</span> business operator. Powered by Neural Intelligence.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
            <Shield size={14} className="text-success" />
            Military Grade Security
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
            <Activity size={14} className="text-primary" />
            Real-time Processing
          </div>
        </motion.div>

        <motion.button 
          variants={itemVariants}
          onClick={handleStart}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="premium-button w-full sm:w-80 py-6 rounded-2xl font-black text-xl text-white uppercase tracking-[0.2em] disabled:opacity-50 relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              Syncing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              Initialize Link <ArrowRight size={24} />
            </span>
          )}
        </motion.button>

        <motion.div 
          variants={itemVariants}
          className="mt-12 flex items-center justify-center gap-8 opacity-20"
        >
          <div className="text-[10px] font-black uppercase tracking-widest">v4.2.0-stable</div>
          <div className="w-1 h-1 rounded-full bg-white" />
          <div className="text-[10px] font-black uppercase tracking-widest">Neural Core v2</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
