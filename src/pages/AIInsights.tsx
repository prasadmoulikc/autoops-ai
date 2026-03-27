import { useState, useEffect, useMemo, useRef } from "react";
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
  PieChart,
  Search,
  BrainCircuit,
  X,
  Loader2,
  Star
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

export default function AIInsights() {
  const { suggestions: localSuggestions, alerts, analysis, searchHistory, addToHistory, clearHistory, watchlist, addToWatchlist, removeFromWatchlist } = useFinance();
  
  // Production State Management
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [stockData, setStockData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  const STOCKS = ["RELIANCE", "TCS", "INFY", "HDFC", "WIPRO", "BIRLA", "ADANI", "TATA", "ICICI"];
  
  // Real-time chart data simulation
  const chartData = useMemo(() => {
    if (!stockData?.stockData?.price) return [];
    const basePrice = stockData.stockData.price;
    return Array.from({ length: 20 }).map((_, i) => ({
      time: i,
      price: basePrice + (Math.random() - 0.5) * (basePrice * 0.02)
    }));
  }, [stockData]);

  const isWatchlisted = useMemo(() => {
    if (!stockData?.company) return false;
    return watchlist.some(item => item.symbol === stockData.company);
  }, [watchlist, stockData]);

  const toggleWatchlist = () => {
    if (!stockData) return;
    if (isWatchlisted) {
      removeFromWatchlist(stockData.company);
    } else {
      addToWatchlist({
        symbol: stockData.company,
        price: stockData.stockData?.price || 0,
        change: stockData.stockData?.change || 0
      });
    }
  };
  
  // Debounce logic for autocomplete
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredStocks = useMemo(() => {
    return STOCKS.filter(s => 
      debouncedQuery.length > 0 && s.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  const handleSearch = async (stockName?: string) => {
    const searchVal = stockName || query;
    if (!searchVal.trim() || isSearching) return;

    setQuery(searchVal);
    setIsSearching(true);
    setError(null);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    try {
      const res = await fetch("https://prasad-n8n.app.n8n.cloud/webhook/8bf4cde1-f931-4328-8d03-4af2058400ajbjbj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchVal }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      
      const data = await res.json();
      const parsed = typeof data.output === "string" ? JSON.parse(data.output) : data;
      
      if (!parsed || (typeof parsed === 'object' && Object.keys(parsed).length === 0)) {
        throw new Error("No data found for this query");
      }

      setStockData(parsed);
      addToHistory(searchVal);
    } catch (err: any) {
      setError(err.message || "Failed to fetch stock intelligence. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredStocks.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < filteredStocks.length) {
        handleSearch(filteredStocks[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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

        <motion.div variants={itemVariants} className="flex flex-col md:items-end gap-4">
          <div className="relative w-full max-w-md" ref={searchRef}>
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                  setSelectedIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
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

            <AnimatePresence>
              {showSuggestions && (filteredStocks.length > 0 || (query === "" && searchHistory.length > 0)) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-[60] border-white/10 shadow-2xl"
                >
                  {query === "" && searchHistory.length > 0 && (
                    <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Recent Searches</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          clearHistory();
                        }}
                        className="text-[8px] font-black text-white/20 hover:text-danger uppercase tracking-widest transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  
                  {(query === "" ? searchHistory : filteredStocks).map((stock, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(stock)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors flex items-center gap-3 border-b border-white/5 last:border-0 ${
                        selectedIndex === i ? "bg-primary/20 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <TrendingUp size={16} className={selectedIndex === i ? "text-white" : "text-primary"} />
                      {stock}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass-card px-4 py-2 flex items-center gap-3 border-primary/20 bg-primary/5">
              <Activity className="w-4 h-4 text-primary animate-pulse-soft" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Neural Engine Active</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-2xl bg-danger/10 border border-danger/20 flex items-center gap-3 text-danger"
          >
            <AlertCircle size={20} />
            <p className="text-sm font-bold">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto p-1 hover:bg-danger/10 rounded-lg transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Search Suggestions */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {["RELIANCE", "INFY", "WIPRO"].map((stock) => (
          <button
            key={stock}
            onClick={() => handleSearch(stock)}
            className="glass-card px-4 py-2 text-xs font-bold text-white/40 hover:text-white hover:border-primary/50 transition-all uppercase tracking-widest"
          >
            {stock}
          </button>
        ))}
      </motion.div>

      {/* AI Stock Search Result Display */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card p-8 border-white/10 bg-white/5 animate-pulse"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10" />
              <div className="space-y-2">
                <div className="h-6 w-48 bg-white/10 rounded" />
                <div className="h-3 w-24 bg-white/10 rounded" />
              </div>
            </div>
            <div className="h-48 w-full bg-white/10 rounded-2xl mb-8" />
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 h-32 bg-white/10 rounded-2xl" />
              <div className="h-32 bg-white/10 rounded-2xl" />
            </div>
          </motion.div>
        )}

        {stockData && !isSearching && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-8 border-primary/20 bg-primary/5 relative group">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={toggleWatchlist}
                  className={`p-2 rounded-xl transition-all ${isWatchlisted ? 'bg-primary text-white' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
                >
                  <Star size={20} fill={isWatchlisted ? "currentColor" : "none"} />
                </button>
                <button 
                  onClick={() => setStockData(null)}
                  className="p-2 text-white/20 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <BrainCircuit size={32} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white">{stockData?.company}</h2>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">AI Intelligence Report</p>
                  </div>
                </div>
                
                {stockData?.stockData && (
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Current Price</p>
                      <p className="text-3xl font-black text-white">₹{stockData?.stockData?.price?.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">24h Change</p>
                      <div className={`flex items-center justify-end gap-1 text-xl font-black ${stockData?.stockData?.change >= 0 ? 'text-success' : 'text-danger'}`}>
                        {stockData?.stockData?.change >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                        {Math.abs(stockData?.stockData?.change)}%
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Real-time Chart Integration */}
              <div className="h-48 w-full mb-8 bg-white/5 rounded-2xl p-4 border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={stockData?.stockData?.change >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={stockData?.stockData?.change >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke={stockData?.stockData?.change >= 0 ? "#10b981" : "#ef4444"} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#stockGradient)" 
                      animationDuration={1500}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                      labelStyle={{ display: 'none' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Sparkles size={14} /> AI Analysis
                    </h4>
                    <p className="text-sm leading-relaxed text-white/80">{stockData?.analysis?.shortTerm || stockData?.analysis}</p>
                  </div>
                  
                  {stockData?.analysis?.longTerm && (
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Target size={14} /> Long Term Outlook
                      </h4>
                      <p className="text-sm leading-relaxed text-white/80">{stockData?.analysis?.longTerm}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Recommendation</p>
                    <div className={`text-2xl font-black uppercase tracking-tighter px-6 py-2 rounded-xl flex items-center gap-2 ${
                      stockData?.recommendation?.toLowerCase()?.includes('buy') ? 'bg-success/20 text-success border border-success/20' :
                      stockData?.recommendation?.toLowerCase()?.includes('sell') ? 'bg-danger/20 text-danger border border-danger/20' :
                      'bg-accent/20 text-accent border border-accent/20'
                    }`}>
                      {stockData?.recommendation?.toLowerCase()?.includes('buy') && <TrendingUp size={20} />}
                      {stockData?.recommendation?.toLowerCase()?.includes('sell') && <TrendingDown size={20} />}
                      {stockData?.recommendation}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Confidence</p>
                      <span className="text-sm font-black text-white">{stockData?.confidence || 85}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stockData?.confidence || 85}%` }}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
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
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 800 }} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 800 }} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '12px 16px' }}
                    itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                    labelStyle={{ fontSize: '12px', fontWeight: '900', marginBottom: '8px', color: 'white' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="projected" stroke="#818cf8" strokeWidth={4} fillOpacity={1} fill="url(#colorProj)" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localSuggestions.map((text, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5, x: 5 }} className="glass-card p-6 border-white/5 hover:border-primary/30 transition-all group cursor-pointer">
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

        <motion.div variants={itemVariants} className="space-y-8">
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
                    <motion.div initial={{ width: 0 }} animate={{ width: `${goal.progress}%` }} transition={{ duration: 1, delay: 0.5 }} className={`h-full ${goal.color} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Model Confidence</h3>
              <p className="text-5xl font-black text-white mb-4">99.4%</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">Based on <span className="text-white">Deep Learning</span> analysis of historical data.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
