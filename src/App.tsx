import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Financials from "./pages/Financials";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import TaxPlanner from "./pages/TaxPlanner";
import AIInsights from "./pages/AIInsights";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { FinanceProvider, useFinance } from "./context/FinanceContext";
import { X, Save, LogIn } from "lucide-react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useFinance();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function FirstTimeModal() {
  const { isFirstTime, updateUserData } = useFinance();
  const [isOpen, setIsOpen] = useState(isFirstTime);
  const [income, setIncome] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactions = transactionAmount ? [{
      id: Math.random().toString(36).substr(2, 9),
      amount: Number(transactionAmount),
      type: transactionType as "income" | "expense",
      category: "Initial Setup",
      date: new Date().toISOString()
    }] : [];

    updateUserData({
      income: Number(income),
      businessType,
      transactions
    });
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card p-8 w-full max-w-md animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Setup <span className="text-gradient">AI Link</span></h2>
          <button onClick={() => setIsOpen(false)} className="subtext hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest subtext">Monthly Income (₹)</label>
            <input 
              type="number" 
              required
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 100000"
              className="w-full glass-card bg-white/5 border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest subtext">Business Type</label>
            <select 
              required
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full glass-card bg-white/5 border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
            >
              <option value="" className="bg-[#020617]">Select Type</option>
              <option value="Freelance" className="bg-[#020617]">Freelance</option>
              <option value="SaaS" className="bg-[#020617]">SaaS</option>
              <option value="Agency" className="bg-[#020617]">Agency</option>
              <option value="E-commerce" className="bg-[#020617]">E-commerce</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest subtext">Add Initial Transaction (₹)</label>
            <div className="flex gap-4">
              <input 
                type="number" 
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                placeholder="Amount"
                className="flex-1 glass-card bg-white/5 border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all"
              />
              <select 
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="glass-card bg-white/5 border-white/10 px-4 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
              >
                <option value="expense" className="bg-[#020617]">Exp</option>
                <option value="income" className="bg-[#020617]">Inc</option>
              </select>
            </div>
          </div>

          <button type="submit" className="premium-button w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2">
            <Save size={18} />
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div style={{ color: "white" }}>Loading...</div>
      </div>
    );
  }

  // Wrapper for pages that need the sidebar
  const withLayout = (Component: React.ComponentType) => (
    <Layout>
      <Component />
    </Layout>
  );

  return (
    <>
      <FirstTimeModal />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute>{withLayout(Dashboard)}</ProtectedRoute>} />
        <Route path="/financials" element={<ProtectedRoute>{withLayout(Financials)}</ProtectedRoute>} />
        <Route path="/tax-planner" element={<ProtectedRoute>{withLayout(TaxPlanner)}</ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute>{withLayout(AIInsights)}</ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute>{withLayout(Logs)}</ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute>{withLayout(Settings)}</ProtectedRoute>} />
        {/* Fallback for 404 */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
