import { useMemo, useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Filter,
  Download,
  Search,
  ChevronRight,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
  ArrowRight,
  Wallet,
  CreditCard
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
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion } from "motion/react";

export default function Financials() {
  const { userData, analysis } = useFinance();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = useMemo(() => {
    if (!userData?.transactions) return [];
    return userData.transactions.filter(t => 
      (t.description || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
      (t.category || "").toLowerCase().includes((searchTerm || "").toLowerCase())
    );
  }, [userData?.transactions, searchTerm]);

  const chartData = useMemo(() => {
    if (!userData?.transactions) return [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
      name: month,
      revenue: Math.floor((analysis?.totalIncome || 120000) / 6) + (Math.random() * 10000),
      expenses: Math.floor((analysis?.totalExpenses || 80000) / 6) + (Math.random() * 5000),
    }));
  }, [userData, analysis]);

  const expenseCategories = useMemo(() => {
    const categories: Record<string, number> = {};
    userData?.transactions.filter(t => t.type === 'expense').forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [userData]);

  const COLORS = ['#3B82F6', '#818cf8', '#c084fc', '#f472b6', '#fb7185'];

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

  const stats = [
    { name: "Total Revenue", value: `₹${(analysis?.totalIncome || 0).toLocaleString()}`, change: "+12.5%", icon: Wallet, color: "text-primary", trend: "up", gradient: "from-primary/10 to-transparent" },
    { name: "Total Expenses", value: `₹${(analysis?.totalExpenses || 0).toLocaleString()}`, change: "-2.4%", icon: CreditCard, color: "text-danger", trend: "down", gradient: "from-danger/10 to-transparent" },
    { name: "Net Profit", value: `₹${(analysis?.profit || 0).toLocaleString()}`, change: "+18.2%", icon: TrendingUp, color: "text-success", trend: "up", gradient: "from-success/10 to-transparent" },
  ];

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
            Financials <span className="text-primary tracking-normal">v3.0</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="subtext text-lg font-medium mt-1">
            Deep-dive into your <span className="text-white font-bold">Revenue & Cash Flow</span>
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <button className="glass-card px-6 py-3 flex items-center gap-3 border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest">
            <Download size={16} className="text-primary" />
            Export Report
          </button>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.name} 
            variants={itemVariants}
            whileHover={{ scale: 1.03, translateY: -5 }}
            className={`glass-card p-6 relative overflow-hidden group bg-gradient-to-br ${stat.gradient}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-inner`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-[10px] font-black ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">{stat.name}</h3>
            <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue vs Expenses Area Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Activity size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Revenue Trends</h2>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Growth vs Burn</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#3B82F6]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_#818cf8]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Expenses</span>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="expenses" stroke="#818cf8" strokeWidth={4} fillOpacity={1} fill="url(#colorExp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Expense Distribution Pie Chart */}
        <motion.div variants={itemVariants}>
          <div className="glass-card p-8 h-full">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <PieChartIcon size={24} className="text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">Distribution</h2>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Expense Breakdown</p>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 space-y-3">
              {expenseCategories.map((cat, idx) => (
                <div key={cat.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{cat.name}</span>
                  </div>
                  <span className="text-xs font-black text-white">₹{cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions Table */}
      <motion.div variants={itemVariants}>
        <div className="glass-card p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <BarChart3 size={24} className="text-white/40" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">Recent Activity</h2>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Transaction History</p>
              </div>
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH TRANSACTIONS..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all w-full sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Date</th>
                  <th className="text-left pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Description</th>
                  <th className="text-left pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Category</th>
                  <th className="text-right pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTransactions.slice(0, 8).map((t, idx) => (
                  <tr key={idx} className="group hover:bg-white/5 transition-colors">
                    <td className="py-5 text-xs font-bold text-white/40">{t.date}</td>
                    <td className="py-5 text-sm font-black text-white">{t.description}</td>
                    <td className="py-5">
                      <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/60 border border-white/5">
                        {t.category}
                      </span>
                    </td>
                    <td className={`py-5 text-right text-sm font-black ${t.type === 'income' ? 'text-success' : 'text-danger'}`}>
                      {t.type === 'income' ? '+' : '-'} ₹{t.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex justify-center">
            <button className="text-[10px] font-black text-primary hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors group">
              Load More Transactions <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
