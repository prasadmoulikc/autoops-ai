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
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">AutoOps AI</h1>
        <button 
          onClick={handleStart}
          disabled={loading}
          className="px-8 py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Initializing AI..." : "Initialize Neural Link"}
        </button>
      </div>
    </div>
  );
}
