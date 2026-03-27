import React, { useState, useEffect, useRef } from 'react';
import { 
  Routes, 
  Route, 
  useNavigate, 
  Navigate 
} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Bot, 
  BrainCircuit, 
  Settings, 
  LogOut, 
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Loader2,
  IndianRupee,
  Zap,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Sparkles,
  Cpu,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from './AuthContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const GlassCard = ({ children, className, hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
  <motion.div 
    whileHover={hover ? { y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(59, 130, 246, 0.1)" } : {}}
    className={cn(
      "bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden transition-shadow",
      className
    )}
  >
    {children}
  </motion.div>
);

const GlowButton = ({ children, onClick, className, disabled }: { children: React.ReactNode, onClick?: () => void, className?: string, disabled?: boolean }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" } : {}}
    whileTap={!disabled ? { scale: 0.98 } : {}}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "relative group px-6 py-3 rounded-xl font-bold transition-all overflow-hidden disabled:opacity-50",
      "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white",
      className
    )}
  >
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative flex items-center justify-center gap-2">
      {children}
    </div>
  </motion.button>
);

const TypewriterText = ({ text, className }: { text: string, className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return <span className={className}>{displayedText}</span>;
};

const NeuralNetwork = () => {
  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.5], scale: [0, 1, 1], x: Math.cos(i) * 100, y: Math.sin(i) * 60 }}
            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-3 h-3 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_10px_#22d3ee]"
          />
        ))}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1="50%" y1="50%"
              x2={`${50 + Math.cos(i) * 30}%`}
              y2={`${50 + Math.sin(i) * 30}%`}
              stroke="#22d3ee"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </svg>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 bg-blue-500 rounded-full blur-xl opacity-50"
        />
      </div>
    </div>
  );
};

const ExecutionTimeline = ({ steps, currentStep }: { steps: string[], currentStep: number }) => {
  return (
    <div className="space-y-6 relative">
      <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/10" />
      {steps.map((step, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
          className="flex items-start gap-4"
        >
          <div className="relative z-10">
            {i < currentStep ? (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <CheckCircle2 size={14} className="text-white" />
              </div>
            ) : i === currentStep ? (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                <Loader2 size={14} className="text-white animate-spin" />
              </motion.div>
            ) : (
              <div className="w-6 h-6 bg-white/10 rounded-full border border-white/20" />
            )}
          </div>
          <div className="flex-1">
            <p className={cn(
              "font-medium transition-colors",
              i === currentStep ? "text-blue-400" : i < currentStep ? "text-green-400" : "text-white/40"
            )}>
              {step}
            </p>
            {i === currentStep && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="h-1 bg-blue-500/20 rounded-full mt-2 overflow-hidden"
              >
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/3 bg-blue-500"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- Pages ---

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const OverviewPage = ({ 
  flowState, 
  userInput, 
  setUserInput, 
  startFlow, 
  agentResponse, 
  currentStep, 
  systemMessages 
}: any) => (
  <PageWrapper>
    <div className="max-w-4xl mx-auto">
      {flowState === 'idle' ? (
        <div className="mt-20 text-center">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-10 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          >
            <Bot size={48} className="text-white" />
          </motion.div>
          <h2 className="text-5xl font-black tracking-tight mb-6 leading-tight">
            How can I help you <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">scale today?</span>
          </h2>
          <p className="text-xl text-white/40 mb-12 max-w-xl mx-auto leading-relaxed">
            I'm your autonomous business operator. I can handle taxes, compliance, and financial planning while you focus on growth.
          </p>
          
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition-opacity" />
            <div className="relative bg-[#0F172A] border border-white/10 rounded-2xl p-2 flex items-center">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startFlow()}
                placeholder="e.g. Calculate my GST and file for Q1..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 text-lg placeholder:text-white/20 font-medium"
              />
              <GlowButton onClick={startFlow} disabled={!userInput.trim()}>
                Execute <ArrowRight size={18} />
              </GlowButton>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {["File GST", "Predict Tax", "Audit Expenses", "Optimize Payroll"].map(tag => (
              <button 
                key={tag}
                onClick={() => setUserInput(`I want to ${tag.toLowerCase()}...`)}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/40 hover:text-white hover:border-white/30 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <GlassCard className="p-10 relative overflow-hidden" hover={false}>
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                <Cpu size={12} className="text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Processing</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {flowState === 'thinking' && (
                <motion.div 
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-12"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 60px rgba(59,130,246,0.5)", "0 0 20px rgba(59,130,246,0.2)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-32 bg-blue-500/20 rounded-full border-2 border-blue-500 flex items-center justify-center mb-8"
                  >
                    <Sparkles size={48} className="text-blue-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Analyzing Request</h3>
                  <p className="text-white/40 font-mono text-sm">
                    Parsing intent and mapping compliance requirements<span className="animate-pulse">...</span>
                  </p>
                </motion.div>
              )}

              {flowState === 'planning' && (
                <motion.div 
                  key="planning"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <BrainCircuit size={20} className="text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Execution Plan Generated</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agentResponse?.plan?.map((step: string, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4"
                      >
                        <span className="text-purple-400 font-mono font-bold">0{i+1}</span>
                        <span className="text-sm font-medium text-white/70">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {flowState === 'executing' && (
                <motion.div 
                  key="executing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-6"
                >
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-bold">Executing Workflow</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/40">Progress</span>
                      <span className="text-sm font-bold text-blue-400">{Math.round((currentStep / (agentResponse?.execution?.length || 1)) * 100)}%</span>
                    </div>
                  </div>
                  <ExecutionTimeline 
                    steps={agentResponse?.execution?.map((e: any) => e.step) || []} 
                    currentStep={currentStep} 
                  />
                </motion.div>
              )}

              {flowState === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
                  >
                    <CheckCircle2 size={48} className="text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-black uppercase mb-4">Task Completed</h3>
                  <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-center">
                    <p className="text-white/40 text-sm uppercase tracking-widest mb-1 font-bold">Result</p>
                    <p className="text-xl font-bold text-green-400">{agentResponse?.result}</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="text-xs text-white/30 uppercase tracking-widest">Confidence Score</span>
                      <span className="text-xs font-bold text-blue-400">{Math.round((agentResponse?.confidence || 0.9) * 100)}%</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {flowState === 'learning' && (
                <motion.div 
                  key="learning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-6"
                >
                  <NeuralNetwork />
                  <h3 className="text-2xl font-bold mt-8 mb-2">Optimizing Intelligence</h3>
                  <p className="text-white/40 font-mono text-sm mb-8">
                    Updating neural weights based on execution feedback...
                  </p>
                  <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-blue-400 font-bold text-lg mb-1">Efficiency Gain: +{agentResponse?.optimization || "32%"}</p>
                    <p className="text-white/40 text-xs">Future filings will be processed 2.4s faster.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          {/* System Activity Log */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Network size={16} className="text-white/20" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/20">System Activity Log</span>
            </div>
            <div className="space-y-2">
              {systemMessages.map((msg: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1 - i * 0.2, x: 0 }}
                  className="flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-lg"
                >
                  <span className="text-[10px] font-mono text-white/20">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-xs font-medium text-white/60">{msg}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </PageWrapper>
);

const FinancialsPage = () => {
  const data = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
  ];

  return (
    <PageWrapper>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Financial Intelligence</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Export Report</button>
            <GlowButton className="py-2 px-4 text-xs">Add Transaction</GlowButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 border-blue-500/20">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Total Revenue (YTD)</p>
            <h3 className="text-3xl font-black tracking-tighter">₹24,50,000</h3>
            <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold">
              <TrendingUp size={14} /> +18.4% from last year
            </div>
          </GlassCard>
          <GlassCard className="p-6 border-purple-500/20">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Estimated Tax Liability</p>
            <h3 className="text-3xl font-black tracking-tighter">₹1,80,000</h3>
            <div className="mt-4 flex items-center gap-2 text-blue-400 text-xs font-bold">
              <Zap size={14} /> Optimized by AI Agent
            </div>
          </GlassCard>
          <GlassCard className="p-6 border-cyan-500/20">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Net Cash Flow</p>
            <h3 className="text-3xl font-black tracking-tighter">₹18,20,000</h3>
            <div className="mt-4 flex items-center gap-2 text-white/40 text-xs font-bold">
              <ShieldCheck size={14} /> Audit-ready status
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-8 h-[400px]" hover={false}>
          <h3 className="text-lg font-bold mb-8">Cash Flow Analysis</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="income" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </PageWrapper>
  );
};

const AgentLogPage = () => {
  const logs = [
    { time: '10:24 AM', action: 'GST Liability Calculated', status: 'Success', detail: 'Calculated 18% GST on ₹10L income.' },
    { time: '09:15 AM', action: 'Filing Draft Prepared', status: 'Success', detail: 'GSTR-1 draft generated for Q1.' },
    { time: 'Yesterday', action: 'Workflow Optimization', status: 'Success', detail: 'Reduced processing time by 2.4s.' },
    { time: 'Yesterday', action: 'Risk Scan Completed', status: 'Alert', detail: 'Found 2 missing invoices in March.' },
    { time: '2 days ago', action: 'Neural Weights Updated', status: 'System', detail: 'Learning cycle #482 completed.' },
  ];

  return (
    <PageWrapper>
      <div className="space-y-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Autonomous Agent Log</h2>
        <div className="space-y-4">
          {logs.map((log, i) => (
            <GlassCard key={i} className="p-6 flex items-center gap-6" hover={true}>
              <div className="w-16 text-xs font-mono text-white/20">{log.time}</div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{log.action}</h4>
                <p className="text-sm text-white/40">{log.detail}</p>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                log.status === 'Success' ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                log.status === 'Alert' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              )}>
                {log.status}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

const SettingsPage = () => {
  const [autonomousMode, setAutonomousMode] = useState(true);

  return (
    <PageWrapper>
      <div className="space-y-8 max-w-2xl">
        <h2 className="text-3xl font-black uppercase tracking-tighter">System Configuration</h2>
        
        <div className="space-y-6">
          <GlassCard className="p-8" hover={false}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Autonomous Execution Mode</h3>
                <p className="text-sm text-white/40">Allow agent to file and submit without manual approval.</p>
              </div>
              <button 
                onClick={() => setAutonomousMode(!autonomousMode)}
                className={cn(
                  "w-14 h-8 rounded-full p-1 transition-colors relative",
                  autonomousMode ? "bg-blue-600" : "bg-white/10"
                )}
              >
                <motion.div 
                  animate={{ x: autonomousMode ? 24 : 0 }}
                  className="w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
            <div className="h-px bg-white/5 my-6" />
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/20">API Integration Keys</p>
              <div className="space-y-2">
                <label className="text-xs text-white/40">n8n Webhook URL</label>
                <input 
                  type="password" 
                  value="https://n8n.autoops.ai/webhook/..." 
                  readOnly
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white/60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40">GST Portal API Key</label>
                <input 
                  type="password" 
                  value="••••••••••••••••" 
                  readOnly
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white/60"
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8" hover={false}>
            <h3 className="text-lg font-bold mb-6">Agent Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Notification Frequency</span>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
                  <option>Real-time</option>
                  <option>Daily Digest</option>
                  <option>Weekly Summary</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Risk Tolerance</span>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
                  <option>Conservative</option>
                  <option>Balanced</option>
                  <option>Aggressive</option>
                </select>
              </div>
            </div>
          </GlassCard>

          <div className="flex justify-end gap-4">
            <button className="px-6 py-3 text-sm font-bold text-white/40 hover:text-white transition-colors">Reset Defaults</button>
            <GlowButton className="px-8">Save Configuration</GlowButton>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// --- Main Application ---

// --- Pages ---

const LandingPage = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleInitialize = async () => {
    try {
      setIsInitializing(true);
      setError(null);
      
      // Artificial delay for "Neural Link" initialization feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await signIn();
      // Navigation happens in useEffect once user is authenticated
    } catch (err) {
      console.error(err);
      setError("Failed to initialize AI. Please try again.");
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        <GlassCard className="p-8 md:p-12 text-center border-blue-500/20 bg-blue-500/5 shadow-2xl" hover={false}>
          <motion.div 
            animate={isInitializing ? { 
              rotate: 360,
              scale: [1, 1.1, 1],
            } : {}}
            transition={isInitializing ? { 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            } : {}}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
          >
            {isInitializing ? <Loader2 size={40} className="text-white animate-spin" /> : <Bot size={48} className="text-white" />}
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            AutoOps <span className="text-blue-400">AI</span>
          </h1>
          
          <p className="text-white/40 text-sm md:text-base mb-10 leading-relaxed">
            The world's first autonomous business operator for Indian entrepreneurs. 
            <span className="block mt-2 text-blue-400/60">Execute, don't just suggest.</span>
          </p>

          <div className="space-y-4">
            <GlowButton 
              onClick={handleInitialize} 
              disabled={isInitializing}
              className="w-full py-4 text-lg flex items-center justify-center gap-3"
            >
              {isInitializing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Initializing AI...</span>
                </>
              ) : (
                <>
                  <span>Initialize Neural Link</span>
                  <ArrowRight size={20} />
                </>
              )}
            </GlowButton>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-400 text-xs font-bold uppercase tracking-wider"
              >
                {error}
              </motion.p>
            )}
          </div>

          <p className="mt-8 text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
            Secure Authentication via Google Cloud
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [flowState, setFlowState] = useState<'idle' | 'thinking' | 'planning' | 'executing' | 'success' | 'learning'>('idle');
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [systemMessages, setSystemMessages] = useState<string[]>([]);
  const [agentResponse, setAgentResponse] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const addSystemMessage = (msg: string) => {
    setSystemMessages(prev => [msg, ...prev].slice(0, 5));
  };

  const startFlow = async () => {
    if (!userInput.trim() || !user) return;
    
    setFlowState('thinking');
    addSystemMessage("Initializing autonomous compliance engine...");
    
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput, userId: user.uid }),
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      setAgentResponse(data);

      // Start the visual sequence
      setTimeout(() => {
        setFlowState('planning');
        addSystemMessage("Strategy generated: Multi-stage filing optimization.");
      }, 1500);

      setTimeout(() => {
        setFlowState('executing');
        setCurrentStep(0);
      }, 3500);

    } catch (error) {
      console.error("Execution error:", error);
      setFlowState('idle');
      addSystemMessage("Error: Failed to connect to AI Agent.");
    }
  };

  useEffect(() => {
    if (flowState === 'executing' && agentResponse) {
      const executionSteps = agentResponse.execution || [];
      if (currentStep < executionSteps.length) {
        const timer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          addSystemMessage(`Completed: ${executionSteps[currentStep].step}`);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        setFlowState('success');
        addSystemMessage("Execution successful. Audit trail logged.");
        setTimeout(() => setFlowState('learning'), 4000);
      }
    }
  }, [flowState, currentStep, agentResponse]);

  useEffect(() => {
    if (flowState === 'learning') {
      const timer = setTimeout(() => {
        setFlowState('idle');
        setUserInput('');
        addSystemMessage("Workflow optimized by 32% based on latest execution.");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [flowState]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewPage 
            flowState={flowState}
            userInput={userInput}
            setUserInput={setUserInput}
            startFlow={startFlow}
            agentResponse={agentResponse}
            currentStep={currentStep}
            systemMessages={systemMessages}
          />
        );
      case 'finance':
        return <FinancialsPage />;
      case 'agent':
        return <AgentLogPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans flex overflow-hidden selection:bg-blue-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-cyan-600/5 blur-[100px] rounded-full" />
      </div>

      {/* LEFT SIDEBAR */}
      <aside className="w-72 border-r border-white/5 bg-white/[0.02] backdrop-blur-2xl flex flex-col p-8 z-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Bot size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">AutoOps <span className="text-blue-400">AI</span></h1>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1 font-bold">Autonomous Agent</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'finance', icon: Receipt, label: 'Financials' },
            { id: 'agent', icon: BrainCircuit, label: 'Agent Log' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group relative overflow-hidden",
                activeTab === item.id 
                  ? "bg-white/10 text-blue-400 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {activeTab === item.id && (
                <motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
              )}
              <item.icon size={20} className={cn("transition-transform group-hover:scale-110", activeTab === item.id && "text-blue-400")} />
              <span className="font-semibold tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <GlassCard className="p-4 mb-6 bg-blue-500/5 border-blue-500/20" hover={false}>
            <div className="flex items-center gap-3 mb-2">
              <Zap size={14} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">System Status</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
              <span className="text-xs font-medium text-white/60">All nodes operational</span>
            </div>
          </GlassCard>
          
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-4 px-5 py-4 text-white/30 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-semibold">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* CENTER PANEL */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-white/[0.01] backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0A0F] bg-white/10 flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-white/40 tracking-wide">3 Agents Active in Workspace</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Last Sync</span>
              <span className="text-sm font-mono text-blue-400">08:28:35 UTC</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Plus size={20} className="text-white/60" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* RIGHT PANEL */}
      <aside className="w-96 border-l border-white/5 bg-white/[0.01] backdrop-blur-3xl p-10 z-20 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-black uppercase tracking-tighter">Live Insights</h2>
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <TrendingUp size={16} className="text-blue-400" />
          </div>
        </div>
        
        <div className="space-y-6">
          <GlassCard className="p-6 border-blue-500/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Estimated Tax</span>
              <span className="text-xs font-bold text-blue-400">+12%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tighter">₹1,80,000</span>
              <span className="text-xs text-white/20 font-mono">INR</span>
            </div>
            <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              />
            </div>
            <p className="mt-3 text-[10px] text-white/30 font-bold uppercase tracking-widest">65% of Quarterly Threshold</p>
          </GlassCard>

          <GlassCard className="p-6 border-purple-500/10">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={16} className="text-purple-400" />
              <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Next Filing</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tighter">Apr 20</span>
              <span className="text-xs text-white/20 font-mono">2026</span>
            </div>
            <p className="mt-3 text-[10px] text-purple-400/60 font-bold uppercase tracking-widest">GSTR-3B Deadline in 24 Days</p>
          </GlassCard>

          <div className="pt-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-6">Risk Engine Alerts</h3>
            <div className="space-y-4">
              {[
                { label: 'Missing Invoice', detail: 'INV-2026-042 mismatch', type: 'warning' },
                { label: 'Compliance Check', detail: 'TDS verification pending', type: 'info' }
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5",
                    alert.type === 'warning' ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]" : "bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                  )} />
                  <div>
                    <p className="text-sm font-bold text-white/80">{alert.label}</p>
                    <p className="text-[11px] text-white/30 font-medium">{alert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <GlassCard className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={20} className="text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-tighter">Trust Layer Active</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                All autonomous actions are verified against current Indian Tax Laws (GST Act 2017).
              </p>
            </GlassCard>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* Fallback for any other route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
