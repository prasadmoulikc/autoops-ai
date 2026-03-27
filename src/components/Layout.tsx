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
  const location = useLocation();
  const { userData } = useFinance();

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Financials", path: "/financials", icon: DollarSign },
    { name: "Tax Planner", path: "/tax-planner", icon: FileText },
    { name: "AI Insights", path: "/insights", icon: Zap },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

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
