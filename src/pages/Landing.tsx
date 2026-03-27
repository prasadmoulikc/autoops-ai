import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Landing() {
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, loading: authLoading } = useAuth();

  const handleStart = async () => {
    setLocalLoading(true);
    try {
      // Background sign-in
      await signIn();
    } catch (error) {
      console.error("Sign in error:", error);
    }
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-4">
      <div className="text-center max-w-md w-full">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(59,130,246,0.4)]">
           <span className="text-4xl">🤖</span>
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">AutoOps AI</h1>
        <p className="text-white/40 mb-10">The world's first autonomous business operator.</p>
        <button 
          onClick={handleStart}
          disabled={localLoading}
          className="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          {localLoading ? "Initializing AI..." : "Initialize Neural Link"}
        </button>
      </div>
    </div>
  );
}
