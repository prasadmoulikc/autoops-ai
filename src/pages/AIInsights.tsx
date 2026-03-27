import { Zap, TrendingUp, TrendingDown, AlertCircle, Target, ArrowUpRight, ArrowDownRight, PieChart } from "lucide-react";

export default function AIInsights() {
  const insights = [
    { title: "Expense Optimization", desc: "Your cloud server costs increased 18% this month. Consider switching to reserved instances to save ₹12,000/month.", type: "warning", icon: TrendingDown, color: "text-yellow-400" },
    { title: "Revenue Growth", desc: "New subscription revenue is up 25% this quarter. AI predicts a 30% increase next quarter if current trends continue.", type: "success", icon: TrendingUp, color: "text-green-400" },
    { title: "GST Threshold Alert", desc: "You are nearing the ₹40L GST threshold. Register now to avoid penalties and enable input tax credit.", type: "danger", icon: AlertCircle, color: "text-red-400" },
    { title: "Smart Budgeting", desc: "You have ₹45,000 remaining in your marketing budget. AI suggests allocating this to LinkedIn Ads for better ROI.", type: "info", icon: Target, color: "text-indigo-400" },
  ];

  return (
    <div className="space-y-10">
      <header className="mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
          AI <span className="text-gradient">Insights</span>
        </h1>
        <p className="subtext text-lg font-medium mt-1">Intelligent analysis and forecasting for your business.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
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
                {insights.map((insight, idx) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-10">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp size={24} className="text-green-400" />
                <h2 className="text-2xl font-bold">Revenue Forecast</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="subtext">Next Month</span>
                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    ₹4.5L <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="subtext">Next Quarter</span>
                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    ₹14.2L <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-green-400 shadow-[0_0_10px_#4ade80]" style={{ width: '85%' }} />
                </div>
                <p className="text-[10px] subtext uppercase tracking-widest text-center">Confidence Level: 92%</p>
              </div>
            </div>

            <div className="glass-card p-10">
              <div className="flex items-center gap-3 mb-8">
                <TrendingDown size={24} className="text-red-400" />
                <h2 className="text-2xl font-bold">Risk Analysis</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="subtext">Burn Rate</span>
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    ₹1.2L/mo <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="subtext">Runway</span>
                  <div className="flex items-center gap-2 text-indigo-400 font-bold">
                    14 Months <TrendingUp size={16} />
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-red-400 shadow-[0_0_10px_#f87171]" style={{ width: '35%' }} />
                </div>
                <p className="text-[10px] subtext uppercase tracking-widest text-center">Risk Level: Low</p>
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
        </div>
      </div>
    </div>
  );
}
