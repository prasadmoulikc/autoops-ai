import { useState, useEffect } from "react";
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
  Loader2
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { analyzeFinance } from "../services/api";

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

  // Fail-safe: Use API data if available, otherwise fallback to local analysis
  const displayData = {
    totalIncome: apiData?.totalIncome ?? localAnalysis?.totalIncome ?? 0,
    totalExpenses: apiData?.totalExpenses ?? localAnalysis?.totalExpenses ?? 0,
    profit: apiData?.profit ?? localAnalysis?.profit ?? 0,
    estimatedTax: apiData?.tax ?? localAnalysis?.estimatedTax ?? 0,
    suggestions: apiData?.insights ?? localSuggestions ?? [],
    alerts: apiData?.alerts ?? localAlerts ?? [],
    complianceScore: apiData?.complianceScore ?? 98
  };

  const financialCards = [
    { name: "Total Revenue", value: `₹${displayData.totalIncome.toLocaleString()}`, change: "+12.5%", icon: Wallet, color: "text-green-400", trend: "up" },
    { name: "Total Expenses", value: `₹${displayData.totalExpenses.toLocaleString()}`, change: "+8.4%", icon: CreditCard, color: "text-red-400", trend: "up" },
    { name: "Net Profit", value: `₹${displayData.profit.toLocaleString()}`, change: "+18.2%", icon: TrendingUp, color: "text-indigo-400", trend: "up" },
    { name: "Estimated Tax", value: `₹${displayData.estimatedTax.toLocaleString()}`, change: "Due in 12d", icon: AlertCircle, color: "text-purple-400", trend: "neutral" },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Overview <span className="text-gradient">v3.0</span>
          </h1>
          <p className="subtext text-lg font-medium mt-1">Intelligent financial management for <span className="text-white">Modern Enterprise</span></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
            ) : (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
            )}
            <span className="text-xs font-bold uppercase tracking-widest">{isLoading ? "AI Analyzing..." : "AI Sync Active"}</span>
          </div>
        </div>
      </header>
      
      {/* Financial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialCards.map((card) => (
          <div key={card.name} className="glass-card p-6 group hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <card.icon size={20} className={card.color} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${card.trend === 'up' ? 'text-green-400' : card.trend === 'down' ? 'text-red-400' : 'text-purple-400'}`}>
                {card.change}
                {card.trend === 'up' && <ArrowUpRight size={14} />}
              </div>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest subtext mb-1">{card.name}</h3>
            <p className="text-3xl font-black text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Insights Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={120} className="text-indigo-400" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Zap size={24} className="text-indigo-400" />
                <h2 className="text-2xl font-bold uppercase tracking-tight">AI Recommendations</h2>
              </div>
              <div className="space-y-4">
                {displayData.suggestions.map((text: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                      <Zap size={18} />
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <button className="mt-8 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
                View All Insights <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Tax Usage Progress */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Tax Liability Progress</h3>
              <span className="text-sm font-bold text-purple-400">₹{displayData.estimatedTax.toLocaleString()} / ₹{(displayData.estimatedTax * 1.5).toLocaleString()}</span>
            </div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.4)]" style={{ width: '66%' }} />
            </div>
            <p className="text-xs subtext">You have utilized 66% of your estimated tax provision for this fiscal year.</p>
          </div>
        </div>

        {/* Smart Alerts */}
        <div className="space-y-6">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bell size={20} className="text-indigo-400" />
              Smart Alerts
            </h2>
            <div className="space-y-4">
              {displayData.alerts.map((text: string, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border-l-4 border-indigo-500 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-1">
                    <AlertCircle size={16} className="text-indigo-400" />
                    <h4 className="text-sm font-bold">{text}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 size={24} className="text-green-400" />
              <h3 className="text-lg font-bold">Compliance Score</h3>
            </div>
            <p className="text-4xl font-black text-white mb-2">{displayData.complianceScore}/100</p>
            <p className="text-xs subtext">Your business is fully compliant with current tax regulations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
