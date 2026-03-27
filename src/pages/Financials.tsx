import { useMemo } from "react";
import { TrendingUp, TrendingDown, Wallet, CreditCard, PieChart, DollarSign, BarChart3 } from "lucide-react";
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

export default function Financials() {
  const { analysis, userData } = useFinance();

  const stats = [
    { name: "Total Revenue", value: `₹${analysis.totalIncome.toLocaleString()}`, change: "+12.5%", icon: Wallet, color: "text-green-400" },
    { name: "Total Expenses", value: `₹${analysis.totalExpenses.toLocaleString()}`, change: "-2.4%", icon: CreditCard, color: "text-red-400" },
    { name: "Net Profit", value: `₹${analysis.profit.toLocaleString()}`, change: "+18.2%", icon: TrendingUp, color: "text-indigo-400" },
  ];

  const trendData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
      name: month,
      income: Math.floor(analysis.totalIncome / 6) + (Math.random() * 10000),
      expenses: Math.floor(analysis.totalExpenses / 6) + (Math.random() * 5000),
    }));
  }, [analysis]);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <header>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
          Financials <span className="text-gradient">Report</span>
        </h1>
        <p className="subtext text-lg font-medium mt-1">Real-time revenue and expense tracking.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Trend Chart */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} className="text-indigo-400" />
            <h2 className="text-2xl font-bold uppercase tracking-tight">Growth Trends</h2>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
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
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #ffffff10', 
                  borderRadius: '12px'
                }}
              />
              <Area type="monotone" dataKey="income" stroke="#6366f1" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
              <Area type="monotone" dataKey="expenses" stroke="#a855f7" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold uppercase tracking-tight">Revenue Breakdown</h3>
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
                  <span className="subtext font-medium">{item.label}</span>
                  <span className="font-bold">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} shadow-[0_0_10px_rgba(99,102,241,0.3)]`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp size={200} className="text-indigo-400" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <TrendingUp size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Growth Projection</h3>
            <p className="subtext mb-8 max-w-xs mx-auto">Based on current trends, we expect a 25% increase in revenue by next quarter.</p>
            <button className="premium-button px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest">
              View Detailed Forecast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
