import { CheckCircle2, XCircle, Loader2, Search, Filter } from "lucide-react";

export default function Logs() {
  const logs = [
    { id: 1, agent: "Neural-Alpha", action: "Data Ingestion", status: "Success", time: "2 mins ago", color: "text-green-400" },
    { id: 2, agent: "Neural-Beta", action: "Sentiment Analysis", status: "Running", time: "5 mins ago", color: "text-blue-400" },
    { id: 3, agent: "Neural-Gamma", action: "Pattern Recognition", status: "Failed", time: "12 mins ago", color: "text-red-400" },
    { id: 4, agent: "Neural-Alpha", action: "Model Retraining", status: "Success", time: "24 mins ago", color: "text-green-400" },
    { id: 5, agent: "Neural-Delta", action: "Anomaly Detection", status: "Success", time: "45 mins ago", color: "text-green-400" },
    { id: 6, agent: "Neural-Beta", action: "Image Classification", status: "Success", time: "1 hour ago", color: "text-green-400" },
    { id: 7, agent: "Neural-Gamma", action: "Natural Language Processing", status: "Failed", time: "2 hours ago", color: "text-red-400" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Agent <span className="text-gradient">Logs</span>
          </h1>
          <p className="subtext text-lg font-medium mt-1">Real-time activity monitoring for all active agents.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 subtext group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Search logs..." 
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
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] subtext">Agent</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] subtext">Action</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] subtext">Status</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] subtext">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 font-bold text-white group-hover:text-indigo-400 transition-colors">{log.agent}</td>
                  <td className="px-8 py-6 subtext font-medium">{log.action}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {log.status === "Success" && <CheckCircle2 size={16} className="text-green-400" />}
                      {log.status === "Running" && <Loader2 size={16} className="text-blue-400 animate-spin" />}
                      {log.status === "Failed" && <XCircle size={16} className="text-red-400" />}
                      <span className={`text-xs font-bold uppercase tracking-widest ${log.color}`}>
                        {log.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 subtext text-sm">{log.time}</td>
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
