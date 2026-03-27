import { useState, useEffect, useMemo, useRef } from "react";
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
  Sparkles,
  Search,
  BrainCircuit,
  X,
  Target
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
import { motion, AnimatePresence } from "motion/react";

export default function Dashboard() {
  const { userData, analysis: localAnalysis, suggestions: localSuggestions, alerts: localAlerts } = useFinance();
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Search State
  const [query, setQuery] = useState("");
  const [stockData, setStockData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const STOCKS = ["RELIANCE", "TCS", "INFY", "HDFC", "WIPRO", "BIRLA", "ADANI", "TATA", "ICICI"];
  const filteredStocks = STOCKS.filter(s => 
    query.length > 0 && s.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = async (queryToSearch?: string) => {
    const searchVal = typeof queryToSearch === 'string' ? queryToSearch : query;
    if (!searchVal.trim()) return;

    if (typeof queryToSearch === 'string') {
      setQuery(queryToSearch);
    }

    setIsSearching(true);
    setShowSuggestions(false);
    try {
      const res = await fetch("https://prasad-n8n.app.n8n.cloud/webhook/8bf4cde1-f931-4328-8d03-4af2058400ajbjbj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchVal }),
      });

      const data = await res.json();

      const parsed = typeof data.output === "string"
        ? JSON.parse(data.output)
        : data;

      setStockData(parsed);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        
        <motion.div variants={itemVariants} className="flex flex-col md:items-end gap-4">
          {/* Search Bar in Dashboard */}
          <div className="relative w-full max-w-md" ref={searchRef}>
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search stock (RELIANCE)" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-sm font-bold focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-white/20"
              />
              <button 
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
              >
                {isSearching ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
              </button>
            </div>

            {/* Autosuggest Dropdown */}
            <AnimatePresence>
              {showSuggestions && filteredStocks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-[60] border-white/10 shadow-2xl"
                >
                  {filteredStocks.map((stock, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(stock)}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                    >
                      <TrendingUp size={16} className="text-primary" />
                      {stock}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
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
          </div>
        </motion.div>
      </header>

      {/* AI Stock Search Result Display */}
      <AnimatePresence>
        {stockData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-8 border-primary/20 bg-primary/5 relative group">
              <button 
                onClick={() => setStockData(null)}
                className="absolute top-4 right-4 p-2 text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <BrainCircuit size={32} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white">{stockData.company}</h2>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">AI Intelligence Report</p>
                  </div>
                </div>
                
                {stockData.stockData && (
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Current Price</p>
                      <p className="text-3xl font-black text-white">₹{stockData.stockData.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">24h Change</p>
                      <div className={`flex items-center justify-end gap-1 text-xl font-black ${stockData.stockData.change >= 0 ? 'text-success' : 'text-danger'}`}>
                        {stockData.stockData.change >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                        {Math.abs(stockData.stockData.change)}%
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Sparkles size={14} /> AI Analysis
                    </h4>
                    <p className="text-sm leading-relaxed text-white/80">{stockData.analysis?.shortTerm || stockData.analysis}</p>
                  </div>
                  
                  {stockData.analysis?.longTerm && (
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Target size={14} /> Long Term Outlook
                      </h4>
                      <p className="text-sm leading-relaxed text-white/80">{stockData.analysis.longTerm}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Recommendation</p>
                    <div className={`text-2xl font-black uppercase tracking-tighter px-6 py-2 rounded-xl ${
                      stockData.recommendation?.toLowerCase().includes('buy') ? 'bg-success/20 text-success border border-success/20' :
                      stockData.recommendation?.toLowerCase().includes('sell') ? 'bg-danger/20 text-danger border border-danger/20' :
                      'bg-accent/20 text-accent border border-accent/20'
                    }`}>
                      {stockData.recommendation}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Confidence</p>
                      <span className="text-sm font-black text-white">{stockData.confidence || 85}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stockData.confidence || 85}%` }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
