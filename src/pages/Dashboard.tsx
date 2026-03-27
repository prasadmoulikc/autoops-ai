import { useState, useEffect, useMemo } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  Zap, 
  AlertCircle, 
  ArrowUpRight,
  Clock,
  FileWarning,
  CheckCircle2,
  ChevronRight,
  Bell,
  Loader2,
  BarChart3,
  ArrowDownRight,
  Activity,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { analyzeFinance } from "../services/api";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area
} from "recharts";
import { motion } from "motion/react";

export default function Dashboard() {
  const { userData, analysis: localAnalysis, suggestions: localSuggestions, alerts: localAlerts } = useFinance();
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData) return;
      setIsLoading(true);
      try {
        const result = await analyzeFinance({
          income: userData?.income || 0,
          expenses: (userData?.transactions || []).filter(t => t.type === 'expense'),
          transactions: userData?.transactions || [],
          businessType: userData?.businessType || 'General'
        });
        if (result) {
          setApiData(result);
        }
      } catch (error) {
        console.error("Failed to fetch AI analysis:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  const displayData = {
    totalIncome: apiData?.totalIncome ?? localAnalysis?.totalIncome ?? 0,
    totalExpenses: apiData?.totalExpenses ?? localAnalysis?.totalExpenses ?? 0,
    profit: apiData?.profit ?? localAnalysis?.profit ?? 0,
    estimatedTax: apiData?.tax ?? localAnalysis?.estimatedTax ?? 0,
    suggestions: apiData?.insights ?? localSuggestions ?? [],
    alerts: apiData?.alerts ?? localAlerts ?? [],
    complianceScore: apiData?.complianceScore ?? 98
  };

  const chartData = useMemo(() => {
    if (!userData?.transactions) return [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
      name: month,
      income: Math.floor(displayData.totalIncome / 6) + (Math.random() * 5000),
      expenses: Math.floor(displayData.totalExpenses / 6) + (Math.random() * 3000),
    }));
  }, [userData, displayData]);

  const financialCards = [
    { name: "Total Revenue", value: `₹${displayData.totalIncome.toLocaleString()}`, change: "+12.5%", icon: Wallet, color: "text-primary", trend: "up", gradient: "from-primary/10 to-transparent" },
    { name: "Total Expenses", value: `₹${displayData.totalExpenses.toLocaleString()}`, change: "+8.4%", icon: CreditCard, color: "text-danger", trend: "up", gradient: "from-danger/10 to-transparent" },
    { name: "Net Profit", value: `₹${displayData.profit.toLocaleString()}`, change: "+18.2%", icon: TrendingUp, color: "text-success", trend: "up", gradient: "from-success/10 to-transparent" },
    { name: "Estimated Tax", value: `₹${displayData.estimatedTax.toLocaleString()}`, change: "Due in 12d", icon: AlertCircle, color: "text-accent", trend: "neutral", gradient: "from-accent/10 to-transparent" },
  ];

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
            Overview <span className="text-primary tracking-normal">v3.0</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="subtext text-lg font-medium mt-1">
            Intelligent financial management for <span className="text-white font-bold">Modern Enterprise</span>
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-3 border-primary/20 bg-primary/5">
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            ) : (
              <Activity className="w-4 h-4 text-primary animate-pulse-soft" />
            )}
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {isLoading ? "AI Analyzing..." : "AI Sync Active"}
            </span>
          </div>
        </motion.div>
      </header>
      
      {/* Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialCards.map((card, idx) => (
          <motion.div 
            key={card.name} 
            variants={itemVariants}
            whileHover={{ scale: 1.03, translateY: -5 }}
            className={`glass-card p-6 relative overflow-hidden group bg-gradient-to-br ${card.gradient}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-inner`}>
                <card.icon size={24} className={card.color} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-[10px] font-black ${card.trend === 'up' ? 'text-success' : card.trend === 'down' ? 'text-danger' : 'text-accent'}`}>
                {card.change}
                {card.trend === 'up' ? <ArrowUpRight size={14} /> : card.trend === 'down' ? <ArrowDownRight size={14} /> : null}
              </div>
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">{card.name}</h3>
            <p className="text-3xl font-black text-white tracking-tight">{card.value}</p>
            
            {/* Subtle background glow on hover */}
            <div className={`absolute -bottom-10 -right-10 w-24 h-24 blur-[40px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${card.color.replace('text', 'bg')}`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Cash Flow Analysis</h2>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Monthly Performance</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#3B82F6]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_#818cf8]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Expenses</span>
                </div>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 8 }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '16px',
                      padding: '12px 16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                    }}
                    itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    labelStyle={{ fontSize: '12px', fontWeight: '900', marginBottom: '8px', color: 'white' }}
                  />
                  <Bar dataKey="income" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={24} />
                  <Bar dataKey="expenses" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="glass-card p-8 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
              <Zap size={240} className="text-primary" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Zap size={24} className="text-primary animate-pulse-soft" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">AI Recommendations</h2>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Smart Business Strategy</p>
                  </div>
                </div>
                <button className="text-[10px] font-black text-primary hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
                  View All <ArrowRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayData.suggestions.slice(0, 4).map((text: string, idx: number) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer group/item"
                  >
                    <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover/item:scale-110 transition-transform">
                      <Sparkles size={18} />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-white/70 group-hover/item:text-white transition-colors">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Panel */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Smart Alerts */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
                <Bell size={20} className="text-danger" />
              </div>
              <h2 className="text-lg font-black uppercase tracking-tight">Priority Alerts</h2>
            </div>
            <div className="space-y-4">
              {displayData.alerts.map((text: string, idx: number) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-white/5 border-l-4 border-primary hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle size={16} className="text-primary group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{text}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tax Usage Progress */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Tax Liability</h3>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Current Estimate</p>
              </div>
              <span className="text-xl font-black text-primary">₹{displayData.estimatedTax.toLocaleString()}</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-4 p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '66%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
              />
            </div>
            <p className="text-[10px] font-bold text-white/40 leading-relaxed">
              Calculated based on current profit and <span className="text-white">Indian New Tax Regime</span> slabs.
            </p>
          </div>

          {/* Compliance Score */}
          <div className="glass-card p-8 bg-gradient-to-br from-success/10 to-transparent border-success/20 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 size={28} className="text-success" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Health Score</h3>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Business Compliance</p>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-5xl font-black text-white">{displayData.complianceScore}</p>
              <p className="text-xl font-black text-white/20">/100</p>
            </div>
            <p className="text-[10px] font-bold text-success uppercase tracking-widest animate-pulse-soft">Excellent Compliance Status</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
