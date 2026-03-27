import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Subtle Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }} 
          />
        ))}
      </div>

      <div className="text-center max-w-md w-full relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(99,102,241,0.5)] animate-pulse">
           <span className="text-5xl">🤖</span>
        </div>

        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-white">
          AutoOps <span className="text-gradient">AI</span>
        </h1>
        
        <p className="subtext text-lg mb-10 font-medium">
          The world's first <span className="text-white">autonomous</span> business operator.
        </p>

        <button 
          onClick={handleStart}
          disabled={loading}
          className="premium-button w-full py-5 rounded-2xl font-bold text-xl text-white uppercase tracking-widest disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Initializing...
            </span>
          ) : "Initialize Neural Link"}
        </button>
      </div>
    </div>
  );
}
