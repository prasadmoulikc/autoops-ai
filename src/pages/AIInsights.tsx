import { Zap, TrendingUp, TrendingDown, AlertCircle, Target, ArrowUpRight, ArrowDownRight, PieChart, BarChart3 } from "lucide-react";
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

export default function AIInsights() {
  const { analysis, suggestions, alerts } = useFinance();

  const insightItems = [
    ...suggestions.map(s => ({ title: "Tax Strategy", desc: s, type: "success", icon: Zap, color: "text-green-400" })),
    ...alerts.map(a => ({ title: "Finance Alert", desc: a, type: "warning", icon: AlertCircle, color: "text-yellow-400" })),
  ];

  const forecastData = [
    { name: "Current", revenue: analysis.totalIncome },
    { name: "Month 1", revenue: analysis.totalIncome * 1.08 },
    { name: "Month 2", revenue: analysis.totalIncome * 1.15 },
    { name: "Month 3", revenue: analysis.totalIncome * 1.25 },
    { name: "Month 4", revenue: analysis.totalIncome * 1.32 },
    { name: "Month 5", revenue: analysis.totalIncome * 1.45 },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            AI <span className="text-gradient">Insights</span>
          </h1>
          <p className="subtext text-lg font-medium mt-1">Intelligent analysis and forecasting for your business.</p>
        </div>
        <div className="glass-card px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_8px_#818cf8]" />
          <span className="text-xs font-bold uppercase tracking-widest">AI Engine v4.2 Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Forecast Chart */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp size={24} className="text-indigo-400" />
                <h2 className="text-2xl font-bold uppercase tracking-tight">Revenue Forecast (6 Months)</h2>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #ffffff10', 
                      borderRadius: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorForecast)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Zap size={200} className="text-indigo-400" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Zap size={24} className="text-indigo-400" />
                <h2 className="text-2xl font-bold uppercase tracking-tight">Active Recommendations</h2>
              </div>
              <div className="space-y-6">
                {insightItems.map((insight, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-white/5 ${insight.color}`}>
                        <insight.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-lg">{insight.title}</h3>
                          <ArrowUpRight size={18} className="subtext group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-sm subtext leading-relaxed">{insight.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
              <PieChart size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Cash Flow Health</h3>
            <p className="text-5xl font-black text-white mb-4">9.2/10</p>
            <p className="text-sm subtext leading-relaxed mb-8">
              Your cash flow is <span className="text-indigo-400 font-bold">excellent</span>. You have sufficient liquidity to cover all upcoming liabilities.
            </p>
            <button className="premium-button w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm">
              View Cash Flow
            </button>
          </div>

          <div className="glass-card p-8 bg-white/5 border-white/10">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Target size={18} className="text-cyan-400" />
              Smart Goal
            </h4>
            <p className="text-xs subtext leading-relaxed mb-4">
              You are on track to reach your annual revenue goal of ₹50L. Current progress: <span className="text-white font-bold">₹32.4L (65%)</span>.
            </p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" style={{ width: '65%' }} />
            </div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown size={20} className="text-red-400" />
              <h4 className="font-bold">Burn Rate Analysis</h4>
            </div>
            <p className="text-xs subtext leading-relaxed mb-4">
              Your monthly burn rate is ₹{analysis.totalExpenses.toLocaleString()}. With current revenue, your runway is <span className="text-white font-bold">Infinite</span>.
            </p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-red-400 shadow-[0_0_10px_#f87171]" style={{ width: '25%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
