import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  DollarSign, 
  ScrollText, 
  Settings, 
  Menu, 
  X,
  ChevronDown,
  ChevronRight,
  Bell,
  Search,
  Zap,
  TrendingUp,
  AlertCircle,
  FileText,
  ShieldCheck,
  PieChart,
  Target
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Financials", path: "/financials", icon: DollarSign },
    { name: "Tax Planner", path: "/tax-planner", icon: FileText },
    { name: "AI Insights", path: "/insights", icon: Zap },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const megaMenuContent = {
    Products: [
      { name: "Income Tracking", icon: TrendingUp },
      { name: "Expense Management", icon: DollarSign },
      { name: "GST Tracking", icon: ShieldCheck },
      { name: "Tax Reports", icon: FileText },
      { name: "Profit Analysis", icon: PieChart },
    ],
    AITools: [
      { name: "Tax Saving Suggestions", icon: Zap },
      { name: "Expense Optimization", icon: Target },
      { name: "Risk Alerts", icon: AlertCircle },
      { name: "Smart Budgeting", icon: LayoutDashboard },
      { name: "Forecasting", icon: TrendingUp },
    ],
    Insights: [
      { name: "Monthly Summary", icon: ScrollText },
      { name: "Cash Flow", icon: DollarSign },
      { name: "Upcoming Deadlines", icon: Bell },
      { name: "Alerts & Notifications", icon: AlertCircle },
    ]
  };

  useEffect(() => {
    setIsSidebarOpen(false);
    setActiveMegaMenu(null);
  }, [location.pathname]);

  // Close mega menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white relative bg-[#020617]">
      {/* Subtle Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }} 
          />
        ))}
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass-card rounded-none border-x-0 border-t-0 px-6 py-4 flex items-center justify-between bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <span className="text-xl">🤖</span>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter hidden md:block">AutoOps <span className="text-gradient">AI</span></h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu(item.name)}
              >
                <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors ${location.pathname === item.path ? "text-indigo-400" : "subtext hover:text-white"}`}>
                  {item.name}
                  <ChevronDown size={14} className={`transition-transform ${activeMegaMenu === item.name ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center glass-card bg-white/5 border-white/10 px-4 py-2 rounded-xl">
            <Search size={18} className="subtext mr-2" />
            <input type="text" placeholder="Search financials..." className="bg-transparent border-none focus:outline-none text-sm w-48" />
          </div>
          <button className="relative p-2 glass-card rounded-xl hover:bg-white/10 transition-colors">
            <Bell size={20} className="subtext" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]" />
          </button>
          <div className="w-10 h-10 premium-button rounded-xl flex items-center justify-center font-black border border-white/20">A</div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 glass-card rounded-xl"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMegaMenu && (
          <div 
            ref={menuRef}
            className="absolute top-full left-0 w-full glass-card rounded-none border-x-0 border-b-indigo-500/20 bg-[#020617]/95 backdrop-blur-2xl p-12 animate-in fade-in slide-in-from-top-4 duration-300"
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">Products</h3>
                <ul className="space-y-4">
                  {megaMenuContent.Products.map((p) => (
                    <li key={p.name} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                        <p.icon size={16} className="subtext group-hover:text-indigo-400" />
                      </div>
                      <span className="text-sm font-medium subtext group-hover:text-white transition-colors">{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-6">AI Tools</h3>
                <ul className="space-y-4">
                  {megaMenuContent.AITools.map((p) => (
                    <li key={p.name} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        <p.icon size={16} className="subtext group-hover:text-purple-400" />
                      </div>
                      <span className="text-sm font-medium subtext group-hover:text-white transition-colors">{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-6">Insights</h3>
                <ul className="space-y-4">
                  {megaMenuContent.Insights.map((p) => (
                    <li key={p.name} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <p.icon size={16} className="subtext group-hover:text-cyan-400" />
                      </div>
                      <span className="text-sm font-medium subtext group-hover:text-white transition-colors">{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">Smart Tax Planner</h3>
                  <p className="text-xs subtext leading-relaxed mb-4">
                    Save up to <span className="text-white font-bold">₹50,000</span> in taxes this quarter with our AI-driven optimization engine.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-6">
                    <AlertCircle size={14} />
                    GST filing due in 5 days
                  </div>
                </div>
                <button className="premium-button w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest">
                  Optimize Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Mobile & Secondary) */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-72 glass-card rounded-none border-y-0 border-l-0 
          transform transition-transform duration-300 ease-in-out bg-[#020617]/95
          lg:relative lg:translate-x-0 lg:bg-transparent
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="p-8">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center justify-between p-4 rounded-xl transition-all group
                      ${isActive 
                        ? "bg-white/10 border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                        : "hover:bg-white/5 border border-transparent"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={isActive ? "text-indigo-400" : "subtext group-hover:text-white"} />
                      <span className={`font-medium ${isActive ? "text-white" : "subtext group-hover:text-white"}`}>
                        {item.name}
                      </span>
                    </div>
                    {isActive && <ChevronRight size={16} className="text-indigo-400" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative z-10">
          <div className="p-6 md:p-12 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
