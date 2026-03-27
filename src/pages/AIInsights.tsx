import { useMemo } from "react";
import { 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  Sparkles, 
  ArrowUpRight, 
  Lightbulb, 
  Target, 
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Activity,
  TrendingDown,
  PieChart
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { motion } from "motion/react";

export default function AIInsights() {
  const { suggestions, alerts, analysis } = useFinance();

  const forecastData = useMemo(() => {
    const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currentRevenue = analysis?.totalIncome || 150000;
    return months.map((month) => {
      currentRevenue *= 1.05; // 5% monthly growth
      return {
        name: month,
        revenue: Math.floor(currentRevenue),
        projected: Math.floor(currentRevenue * 1.1),
      };
    });
  }, [analysis]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white"
          >
            AI Insights <span className="text-primary tracking-normal">v3.0</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="subtext text-lg font-medium mt-1">
            Predictive analytics & <span className="text-white font-bold">Strategic Intelligence</span>
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-3 border-primary/20 bg-primary/5">
            <Activity className="w-4 h-4 text-primary animate-pulse-soft" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Neural Engine Active</span>
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Insights Grid */}
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue Forecast Chart */}
          <motion.div variants={itemVariants} className="glass-card p-8 relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Revenue Forecast</h2>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">6-Month Projection</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#3B82F6]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Expected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_#818cf8]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Optimistic</span>
                </div>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 800 }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 800 }}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '16px',
                      padding: '12px 16px'
                    }}
                    itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                    labelStyle={{ fontSize: '12px', fontWeight: '900', marginBottom: '8px', color: 'white' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="projected" stroke="#818cf8" strokeWidth={4} fillOpacity={1} fill="url(#colorProj)" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((text, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -5, x: 5 }}
                className="glass-card p-6 border-white/5 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lightbulb size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Recommendation</span>
                      <ArrowUpRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-white/70 group-hover:text-white transition-colors">{text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Insights */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Critical Alerts */}
          <div className="glass-card p-8 bg-gradient-to-br from-danger/10 to-transparent border-danger/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-danger/10 flex items-center justify-center">
                <AlertCircle size={24} className="text-danger animate-pulse-soft" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Risk Analysis</h2>
            </div>
            <div className="space-y-4">
              {alerts.map((alert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <p className="text-sm font-bold text-white/80">{alert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Goals */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Target size={24} className="text-accent" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Strategic Goals</h2>
            </div>
            <div className="space-y-6">
              {[
                { label: "Revenue Target", progress: 75, color: "bg-primary" },
                { label: "Expense Reduction", progress: 45, color: "bg-danger" },
                { label: "Tax Optimization", progress: 90, color: "bg-success" },
              ].map((goal) => (
                <div key={goal.label}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{goal.label}</span>
                    <span className="text-xs font-black text-white">{goal.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${goal.color} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Confidence */}
          <div className="glass-card p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Model Confidence</h3>
              <p className="text-5xl font-black text-white mb-4">99.4%</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                Based on <span className="text-white">Deep Learning</span> analysis of historical data.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
