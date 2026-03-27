import { CheckCircle2, XCircle, Loader2, Search, Filter, AlertCircle } from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { useState } from "react";

export default function Logs() {
  const { userData } = useFinance();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = userData.transactions.filter(log => 
    (log.category || "").toLowerCase().includes((searchQuery || "").toLowerCase()) ||
    (log.type || "").toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Transaction <span className="text-gradient">Logs</span>
          </h1>
          <p className="subtext text-lg font-medium mt-1">Real-time activity monitoring for all financial events.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 subtext group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..." 
              className="glass-card bg-white/5 border-white/10 pl-12 pr-6 py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all w-full md:w-64"
            />
          </div>
          <button className="glass-card p-3 rounded-xl hover:bg-white/10 transition-colors">
            <Filter size={20} className="subtext" />
          </button>
        </div>
      </header>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] subtext">Category</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] subtext">Amount</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] subtext">Type</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] subtext">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 font-bold text-white group-hover:text-indigo-400 transition-colors">{log.category}</td>
                  <td className="px-8 py-6 subtext font-medium">₹{log.amount.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {log.type === "income" ? (
                        <CheckCircle2 size={16} className="text-green-400" />
                      ) : (
                        <AlertCircle size={16} className="text-red-400" />
                      )}
                      <span className={`text-xs font-bold uppercase tracking-widest ${log.type === "income" ? "text-green-400" : "text-red-400"}`}>
                        {log.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 subtext text-sm">{new Date(log.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="glass-card px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
          Load More Activity
        </button>
      </div>
    </div>
  );
}
