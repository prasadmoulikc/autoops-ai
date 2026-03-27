import { TrendingUp, TrendingDown, Wallet, CreditCard, PieChart, DollarSign } from "lucide-react";
import { useFinance } from "../context/FinanceContext";

export default function Financials() {
  const { analysis } = useFinance();

  const stats = [
    { name: "Total Revenue", value: `₹${analysis.totalIncome.toLocaleString()}`, change: "+12.5%", icon: Wallet, color: "text-green-400" },
    { name: "Total Expenses", value: `₹${analysis.totalExpenses.toLocaleString()}`, change: "-2.4%", icon: CreditCard, color: "text-red-400" },
    { name: "Net Profit", value: `₹${analysis.profit.toLocaleString()}`, change: "+18.2%", icon: TrendingUp, color: "text-indigo-400" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
          Financials <span className="text-gradient">Report</span>
        </h1>
        <p className="subtext text-lg font-medium mt-1">Real-time revenue and expense tracking.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="glass-card p-8 group">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest subtext">{stat.name}</h2>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
              <div className="flex items-center gap-2">
                {stat.change.startsWith("+") ? <TrendingUp size={14} className="text-green-400" /> : <TrendingDown size={14} className="text-red-400" />}
                <span className={`text-xs font-bold ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {stat.change} vs last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Revenue Breakdown</h3>
            <PieChart size={20} className="subtext" />
          </div>
          <div className="space-y-6">
            {[
              { label: "AI Agent Subscriptions", value: 65, color: "bg-indigo-500" },
              { label: "API Usage Fees", value: 25, color: "bg-purple-500" },
              { label: "Consulting Services", value: 10, color: "bg-cyan-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="subtext">{item.label}</span>
                  <span className="font-bold">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
            <TrendingUp size={32} className="text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Growth Projection</h3>
          <p className="subtext mb-8">Based on current trends, we expect a 25% increase in revenue by next quarter.</p>
          <button className="premium-button px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest">
            View Detailed Forecast
          </button>
        </div>
      </div>
    </div>
  );
}
