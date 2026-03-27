import { FileText, Calendar, AlertCircle, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import { useFinance } from "../context/FinanceContext";

export default function TaxPlanner() {
  const { analysis } = useFinance();
  const optimizedTax = analysis.estimatedTax * 0.8;
  const savingsPotential = analysis.estimatedTax - optimizedTax;

  const taxSavingTips = [
    { title: "Section 80C", desc: `Invest ₹1.5L in ELSS, PPF, or LIC to save up to ₹${Math.round(analysis.estimatedTax * 0.2).toLocaleString()} in taxes.`, status: "Pending", amount: `₹${Math.round(analysis.estimatedTax * 0.2).toLocaleString()}` },
    { title: "Health Insurance (80D)", desc: "Claim up to ₹25,000 for self and family insurance premiums.", status: "Completed", amount: "₹25,000" },
    { title: "HRA Exemption", desc: "Submit rent receipts to claim HRA if you live in a rented house.", status: "Action Required", amount: "₹12,000" },
  ];

  return (
    <div className="space-y-10">
      <header className="mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
          Tax <span className="text-gradient">Planner</span>
        </h1>
        <p className="subtext text-lg font-medium mt-1">AI-optimized tax saving strategies for your business.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-10">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-bold">Recommended Deductions</h2>
            </div>
            <div className="space-y-6">
              {taxSavingTips.map((tip, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{tip.title}</h3>
                        <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-black ${
                          tip.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                          tip.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {tip.status}
                        </span>
                      </div>
                      <p className="text-sm subtext leading-relaxed">{tip.desc}</p>
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

          <div className="glass-card p-10">
            <div className="flex items-center gap-3 mb-8">
              <Calendar size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold">Upcoming Deadlines</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Critical</p>
                <h4 className="font-bold mb-1">GST Monthly Return</h4>
                <p className="text-sm subtext mb-4">Due in 5 days (March 20th)</p>
                <button className="text-xs font-black uppercase tracking-widest text-red-400 flex items-center gap-2">
                  File Now <ArrowRight size={14} />
                </button>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Upcoming</p>
                <h4 className="font-bold mb-1">Advance Tax Q4</h4>
                <p className="text-sm subtext mb-4">Due in 15 days (March 31st)</p>
                <button className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                  Prepare <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Tax Overview</h3>
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-xs subtext uppercase tracking-widest mb-1">Current Tax</p>
                <p className="text-3xl font-black text-white">₹{analysis.estimatedTax.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs subtext uppercase tracking-widest mb-1">Optimized Tax</p>
                <p className="text-3xl font-black text-green-400">₹{optimizedTax.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs subtext uppercase tracking-widest mb-1">Savings Potential</p>
                <p className="text-3xl font-black text-indigo-400">₹{savingsPotential.toLocaleString()}</p>
              </div>
            </div>
            <button className="premium-button w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm">
              Apply Optimization
            </button>
          </div>

          <div className="glass-card p-8">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-yellow-400" />
              Compliance Alert
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
