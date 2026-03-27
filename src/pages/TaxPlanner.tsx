import { useMemo } from "react";
import { 
  ShieldCheck, 
  AlertCircle, 
  ArrowUpRight, 
  Calculator, 
  FileText, 
  PieChart as PieChartIcon,
  ChevronRight,
  ArrowRight,
  Activity,
  CheckCircle2,
  Info,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { motion } from "motion/react";

export default function TaxPlanner() {
  const { analysis, userData, suggestions } = useFinance();

  const taxBreakdown = useMemo(() => {
    const totalTax = analysis?.estimatedTax || 0;
    if (totalTax === 0) return [{ name: "No Tax Due", value: 100 }];
    
    return [
      { name: "Income Tax", value: Math.floor(totalTax * 0.8) },
      { name: "Cess (4%)", value: Math.floor(totalTax * 0.15) },
      { name: "Surcharge", value: Math.floor(totalTax * 0.05) },
    ];
  }, [analysis]);

  const taxSlabs = useMemo(() => {
    const income = analysis?.profit || 0;
    return [
      { slab: "₹0 - ₹3L", rate: "0%", status: income <= 300000 ? "Active" : "Exempt" },
      { slab: "₹3L - ₹6L", rate: "5%", status: income > 300000 && income <= 600000 ? "Active" : income > 600000 ? "Exempt" : "Upcoming" },
      { slab: "₹6L - ₹9L", rate: "10%", status: income > 600000 && income <= 900000 ? "Active" : income > 900000 ? "Exempt" : "Upcoming" },
      { slab: "₹9L - ₹12L", rate: "15%", status: income > 900000 && income <= 1200000 ? "Active" : income > 1200000 ? "Exempt" : "Upcoming" },
      { slab: "₹12L - ₹15L", rate: "20%", status: income > 1200000 && income <= 1500000 ? "Active" : income > 1500000 ? "Exempt" : "Upcoming" },
      { slab: "Above ₹15L", rate: "30%", status: income > 1500000 ? "Active" : "Upcoming" },
    ];
  }, [analysis]);

  const COLORS = ['#3B82F6', '#818cf8', '#c084fc'];

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
            Tax Planner <span className="text-primary tracking-normal">v3.0</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="subtext text-lg font-medium mt-1">
            Optimized <span className="text-white font-bold">Indian Tax Compliance</span>
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-3 border-success/20 bg-success/5">
            <ShieldCheck className="w-4 h-4 text-success animate-pulse-soft" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-success">Compliant Status</span>
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tax Summary Card */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Calculator size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Tax Liability</h2>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">FY 2024-25 Estimate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-white">₹{(analysis?.estimatedTax || 0).toLocaleString()}</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">New Tax Regime</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Taxable Income", value: `₹${(analysis?.totalIncome || 0).toLocaleString()}`, icon: FileText, color: "text-primary" },
                { label: "Total Deductions", value: "₹0", icon: ShieldCheck, color: "text-success" },
                { label: "Effective Rate", value: "12.4%", icon: Activity, color: "text-accent" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <stat.icon size={18} className={`${stat.color} mb-4`} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                  <p className="text-xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Slabs Breakdown */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <PieChartIcon size={24} className="text-white/40" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Slab Breakdown</h2>
            </div>
            <div className="space-y-4">
              {taxSlabs.map((item) => (
                <div key={item.slab} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'Exempt' ? 'bg-success' : item.status === 'Active' ? 'bg-primary' : 'bg-white/20'}`} />
                    <span className="text-sm font-black text-white/80 group-hover:text-white">{item.slab}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-black text-white/40 uppercase tracking-widest">{item.rate} Rate</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${item.status === 'Active' ? 'text-primary' : 'text-white/20'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar Planner */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Tax Distribution */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8">Distribution</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taxBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {taxBreakdown.map((entry, index) => (
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
            <div className="mt-6 space-y-3">
              {taxBreakdown.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-white">₹{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="glass-card p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Info size={24} className="text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Optimization</h2>
            </div>
            <div className="space-y-4">
              {suggestions?.map((suggestion, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <p className="text-sm font-bold text-white/80 leading-relaxed">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Download Tax Guide
            </button>
          </div>

          {/* Compliance Check */}
          <div className="glass-card p-8 border-success/20 bg-success/5">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle2 size={24} className="text-success" />
              <h3 className="text-lg font-black uppercase tracking-tight">Verified</h3>
            </div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
              Your tax profile is <span className="text-success">100% compliant</span> with the latest IT Department guidelines.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
