import { FileText, Calendar, AlertCircle, TrendingUp, ShieldCheck, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import { useFinance } from "../context/FinanceContext";

export default function TaxPlanner() {
  const { analysis, userData } = useFinance();
  
  // Simplified optimization logic
  const optimizedTax = analysis.estimatedTax > 0 ? analysis.estimatedTax * 0.75 : 0;
  const savingsPotential = analysis.estimatedTax - optimizedTax;

  const taxSlabs = [
    { range: "Up to ₹3L", rate: "0%", color: "bg-green-500/20 text-green-400" },
    { range: "₹3L - ₹6L", rate: "5%", color: "bg-green-500/20 text-green-400" },
    { range: "₹6L - ₹9L", rate: "10%", color: "bg-yellow-500/20 text-yellow-400" },
    { range: "₹9L - ₹12L", rate: "15%", color: "bg-yellow-500/20 text-yellow-400" },
    { range: "₹12L - ₹15L", rate: "20%", color: "bg-orange-500/20 text-orange-400" },
    { range: "Above ₹15L", rate: "30%", color: "bg-red-500/20 text-red-400" },
  ];

  const taxSavingTips = [
    { 
      title: "Section 80C (ELSS/PPF)", 
      desc: "Invest up to ₹1.5L in equity-linked savings schemes or public provident fund.", 
      status: analysis.profit > 700000 ? "Action Required" : "Optional", 
      amount: "₹46,800",
      icon: ShieldCheck
    },
    { 
      title: "Section 80D (Health)", 
      desc: "Deduction for health insurance premiums for self, spouse, and children.", 
      status: "Recommended", 
      amount: "₹7,800",
      icon: ShieldCheck
    },
    { 
      title: "Section 80CCD(1B) (NPS)", 
      desc: "Additional deduction of ₹50,000 for investment in National Pension System.", 
      status: "Pending", 
      amount: "₹15,600",
      icon: ShieldCheck
    },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Tax <span className="text-gradient">Planner</span>
          </h1>
          <p className="subtext text-lg font-medium mt-1">AI-optimized strategies for the <span className="text-white">FY 2024-25</span> New Regime.</p>
        </div>
        <div className="glass-card px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_8px_#818cf8]" />
          <span className="text-xs font-bold uppercase tracking-widest">Optimized for New Regime</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Tax Slab Breakdown */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <Info size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Tax Slab Breakdown</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {taxSlabs.map((slab) => (
                <div key={slab.range} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest subtext mb-1">{slab.range}</p>
                  <p className={`text-xl font-black ${slab.color.split(' ')[1]}`}>{slab.rate}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs subtext text-center italic">Standard Deduction of ₹75,000 applied automatically.</p>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Recommended Deductions</h2>
            </div>
            <div className="space-y-4">
              {taxSavingTips.map((tip, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <tip.icon size={20} className="text-indigo-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{tip.title}</h3>
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-black ${
                            tip.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                            tip.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-indigo-500/20 text-indigo-400'
                          }`}>
                            {tip.status}
                          </span>
                        </div>
                        <p className="text-sm subtext leading-relaxed max-w-md">{tip.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs subtext uppercase tracking-widest mb-1">Potential Saving</p>
                      <p className="text-2xl font-black text-white">{tip.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <Calendar size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Upcoming Deadlines</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Critical</p>
                <h4 className="font-bold mb-1">GST Monthly Return</h4>
                <p className="text-sm subtext mb-4">Due in 5 days (March 20th)</p>
                <button className="text-xs font-black uppercase tracking-widest text-red-400 flex items-center gap-2 hover:gap-3 transition-all">
                  File Now <ArrowRight size={14} />
                </button>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Upcoming</p>
                <h4 className="font-bold mb-1">Advance Tax Q4</h4>
                <p className="text-sm subtext mb-4">Due in 15 days (March 31st)</p>
                <button className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2 hover:gap-3 transition-all">
                  Prepare <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Tax Overview</h3>
            <div className="space-y-6 mb-8">
              <div>
                <p className="text-xs subtext uppercase tracking-widest mb-1">Current Liability</p>
                <p className="text-4xl font-black text-white">₹{analysis.estimatedTax.toLocaleString()}</p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-xs subtext uppercase tracking-widest mb-1">Optimized Liability</p>
                <p className="text-4xl font-black text-green-400">₹{optimizedTax.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs subtext uppercase tracking-widest mb-1">Savings Potential</p>
                <p className="text-4xl font-black text-indigo-400">₹{savingsPotential.toLocaleString()}</p>
              </div>
            </div>
            <button className="premium-button w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              Apply Optimization
            </button>
          </div>

          <div className="glass-card p-8 bg-green-500/5 border-green-500/10">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-green-400">
              <CheckCircle2 size={18} />
              Compliance Status
            </h4>
            <p className="text-xs subtext leading-relaxed">
              Your business is currently in the "Low Risk" category for tax audits. Keep maintaining digital records for all expenses above ₹5,000.
            </p>
          </div>

          <div className="glass-card p-8">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-yellow-400" />
              Smart Suggestion
            </h4>
            <p className="text-xs subtext leading-relaxed">
              We detected 3 transactions without valid GST invoices. Upload them to ensure full input tax credit (ITC) eligibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
