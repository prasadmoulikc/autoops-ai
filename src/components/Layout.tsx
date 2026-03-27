import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  DollarSign, 
  Settings, 
  Menu, 
  X,
  ChevronRight,
  Bell,
  Search,
  Zap,
  TrendingUp,
  AlertCircle,
  FileText,
  ShieldCheck,
  PieChart,
  Target,
  Loader2,
  BrainCircuit,
  TrendingDown,
  LogOut,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { searchAI } from "../services/api";
import { useFinance } from "../context/FinanceContext";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const { userData } = useFinance();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setShowResults(true);
    setSearchResult(null);
    try {
      const data = await searchAI(searchQuery);
      setSearchResult(data);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResult({
        error: "Something went wrong with the AI analysis. Please try again."
      });
    } finally {
      setIsSearching(false);
    }
  };

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Financials", path: "/financials", icon: DollarSign },
    { name: "Tax Planner", path: "/tax-planner", icon: FileText },
    { name: "AI Insights", path: "/insights", icon: Zap },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white relative bg-[#020617] overflow-hidden">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass-card rounded-none border-x-0 border-t-0 px-6 py-3 flex items-center justify-between bg-white/5 backdrop-blur-xl border-b-white/10">
        <div className="flex items-center gap-8 flex-1">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden md:block">
              Fin<span className="text-primary">Flow</span>
            </h1>
          </Link>

          {/* Desktop Menu - Scrollable on small screens */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-1 max-w-xl">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap flex items-center gap-2 relative group ${
                  location.pathname === item.path 
                    ? 'text-primary' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <item.icon size={14} className={location.pathname === item.path ? 'animate-pulse-soft' : 'group-hover:scale-110 transition-transform'} />
                {item.name}
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="top-nav-active"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full shadow-[0_0_10px_#3B82F6]"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6 justify-end flex-1">
          {/* Premium Search Bar */}
          <div className="relative hidden lg:block w-full max-w-xs" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative group">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search AI Intelligence..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-12 text-xs font-bold focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-white/20 placeholder:font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-black text-white/20 pointer-events-none">
                <span>⌘</span>
                <span>K</span>
              </div>
              {isSearching && <Loader2 size={14} className="absolute right-12 top-1/2 -translate-y-1/2 animate-spin text-primary" />}
            </form>
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showResults && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-3 w-[400px] glass-card p-6 z-50 shadow-2xl border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BrainCircuit size={16} className="text-primary" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-white">AI Financial Analysis</h4>
                    </div>
                    <button onClick={() => setShowResults(false)} className="text-white/40 hover:text-white">
                      <X size={16} />
                    </button>
                  </div>

                  {isSearching ? (
                    <div className="flex flex-col items-center py-8 gap-4">
                      <Loader2 size={32} className="animate-spin text-primary" />
                      <p className="text-sm text-white/40 animate-pulse">Processing financial query...</p>
                    </div>
                  ) : searchResult?.error ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <AlertCircle size={18} className="text-red-400 shrink-0" />
                      <p className="text-sm font-medium text-red-400">{searchResult.error}</p>
                    </div>
                  ) : searchResult ? (
                    <div className="space-y-4">
                      {searchResult.stockData && (
                        <div className="space-y-3">
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                              <h2 className="text-lg font-black text-white uppercase tracking-tight">{searchResult.company || searchResult.stockData.symbol}</h2>
                              <div className={`flex items-center gap-1 text-sm font-black ${searchResult.stockData.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                {searchResult.stockData.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                {Math.abs(searchResult.stockData.change)}%
                              </div>
                            </div>
                            <p className="text-2xl font-black text-white">₹{(searchResult.stockData.price || 0).toLocaleString()}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                              <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1">Market Cap</p>
                              <p className="text-xs font-bold text-white">{searchResult.stockData.marketCap || "N/A"}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                              <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1">P/E Ratio</p>
                              <p className="text-xs font-bold text-white">{searchResult.stockData.peRatio || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Insights</p>
                        <p className="text-sm leading-relaxed text-white/80">{searchResult.analysis}</p>
                      </div>

                      {searchResult.prediction && (
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                          <p className="text-[10px] font-bold text-primary uppercase mb-2">Prediction</p>
                          <p className="text-sm text-white/90 italic">"{searchResult.prediction}"</p>
                        </div>
                      )}

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Recommendation</p>
                          <p className="text-sm font-black text-primary uppercase tracking-widest">{searchResult.recommendation || "HOLD"}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Confidence</p>
                          <p className="text-sm font-black text-white">{searchResult.confidence || "85"}%</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-[#020617]" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-1 hidden sm:block" />
            <button className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-white/5 transition-colors group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/20">
                {userData.businessName?.charAt(0) || 'B'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-none mb-0.5">{userData.businessName || 'Business'}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-tighter">Pro Plan</p>
              </div>
            </button>
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-white/40 hover:text-white"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Premium Sidebar (Desktop) */}
        <aside 
          className={`hidden lg:flex flex-col glass-card rounded-none border-y-0 border-l-0 border-r-white/10 transition-all duration-500 ease-in-out ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="flex-1 py-8 px-4 space-y-8">
            <div className="space-y-2">
              <p className={`text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-4 mb-4 transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>
                Menu
              </p>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative ${
                    location.pathname === item.path 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={24} className={`transition-transform group-hover:scale-110 ${location.pathname === item.path ? 'text-primary' : ''}`} />
                  {isSidebarOpen && (
                    <span className="font-bold tracking-wide text-sm uppercase">{item.name}</span>
                  )}
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_#3B82F6]"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="space-y-2 pt-8 border-t border-white/5">
              <p className={`text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-4 mb-4 transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>
                Support
              </p>
              <button className="w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
                <ShieldCheck size={24} className="group-hover:text-success transition-colors" />
                {isSidebarOpen && <span className="font-bold text-sm uppercase">Security</span>}
              </button>
              <button className="w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
                <HelpCircle size={24} className="group-hover:text-primary transition-colors" />
                {isSidebarOpen && <span className="font-bold text-sm uppercase">Help Center</span>}
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-white/5">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
            >
              {isSidebarOpen ? <ChevronRight size={20} className="rotate-180" /> : <ChevronRight size={20} />}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-transparent relative">
          <div className="max-w-[1400px] mx-auto p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
          
          {/* Subtle Background Glows */}
          <div className="fixed top-1/4 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="fixed bottom-1/4 -left-20 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </main>
      </div>
      <ChatBot />
    </div>
  );
}
