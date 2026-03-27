import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Optional: redirect to landing if not logged in
      // navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-20 text-white bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Dashboard</h1>
            <p className="text-white/40">Welcome back, {user?.displayName || 'Operator'}</p>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold">
            {user?.displayName?.[0] || 'A'}
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Neural Status</h2>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online & Synchronized</span>
            </div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Active Agents</h2>
            <p className="text-3xl font-black">4</p>
          </div>
        </div>
      </div>
    </div>
  );
}
