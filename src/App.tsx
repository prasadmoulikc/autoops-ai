import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Financials from "./pages/Financials";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import TaxPlanner from "./pages/TaxPlanner";
import AIInsights from "./pages/AIInsights";
import Layout from "./components/Layout";

export default function App() {
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
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={withLayout(Dashboard)} />
      <Route path="/financials" element={withLayout(Financials)} />
      <Route path="/tax-planner" element={withLayout(TaxPlanner)} />
      <Route path="/insights" element={withLayout(AIInsights)} />
      <Route path="/logs" element={withLayout(Logs)} />
      <Route path="/settings" element={withLayout(Settings)} />
      {/* Fallback for 404 */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
